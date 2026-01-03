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
					type: { summary: '(value: string) => void' }
				}
			},
			onInput: {
				action: 'input',
				description: 'Called on input events',
				table: {
					type: { summary: '(value: string) => void' }
				}
			},
			successText: {
				control: 'text',
				description: 'Success message displayed below the input',
				table: {
					type: { summary: 'string' }
				}
			},
			errorText: {
				control: 'text',
				description: 'Error message displayed below the input',
				table: {
					type: { summary: 'string' }
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
			}
		},
		args: {
			onChange: fn(),
			onInput: fn(),
			type: 'text',
			size: 'full'
		}
	});
</script>

<Story
	name="Standard"
	args={{ type: 'text', placeholder: 'Placeholder text', helperText: 'Here is some additional requirements for the input.' }}
/>

<Story name="Units" args={{ type: 'text', suffix: 'cm', value: '10', placeholder: 'Placeholder text' }} />

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
	args={{ type: 'text', prefix: 'https://www.linkedin.com/in/', placeholder: 'UserName', allowSpaces: false }}
/>

<Story name="UserName" args={{ type: 'text', placeholder: 'User Name', allowSpaces: false, textCase: 'lower' }} />

<Story 
	name="SuccessState" 
	args={{ 
		type: 'email', 
		placeholder: 'Enter your email',
		label: 'Email Address',
		successText: 'Email is available!',
		helperText: 'We\'ll never share your email'
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
		errorText: 'This email is already taken',
		helperText: 'We\'ll never share your email'
	}} 
/>


