<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';
	import CommandPalette from './command-palette.svelte';

	export const meta = {
		title: 'Navigation/CommandPalette',
		component: CommandPalette,
		tags: ['autodocs'],
		argTypes: {
			open: { control: 'boolean' },
			placeholder: { control: 'text' },
			showRecent: { control: 'boolean' },
			maxRecent: { control: 'number' },
			shortcut: { control: 'text' },
			shortcutModifier: {
				control: 'select',
				options: ['meta', 'ctrl', 'alt', 'shift']
			},
			enableShortcut: { control: 'boolean' },
			emptyMessage: { control: 'text' },
			blur: { control: 'boolean' }
		}
	} satisfies Meta<CommandPalette>;
</script>

<script lang="ts">
	import { Button } from '$lib/forms/button/index.js';
	import type { Command, CommandGroup } from './command-palette.svelte';

	let open = $state(false);
	let lastExecuted = $state<string>('');

	// Sample commands with different groups
	const sampleCommands: Command[] = [
		// Navigation
		{
			id: 'nav-home',
			label: 'Go to Home',
			description: 'Navigate to the home page',
			group: 'navigation',
			keywords: ['home', 'dashboard', 'main'],
			action: () => {
				lastExecuted = 'Navigated to Home';
				console.log('Navigate to home');
			}
		},
		{
			id: 'nav-settings',
			label: 'Go to Settings',
			description: 'Open settings page',
			group: 'navigation',
			keywords: ['settings', 'preferences', 'config'],
			action: () => {
				lastExecuted = 'Opened Settings';
				console.log('Navigate to settings');
			}
		},
		{
			id: 'nav-profile',
			label: 'Go to Profile',
			description: 'View your profile',
			group: 'navigation',
			keywords: ['profile', 'account', 'user'],
			action: () => {
				lastExecuted = 'Opened Profile';
				console.log('Navigate to profile');
			}
		},

		// Actions
		{
			id: 'action-new',
			label: 'Create New Document',
			description: 'Create a new document',
			group: 'actions',
			keywords: ['new', 'create', 'document', 'file'],
			action: () => {
				lastExecuted = 'Created New Document';
				console.log('Create new document');
			}
		},
		{
			id: 'action-save',
			label: 'Save Document',
			description: 'Save the current document',
			group: 'actions',
			keywords: ['save', 'store', 'persist'],
			action: () => {
				lastExecuted = 'Saved Document';
				console.log('Save document');
			}
		},
		{
			id: 'action-export',
			label: 'Export as PDF',
			description: 'Export document to PDF',
			group: 'actions',
			keywords: ['export', 'pdf', 'download'],
			action: () => {
				lastExecuted = 'Exported as PDF';
				console.log('Export as PDF');
			}
		},
		{
			id: 'action-share',
			label: 'Share Document',
			description: 'Share with others',
			group: 'actions',
			keywords: ['share', 'collaborate', 'invite'],
			action: () => {
				lastExecuted = 'Shared Document';
				console.log('Share document');
			}
		},

		// Appearance
		{
			id: 'theme-light',
			label: 'Switch to Light Theme',
			description: 'Change appearance to light mode',
			group: 'appearance',
			keywords: ['theme', 'light', 'bright'],
			action: () => {
				lastExecuted = 'Switched to Light Theme';
				document.documentElement.setAttribute('data-theme', 'light');
			}
		},
		{
			id: 'theme-dark',
			label: 'Switch to Dark Theme',
			description: 'Change appearance to dark mode',
			group: 'appearance',
			keywords: ['theme', 'dark', 'night'],
			action: () => {
				lastExecuted = 'Switched to Dark Theme';
				document.documentElement.setAttribute('data-theme', 'dark');
			}
		},
		{
			id: 'appearance-zoom-in',
			label: 'Zoom In',
			description: 'Increase zoom level',
			group: 'appearance',
			keywords: ['zoom', 'in', 'bigger', 'enlarge'],
			action: () => {
				lastExecuted = 'Zoomed In';
				console.log('Zoom in');
			}
		},
		{
			id: 'appearance-zoom-out',
			label: 'Zoom Out',
			description: 'Decrease zoom level',
			group: 'appearance',
			keywords: ['zoom', 'out', 'smaller', 'reduce'],
			action: () => {
				lastExecuted = 'Zoomed Out';
				console.log('Zoom out');
			}
		},

		// Help
		{
			id: 'help-docs',
			label: 'View Documentation',
			description: 'Open documentation in new tab',
			group: 'help',
			keywords: ['help', 'docs', 'documentation', 'guide'],
			action: () => {
				lastExecuted = 'Opened Documentation';
				console.log('Open documentation');
			}
		},
		{
			id: 'help-shortcuts',
			label: 'View Keyboard Shortcuts',
			description: 'Show all keyboard shortcuts',
			group: 'help',
			keywords: ['help', 'keyboard', 'shortcuts', 'hotkeys'],
			action: () => {
				lastExecuted = 'Opened Shortcuts';
				console.log('View shortcuts');
			}
		},
		{
			id: 'help-support',
			label: 'Contact Support',
			description: 'Get help from our team',
			group: 'help',
			keywords: ['help', 'support', 'contact', 'email'],
			action: () => {
				lastExecuted = 'Opened Support';
				console.log('Contact support');
			}
		}
	];

	const commandGroups: CommandGroup[] = [
		{ id: 'navigation', label: 'Navigation', priority: 1 },
		{ id: 'actions', label: 'Actions', priority: 2 },
		{ id: 'appearance', label: 'Appearance', priority: 3 },
		{ id: 'help', label: 'Help & Support', priority: 4 }
	];
</script>

<div class="story-container">
	<h1>CommandPalette</h1>
	<p class="description">
		A keyboard-driven command interface for quick actions and navigation, inspired by modern
		applications like GitHub, Linear, and Vercel.
	</p>

	<section>
		<h2>Features</h2>
		<ul>
			<li>✅ <strong>Keyboard shortcut:</strong> ⌘K / Ctrl+K to open (customizable)</li>
			<li>✅ <strong>Fuzzy search:</strong> Smart search with character highlighting</li>
			<li>✅ <strong>Grouped commands:</strong> Organize commands by category</li>
			<li>✅ <strong>Recent commands:</strong> Automatic tracking with localStorage</li>
			<li>✅ <strong>Full keyboard navigation:</strong> Arrow keys, Home, End, Enter, Escape</li>
			<li>✅ <strong>Accessible:</strong> ARIA combobox pattern with screen reader support</li>
			<li>✅ <strong>Glassmorphism:</strong> Modern frosted glass aesthetic</li>
			<li>✅ <strong>Zero dependencies:</strong> Custom fuzzy search implementation</li>
		</ul>
	</section>

	<section>
		<h2>Basic Example</h2>
		<p>Try pressing <kbd>⌘K</kbd> (Mac) or <kbd>Ctrl+K</kbd> (Windows/Linux) to open!</p>

		<div class="example">
			<Button onclick={() => (open = true)}>Open Command Palette</Button>

			{#if lastExecuted}
				<div class="status">
					<strong>Last executed:</strong>
					{lastExecuted}
				</div>
			{/if}
		</div>

		<CommandPalette
			bind:open
			commands={sampleCommands}
			groups={commandGroups}
			onSelect={(cmd) => console.log('Selected:', cmd)}
		/>
	</section>

	<section>
		<h2>Usage</h2>

		<h3>Define Commands</h3>
		<pre><code>{`<script>
  import { CommandPalette } from 'sveltacular';
  
  const commands = [
    {
      id: 'nav-home',
      label: 'Go to Home',
      description: 'Navigate to the home page',
      group: 'navigation',
      keywords: ['home', 'dashboard'],
      action: () => {
        // Navigate to home
      }
    },
    {
      id: 'theme-dark',
      label: 'Switch to Dark Theme',
      description: 'Change appearance to dark mode',
      group: 'appearance',
      keywords: ['theme', 'dark'],
      action: () => {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
  ];
  
  const groups = [
    { id: 'navigation', label: 'Navigation', priority: 1 },
    { id: 'appearance', label: 'Appearance', priority: 2 }
  ];
  
  let open = $state(false);
</script>

<CommandPalette 
  bind:open 
  {commands} 
  {groups}
  onSelect={(cmd) => console.log('Executed:', cmd)}
/>`}</code></pre>

		<h3>With Custom Shortcut</h3>
		<pre><code>{`<CommandPalette 
  bind:open 
  {commands}
  shortcut="p"
  shortcutModifier="ctrl"
/>`}</code></pre>

		<h3>Without Recent Commands</h3>
		<pre><code>{`<CommandPalette 
  bind:open 
  {commands}
  showRecent={false}
/>`}</code></pre>
	</section>

	<section>
		<h2>Keyboard Navigation</h2>
		<table>
			<thead>
				<tr>
					<th>Key</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd></td>
					<td>Open command palette</td>
				</tr>
				<tr>
					<td><kbd>↑</kbd> / <kbd>↓</kbd></td>
					<td>Navigate commands</td>
				</tr>
				<tr>
					<td><kbd>Home</kbd> / <kbd>End</kbd></td>
					<td>Jump to first/last command</td>
				</tr>
				<tr>
					<td><kbd>Enter</kbd></td>
					<td>Execute selected command</td>
				</tr>
				<tr>
					<td><kbd>Escape</kbd></td>
					<td>Close palette</td>
				</tr>
				<tr>
					<td>Type to search</td>
					<td>Fuzzy search across commands</td>
				</tr>
			</tbody>
		</table>
	</section>

	<section>
		<h2>Search Features</h2>
		<p>The fuzzy search supports:</p>
		<ul>
			<li>✅ <strong>Character matching:</strong> Type "gtp" to find "Go to Profile"</li>
			<li>✅ <strong>Word boundaries:</strong> Matches at word starts are prioritized</li>
			<li>✅ <strong>Consecutive matches:</strong> Higher scores for consecutive characters</li>
			<li>✅ <strong>CamelCase awareness:</strong> Type "gth" to find "goToHome"</li>
			<li>✅ <strong>Keywords:</strong> Search additional keywords beyond label/description</li>
			<li>✅ <strong>Highlighting:</strong> Matched characters are highlighted in results</li>
		</ul>
	</section>

	<section>
		<h2>Props</h2>
		<table>
			<thead>
				<tr>
					<th>Prop</th>
					<th>Type</th>
					<th>Default</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>commands</code></td>
					<td><code>Command[]</code></td>
					<td><code>[]</code></td>
					<td>Array of command objects</td>
				</tr>
				<tr>
					<td><code>groups</code></td>
					<td><code>CommandGroup[]</code></td>
					<td><code>[]</code></td>
					<td>Command group definitions</td>
				</tr>
				<tr>
					<td><code>open</code></td>
					<td><code>boolean</code></td>
					<td><code>false</code></td>
					<td>Controls palette visibility (bindable)</td>
				</tr>
				<tr>
					<td><code>placeholder</code></td>
					<td><code>string</code></td>
					<td><code>"Type a command..."</code></td>
					<td>Search input placeholder</td>
				</tr>
				<tr>
					<td><code>showRecent</code></td>
					<td><code>boolean</code></td>
					<td><code>true</code></td>
					<td>Show recent commands at top</td>
				</tr>
				<tr>
					<td><code>maxRecent</code></td>
					<td><code>number</code></td>
					<td><code>5</code></td>
					<td>Maximum recent commands to track</td>
				</tr>
				<tr>
					<td><code>shortcut</code></td>
					<td><code>string</code></td>
					<td><code>"k"</code></td>
					<td>Keyboard key for shortcut</td>
				</tr>
				<tr>
					<td><code>shortcutModifier</code></td>
					<td><code>"meta" | "ctrl" | "alt" | "shift"</code></td>
					<td><code>"meta"</code></td>
					<td>Modifier key for shortcut</td>
				</tr>
				<tr>
					<td><code>enableShortcut</code></td>
					<td><code>boolean</code></td>
					<td><code>true</code></td>
					<td>Enable keyboard shortcut</td>
				</tr>
				<tr>
					<td><code>emptyMessage</code></td>
					<td><code>string</code></td>
					<td><code>"No commands found"</code></td>
					<td>Message when no results</td>
				</tr>
				<tr>
					<td><code>blur</code></td>
					<td><code>boolean</code></td>
					<td><code>true</code></td>
					<td>Blur background overlay</td>
				</tr>
				<tr>
					<td><code>onSelect</code></td>
					<td><code>(cmd: Command) => void</code></td>
					<td><code>undefined</code></td>
					<td>Called when command selected</td>
				</tr>
				<tr>
					<td><code>onOpen</code></td>
					<td><code>() => void</code></td>
					<td><code>undefined</code></td>
					<td>Called when palette opens</td>
				</tr>
				<tr>
					<td><code>onClose</code></td>
					<td><code>() => void</code></td>
					<td><code>undefined</code></td>
					<td>Called when palette closes</td>
				</tr>
			</tbody>
		</table>
	</section>

	<section>
		<h2>Command Interface</h2>
		<pre><code>{`interface Command {
  id: string;                    // Unique identifier
  label: string;                 // Display label
  description?: string;          // Optional description
  icon?: Snippet | string;       // Icon snippet or class name
  group?: string;                // Group identifier
  keywords?: string[];           // Search keywords
  data?: any;                    // Custom data
  disabled?: boolean;            // Disable command
  action?: () => void | Promise<void>; // Action to perform
}`}</code></pre>
	</section>

	<section>
		<h2>Accessibility</h2>
		<ul>
			<li>
				✅ <strong>ARIA combobox pattern:</strong> Proper roles and states for screen readers
			</li>
			<li>✅ <strong>Keyboard navigation:</strong> Full keyboard control without mouse</li>
			<li>✅ <strong>Focus management:</strong> Auto-focus on open, restoration on close</li>
			<li>
				✅ <strong>Live announcements:</strong> Screen reader feedback for actions and navigation
			</li>
			<li>✅ <strong>aria-activedescendant:</strong> Announces currently selected command</li>
			<li>✅ <strong>Modal semantics:</strong> Dialog role with aria-modal</li>
		</ul>
	</section>

	<section>
		<h2>Best Practices</h2>
		<ul>
			<li>✅ <strong>Group related commands:</strong> Use groups to organize by category</li>
			<li>✅ <strong>Add keywords:</strong> Include synonyms and alternative terms</li>
			<li>✅ <strong>Write clear descriptions:</strong> Help users understand what each does</li>
			<li>✅ <strong>Use consistent icons:</strong> Visual consistency improves recognition</li>
			<li>✅ <strong>Keep commands focused:</strong> Each command should do one thing well</li>
			<li>
				✅ <strong>Test keyboard navigation:</strong> Ensure all commands are keyboard-accessible
			</li>
		</ul>
	</section>
</div>

<style lang="scss">
	.story-container {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--spacing-2xl);

		h1 {
			font-size: 2.5rem;
			margin-bottom: var(--spacing-md);
			color: var(--text);
		}

		.description {
			font-size: var(--font-size-lg);
			color: var(--text-muted);
			margin-bottom: var(--spacing-2xl);
			line-height: 1.6;
		}

		section {
			margin-bottom: var(--spacing-2xl);

			h2 {
				font-size: 1.75rem;
				margin-bottom: var(--spacing-md);
				color: var(--text);
				border-bottom: 2px solid var(--border);
				padding-bottom: var(--spacing-sm);
			}

			h3 {
				font-size: 1.25rem;
				margin-top: var(--spacing-lg);
				margin-bottom: var(--spacing-sm);
				color: var(--text);
			}
		}

		.example {
			padding: var(--spacing-xl);
			background: var(--background-secondary);
			border: 1px solid var(--border);
			border-radius: var(--radius-md);
			margin: var(--spacing-lg) 0;
		}

		.status {
			margin-top: var(--spacing-md);
			padding: var(--spacing-md);
			background: var(--success-light);
			color: var(--success);
			border-radius: var(--radius-sm);
			border: 1px solid var(--success);
		}

		pre {
			background: var(--background-secondary);
			border: 1px solid var(--border);
			border-radius: var(--radius-md);
			padding: var(--spacing-md);
			overflow-x: auto;
			margin: var(--spacing-md) 0;

			code {
				font-family: var(--font-mono);
				font-size: var(--font-size-sm);
				line-height: 1.6;
			}
		}

		:not(pre) > code {
			background: var(--background-secondary);
			padding: 2px 6px;
			border-radius: var(--radius-xs);
			font-family: var(--font-mono);
			font-size: 0.9em;
			color: var(--primary);
		}

		kbd {
			display: inline-block;
			padding: 2px 8px;
			background: var(--background-secondary);
			border: 1px solid var(--border);
			border-radius: var(--radius-xs);
			font-family: var(--font-mono);
			font-size: 0.9em;
			font-weight: 600;
			box-shadow: var(--shadow-sm);
		}

		table {
			width: 100%;
			border-collapse: collapse;
			margin: var(--spacing-md) 0;
			background: var(--surface);
			border: 1px solid var(--border);
			border-radius: var(--radius-md);
			overflow: hidden;

			th,
			td {
				padding: var(--spacing-sm) var(--spacing-md);
				text-align: left;
				border-bottom: 1px solid var(--border);
			}

			th {
				background: var(--background-secondary);
				font-weight: 600;
				color: var(--text);
			}

			tbody tr:last-child td {
				border-bottom: none;
			}

			tbody tr:hover {
				background: var(--background-secondary);
			}
		}

		ul {
			list-style: none;
			padding: 0;

			li {
				padding: var(--spacing-xs) 0;
				color: var(--text-muted);
				line-height: 1.6;

				strong {
					color: var(--text);
				}
			}
		}
	}
</style>

