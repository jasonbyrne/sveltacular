<script lang="ts">
	import FlexRow from '$src/lib/layout/flex-row.svelte';
	import Heading from '$src/lib/typography/heading.svelte';
	import Subtitle from '$src/lib/typography/subtitle.svelte';

	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
	export let title: string;
	export let subtitle = '';
	export let underline = false;
</script>

<header class:underline>
	<FlexRow>
		<hgroup>
			<Heading {level}>{title}</Heading>
			{#if subtitle}
				<Subtitle {level}>{subtitle}</Subtitle>
			{/if}
		</hgroup>
		<div>
			<slot />
		</div>
	</FlexRow>
</header>

<style lang="scss">
	header {
		margin-bottom: 1rem;

		&.underline {
			padding-bottom: 0.5rem;
			border-bottom: solid 1px #ccc;
		}
	}
</style>
