<script lang="ts">
	import type { Snippet } from 'svelte';
	import AngleUpIcon from '$src/lib/icons/angle-up-icon.svelte';

	let {
		title,
		expanded = $bindable(false),
		children
	}: {
		title: string;
		expanded?: boolean;
		children: Snippet;
	} = $props();
</script>

<div class:expanded class="accordion">
	<button type="button" onclick={() => (expanded = !expanded)}>
		<span class="title">
			{title}
		</span>
		<span class="icon">
			<AngleUpIcon />
		</span>
	</button>
	<div class="menu">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.accordion {
		background: #eee;
		color: #000;
		max-height: 3rem;
		transition: max-height 1s ease;
		overflow: hidden;

		button {
			appearance: none;
			width: 100%;
			padding: 1rem;
			border: none;
			text-align: left;
			outline: none;
			transition: background 0.3s ease;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1rem;

			.icon {
				width: 1rem;
				height: 1rem;
				display: block;
				transition: transform 0.3s linear;
			}

			&:hover {
				background: #ccc;
			}
		}

		.menu {
			padding: 1rem;
			opacity: 0;
			transition: opacity 0.3s linear;
		}

		&.expanded {
			max-height: 800px;

			.menu {
				opacity: 1;
			}

			.icon {
				transform: rotate(180deg);
			}
		}
	}
</style>
