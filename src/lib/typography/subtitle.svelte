<script lang="ts">
	import Text from './text.svelte';

	export let transform: 'uppercase' | 'lowercase' | 'capitalize' | 'none' = 'none';
</script>

<div>
	<Text {transform}><slot /></Text>
</div>

<style lang="scss">
	div {
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 2rem;
		margin-bottom: 1rem;
		letter-spacing: 0.1rem;
	}
</style>
