<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="form-row">
	{@render children()}
</div>

<style lang="scss">
	@use '$styles/breakpoints' as *;

	.form-row {
		display: flex;
		flex-direction: row;
		gap: var(--spacing-base);
		align-items: flex-start;

		// Switch to column layout on mobile phones and below
		@include breakpoint-down('phablet') {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
