// Lightweight EmailJS REST integration (client-side)
// Requires env vars:
//  VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

import { logger } from '../utils/logger.js';

// Load EmailJS configuration from environment variables
// Note: Vite requires VITE_ prefix and variables must be available at build time
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Debug: Log configuration on module load (only in dev mode)
if (import.meta.env.DEV) {
  logger.debug('Email module loaded', {
    hasServiceId: Boolean(SERVICE_ID),
    hasTemplateId: Boolean(TEMPLATE_ID),
    hasPublicKey: Boolean(PUBLIC_KEY),
  });
}

export function isEmailEnabled() {
  const enabled = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
  
  if (!enabled) {
    logger.warn('Email is not enabled - check environment variables');
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

  const customerName = `${escapeHtml(firstName)} ${escapeHtml(lastName)}`;
  const subject = `✅ Commande ${orderRef || ''} confirmée - Tunisie Cigares`;

  // Generate HTML email content
  const itemRows = (items || []).map(i => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;">${escapeHtml(i.product_name || i.name || 'Unknown')}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:center;">${i.quantity || 1}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:right;">${i.price || i.price_TND || 0} TND</td>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:right;">${(i.subtotal || (i.price || i.price_TND || 0) * (i.quantity || 1))} TND</td>
    </tr>`).join('');

  const html = `
    <div style="background:#0B0B0B;color:#fff;font-family:Inter,Arial,sans-serif;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#111111;border:1px solid #3a2f1b;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;border-bottom:1px solid #3a2f1b;background:#141414;display:flex;align-items:center;gap:12px;">
          <div style="width:10px;height:10px;border-radius:50%;background:#C9A14A;"></div>
          <h1 style="margin:0;font-size:18px;color:#C9A14A;">Commande Confirmée</h1>
        </div>
        <div style="padding:24px;">
          <h2 style="margin:0 0 8px;font-size:20px;color:#C9A14A;">Bonjour ${customerName},</h2>
          <p style="margin:0 0 16px;color:#ddd;">Votre commande <strong>${orderRef || 'N/A'}</strong> a été confirmée avec succès !</p>
          
          <h3 style="margin:24px 0 8px;color:#eee;font-size:16px;">Vos Informations</h3>
          <p style="margin:0 0 16px;color:#ccc;">
            <strong>Nom:</strong> ${customerName}<br/>
            <strong>Email:</strong> ${escapeHtml(to)}<br/>
            <strong>Téléphone:</strong> ${escapeHtml(phone || 'N/A')}<br/>
            <strong>Adresse:</strong> ${escapeHtml(address || 'N/A')}
          </p>

          <h3 style="margin:24px 0 8px;color:#eee;font-size:16px;">Détails de la Commande</h3>
          <table style="width:100%;border-collapse:collapse;background:#121212;border:1px solid #2a2a2a;">
            <thead>
              <tr>
                <th style="padding:10px 12px;text-align:left;color:#aaa;border-bottom:1px solid #2a2a2a;">Produit</th>
                <th style="padding:10px 12px;text-align:center;color:#aaa;border-bottom:1px solid #2a2a2a;">Qté</th>
                <th style="padding:10px 12px;text-align:right;color:#aaa;border-bottom:1px solid #2a2a2a;">Prix Unitaire</th>
                <th style="padding:10px 12px;text-align:right;color:#aaa;border-bottom:1px solid #2a2a2a;">Sous-total</th>
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
              <strong>Prochaines Étapes:</strong> Nous vous contacterons prochainement via Messenger pour confirmer les détails de livraison.
            </p>
          </div>
        </div>
        <div style="padding:16px 24px;border-top:1px solid #3a2f1b;background:#141414;color:#aaa;font-size:12px;">
          <p style="margin:0;">Merci pour votre confiance ! • Tunisie Cigares</p>
        </div>
      </div>
    </div>`;

  // EmailJS template variables
  // Template should use: {{to_email}} and {{{html_message}}}
  const payload = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: PUBLIC_KEY,
    template_params: {
      to_email: to, // CRITICAL: Template "To Email" field MUST use {{to_email}}
      to,
      user_email: to,
      reply_to: to,
      subject,
      html_message: html,
      // Also include text variables for compatibility
      customer_name: customerName,
      order_ref: orderRef || 'N/A',
      customer_phone: escapeHtml(phone || 'N/A'),
      customer_address: escapeHtml(address || 'N/A'),
      total: `${total} TND`,
    }
  };
  
  console.log('[Email] Customer email payload (HTML):', {
    templateId: TEMPLATE_ID.substring(0, 8) + '...',
    recipient: `${to.substring(0, 3)}***@${to.split('@')[1]}`,
    hasHtmlMessage: true, // Customer email now uses HTML
    htmlLength: html.length,
    note: '⚠️ Make sure customer template uses {{to_email}} and {{{html_message}}} (triple braces)',
  });

  console.log('[Email] 📤 Sending email via EmailJS API...', {
    serviceId: SERVICE_ID.substring(0, 8) + '...',
    templateId: TEMPLATE_ID.substring(0, 8) + '...',
    recipient: `${to.substring(0, 3)}***@${to.split('@')[1]}`,
    templateParams: {
      to_email: `${to.substring(0, 3)}***`,
      customer_name: customerName,
      order_ref: orderRef,
      subject,
      hasHtmlMessage: Boolean(payload.template_params.html_message),
      itemsCount: items?.length || 0,
      total: `${total} TND`,
    },
    allTemplateParamKeys: Object.keys(payload.template_params),
    important: '⚠️ Make sure your EmailJS template "To Email" field uses {{to_email}}',
  });

  try {
    const startTime = Date.now();
    const requestUrl = 'https://api.emailjs.com/api/v1.0/email/send';
    const requestBody = JSON.stringify(payload);
    
    console.log('[Email] 🔄 STEP 1: Preparing EmailJS API request...', {
      url: requestUrl,
      method: 'POST',
      payloadSize: requestBody.length,
      hasHtmlMessage: Boolean(payload.template_params.html_message),
      htmlMessageLength: payload.template_params.html_message?.length || 0,
      toEmail: payload.template_params.to_email,
      templateId: payload.template_id,
      serviceId: payload.service_id,
    });
    
    console.log('[Email] 🔄 STEP 2: Making fetch() call to EmailJS...');
    
    let res;
    try {
      res = await fetch(requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      signal: AbortSignal.timeout(30000) // 30 second timeout
      });
      console.log('[Email] 🔄 STEP 3: Fetch completed, response received:', {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok,
        headersReceived: true,
      });
    } catch (fetchError) {
      console.error('[Email] ❌ STEP 3 FAILED: Fetch error occurred:', {
        errorName: fetchError.name,
        errorMessage: fetchError.message,
        errorStack: fetchError.stack,
        isNetworkError: fetchError.name === 'TypeError' || fetchError.name === 'NetworkError',
        isTimeout: fetchError.name === 'AbortError' || fetchError.name === 'TimeoutError',
      });
      throw new EmailError(`Network error: ${fetchError.message}`, 'NETWORK_ERROR', fetchError);
    }

    const duration = Date.now() - startTime;
    console.log('[Email] 🔄 STEP 4: Reading response text...');
    
    let responseText;
    try {
      responseText = await res.text();
      console.log('[Email] 🔄 STEP 5: Response text read:', {
        length: responseText.length,
        preview: responseText.substring(0, 200),
      });
    } catch (textError) {
      console.error('[Email] ❌ STEP 5 FAILED: Error reading response text:', textError);
      throw new EmailError(`Failed to read response: ${textError.message}`, 'RESPONSE_ERROR', textError);
    }
    
    console.log('[Email] 📥 EmailJS API response received:', {
      status: res.status,
      statusText: res.statusText,
      duration: `${duration}ms`,
      responseLength: responseText.length,
      responsePreview: responseText.substring(0, 200),
      ok: res.ok,
    });

    if (!res.ok) {
      let errorData;
      let errorMessage = `Email sending failed: ${res.status} ${res.statusText}`;
      
      try {
        errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.text || errorMessage;
        
        // Provide specific error messages for common EmailJS errors
        if (res.status === 400) {
          errorMessage = `EmailJS Template Error (400): ${errorData.text || errorData.message || 'Check your template configuration. Make sure "To Email" field uses {{to_email}}'}`;
        } else if (res.status === 401) {
          errorMessage = `EmailJS Authentication Error (401): Invalid Public Key. Check VITE_EMAILJS_PUBLIC_KEY`;
        } else if (res.status === 404) {
          errorMessage = `EmailJS Not Found (404): Service or Template ID incorrect. Check VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_TEMPLATE_ID`;
        } else if (res.status === 429) {
          errorMessage = `EmailJS Quota Exceeded (429): You have reached your email limit. Check your EmailJS dashboard.`;
        }
        
        console.error('[Email] ❌ EmailJS API error response:', {
          status: res.status,
          statusText: res.statusText,
          error: errorData,
          fullResponse: responseText,
          suggestion: res.status === 400 ? '⚠️ IMPORTANT: Check your EmailJS template. The "To Email" field MUST use {{to_email}}' : null,
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
    
    // Verify response indicates success
    if (res.status === 200) {
      try {
        const responseData = JSON.parse(responseText);
        console.log('[Email] ✅ EmailJS confirmed email sent:', {
          status: res.status,
          response: responseData,
          recipient: `${to.substring(0, 3)}***@${to.split('@')[1]}`,
        });
      } catch {
        // Response is not JSON but status is 200, which is OK
        console.log('[Email] ✅ EmailJS returned 200 OK (email should be sent)');
      }
    }

    console.log('[Email] ✅ Order confirmation email sent successfully!', {
      to: `${to.substring(0, 3)}***@${to.split('@')[1]}`,
      orderRef,
      duration: `${duration}ms`,
    });
    
    console.log('✅ Email client sent successfully');
    
    return { success: true, orderRef, to };
  } catch (error) {
    console.error('[Email] ❌ Email sending error:', {
      errorName: error.name,
      errorMessage: error.message,
      errorCode: error.code,
      originalError: error.originalError,
      stack: error.stack,
    });
    
    console.error(`❌ Email failed: ${error.message}`);
    
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


function escapeHtml(s = '') {
  return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}


