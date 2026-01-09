<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Main from './main.svelte';
	import Section from '$src/lib/generic/section/section.svelte';
	import Header from '$src/lib/generic/header/header.svelte';
	import Paragraph from '$src/lib/typography/paragraph.svelte';
	import Headline from '$src/lib/typography/headline.svelte';
	import Card from '$src/lib/generic/card/card.svelte';
	import CardContainer from '$src/lib/generic/card/card-container.svelte';

	/**
	 * Main component for wrapping primary site content.
	 *
	 * **Accessibility**: Uses semantic `<main>` element for proper document structure.
	 * The component centers content horizontally and constrains width for optimal readability.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Main>
	 *   <Section title="Page Content">
	 *     <Paragraph>Your content goes here</Paragraph>
	 *   </Section>
	 * </Main>
	 * ```
	 *
	 * **Layout Behavior**:
	 * - Centers content horizontally with automatic margins
	 * - Constrains max-width: 1000px on desktop, 1440px on large screens (≥1280px)
	 * - Responsive padding: 1rem on mobile, 2rem on tablets and up
	 * - Content flows naturally from top to bottom
	 */
	const { Story } = defineMeta({
		component: Main,
		title: 'Layout/Main',
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<Main>
		<Section title="Welcome to the Main Component">
			<Paragraph>
				This component serves as the primary content wrapper for your site. It centers content
				horizontally and constrains it to a readable width. Notice how the content is centered
				on the page with comfortable margins on either side.
			</Paragraph>
			<Paragraph>
				The max-width is set to 1000px on desktop screens, which provides excellent readability
				while maintaining a modern, focused layout. On larger screens (1280px and up), the
				max-width increases to 1440px to better utilize available space.
			</Paragraph>
		</Section>
	</Main>
</Story>

<Story name="WithMultipleSections">
	<Main>
		<Section title="Introduction" size="full">
			<Header title="Getting Started" level={2} />
			<Paragraph>
				The Main component is designed to wrap your primary content areas. It automatically
				centers everything and provides responsive padding that adapts to screen size.
			</Paragraph>
		</Section>

		<Section title="Features" size="full">
			<Header title="Key Benefits" level={2} />
			<Paragraph>
				This layout component ensures your content doesn't stretch too wide on large screens,
				maintaining optimal readability. The width constraint helps guide the user's eye and
				creates a more focused reading experience.
			</Paragraph>
		</Section>

		<Section title="Responsive Design" size="full">
			<Header title="Adaptive Layout" level={2} />
			<Paragraph>
				The component uses responsive breakpoints to adjust both padding and max-width based on
				screen size. On mobile devices, you get compact 1rem padding, while tablets and
				desktops enjoy more spacious 2rem padding.
			</Paragraph>
		</Section>
	</Main>
</Story>

<Story name="WithCards">
	<Main>
		<Section title="Content Gallery" size="full">
			<CardContainer spacing="compact">
				<Card title="Card One" size="md">
					<Paragraph>
						This card demonstrates how content within the Main component maintains proper
						constraints and centering.
					</Paragraph>
				</Card>
				<Card title="Card Two" size="md">
					<Paragraph>
						Multiple cards align nicely within the centered container, creating a cohesive
						layout experience.
					</Paragraph>
				</Card>
				<Card title="Card Three" size="md">
					<Paragraph>
						The Main component ensures all child content respects the width constraints and
						centering behavior.
					</Paragraph>
				</Card>
			</CardContainer>
		</Section>
	</Main>
</Story>

<Story name="WideContent">
	<Main>
		<Section title="Width Demonstration" size="full">
			<Header title="Observe the Width Constraint" level={2} />
			<Paragraph>
				This story demonstrates how the Main component constrains content width. Notice that
				even on very wide screens, this content doesn't stretch edge-to-edge. The component
				automatically centers the content and maintains a maximum width for optimal
				readability.
			</Paragraph>
			<Paragraph>
				You can verify this by resizing your browser window. On smaller screens, the content
				will use most of the available width (minus padding). On larger screens, you'll see
				comfortable margins on both sides as the content is constrained to the max-width.
			</Paragraph>
			<div
				style="background: var(--gray-100, #edf2f7); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;"
			>
				<Paragraph>
					This highlighted box shows the actual content area width. Notice how it's centered
					and doesn't extend to the full browser width on large screens.
				</Paragraph>
			</div>
		</Section>
	</Main>
</Story>

<Story name="LongContent">
	<Main>
		<Section title="Scrollable Content" size="full">
			<Header title="Content That Scrolls" level={2} />
			<Paragraph>
				The Main component allows content to flow naturally and scroll as needed. It doesn't
				force a specific height, so your content determines the vertical space required.
			</Paragraph>
			{#each Array(10) as _, i}
				<Paragraph>
					This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
					veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu fugiat nulla pariatur.
				</Paragraph>
			{/each}
		</Section>
	</Main>
</Story>
