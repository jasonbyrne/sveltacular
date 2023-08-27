<script lang="ts">
	import HomeIcon from '$src/lib/icons/home-icon.svelte';

	type Crumb = { label: string; href?: string } | string;

	export let homeUrl: string | null = null;
	export let crumbs: Crumb[] = [];
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let separator = '/';

	const getCrumLabel = (crumb: Crumb) => {
		if (typeof crumb === 'string') return crumb;
		return crumb.label;
	};
</script>

<nav class={size}>
	{#if homeUrl}
		<li class="home">
			<a href={homeUrl}><HomeIcon /></a>
		</li>
	{/if}
	{#each crumbs as crumb, i}
		{#if typeof crumb === 'string' || !crumb.href}
			<li>{getCrumLabel(crumb)}</li>
		{:else}
			<li>
				<a href={crumb.href}>
					{crumb.label}
				</a>
			</li>
		{/if}
		{#if i < crumbs.length - 1}
			<li class="separator">{separator}</li>
		{/if}
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		list-style: none;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
		line-height: 1.5rem;
		font-family: var(--breadcrumbs-font-family, sans-serif);

		li {
			color: var(--breadcrumbs-fg, #333);
			padding: 0;
			margin: 0;

			a {
				color: var(--breadcrumbs-link-fg, #333);
				text-decoration: none;
				width: 100%;

				&:hover {
					color: var(--breadcrumbs-link-hover-fg, black);
					text-decoration: underline;
				}
			}
		}

		&.sm {
			li {
				font-size: 0.75rem;

				&.home {
					width: 12px;
				}
			}
		}

		&.md {
			li {
				font-size: 0.875rem;

				&.home {
					width: 14px;
				}
			}
		}

		&.lg {
			li {
				font-size: 1rem;

				&.home {
					width: 16px;
				}
			}
		}
	}
</style>
