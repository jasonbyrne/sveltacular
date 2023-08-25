<script lang="ts">
	import Date from '../generic/date/date.svelte';
	import type { DateTimeStyle, DateType } from '../index.js';
	import type { TimelineItem } from '../types/timeline-item.js';

	export let items: TimelineItem[] = [];
	export let dateType: DateType = 'datetime';
	export let dateStyle: DateTimeStyle = 'medium';
</script>

<ul>
	{#each items as item}
		<li>
			<div class="timeline-icon" />
			<div class="content">
				<div class="date">
					<Date value={item.date} type={dateType} style={dateStyle} />
				</div>
				<div class="title">
					{item.title}
				</div>
				<div class="summary">
					{item.summary}
				</div>
			</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding-left: 0;
		padding-top: 1rem;
		margin: 0;
		border-left: 0.2rem solid #000;

		li {
			margin-bottom: 2rem;
			position: relative;

			.content {
				padding-left: 1rem;

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
				}

				.summary {
					font-size: 1rem;
					font-weight: 300;
					line-height: 1.4em;
					opacity: 0.7;
				}
			}

			.timeline-icon {
				width: 1rem;
				height: 1rem;
				border-radius: 50%;
				border-color: #000;
				border-style: solid;
				border-width: 0.2rem;
				background-color: #fff;
				display: inline-block;
				position: absolute;
				top: 0;
				left: -0.5rem;
			}
		}
	}
</style>
