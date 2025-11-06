// Lightweight EmailJS REST integration (client-side)
// Requires env vars:
//  VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export function isEmailEnabled() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export async function sendOrderEmail({ toEmail, firstName, lastName, phone, address, items, total }) {
  if (!isEmailEnabled()) throw new Error('Email is not configured');

  const itemLines = (items || []).map(i => `${i.quantity} × ${i.product_name} — ${i.subtotal} TND`).join('\n');

  const payload = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: PUBLIC_KEY,
    template_params: {
      to_email: toEmail,
      customer_name: `${firstName} ${lastName}`.trim(),
      phone,
      address,
      order_lines: itemLines,
      total: `${total} TND`
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


