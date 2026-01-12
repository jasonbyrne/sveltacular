<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import TextBox from './text-box.svelte';

	/**
	 * TextBox component for text input with validation and formatting options.
	 *
	 * **Accessibility**: Includes proper ARIA attributes, labels, and helper text support.
	 * Use `aria-describedby` to link helper text and error messages.
	 *
	 * **Usage**:
	 * ```svelte
	 * <TextBox
	 *   label="Name"
	 *   placeholder="Enter your name"
	 *   helperText="Required field"
	 *   bind:value={name}
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: TextBox,
		title: 'Forms/TextBox',
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Label text displayed above the input',
				table: {
					type: { summary: 'string' }
				}
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text shown when input is empty',
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
				options: ['text', 'email', 'password', 'search', 'tel', 'url'],
				description: 'Input type',
				table: {
					type: { summary: 'AllowedTextInputTypes' },
					defaultValue: { summary: 'text' }
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
			disabled: {
				control: 'boolean',
				description: 'Whether the input is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the input field',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: 'full' }
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
			feedback: {
				control: 'object',
				description:
					'Feedback message with optional details array (for password requirements, etc.)',
				table: {
					type: { summary: 'FormFieldFeedback' }
				}
			},
			isLoading: {
				control: 'boolean',
				description: 'Whether the input is in loading state (async validation)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			showCharacterCount: {
				control: 'boolean',
				description: 'Whether to show character counter',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			maxlength: {
				control: 'number',
				description: 'Maximum number of characters allowed',
				table: {
					type: { summary: 'number' }
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
			onCheckChanged: fn(),
			type: 'text',
			size: 'full'
		}
	});
</script>

<Story
	name="Standard"
	args={{
		type: 'text',
		label: 'Name',
		placeholder: 'Enter your name',
		helperText: 'Required field'
	}}
/>

<Story
	name="Units"
	args={{ type: 'text', suffix: 'cm', value: '10', placeholder: 'Placeholder text' }}
/>

<Story
	name="WithLabel"
	args={{
		type: 'text',
		placeholder: 'Placeholder text',
		helperText: 'Here is some additional requirements for the input.',
		label: 'Name'
	}}
/>

<Story
	name="LinkedIn"
	args={{
		type: 'text',
		prefix: 'https://www.linkedin.com/in/',
		placeholder: 'UserName',
		allowSpaces: false
	}}
/>

<Story
	name="UserName"
	args={{ type: 'text', placeholder: 'User Name', allowSpaces: false, textCase: 'lower' }}
/>

<Story
	name="SuccessState"
	args={{
		type: 'email',
		placeholder: 'Enter your email',
		label: 'Email Address',
		feedback: { text: 'Email is available!', isError: false },
		helperText: "We'll never share your email"
	}}
/>

<Story
	name="LoadingState"
	args={{
		type: 'text',
		placeholder: 'Enter username',
		label: 'Username',
		isLoading: true,
		helperText: 'Checking availability...'
	}}
/>

<Story
	name="CharacterCounter"
	args={{
		type: 'text',
		placeholder: 'Tell us about yourself',
		label: 'Bio',
		showCharacterCount: true,
		maxlength: 100,
		helperText: 'Keep it short and sweet',
		value: 'I am a software developer'
	}}
/>

<Story
	name="ErrorState"
	args={{
		type: 'email',
		placeholder: 'Enter your email',
		label: 'Email Address',
		feedback: { text: 'This email is already taken', isError: true },
		helperText: "We'll never share your email"
	}}
/>

<Story
	name="PasswordRequirements"
	args={{
		type: 'password',
		placeholder: 'Enter your password',
		label: 'Password',
		helperText: 'Create a strong password',
		feedback: {
			text: 'Password requirements: 2/5 met',
			isError: true,
			details: [
				{ text: 'At least 8 characters', isError: true },
				{ text: 'Contains uppercase letter', isError: true },
				{ text: 'Contains lowercase letter', isError: false },
				{ text: 'Contains number', isError: false },
				{ text: 'Contains special character', isError: true }
			]
		}
	}}
/>

<Story
	name="PasswordRequirementsMet"
	args={{
		type: 'password',
		placeholder: 'Enter your password',
		label: 'Password',
		helperText: 'Create a strong password',
		feedback: {
			text: 'Password meets all requirements',
			isError: false,
			details: [
				{ text: 'At least 8 characters', isError: false },
				{ text: 'Contains uppercase letter', isError: false },
				{ text: 'Contains lowercase letter', isError: false },
				{ text: 'Contains number', isError: false },
				{ text: 'Contains special character', isError: false }
			]
		}
	}}
/>

<Story
	name="Nullable"
	args={{
		label: 'Middle Name (optional)',
		nullable: true,
		value: 'Marie',
		helperText: 'Uncheck if you do not have a middle name'
	}}
>
	TextBox with nullable support. Toggle the checkbox to enable/disable the field. When unchecked,
	the value clears but is remembered if you re-check it.
</Story>

<Story
	name="NullableEmpty"
	args={{
		label: 'Nickname',
		nullable: true,
		placeholder: 'Enter a nickname',
		helperText: 'Check to set a nickname'
	}}
>
	TextBox with nullable support starting empty. When you check the box, it will restore your last
	entered value or allow you to enter a new one.
</Story>

<Story
	name="NullableCustomText"
	args={{
		label: 'Secondary Email',
		nullable: true,
		nullText: 'No secondary email',
		helperText: 'Check to add a secondary email address',
		placeholder: 'Enter your secondary email'
	}}
>
	TextBox with custom null text displayed when unchecked.
</Story>
