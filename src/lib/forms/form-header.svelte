<script lang="ts">
	import Heading from '../typography/heading.svelte';

	export let title: string;
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 4;
</script>

<div>
	<Heading {level}>{title}</Heading>
</div>

<style lang="scss">
	div {
		margin-bottom: 1rem;
	}
</style>
