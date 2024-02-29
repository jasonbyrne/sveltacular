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

/**
 * Get the current date plus x days in YYYY-MM-DD format
 *
 * @param days
 * @param fromDate
 * @returns YYYY-MM-DD
 */
export const addDays = (days: number, fromDate?: string) => {
	const date = fromDate ? new Date(fromDate) : new Date();
	date.setDate(date.getDate() + days);
	return date.toISOString().split('T')[0];
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
export const isDate = (date: string) => {
	return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

// Is this datetime formatted in YYYY-MM-DD HH:MM format?
export const isDateTime = (dateTime: string) => {
	return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(dateTime);
};

export const isDateOrDateTime = (dateOrDateTime: string) => {
	return isDate(dateOrDateTime) || isDateTime(dateOrDateTime);
};
