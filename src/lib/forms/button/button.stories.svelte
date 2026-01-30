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
				options: ['primary', 'secondary', 'positive', 'danger', 'outline', 'ghost'],
				description: 'Visual style variant of the button',
				table: {
					type: { summary: 'ButtonVariant' },
					defaultValue: { summary: 'secondary' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl'],
				description: 'Size of the button (controls font size and padding)',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: 'md' }
				}
			},
			width: {
				control: 'select',
				options: ['auto', 'sm', 'md', 'lg', 'xl', 'full'],
				description: 'Width of the button (auto=content-based, xs-xl=fixed widths, full=100%)',
				table: {
					type: { summary: 'ComponentWidth' },
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
				description: 'Display as block (full width) - DEPRECATED: use width="full" instead',
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
			},
			icon: {
				control: 'select',
				options: [
					undefined,
					'check',
					'plus',
					'minus',
					'trash',
					'edit',
					'download',
					'upload',
					'search',
					'heart',
					'star',
					'home',
					'user',
					'settings'
				],
				description: 'Icon to display in the button',
				table: {
					type: { summary: 'IconType' }
				}
			},
			iconAlign: {
				control: 'select',
				options: ['left', 'right', 'above', 'below'],
				description: 'Alignment of the icon relative to text',
				table: {
					type: { summary: "'left' | 'right' | 'above' | 'below'" },
					defaultValue: { summary: 'left' }
				}
			},
			iconSize: {
				control: 'select',
				options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the icon (default=size of button)',
				table: {
					type: { summary: "'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
					defaultValue: { summary: 'default' }
				}
			}
		},
		args: {
			onClick: fn(),
			variant: 'secondary',
			size: 'md',
			width: 'md',
			iconAlign: 'left'
		}
	});
</script>

<Story name="Primary" args={{ variant: 'primary' }}>Click Me</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>Click Me</Story>

<Story name="Danger" args={{ variant: 'danger' }}>Delete</Story>

<Story name="Positive" args={{ variant: 'positive' }}>Save</Story>

<Story name="Outline" args={{ variant: 'outline' }}>Cancel</Story>

<Story name="Ghost" args={{ variant: 'ghost' }}>Ghost Button</Story>

<Story name="Disabled" args={{ variant: 'primary', disabled: true }}>Disabled</Story>

<Story name="Block" args={{ variant: 'primary', width: 'full' }}>Full Width Button</Story>

<Story name="Loading" args={{ variant: 'primary', loading: true }}>Loading Button</Story>

<Story name="SingleClick" args={{ variant: 'primary', repeatSubmitDelay: 'infinite' }}>
	Single Click
</Story>

<Story name="WithIconLeft" args={{ variant: 'primary', icon: 'plus', iconAlign: 'left' }}>
	Add Item
</Story>

<Story
	name="WithIconRight"
	args={{ variant: 'secondary', icon: 'arrow-right', iconAlign: 'right' }}
>
	Next
</Story>

<Story name="WithIconAbove" args={{ variant: 'positive', icon: 'check', iconAlign: 'above' }}>
	Complete
</Story>

<Story name="WithIconBelow" args={{ variant: 'danger', icon: 'trash', iconAlign: 'below' }}>
	Delete
</Story>

<Story name="IconOnly" args={{ variant: 'outline', icon: 'search', ariaLabel: 'Search' }}>
	{' '}
</Story>
