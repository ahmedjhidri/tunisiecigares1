// Lightweight EmailJS REST integration (client-side)
// Requires env vars:
//  VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
//  VITE_ADMIN_EMAIL (optional, for admin notifications)

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

export function isEmailEnabled() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
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
  if (!isEmailEnabled()) {
    throw new EmailError('Email is not configured. Please check your environment variables.', 'NOT_CONFIGURED');
  }
  
  const to = (toEmail || '').trim();
  if (!to) {
    throw new EmailError('Recipient email is empty', 'INVALID_EMAIL');
  }
  
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(to)) {
    throw new EmailError('Recipient email is invalid', 'INVALID_EMAIL');
  }

  const itemRows = (items || []).map(i => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;">${escapeHtml(i.product_name)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:center;">${i.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:right;">${i.price} TND</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:right;">${i.subtotal} TND</td>
        </tr>`).join('');

  const subject = `Order ${orderRef || ''} confirmed`;
  const html = `
    <div style="background:#0B0B0B;color:#fff;font-family:Inter,Arial,sans-serif;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#111111;border:1px solid #3a2f1b;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;border-bottom:1px solid #3a2f1b;background:#141414;display:flex;align-items:center;gap:12px;">
          <div style="width:10px;height:10px;border-radius:50%;background:#C9A14A;"></div>
          <h1 style="margin:0;font-size:18px;color:#C9A14A;">Cigar Lounge Tunisia</h1>
        </div>
        <div style="padding:24px;">
          <h2 style="margin:0 0 8px;font-size:20px;color:#C9A14A;">Order Confirmed</h2>
          <p style="margin:0 0 16px;color:#ddd;">Order No: <strong>${orderRef || ''}</strong></p>
          <h3 style="margin:24px 0 8px;color:#eee;font-size:16px;">Customer</h3>
          <p style="margin:0 0 16px;color:#ccc;">${escapeHtml(firstName)} ${escapeHtml(lastName)}<br/>${escapeHtml(phone || '')}<br/>${escapeHtml(address || '')}</p>

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
            <div style="margin:4px 0;">Subtotal: <strong>${total} TND</strong></div>
            <div style="margin:4px 0;">Delivery: <strong>TBD</strong></div>
            <div style="margin:8px 0;color:#C9A14A;">Grand Total: <strong>${total} TND</strong></div>
          </div>

          <div style="margin-top:20px;color:#bbb;font-size:12px;line-height:1.6;">
            <p><strong>18+ only.</strong> Smoking is harmful to your health.</p>
            <p>We will contact you via Messenger to confirm delivery details.</p>
          </div>
        </div>
        <div style="padding:16px 24px;border-top:1px solid #3a2f1b;background:#141414;color:#aaa;font-size:12px;">
          <p style="margin:0;">Cigar Lounge Tunisia • Contact us on Messenger</p>
        </div>
      </div>
    </div>`;

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
      html_message: html
    }
  };

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Add timeout
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    if (!res.ok) {
      const text = await res.text();
      let errorMessage = `Email sending failed: ${res.status}`;
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = `${errorMessage} - ${text.substring(0, 100)}`;
      }
      throw new EmailError(errorMessage, `HTTP_${res.status}`);
    }

    // Log success in development
    if (import.meta.env.DEV) {
      console.log('[Email] Order confirmation sent successfully to', to);
    }
  } catch (error) {
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
  // Only send if admin email is configured
  if (!ADMIN_EMAIL || !isEmailEnabled()) {
    if (import.meta.env.DEV) {
      console.warn('[Email] Admin notification skipped - ADMIN_EMAIL not configured');
    }
    return;
  }

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

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[Email] Admin notification failed:', res.status, text);
      // Don't throw - admin notification failure shouldn't block order processing
      return;
    }

    if (import.meta.env.DEV) {
      console.log('[Email] Admin notification sent successfully');
    }
  } catch (error) {
    console.error('[Email] Admin notification error:', error);
    // Don't throw - admin notification failure shouldn't block order processing
  }
}

function escapeHtml(s = '') {
  return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}


