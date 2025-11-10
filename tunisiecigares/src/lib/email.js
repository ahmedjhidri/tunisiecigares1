// Lightweight EmailJS REST integration (client-side)
// Requires env vars:
//  VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
//  VITE_ADMIN_EMAIL (optional, for admin notifications)

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

export function isEmailEnabled() {
  const enabled = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
  
  if (import.meta.env.DEV) {
    console.log('[Email] Configuration check:', {
      enabled,
      hasServiceId: Boolean(SERVICE_ID),
      hasTemplateId: Boolean(TEMPLATE_ID),
      hasPublicKey: Boolean(PUBLIC_KEY),
      hasAdminEmail: Boolean(ADMIN_EMAIL),
      serviceId: SERVICE_ID ? `${SERVICE_ID.substring(0, 8)}...` : 'MISSING',
      templateId: TEMPLATE_ID ? `${TEMPLATE_ID.substring(0, 8)}...` : 'MISSING',
      publicKey: PUBLIC_KEY ? `${PUBLIC_KEY.substring(0, 8)}...` : 'MISSING',
    });
  }
  
  return enabled;
}

/**
 * Test EmailJS configuration by sending a test email
 * @param {string} testEmail - Email address to send test to
 * @returns {Promise<{success: boolean, message: string, details?: any}>}
 */
export async function testEmailConfiguration(testEmail) {
  console.log('[Email] Testing EmailJS configuration...');
  
  if (!isEmailEnabled()) {
    const missing = [];
    if (!SERVICE_ID) missing.push('VITE_EMAILJS_SERVICE_ID');
    if (!TEMPLATE_ID) missing.push('VITE_EMAILJS_TEMPLATE_ID');
    if (!PUBLIC_KEY) missing.push('VITE_EMAILJS_PUBLIC_KEY');
    
    return {
      success: false,
      message: `EmailJS is not configured. Missing: ${missing.join(', ')}`,
      details: { missing }
    };
  }
  
  if (!testEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
    return {
      success: false,
      message: 'Invalid test email address',
      details: { testEmail }
    };
  }
  
  const testPayload = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: PUBLIC_KEY,
    template_params: {
      to_email: testEmail,
      to: testEmail,
      user_email: testEmail,
      subject: 'Test Email from Tunisie Cigares',
      customer_name: 'Test User',
      order_ref: 'TEST-' + Date.now(),
      customer_phone: '+216 XX XXX XXX',
      customer_address: 'Test Address',
      order_details: '1x Test Product - 100 TND',
      total: '100 TND',
    }
  };
  
  console.log('[Email] Sending test email with payload:', {
    service_id: SERVICE_ID.substring(0, 8) + '...',
    template_id: TEMPLATE_ID.substring(0, 8) + '...',
    user_id: PUBLIC_KEY.substring(0, 8) + '...',
    to_email: testEmail,
    template_params_keys: Object.keys(testPayload.template_params),
  });
  
  try {
    const startTime = Date.now();
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
      signal: AbortSignal.timeout(30000)
    });
    
    const duration = Date.now() - startTime;
    const responseText = await res.text();
    
    console.log('[Email] Test email response:', {
      status: res.status,
      statusText: res.statusText,
      duration: `${duration}ms`,
      responseLength: responseText.length,
    });
    
    if (!res.ok) {
      let errorDetails;
      try {
        errorDetails = JSON.parse(responseText);
      } catch {
        errorDetails = { raw: responseText.substring(0, 200) };
      }
      
      console.error('[Email] Test email failed:', {
        status: res.status,
        error: errorDetails,
        fullResponse: responseText,
      });
      
      return {
        success: false,
        message: `EmailJS API returned error: ${res.status}`,
        details: {
          status: res.status,
          statusText: res.statusText,
          error: errorDetails,
          response: responseText.substring(0, 500),
        }
      };
    }
    
    console.log('[Email] ✅ Test email sent successfully!');
    return {
      success: true,
      message: 'Test email sent successfully',
      details: {
        status: res.status,
        duration: `${duration}ms`,
      }
    };
  } catch (error) {
    console.error('[Email] Test email error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    
    return {
      success: false,
      message: `Test email failed: ${error.message}`,
      details: {
        errorName: error.name,
        errorMessage: error.message,
      }
    };
  }
}

// Error types for better error handling
export class EmailError extends Error {
  constructor(message, code, originalError) {
    super(message);
    this.name = 'EmailError';
    this.code = code;
    this.originalError = originalError;
  }
}

/**
 * Send order confirmation email to customer
 * @param {Object} params - Order details
 * @param {string} params.toEmail - Customer email
 * @param {string} params.firstName - Customer first name
 * @param {string} params.lastName - Customer last name
 * @param {string} params.phone - Customer phone
 * @param {string} params.address - Delivery address
 * @param {Array} params.items - Order items
 * @param {number} params.total - Order total
 * @param {string} params.orderRef - Order reference number
 * @returns {Promise<void>}
 * @throws {EmailError} If email sending fails
 */
export async function sendOrderEmail({ toEmail, firstName, lastName, phone, address, items, total, orderRef }) {
  console.log('[Email] 📧 Starting order email send...', {
    toEmail: toEmail ? `${toEmail.substring(0, 3)}***@${toEmail.split('@')[1]}` : 'MISSING',
    orderRef,
    itemsCount: items?.length || 0,
    total,
  });
  
  if (!isEmailEnabled()) {
    const error = new EmailError('Email is not configured. Please check your environment variables.', 'NOT_CONFIGURED');
    console.error('[Email] ❌ Configuration check failed:', {
      hasServiceId: Boolean(SERVICE_ID),
      hasTemplateId: Boolean(TEMPLATE_ID),
      hasPublicKey: Boolean(PUBLIC_KEY),
    });
    throw error;
  }
  
  const to = (toEmail || '').trim();
  if (!to) {
    console.error('[Email] ❌ Recipient email is empty');
    throw new EmailError('Recipient email is empty', 'INVALID_EMAIL');
  }
  
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(to)) {
    console.error('[Email] ❌ Invalid email format:', to);
    throw new EmailError('Recipient email is invalid', 'INVALID_EMAIL');
  }

  console.log('[Email] ✅ Email validation passed:', { to: `${to.substring(0, 3)}***@${to.split('@')[1]}` });

  // Format order details as text for EmailJS template
  const orderDetails = (items || []).map(i => 
    `${i.quantity}x ${escapeHtml(i.product_name || i.name || 'Unknown')} - ${i.subtotal || (i.price || i.price_TND || 0) * (i.quantity || 1)} TND`
  ).join('\n');

  const customerName = `${escapeHtml(firstName)} ${escapeHtml(lastName)}`;
  const subject = `Order ${orderRef || ''} confirmed`;

  // EmailJS template variables - configure your EmailJS template to use these
  // Template should use: {{to_email}}, {{customer_name}}, {{order_ref}}, {{customer_phone}}, 
  // {{customer_address}}, {{order_details}}, {{total}}, {{subject}}
  const payload = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: PUBLIC_KEY,
    template_params: {
      to_email: to,
      to,
      user_email: to,
      reply_to: to,
      subject,
      customer_name: customerName,
      order_ref: orderRef || 'N/A',
      customer_phone: escapeHtml(phone || 'N/A'),
      customer_address: escapeHtml(address || 'N/A'),
      order_details: orderDetails,
      total: `${total} TND`,
      // Alternative: If your template uses {{{html_message}}}, uncomment below
      // html_message: generateHtmlEmail({ customerName, orderRef, phone, address, items, total })
    }
  };

  console.log('[Email] 📤 Sending email via EmailJS API...', {
    serviceId: SERVICE_ID.substring(0, 8) + '...',
    templateId: TEMPLATE_ID.substring(0, 8) + '...',
    templateParams: {
      to_email: `${to.substring(0, 3)}***`,
      customer_name: customerName,
      order_ref: orderRef,
      subject,
      hasOrderDetails: Boolean(orderDetails),
      total: `${total} TND`,
    },
    allTemplateParamKeys: Object.keys(payload.template_params),
  });

  try {
    const startTime = Date.now();
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Add timeout
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    const duration = Date.now() - startTime;
    const responseText = await res.text();
    
    console.log('[Email] 📥 EmailJS API response received:', {
      status: res.status,
      statusText: res.statusText,
      duration: `${duration}ms`,
      responseLength: responseText.length,
      responsePreview: responseText.substring(0, 200),
    });

    if (!res.ok) {
      let errorData;
      let errorMessage = `Email sending failed: ${res.status} ${res.statusText}`;
      
      try {
        errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.text || errorMessage;
        console.error('[Email] ❌ EmailJS API error response:', {
          status: res.status,
          error: errorData,
          fullResponse: responseText,
        });
      } catch {
        errorMessage = `${errorMessage} - ${responseText.substring(0, 200)}`;
        console.error('[Email] ❌ EmailJS API error (non-JSON):', {
          status: res.status,
          rawResponse: responseText,
        });
      }
      
      throw new EmailError(errorMessage, `HTTP_${res.status}`, { response: responseText, errorData });
    }

    console.log('[Email] ✅ Order confirmation email sent successfully!', {
      to: `${to.substring(0, 3)}***@${to.split('@')[1]}`,
      orderRef,
      duration: `${duration}ms`,
    });
    
    return { success: true, orderRef, to };
  } catch (error) {
    console.error('[Email] ❌ Email sending error:', {
      errorName: error.name,
      errorMessage: error.message,
      errorCode: error.code,
      originalError: error.originalError,
      stack: error.stack,
    });
    
    // Handle network errors, timeouts, etc.
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      throw new EmailError('Email sending timed out. Please try again.', 'TIMEOUT', error);
    }
    if (error instanceof EmailError) {
      throw error;
    }
    throw new EmailError(`Email sending failed: ${error.message}`, 'NETWORK_ERROR', error);
  }
}

/**
 * Send admin notification email when a new order is placed
 * @param {Object} params - Order details
 * @param {string} params.orderRef - Order reference number
 * @param {string} params.customerName - Customer full name
 * @param {string} params.customerEmail - Customer email
 * @param {string} params.customerPhone - Customer phone
 * @param {string} params.address - Delivery address
 * @param {Array} params.items - Order items
 * @param {number} params.total - Order total
 * @returns {Promise<void>}
 */
export async function sendAdminNotification({ orderRef, customerName, customerEmail, customerPhone, address, items, total }) {
  console.log('[Email] 📧 Starting admin notification...', {
    orderRef,
    customerName,
    customerEmail: customerEmail ? `${customerEmail.substring(0, 3)}***@${customerEmail.split('@')[1]}` : 'MISSING',
    itemsCount: items?.length || 0,
    total,
  });
  
  // Only send if admin email is configured
  if (!ADMIN_EMAIL || !isEmailEnabled()) {
    console.warn('[Email] ⚠️ Admin notification skipped:', {
      hasAdminEmail: Boolean(ADMIN_EMAIL),
      isEmailEnabled: isEmailEnabled(),
    });
    return;
  }
  
  console.log('[Email] ✅ Admin notification enabled, proceeding...');

  const itemRows = (items || []).map(i => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;">${escapeHtml(i.product_name || i.name || 'Unknown')}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:center;">${i.quantity || 1}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:right;">${i.price || i.price_TND || 0} TND</td>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:right;">${(i.subtotal || (i.price || i.price_TND || 0) * (i.quantity || 1))} TND</td>
    </tr>`).join('');

  const subject = `🆕 New Order: ${orderRef || 'No Ref'}`;
  const html = `
    <div style="background:#0B0B0B;color:#fff;font-family:Inter,Arial,sans-serif;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#111111;border:1px solid #3a2f1b;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;border-bottom:1px solid #3a2f1b;background:#141414;display:flex;align-items:center;gap:12px;">
          <div style="width:10px;height:10px;border-radius:50%;background:#C9A14A;"></div>
          <h1 style="margin:0;font-size:18px;color:#C9A14A;">New Order Alert</h1>
        </div>
        <div style="padding:24px;">
          <h2 style="margin:0 0 8px;font-size:20px;color:#C9A14A;">New Order Received</h2>
          <p style="margin:0 0 16px;color:#ddd;">Order No: <strong>${orderRef || 'N/A'}</strong></p>
          
          <h3 style="margin:24px 0 8px;color:#eee;font-size:16px;">Customer Information</h3>
          <p style="margin:0 0 16px;color:#ccc;">
            <strong>Name:</strong> ${escapeHtml(customerName || 'N/A')}<br/>
            <strong>Email:</strong> ${escapeHtml(customerEmail || 'N/A')}<br/>
            <strong>Phone:</strong> ${escapeHtml(customerPhone || 'N/A')}<br/>
            <strong>Address:</strong> ${escapeHtml(address || 'N/A')}
          </p>

          <h3 style="margin:24px 0 8px;color:#eee;font-size:16px;">Order Items</h3>
          <table style="width:100%;border-collapse:collapse;background:#121212;border:1px solid #2a2a2a;">
            <thead>
              <tr>
                <th style="padding:10px 12px;text-align:left;color:#aaa;border-bottom:1px solid #2a2a2a;">Product</th>
                <th style="padding:10px 12px;text-align:center;color:#aaa;border-bottom:1px solid #2a2a2a;">Qty</th>
                <th style="padding:10px 12px;text-align:right;color:#aaa;border-bottom:1px solid #2a2a2a;">Unit</th>
                <th style="padding:10px 12px;text-align:right;color:#aaa;border-bottom:1px solid #2a2a2a;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
          </table>

          <div style="margin-top:16px;text-align:right;color:#eee;">
            <div style="margin:8px 0;color:#C9A14A;font-size:18px;">Total: <strong>${total} TND</strong></div>
          </div>

          <div style="margin-top:20px;padding:12px;background:#1a1a1a;border-left:3px solid #C9A14A;">
            <p style="margin:0;color:#ddd;font-size:14px;">
              <strong>Action Required:</strong> Please contact the customer via Messenger to confirm delivery details.
            </p>
          </div>
        </div>
        <div style="padding:16px 24px;border-top:1px solid #3a2f1b;background:#141414;color:#aaa;font-size:12px;">
          <p style="margin:0;">Cigar Lounge Tunisia • Admin Notification</p>
        </div>
      </div>
    </div>`;

  const payload = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: PUBLIC_KEY,
    template_params: {
      to_email: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      user_email: ADMIN_EMAIL,
      reply_to: customerEmail || ADMIN_EMAIL,
      subject,
      html_message: html
    }
  };

  console.log('[Email] 📤 Sending admin notification via EmailJS API...', {
    serviceId: SERVICE_ID.substring(0, 8) + '...',
    templateId: TEMPLATE_ID.substring(0, 8) + '...',
    toEmail: `${ADMIN_EMAIL.substring(0, 3)}***@${ADMIN_EMAIL.split('@')[1]}`,
    replyTo: customerEmail ? `${customerEmail.substring(0, 3)}***@${customerEmail.split('@')[1]}` : ADMIN_EMAIL,
    subject,
    htmlLength: html.length,
  });

  try {
    const startTime = Date.now();
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000)
    });

    const duration = Date.now() - startTime;
    const responseText = await res.text();
    
    console.log('[Email] 📥 Admin notification API response:', {
      status: res.status,
      statusText: res.statusText,
      duration: `${duration}ms`,
      responseLength: responseText.length,
    });

    if (!res.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { raw: responseText.substring(0, 200) };
      }
      
      console.error('[Email] ❌ Admin notification failed:', {
        status: res.status,
        statusText: res.statusText,
        error: errorData,
        fullResponse: responseText,
      });
      // Don't throw - admin notification failure shouldn't block order processing
      return;
    }

    console.log('[Email] ✅ Admin notification sent successfully!', {
      orderRef,
      duration: `${duration}ms`,
    });
  } catch (error) {
    console.error('[Email] ❌ Admin notification error:', {
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
    });
    // Don't throw - admin notification failure shouldn't block order processing
  }
}

function escapeHtml(s = '') {
  return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}


