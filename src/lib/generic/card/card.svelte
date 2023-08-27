<script lang="ts">
	import { navigateTo } from '$src/lib/helpers/navigate-to.js';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';

	export let title: string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'md';

	$: role = href ? 'link' : 'listitem';

	const onClick = () => {
		if (!href) return;
		navigateTo(href);
	};
</script>

<li {role} on:click={onClick} class="{size} {role}">
	{#if title}
		<strong>{title}</strong>
	{/if}
	<slot />
</li>

<style lang="scss">
	li {
		display: inline-block;
		vertical-align: top;
		position: relative;
		width: 100%;
		margin-right: 1rem;
		margin-bottom: 1rem;
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: #fff;
		color: #555;
		transition: transform 0.2s ease-in-out;
		font-family: var(--base-font-family, sans-serif);

		strong {
			display: block;
		}

		&[role='link'] {
			cursor: pointer;

			&:hover {
				transform: translateY(-0.25rem);
			}
		}

		&.sm {
			max-width: 15rem;
		}

		&.md {
			max-width: 20rem;
		}

		&.lg {
			max-width: 25rem;
		}

		&.xl {
			max-width: 30rem;
		}
	}
</style>
