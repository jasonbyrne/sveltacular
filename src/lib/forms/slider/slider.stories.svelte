<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Slider from './slider.svelte';

	/**
	 * Slider component for selecting numeric values within a range.
	 *
	 * **Accessibility**: Includes proper ARIA attributes (`aria-label`, `aria-valuemin`,
	 * `aria-valuemax`, `aria-valuenow`, `aria-valuetext`). Supports keyboard navigation
	 * with arrow keys. Tooltip shows current value during interaction.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Slider
	 *   label="Volume"
	 *   bind:value={volume}
	 *   min={0}
	 *   max={100}
	 *   showTooltip
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: Slider,
		title: 'Forms/Slider',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: 'number',
				description: 'The current slider value',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '50' }
				}
			},
			min: {
				control: 'number',
				description: 'Minimum value',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
				}
			},
			max: {
				control: 'number',
				description: 'Maximum value',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '100' }
				}
			},
			step: {
				control: 'number',
				description: 'Step increment for the slider',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '1' }
				}
			},
			label: {
				control: 'text',
				description: 'Label text displayed above the slider',
				table: {
					type: { summary: 'string' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the slider',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: "'full'" }
				}
			},
			showTooltip: {
				control: 'boolean',
				description: 'Whether to show tooltip with current value on drag/focus',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' }
				}
			},
			showValue: {
				control: 'boolean',
				description: 'Whether to show the value display next to the slider',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' }
				}
			},
			formatValue: {
				control: 'object',
				description: 'Optional function to format the displayed value',
				table: {
					type: { summary: '((value: number) => string) | undefined' }
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the slider is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			onChange: {
				action: 'changed',
				description: 'Called when the slider value changes',
				table: {
					type: { summary: '(value: number) => void' }
				}
			}
		},
		args: {
			onChange: fn()
		}
	});

	// Format function for percentage display
	const formatPercentage = (v: number) => `${v}%`;
</script>

<Story name="Default" args={{ label: 'Volume', value: 50, min: 0, max: 100 }}>
	Standard slider for selecting a value between 0 and 100.
</Story>

<Story name="WithSteps" args={{ label: 'Rating', value: 3, min: 1, max: 5, step: 1 }}>
	Slider with discrete steps (1-5 rating scale).
</Story>

<Story name="Disabled" args={{ label: 'Volume', value: 30, disabled: true }}>
	Disabled slider that cannot be changed.
</Story>

<Story name="WithoutTooltip" args={{ label: 'Volume', value: 50, min: 0, max: 100, showTooltip: false }}>
	Slider without tooltip (value display still shown).
</Story>

<Story name="WithoutValueDisplay" args={{ label: 'Volume', value: 50, min: 0, max: 100, showValue: false }}>
	Slider without value display (tooltip still shown on interaction).
</Story>

<Story name="CustomRange" args={{ label: 'Temperature', value: 20, min: -10, max: 40, step: 0.5 }}>
	Slider with custom range and step value.
</Story>

<Story name="WithFormat" args={{ label: 'Percentage', value: 75, min: 0, max: 100, formatValue: formatPercentage }}>
	Slider with custom value formatting function.
</Story>













