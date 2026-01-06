<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import NumberRangeBox from './number-range-box.svelte';

	/**
	 * NumberRangeBox component for selecting a range of numbers with min and max values.
	 *
	 * **Accessibility**: Includes proper ARIA attributes, labels, and helper text support.
	 * Use `aria-describedby` to link helper text and error messages.
	 *
	 * **Usage**:
	 * ```svelte
	 * <NumberRangeBox
	 *   label="Price Range"
	 *   minPlaceholder="Min price"
	 *   maxPlaceholder="Max price"
	 *   bind:minValue={minPrice}
	 *   bind:maxValue={maxPrice}
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: NumberRangeBox,
		title: 'Forms/NumberRangeBox',
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Label text displayed above the inputs',
				table: {
					type: { summary: 'string' }
				}
			},
			minPlaceholder: {
				control: 'text',
				description: 'Placeholder text for the minimum value input',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'0'" }
				}
			},
			maxPlaceholder: {
				control: 'text',
				description: 'Placeholder text for the maximum value input',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'No limit'" }
				}
			},
			minValue: {
				control: 'number',
				description: 'The minimum value in the range',
				table: {
					type: { summary: 'number | null' }
				}
			},
			maxValue: {
				control: 'number',
				description: 'The maximum value in the range',
				table: {
					type: { summary: 'number | null' }
				}
			},
			minAllowed: {
				control: 'number',
				description: 'The minimum allowed value',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
				}
			},
			maxAllowed: {
				control: 'number',
				description: 'The maximum allowed value',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '99999' }
				}
			},
			step: {
				control: 'number',
				description: 'The step value for number increments',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '1' }
				}
			},
			allowDecimals: {
				control: 'boolean',
				description: 'Whether to allow decimal values',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			prefix: {
				control: 'text',
				description: 'Prefix text to display before the inputs',
				table: {
					type: { summary: 'string | null' }
				}
			},
			suffix: {
				control: 'text',
				description: 'Suffix text to display after the inputs',
				table: {
					type: { summary: 'string | null' }
				}
			},
			stickyEnd: {
				control: 'boolean',
				description: 'If true, max value automatically matches min value when min changes',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			required: {
				control: 'boolean',
				description: 'Whether the inputs are required',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the input fields',
				table: {
					type: { summary: 'FormFieldSizeOptions' },
					defaultValue: { summary: "'full'" }
				}
			},
			onChange: {
				action: 'changed',
				description: 'Called when the min or max value changes',
				table: {
					type: { summary: '(minValue: number | null, maxValue: number | null) => void' }
				}
			}
		},
		args: {
			onChange: fn(),
			size: 'full'
		}
	});
</script>

<Story
	name="Standard"
	args={{
		label: 'Price Range',
		minPlaceholder: 'Min price',
		maxPlaceholder: 'Max price',
		minAllowed: 0,
		maxAllowed: 10000
	}}
/>

<Story
	name="WithPrefix"
	args={{
		label: 'Price Range',
		prefix: '$',
		minPlaceholder: '0',
		maxPlaceholder: 'No limit',
		minAllowed: 0,
		maxAllowed: 100000
	}}
/>

<Story
	name="WithSuffix"
	args={{
		label: 'Weight Range',
		suffix: 'lbs',
		minPlaceholder: '0',
		maxPlaceholder: 'No limit',
		minAllowed: 0,
		maxAllowed: 1000
	}}
/>

<Story
	name="WithPrefixAndSuffix"
	args={{
		label: 'Price Range',
		prefix: '$',
		suffix: 'USD',
		minPlaceholder: '0',
		maxPlaceholder: 'No limit',
		minAllowed: 0,
		maxAllowed: 100000
	}}
/>

<Story
	name="Decimals"
	args={{
		label: 'Weight Range',
		allowDecimals: true,
		step: 0.1,
		minPlaceholder: '0.0',
		maxPlaceholder: 'No limit',
		minAllowed: 0,
		maxAllowed: 1000
	}}
/>

<Story
	name="StickyEnd"
	args={{
		label: 'Exact Value',
		stickyEnd: true,
		minPlaceholder: 'Enter value',
		maxPlaceholder: 'Auto',
		minAllowed: 0,
		maxAllowed: 1000
	}}
/>

<Story
	name="Required"
	args={{
		label: 'Price Range',
		required: true,
		minPlaceholder: 'Min price',
		maxPlaceholder: 'Max price',
		minAllowed: 0,
		maxAllowed: 10000
	}}
/>

<Story
	name="WithValues"
	args={{
		label: 'Price Range',
		minValue: 100,
		maxValue: 500,
		minPlaceholder: 'Min price',
		maxPlaceholder: 'Max price',
		minAllowed: 0,
		maxAllowed: 10000
	}}
/>

