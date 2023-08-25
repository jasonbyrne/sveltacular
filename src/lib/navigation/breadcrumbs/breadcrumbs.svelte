<script lang="ts">
	import AngleRightIcon from '$src/lib/icons/angle-right-icon.svelte';
	import HomeIcon from '$src/lib/icons/home-icon.svelte';

	type Crumb = { label: string; href?: string } | string;

	export let homeUrl: string | null = null;
	export let crumbs: Crumb[] = [];
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const getCrumLabel = (crumb: Crumb) => {
		if (typeof crumb === 'string') return crumb;
		return crumb.label;
	};
</script>

<nav class={size}>
	{#if homeUrl}
		<li class="icon">
			<a href={homeUrl} class="home"><HomeIcon /></a>
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
			<li class="icon">
				<AngleRightIcon />
			</li>
		{/if}
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		list-style: none;
		padding: 0;
		margin: 0;
		line-height: 1.5rem;
		font-family: sans-serif;

		li {
			display: flex;
			align-items: center;
			vertical-align: middle;
			margin-left: 0.5rem;
			color: var(--breadcrumbs-fg, #333);

			a {
				color: var(--breadcrumbs-link-fg, #333);
				text-decoration: none;

				&:hover {
					color: var(--breadcrumbs-link-hover-fg, black);
					text-decoration: underline;
				}
			}

			a.home {
				width: 100%;
			}

			&:first-child {
				margin-left: 0;
			}

			&.icon {
				padding-top: 2px;
			}
		}

		&.sm {
			li {
				font-size: 0.75rem;
				min-width: 12px;
			}
		}

		&.md {
			li {
				font-size: 0.875rem;
				min-width: 14px;
			}
		}

		&.lg {
			li {
				font-size: 1rem;
				min-width: 16px;
			}
		}
	}
</style>
