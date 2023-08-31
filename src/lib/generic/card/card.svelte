<script lang="ts">
	import { navigateTo } from '$src/lib/helpers/navigate-to.js';
	import { uniqueId, type FormFieldSizeOptions } from '$src/lib/index.js';
	import { getContext } from 'svelte';
	import type { CardContainerContext } from './card-container.js';

	export let title: string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'md';

	$: role = href ? 'link' : 'listitem';

	const id = uniqueId();
	const onClick = () => {
		if (!href) return;
		navigateTo(href);
	};

	const container = getContext<CardContainerContext | undefined>('CardContainer');
	if (container) {
		container.register(id);
	}
</script>

<li {role} {id} on:click={onClick} class="{size} {role}">
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
		border: solid 1px rgb(100, 100, 100, 0.5);
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
		background-color: #fff;
		color: #555;
		transition: transform 0.2s ease-in-out;

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
