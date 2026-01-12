<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import TagBox from './tag-box.svelte';

	/**
	 * TagBox component for adding and managing an array of string tags.
	 *
	 * **Features**:
	 * - Custom autocomplete dropdown with keyboard navigation
	 * - Strict mode to limit tags to only allowed values
	 * - Case-insensitive duplicate detection
	 * - Maximum tags limit
	 * - Visual feedback for invalid attempts
	 * - Multiple separator support (comma, semicolon, etc.)
	 *
	 * **Accessibility**: Includes proper ARIA attributes, labels, and helper text support.
	 * Use `aria-describedby` to link helper text and error messages.
	 *
	 * **Usage**:
	 * ```svelte
	 * <TagBox
	 *   label="Tags"
	 *   placeholder="Add a tag..."
	 *   bind:value={tags}
	 *   autocomplete={['tag1', 'tag2', 'tag3']}
	 *   strict={false}
	 *   caseInsensitive={true}
	 *   maxTags={10}
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: TagBox,
		title: 'Forms/TagBox',
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
				description:
					'Array of characters that act as tag separators (default: comma and semicolon)',
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
			feedback: {
				control: 'object',
				description: 'Feedback message with optional details array',
				table: {
					type: { summary: 'FormFieldFeedback' }
				}
			},
			showAddButton: {
				control: 'boolean',
				description:
					'Whether to show the add button (tags can be added with Enter or separator keys)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			strict: {
				control: 'boolean',
				description: 'If true, only tags from the autocomplete list can be added',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			caseInsensitive: {
				control: 'boolean',
				description: 'If true, duplicate detection is case-insensitive',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' }
				}
			},
			maxTags: {
				control: 'number',
				description: 'Maximum number of tags allowed (undefined = no limit)',
				table: {
					type: { summary: 'number | undefined' },
					defaultValue: { summary: 'undefined' }
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
		autocomplete: [
			'JavaScript',
			'TypeScript',
			'Python',
			'Java',
			'C++',
			'React',
			'Vue',
			'Svelte',
			'Angular'
		],
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
		feedback: { text: 'Maximum 5 tags allowed', isError: true },
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

<Story
	name="WithAddButton"
	args={{
		label: 'Tags',
		placeholder: 'Add a tag...',
		helperText: 'Add tags with Enter, separator keys, or the Add button',
		showAddButton: true
	}}
/>

<Story
	name="StrictMode"
	args={{
		label: 'Programming Languages',
		placeholder: 'Select a language...',
		autocomplete: [
			'JavaScript',
			'TypeScript',
			'Python',
			'Java',
			'C++',
			'Go',
			'Rust',
			'Ruby',
			'PHP',
			'Swift'
		],
		strict: true,
		helperText: 'Only languages from the dropdown are allowed (strict mode)'
	}}
/>

<Story
	name="MaxTags"
	args={{
		label: 'Top 3 Skills',
		placeholder: 'Add a skill...',
		autocomplete: ['JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Vue', 'Svelte'],
		maxTags: 3,
		helperText: 'Maximum 3 tags allowed'
	}}
/>

<Story
	name="StrictModeWithMaxTags"
	args={{
		label: 'Select up to 5 technologies',
		placeholder: 'Type to search...',
		autocomplete: [
			'React',
			'Vue',
			'Svelte',
			'Angular',
			'Node.js',
			'Express',
			'Django',
			'Flask',
			'PostgreSQL',
			'MongoDB',
			'Redis',
			'Docker',
			'Kubernetes'
		],
		strict: true,
		maxTags: 5,
		helperText: 'Search and select up to 5 technologies from the list'
	}}
/>

<Story
	name="CaseSensitiveDuplicates"
	args={{
		label: 'Case-Sensitive Tags',
		placeholder: 'Add a tag...',
		caseInsensitive: false,
		helperText: 'Duplicate detection is case-sensitive (React and react are different)',
		value: ['React', 'react', 'REACT']
	}}
/>

<Story
	name="ImprovedKeyboardNavigation"
	args={{
		label: 'Skills with Keyboard Navigation',
		placeholder: 'Type and use arrow keys...',
		autocomplete: [
			'JavaScript',
			'TypeScript',
			'Python',
			'Java',
			'C++',
			'Go',
			'Rust',
			'Ruby',
			'PHP',
			'Swift',
			'Kotlin',
			'Dart',
			'Elixir',
			'Scala'
		],
		helperText: 'Use ↑↓ arrow keys to navigate, Enter/Tab to select, Esc to close'
	}}
/>

<Story
	name="LargeAutocompleteList"
	args={{
		label: 'Countries',
		placeholder: 'Type to search countries...',
		autocomplete: [
			'United States',
			'United Kingdom',
			'Canada',
			'Australia',
			'Germany',
			'France',
			'Italy',
			'Spain',
			'Japan',
			'China',
			'India',
			'Brazil',
			'Mexico',
			'Argentina',
			'Netherlands',
			'Belgium',
			'Switzerland',
			'Austria',
			'Sweden',
			'Norway',
			'Denmark',
			'Finland',
			'Poland',
			'Czech Republic',
			'Ireland',
			'Portugal',
			'Greece',
			'Turkey',
			'South Korea',
			'Singapore',
			'Thailand',
			'Vietnam',
			'Indonesia',
			'Malaysia',
			'Philippines',
			'New Zealand',
			'South Africa',
			'Egypt',
			'Nigeria',
			'Kenya'
		],
		helperText: 'Filtered suggestions update as you type'
	}}
/>

<Story
	name="EmptyTagValidation"
	args={{
		label: 'Tags with Empty Prevention',
		placeholder: 'Try adding empty spaces...',
		showAddButton: true,
		helperText: 'Empty tags and whitespace-only tags are automatically filtered out',
		value: ['valid-tag', '  ', 'another-tag', '']
	}}
/>
