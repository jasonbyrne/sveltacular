import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	addDays,
	addHours,
	addMinutes,
	addMonths,
	addSeconds,
	addUnits,
	addYears,
	currentDate,
	currentDateTime,
	dateTimeFromTz,
	dateTimeToHuman,
	dateTimeToInput,
	dateTimeToTz,
	diffDates,
	formatDateTime,
	isBetween,
	isDateOrDateTimeString,
	isDateString,
	isDateTimeString,
	toDate,
	toDateTime,
	toHumanReadableDuration
} from './date.js';

describe('date helpers', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2026-05-04T12:34:56.000Z'));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('formats current date and datetime for local inputs', () => {
		expect(currentDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		expect(currentDateTime()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
	});

	it('adds date and time units from a base date', () => {
		expect(addDays(2, '2026-05-04T00:00:00Z').toISOString()).toBe('2026-05-06T00:00:00.000Z');
		expect(addMonths(1, '2026-05-04T00:00:00Z').getUTCMonth()).toBe(5);
		expect(addYears(1, '2026-05-04T00:00:00Z').getUTCFullYear()).toBe(2027);
		expect(addMinutes(15, '2026-05-04T00:00:00Z').getUTCMinutes()).toBe(15);
		expect(addHours(2, '2026-05-04T00:00:00Z').getUTCHours()).toBe(2);
		expect(addSeconds(30, '2026-05-04T00:00:00Z').getUTCSeconds()).toBe(30);
		expect(addUnits(3, 'day', '2026-05-04T00:00:00Z').toISOString()).toBe(
			'2026-05-07T00:00:00.000Z'
		);
		expect(addUnits(1, 'hour', '2026-05-04T00:00:00Z').getUTCHours()).toBe(1);
	});

	it('converts between date, datetime, timezone, and human formats', () => {
		const date = new Date('2026-05-04T12:34:00.000Z');

		expect(toDateTime(date)).toEqual(date);
		expect(toDate(date)).toBe('2026-05-04');
		expect(dateTimeToInput(date)).toMatch(/^2026-05-04T\d{2}:34$/);
		expect(formatDateTime(date)).toMatch(/^2026-05-04T\d{2}:34$/);
		expect(dateTimeFromTz(null)).toBe('');
		expect(dateTimeFromTz('2026-05-04T12:34:00Z')).toMatch(/^2026-05-04T\d{2}:34$/);
		expect(dateTimeToTz('')).toBeNull();
		expect(dateTimeToTz('2026-05-04T12:34')).toMatch(/^2026-05-04T\d{2}:34\+/);
		expect(dateTimeToHuman('2026-05-04T12:34:00Z')).toContain('May 4, 2026 @');
	});

	it('validates date-like strings', () => {
		expect(isDateString('2026-05-04')).toBe(true);
		expect(isDateString('2026-5-4')).toBe(false);
		expect(isDateTimeString('2026-05-04 12:34')).toBe(true);
		expect(isDateTimeString('2026-05-04 12:34:56')).toBe(true);
		expect(isDateTimeString('2026-05-04T12:34')).toBe(false);
		expect(isDateOrDateTimeString('2026-05-04')).toBe(true);
		expect(isDateOrDateTimeString('2026-05-04 12:34')).toBe(true);
		expect(isDateOrDateTimeString(new Date())).toBe(false);
	});

	it('formats durations and compares date ranges', () => {
		expect(toHumanReadableDuration(1, 'day')).toBe('1 day');
		expect(toHumanReadableDuration(2, 'day')).toBe('2 days');
		expect(diffDates('2026-05-04T00:00:00Z', '2026-05-05T00:00:00Z')).toBe(86400000);
		expect(isBetween('2026-05-04', '2026-05-01', '2026-05-05')).toBe(true);
		expect(isBetween('2026-05-06', '2026-05-01', '2026-05-05')).toBe(false);
	});
});
