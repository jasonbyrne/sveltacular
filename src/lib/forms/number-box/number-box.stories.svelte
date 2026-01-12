<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import NumberBox from './number-box.svelte';

	const { Story } = defineMeta({
		component: NumberBox,
		title: 'Forms/NumberBox',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: 'number',
				description: 'The numeric value',
				table: {
					type: { summary: 'number | null' },
					defaultValue: { summary: '0' }
				}
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text shown when input is empty',
				table: {
					type: { summary: 'string' }
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
			type: {
				control: 'select',
				options: ['number', 'currency'],
				description: 'Type of number input',
				table: {
					type: { summary: 'AllowedInputTypes' },
					defaultValue: { summary: "'number'" }
				}
			},
			min: {
				control: 'number',
				description: 'Minimum allowed value',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
				}
			},
			max: {
				control: 'number',
				description: 'Maximum allowed value',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '1000000' }
				}
			},
			decimals: {
				control: 'number',
				description: 'Number of decimal places',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
				}
			},
			prefix: {
				control: 'text',
				description: 'Text displayed before the input value',
				table: {
					type: { summary: 'string | null' }
				}
			},
			suffix: {
				control: 'text',
				description: 'Text displayed after the input value',
				table: {
					type: { summary: 'string | null' }
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
					type: { summary: '(value: number | null) => void' }
				}
			},
			onInput: {
				action: 'input',
				description: 'Called on input events',
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
			onInput: fn(),
			onCheckChanged: fn()
		}
	});
</script>

<Story name="Standard" args={{ placeholder: 'Enter a Number', type: 'number', label: 'Value' }} />

<Story
	name="Currency"
	args={{
		placeholder: 'Price of tea in china',
		type: 'currency',
		decimals: 0,
		prefix: '$',
		label: 'Value'
	}}
/>

<Story
	name="Units"
	args={{
		placeholder: 'Enter your weight',
		type: 'number',
		decimals: 0,
		suffix: 'pounds',
		label: 'Value'
	}}
/>

<Story
	name="Decimals"
	args={{
		placeholder: 'Enter your weight',
		type: 'number',
		decimals: 2,
		step: 0.01,
		suffix: 'kg',
		label: 'Value'
	}}
/>

<Story
	name="Nullable"
	args={{
		label: 'Number of Dependents (optional)',
		nullable: true,
		value: 2,
		min: 0,
		max: 10,
		helperText: 'Uncheck if not applicable'
	}}
>
	NumberBox with nullable support. Toggle the checkbox to enable/disable the field. When unchecked,
	the value clears but is remembered if you re-check it.
</Story>

<Story
	name="NullableEmpty"
	args={{
		label: 'Discount Percentage',
		nullable: true,
		suffix: '%',
		min: 0,
		max: 100,
		helperText: 'Check to apply a discount'
	}}
>
	NumberBox with nullable support starting empty. When you check the box, it will restore your last
	entered value or default to 0.
</Story>

<Story
	name="NullableCustomText"
	args={{
		label: 'Maximum Uses',
		nullable: true,
		nullText: 'Unlimited',
		helperText: 'Check to set a limit on the number of uses',
		placeholder: 'Enter maximum uses'
	}}
>
	NumberBox with custom null text displayed when unchecked.
</Story>
