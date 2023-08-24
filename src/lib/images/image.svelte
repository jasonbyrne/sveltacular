<script lang="ts">
	type Source = {
		url: string;
		media?: string;
	};

	export let src: string | Source | Source[] = '';
	export let alt: string = '';
	export let href: string | undefined = undefined;
	export let align: 'left' | 'center' | 'right' = 'center';

	$: sources = Array.isArray(src) ? src : typeof src === 'string' ? [{ url: src }] : [src];
	$: finalSource = sources[sources.length - 1];
</script>

<div class="image {align}">
	{#if href}
		<a {href}>
			<picture>
				{#each sources as source}
					<source srcset={source.url} media={source.media} />
				{/each}
				<img src={finalSource.url} {alt} />
			</picture>
		</a>
	{:else}
		<picture>
			{#each sources as source}
				<source srcset={source.url} media={source.media} />
			{/each}
			<img src={finalSource.url} {alt} />
		</picture>
	{/if}
	{#if $$slots.default}
		<div class="caption">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	div {
		position: relative;
		width: 100%;
		height: 100%;
		flex-grow: 1;

		.caption {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 1rem;
			background: rgba(0, 0, 0, 0.5);
			color: white;
		}

		picture {
			display: block;
			width: 100%;
			height: 100%;
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			object-position: center;
		}

		img {
			display: block;
			width: 100%;
			height: 100%;
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			object-position: center;
		}

		&.left {
			picture,
			img {
				object-position: left;
			}
		}

		&.right {
			picture,
			img {
				object-position: right;
			}
		}
	}
</style>
