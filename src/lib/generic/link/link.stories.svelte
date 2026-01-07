<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Link from './link.svelte';

	/**
	 * Link component for navigation and external links.
	 *
	 * **Accessibility**: Uses semantic `<a>` element with proper href attributes.
	 * Disabled links are rendered as spans to prevent navigation. External links
	 * should include `target="_blank"` and `rel="noopener noreferrer"` for security.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Link href="/about" underline="hover">About Us</Link>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Link,
		title: 'Generic/Link',
		tags: ['autodocs'],
		argTypes: {
			href: {
				control: 'text',
				description: 'URL or path for the link',
				table: {
					type: { summary: 'string' }
				}
			},
			target: {
				control: 'text',
				description: 'Link target (e.g., "_blank" for new tab)',
				table: {
					type: { summary: 'string | undefined' }
				}
			},
			underline: {
				control: 'select',
				options: ['none', 'hover', 'always'],
				description: 'Underline display behavior',
				table: {
					type: { summary: "'none' | 'hover' | 'always'" },
					defaultValue: { summary: "'none'" }
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the link is disabled (renders as span)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			display: {
				control: 'select',
				options: ['inline', 'block', 'inline-block'],
				description: 'Display type of the link',
				table: {
					type: { summary: "'inline' | 'block' | 'inline-block'" },
					defaultValue: { summary: "'inline'" }
				}
			}
		}
	});
</script>

<Story name="Standard" args={{ href: 'https://www.google.com' }}>
	Standard link with no underline by default.
</Story>

<Story name="UnderlineOnHover" args={{ href: 'https://www.google.com', underline: 'hover' }}>
	Link that shows underline on hover.
</Story>

<Story name="UnderlineAlways" args={{ href: 'https://www.google.com', underline: 'always' }}>
	Link with always-visible underline.
</Story>

<Story name="Disabled" args={{ href: 'https://www.google.com', disabled: true }}>
	Disabled link (rendered as span, not clickable).
</Story>

<Story name="ExternalLink" args={{ href: 'https://www.google.com', target: '_blank' }}>
	External link that opens in a new tab (should include rel="noopener noreferrer" in production).
</Story>

<Story name="BlockDisplay" args={{ href: 'https://www.google.com', display: 'block' }}>
	Block-level link that takes full width.
</Story>

<Story name="InlineBlock" args={{ href: 'https://www.google.com', display: 'inline-block' }}>
	Inline-block link for custom sizing.
</Story>
