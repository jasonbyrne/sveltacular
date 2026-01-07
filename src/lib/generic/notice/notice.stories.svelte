<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Notice from './notice.svelte';

	const noticeMessage =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum eos quos, ad provident modi!';

	/**
	 * Notice component for displaying important messages, alerts, and notifications.
	 *
	 * **Accessibility**: Notices include proper semantic HTML and ARIA attributes.
	 * Dismissable notices include accessible close buttons with proper labels.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Notice title="Success" variant="success" dismissable>
	 *   Your changes have been saved.
	 * </Notice>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Notice,
		title: 'Generic/Notice',
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'Optional title text displayed prominently',
				table: {
					type: { summary: 'string | undefined' }
				}
			},
			variant: {
				control: 'select',
				options: ['outline', 'attention', 'success', 'error', 'info'],
				description: 'Visual variant of the notice',
				table: {
					type: { summary: "'outline' | 'attention' | 'success' | 'error' | 'info'" },
					defaultValue: { summary: "'info'" }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl'],
				description: 'Size of the notice',
				table: {
					type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
					defaultValue: { summary: "'md'" }
				}
			},
			dismissable: {
				control: 'boolean',
				description: 'Whether the notice can be dismissed',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			dismissMilliseconds: {
				control: 'number',
				description: 'Auto-dismiss delay in milliseconds (0 = no auto-dismiss)',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
				}
			},
			onShow: {
				action: 'shown',
				description: 'Called when the notice is shown',
				table: {
					type: { summary: '() => void' }
				}
			},
			onDismiss: {
				action: 'dismissed',
				description: 'Called when the notice is dismissed',
				table: {
					type: { summary: '() => void' }
				}
			},
			onHidden: {
				action: 'hidden',
				description: 'Called when the notice is fully hidden',
				table: {
					type: { summary: '() => void' }
				}
			}
		},
		args: {
			onDismiss: fn()
		}
	});
</script>

<Story name="Standard" args={{ title: 'Notice Title' }}>Notice Message</Story>

<Story name="WithoutTitle">Notice Message</Story>

<Story name="Success" args={{ title: 'Notice Title', variant: 'success' }}>
	{noticeMessage}
</Story>

<Story name="Error" args={{ title: 'Notice Title', variant: 'error' }}>
	{noticeMessage}
</Story>

<Story name="Outline" args={{ title: 'Notice Title', variant: 'outline' }}>
	{noticeMessage}
</Story>

<Story name="Attention" args={{ title: 'Notice Title', variant: 'attention' }}>
	{noticeMessage}
</Story>

<Story name="Info" args={{ title: 'Notice Title', variant: 'info' }}>
	{noticeMessage}
</Story>

<Story name="ExtraLarge" args={{ title: 'Notice Title', size: 'xl' }}>
	{noticeMessage}
</Story>

<Story name="Large" args={{ title: 'Notice Title', size: 'lg' }}>
	{noticeMessage}
</Story>

<Story name="Medium" args={{ title: 'Notice Title', size: 'md' }}>
	{noticeMessage}
</Story>

<Story name="Small" args={{ title: 'Notice Title', size: 'sm' }}>Just a small alert message.</Story>

<Story
	name="Dismissable"
	args={{
		title: 'New Post Saved',
		variant: 'success',
		size: 'md',
		dismissable: true
	}}
>
	Your change have been saved.
</Story>

<Story
	name="AutoDismiss"
	args={{
		title: 'New Post Saved',
		variant: 'success',
		size: 'md',
		dismissable: true,
		dismissMilliseconds: 2000
	}}
>
	Your change have been saved.
</Story>
