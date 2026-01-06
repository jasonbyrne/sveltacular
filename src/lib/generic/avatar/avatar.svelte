<script lang="ts">
	import type { ComponentSize } from '$src/lib/types/size.js';

	let {
		src = undefined,
		alt = '',
		name = undefined,
		size = 'md' as ComponentSize
	}: {
		src?: string | undefined;
		alt?: string;
		name?: string | undefined;
		size?: ComponentSize;
	} = $props();

	let initials = $derived(
		name
			? name
					.split(' ')
					.map((n) => n[0])
					.join('')
					.toUpperCase()
					.slice(0, 2)
			: ''
	);
</script>

<div class="avatar {size}">
	{#if src}
		<img {src} {alt} />
	{:else if name}
		<span class="initials">{initials}</span>
	{:else}
		<span class="placeholder">?</span>
	{/if}
</div>

<style lang="scss">
	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: var(--avatar-bg, #ccc);
		color: var(--avatar-fg, #000);
		overflow: hidden;
		flex-shrink: 0;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.initials,
		.placeholder {
			font-weight: 600;
			user-select: none;
		}

		&.sm {
			width: 2rem;
			height: 2rem;
			font-size: 0.75rem;
		}

		&.md {
			width: 2.5rem;
			height: 2.5rem;
			font-size: 0.875rem;
		}

		&.lg {
			width: 3.5rem;
			height: 3.5rem;
			font-size: 1.125rem;
		}

		&.xl {
			width: 5rem;
			height: 5rem;
			font-size: 1.5rem;
		}

		&.full {
			width: 100%;
			height: 100%;
		}
	}
</style>










