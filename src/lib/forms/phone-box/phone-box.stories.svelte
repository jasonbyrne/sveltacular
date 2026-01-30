<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import PhoneBox from './phone-box.svelte';

	/**
	 * PhoneBox component for entering phone numbers with formatted segments.
	 *
	 * **Accessibility**: Includes proper ARIA attributes and label support.
	 *
	 * **Usage**:
	 * ```svelte
	 * <PhoneBox
	 *   label="Phone Number"
	 *   bind:value={phone}
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: PhoneBox,
		title: 'Forms/PhoneBox',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: 'text',
				description: 'The phone number (10 digits)',
				table: {
					type: { summary: 'string | null' },
					defaultValue: { summary: "''" }
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
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the input field',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: "'md'" }
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
					defaultValue: { summary: "''" }
				}
			},
			onChange: {
				action: 'changed',
				description: 'Called when the value changes',
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

<Story name="Default" args={{ value: '5551239876', label: 'Phone Number' }} />

<Story name="SevenDigits" args={{ value: '1239876', label: 'Local Phone' }}>
	PhoneBox with 7-digit phone number (no area code).
</Story>

<Story name="NoValue" args={{ label: 'Contact Number' }}>Empty PhoneBox ready for input.</Story>

<Story name="Small" args={{ value: '5551239876', size: 'sm', label: 'Phone' }}>
	Small size PhoneBox.
</Story>

<Story
	name="Nullable"
	args={{
		label: 'Mobile Phone (optional)',
		nullable: true,
		value: '5551234567',
		helperText: 'Uncheck if you do not have a mobile phone'
	}}
>
	PhoneBox with nullable support. Toggle the checkbox to enable/disable the field. When unchecked,
	the value clears but is remembered if you re-check it.
</Story>

<Story
	name="NullableEmpty"
	args={{
		label: 'Alternate Phone',
		nullable: true,
		helperText: 'Check to add an alternate phone number'
	}}
>
	PhoneBox with nullable support starting empty. When you check the box, it will restore your last
	entered value or allow you to enter a new one.
</Story>

<Story
	name="NullableCustomText"
	args={{
		label: 'Work Phone',
		nullable: true,
		nullText: 'No work phone',
		helperText: 'Check to add your work phone number'
	}}
>
	PhoneBox with custom null text displayed when unchecked.
</Story>
