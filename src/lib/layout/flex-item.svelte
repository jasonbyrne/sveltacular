<script lang="ts">
	import type { Snippet } from 'svelte';

	type AlignSelf = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | 'auto';

	interface Props {
		/** Content to display in the flex item */
		children: Snippet;
		/** Whether the item should grow to fill available space */
		grow?: boolean;
		/** Align this item along the cross axis */
		align?: AlignSelf;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		children,
		grow = false,
		align = 'auto',
		class: className = ''
	}: Props = $props();

</script>

<div
	class="flex-item {grow ? 'grow' : ''} {className}"
	style="
		--align-self: {align};
		flex: {grow ? 1 : 0};
		align-self: var(--align-self);
	"
>
	{@render children()}
</div>

<style lang="scss">
	.flex-item {
		display: block;
	}
</style>
