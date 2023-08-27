<script lang="ts">
	import { navigateTo } from '$src/lib/index.js';

	export let value: string | number;
	export let caption: 'above' | 'below' | 'left' | 'right' = 'below';
	export let href: string | undefined = undefined;

	const onClick = () => {
		if (!href) return;
		navigateTo(href);
	};

	// Reactively format a string output of value, if it's a number, formatted with commas
	$: formattedValue = typeof value === 'number' ? value.toLocaleString() : value;
	$: isLink = !!href;
</script>

<button on:click={onClick} class:isLink>
	<figure class={caption}>
		<span class="value">{formattedValue}</span>
		<figcaption><slot /></figcaption>
	</figure>
</button>

<style lang="scss">
	button {
		display: inline-block;
		margin-right: 1rem;
		padding: 0;
		border: none;
		background: none;
		font-family: var(--base-font-family, sans-serif);
		appearance: none;
		transition: transform 0.2s ease-in-out;
		user-select: text;

		&.isLink {
			cursor: pointer;

			&:hover {
				transform: translateY(-0.25rem);
			}
		}

		figure {
			min-width: 6rem;
			margin: 0;
			display: flex;
			gap: 0.5rem;
			background: #fff;
			border-radius: 0.25rem;
			padding: 1rem;
			box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
			font-family: sans-serif;
			font-family: var(--base-font-family, sans-serif);
			text-align: center;

			.value {
				font-size: 2.5rem;
				font-weight: 500;
				color: #000;
				flex-grow: 1;
			}

			figcaption {
				font-size: 0.875rem;
				font-weight: 300;
				color: #4a5568;
			}

			&.above {
				flex-direction: column-reverse;
				align-items: center;
				justify-content: center;
				text-align: center;
				gap: 0.5rem;
			}

			&.below {
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;
				gap: 0.5rem;
			}

			&.left {
				flex-direction: row-reverse;
				align-items: center;
				justify-content: center;
				text-align: left;
				gap: 0.5rem;
			}

			&.right {
				flex-direction: row;
				align-items: center;
				justify-content: center;
				text-align: right;
				gap: 0.5rem;
			}
		}
	}
</style>
