<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import BoolBox from './bool-box.svelte';

	/**
	 * BoolBox component for selecting boolean values with customizable labels and variants.
	 *
	 * **Variants**:
	 * - `dropdown`: Select-style dropdown (default)
	 * - `switch`: Toggle switch
	 * - `checkbox`: Standard checkbox
	 * - `radio`: Radio button group
	 *
	 * **Accessibility**: Provides full keyboard navigation and ARIA attributes for all variants.
	 * The component supports screen readers and keyboard-only navigation.
	 *
	 * **Usage**:
	 * ```svelte
	 * <BoolBox
	 *   variant="switch"
	 *   label="Enable notifications"
	 *   options={['On', 'Off']}
	 *   bind:value={enabled}
	 *   helperText="Toggle to receive notifications"
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
			variant: {
				control: 'select',
				options: ['dropdown', 'switch', 'checkbox', 'radio'],
				description: 'Visual variant of the boolean input',
				table: {
					type: { summary: "'dropdown' | 'switch' | 'checkbox' | 'radio'" },
					defaultValue: { summary: "'dropdown'" }
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
					type: { summary: 'ComponentSize' },
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

<!-- Dropdown Variant (Default) -->
<Story name="Dropdown" args={{ variant: 'dropdown' }}>
	Default dropdown variant with Yes/No options.
</Story>

<Story name="DropdownYesNo" args={{ variant: 'dropdown', options: ['Yes', 'No'] }}>
	Standard Yes/No boolean selection.
</Story>

<Story name="DropdownTrueFalse" args={{ variant: 'dropdown', options: ['True', 'False'] }}>
	True/False boolean selection for technical contexts.
</Story>

<Story name="DropdownOnOff" args={{ variant: 'dropdown', options: ['On', 'Off'] }}>
	On/Off selection for settings.
</Story>

<!-- Switch Variant -->
<Story name="Switch" args={{ variant: 'switch', value: true, options: ['On', 'Off'] }}>
	Toggle switch variant ideal for on/off states.
</Story>

<Story
	name="SwitchEnabled"
	args={{ variant: 'switch', value: true, options: ['Enabled', 'Disabled'] }}
>
	Switch showing enabled/disabled state.
</Story>

<Story
	name="SwitchSizes"
	args={{ variant: 'switch', value: true, options: ['Active', 'Inactive'] }}
>
	Switch variant with different sizes.
</Story>

<Story
	name="SwitchSmall"
	args={{ variant: 'switch', size: 'sm', value: true, options: ['On', 'Off'] }}
>
	Small switch variant.
</Story>

<Story
	name="SwitchLarge"
	args={{ variant: 'switch', size: 'lg', value: true, options: ['On', 'Off'] }}
>
	Large switch variant.
</Story>

<Story
	name="SwitchXLarge"
	args={{ variant: 'switch', size: 'xl', value: true, options: ['On', 'Off'] }}
>
	Extra large switch variant.
</Story>

<!-- Checkbox Variant -->
<Story name="Checkbox" args={{ variant: 'checkbox', value: true, options: ['Yes', 'No'] }}>
	Checkbox variant for boolean selection.
</Story>

<Story
	name="CheckboxAgree"
	args={{ variant: 'checkbox', value: false, options: ['Agree', 'Disagree'] }}
>
	Checkbox showing agreement state.
</Story>

<Story
	name="CheckboxVisible"
	args={{ variant: 'checkbox', value: true, options: ['Visible', 'Hidden'] }}
>
	Checkbox for visibility toggle.
</Story>

<Story
	name="CheckboxSmall"
	args={{ variant: 'checkbox', size: 'sm', value: true, options: ['Yes', 'No'] }}
>
	Small checkbox variant.
</Story>

<Story
	name="CheckboxLarge"
	args={{ variant: 'checkbox', size: 'lg', value: true, options: ['Yes', 'No'] }}
>
	Large checkbox variant.
</Story>

<!-- Radio Variant -->
<Story name="Radio" args={{ variant: 'radio', value: true, options: ['Yes', 'No'] }}>
	Radio button variant for boolean selection.
</Story>

<Story name="RadioTrueFalse" args={{ variant: 'radio', value: false, options: ['True', 'False'] }}>
	Radio buttons showing true/false options.
</Story>

<Story
	name="RadioActiveInactive"
	args={{ variant: 'radio', value: true, options: ['Active', 'Inactive'] }}
>
	Radio buttons for active/inactive state.
</Story>

<Story
	name="RadioSmall"
	args={{ variant: 'radio', size: 'sm', value: true, options: ['On', 'Off'] }}
>
	Small radio variant.
</Story>

<Story
	name="RadioLarge"
	args={{ variant: 'radio', size: 'lg', value: true, options: ['On', 'Off'] }}
>
	Large radio variant.
</Story>

<!-- With Labels and Helper Text -->
<Story
	name="WithLabel"
	args={{
		variant: 'switch',
		label: 'Enable notifications',
		helperText: 'Receive push notifications on your device',
		options: ['On', 'Off']
	}}
>
	BoolBox with label and helper text.
</Story>

<Story
	name="CheckboxWithLabel"
	args={{
		variant: 'checkbox',
		label: 'Subscribe to newsletter',
		helperText: 'Get weekly updates in your inbox',
		options: ['Subscribe', 'Unsubscribe']
	}}
>
	Checkbox with label and helper text.
</Story>

<Story
	name="RadioWithLabel"
	args={{
		variant: 'radio',
		label: 'Account status',
		helperText: 'Select your account status',
		options: ['Active', 'Inactive']
	}}
>
	Radio buttons with label and helper text.
</Story>

<!-- States -->
<Story
	name="Required"
	args={{
		variant: 'switch',
		label: 'Accept terms',
		required: true,
		helperText: 'You must accept the terms to continue',
		options: ['Accept', 'Decline']
	}}
>
	Required BoolBox field with validation indicator.
</Story>

<Story
	name="Disabled"
	args={{
		variant: 'switch',
		label: 'Feature toggle',
		disabled: true,
		value: true,
		options: ['Enabled', 'Disabled']
	}}
>
	Disabled BoolBox that cannot be changed.
</Story>

<Story
	name="WithError"
	args={{
		variant: 'checkbox',
		label: 'Enable feature',
		feedback: { text: 'This feature is currently unavailable', isError: true },
		options: ['Enable', 'Disable']
	}}
>
	BoolBox with error feedback message.
</Story>
