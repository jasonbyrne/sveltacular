<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Empty from './empty.svelte';
	import Button from '$src/lib/forms/button/button.svelte';

	/**
	 * Empty state component for displaying messages when no data is available.
	 * Use this component to provide clear feedback and actionable next steps to users
	 * when there's no content to display (e.g., empty search results, no items yet, etc.).
	 *
	 * **Key Features**:
	 * - Built-in icon support
	 * - Hierarchical messaging (title, message, description)
	 * - Custom content via children snippet (buttons, links, etc.)
	 * - Multiple size variants
	 *
	 * **Accessibility**: Empty states provide clear messaging to users about why
	 * content is missing. Use descriptive text to help users understand the context
	 * and provide clear actions they can take.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Empty icon="folder-open" message="You haven't added any binders yet.">
	 *   <Button variant="primary" onClick={handleCreate}>
	 *     Create Your First Binder
	 *   </Button>
	 * </Empty>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Empty,
		title: 'Generic/Empty',
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'Primary heading/title',
				table: {
					type: { summary: 'string' }
				}
			},
			message: {
				control: 'text',
				description: 'Main message text',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'No data to display'" }
				}
			},
			description: {
				control: 'text',
				description: 'Optional secondary description',
				table: {
					type: { summary: 'string' }
				}
			},
			icon: {
				control: 'select',
				options: [
					undefined,
					'folder-open',
					'envelope',
					'home',
					'check',
					'upload',
					'link',
					'phone',
					'mobile-phone'
				],
				description: 'Built-in icon type from framework',
				table: {
					type: { summary: 'IconType' }
				}
			},
			iconSize: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl'],
				description: 'Icon size',
				table: {
					type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
					defaultValue: { summary: "'xl'" }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl'],
				description: 'Component size (affects padding and text sizing)',
				table: {
					type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
					defaultValue: { summary: "'md'" }
				}
			}
		}
	});
</script>

<!-- Default Examples -->
<Story name="Default" args={{}}>Default empty state with standard message.</Story>

<Story name="SimpleMessage" args={{ message: 'No results found' }}>
	Empty state with custom message text.
</Story>

<!-- With Icons -->
<Story name="WithIcon" args={{ icon: 'folder-open', message: 'No items to display' }}>
	Empty state with a built-in icon.
</Story>

<Story
	name="SearchResults"
	args={{
		icon: 'envelope',
		message: 'No messages found',
		description: 'Try adjusting your search filters or check back later.'
	}}
>
	Empty state with icon and description.
</Story>

<!-- With Title -->
<Story
	name="WithTitle"
	args={{
		icon: 'folder-open',
		title: 'No Projects Yet',
		message: 'Get started by creating your first project.'
	}}
>
	Empty state with title, icon, and message.
</Story>

<!-- With Actions - Your Example! -->
<Story
	name="WithSingleAction"
	args={{ icon: 'folder-open', message: "You haven't added any binders yet." }}
>
	{#snippet children()}
		<Button variant="primary" onClick={fn()}>Create Your First Binder</Button>
	{/snippet}
</Story>

<Story
	name="WithPrimaryAndSecondary"
	args={{
		icon: 'upload',
		title: 'No Files Uploaded',
		message: 'Upload your files to get started.',
		description: 'Supported formats: PDF, DOC, DOCX, JPG, PNG'
	}}
>
	{#snippet children()}
		<Button variant="primary" onClick={fn()}>Upload Files</Button>
		<Button variant="outline" onClick={fn()}>Learn More</Button>
	{/snippet}
</Story>

<Story
	name="WithMultipleActions"
	args={{
		icon: 'home',
		title: 'Welcome to Your Dashboard',
		message: 'Choose an option to get started.'
	}}
>
	{#snippet children()}
		<Button variant="primary" onClick={fn()}>Create Project</Button>
		<Button variant="secondary" onClick={fn()}>Import Data</Button>
		<Button variant="outline" onClick={fn()}>View Tutorial</Button>
	{/snippet}
</Story>

<!-- Size Variants -->
<Story
	name="Small"
	args={{
		size: 'sm',
		icon: 'check',
		message: 'All caught up!',
		description: 'You have no pending items.'
	}}
>
	Small empty state for compact spaces.
</Story>

<Story
	name="Medium"
	args={{
		size: 'md',
		icon: 'envelope',
		message: 'No new messages',
		description: 'Your inbox is empty.'
	}}
>
	Medium empty state (default size).
</Story>

<Story
	name="Large"
	args={{
		size: 'lg',
		icon: 'folder-open',
		title: 'No Documents',
		message: "You haven't created any documents yet."
	}}
>
	{#snippet children()}
		<Button variant="primary" onClick={fn()}>Create Document</Button>
	{/snippet}
</Story>

<Story
	name="ExtraLarge"
	args={{
		size: 'xl',
		icon: 'home',
		title: 'Welcome!',
		message: 'Your workspace is ready to go.',
		description: 'Start by creating your first project or importing existing data.'
	}}
>
	{#snippet children()}
		<Button variant="primary" onClick={fn()}>Get Started</Button>
		<Button variant="secondary" onClick={fn()}>Import</Button>
	{/snippet}
</Story>

<!-- Real-world Examples -->
<Story
	name="EmptyInbox"
	args={{
		icon: 'envelope',
		title: 'Inbox Zero!',
		message: "You've read all your messages.",
		description: 'Great job staying on top of your inbox.'
	}}
>
	Empty inbox success state.
</Story>

<Story
	name="NoSearchResults"
	args={{
		icon: 'envelope',
		message: 'No results for "quantum physics"',
		description: 'Try different keywords or check your spelling.'
	}}
>
	{#snippet children()}
		<Button variant="secondary" onClick={fn()}>Clear Filters</Button>
	{/snippet}
</Story>

<Story
	name="FirstTimeUser"
	args={{
		size: 'lg',
		icon: 'home',
		title: 'Welcome to TaskFlow',
		message: "You're all set! Create your first task to get organized."
	}}
>
	{#snippet children()}
		<Button variant="primary" onClick={fn()}>Create Task</Button>
		<Button variant="outline" onClick={fn()}>Watch Tutorial</Button>
	{/snippet}
</Story>

<Story
	name="DeletedAll"
	args={{ icon: 'check', message: 'All items deleted', description: 'Your list is now empty.' }}
>
	{#snippet children()}
		<Button variant="secondary" onClick={fn()}>Undo</Button>
	{/snippet}
</Story>

<Story name="NoNotifications" args={{ size: 'sm', icon: 'check', message: 'No new notifications' }}>
	Small empty state for notifications.
</Story>
