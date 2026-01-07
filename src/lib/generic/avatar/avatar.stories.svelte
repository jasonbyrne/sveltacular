<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './avatar.svelte';

	/**
	 * Avatar component for displaying user profile pictures or initials.
	 *
	 * **Accessibility**: Images include proper `alt` attributes. When using initials,
	 * ensure the name prop is provided for proper context.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Avatar src="/avatar.jpg" alt="User avatar" />
	 * <Avatar name="John Doe" />
	 * ```
	 */
	const { Story } = defineMeta({
		component: Avatar,
		title: 'Generic/Avatar',
		tags: ['autodocs'],
		argTypes: {
			src: {
				control: 'text',
				description: 'Image source URL for the avatar',
				table: {
					type: { summary: 'string | undefined' }
				}
			},
			alt: {
				control: 'text',
				description: 'Alt text for the avatar image',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "''" }
				}
			},
			name: {
				control: 'text',
				description: 'Name to generate initials from (takes first letter of each word, max 2)',
				table: {
					type: { summary: 'string | undefined' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the avatar',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: "'md'" }
				}
			}
		}
	});
</script>

<Story name="WithImage" args={{ src: '/sveltacular.png', alt: 'Avatar' }}>
	Avatar displaying an image from a URL.
</Story>

<Story name="WithName" args={{ name: 'John Doe' }}>
	Avatar displaying initials generated from a name (JD).
</Story>

<Story name="Placeholder">Avatar placeholder when no image or name is provided.</Story>

<Story name="Small" args={{ name: 'JD', size: 'sm' }}>Small avatar size for compact spaces.</Story>

<Story name="Large" args={{ name: 'John Doe', size: 'lg' }}>
	Large avatar size for prominent display.
</Story>

<Story name="AllSizes" args={{ name: 'John Doe' }}>
	All avatar sizes displayed together for comparison.
</Story>

<Story name="LongName" args={{ name: 'John Michael Smith' }}>
	Avatar with a longer name (shows first two initials: JM).
</Story>
