<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import TagInputBox from './tag-input-box.svelte';

	/**
	 * TagInputBox component for adding and managing an array of string tags.
	 *
	 * **Accessibility**: Includes proper ARIA attributes, labels, and helper text support.
	 * Use `aria-describedby` to link helper text and error messages.
	 *
	 * **Usage**:
	 * ```svelte
	 * <TagInputBox
	 *   label="Tags"
	 *   placeholder="Add a tag..."
	 *   bind:value={tags}
	 *   autocomplete={['tag1', 'tag2', 'tag3']}
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: TagInputBox,
		title: 'Forms/TagInputBox',
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
					type: { summary: 'string' },
					defaultValue: { summary: "'Add a tag...'" }
				}
			},
			value: {
				control: 'object',
				description: 'Array of tag strings',
				table: {
					type: { summary: 'string[]' },
					defaultValue: { summary: '[]' }
				}
			},
			autocomplete: {
				control: 'object',
				description: 'Array of suggested tag strings for autocomplete',
				table: {
					type: { summary: 'string[]' },
					defaultValue: { summary: '[]' }
				}
			},
			separators: {
				control: 'object',
				description: 'Array of characters that act as tag separators (default: comma and semicolon)',
				table: {
					type: { summary: 'string[]' },
					defaultValue: { summary: "[' ', ';']" }
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
					type: { summary: 'FormFieldSizeOptions' },
					defaultValue: { summary: "'full'" }
				}
			},
			helperText: {
				control: 'text',
				description: 'Helper text displayed below the input',
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
			onChange: {
				action: 'changed',
				description: 'Called when tags are added or removed',
				table: {
					type: { summary: '(value: string[]) => void' }
				}
			}
		},
		args: {
			onChange: fn(),
			size: 'full'
		}
	});
</script>

<Story
	name="Standard"
	args={{
		label: 'Tags',
		placeholder: 'Add a tag...',
		helperText: 'Press Enter, comma, or semicolon to add a tag'
	}}
/>

<Story
	name="WithTags"
	args={{
		label: 'Tags',
		placeholder: 'Add a tag...',
		value: ['react', 'svelte', 'vue']
	}}
/>

<Story
	name="WithAutocomplete"
	args={{
		label: 'Skills',
		placeholder: 'Add a skill...',
		autocomplete: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'React', 'Vue', 'Svelte', 'Angular'],
		helperText: 'Select from suggestions or type your own'
	}}
/>

<Story
	name="Required"
	args={{
		label: 'Tags',
		placeholder: 'Add a tag...',
		required: true,
		helperText: 'At least one tag is required'
	}}
/>

<Story
	name="Disabled"
	args={{
		label: 'Tags',
		placeholder: 'Add a tag...',
		disabled: true,
		value: ['tag1', 'tag2']
	}}
/>

<Story
	name="WithError"
	args={{
		label: 'Tags',
		placeholder: 'Add a tag...',
		errorText: 'Maximum 5 tags allowed',
		value: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']
	}}
/>

<Story
	name="ManyTags"
	args={{
		label: 'Tags',
		placeholder: 'Add a tag...',
		value: [
			'react',
			'svelte',
			'vue',
			'angular',
			'typescript',
			'javascript',
			'python',
			'java',
			'c++',
			'go',
			'rust'
		]
	}}
/>

<Story
	name="WithSeparators"
	args={{
		label: 'Tags',
		placeholder: 'Type tags separated by comma or semicolon...',
		helperText: 'Try typing "tag1, tag2; tag3" and see them automatically added',
		separators: [',', ';']
	}}
/>

<Story
	name="CustomSeparators"
	args={{
		label: 'Tags',
		placeholder: 'Type tags separated by pipe or space...',
		helperText: 'Custom separators: pipe (|) and space',
		separators: ['|', ' ']
	}}
/>

