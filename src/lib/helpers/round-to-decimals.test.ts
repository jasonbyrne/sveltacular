import { describe, it, expect } from 'vitest';
import { roundToDecimals, formatNumber } from './round-to-decimals.js';

describe('roundToDecimals', () => {
	it('should round to specified decimal places', () => {
		expect(roundToDecimals(3.14159, 2)).toBe(3.14);
	});

	it('should round to zero decimals', () => {
		expect(roundToDecimals(3.7, 0)).toBe(4);
	});

	it('should handle negative numbers', () => {
		expect(roundToDecimals(-3.14159, 2)).toBe(-3.14);
	});

	it('should handle zero', () => {
		expect(roundToDecimals(0, 2)).toBe(0);
	});

	it('should handle large numbers', () => {
		expect(roundToDecimals(1234.56789, 1)).toBe(1234.6);
	});
});

describe('formatNumber', () => {
	it('should format number with decimals', () => {
		const result = formatNumber(1234.56, 1);
		expect(result).toMatch(/1[,.]234[.,]6/); // Handles locale differences
	});

	it('should format integer', () => {
		const result = formatNumber(1234, 0);
		expect(result).toMatch(/1[,.]234/);
	});
});


