<script lang="ts">
	import type { Snippet } from 'svelte';
	import AngleUpIcon from '$src/lib/icons/angle-up-icon.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';

	let {
		title,
		expanded = $bindable(false),
		children
	}: {
		title: string;
		expanded?: boolean;
		children: Snippet;
	} = $props();

	const id = uniqueId();
	const buttonId = `accordion-button-${id}`;
	const panelId = `accordion-panel-${id}`;

	const toggle = () => {
		expanded = !expanded;
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		// Space and Enter should toggle
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			toggle();
		}
	};
</script>

<div class:expanded class="accordion">
	<h3>
		<button
			type="button"
			id={buttonId}
			aria-expanded={expanded}
			aria-controls={panelId}
			onclick={toggle}
			onkeydown={handleKeyDown}
		>
			<span class="title">
				{title}
			</span>
			<span class="icon" aria-hidden="true">
				<AngleUpIcon />
			</span>
		</button>
	</h3>
	<div id={panelId} role="region" aria-labelledby={buttonId} class="menu" hidden={!expanded}>
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
