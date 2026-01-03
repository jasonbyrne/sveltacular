import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import ago from './ago.js';

describe('ago', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should return "just now" for very recent dates', () => {
		const date = new Date('2024-01-15T11:59:50Z');
		expect(ago(date, 'medium')).toBe('just now');
	});

	it('should return seconds for dates less than a minute ago', () => {
		const date = new Date('2024-01-15T11:59:30Z');
		const result = ago(date, 'medium');
		expect(result).toContain('second');
	});

	it('should return minutes for dates less than an hour ago', () => {
		const date = new Date('2024-01-15T11:30:00Z');
		const result = ago(date, 'medium');
		expect(result).toContain('minute');
	});

	it('should return hours for dates less than a day ago', () => {
		const date = new Date('2024-01-15T10:00:00Z');
		const result = ago(date, 'medium');
		expect(result).toContain('hour');
	});

	it('should return days for dates less than a week ago', () => {
		const date = new Date('2024-01-10T12:00:00Z');
		const result = ago(date, 'medium');
		expect(result).toContain('day');
	});

	it('should return weeks for dates less than a year ago', () => {
		const date = new Date('2024-01-01T12:00:00Z');
		const result = ago(date, 'medium');
		expect(result).toContain('week');
	});

	it('should return years for dates more than a year ago', () => {
		const date = new Date('2022-01-15T12:00:00Z');
		const result = ago(date, 'medium');
		expect(result).toContain('year');
	});

	it('should handle short style', () => {
		const date = new Date('2024-01-15T11:59:30Z');
		const result = ago(date, 'short');
		// Short style can be either "<30s" or a specific number like "30s"
		expect(result).toMatch(/^(<\d+s|\d+s)$/);
	});

	it('should handle future dates', () => {
		const date = new Date('2024-01-15T12:30:00Z');
		const result = ago(date, 'medium');
		expect(result).toContain('+');
	});
});


