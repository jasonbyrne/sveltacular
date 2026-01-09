<script lang="ts">
	import type { Snippet } from 'svelte';

	type JustifyContent =
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';

	type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

	type SpacingSize = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl';

	interface Props {
		/** Content to display in the flex row */
		children: Snippet;
		/** Gap between items (standard size token or custom CSS value) */
		gap?: SpacingSize | string | number;
		/** Whether to wrap items to next line */
		wrap?: boolean;
		/** Justify content along the main axis */
		justify?: JustifyContent;
		/** Align items along the cross axis */
		align?: AlignItems;
		/** Whether to take full width (default: true) */
		fullWidth?: boolean;
		/** Margin on all sides (standard size token or custom CSS value) */
		margin?: SpacingSize | string | number;
		/** Top margin override (standard size token or custom CSS value) */
		marginTop?: SpacingSize | string | number;
		/** Bottom margin override (standard size token or custom CSS value) */
		marginBottom?: SpacingSize | string | number;
		/** Additional CSS classes */
		class?: string;
	}

	const spacingTokenMap: Record<SpacingSize, string> = {
		xs: 'var(--spacing-xs)',
		sm: 'var(--spacing-sm)',
		md: 'var(--spacing-md)',
		base: 'var(--spacing-base)',
		lg: 'var(--spacing-lg)',
		xl: 'var(--spacing-xl)',
		'2xl': 'var(--spacing-2xl)'
	};

	const normalizeSpacing = (
		value: SpacingSize | string | number | undefined
	): string | undefined => {
		if (value === undefined) return undefined;
		if (typeof value === 'number') return `${value}px`;
		if (value in spacingTokenMap) return spacingTokenMap[value as SpacingSize];
		return value;
	};

	let {
		children,
		gap = 'base',
		wrap = false,
		justify = 'flex-start',
		align = 'stretch',
		fullWidth = true,
		margin,
		marginTop,
		marginBottom,
		class: className = ''
	}: Props = $props();

	const gapValue = $derived(normalizeSpacing(gap) ?? 'var(--spacing-base)');
	const marginValue = $derived(normalizeSpacing(margin));
	const marginTopValue = $derived(
		marginTop !== undefined ? normalizeSpacing(marginTop) : marginValue
	);
	const marginBottomValue = $derived(
		marginBottom !== undefined ? normalizeSpacing(marginBottom) : marginValue
	);
</script>

<div
	class="flex-row {wrap ? 'wrap' : ''} {!fullWidth ? 'auto-width' : ''} {className}"
	style="
		--gap: {gapValue};
		--justify: {justify};
		--align: {align};
		{marginTopValue ? `margin-top: ${marginTopValue};` : ''}
		{marginBottomValue ? `margin-bottom: ${marginBottomValue};` : ''}
	"
>
	{@render children()}
</div>

<style lang="scss">
	.flex-row {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: var(--gap, var(--spacing-base));
		justify-content: var(--justify, flex-start);
		align-items: var(--align, stretch);
		flex-wrap: nowrap;

		&.wrap {
			flex-wrap: wrap;
		}

		&.auto-width {
			width: auto;
		}
	}
</style>
