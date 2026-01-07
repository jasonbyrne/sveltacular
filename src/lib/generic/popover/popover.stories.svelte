<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Popover from './popover.svelte';
	import Button from '$src/lib/forms/button/button.svelte';

	/**
	 * Popover component for displaying floating content that can be opened and closed.
	 *
	 * **Accessibility**: Popovers support keyboard navigation (Enter/Space to toggle,
	 * Escape to close). Click outside to close. Uses smart positioning to stay within
	 * viewport bounds.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Popover bind:open={isOpen} position="bottom">
	 *   {#snippet trigger()}
	 *     <Button label="Open popover" />
	 *   {/snippet}
	 *   {#snippet children()}
	 *     <div>Popover content</div>
	 *   {/snippet}
	 * </Popover>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Popover,
		title: 'Generic/Popover',
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: 'boolean',
				description: 'Whether the popover is open',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			position: {
				control: 'select',
				options: ['top', 'bottom', 'left', 'right'],
				description: 'Basic position of the popover (used when placement is not specified)',
				table: {
					type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
					defaultValue: { summary: "'bottom'" }
				}
			},
			placement: {
				control: 'select',
				options: [
					'top',
					'top-start',
					'top-end',
					'bottom',
					'bottom-start',
					'bottom-end',
					'left',
					'left-start',
					'left-end',
					'right',
					'right-start',
					'right-end'
				],
				description: 'Precise placement of the popover (overrides position when set)',
				table: {
					type: { summary: 'Placement | undefined' }
				}
			},
			autoPosition: {
				control: 'boolean',
				description: 'Enable smart positioning that adjusts to stay within viewport',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' }
				}
			},
			arrow: {
				control: 'boolean',
				description: 'Show arrow pointing to trigger element',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			offset: {
				control: 'number',
				description: 'Offset distance from trigger element in pixels',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '8' }
				}
			}
		}
	});
</script>

{#snippet triggerSnippet()}
	<Button label="Click me" />
{/snippet}

<Story name="Bottom" args={{ position: 'bottom', trigger: triggerSnippet }}>
	Popover positioned below the trigger element.
</Story>

<Story name="Top" args={{ position: 'top', trigger: triggerSnippet }}>
	Popover positioned above the trigger element.
</Story>

<Story name="Left" args={{ position: 'left', trigger: triggerSnippet }}>
	Popover positioned to the left of the trigger element.
</Story>

<Story name="Right" args={{ position: 'right', trigger: triggerSnippet }}>
	Popover positioned to the right of the trigger element.
</Story>

<Story name="WithArrow" args={{ position: 'bottom', arrow: true, trigger: triggerSnippet }}>
	Popover with arrow pointing to the trigger element.
</Story>

<Story name="PrecisePlacement" args={{ placement: 'bottom-start', trigger: triggerSnippet }}>
	Popover with precise placement (bottom-start alignment).
</Story>

<Story name="RichContent" args={{ position: 'bottom', trigger: triggerSnippet }}>
	{#snippet children()}
		<div style="padding: 1rem; min-width: 200px;">
			<h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Popover Title</h3>
			<p style="margin: 0; color: #666; font-size: 0.875rem;">
				This is rich content inside the popover. You can include any HTML or components here.
			</p>
		</div>
	{/snippet}
</Story>
