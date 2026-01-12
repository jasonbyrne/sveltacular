<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import MoneyBox from './money-box.svelte';

	/**
	 * MoneyBox component for entering monetary values with separate dollar and cent inputs.
	 *
	 * **Accessibility**: Includes proper ARIA attributes and label support.
	 *
	 * **Usage**:
	 * ```svelte
	 * <MoneyBox
	 *   label="Price"
	 *   bind:value={price}
	 *   allowCents={true}
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: MoneyBox,
		title: 'Forms/MoneyBox',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: 'number',
				description: 'The monetary value',
				table: {
					type: { summary: 'number | null' },
					defaultValue: { summary: 'null' }
				}
			},
			prefix: {
				control: 'text',
				description: 'Prefix displayed before the value (e.g., currency symbol)',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'$'" }
				}
			},
			suffix: {
				control: 'text',
				description: 'Suffix displayed after the value',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "''" }
				}
			},
			allowCents: {
				control: 'boolean',
				description: 'Whether to allow cents input',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' }
				}
			},
			units: {
				control: 'select',
				options: ['ones', 'cents'],
				description: 'Whether value is in ones (dollars) or cents',
				table: {
					type: { summary: "'ones' | 'cents'" },
					defaultValue: { summary: "'ones'" }
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
					type: { summary: '(value: number | null) => void' }
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

<Story name="Default" args={{ value: 100, label: 'Per Diem' }} />

<Story
	name="Cents"
	args={{
		value: 2500,
		units: 'cents',
		allowCents: true,
		size: 'md',
		max: 10000,
		label: 'Membership Dues'
	}}
/>

<Story
	name="Nullable"
	args={{
		label: 'Bonus Amount (optional)',
		nullable: true,
		value: 150,
		helperText: 'Uncheck if no bonus applies'
	}}
>
	MoneyBox with nullable support. Toggle the checkbox to enable/disable the field. When unchecked,
	the value clears but is remembered if you re-check it.
</Story>

<Story
	name="NullableEmpty"
	args={{
		label: 'Discount Amount',
		nullable: true,
		helperText: 'Check to apply a discount'
	}}
>
	MoneyBox with nullable support starting empty. When you check the box, it will restore your last
	entered value or default to 0.
</Story>

<Story
	name="NullableCustomText"
	args={{
		label: 'Service Fee',
		nullable: true,
		nullText: 'No fee',
		helperText: 'Check to add a service fee'
	}}
>
	MoneyBox with custom null text displayed when unchecked.
</Story>
