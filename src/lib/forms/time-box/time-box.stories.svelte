<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import TimeBox from './time-box.svelte';

	/**
	 * TimeBox component for selecting time values using the native HTML time input.
	 *
	 * **Accessibility**: Uses native HTML5 time input with proper ARIA attributes.
	 * Includes `aria-required` for required fields and proper label association.
	 *
	 * **Usage**:
	 * ```svelte
	 * <TimeBox
	 *   label="Start time"
	 *   bind:value={time}
	 *   helperText="Select a time"
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: TimeBox,
		title: 'Forms/TimeBox',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: 'text',
				description: 'The time value in HH:MM format',
				table: {
					type: { summary: 'string | null' },
					defaultValue: { summary: "''" }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the input field',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: "'full'" }
				}
			},
			label: {
				control: 'text',
				description: 'Label text displayed above the input',
				table: {
					type: { summary: 'string' }
				}
			},
			helperText: {
				control: 'text',
				description: 'Helper text displayed below the input',
				table: {
					type: { summary: 'string' }
				}
			},
			feedback: {
				control: 'object',
				description: 'Feedback message with optional details array',
				table: {
					type: { summary: 'FormFieldFeedback' }
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the input is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			required: {
				control: 'boolean',
				description: 'Whether the input is required',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			onChange: {
				action: 'changed',
				description: 'Called when the time value changes',
				table: {
					type: { summary: '(value: string) => void' }
				}
			}
		},
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Default" args={{ label: 'Time' }}>Default TimeBox with label.</Story>

<Story name="WithValue" args={{ label: 'Time', value: '14:30' }}>
	TimeBox with a pre-selected time value (2:30 PM).
</Story>

<Story name="Required" args={{ label: 'Time', required: true }}>
	Required TimeBox field with validation indicator.
</Story>

<Story
	name="WithHelperText"
	args={{ label: 'Meeting time', helperText: 'Select the time for your meeting' }}
>
	TimeBox with helper text providing additional context.
</Story>

<Story name="Disabled" args={{ label: 'Time', disabled: true, value: '09:00' }}>
	Disabled TimeBox that cannot be changed.
</Story>

<Story
	name="WithError"
	args={{ label: 'Time', feedback: { text: 'Please select a valid time', isError: true } }}
>
	TimeBox with error feedback message.
</Story>

<Story name="Sizes" args={{ label: 'Time' }}>
	TimeBox in different sizes: sm, md, lg, xl, full.
</Story>
