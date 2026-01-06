import { describe, it, expect } from 'vitest';
import { capitalize } from './capitalize.js';

describe('capitalize', () => {
	it('should capitalize first letter of each word', () => {
		expect(capitalize('hello world')).toBe('Hello World');
	});

	it('should handle single letter words', () => {
		expect(capitalize('a b c')).toBe('a b c');
	});

	it('should handle empty string', () => {
		expect(capitalize('')).toBe('');
	});

	it('should handle single word', () => {
		expect(capitalize('hello')).toBe('Hello');
	});

	it('should handle already capitalized words', () => {
		expect(capitalize('Hello World')).toBe('Hello World');
	});

	it('should handle mixed case', () => {
		expect(capitalize('hELLo wOrLd')).toBe('HELLo WOrLd');
	});
});









