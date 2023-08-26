<script lang="ts">
	import DateTime from '../generic/date/date-time.svelte';
	import type { DateTimeStyle, DateType } from '../index.js';

	export let dateType: DateType = 'datetime';
	export let dateStyle: DateTimeStyle = 'medium';
	export let iconSize: 'sm' | 'md' | 'lg' = 'md';
	export let date: string | number | Date;
	export let title: string;
	export let summary: string;
</script>

<li class="icon-{iconSize}">
	<div class="timeline-icon">
		<slot name="icon" />
	</div>
	<div class="content">
		<div class="date">
			<DateTime value={date} type={dateType} style={dateStyle} />
		</div>
		<div class="title">
			{title}
		</div>
		<div class="summary">
			{summary}
		</div>
	</div>
</li>

<style lang="scss">
	li {
		margin-bottom: 2rem;
		position: relative;

		.content {
			padding-left: 1rem;
			padding-top: 0.25rem;

			.date {
				font-size: 0.8rem;
				font-weight: 300;
				margin-bottom: 0.3rem;
				opacity: 0.7;
				text-transform: uppercase;
				line-height: 1.4em;
			}

			.title {
				font-size: 1.2rem;
				font-weight: 600;
				margin-bottom: 0.5rem;
				line-height: 1.4em;
				font-family: var(--base-headline-font-family, sans-serif);
			}

			.summary {
				font-size: 1rem;
				font-weight: 300;
				line-height: 1.4em;
				opacity: 0.7;
			}
		}

		.timeline-icon {
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			border-color: #000;
			border-style: solid;
			border-width: 0.2rem;
			background-color: #fff;
			display: inline-block;
			position: absolute;
			top: 0;
			left: -0.75rem;
		}

		&.icon-sm {
			.content {
				padding-top: 0;
			}

			.timeline-icon {
				width: 1rem;
				height: 1rem;
				left: -0.5rem;
			}
		}

		&.icon-lg {
			.content {
				padding-top: 0.5rem;
				padding-left: 1.5rem;
			}

			.timeline-icon {
				width: 2rem;
				height: 2rem;
				left: -1rem;
			}
		}
	}
</style>
