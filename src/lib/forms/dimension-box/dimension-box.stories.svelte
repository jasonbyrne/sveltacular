<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import DimensionBox from './dimension-box.svelte';

	/**
	 * DimensionBox component for entering multiple dimension values (e.g., Width × Depth × Height).
	 *
	 * **Accessibility**: Includes proper ARIA attributes, labels, and helper text support.
	 * Use `aria-describedby` to link helper text and error messages.
	 *
	 * **Usage**:
	 * ```svelte
	 * <DimensionBox
	 *   label="Dimensions"
	 *   dimensions={['Width', 'Depth', 'Height']}
	 *   bind:value={dimensions}
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: DimensionBox,
		title: 'Forms/DimensionBox',
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Label text displayed above the inputs',
				table: {
					type: { summary: 'string' }
				}
			},
			dimensions: {
				control: 'object',
				description: 'Array of dimension names to display (e.g., ["Width", "Depth", "Height"])',
				table: {
					type: { summary: 'string[]' },
					defaultValue: { summary: "['Width', 'Depth', 'Height']" }
				}
			},
			value: {
				control: 'object',
				description: 'Array of numeric values matching the dimensions array',
				table: {
					type: { summary: '(number | null)[]' }
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
			decimals: {
				control: 'number',
				description: 'Number of decimal places allowed',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
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
				description: 'Called when any dimension value changes',
				table: {
					type: { summary: '(value: (number | null)[]) => void' }
				}
			}
		},
		args: {
			onChange: fn(),
			size: 'full',
			dimensions: ['Width', 'Depth', 'Height']
		}
	});
</script>

<Story
	name="Standard"
	args={{
		label: 'Dimensions',
		dimensions: ['Width', 'Depth', 'Height']
	}}
/>

<Story
	name="TwoDimensions"
	args={{
		label: 'Dimensions',
		dimensions: ['Width', 'Height']
	}}
/>

<Story
	name="FourDimensions"
	args={{
		label: 'Dimensions',
		dimensions: ['Length', 'Width', 'Depth', 'Height']
	}}
/>

<Story
	name="WithDecimals"
	args={{
		label: 'Dimensions',
		dimensions: ['Width', 'Depth', 'Height'],
		decimals: 2,
		step: 0.01
	}}
/>

<Story
	name="WithSuffix"
	args={{
		label: 'Dimensions',
		dimensions: ['Width', 'Depth', 'Height'],
		suffix: 'in'
	}}
/>

<Story
	name="WithPrefix"
	args={{
		label: 'Dimensions',
		dimensions: ['Width', 'Depth', 'Height'],
		prefix: '$'
	}}
/>

<Story
	name="WithValues"
	args={{
		label: 'Dimensions',
		dimensions: ['Width', 'Depth', 'Height'],
		value: [10, 5, 8]
	}}
/>

<Story
	name="Required"
	args={{
		label: 'Dimensions',
		dimensions: ['Width', 'Depth', 'Height'],
		required: true
	}}
/>

<Story
	name="CustomDimensions"
	args={{
		label: 'Package Size',
		dimensions: ['Length', 'Width', 'Height']
	}}
/>
