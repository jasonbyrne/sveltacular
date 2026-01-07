<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import BoolBox from './bool-box.svelte';

	/**
	 * BoolBox component for selecting boolean values with customizable labels.
	 *
	 * **Accessibility**: Uses ListBox component internally, which provides full keyboard navigation
	 * and ARIA attributes. The component supports screen readers and keyboard-only navigation.
	 *
	 * **Usage**:
	 * ```svelte
	 * <BoolBox
	 *   label="Enable notifications"
	 *   options={['Yes', 'No']}
	 *   bind:value={enabled}
	 *   helperText="Choose whether to receive notifications"
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: BoolBox,
		title: 'Forms/BoolBox',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: 'boolean',
				description: 'The boolean value (true/false)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			options: {
				control: 'object',
				description: 'Tuple of two strings representing the true and false labels',
				table: {
					type: { summary: '[yes: string, no: string]' },
					defaultValue: { summary: "['Yes', 'No']" }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the input field',
				table: {
					type: { summary: 'FormFieldSizeOptions' },
					defaultValue: { summary: "'md'" }
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
				description: 'Called when the value changes',
				table: {
					type: { summary: '(value: boolean) => void' }
				}
			}
		},
		args: {
			label: 'Label',
			onChange: fn(),
			helperText: 'Helper text'
		}
	});
</script>

<Story name="Default" args={{}}>Default BoolBox with Yes/No options.</Story>

<Story name="YesNo" args={{ options: ['Yes', 'No'] }}>Standard Yes/No boolean selection.</Story>

<Story name="TrueFalse" args={{ options: ['True', 'False'] }}>
	True/False boolean selection for technical contexts.
</Story>

<Story name="OnOff" args={{ options: ['On', 'Off'] }}>
	On/Off toggle style for settings and switches.
</Story>

<Story name="EnabledDisabled" args={{ options: ['Enabled', 'Disabled'] }}>
	Enabled/Disabled selection for feature toggles.
</Story>

<Story name="ActiveInactive" args={{ options: ['Active', 'Inactive'] }}>
	Active/Inactive selection for status toggles.
</Story>

<Story name="VisibleHidden" args={{ options: ['Visible', 'Hidden'] }}>
	Visible/Hidden selection for visibility controls.
</Story>

<Story
	name="WithLabel"
	args={{ label: 'Enable notifications', helperText: 'Receive push notifications on your device' }}
>
	BoolBox with label and helper text.
</Story>

<Story
	name="Required"
	args={{
		label: 'Accept terms',
		required: true,
		helperText: 'You must accept the terms to continue'
	}}
>
	Required BoolBox field with validation indicator.
</Story>

<Story name="Disabled" args={{ label: 'Feature toggle', disabled: true, value: true }}>
	Disabled BoolBox that cannot be changed.
</Story>

<Story
	name="WithError"
	args={{
		label: 'Enable feature',
		feedback: { text: 'This feature is currently unavailable', isError: true }
	}}
>
	BoolBox with error feedback message.
</Story>
