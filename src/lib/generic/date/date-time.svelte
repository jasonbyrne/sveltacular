<script lang="ts">
	import toAgo from '$src/lib/helpers/ago.js';
	import type { DateTimeVariant, DateType, TZStyle } from '$src/lib/types/date.js';

	let {
		value = '',
		lang = 'en-us',
		type = 'datetime' as DateType,
		variant = 'medium' as DateTimeVariant,
		dateTimeSeparator = undefined
	}: {
		value?: string | number | Date;
		lang?: string;
		type?: DateType;
		variant?: DateTimeVariant;
		dateTimeSeparator?: string;
	} = $props();

	const tzStyleMap: Record<DateTimeVariant, TZStyle> = {
		full: 'long',
		long: 'longGeneric',
		medium: 'short',
		short: 'shortGeneric'
	};

	const getTimezone = () => {
		return Intl.DateTimeFormat(lang, {
			timeZoneName: tzStyleMap[variant]
		})
			.format(date)
			.split(', ')[1];
	};

	const getDate = () => {
		if (!['datetime', 'date'].includes(type)) return '';
		return Intl.DateTimeFormat(lang, {
			dateStyle: variant
		}).format(date);
	};

	const getTime = () => {
		if (!['datetime', 'time'].includes(type)) return '';
		const time = Intl.DateTimeFormat(lang, {
			timeStyle: variant
		}).format(date);
		if (variant == 'medium') {
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

	let date = $derived(value ? new Date(value) : new Date());
	let text = $derived(
		(() => {
			if (type == 'ago') return toAgo(date, variant);
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
		})()
	);
	let datetime = $derived(date.toISOString());
</script>

<time {datetime}>{text}</time>
