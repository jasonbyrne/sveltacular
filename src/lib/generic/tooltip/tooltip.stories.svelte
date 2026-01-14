<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './tooltip.svelte';
	import Button from '$src/lib/forms/button/button.svelte';
	import Badge from '$src/lib/generic/badge/badge.svelte';
	import Link from '$src/lib/generic/link/link.svelte';

	/**
	 * Tooltip component for displaying contextual information on hover, focus, or click.
	 *
	 * **Accessibility**: Tooltips are properly positioned and include ARIA attributes.
	 * Supports keyboard navigation (Tab to focus, Escape to close). The component
	 * automatically hides when content is empty or whitespace-only.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Tooltip text="Helpful information">
	 *   <Button>Hover me</Button>
	 * </Tooltip>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Tooltip,
		title: 'Generic/Tooltip',
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'Optional title text displayed above the main text',
				table: {
					type: { summary: 'string | undefined' }
				}
			},
			text: {
				control: 'text',
				description: 'Main tooltip text content',
				table: {
					type: { summary: 'string | undefined' }
				}
			},
			content: {
				control: 'object',
				description: 'Optional snippet for custom rich content',
				table: {
					type: { summary: 'Snippet | undefined' }
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
				description: 'Position of the tooltip relative to trigger',
				table: {
					type: { summary: 'Placement' },
					defaultValue: { summary: "'top'" }
				}
			},
			trigger: {
				control: 'select',
				options: ['hover', 'focus', 'click', 'manual'],
				description: 'How the tooltip is triggered',
				table: {
					type: { summary: "'hover' | 'focus' | 'click' | 'manual'" },
					defaultValue: { summary: "'hover'" }
				}
			},
			arrow: {
				control: 'boolean',
				description: 'Show arrow pointing to trigger',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' }
				}
			},
			openDelay: {
				control: 'number',
				description: 'Delay in ms before showing tooltip',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
				}
			},
			closeDelay: {
				control: 'number',
				description: 'Delay in ms before hiding tooltip',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '0' }
				}
			},
			open: {
				control: 'boolean',
				description: 'Controlled open state (for manual trigger mode)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the tooltip is disabled',
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

<!-- Basic Examples -->
<Story name="Default (Hover Top)">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip text="This is a tooltip on top">
			<Button>Hover me</Button>
		</Tooltip>
	</div>
</Story>

<Story name="All Placements">
	<div style="padding: 100px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;">
		<div>
			<h4 style="margin-bottom: 1rem;">Top</h4>
			<div style="display: flex; flex-direction: column; gap: 0.5rem;">
				<Tooltip text="Top start" placement="top-start">
					<Button size="sm">Top Start</Button>
				</Tooltip>
				<Tooltip text="Top center" placement="top">
					<Button size="sm">Top Center</Button>
				</Tooltip>
				<Tooltip text="Top end" placement="top-end">
					<Button size="sm">Top End</Button>
				</Tooltip>
			</div>
		</div>

		<div>
			<h4 style="margin-bottom: 1rem;">Bottom</h4>
			<div style="display: flex; flex-direction: column; gap: 0.5rem;">
				<Tooltip text="Bottom start" placement="bottom-start">
					<Button size="sm">Bottom Start</Button>
				</Tooltip>
				<Tooltip text="Bottom center" placement="bottom">
					<Button size="sm">Bottom Center</Button>
				</Tooltip>
				<Tooltip text="Bottom end" placement="bottom-end">
					<Button size="sm">Bottom End</Button>
				</Tooltip>
			</div>
		</div>

		<div>
			<h4 style="margin-bottom: 1rem;">Left</h4>
			<div style="display: flex; flex-direction: column; gap: 0.5rem;">
				<Tooltip text="Left start" placement="left-start">
					<Button size="sm">Left Start</Button>
				</Tooltip>
				<Tooltip text="Left center" placement="left">
					<Button size="sm">Left Center</Button>
				</Tooltip>
				<Tooltip text="Left end" placement="left-end">
					<Button size="sm">Left End</Button>
				</Tooltip>
			</div>
		</div>

		<div>
			<h4 style="margin-bottom: 1rem;">Right</h4>
			<div style="display: flex; flex-direction: column; gap: 0.5rem;">
				<Tooltip text="Right start" placement="right-start">
					<Button size="sm">Right Start</Button>
				</Tooltip>
				<Tooltip text="Right center" placement="right">
					<Button size="sm">Right Center</Button>
				</Tooltip>
				<Tooltip text="Right end" placement="right-end">
					<Button size="sm">Right End</Button>
				</Tooltip>
			</div>
		</div>
	</div>
</Story>

<!-- Trigger Modes -->
<Story name="Trigger: Hover">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip text="Appears on hover" trigger="hover">
			<Button>Hover me</Button>
		</Tooltip>
	</div>
</Story>

<Story name="Trigger: Focus">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip text="Appears on focus (Tab to me)" trigger="focus">
			<Button>Focus me</Button>
		</Tooltip>
	</div>
</Story>

<Story name="Trigger: Click">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip text="Click to toggle tooltip" trigger="click">
			<Button>Click me</Button>
		</Tooltip>
		<p style="margin-left: 2rem; color: #666;">
			Click the button to toggle. Click outside or press Escape to close.
		</p>
	</div>
</Story>

<Story name="Trigger: Manual (Controlled)">
	<div style="padding: 60px; text-align: center;">
		<p style="margin-bottom: 1rem; color: #666;">
			Manual mode allows you to control the tooltip programmatically via the <code
				style="background: #f0f0f0; padding: 0.125rem 0.25rem; border-radius: 0.25rem;">open</code
			> prop.
		</p>
		<p style="color: #666;">
			Use <code style="background: #f0f0f0; padding: 0.125rem 0.25rem; border-radius: 0.25rem;"
				>bind:open</code
			> to control the state from a parent component.
		</p>
		<div style="margin-top: 2rem;">
			<Tooltip text="This tooltip is in manual mode" trigger="manual">
				<Badge count={1} variant="warning" />
			</Tooltip>
		</div>
	</div>
</Story>

<!-- Delays -->
<Story name="With Open Delay">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip text="Appears after 500ms" openDelay={500}>
			<Button>Hover me (delayed)</Button>
		</Tooltip>
		<p style="margin-left: 2rem; color: #666;">Tooltip appears after 500ms delay</p>
	</div>
</Story>

<Story name="With Close Delay">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip text="Closes after 500ms" closeDelay={500}>
			<Button>Hover me</Button>
		</Tooltip>
		<p style="margin-left: 2rem; color: #666;">Tooltip closes after 500ms delay</p>
	</div>
</Story>

<Story name="With Both Delays">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip text="Opens and closes with delay" openDelay={300} closeDelay={300}>
			<Button>Hover me</Button>
		</Tooltip>
		<p style="margin-left: 2rem; color: #666;">300ms delay for both open and close</p>
	</div>
</Story>

<!-- Arrow Variations -->
<Story name="Without Arrow">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip text="No arrow tooltip" arrow={false}>
			<Button>Hover me</Button>
		</Tooltip>
	</div>
</Story>

<Story name="With Arrow (All Sides)">
	<div
		style="padding: 100px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; place-items: center;"
	>
		<Tooltip text="Tooltip with arrow on top" placement="top" arrow={true}>
			<Button>Top Arrow</Button>
		</Tooltip>
		<Tooltip text="Tooltip with arrow on bottom" placement="bottom" arrow={true}>
			<Button>Bottom Arrow</Button>
		</Tooltip>
		<Tooltip text="Tooltip with arrow on left" placement="left" arrow={true}>
			<Button>Left Arrow</Button>
		</Tooltip>
		<Tooltip text="Tooltip with arrow on right" placement="right" arrow={true}>
			<Button>Right Arrow</Button>
		</Tooltip>
	</div>
</Story>

<!-- Content Variations -->
<Story name="With Title">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
		<Tooltip title="Pro Tip" text="Keyboard shortcuts can speed up your workflow">
			<Button>Title + Text</Button>
		</Tooltip>
		<Tooltip
			title="Important!"
			text="Save your work regularly to avoid data loss"
			placement="bottom"
		>
			<Button>Title + Text (Bottom)</Button>
		</Tooltip>
		<Tooltip title="Quick Info" placement="right">
			<Button>Title Only</Button>
		</Tooltip>
	</div>
</Story>

<Story name="Long Text Content">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip
			text="This is a much longer tooltip text that demonstrates how the tooltip handles wrapping and maximum width constraints. It should wrap nicely and remain readable."
		>
			<Button>Long content</Button>
		</Tooltip>
	</div>
</Story>

<Story name="Long Content with Title">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip
			title="Detailed Information"
			text="This is a much longer tooltip text with a title that demonstrates how the tooltip handles wrapping and maximum width constraints when both title and body text are present."
		>
			<Button>Long title + text</Button>
		</Tooltip>
	</div>
</Story>

<Story name="Rich Content (Snippet)">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip placement="bottom">
			{#snippet content()}
				<div style="text-align: left;">
					<strong style="display: block; margin-bottom: 0.25rem;">Pro Tip!</strong>
					<span
						>Use <code
							style="background: rgba(255,255,255,0.2); padding: 0 0.25rem; border-radius: 2px;"
							>Ctrl+K</code
						> to open command palette</span
					>
				</div>
			{/snippet}
			<Button>Rich content</Button>
		</Tooltip>
	</div>
</Story>

<Story name="Rich Content with List">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip placement="right">
			{#snippet content()}
				<div style="text-align: left;">
					<strong style="display: block; margin-bottom: 0.5rem;">Features:</strong>
					<ul style="margin: 0; padding-left: 1.25rem; line-height: 1.6;">
						<li>Smart positioning</li>
						<li>Multiple triggers</li>
						<li>Rich content</li>
						<li>Accessible</li>
					</ul>
				</div>
			{/snippet}
			<Button>Feature list</Button>
		</Tooltip>
	</div>
</Story>

<!-- Disabled State -->
<Story name="Disabled">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
		<Tooltip text="This tooltip won't show" disabled>
			<Button>Disabled tooltip</Button>
		</Tooltip>
		<p style="margin-left: 2rem; color: #666;">Tooltip is disabled and won't appear</p>
	</div>
</Story>

<!-- Different Trigger Elements -->
<Story name="On Different Elements">
	<div
		style="padding: 60px; display: flex; gap: 2rem; justify-content: center; align-items: center;"
	>
		<Tooltip text="Button tooltip">
			<Button>Button</Button>
		</Tooltip>

		<Tooltip text="Badge tooltip" placement="bottom">
			<Badge count={5} variant="positive" />
		</Tooltip>

		<Tooltip text="Link tooltip" placement="right">
			<Link href="#">Link</Link>
		</Tooltip>

		<Tooltip text="Text tooltip" placement="bottom">
			<span style="text-decoration: underline dotted; cursor: help;">Hover me</span>
		</Tooltip>
	</div>
</Story>

<!-- Edge Cases -->
<Story name="Near Viewport Edge (Auto Flip)">
	<div style="position: relative; height: 400px;">
		<div style="position: absolute; top: 10px; left: 10px;">
			<Tooltip text="Flips to stay visible" placement="top">
				<Button size="sm">Top Left</Button>
			</Tooltip>
		</div>
		<div style="position: absolute; top: 10px; right: 10px;">
			<Tooltip text="Flips to stay visible" placement="top">
				<Button size="sm">Top Right</Button>
			</Tooltip>
		</div>
		<div style="position: absolute; bottom: 10px; left: 10px;">
			<Tooltip text="Flips to stay visible" placement="bottom">
				<Button size="sm">Bottom Left</Button>
			</Tooltip>
		</div>
		<div style="position: absolute; bottom: 10px; right: 10px;">
			<Tooltip text="Flips to stay visible" placement="bottom">
				<Button size="sm">Bottom Right</Button>
			</Tooltip>
		</div>
	</div>
</Story>

<!-- Multiple Tooltips -->
<Story name="Multiple Tooltips">
	<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
		<Tooltip text="First tooltip">
			<Button size="sm">Button 1</Button>
		</Tooltip>
		<Tooltip text="Second tooltip">
			<Button size="sm">Button 2</Button>
		</Tooltip>
		<Tooltip text="Third tooltip">
			<Button size="sm">Button 3</Button>
		</Tooltip>
		<Tooltip text="Fourth tooltip">
			<Button size="sm">Button 4</Button>
		</Tooltip>
		<Tooltip text="Fifth tooltip">
			<Button size="sm">Button 5</Button>
		</Tooltip>
	</div>
</Story>

<!-- Keyboard Navigation Demo -->
<Story name="Keyboard Navigation">
	<div style="padding: 60px;">
		<div style="text-align: center; margin-bottom: 2rem;">
			<p style="color: #666; margin-bottom: 0.5rem;">
				Use <kbd
					style="background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 0.25rem; border: 1px solid #ccc;"
					>Tab</kbd
				>
				to navigate,
				<kbd
					style="background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 0.25rem; border: 1px solid #ccc;"
					>Escape</kbd
				> to close
			</p>
		</div>
		<div style="display: flex; gap: 1rem; justify-content: center;">
			<Tooltip text="Focus me with Tab" trigger="focus">
				<Button>Button 1</Button>
			</Tooltip>
			<Tooltip text="Click me or use Enter/Space" trigger="click">
				<Button>Button 2 (Click)</Button>
			</Tooltip>
			<Tooltip text="Focus me too" trigger="focus">
				<Button>Button 3</Button>
			</Tooltip>
		</div>
	</div>
</Story>

<!-- Empty Content (Should Not Show) -->
<Story name="Empty Content (Should Not Show)">
	<div style="padding: 60px;">
		<div style="text-align: center; margin-bottom: 2rem;">
			<p style="color: #666;">
				These tooltips have no content and should NOT appear when triggered:
			</p>
		</div>
		<div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
			<Tooltip text="">
				<Button>Empty String</Button>
			</Tooltip>
			<Tooltip text="   ">
				<Button>Whitespace Only</Button>
			</Tooltip>
			<Tooltip text={undefined}>
				<Button>Undefined</Button>
			</Tooltip>
		</div>
	</div>
</Story>

<!-- Real World Example -->
<Story name="Real World: Help Icons">
	<div style="padding: 60px; max-width: 400px; margin: 0 auto;">
		<form style="display: flex; flex-direction: column; gap: 1.5rem;">
			<div>
				<label
					style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 500;"
				>
					Email Address
					<Tooltip text="We'll never share your email with anyone else" placement="right">
						<span
							style="display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: #6b7280; color: white; font-size: 12px; cursor: help;"
							>?</span
						>
					</Tooltip>
				</label>
				<input
					type="email"
					style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;"
					placeholder="you@example.com"
				/>
			</div>

			<div>
				<label
					style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 500;"
				>
					Password
					<Tooltip
						title="Password Requirements"
						text="At least 8 characters with one uppercase letter, one number, and one special character."
						placement="right"
					>
						<span
							style="display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: #6b7280; color: white; font-size: 12px; cursor: help;"
							>?</span
						>
					</Tooltip>
				</label>
				<input
					type="password"
					style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;"
					placeholder="••••••••"
				/>
			</div>

			<div>
				<label
					style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 500;"
				>
					Phone Number
					<Tooltip
						title="Format"
						text="Enter your phone number with country code, e.g., +1 (555) 123-4567"
						placement="right"
					>
						<span
							style="display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: #6b7280; color: white; font-size: 12px; cursor: help;"
							>?</span
						>
					</Tooltip>
				</label>
				<input
					type="tel"
					style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;"
					placeholder="+1 (555) 123-4567"
				/>
			</div>
		</form>
	</div>
</Story>
