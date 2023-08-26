<script lang="ts">
	import toAgo from '$src/lib/helpers/ago.js';
	import type { DateTimeStyle, DateType, TZStyle } from '$src/lib/types/date.js';

	export let value: string | number | Date = '';
	export let lang = 'en-us';
	export let type: DateType = 'datetime';
	export let style: DateTimeStyle = 'medium';
	export let dateTimeSeparator: string | undefined = undefined;

	const tzStyleMap: Record<DateTimeStyle, TZStyle> = {
		full: 'long',
		long: 'longGeneric',
		medium: 'short',
		short: 'shortGeneric'
	};

	const getTimezone = () => {
		return Intl.DateTimeFormat(lang, {
			timeZoneName: tzStyleMap[style]
		})
			.format(date)
			.split(', ')[1];
	};

	const getDate = () => {
		if (!['datetime', 'date'].includes(type)) return '';
		return Intl.DateTimeFormat(lang, {
			dateStyle: style
		}).format(date);
	};

	const getTime = () => {
		if (!['datetime', 'time'].includes(type)) return '';
		const time = Intl.DateTimeFormat(lang, {
			timeStyle: style
		}).format(date);
		if (style == 'medium') {
			const [hms, ampm] = time.split(' ');
			const [hours, minutes] = hms.split(':');
			return `${hours}:${minutes} ${ampm}`;
		}
		return time;
	};

	const getSeparator = () => {
		if (dateTimeSeparator === undefined) {
			return type == 'ymdhm' || type == 'ymdhms' ? ' ' : ' @ ';
		}
		return dateTimeSeparator;
	};

	$: date = value ? new Date(value) : new Date();
	$: text = (() => {
		if (type == 'ago') return toAgo(date, style);
		if (type == 'ymd') {
			const [year, month, day] = date.toISOString().split('T')[0].split('-');
			return `${year}-${month}-${day}`;
		}
		if (['ymdhm', 'ymdhms', 'ymdhmt', 'ymdhmts'].includes(type)) {
			const [year, month, day] = date.toISOString().split('T')[0].split('-');
			const [hours, minutes, seconds] = date.toISOString().split('T')[1].split(':');
			const separator = dateTimeSeparator === undefined ? ' ' : dateTimeSeparator;
			const dateTime =
				type == 'ymdhms'
					? `${year}-${month}-${day}${separator}${hours}:${minutes}:${seconds.substring(0, 2)}`
					: `${year}-${month}-${day}${separator}${hours}:${minutes}`;
			return type.includes('t') ? `${dateTime} ${getTimezone()}` : dateTime;
		}
		return type == 'date'
			? getDate()
			: type == 'time'
			? getTime()
			: `${getDate()}${getSeparator()}${getTime()}`;
	})();
	$: datetime = date.toISOString();
</script>

<time {datetime}>{text}</time>

<style>
	time {
		font-family: var(--base-font-family, sans-serif);
	}
</style>
