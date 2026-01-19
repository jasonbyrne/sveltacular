<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Chip from './chip.svelte';

	/**
	 * Chip component for displaying tags, labels, or removable items.
	 *
	 * **Accessibility**: Removable chips include an `aria-label` on the remove button
	 * for screen readers. The remove button is keyboard accessible and includes focus styles.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Chip label="Tag" removable onRemove={() => console.log('removed')} />
	 * ```
	 */
	const { Story } = defineMeta({
		component: Chip,
		title: 'Generic/Chip',
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'The text label displayed in the chip',
				table: {
					type: { summary: 'string' }
				}
			},
			removable: {
				control: 'boolean',
				description: 'Whether the chip can be removed',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg'],
				description: 'Size of the chip',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: "'md'" }
				}
			},
			variant: {
				control: 'select',
				options: ['standard', 'positive', 'negative'],
				description: 'Color variant of the chip',
				table: {
					type: { summary: "'standard' | 'positive' | 'negative'" },
					defaultValue: { summary: "'standard'" }
				}
			},
			link: {
				control: 'object',
				description: 'Link configuration with url and optional target',
				table: {
					type: { summary: '{ url: string; target?: string }' }
				}
			},
			children: {
				control: false,
				description: 'Snippet for additional content',
				table: {
					type: { summary: 'Snippet' }
				}
			},
			onRemove: {
				action: 'removed',
				description: 'Called when the chip is removed',
				table: {
					type: { summary: '() => void' }
				}
			}
		},
		args: {
			onRemove: fn()
		}
	});
</script>

<Story name="Default" args={{ label: 'Chip' }}>Standard chip with default styling.</Story>

<Story name="Removable" args={{ label: 'Removable Chip', removable: true }}>
	Chip with a remove button that can be clicked or activated with keyboard.
</Story>

<Story name="Positive" args={{ label: 'Success', variant: 'positive' }}>
	Positive variant chip (typically green) for success states.
</Story>

<Story name="Negative" args={{ label: 'Error', variant: 'negative' }}>
	Negative variant chip (typically red) for error or warning states.
</Story>

<Story name="Sizes" args={{ label: 'Chip' }}>Chip in different sizes: sm, md, lg.</Story>

<Story name="WithRemoveHandler" args={{ label: 'Click to remove', removable: true }}>
	Removable chip with remove handler for demonstration.
</Story>

<Story name="WithLink" args={{ label: 'External Resource', link: { url: 'https://example.com' } }}>
	Chip with an external link icon that opens in a new tab.
</Story>

<Story
	name="WithLinkAndCustomTarget"
	args={{ label: 'Same Tab Link', link: { url: 'https://example.com', target: '_self' } }}
>
	Chip with a link that opens in the same tab (target="_self").
</Story>

<Story name="WithChildren">
	<Chip label="User Profile">
		{#snippet children()}
			john.doe@example.com
		{/snippet}
	</Chip>
	Chip with children snippet displaying additional information below the label.
</Story>

<Story name="WithLinkAndChildren">
	<Chip label="Documentation" link={{ url: 'https://docs.example.com' }}>
		{#snippet children()}
			v2.0.1
		{/snippet}
	</Chip>
	Chip combining a link with additional children content.
</Story>

<Story name="RemovableWithLinkAndChildren">
	<Chip
		label="Team Member"
		removable={true}
		link={{ url: 'https://profile.example.com/johndoe' }}
		onRemove={fn()}
	>
		{#snippet children()}
			Senior Developer
		{/snippet}
	</Chip>
	Fully-featured chip with label, children content, link, and remove button.
</Story>
