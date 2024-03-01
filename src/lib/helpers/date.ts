import type { DateUnit } from '../index.js';

// Get the current date in YYYY-MM-DD format, taking timezone into account
export const currentDate = () => {
	const date = new Date();
	const offset = date.getTimezoneOffset();
	date.setMinutes(date.getMinutes() - offset);
	return date.toISOString().split('T')[0];
};

// Get current local datetime in YYYY-MM-DD HH:MM format
export const currentDateTime = () => {
	const date = new Date();
	const offset = date.getTimezoneOffset();
	date.setMinutes(date.getMinutes() - offset);
	return date.toISOString().split('.')[0].slice(0, -3);
};

export const addDays = (days: number, fromDate?: string | Date) => {
	const date = fromDate ? new Date(fromDate) : new Date();
	date.setDate(date.getDate() + days);
	return date;
};

export const addMonths = (months: number, fromDate?: string | Date) => {
	const date = fromDate ? new Date(fromDate) : new Date();
	date.setMonth(date.getMonth() + months);
	return date;
};

export const addYears = (years: number, fromDate?: string | Date) => {
	const date = fromDate ? new Date(fromDate) : new Date();
	date.setFullYear(date.getFullYear() + years);
	return date;
};

export const addMinutes = (minutes: number, fromDateTime?: string | Date) => {
	const date = fromDateTime ? new Date(fromDateTime) : new Date();
	date.setMinutes(date.getMinutes() + minutes);
	return date;
};

export const addHours = (hours: number, fromDateTime?: string | Date) => {
	const date = fromDateTime ? new Date(fromDateTime) : new Date();
	date.setHours(date.getHours() + hours);
	return date;
};

export const addSeconds = (seconds: number, fromDateTime?: string | Date) => {
	const date = fromDateTime ? new Date(fromDateTime) : new Date();
	date.setSeconds(date.getSeconds() + seconds);
	return date;
};

export const addUnits = (value: number, units: DateUnit, fromDateTime?: string | Date) => {
	const date = fromDateTime ? new Date(fromDateTime) : new Date();
	if (units === 'day') date.setDate(date.getDate() + value);
	if (units === 'month') date.setMonth(date.getMonth() + value);
	if (units === 'year') date.setFullYear(date.getFullYear() + value);
	if (units === 'minute') date.setMinutes(date.getMinutes() + value);
	if (units === 'hour') date.setHours(date.getHours() + value);
	if (units === 'second') date.setSeconds(date.getSeconds() + value);
	return date;
};

// Convert datetime from YYYY-MM-DDTHH:MM+TZ format to YYYY-MM-DD HH:MM format
export const dateTimeFromSupabase = (dateTime: string | null) => {
	if (!dateTime) return '';
	const date = new Date(dateTime);
	const offset = date.getTimezoneOffset();
	date.setMinutes(date.getMinutes() - offset);
	return date.toISOString().split('.')[0].slice(0, -3);
};

// Convert datetime from YYYY-MM-DD HH:MM format to YYYY-MM-DDTHH:MM+TZ format
export const dateTimeToSupabase = (dateTime: string) => {
	if (!dateTime) return null;
	const date = new Date(dateTime);
	const offset = date.getTimezoneOffset();
	date.setMinutes(date.getMinutes() + offset);
	return `${date.toISOString().split('.')[0].slice(0, -3)}+${offset / 60}`;
};

/*
 * Convert datetime to human-readable format with AM/PM, no seconds
 */
export const dateTimeToHuman = (dateTime: string) => {
	const date = new Date(dateTime);
	const datePart = date.toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
	const timePart = date.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		timeZoneName: 'short'
	});
	return `${datePart} @ ${timePart}`;
};

// From JavaScript date to YYYY-MM-DD HH:MM format
export const dateTimeToInput = (dateTime?: Date) => {
	dateTime = dateTime || new Date();
	const offset = dateTime.getTimezoneOffset();
	dateTime.setMinutes(dateTime.getMinutes() - offset);
	return dateTime.toISOString().split('.')[0].slice(0, -3);
};

// Is this date formatted in YYYY-MM-DD format?
export const isDateString = (date: string): date is string => {
	return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

// Is this datetime formatted in YYYY-MM-DD HH:MM format?
export const isDateTimeString = (dateTime: string): dateTime is string => {
	return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(dateTime);
};

export const isDateOrDateTimeString = (dateOrDateTime: unknown): dateOrDateTime is string => {
	if (typeof dateOrDateTime !== 'string') return false;
	return isDateString(dateOrDateTime) || isDateTimeString(dateOrDateTime);
};
