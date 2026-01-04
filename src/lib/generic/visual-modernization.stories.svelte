<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	/**
	 * Visual Modernization - Modern UI enhancements for Sveltacular
	 * 
	 * This story showcases the modern visual enhancements added to Sveltacular, including:
	 * 
	 * - **Layered Shadows**: Multiple shadow layers for depth and realism
	 * - **Glassmorphism**: Frosted glass effects with backdrop-filter
	 * - **Enhanced Focus Rings**: Modern offset focus-visible styles
	 * - **Shimmer Animations**: Smooth shimmer effects for skeleton loaders
	 * - **Enhanced Empty States**: Better styling and visual hierarchy
	 * 
	 * All enhancements respect `prefers-reduced-motion` and include fallbacks for older browsers.
	 * 
	 * ## Features
	 * 
	 * ### Layered Shadows
	 * Cards and elevated elements now use multiple shadow layers (`--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-2xl`) 
	 * that create more realistic depth.
	 * 
	 * ### Glassmorphism
	 * Modal dialogs and overlays can use frosted glass effects with the `glass` and `blur` props. 
	 * This creates a modern, Apple-inspired aesthetic.
	 * 
	 * ### Focus Rings
	 * All interactive elements now have consistent, offset focus rings that are visible but unobtrusive, 
	 * similar to GitHub and Linear.
	 * 
	 * ### Shimmer Animations
	 * Skeleton loaders now support a smooth shimmer animation that looks more polished than simple pulsing.
	 * 
	 * ## Accessibility
	 * 
	 * - All animations respect `prefers-reduced-motion`
	 * - Focus rings are always visible for keyboard navigation
	 * - Glassmorphism includes fallbacks for older browsers
	 * - Color contrast meets WCAG AA standards in both light and dark modes
	 */
	const { Story } = defineMeta({
		title: 'Design System/Visual Modernization',
		tags: ['autodocs']
	});
</script>

<script>
	import Card from './card/card.svelte';
	import CardContainer from './card/card-container.svelte';
	import Modal from '../modals/modal.svelte';
	import Button from '../forms/button/button.svelte';
	import Empty from './empty/empty.svelte';
	import SkeletonText from '../placeholders/skeleton-text.svelte';
	import SkeletonInput from '../placeholders/skeleton-input.svelte';
	import SkeletonParagraph from '../placeholders/skeleton-paragraph.svelte';
	import Panel from './panel/panel.svelte';

	let standardModalOpen = $state(false);
	let glassModalOpen = $state(false);
	let blurModalOpen = $state(false);
</script>

<Story name="LayeredShadows">
	<div style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Layered Shadows</h3>
		<p style="margin-bottom: 1.5rem; color: var(--gray-600);">
			Cards now use multiple shadow layers for more realistic depth. Hover over clickable cards to see
			the shadow elevation change.
		</p>

		<CardContainer>
			<Card title="Standard Card" size="sm">
				<p>This card uses layered shadows (--shadow-md) for a subtle 3D effect.</p>
			</Card>
			<Card title="Hover Me" href="#" size="sm">
				<p>Hover over this clickable card to see the shadow elevate to --shadow-xl.</p>
			</Card>
			<Card title="Another Card" size="sm">
				<p>Multiple shadow layers create more realistic depth than single shadows.</p>
			</Card>
		</CardContainer>
	</div>
</Story>

<Story name="Glassmorphism">
	<div style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Glassmorphism Effects</h3>
		<p style="margin-bottom: 1.5rem; color: var(--gray-600);">
			Modal dialogs can use frosted glass effects with the <code>glass</code> and <code>blur</code> props.
			The overlay can also blur the background content.
		</p>

		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Button onClick={() => (standardModalOpen = true)}>Open Standard Modal</Button>
			<Button onClick={() => (glassModalOpen = true)} variant="secondary"
				>Open Glass Modal</Button
			>
			<Button onClick={() => (blurModalOpen = true)} variant="positive"
				>Open Modal with Blur</Button
			>
		</div>

		<Modal bind:open={standardModalOpen}>
			<h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Standard Modal</h3>
			<p style="margin-bottom: 1rem;">This is a standard modal without glassmorphism effects.</p>
			<p style="color: var(--gray-600);">It uses the --shadow-2xl for depth.</p>
		</Modal>

		<Modal bind:open={glassModalOpen} glass={true}>
			<h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Glass Modal</h3>
			<p style="margin-bottom: 1rem;">This modal uses glassmorphism with backdrop-filter: blur().</p>
			<p style="color: var(--gray-600);">Notice the frosted glass effect on the modal background.</p>
		</Modal>

		<Modal bind:open={blurModalOpen} blur={true} glass={true}>
			<h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Glass + Blur Modal</h3>
			<p style="margin-bottom: 1rem;">
				This modal uses both glass effect and background blur for maximum modern aesthetics.
			</p>
			<p style="color: var(--gray-600);">The overlay blurs the content behind it.</p>
		</Modal>
	</div>
</Story>

<Story name="ShimmerAnimations">
	<div style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Shimmer Animations</h3>
		<p style="margin-bottom: 1.5rem; color: var(--gray-600);">
			Skeleton loaders now support a smooth shimmer animation that looks more polished than simple
			pulsing. Shimmer is now the default animation.
		</p>

		<Panel title="Loading Content">
			<div style="margin-bottom: 2rem;">
				<h4 style="margin-bottom: 0.5rem; font-size: 1rem; font-weight: 600;">Shimmer Animation</h4>
				<SkeletonParagraph animation="shimmer" />
				<SkeletonInput animation="shimmer" />
			</div>

			<div style="margin-bottom: 2rem;">
				<h4 style="margin-bottom: 0.5rem; font-size: 1rem; font-weight: 600;">
					Pulse Animation (Classic)
				</h4>
				<SkeletonParagraph animation="pulse" />
				<SkeletonInput animation="pulse" />
			</div>

			<div>
				<h4 style="margin-bottom: 0.5rem; font-size: 1rem; font-weight: 600;">Individual Lines</h4>
				<SkeletonText animation="shimmer" minWidth={60} maxWidth={90} />
				<SkeletonText animation="shimmer" minWidth={70} maxWidth={95} />
				<SkeletonText animation="shimmer" minWidth={40} maxWidth={70} />
			</div>
		</Panel>
	</div>
</Story>

<Story name="EmptyStates">
	<div style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Enhanced Empty States</h3>
		<p style="margin-bottom: 1.5rem; color: var(--gray-600);">
			Empty state components now have better styling with improved color hierarchy and spacing.
		</p>

		<Panel>
			<Empty text="No items found" size="md">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
					/>
				</svg>
			</Empty>
		</Panel>

		<div style="margin-top: 1.5rem;">
			<Panel>
				<Empty text="Start by creating your first project" size="lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</Empty>
			</Panel>
		</div>
	</div>
</Story>

<Story name="FocusRings">
	<div style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">
			Modern Focus Rings
		</h3>
		<p style="margin-bottom: 1.5rem; color: var(--gray-600);">
			All interactive elements now have consistent, offset focus rings. Tab through these elements to
			see the focus rings. They only appear on keyboard focus (:focus-visible), not mouse clicks.
		</p>

		<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
			<Button>Focus Me</Button>
			<Button variant="secondary">Tab Here</Button>
			<Button variant="positive">And Here</Button>
			<button
				type="button"
				style="background: none; border: none; padding: 0; color: var(--base-link-fg); text-decoration: underline; cursor: pointer; font: inherit;"
				onclick={() => {}}
			>
				Or This Link
			</button>
			<input
				type="text"
				placeholder="Or this input"
				style="padding: 0.5rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md);"
			/>
		</div>
	</div>
</Story>

<Story name="DesignTokens">
	<div style="margin-bottom: 2rem;">
		<h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Design Tokens</h3>
		<p style="margin-bottom: 1.5rem; color: var(--gray-600);">
			New design tokens added to theme.scss for visual modernization:
		</p>

		<Panel>
			<div style="font-family: var(--base-mono-font-family); font-size: 0.875rem;">
				<h4 style="margin-bottom: 0.5rem; font-weight: 600;">Shadow Scale</h4>
				<ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">
					<li style="margin-bottom: 0.25rem;">
						<code>--shadow-sm</code>: Subtle shadow for hover states
					</li>
					<li style="margin-bottom: 0.25rem;">
						<code>--shadow-md</code>: Default card shadow (layered)
					</li>
					<li style="margin-bottom: 0.25rem;">
						<code>--shadow-lg</code>: Elevated elements (layered)
					</li>
					<li style="margin-bottom: 0.25rem;">
						<code>--shadow-xl</code>: Popovers and modals (layered)
					</li>
					<li style="margin-bottom: 0.25rem;">
						<code>--shadow-2xl</code>: Maximum elevation (layered)
					</li>
				</ul>

				<h4 style="margin-bottom: 0.5rem; font-weight: 600;">Focus Ring</h4>
				<ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">
					<li style="margin-bottom: 0.25rem;">
						<code>--focus-ring-color</code>: Ring color (default: info blue)
					</li>
					<li style="margin-bottom: 0.25rem;"><code>--focus-ring-width</code>: Ring thickness</li>
					<li style="margin-bottom: 0.25rem;"><code>--focus-ring-offset</code>: Space from element</li>
					<li style="margin-bottom: 0.25rem;">
						<code>--focus-ring</code>: Complete box-shadow value
					</li>
				</ul>

				<h4 style="margin-bottom: 0.5rem; font-weight: 600;">Glassmorphism</h4>
				<ul style="list-style: none; padding: 0;">
					<li style="margin-bottom: 0.25rem;">
						<code>--glass-bg</code>: Semi-transparent background
					</li>
					<li style="margin-bottom: 0.25rem;">
						<code>--glass-border</code>: Subtle border color
					</li>
					<li style="margin-bottom: 0.25rem;"><code>--glass-blur</code>: Blur intensity</li>
				</ul>
			</div>
		</Panel>
	</div>
</Story>

<style>
	code {
		background-color: var(--gray-200);
		padding: 0.125rem 0.375rem;
		border-radius: var(--radius-sm);
		font-size: 0.875em;
	}
</style>

