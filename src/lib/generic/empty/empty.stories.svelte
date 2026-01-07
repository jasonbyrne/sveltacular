<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Empty from './empty.svelte';

	/**
	 * Empty component for displaying empty states when there's no data to show.
	 *
	 * **Accessibility**: Empty states provide clear messaging to users about why
	 * content is missing. Use descriptive text to help users understand the context.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Empty text="No results found" size="lg" />
	 * ```
	 */
	const { Story } = defineMeta({
		component: Empty,
		title: 'Generic/Empty',
		tags: ['autodocs'],
		argTypes: {
			text: {
				control: 'text',
				description: 'Text message to display',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'No data to display'" }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl'],
				description: 'Size of the empty state',
				table: {
					type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
					defaultValue: { summary: "'md'" }
				}
			},
			orientation: {
				control: 'select',
				options: ['horizontal', 'vertical'],
				description:
					'Layout orientation (vertical stacks icon/text, horizontal places them side by side)',
				table: {
					type: { summary: "'horizontal' | 'vertical'" },
					defaultValue: { summary: "'vertical'" }
				}
			},
			reverse: {
				control: 'boolean',
				description: 'Reverse the order of icon and text (horizontal orientation only)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			align: {
				control: 'select',
				options: ['center', 'start', 'end'],
				description: 'Vertical alignment of content',
				table: {
					type: { summary: "'center' | 'start' | 'end'" },
					defaultValue: { summary: "'center'" }
				}
			}
		}
	});
</script>

<Story name="Default" args={{}}>Default empty state with standard message.</Story>

<Story name="WithMessage" args={{ text: 'No results found' }}>
	Empty state with custom message text.
</Story>

<Story name="Horizontal" args={{ text: 'No results found', orientation: 'horizontal' }}>
	Empty state with horizontal layout (icon and text side by side).
</Story>

<Story name="XLarge" args={{ text: 'No results found', size: 'xl' }}>
	Extra large empty state for prominent display.
</Story>

<Story name="Large" args={{ text: 'No results found', size: 'lg' }}>
	Large empty state for important empty states.
</Story>

<Story name="Medium" args={{ text: 'No results found', size: 'md' }}>
	Medium empty state (default size).
</Story>

<Story name="Small" args={{ text: 'No results found', size: 'sm' }}>
	Small empty state for compact spaces.
</Story>

<Story name="WithCustomIcon" args={{ text: 'No items yet' }}>
	{#snippet children()}
		<span style="font-size: 3rem;">📦</span>
	{/snippet}
</Story>

<Story name="AlignedStart" args={{ text: 'No results found', align: 'start' }}>
	Empty state aligned to the start (top).
</Story>

<Story name="AlignedEnd" args={{ text: 'No results found', align: 'end' }}>
	Empty state aligned to the end (bottom).
</Story>
