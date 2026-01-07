<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from './spinner.svelte';

	/**
	 * Spinner component for indicating loading states.
	 *
	 * **Accessibility**: Includes `role="status"` and `aria-label="Loading"` for screen readers.
	 * Also includes a visually hidden "Loading..." text for additional context.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Spinner size="md" variant="primary" />
	 * ```
	 */
	const { Story } = defineMeta({
		component: Spinner,
		title: 'Generic/Spinner',
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl'],
				description: 'Size of the spinner',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: "'md'" }
				}
			},
			variant: {
				control: 'select',
				options: ['primary', 'secondary'],
				description: 'Color variant of the spinner',
				table: {
					type: { summary: "'primary' | 'secondary'" },
					defaultValue: { summary: "'primary'" }
				}
			}
		}
	});
</script>

<Story name="Small" args={{ size: 'sm' }}>
	Small spinner for compact spaces.
</Story>

<Story name="Medium" args={{ size: 'md' }}>
	Medium spinner (default size) for most use cases.
</Story>

<Story name="Large" args={{ size: 'lg' }}>
	Large spinner for prominent loading states.
</Story>

<Story name="ExtraLarge" args={{ size: 'xl' }}>
	Extra large spinner for full-page loading states.
</Story>

<Story name="Primary" args={{ variant: 'primary' }}>
	Primary variant spinner (default) with primary color.
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>
	Secondary variant spinner with secondary color.
</Story>

<Story name="AllSizes" args={{}}>
	All spinner sizes displayed together for comparison.
</Story>













