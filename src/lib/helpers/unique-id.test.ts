import { describe, it, expect } from 'vitest';
import { uniqueId } from './unique-id.js';

describe('uniqueId', () => {
	it('should generate a string', () => {
		const id = uniqueId();
		expect(typeof id).toBe('string');
	});

	it('should generate unique IDs', () => {
		const id1 = uniqueId();
		const id2 = uniqueId();
		expect(id1).not.toBe(id2);
	});

	it('should generate non-empty strings', () => {
		const id = uniqueId();
		expect(id.length).toBeGreaterThan(0);
	});

	it('should generate hexadecimal strings', () => {
		const id = uniqueId();
		expect(/^[0-9a-f]+$/i.test(id)).toBe(true);
	});
});














