// Phone number input mask for Tunisia (+216 XX XXX XXX)
export function formatPhoneNumber(value) {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // If starts with 216, keep it, otherwise add +216
  let formatted = digits.startsWith('216') ? digits.slice(3) : digits;
  
  // Limit to 8 digits (Tunisian phone numbers)
  formatted = formatted.slice(0, 8);
  
  // Format: +216 XX XXX XXX
  if (formatted.length === 0) return '';
  if (formatted.length <= 2) return `+216 ${formatted}`;
  if (formatted.length <= 5) return `+216 ${formatted.slice(0, 2)} ${formatted.slice(2)}`;
  return `+216 ${formatted.slice(0, 2)} ${formatted.slice(2, 5)} ${formatted.slice(5)}`;
}

export function validatePhoneNumber(phone) {
  // Remove formatting to check digits
  const digits = phone.replace(/\D/g, '');
  // Should have 11 digits total (+216 + 8 digits) or 8 digits (local format)
  return digits.length === 8 || digits.length === 11;
}
