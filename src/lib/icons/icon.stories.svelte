<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from './icon.svelte';

	const iconTypes = [
		'angle-right',
		'angle-up',
		'angle-left',
		'angle-down',
		'arrow-left',
		'arrow-right',
		'check',
		'clipboard',
		'close',
		'copy',
		'download',
		'edit',
		'envelope',
		'envelope-full',
		'export',
		'eye',
		'folder-open',
		'hamburger',
		'heart',
		'heart-full',
		'home',
		'home-full',
		'import',
		'info',
		'link',
		'minus',
		'mobile-phone',
		'phone',
		'plus',
		'print',
		'search',
		'settings',
		'star',
		'star-full',
		'trash',
		'upload',
		'user',
		'warning'
	];

	/**
	 * Unified Icon component for displaying SVG icons and external images.
	 *
	 * **Accessibility**: Icons use `aria-hidden="true"` by default as they are typically decorative.
	 * If an icon conveys meaningful information without accompanying text, consider adding an `aria-label`
	 * to the parent element.
	 *
	 * **Usage**:
	 * ```svelte
	 * <!-- Built-in icon type -->
	 * <Icon type="home" size="md" />
	 *
	 * <!-- External image with mask (default) -->
	 * <Icon src="/path/to/icon.svg" />
	 *
	 * <!-- Custom fill color -->
	 * <Icon type="check" fill="#00ff00" />
	 *
	 * <!-- Non-mask mode for colored icons -->
	 * <Icon type="home" mask={false} />
	 * ```
	 */
	const { Story } = defineMeta({
		component: Icon,
		title: 'Icons/Icon',
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: 'select',
				options: iconTypes,
				description: 'Type-safe icon type for built-in SVG icons',
				table: {
					type: { summary: 'IconType' },
					defaultValue: { summary: 'undefined' }
				}
			},
			src: {
				control: 'text',
				description: 'URL to external icon/image (overrides type if both provided)',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'undefined' }
				}
			},
			mask: {
				control: 'boolean',
				description: 'Use CSS mask mode (uses theme foreground color by default)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' }
				}
			},
			variant: {
				control: 'select',
				options: ['primary', 'secondary'],
				description: 'Icon variant',
				table: {
					type: { summary: 'IconVariant' },
					defaultValue: { summary: 'primary' }
				}
			},
			fill: {
				control: 'color',
				description: 'Custom fill color (overrides theme color when mask is true)',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'var(--base-color-fg)' }
				}
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Icon size bucket',
				table: {
					type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
					defaultValue: { summary: "'md'" }
				}
			},
			class: {
				control: 'text',
				description: 'Additional CSS classes',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "''" }
				}
			}
		},
		args: {
			type: 'home',
			mask: true,
			size: 'md'
		}
	});
</script>

<Story name="Default" args={{ type: 'home' }}>
	Default icon with type="home" using mask mode (default) and medium size.
</Story>

<Story name="Sizes">
	<div style="display: flex; align-items: center; gap: 2rem; padding: 2rem;">
		<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
			<Icon type="home" size="xs" />
			<span style="font-size: 0.75rem;">xs (12px)</span>
		</div>
		<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
			<Icon type="home" size="sm" />
			<span style="font-size: 0.75rem;">sm (16px)</span>
		</div>
		<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
			<Icon type="home" size="md" />
			<span style="font-size: 0.75rem;">md (20px)</span>
		</div>
		<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
			<Icon type="home" size="lg" />
			<span style="font-size: 0.75rem;">lg (24px)</span>
		</div>
		<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
			<Icon type="home" size="xl" />
			<span style="font-size: 0.75rem;">xl (32px)</span>
		</div>
	</div>
</Story>

<Story name="MaskMode" args={{ mask: true }}>
	<div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;">
		<Icon type="check" size="lg" mask={true} />
		<Icon type="home" size="lg" mask={true} />
		<Icon type="phone" size="lg" mask={true} />
		<Icon type="envelope" size="lg" mask={true} />
	</div>
	Icons in mask mode (default) use the theme foreground color, adapting automatically to light/dark themes.
</Story>

<Story name="NonMaskMode" args={{ mask: false }}>
	<div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;">
		<Icon type="check" size="lg" mask={false} />
		<Icon type="home" size="lg" mask={false} />
		<Icon type="phone" size="lg" mask={false} />
		<Icon type="envelope" size="lg" mask={false} />
	</div>
	Icons in non-mask mode render SVG directly with currentColor, allowing for more complex styling.
</Story>

<Story name="CustomFill">
	<div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;">
		<Icon type="check" size="lg" fill="#48bb78" />
		<Icon type="home" size="lg" fill="#4299e1" />
		<Icon type="phone" size="lg" fill="#ed8936" />
		<Icon type="envelope" size="lg" fill="#f56565" />
	</div>
	Icons with custom fill colors override the theme color in mask mode.
</Story>

<Story name="ExternalImage">
	<div style="padding: 2rem;">
		<Icon src="/icons/envelope.svg" size="lg" />
		<p style="margin-top: 1rem; color: var(--gray-600);">
			External image via src prop. Use a relative path or full URL.
		</p>
	</div>
</Story>

<Story name="ExternalImageMasked" args={{ src: '/icons/envelope.svg', mask: true }}>
	<div style="padding: 2rem;">
		<Icon src="/icons/envelope.svg" size="lg" mask={true} />
		<p style="margin-top: 1rem; color: var(--gray-600);">
			External image with mask mode enabled (default). Uses theme foreground color.
		</p>
	</div>
</Story>

<Story name="ExternalImageNonMasked" args={{ src: '/icons/envelope.svg', mask: false }}>
	<div style="padding: 2rem;">
		<Icon src="/icons/envelope.svg" size="lg" mask={false} />
		<p style="margin-top: 1rem; color: var(--gray-600);">
			External image without mask mode. Renders as a standard img tag.
		</p>
	</div>
</Story>

<Story name="ThemeAdaptation">
	<div style="padding: 2rem;">
		<p style="margin-bottom: 1rem;">Icons automatically adapt to theme colors:</p>
		<div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
			<Icon type="home" size="lg" />
			<Icon type="check" size="lg" />
			<Icon type="phone" size="lg" />
			<Icon type="envelope" size="lg" />
		</div>
		<p style="color: var(--gray-600); font-size: 0.875rem;">
			In mask mode, icons use var(--base-color-fg) which changes based on the active theme. Toggle
			dark mode in Storybook to see the adaptation.
		</p>
	</div>
</Story>

<Story name="WithText">
	<div style="padding: 2rem;">
		<div style="display: flex; flex-direction: column; gap: 1rem;">
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<Icon type="home" size="sm" />
				<span>Home</span>
			</div>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<Icon type="phone" size="sm" />
				<span>Phone</span>
			</div>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<Icon type="envelope" size="sm" />
				<span>Email</span>
			</div>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<Icon type="check" size="sm" />
				<span>Success</span>
			</div>
		</div>
	</div>
</Story>

<Story name="ButtonIcons">
	<div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
		<button
			type="button"
			style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: var(--base-color-bg); cursor: pointer;"
		>
			<Icon type="home" size="sm" />
			<span>Home</span>
		</button>
		<button
			type="button"
			style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: var(--base-color-bg); cursor: pointer;"
		>
			<Icon type="phone" size="sm" />
			<span>Call</span>
		</button>
		<button
			type="button"
			style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: var(--base-color-bg); cursor: pointer;"
		>
			<Icon type="upload" size="sm" />
			<span>Upload</span>
		</button>
	</div>
</Story>

<Story name="SizeComparison">
	<div style="padding: 2rem;">
		<div style="display: flex; flex-direction: column; gap: 2rem;">
			<div style="display: flex; align-items: center; gap: 1rem;">
				<Icon type="home" size="xs" />
				<span>Extra Small (xs) - 12px</span>
			</div>
			<div style="display: flex; align-items: center; gap: 1rem;">
				<Icon type="home" size="sm" />
				<span>Small (sm) - 16px</span>
			</div>
			<div style="display: flex; align-items: center; gap: 1rem;">
				<Icon type="home" size="md" />
				<span>Medium (md) - 20px - Default</span>
			</div>
			<div style="display: flex; align-items: center; gap: 1rem;">
				<Icon type="home" size="lg" />
				<span>Large (lg) - 24px</span>
			</div>
			<div style="display: flex; align-items: center; gap: 1rem;">
				<Icon type="home" size="xl" />
				<span>Extra Large (xl) - 32px</span>
			</div>
		</div>
	</div>
</Story>
