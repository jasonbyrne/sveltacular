/**
 * Form validation utilities and types
 */

export type ValidationRule<T = unknown> = {
	validate: (value: T) => boolean | string;
	message?: string;
};

export type ValidationResult = {
	isValid: boolean;
	message?: string;
};

/**
 * Validation rules factory
 */
export const createValidationRules = {
	/**
	 * Require a value to be present
	 */
	required: <T>(message?: string): ValidationRule<T> => ({
		validate: (value: T) => {
			if (value === null || value === undefined || value === '') {
				return false;
			}
			if (typeof value === 'string' && value.trim() === '') {
				return false;
			}
			return true;
		},
		message: message || 'This field is required'
	}),

	/**
	 * Require a minimum length
	 */
	minLength: (min: number, message?: string): ValidationRule<string> => ({
		validate: (value: string) => value.length >= min,
		message: message || `Must be at least ${min} characters`
	}),

	/**
	 * Require a maximum length
	 */
	maxLength: (max: number, message?: string): ValidationRule<string> => ({
		validate: (value: string) => value.length <= max,
		message: message || `Must be no more than ${max} characters`
	}),

	/**
	 * Require a minimum value
	 */
	min: (min: number, message?: string): ValidationRule<number> => ({
		validate: (value: number) => value >= min,
		message: message || `Must be at least ${min}`
	}),

	/**
	 * Require a maximum value
	 */
	max: (max: number, message?: string): ValidationRule<number> => ({
		validate: (value: number) => value <= max,
		message: message || `Must be no more than ${max}`
	}),

	/**
	 * Match a regular expression pattern
	 */
	pattern: (regex: RegExp, message?: string): ValidationRule<string> => ({
		validate: (value: string) => regex.test(value),
		message: message || 'Invalid format'
	}),

	/**
	 * Validate email format
	 */
	email: (message?: string): ValidationRule<string> => ({
		validate: (value: string) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(value);
		},
		message: message || 'Invalid email address'
	}),

	/**
	 * Validate URL format
	 */
	url: (message?: string): ValidationRule<string> => ({
		validate: (value: string) => {
			try {
				new URL(value);
				return true;
			} catch {
				return false;
			}
		},
		message: message || 'Invalid URL'
	}),

	/**
	 * Custom validation function
	 */
	custom: <T>(validator: (value: T) => boolean | string, message?: string): ValidationRule<T> => ({
		validate: validator,
		message
	})
};

/**
 * Validate a value against multiple rules
 */
export const validate = <T>(value: T, rules: ValidationRule<T>[]): ValidationResult => {
	for (const rule of rules) {
		const result = rule.validate(value);
		if (result === false) {
			return {
				isValid: false,
				message: rule.message || 'Validation failed'
			};
		}
		if (typeof result === 'string') {
			return {
				isValid: false,
				message: result
			};
		}
	}
	return { isValid: true };
};

/**
 * Validate multiple fields
 */
export const validateForm = <T extends Record<string, unknown>>(
	values: T,
	rules: Partial<Record<keyof T, ValidationRule<unknown>[]>>
): Partial<Record<keyof T, ValidationResult>> => {
	const results: Partial<Record<keyof T, ValidationResult>> = {};
	for (const [field, fieldRules] of Object.entries(rules)) {
		if (fieldRules) {
			results[field as keyof T] = validate(values[field], fieldRules);
		}
	}
	return results;
};




