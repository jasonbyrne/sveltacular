<script lang="ts">
	export let sources: Array<{ url: string; media?: string }>;
	export let alt: string = '';

	$: finalSource = sources[sources.length - 1];
</script>

<div>
	<picture>
		{#each sources as source}
			<source srcset={source.url} media={source.media} />
		{/each}
		<img src={finalSource.url} {alt} />
	</picture>
	{#if $$slots.default}
		<div class="caption">
			<slot />
		</div>
	{/if}
</div>

<style>
	div {
		position: relative;
	}

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
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
