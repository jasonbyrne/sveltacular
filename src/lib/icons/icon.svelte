<script lang="ts">
	import type { IconType } from './types.js';
	import { getIconData } from './icon-data.js';

	let {
		type,
		src,
		mask = true,
		fill,
		size = 'md',
		variant = 'primary',
		class: className = ''
	}: {
		type?: IconType;
		src?: string;
		mask?: boolean;
		fill?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		variant?: 'primary' | 'secondary';
		class?: string;
	} = $props();

	// Size mappings in pixels
	const sizeMap = {
		xs: '12px',
		sm: '16px',
		md: '20px',
		lg: '24px',
		xl: '32px'
	} as const;

	const iconSize = $derived(sizeMap[size]);

	// Determine which icon source to use (src takes precedence over type)
	const iconSource = $derived(src ? src : type ? getIconData(type) : null);

	// Get the fill color - use prop if provided, otherwise theme color
	const fillColor = $derived(fill || 'var(--base-color-fg)');

	// Convert SVG icon data to data URI for mask mode
	function svgToDataUri(iconData: ReturnType<typeof getIconData>): string {
		const paths = iconData.paths
			.map((path) => {
				const attrs = Object.entries(path)
					.map(([key, value]) => {
						// Convert camelCase to kebab-case for SVG attributes
						const attrName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
						return `${attrName}="${value}"`;
					})
					.join(' ');
				return `<path ${attrs} />`;
			})
			.join('');

		const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${iconData.viewBox}" fill="${iconData.fill}">${paths}</svg>`;
		return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
	}

	// Generate SVG markup for non-mask mode
	function renderSvg(iconData: ReturnType<typeof getIconData>): string {
		const paths = iconData.paths
			.map((path) => {
				const attrs = Object.entries(path)
					.map(([key, value]) => {
						const attrName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
						// Apply custom fill if provided, otherwise use path's own fill/stroke
						if (fill && (key === 'fill' || key === 'stroke')) {
							return `${attrName}="${fill}"`;
						}
						return `${attrName}="${value}"`;
					})
					.join(' ');
				return `<path ${attrs} />`;
			})
			.join('');

		const svgFill = fill || iconData.fill;
		return `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="${iconData.viewBox}" fill="${svgFill}">${paths}</svg>`;
	}

	const maskUrl = $derived(
		iconSource && typeof iconSource === 'object'
			? svgToDataUri(iconSource)
			: typeof iconSource === 'string'
				? iconSource
				: null
	);

	// Helper to safely get SVG HTML
	const svgHtml = $derived(
		iconSource && typeof iconSource === 'object' ? renderSvg(iconSource) : ''
	);
</script>

{#if iconSource}
	{#if mask}
		<!-- Mask mode: Use CSS mask with background color -->
		<span
			class="icon icon--masked {className} {variant}"
			style="--icon-size: {iconSize}; --icon-mask-url: url('{maskUrl}'); --icon-fill: {fillColor};"
			aria-hidden="true"
		></span>
	{:else if typeof iconSource === 'object'}
		<!-- Non-mask mode: Render SVG directly -->
		<span
			class="icon icon--svg {className} {variant}"
			style="--icon-size: {iconSize};"
			aria-hidden="true"
		>
			{@html svgHtml}
		</span>
	{:else if typeof iconSource === 'string'}
		<!-- Non-mask mode: External image -->
		<img
			src={iconSource}
			alt=""
			class="icon icon--image {className} {variant}"
			style="width: {iconSize}; height: {iconSize};"
			aria-hidden="true"
		/>
	{/if}
{/if}

<style lang="scss">
	.icon {
		display: inline-block;
		flex-shrink: 0;

		&--masked {
			width: var(--icon-size);
			height: var(--icon-size);
			background-color: var(--icon-fill);
			-webkit-mask-size: contain;
			-webkit-mask-image: var(--icon-mask-url);
			-webkit-mask-repeat: no-repeat;
			-webkit-mask-position: center;
			-moz-mask-size: contain;
			-moz-mask-image: var(--icon-mask-url);
			-moz-mask-repeat: no-repeat;
			-moz-mask-position: center;
			-ms-mask-size: contain;
			-ms-mask-image: var(--icon-mask-url);
			-ms-mask-repeat: no-repeat;
			-ms-mask-position: center;
			mask-size: contain;
			mask-image: var(--icon-mask-url);
			mask-repeat: no-repeat;
			mask-position: center;
		}

		&--svg {
			width: var(--icon-size);
			height: var(--icon-size);
			line-height: 0;

			:global(svg) {
				width: 100%;
				height: 100%;
				display: block;
			}
		}

		&--image {
			object-fit: contain;
		}

		&.secondary {
			opacity: 0.5;
		}
	}
</style>
