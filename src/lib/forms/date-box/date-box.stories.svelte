<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import DateBox from './date-box.svelte';

	const { Story } = defineMeta({
		component: DateBox,
		title: 'Forms/Date Box',
		tags: ['autodocs'],
		argTypes: {
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
					defaultValue: { summary: "'-- / -- / ----'" }
				}
			},
			onChange: {
				action: 'changed',
				description: 'Called when the date value changes',
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

<Story name="Date" args={{ type: 'date', label: 'Birthdate' }} />

<Story name="DateTime" args={{ type: 'datetime-local', label: 'Deadline' }} />

<Story
	name="DateNullable"
	args={{
		type: 'date',
		nullable: true,
		label: 'End Date',
		helperText: 'Toggle the checkbox to enable/disable the date field'
	}}
>
	DateBox with nullable support. The value is remembered when you uncheck and re-check.
</Story>

<Story
	name="DateNullableCustomText"
	args={{
		type: 'date',
		nullable: true,
		label: 'Expiration Date',
		nullText: 'No expiration',
		helperText: 'Check to set an expiration date'
	}}
>
	DateBox with custom null text displayed when unchecked.
</Story>

<Story
	name="DateSteps"
	args={{
		type: 'date',
		label: 'End Date',
		steps: [
			{ label: '1 Day', value: 1, unit: 'day' },
			{ label: '1 Month', value: 1, unit: 'month' },
			{ label: '1 Year', value: 1, unit: 'year' }
		]
	}}
/>
