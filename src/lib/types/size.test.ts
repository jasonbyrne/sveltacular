import { describe, it, expect } from 'vitest';
import { getMaxWidth, getDisplayType, type ComponentSize } from './size.js';

describe('size utilities', () => {
	describe('getMaxWidth', () => {
		it('should return correct width for sm', () => {
			expect(getMaxWidth('sm')).toBe('10rem');
		});

		it('should return correct width for md', () => {
			expect(getMaxWidth('md')).toBe('20rem');
		});

		it('should return correct width for lg', () => {
			expect(getMaxWidth('lg')).toBe('30rem');
		});

		it('should return correct width for xl', () => {
			expect(getMaxWidth('xl')).toBe('auto');
		});

		it('should return correct width for full', () => {
			expect(getMaxWidth('full')).toBe('100%');
		});
	});

	describe('getDisplayType', () => {
		it('should return inline-block for sm, md, lg', () => {
			expect(getDisplayType('sm')).toBe('inline-block');
			expect(getDisplayType('md')).toBe('inline-block');
			expect(getDisplayType('lg')).toBe('inline-block');
		});

		it('should return block for xl and full', () => {
			expect(getDisplayType('xl')).toBe('block');
			expect(getDisplayType('full')).toBe('block');
		});
	});
});





