import { describe, it, expect } from 'vitest';
import { createValidationRules, validate, validateForm } from './validation.js';

describe('createValidationRules', () => {
	describe('required', () => {
		it('should fail for empty string', () => {
			const rule = createValidationRules.required();
			expect(rule.validate('')).toBe(false);
		});

		it('should fail for null', () => {
			const rule = createValidationRules.required();
			expect(rule.validate(null)).toBe(false);
		});

		it('should fail for undefined', () => {
			const rule = createValidationRules.required();
			expect(rule.validate(undefined)).toBe(false);
		});

		it('should pass for non-empty string', () => {
			const rule = createValidationRules.required();
			expect(rule.validate('hello')).toBe(true);
		});

		it('should use custom message', () => {
			const rule = createValidationRules.required('Custom message');
			expect(rule.message).toBe('Custom message');
		});
	});

	describe('minLength', () => {
		it('should fail for string shorter than min', () => {
			const rule = createValidationRules.minLength(5);
			expect(rule.validate('hi')).toBe(false);
		});

		it('should pass for string equal to min', () => {
			const rule = createValidationRules.minLength(5);
			expect(rule.validate('hello')).toBe(true);
		});

		it('should pass for string longer than min', () => {
			const rule = createValidationRules.minLength(5);
			expect(rule.validate('hello world')).toBe(true);
		});
	});

	describe('maxLength', () => {
		it('should pass for string shorter than max', () => {
			const rule = createValidationRules.maxLength(5);
			expect(rule.validate('hi')).toBe(true);
		});

		it('should pass for string equal to max', () => {
			const rule = createValidationRules.maxLength(5);
			expect(rule.validate('hello')).toBe(true);
		});

		it('should fail for string longer than max', () => {
			const rule = createValidationRules.maxLength(5);
			expect(rule.validate('hello world')).toBe(false);
		});
	});

	describe('min', () => {
		it('should fail for number less than min', () => {
			const rule = createValidationRules.min(5);
			expect(rule.validate(3)).toBe(false);
		});

		it('should pass for number equal to min', () => {
			const rule = createValidationRules.min(5);
			expect(rule.validate(5)).toBe(true);
		});

		it('should pass for number greater than min', () => {
			const rule = createValidationRules.min(5);
			expect(rule.validate(10)).toBe(true);
		});
	});

	describe('max', () => {
		it('should pass for number less than max', () => {
			const rule = createValidationRules.max(5);
			expect(rule.validate(3)).toBe(true);
		});

		it('should pass for number equal to max', () => {
			const rule = createValidationRules.max(5);
			expect(rule.validate(5)).toBe(true);
		});

		it('should fail for number greater than max', () => {
			const rule = createValidationRules.max(5);
			expect(rule.validate(10)).toBe(false);
		});
	});

	describe('email', () => {
		it('should pass for valid email', () => {
			const rule = createValidationRules.email();
			expect(rule.validate('test@example.com')).toBe(true);
		});

		it('should fail for invalid email', () => {
			const rule = createValidationRules.email();
			expect(rule.validate('not-an-email')).toBe(false);
		});

		it('should fail for email without @', () => {
			const rule = createValidationRules.email();
			expect(rule.validate('testexample.com')).toBe(false);
		});
	});

	describe('url', () => {
		it('should pass for valid URL', () => {
			const rule = createValidationRules.url();
			expect(rule.validate('https://example.com')).toBe(true);
		});

		it('should fail for invalid URL', () => {
			const rule = createValidationRules.url();
			expect(rule.validate('not-a-url')).toBe(false);
		});
	});
});

describe('validate', () => {
	it('should return isValid true when all rules pass', () => {
		const rules = [
			createValidationRules.required(),
			createValidationRules.minLength(3)
		];
		const result = validate('hello', rules);
		expect(result.isValid).toBe(true);
	});

	it('should return isValid false when any rule fails', () => {
		const rules = [
			createValidationRules.required(),
			createValidationRules.minLength(10)
		];
		const result = validate('hi', rules);
		expect(result.isValid).toBe(false);
		expect(result.message).toBeDefined();
	});

	it('should return custom message from rule', () => {
		const rules = [
			createValidationRules.required('Custom required message')
		];
		const result = validate('', rules);
		expect(result.isValid).toBe(false);
		expect(result.message).toBe('Custom required message');
	});
});

describe('validateForm', () => {
	it('should validate multiple fields', () => {
		const values = {
			name: 'John',
			email: 'john@example.com',
			age: 25
		};
		const rules = {
			name: [createValidationRules.required(), createValidationRules.minLength(3)],
			email: [createValidationRules.required(), createValidationRules.email()],
			age: [createValidationRules.min(18)]
		};
		const results = validateForm(values, rules);
		expect(results.name?.isValid).toBe(true);
		expect(results.email?.isValid).toBe(true);
		expect(results.age?.isValid).toBe(true);
	});

	it('should return validation errors for invalid fields', () => {
		const values = {
			name: '',
			email: 'invalid-email',
			age: 15
		};
		const rules = {
			name: [createValidationRules.required()],
			email: [createValidationRules.email()],
			age: [createValidationRules.min(18)]
		};
		const results = validateForm(values, rules);
		expect(results.name?.isValid).toBe(false);
		expect(results.email?.isValid).toBe(false);
		expect(results.age?.isValid).toBe(false);
	});
});

