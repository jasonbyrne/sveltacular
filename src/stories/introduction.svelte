<script lang="ts">
	import {
		Paragraph,
		Text,
		Link,
		Card,
		CardContainer,
		CodeBlock,
		List,
		ListItem,
		Section
	} from '$lib';
</script>

<div class="introduction-container">
	<Section title="Welcome to Sveltacular" align="center" size="lg">
		<Image src="assets/sveltacular.png" alt="Sveltacular Logo" align="center" />
		<Paragraph size="lg">
			Sveltacular is a comprehensive TypeScript and SASS based component library for Svelte 5, with
			<strong> zero runtime dependencies</strong>.
		</Paragraph>
	</Section>

	<Section title="Why Sveltacular?" size="lg">
		<Paragraph>
			Why did I create it when there are other options? Well, mainly because the best options out
			there were based on Tailwind. And, no disrespect to those who love it, but I didn't want to
			use Tailwind. So since I didn't find what I was looking for, I made my own.
		</Paragraph>
	</Section>

	<Section title="Key Features" size="full">
		<CardContainer spacing="compact">
			<Card title="🎨 100+ Components" size="md">
				<Paragraph>
					Comprehensive component library covering forms, navigation, modals, tables, and more.
					Everything you need to build modern web applications.
				</Paragraph>
			</Card>
			<Card title="📦 Zero Dependencies" size="md">
				<Paragraph>
					Built with pure Svelte 5, TypeScript, and SASS. No runtime dependencies means faster
					builds and smaller bundle sizes.
				</Paragraph>
			</Card>
			<Card title="♿ Fully Accessible" size="md">
				<Paragraph>
					WCAG 2.1 AA compliant with ARIA support and keyboard navigation. Every component is built
					with accessibility in mind.
				</Paragraph>
			</Card>
			<Card title="⚡ Svelte 5 Native" size="md">
				<Paragraph>
					Uses modern runes ($state, $derived, $props) throughout. Built for the latest version of
					Svelte.
				</Paragraph>
			</Card>
			<Card title="🔒 TypeScript" size="md">
				<Paragraph>
					Full type safety with comprehensive type definitions. Catch errors at compile time, not
					runtime.
				</Paragraph>
			</Card>
			<Card title="🎨 Themable" size="md">
				<Paragraph>
					CSS custom properties for easy customization. Override variables to match your brand.
				</Paragraph>
			</Card>
			<Card title="✅ Well Tested" size="md">
				<Paragraph>
					Unit tests, E2E tests, and comprehensive test utilities. Confidence in every component.
				</Paragraph>
			</Card>
			<Card title="📚 Storybook" size="md">
				<Paragraph>
					Interactive documentation for all components. Explore components and their props right
					here.
				</Paragraph>
			</Card>
		</CardContainer>
	</Section>

	<Section title="Quick Start" size="lg">
		<CardContainer spacing="compact">
			<Card title="Installation" size="full">
				<CodeBlock lang="bash">npm i sveltacular</CodeBlock>
			</Card>
			<Card title="Import Styles" size="full">
				<Paragraph>
					<strong>For SvelteKit</strong>, add this to <code>src/routes/+layout.svelte</code>:
				</Paragraph>
				<CodeBlock lang="svelte"
					>{`<script lang="ts">
	import 'sveltacular/styles.css';
</script>

<slot />`}</CodeBlock
				>
				<Paragraph>
					<strong>For regular Svelte</strong>, add it to your main <code>App.svelte</code>:
				</Paragraph>
				<CodeBlock lang="svelte"
					>{`<script lang="ts">
	import 'sveltacular/styles.css';
</script>`}</CodeBlock
				>
			</Card>
			<Card title="Use Components" size="full">
				<CodeBlock lang="svelte"
					>{`<script lang="ts">
	import { Button } from 'sveltacular';
</script>

<Button variant="primary" label="Hello World" />`}</CodeBlock
				>
			</Card>
		</CardContainer>
	</Section>

	<Section title="Component Categories" size="full">
		<CardContainer spacing="compact">
			<Card title="Forms" size="md">
				<Paragraph>
					Complete form components including buttons, inputs, selects, checkboxes, radio buttons,
					date pickers, file uploads, and more. All with validation and accessibility built-in.
				</Paragraph>
			</Card>
			<Card title="Generic Components" size="md">
				<Paragraph>
					Reusable UI components like cards, badges, avatars, tooltips, popovers, spinners, ratings,
					and more.
				</Paragraph>
			</Card>
			<Card title="Navigation" size="md">
				<Paragraph>
					Navigation components including app bars, sidebars, breadcrumbs, tabs, accordions,
					wizards, pagination, drawers, command palettes, and context menus.
				</Paragraph>
			</Card>
			<Card title="Modals" size="md">
				<Paragraph>
					Modal dialogs including alerts, confirms, prompts, and custom dialog windows with focus
					management.
				</Paragraph>
			</Card>
			<Card title="Tables" size="md">
				<Paragraph>
					Table components with headers, bodies, footers, and an advanced data grid with sorting and
					formatting.
				</Paragraph>
			</Card>
			<Card title="Typography" size="md">
				<Paragraph>
					Typography components for headings, subtitles, text, paragraphs, and code blocks.
				</Paragraph>
			</Card>
			<Card title="Layout" size="md">
				<Paragraph>Flexbox and grid layout components for responsive designs.</Paragraph>
			</Card>
			<Card title="Placeholders" size="md">
				<Paragraph>Loading states, progress indicators, and skeleton loaders.</Paragraph>
			</Card>
		</CardContainer>
	</Section>

	<Section title="Resources" size="lg">
		<List type="unordered" variant="disc">
			<ListItem>
				<Link
					href="https://github.com/jasonbyrne/sveltacular"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub Repository
				</Link>
				<Text>- Source code and issues</Text>
			</ListItem>
			<ListItem>
				<Link
					href="https://www.npmjs.com/package/sveltacular"
					target="_blank"
					rel="noopener noreferrer"
				>
					NPM Package
				</Link>
				<Text>- Install from npm</Text>
			</ListItem>
		</List>
	</Section>

	<Section title="Getting Started" size="lg">
		<Paragraph>
			Browse the component stories in the sidebar to explore all available components. Each
			component includes:
		</Paragraph>
		<List type="unordered" variant="disc">
			<ListItem>Interactive examples</ListItem>
			<ListItem>Prop documentation</ListItem>
			<ListItem>Usage guidelines</ListItem>
			<ListItem>Accessibility notes</ListItem>
		</List>
		<Paragraph>
			Start by exploring the <strong>Forms</strong> category to see form components, or check out
			<strong>Generic</strong> for reusable UI components.
		</Paragraph>
	</Section>
</div>

<style>
	.introduction-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	:global(.introduction-container .image.center) {
		max-width: 300px;
		width: auto;
		height: auto;
		margin-bottom: 1.5rem;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	:global(code) {
		background: var(--base-color-bg-secondary, #f5f5f5);
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-family: var(--base-mono-font-family, monospace);
		font-size: 0.9em;
	}
</style>
