<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Button from './button.svelte';

	/**
	 * Button component with multiple variants and sizes.
	 *
	 * **Accessibility**: Buttons support keyboard navigation and include proper ARIA attributes.
	 * Use `aria-label` when the button only contains an icon.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Button variant="primary" label="Submit" onClick={handleSubmit} />
	 * ```
	 */
	const { Story } = defineMeta({
		component: Button,
		title: 'Forms/Button',
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['primary', 'secondary', 'positive', 'danger', 'outline'],
				description: 'Visual style variant of the button',
				table: {
					type: { summary: 'ButtonVariant' },
					defaultValue: { summary: 'secondary' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the button',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: 'md' }
				}
			},
			label: {
				control: 'text',
				description: 'Button label text',
				table: {
					type: { summary: 'string' }
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the button is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			block: {
				control: 'boolean',
				description: 'Display as block (full width)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			onClick: {
				action: 'clicked',
				description: 'Click event handler',
				table: {
					type: { summary: '() => void' }
				}
			}
		},
		args: {
			onClick: fn(),
			variant: 'secondary',
			size: 'md',
			label: 'Click Me'
		}
	});
</script>

<Story name="Primary" args={{ variant: 'primary', label: 'Click Me' }}>
	Primary button variant for main actions.
</Story>

<Story name="Secondary" args={{ variant: 'secondary', label: 'Click Me' }}>
	Secondary button variant for secondary actions.
</Story>

<Story name="Danger" args={{ variant: 'danger', label: 'Delete' }}>
	Danger button variant for destructive actions.
</Story>

<Story name="Positive" args={{ variant: 'positive', label: 'Save' }}>
	Positive button variant for positive actions like save or confirm.
</Story>

<Story name="Outline" args={{ variant: 'outline', label: 'Cancel' }}>
	Outline button variant for less prominent actions.
</Story>

<Story name="Sizes" args={{ variant: 'primary', label: 'Button' }}>
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<Button variant="primary" size="sm" label="Small" />
		<Button variant="primary" size="md" label="Medium" />
		<Button variant="primary" size="lg" label="Large" />
		<Button variant="primary" size="xl" label="Extra Large" />
		<Button variant="primary" size="full" label="Full Width" />
	</div>
</Story>

<Story name="Disabled" args={{ variant: 'primary', label: 'Disabled', disabled: true }}>
	Disabled buttons cannot be clicked and have reduced opacity.
</Story>

<Story name="Block" args={{ variant: 'primary', label: 'Block Button', block: true }}>
	Block buttons span the full width of their container.
</Story>

<Story
	name="SingleClick"
	args={{ variant: 'primary', repeatSubmitDelay: 'infinite', label: 'Single Click' }}
>
	Button with infinite repeat submit delay prevents double-clicks.
</Story>
