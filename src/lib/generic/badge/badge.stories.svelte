<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './badge.svelte';

	/**
	 * Badge component for displaying notification counts and numeric indicators.
	 *
	 * **Accessibility**: Includes `aria-label` with the count value for screen readers.
	 * The badge is hidden when count is zero (unless `showZero` is true).
	 *
	 * **Usage**:
	 * ```svelte
	 * <Badge count={5} max={99} variant="positive" />
	 * ```
	 */
	const { Story } = defineMeta({
		component: Badge,
		title: 'Generic/Badge',
		tags: ['autodocs'],
		argTypes: {
			count: {
				control: 'number',
				description: 'The numeric count to display',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
				}
			},
			max: {
				control: 'number',
				description: 'Maximum value to display before showing "max+" format',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '99' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl'],
				description: 'Size of the badge',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: "'md'" }
				}
			},
			variant: {
				control: 'select',
				options: ['standard', 'positive', 'negative', 'warning'],
				description: 'Color variant of the badge',
				table: {
					type: { summary: "'standard' | 'positive' | 'negative' | 'warning'" },
					defaultValue: { summary: "'standard'" }
				}
			},
			showZero: {
				control: 'boolean',
				description: 'Whether to show the badge when count is zero',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			}
		}
	});
</script>

<Story name="Default" args={{ count: 5 }}>
	Standard badge with a count value.
</Story>

<Story name="Max" args={{ count: 150, max: 99 }}>
	Badge showing "99+" when count exceeds the max value.
</Story>

<Story name="Positive" args={{ count: 3, variant: 'positive' }}>
	Positive variant badge (typically green) for success indicators.
</Story>

<Story name="Negative" args={{ count: 12, variant: 'negative' }}>
	Negative variant badge (typically red) for error or alert indicators.
</Story>

<Story name="Warning" args={{ count: 7, variant: 'warning' }}>
	Warning variant badge (typically yellow/orange) for caution indicators.
</Story>

<Story name="Sizes" args={{ count: 5 }}>
	Badge in different sizes: sm, md, lg, xl.
</Story>

<Story name="ShowZero" args={{ count: 0, showZero: true }}>
	Badge with showZero enabled, displaying even when count is zero.
</Story>

<Story name="HiddenWhenZero" args={{ count: 0, showZero: false }}>
	Badge hidden when count is zero (default behavior).
</Story>













