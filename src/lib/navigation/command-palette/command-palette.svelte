<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { fuzzySearch, highlightMatches, type FuzzyMatch } from '$lib/helpers/fuzzy-search.js';
	import { announce } from '$lib/helpers/announcer.js';
	import Overlay from '$lib/generic/overlay.svelte';
	import { fadeIn, slideIn } from '$lib/helpers/animation-actions.js';

	/**
	 * Command item interface
	 */
	export interface Command {
		/** Unique identifier for the command */
		id: string;
		/** Display label for the command */
		label: string;
		/** Optional description/subtitle */
		description?: string;
		/** Optional icon (snippet or string class name) */
		icon?: Snippet | string;
		/** Group this command belongs to */
		group?: string;
		/** Keywords for better search matching */
		keywords?: string[];
		/** Custom data to pass to onSelect handler */
		data?: any;
		/** Whether this command is disabled */
		disabled?: boolean;
		/** Action to perform when selected */
		action?: () => void | Promise<void>;
	}

	export interface CommandGroup {
		/** Group identifier */
		id: string;
		/** Group display name */
		label: string;
		/** Group priority for ordering */
		priority?: number;
	}

	// Props
	interface Props {
		/** List of available commands */
		commands?: Command[];
		/** Command groups configuration */
		groups?: CommandGroup[];
		/** Whether the palette is open */
		open?: boolean;
		/** Placeholder text for search input */
		placeholder?: string;
		/** Show recent commands at the top */
		showRecent?: boolean;
		/** Maximum recent commands to show */
		maxRecent?: number;
		/** Keyboard shortcut to open (default: 'k' for Cmd/Ctrl+K) */
		shortcut?: string;
		/** Modifier key for shortcut (default: 'meta' for Cmd/Ctrl) */
		shortcutModifier?: 'meta' | 'ctrl' | 'alt' | 'shift';
		/** Enable keyboard shortcut */
		enableShortcut?: boolean;
		/** Empty state message */
		emptyMessage?: string;
		/** Blur background when open */
		blur?: boolean;
		/** Callback when a command is selected */
		onSelect?: (command: Command) => void;
		/** Callback when palette opens */
		onOpen?: () => void;
		/** Callback when palette closes */
		onClose?: () => void;
	}

	let {
		commands = [],
		groups = [],
		open = $bindable(false),
		placeholder = 'Type a command or search...',
		showRecent = true,
		maxRecent = 5,
		shortcut = 'k',
		shortcutModifier = 'meta',
		enableShortcut = true,
		emptyMessage = 'No commands found',
		blur = true,
		onSelect,
		onOpen,
		onClose
	}: Props = $props();

	// State
	let query = $state('');
	let selectedIndex = $state(0);
	let inputElement: HTMLInputElement;
	let recentCommands = $state<string[]>([]);

	// Load recent commands from localStorage
	onMount(() => {
		if (showRecent) {
			const stored = localStorage.getItem('command-palette-recent');
			if (stored) {
				try {
					recentCommands = JSON.parse(stored);
				} catch {
					recentCommands = [];
				}
			}
		}
	});

	// Filtered and grouped commands
	const filteredCommands = $derived.by(() => {
		let results: Command[] = [];

		if (!query.trim()) {
			// Show recent commands first, then all commands
			if (showRecent && recentCommands.length > 0) {
				const recentIds = new Set(recentCommands.slice(0, maxRecent));
				const recent = commands.filter((cmd) => recentIds.has(cmd.id));
				const other = commands.filter((cmd) => !recentIds.has(cmd.id));
				results = [...recent, ...other];
			} else {
				results = [...commands];
			}
		} else {
			// Fuzzy search across label, description, and keywords
			const matches = fuzzySearch<Command>(query, commands, {
				keys: ['label', 'description'],
				threshold: 0.1,
				limit: 50
			});

			// Also search keywords
			const keywordMatches = commands.filter((cmd) => {
				if (!cmd.keywords) return false;
				return cmd.keywords.some((keyword) =>
					keyword.toLowerCase().includes(query.toLowerCase())
				);
			});

			// Combine and dedupe
			const seen = new Set<string>();
			for (const match of matches) {
				if (!seen.has(match.item.id)) {
					results.push(match.item);
					seen.add(match.item.id);
				}
			}
			for (const cmd of keywordMatches) {
				if (!seen.has(cmd.id)) {
					results.push(cmd);
					seen.add(cmd.id);
				}
			}
		}

		return results;
	});

	// Group commands
	const groupedCommands = $derived.by(() => {
		const grouped = new Map<string, Command[]>();

		// Group by defined groups
		for (const cmd of filteredCommands) {
			const groupId = cmd.group || 'default';
			if (!grouped.has(groupId)) {
				grouped.set(groupId, []);
			}
			grouped.get(groupId)!.push(cmd);
		}

		// Sort groups by priority
		const sortedGroups = Array.from(grouped.entries()).sort((a, b) => {
			const groupA = groups.find((g) => g.id === a[0]);
			const groupB = groups.find((g) => g.id === b[0]);
			const priorityA = groupA?.priority ?? 999;
			const priorityB = groupB?.priority ?? 999;
			return priorityA - priorityB;
		});

		return sortedGroups;
	});

	// Flat list of filtered commands for keyboard navigation
	const flatCommands = $derived(filteredCommands.filter((cmd) => !cmd.disabled));

	// Keyboard shortcut handler
	function handleGlobalKeydown(event: KeyboardEvent) {
		if (!enableShortcut) return;

		const modifierPressed =
			shortcutModifier === 'meta'
				? event.metaKey || event.ctrlKey
				: event[`${shortcutModifier}Key` as keyof KeyboardEvent];

		if (modifierPressed && event.key.toLowerCase() === shortcut.toLowerCase()) {
			event.preventDefault();
			openPalette();
		}
	}

	// Mount/unmount keyboard listener
	onMount(() => {
		window.addEventListener('keydown', handleGlobalKeydown);
		return () => window.removeEventListener('keydown', handleGlobalKeydown);
	});

	// Open palette
	function openPalette() {
		open = true;
		query = '';
		selectedIndex = 0;
		onOpen?.();
		// Focus input after opening
		setTimeout(() => inputElement?.focus(), 10);
		announce('Command palette opened', 'polite');
	}

	// Close palette
	function closePalette() {
		open = false;
		query = '';
		selectedIndex = 0;
		onClose?.();
		announce('Command palette closed', 'polite');
	}

	// Execute command
	function executeCommand(command: Command) {
		if (command.disabled) return;

		// Add to recent commands
		if (showRecent) {
			recentCommands = [
				command.id,
				...recentCommands.filter((id) => id !== command.id)
			].slice(0, maxRecent);
			localStorage.setItem('command-palette-recent', JSON.stringify(recentCommands));
		}

		// Execute action
		command.action?.();
		onSelect?.(command);

		// Close palette
		closePalette();

		announce(`Executed: ${command.label}`, 'assertive');
	}

	// Keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, flatCommands.length - 1);
				scrollToSelected();
				announce(
					`${flatCommands[selectedIndex]?.label || 'Unknown command'}`,
					'polite'
				);
				break;

			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				scrollToSelected();
				announce(
					`${flatCommands[selectedIndex]?.label || 'Unknown command'}`,
					'polite'
				);
				break;

			case 'Home':
				event.preventDefault();
				selectedIndex = 0;
				scrollToSelected();
				break;

			case 'End':
				event.preventDefault();
				selectedIndex = flatCommands.length - 1;
				scrollToSelected();
				break;

			case 'Enter':
				event.preventDefault();
				if (flatCommands[selectedIndex]) {
					executeCommand(flatCommands[selectedIndex]);
				}
				break;

			case 'Escape':
				event.preventDefault();
				closePalette();
				break;
		}
	}

	// Scroll selected item into view
	function scrollToSelected() {
		const element = document.querySelector(
			`.command-palette__item[data-index="${selectedIndex}"]`
		);
		element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
	}

	// Handle input change
	function handleInput() {
		selectedIndex = 0; // Reset selection on search
	}

	// Handle overlay click
	function handleOverlayClick() {
		closePalette();
	}

	// Get group label
	function getGroupLabel(groupId: string): string {
		if (groupId === 'default') return 'Commands';
		return groups.find((g) => g.id === groupId)?.label || groupId;
	}

	// Check if command is recent
	function isRecent(commandId: string): boolean {
		return showRecent && recentCommands.slice(0, maxRecent).includes(commandId);
	}

	// Highlight query matches in text
	function getHighlightedText(text: string): string {
		if (!query.trim()) return text;

		const match = fuzzySearch(query, [text], { threshold: 0 });
		if (match.length > 0) {
			return highlightMatches(text, match[0].matches);
		}
		return text;
	}
</script>

{#if open}
	<div class="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
		<Overlay onClick={handleOverlayClick} {blur} />

		<div class="command-palette__container" use:fadeIn use:slideIn={{ direction: 'top' }}>
			<div class="command-palette__header">
				<div class="command-palette__search">
					<svg
						class="command-palette__search-icon"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<input
						bind:this={inputElement}
						bind:value={query}
						oninput={handleInput}
						onkeydown={handleKeydown}
						type="text"
						class="command-palette__input"
						{placeholder}
						role="combobox"
						aria-expanded="true"
						aria-controls="command-palette-listbox"
						aria-activedescendant={flatCommands[selectedIndex]?.id}
						aria-autocomplete="list"
					/>

					{#if enableShortcut}
						<kbd class="command-palette__shortcut">
							{shortcutModifier === 'meta' ? '⌘' : 'Ctrl'}
							{shortcut.toUpperCase()}
						</kbd>
					{/if}
				</div>
			</div>

			<div class="command-palette__content" id="command-palette-listbox" role="listbox">
				{#if flatCommands.length === 0}
					<div class="command-palette__empty">
						<svg
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="1.5"
								opacity="0.3"
							/>
							<path
								d="M8 12h8M12 8v8"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								opacity="0.5"
							/>
						</svg>
						<p>{emptyMessage}</p>
					</div>
				{:else}
					{#each groupedCommands as [groupId, groupCommands]}
						<div class="command-palette__group">
							<div class="command-palette__group-label">{getGroupLabel(groupId)}</div>

							{#each groupCommands as command, index}
								{@const globalIndex = flatCommands.findIndex((c) => c.id === command.id)}
								{@const isSelected = globalIndex === selectedIndex}
								{@const isRecentCommand = isRecent(command.id)}

								<button
									type="button"
									class="command-palette__item"
									class:command-palette__item--selected={isSelected}
									class:command-palette__item--disabled={command.disabled}
									class:command-palette__item--recent={isRecentCommand}
									data-index={globalIndex}
									role="option"
									aria-selected={isSelected}
									id={command.id}
									disabled={command.disabled}
									onclick={() => executeCommand(command)}
								>
									<div class="command-palette__item-content">
										{#if command.icon}
											<div class="command-palette__item-icon">
												{#if typeof command.icon === 'string'}
													<i class={command.icon}></i>
												{:else}
													{@render command.icon()}
												{/if}
											</div>
										{/if}

										<div class="command-palette__item-text">
											<div class="command-palette__item-label">
												{@html getHighlightedText(command.label)}
											</div>
											{#if command.description}
												<div class="command-palette__item-description">
													{@html getHighlightedText(command.description)}
												</div>
											{/if}
										</div>

										{#if isRecentCommand}
											<div class="command-palette__item-badge">Recent</div>
										{/if}
									</div>
								</button>
							{/each}
						</div>
					{/each}
				{/if}
			</div>

			<div class="command-palette__footer">
				<div class="command-palette__hints">
					<span>
						<kbd>↑</kbd>
						<kbd>↓</kbd>
						Navigate
					</span>
					<span>
						<kbd>↵</kbd>
						Select
					</span>
					<span>
						<kbd>Esc</kbd>
						Close
					</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.command-palette {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: var(--spacing-2xl);
		padding-top: 15vh;

		@media (max-width: 768px) {
			padding: var(--spacing-md);
			padding-top: 10vh;
		}
	}

	.command-palette__container {
		position: relative;
		z-index: 10000;
		width: 100%;
		max-width: 640px;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-2xl);
		display: flex;
		flex-direction: column;
		max-height: 60vh;
		overflow: hidden;

		// Glassmorphism effect
		backdrop-filter: blur(20px);
		background: rgba(255, 255, 255, 0.95);

		[data-theme='dark'] & {
			background: rgba(30, 30, 30, 0.95);
		}
	}

	.command-palette__header {
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--border);
	}

	.command-palette__search {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.command-palette__search-icon {
		color: var(--text-muted);
		flex-shrink: 0;
	}

	.command-palette__input {
		flex: 1;
		border: none;
		background: transparent;
		font-size: var(--font-size-lg);
		color: var(--text);
		outline: none;
		padding: var(--spacing-xs) 0;

		&::placeholder {
			color: var(--text-muted);
		}
	}

	.command-palette__shortcut {
		display: flex;
		align-items: center;
		gap: 2px;
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--background-secondary);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		font-family: var(--font-mono);
		color: var(--text-muted);
		flex-shrink: 0;
	}

	.command-palette__content {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.command-palette__group {
		padding: var(--spacing-sm) 0;

		&:not(:last-child) {
			border-bottom: 1px solid var(--border);
		}
	}

	.command-palette__group-label {
		padding: var(--spacing-xs) var(--spacing-md);
		font-size: var(--font-size-xs);
		font-weight: 600;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.command-palette__item {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		transition: background-color 0.15s ease;

		&:hover:not(&--disabled) {
			background: var(--background-secondary);
		}

		&--selected {
			background: var(--primary-light);

			[data-theme='dark'] & {
				background: rgba(var(--primary-rgb), 0.15);
			}
		}

		&--disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&:focus-visible {
			outline: 2px solid var(--focus-ring-color);
			outline-offset: -2px;
		}
	}

	.command-palette__item-content {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.command-palette__item-icon {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);

		i {
			font-size: 18px;
		}
	}

	.command-palette__item-text {
		flex: 1;
		min-width: 0;
	}

	.command-palette__item-label {
		font-size: var(--font-size-base);
		color: var(--text);
		font-weight: 500;

		:global(mark) {
			background: var(--warning-light);
			color: var(--text);
			font-weight: 600;
			padding: 0 2px;
			border-radius: 2px;

			[data-theme='dark'] & {
				background: rgba(var(--warning-rgb), 0.3);
			}
		}
	}

	.command-palette__item-description {
		font-size: var(--font-size-sm);
		color: var(--text-muted);
		margin-top: 2px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		:global(mark) {
			background: var(--warning-light);
			color: var(--text-muted);
			font-weight: 600;
			padding: 0 2px;
			border-radius: 2px;

			[data-theme='dark'] & {
				background: rgba(var(--warning-rgb), 0.3);
			}
		}
	}

	.command-palette__item-badge {
		flex-shrink: 0;
		padding: 2px var(--spacing-xs);
		background: var(--info-light);
		color: var(--info);
		font-size: var(--font-size-xs);
		font-weight: 600;
		border-radius: var(--radius-sm);

		[data-theme='dark'] & {
			background: rgba(var(--info-rgb), 0.2);
			color: var(--info-light);
		}
	}

	.command-palette__empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-2xl);
		color: var(--text-muted);
		text-align: center;

		svg {
			margin-bottom: var(--spacing-md);
			opacity: 0.5;
		}

		p {
			margin: 0;
			font-size: var(--font-size-base);
		}
	}

	.command-palette__footer {
		padding: var(--spacing-sm) var(--spacing-md);
		border-top: 1px solid var(--border);
		background: var(--background-secondary);
	}

	.command-palette__hints {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		font-size: var(--font-size-xs);
		color: var(--text-muted);

		span {
			display: flex;
			align-items: center;
			gap: var(--spacing-xs);
		}

		kbd {
			padding: 2px var(--spacing-xs);
			background: var(--surface);
			border: 1px solid var(--border);
			border-radius: var(--radius-xs);
			font-size: var(--font-size-xs);
			font-family: var(--font-mono);
			font-weight: 600;
			min-width: 20px;
			text-align: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.command-palette__container {
			animation: none;
		}

		.command-palette__item {
			transition: none;
		}
	}
</style>

