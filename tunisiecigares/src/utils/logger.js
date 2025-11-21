// Centralized logging utility
// Removes console logs in production and provides structured logging

const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

/**
 * Log levels
 */
export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4
};

// Current log level (can be configured via env)
const currentLogLevel = isDevelopment ? LogLevel.DEBUG : LogLevel.ERROR;

/**
 * Check if should log at given level
 */
function shouldLog(level) {
  return level >= currentLogLevel;
}

/**
 * Mask sensitive data in logs
 */
function maskSensitive(value, type = 'default') {
  if (!value || typeof value !== 'string') return '[REDACTED]';
  
  switch (type) {
    case 'email':
      const [local, domain] = value.split('@');
      if (!domain) return '[REDACTED]';
      return `${local.substring(0, 2)}***@${domain}`;
    
    case 'key':
    case 'token':
      if (value.length <= 8) return '***';
      return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`;
    
    case 'phone':
      if (value.length <= 4) return '***';
      return `${value.substring(0, 3)}***${value.substring(value.length - 2)}`;
    
    default:
      if (value.length <= 4) return '***';
      return `${value.substring(0, 2)}***${value.substring(value.length - 2)}`;
  }
}

/**
 * Sanitize log data to remove sensitive information
 */
function sanitizeLogData(data) {
  if (!data || typeof data !== 'object') return data;
  
  const sensitiveKeys = [
    'password', 'pass', 'pwd', 'secret', 'token', 'key', 'apiKey', 'api_key',
    'email', 'phone', 'address', 'creditCard', 'card', 'ssn', 'cvv'
  ];
  
  const sanitized = { ...data };
  
  for (const key in sanitized) {
    const lowerKey = key.toLowerCase();
    
    // Check if key contains sensitive terms
    if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
      const value = sanitized[key];
      if (typeof value === 'string') {
        if (lowerKey.includes('email')) {
          sanitized[key] = maskSensitive(value, 'email');
        } else if (lowerKey.includes('phone')) {
          sanitized[key] = maskSensitive(value, 'phone');
        } else if (lowerKey.includes('key') || lowerKey.includes('token')) {
          sanitized[key] = maskSensitive(value, 'key');
        } else {
          sanitized[key] = maskSensitive(value);
        }
      } else {
        sanitized[key] = '[REDACTED]';
      }
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeLogData(sanitized[key]);
    }
  }
  
  return sanitized;
}

/**
 * Logger class
 */
class Logger {
  debug(...args) {
    if (!shouldLog(LogLevel.DEBUG)) return;
    const sanitized = args.map(arg => 
      typeof arg === 'object' ? sanitizeLogData(arg) : arg
    );
    console.debug('[DEBUG]', ...sanitized);
  }

  info(...args) {
    if (!shouldLog(LogLevel.INFO)) return;
    const sanitized = args.map(arg => 
      typeof arg === 'object' ? sanitizeLogData(arg) : arg
    );
    console.info('[INFO]', ...sanitized);
  }

  warn(...args) {
    if (!shouldLog(LogLevel.WARN)) return;
    const sanitized = args.map(arg => 
      typeof arg === 'object' ? sanitizeLogData(arg) : arg
    );
    console.warn('[WARN]', ...sanitized);
  }

  error(...args) {
    if (!shouldLog(LogLevel.ERROR)) return;
    const sanitized = args.map(arg => 
      typeof arg === 'object' ? sanitizeLogData(arg) : arg
    );
    console.error('[ERROR]', ...sanitized);
  }

  // Special method for email logging (with extra sanitization)
  email(action, data) {
    if (!shouldLog(LogLevel.INFO)) return;
    const sanitized = sanitizeLogData({
      action,
      ...data
    });
    console.log('[EMAIL]', sanitized);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export default for convenience
export default logger;

