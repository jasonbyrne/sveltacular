<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Button from './button.svelte';
	import type { ComponentProps } from 'svelte';

	type ButtonProps = ComponentProps<typeof Button>;

	/**
	 * Button component with multiple variants and sizes.
	 *
	 * **Accessibility**: Buttons support keyboard navigation and include proper ARIA attributes.
	 * Use `ariaLabel` when the button only contains an icon.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Button variant="primary" onClick={handleSubmit}>Submit</Button>
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
			disabled: {
				control: 'boolean',
				description: 'Whether the button is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			loading: {
				control: 'boolean',
				description: 'Whether the button is in loading state',
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
			size: 'md'
		}
	});
</script>

<Story name="Primary" args={{ variant: 'primary' }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div>
			<Button {...args}>Click Me</Button>
			<p>Primary button variant for main actions.</p>
		</div>
	{/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div>
			<Button {...args}>Click Me</Button>
			<p>Secondary button variant for secondary actions.</p>
		</div>
	{/snippet}
</Story>

<Story name="Danger" args={{ variant: 'danger' }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div>
			<Button {...args}>Delete</Button>
			<p>Danger button variant for destructive actions.</p>
		</div>
	{/snippet}
</Story>

<Story name="Positive" args={{ variant: 'positive' }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div>
			<Button {...args}>Save</Button>
			<p>Positive button variant for positive actions like save or confirm.</p>
		</div>
	{/snippet}
</Story>

<Story name="Outline" args={{ variant: 'outline' }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div>
			<Button {...args}>Cancel</Button>
			<p>Outline button variant for less prominent actions.</p>
		</div>
	{/snippet}
</Story>

<Story name="Sizes" args={{ variant: 'primary' }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<Button variant="primary" size="sm">Small</Button>
			<Button variant="primary" size="md">Medium</Button>
			<Button variant="primary" size="lg">Large</Button>
			<Button variant="primary" size="xl">Extra Large</Button>
			<Button variant="primary" size="full">Full Width</Button>
		</div>
	{/snippet}
</Story>

<Story name="Disabled" args={{ variant: 'primary', disabled: true }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div>
			<Button {...args}>Disabled</Button>
			<p>Disabled buttons cannot be clicked and have reduced opacity.</p>
		</div>
	{/snippet}
</Story>

<Story name="Block" args={{ variant: 'primary', block: true }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div>
			<Button {...args}>Block Button</Button>
			<p>Block buttons span the full width of their container.</p>
		</div>
	{/snippet}
</Story>

<Story name="Loading" args={{ variant: 'primary', loading: true }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div>
			<Button {...args}>Loading Button</Button>
			<p>Loading buttons show a spinner and are disabled.</p>
		</div>
	{/snippet}
</Story>

<Story name="SingleClick" args={{ variant: 'primary', repeatSubmitDelay: 'infinite' }}>
	{#snippet children(args: Partial<ButtonProps>)}
		<div>
			<Button {...args}>Single Click</Button>
			<p>Button with infinite repeat submit delay prevents double-clicks.</p>
		</div>
	{/snippet}
</Story>
