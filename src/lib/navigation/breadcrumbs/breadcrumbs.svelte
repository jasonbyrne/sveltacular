<script lang="ts">
	import Icon from '$src/lib/icons/icon.svelte';

	type Crumb = { label: string; href?: string } | string;

	let {
		homeUrl = null,
		crumbs = [],
		size = 'md' as 'sm' | 'md' | 'lg',
		separator = '/'
	}: {
		homeUrl?: string | null;
		crumbs?: Crumb[];
		size?: 'sm' | 'md' | 'lg';
		separator?: string;
	} = $props();

	const getCrumLabel = (crumb: Crumb) => {
		if (typeof crumb === 'string') return crumb;
		return crumb.label;
	};
</script>

<nav class={size} aria-label="Breadcrumb">
	<ol>
		{#if homeUrl}
			<li class="home">
				<a href={homeUrl} aria-label="Home">
					<Icon type="home" size="sm" />
				</a>
			</li>
		{/if}
		{#each crumbs as crumb, i}
			{#if typeof crumb === 'string' || !crumb.href}
				<li aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
					{getCrumLabel(crumb)}
				</li>
			{:else}
				<li>
					<a href={crumb.href}>
						{crumb.label}
					</a>
				</li>
			{/if}
			{#if i < crumbs.length - 1}
				<li class="separator" aria-hidden="true">{separator}</li>
			{/if}
		{/each}
	</ol>
</nav>

<style lang="scss">
	nav {
		ol {
			display: flex;
			align-items: center;
			list-style: none;
			gap: 0.5rem;
			padding: 0;
			margin: 0;
			line-height: 1.5rem;
		}

		li {
			color: var(--breadcrumbs-fg, #555);
			padding: 0;
			margin: 0;

			&[aria-current='page'] {
				font-weight: 600;
				color: var(--breadcrumbs-current, #333);
			}

			a {
				color: var(--breadcrumbs-fg, #555);
				text-decoration: none;
				width: 100%;

				&:hover {
					color: var(--breadcrumbs-hover, #955);
					text-decoration: underline;
				}

				&:focus-visible {
					outline: 2px solid var(--focus-ring, #007bff);
					outline-offset: 2px;
					border-radius: 0.25rem;
				}
			}
		}

		&.sm li {
			font-size: 0.75rem;

			&.home {
				width: 12px;
			}
		}

		&.md li {
			font-size: 0.875rem;

			&.home {
				width: 14px;
			}
		}

		&.lg li {
			font-size: 1rem;

			&.home {
				width: 16px;
			}
		}
	}
</style>
