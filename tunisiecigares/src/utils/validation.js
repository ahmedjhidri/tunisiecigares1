// Input validation and sanitization utilities

/**
 * Sanitize string input to prevent XSS attacks
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * Validate and sanitize email address
 * @param {string} email - Email to validate
 * @returns {object} { valid: boolean, sanitized: string, error?: string }
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, sanitized: '', error: 'Email is required' };
  }

  const sanitized = sanitizeString(email).toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    return { valid: false, sanitized, error: 'Invalid email format' };
  }

  // Additional length check
  if (sanitized.length > 254) {
    return { valid: false, sanitized, error: 'Email is too long' };
  }

  return { valid: true, sanitized };
}

/**
 * Validate and sanitize phone number
 * @param {string} phone - Phone number to validate
 * @returns {object} { valid: boolean, sanitized: string, error?: string }
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, sanitized: '', error: 'Phone is required' };
  }

  const sanitized = sanitizeString(phone);
  // Basic phone validation (adjust regex for your country format)
  const phoneRegex = /^\+?[0-9\s\-()]+$/;

  if (!phoneRegex.test(sanitized)) {
    return { valid: false, sanitized, error: 'Invalid phone format' };
  }

  // Remove non-digit characters for length check
  const digitsOnly = sanitized.replace(/\D/g, '');
  if (digitsOnly.length < 8 || digitsOnly.length > 15) {
    return { valid: false, sanitized, error: 'Phone number length invalid' };
  }

  return { valid: true, sanitized };
}

/**
 * Validate and sanitize name (first name, last name)
 * @param {string} name - Name to validate
 * @returns {object} { valid: boolean, sanitized: string, error?: string }
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, sanitized: '', error: 'Name is required' };
  }

  const sanitized = sanitizeString(name);

  if (sanitized.length < 2) {
    return { valid: false, sanitized, error: 'Name must be at least 2 characters' };
  }

  if (sanitized.length > 100) {
    return { valid: false, sanitized, error: 'Name is too long' };
  }

  // Allow letters, spaces, hyphens, apostrophes (for names like O'Brien, Mary-Jane)
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
  if (!nameRegex.test(sanitized)) {
    return { valid: false, sanitized, error: 'Name contains invalid characters' };
  }

  return { valid: true, sanitized };
}

/**
 * Validate and sanitize address
 * @param {string} address - Address to validate
 * @returns {object} { valid: boolean, sanitized: string, error?: string }
 */
export function validateAddress(address) {
  if (!address || typeof address !== 'string') {
    return { valid: false, sanitized: '', error: 'Address is required' };
  }

  const sanitized = sanitizeString(address);

  if (sanitized.length < 10) {
    return { valid: false, sanitized, error: 'Address is too short' };
  }

  if (sanitized.length > 500) {
    return { valid: false, sanitized, error: 'Address is too long' };
  }

  return { valid: true, sanitized };
}

/**
 * Validate age
 * @param {string|number} age - Age to validate
 * @returns {object} { valid: boolean, age?: number, error?: string }
 */
export function validateAge(age) {
  const ageNum = typeof age === 'string' ? parseInt(age, 10) : age;

  if (isNaN(ageNum)) {
    return { valid: false, error: 'Age must be a number' };
  }

  if (ageNum < 18) {
    return { valid: false, error: 'Must be 18 or older' };
  }

  if (ageNum > 120) {
    return { valid: false, error: 'Invalid age' };
  }

  return { valid: true, age: ageNum };
}

/**
 * Validate quantity
 * @param {string|number} quantity - Quantity to validate
 * @returns {object} { valid: boolean, quantity?: number, error?: string }
 */
export function validateQuantity(quantity) {
  const qtyNum = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;

  if (isNaN(qtyNum)) {
    return { valid: false, error: 'Quantity must be a number' };
  }

  if (qtyNum < 1) {
    return { valid: false, error: 'Quantity must be at least 1' };
  }

  if (qtyNum > 1000) {
    return { valid: false, error: 'Quantity is too large' };
  }

  return { valid: true, quantity: qtyNum };
}

/**
 * Sanitize order notes
 * @param {string} notes - Notes to sanitize
 * @returns {string} Sanitized notes
 */
export function sanitizeNotes(notes) {
  if (!notes || typeof notes !== 'string') return '';
  
  return sanitizeString(notes).substring(0, 1000); // Limit length
}

/**
 * Validate entire order form data
 * @param {object} formData - Form data object
 * @returns {object} { valid: boolean, errors: object, sanitized?: object }
 */
export function validateOrderForm(formData) {
  const errors = {};
  const sanitized = {};

  // Validate first name
  const firstNameResult = validateName(formData.firstName);
  if (!firstNameResult.valid) {
    errors.firstName = firstNameResult.error;
  } else {
    sanitized.firstName = firstNameResult.sanitized;
  }

  // Validate last name
  const lastNameResult = validateName(formData.lastName);
  if (!lastNameResult.valid) {
    errors.lastName = lastNameResult.error;
  } else {
    sanitized.lastName = lastNameResult.sanitized;
  }

  // Validate email
  const emailResult = validateEmail(formData.email);
  if (!emailResult.valid) {
    errors.email = emailResult.error;
  } else {
    sanitized.email = emailResult.sanitized;
  }

  // Validate phone
  const phoneResult = validatePhone(formData.phone);
  if (!phoneResult.valid) {
    errors.phone = phoneResult.error;
  } else {
    sanitized.phone = phoneResult.sanitized;
  }

  // Validate address
  const addressResult = validateAddress(formData.address);
  if (!addressResult.valid) {
    errors.address = addressResult.error;
  } else {
    sanitized.address = addressResult.sanitized;
  }

  // Validate age
  const ageResult = validateAge(formData.age);
  if (!ageResult.valid) {
    errors.age = ageResult.error;
  } else {
    sanitized.age = ageResult.age;
  }

  // Validate quantity (if provided)
  if (formData.quantity !== undefined) {
    const qtyResult = validateQuantity(formData.quantity);
    if (!qtyResult.valid) {
      errors.quantity = qtyResult.error;
    } else {
      sanitized.quantity = qtyResult.quantity;
    }
  }

  // Sanitize notes (optional)
  sanitized.notes = sanitizeNotes(formData.notes || '');

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: Object.keys(errors).length === 0 ? sanitized : null
  };
}

