<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import UrlBox from './url-box.svelte';

	/**
	 * UrlBox component for entering URLs with protocol selection.
	 *
	 * **Accessibility**: Built on TextBox with proper ARIA attributes and label support.
	 *
	 * **Usage**:
	 * ```svelte
	 * <UrlBox
	 *   label="Website"
	 *   bind:value={url}
	 *   bind:protocol={protocol}
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: UrlBox,
		title: 'Forms/UrlBox',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: 'text',
				description: 'The URL value (without protocol)',
				table: {
					type: { summary: 'string | null' },
					defaultValue: { summary: "''" }
				}
			},
			protocol: {
				control: 'select',
				options: ['http', 'https'],
				description: 'The protocol for the URL',
				table: {
					type: { summary: 'HttpProtocol' },
					defaultValue: { summary: "'https'" }
				}
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text shown when input is empty',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'example.com'" }
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
					defaultValue: { summary: "'lg'" }
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
			onInput: {
				action: 'input',
				description: 'Called on input events',
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
			onInput: fn(),
			onCheckChanged: fn()
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'www.svelte.dev', label: 'Website URL' }} />

<Story
	name="WithValue"
	args={{ label: 'Company Website', value: 'example.com', protocol: 'https' }}
>
	UrlBox with a pre-filled value.
</Story>

<Story
	name="Required"
	args={{ label: 'Website URL', required: true, placeholder: 'www.svelte.dev' }}
>
	Required UrlBox field with validation indicator.
</Story>

<Story
	name="WithHelperText"
	args={{
		label: 'Portfolio URL',
		helperText: 'Enter your portfolio website address',
		placeholder: 'portfolio.example.com'
	}}
>
	UrlBox with helper text providing additional context.
</Story>

<Story
	name="Disabled"
	args={{ label: 'Website', disabled: true, value: 'svelte.dev', protocol: 'https' }}
>
	Disabled UrlBox that cannot be changed.
</Story>

<Story
	name="WithError"
	args={{
		label: 'Website URL',
		value: 'invalid url',
		feedback: { text: 'Please enter a valid URL', isError: true }
	}}
>
	UrlBox with error feedback message.
</Story>

<Story
	name="Nullable"
	args={{
		label: 'Personal Website (optional)',
		nullable: true,
		value: 'johndoe.com',
		helperText: 'Uncheck if you do not have a personal website'
	}}
>
	UrlBox with nullable support. Toggle the checkbox to enable/disable the field. When unchecked, the
	value clears but is remembered if you re-check it.
</Story>

<Story
	name="NullableEmpty"
	args={{
		label: 'Blog URL',
		nullable: true,
		placeholder: 'blog.example.com',
		helperText: 'Check to add your blog URL'
	}}
>
	UrlBox with nullable support starting empty. When you check the box, it will restore your last
	entered value or allow you to enter a new one.
</Story>

<Story
	name="NullableCustomText"
	args={{
		label: 'LinkedIn Profile',
		nullable: true,
		nullText: 'No LinkedIn profile',
		helperText: 'Check to add your LinkedIn profile URL',
		placeholder: 'linkedin.com/in/username'
	}}
>
	UrlBox with custom null text displayed when unchecked.
</Story>
