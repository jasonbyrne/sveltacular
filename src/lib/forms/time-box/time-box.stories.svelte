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
			nullable: {
				control: 'boolean',
				description: 'Whether the field can be null (adds a checkbox to toggle value)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			nullText: {
				control: 'text',
				description: 'Text to display when nullable and unchecked',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'-- : -- : --'" }
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
					type: { summary: '(value: string | null) => void' }
				}
			},
			onCheckChanged: {
				action: 'checkChanged',
				description: 'Called when the nullable checkbox is toggled',
				table: {
					type: { summary: '(isChecked: boolean) => void' }
				}
			}
		},
		args: {
			onChange: fn(),
			onCheckChanged: fn()
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

<Story
	name="Nullable"
	args={{
		label: 'Meeting time (optional)',
		nullable: true,
		value: '14:30',
		helperText: 'Uncheck to indicate no specific time preference'
	}}
>
	TimeBox with nullable support. Toggle the checkbox to enable/disable the field. When unchecked, the
	value clears but is remembered if you re-check it.
</Story>

<Story
	name="NullableEmpty"
	args={{
		label: 'Appointment time',
		nullable: true,
		helperText: 'Check to set a time'
	}}
>
	TimeBox with nullable support starting empty. When you check the box, it will default to the
	current time, or restore your last entered value.
</Story>

<Story
	name="NullableCustomText"
	args={{
		label: 'Alarm time',
		nullable: true,
		nullText: 'No alarm set',
		helperText: 'Check to set an alarm'
	}}
>
	TimeBox with custom null text displayed when unchecked.
</Story>
