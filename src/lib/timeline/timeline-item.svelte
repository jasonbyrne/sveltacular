<script lang="ts">
	import type { Snippet } from 'svelte';
	import DateTime from '../generic/date/date-time.svelte';
	import type { DateTimeVariant, DateType } from '../types/date.js';

	let {
		dateType = 'datetime' as DateType,
		dateStyle = 'medium' as DateTimeVariant,
		iconSize = 'md' as 'sm' | 'md' | 'lg',
		date = undefined,
		title = undefined,
		summary = undefined,
		icon = undefined
	}: {
		dateType?: DateType;
		dateStyle?: DateTimeVariant;
		iconSize?: 'sm' | 'md' | 'lg';
		date?: string | number | Date;
		title?: string;
		summary?: string;
		icon?: Snippet;
	} = $props();
</script>

<li class="icon-{iconSize}">
	<div class="timeline-icon">
		{#if icon}
			{@render icon?.()}
		{/if}
	</div>
	<div class="content">
		{#if date}
			<div class="date">
				<DateTime value={date} type={dateType} variant={dateStyle} />
			</div>
		{/if}
		{#if title}
			<div class="title">
				{title}
			</div>
		{/if}
		{#if summary}
			<div class="summary">
				{summary}
			</div>
		{/if}
	</div>
</li>

<style lang="scss">
	li {
		margin-bottom: 2rem;
		position: relative;

		.content {
			padding-left: 1.25rem;
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
				padding-left: 1rem;
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
