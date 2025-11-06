// Lightweight EmailJS REST integration (client-side)
// Requires env vars:
//  VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export function isEmailEnabled() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export async function sendOrderEmail({ toEmail, firstName, lastName, phone, address, items, total, orderRef }) {
  if (!isEmailEnabled()) throw new Error('Email is not configured');

  const itemRows = (items || []).map(i => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;">${escapeHtml(i.product_name)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:center;">${i.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:right;">${i.price} TND</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eee;text-align:right;">${i.subtotal} TND</td>
        </tr>`).join('');

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
      to_email: toEmail,
      html_message: html
    }
  };

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Email sending failed: ${res.status} ${text}`);
  }
}

function escapeHtml(s = '') {
  return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}


