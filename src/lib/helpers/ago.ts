const DAY_SECONDS = 86400;
const WEEK_SECONDS = 604800;
const YEAR_SECONDS = WEEK_SECONDS * 52;

const ago = (date: Date, style: 'full' | 'long' | 'short' | 'medium' = 'medium') => {
	const epoch = Math.round(date.getTime() / 1000);
	const now = Math.round(Date.now() / 1000);
	const seconds = Math.abs(now - epoch);
	const isFuture = now < epoch;
	const minutes = Math.round(seconds / 60);
	const hours = Math.round(seconds / 3600);
	const days = Math.round(seconds / DAY_SECONDS);
	const weeks = Math.round(seconds / WEEK_SECONDS);
	const years = Math.round(seconds / YEAR_SECONDS);

	//return `${seconds}s`;

	const opts = (() => {
		if (seconds < 15) {
			return { value: 0, unit: 'now' };
		} else if (seconds < 60) {
			return { value: seconds, unit: 'second' };
		} else if (minutes < 60) {
			return { value: minutes, unit: 'minute' };
		} else if (hours < 24) {
			return { value: hours, unit: 'hour' };
		} else if (days < 7) {
			return { value: days, unit: 'day' };
		} else if (weeks < 52) {
			return { value: weeks, unit: 'week' };
		} else {
			return { value: years, unit: 'year' };
		}
	})();
	const units = { ...opts, unit: opts.value > 1 ? `${opts.unit}s` : opts.unit };

	if (units.value === 0) {
		return style == 'short' ? 'now' : 'just now';
	}
	if (style == 'short') {
		return isFuture ? `+${units.value}${units.unit[0]}` : `<${units.value}${units.unit[0]}`;
	}
	if (style == 'medium') {
		return isFuture ? `+ ${units.value} ${units.unit}` : `${units.value} ${units.unit}`;
	}
	return isFuture ? `in ${units.value} ${units.unit}` : `${units.value} ${units.unit} ago`;
};

export default ago;
