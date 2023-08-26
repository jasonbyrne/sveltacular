<script lang="ts">
	import Text from './text.svelte';

	export let transform: 'uppercase' | 'lowercase' | 'capitalize' | 'none' = 'none';
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
</script>

<div class="level{level}">
	<Text {transform}><slot /></Text>
</div>

<style lang="scss">
	div {
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 2rem;
		letter-spacing: 0.1rem;
		font-family: var(--base-headline-font-family, sans-serif);

		&.level1 {
			font-size: 1.5rem;
			line-height: 2rem;
			letter-spacing: 0.15rem;
		}

		&.level2 {
			font-size: 1.25rem;
			line-height: 1.75rem;
			letter-spacing: 0.125rem;
		}

		&.level3 {
			font-size: 1rem;
			line-height: 1.5rem;
			letter-spacing: 0.1rem;
		}

		&.level4 {
			font-size: 0.875rem;
			line-height: 1.25rem;
		}

		&.level5 {
			font-size: 0.75rem;
			line-height: 1rem;
		}

		&.level6 {
			font-size: 0.625rem;
			line-height: 1rem;
		}
	}
</style>
