export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [field: string]: ValidationRule;
}

export interface ValidationErrors {
  [field: string]: string;
}

export function validateField(value: string, rule: ValidationRule): string | null {
  if (rule.required && (!value || value.trim() === '')) {
    return 'This field is required';
  }

  if (value && rule.minLength && value.length < rule.minLength) {
    return `Must be at least ${rule.minLength} characters`;
  }

  if (value && rule.maxLength && value.length > rule.maxLength) {
    return `Must be no more than ${rule.maxLength} characters`;
  }

  if (value && rule.pattern && !rule.pattern.test(value)) {
    return 'Invalid format';
  }

  if (value && rule.custom) {
    return rule.custom(value);
  }

  return null;
}

export function validateForm<T extends Record<string, string>>(
  data: T,
  rules: ValidationRules
): ValidationErrors {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach(field => {
    const value = data[field] || '';
    const rule = rules[field];
    const error = validateField(value, rule);
    
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

// Common validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-()]+$/,
  url: /^https?:\/\/.+\..+/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};
