# EmailJS Template Variables Guide

## Customer Confirmation Email Template

When configuring your EmailJS template for customer order confirmations, use these variables:

### Required Template Variables

Your EmailJS template should include these variables using double curly braces `{{variable_name}}`:

- `{{to_email}}` - Customer email address (recipient)
- `{{to}}` - Alternative recipient field (same as to_email)
- `{{user_email}}` - User email (same as to_email)
- `{{reply_to}}` - Reply-to address (same as to_email)
- `{{subject}}` - Email subject line
- `{{customer_name}}` - Full customer name (First Last)
- `{{order_ref}}` - Order reference number (e.g., CLT-abc123)
- `{{customer_phone}}` - Customer phone number
- `{{customer_address}}` - Delivery address
- `{{order_details}}` - Formatted order items (text format)
- `{{total}}` - Total amount with currency (e.g., "120.00 TND")

### Example EmailJS Template

```
Subject: {{subject}}

Hello {{customer_name}},

Thank you for your order!

Order Reference: {{order_ref}}
Phone: {{customer_phone}}
Address: {{customer_address}}

Order Details:
{{order_details}}

Total: {{total}}

We will contact you via Messenger to confirm delivery details.

Best regards,
Tunisie Cigares
```

## Admin Notification Email Template

For admin notifications, the template uses HTML content directly:

- `{{to_email}}` - Admin email address
- `{{to}}` - Admin email (same as to_email)
- `{{user_email}}` - Admin email (same as to_email)
- `{{reply_to}}` - Customer email (for reply)
- `{{subject}}` - Email subject
- `{{html_message}}` - Full HTML email content (pre-formatted)

**Note:** Admin notifications use `html_message` which contains the complete HTML email. Your template should use `{{{html_message}}}` (triple braces) to render HTML without escaping.

## Testing Email Configuration

You can test your EmailJS configuration using the browser console:

```javascript
import { testEmailConfiguration } from './lib/email';

// Test with your email
testEmailConfiguration('your-email@example.com')
  .then(result => {
    console.log('Test result:', result);
  });
```

## Common Issues

1. **Template variables not showing**: Make sure you use `{{variable_name}}` (double braces) in your EmailJS template
2. **HTML not rendering**: Use `{{{html_message}}}` (triple braces) for HTML content
3. **Email not sending**: Check that all environment variables are set:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_ADMIN_EMAIL` (optional, for admin notifications)

## Environment Variables

Add these to your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_EMAIL=admin@example.com
```

