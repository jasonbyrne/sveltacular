<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Rating from './rating.svelte';

	/**
	 * Rating component for displaying and selecting star ratings.
	 *
	 * **Accessibility**: Uses `role="radiogroup"` with individual star buttons.
	 * Each star has `aria-label` and `aria-pressed` attributes. The component
	 * supports keyboard navigation (arrow keys and Enter/Space).
	 *
	 * **Usage**:
	 * ```svelte
	 * <Rating bind:value={rating} max={5} onChange={(v) => console.log(v)} />
	 * ```
	 */
	const { Story } = defineMeta({
		component: Rating,
		title: 'Generic/Rating',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: 'number',
				description: 'The current rating value (0 to max)',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
				}
			},
			max: {
				control: 'number',
				description: 'Maximum rating value (number of stars)',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '5' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl'],
				description: 'Size of the stars',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: "'md'" }
				}
			},
			readonly: {
				control: 'boolean',
				description: 'Whether the rating is read-only (non-interactive)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			onChange: {
				action: 'changed',
				description: 'Called when the rating value changes',
				table: {
					type: { summary: '(value: number) => void' }
				}
			}
		},
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Default" args={{ value: 3, max: 5 }}>
	Interactive rating component with 3 out of 5 stars selected.
</Story>

<Story name="Readonly" args={{ value: 4, max: 5, readonly: true }}>
	Read-only rating display (non-interactive) showing 4 out of 5 stars.
</Story>

<Story name="Large" args={{ value: 2, max: 5, size: 'lg' }}>
	Large size rating component for prominent display.
</Story>

<Story name="CustomMax" args={{ value: 7, max: 10 }}>
	Rating with custom maximum value (10 stars instead of 5).
</Story>

<Story name="AllSizes" args={{ value: 3, max: 5 }}>
	All rating sizes displayed together for comparison.
</Story>

<Story name="Empty" args={{ value: 0, max: 5 }}>
	Empty rating (no stars selected) ready for user input.
</Story>

<Story name="Full" args={{ value: 5, max: 5 }}>
	Full rating (all stars selected).
</Story>













