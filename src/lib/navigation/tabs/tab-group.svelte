<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { tabContext, type TabDefinition, type TabVariant } from './tab-context.js';
	import { getAnchor, navigateToAnchor, uniqueId } from '$src/lib/index.js';

	let {
		variant = 'traditional' as TabVariant,
		onChange = undefined,
		activeTab = $bindable(null as string | null),
		children
	}: {
		variant?: TabVariant;
		onChange?: ((id: string | null) => void) | undefined;
		activeTab?: string | null;
		children: Snippet;
	} = $props();

	// Generate unique group ID to scope tab IDs and prevent conflicts between multiple tab groups
	const groupId = uniqueId();

	// Use a SINGLE $state object - this is key for reactivity!
	const tabState = $state({
		tabs: [] as TabDefinition[],
		active: null as string | null
	});

	let registrationIndex = 0;
	let isInitialized = $state(false);

	// Cache for tab lookups to improve performance
	const tabCache = new Map<string, TabDefinition>();

	const register = (id: string, label: string, href?: string, disabled = false) => {
		// Prevent duplicate registrations
		if (tabCache.has(id)) {
			console.warn(`Tab with id "${id}" is already registered. Ignoring duplicate.`);
			return;
		}

		const index = registrationIndex++;
		const tab: TabDefinition = { id, label, index, href, disabled };
		tabState.tabs.push(tab);
		tabCache.set(id, tab);
	};

	// Sync from activeTab (parent) to tabState.active (internal)
	// This allows parent to control which tab is active
	// Using untrack to prevent reactive dependencies that could cause loops
	$effect(() => {
		const currentActiveTab = activeTab;
		const currentActiveState = tabState.active;

		// Check if current active tab becomes disabled - clear it if so
		if (currentActiveState !== null) {
			const activeTabDef = tabCache.get(currentActiveState);
			if (activeTabDef?.disabled) {
				// Active tab was disabled, find first enabled tab or clear
				const enabledTabs = tabState.tabs.filter((tab) => !tab.disabled);
				if (enabledTabs.length > 0) {
					const firstEnabled = enabledTabs.sort((a, b) => a.index - b.index)[0];
					tabState.active = firstEnabled.id;
					activeTab = firstEnabled.id;
				} else {
					tabState.active = null;
					activeTab = null;
				}
				return;
			}
		}

		// Skip if values are already in sync
		if (currentActiveTab === currentActiveState) return;

		// If activeTab is explicitly set (including null), sync it to internal state
		if (currentActiveTab !== undefined) {
			if (currentActiveTab === null) {
				// Parent wants to clear active tab
				if (currentActiveState !== null) {
					tabState.active = null;
				}
			} else {
				// Only update if the tab exists and is not disabled
				const tab = tabCache.get(currentActiveTab);
				if (tab) {
					if (!tab.disabled && currentActiveState !== currentActiveTab) {
						tabState.active = currentActiveTab;
					} else if (tab.disabled) {
						// If parent tries to activate a disabled tab, revert activeTab
						activeTab = currentActiveState;
					}
				}
				// If tabs haven't registered yet, initialization will handle it
			}
		}
	});

	// Initialize active tab - only run once when tabs are available
	$effect(() => {
		// Skip if already initialized or no tabs yet
		if (isInitialized || tabState.tabs.length === 0) return;

		// Use microtask to ensure all synchronous tab registrations in this cycle complete
		queueMicrotask(() => {
			// Double-check we haven't initialized in the meantime
			if (isInitialized) return;

			// Get current tabs state at initialization time
			const currentTabs = tabState.tabs;
			if (currentTabs.length === 0) return;

			// If activeTab is already set by parent, use it (after verifying it's valid and not disabled)
			if (activeTab !== null && activeTab !== undefined) {
				const tab = tabCache.get(activeTab);
				if (tab && !tab.disabled) {
					tabState.active = activeTab;
					isInitialized = true;
					return;
				}
			}

			// Check for anchor in URL first (but only if it matches a tab in THIS group)
			const anchor = getAnchor();
			if (anchor) {
				// Check if anchor starts with our group ID prefix
				const groupPrefix = `${groupId}-`;
				if (anchor.startsWith(groupPrefix)) {
					const tabId = anchor.slice(groupPrefix.length);
					const tab = tabCache.get(tabId);
					if (tab && !tab.disabled) {
						tabState.active = tabId;
						activeTab = tabId;
						isInitialized = true;
						return;
					}
				}
				// Also check for direct tab ID match (for backward compatibility)
				const tab = tabCache.get(anchor);
				if (tab && !tab.disabled) {
					tabState.active = anchor;
					activeTab = anchor;
					isInitialized = true;
					return;
				}
			}

			// Default to first enabled tab (by registration index, which should be the first in DOM order)
			// Sort by index to get the first registered tab (lowest index = first)
			const sortedTabs = [...currentTabs]
				.filter((tab) => !tab.disabled)
				.sort((a, b) => a.index - b.index);
			const firstTab = sortedTabs[0];
			if (firstTab) {
				tabState.active = firstTab.id;
				activeTab = firstTab.id;
				isInitialized = true;
			}
		});
	});
	const selectTab = (id: string) => {
		// Use cache for faster lookup
		const tab = tabCache.get(id);
		if (!tab || tab.disabled) return;

		// Only update if different to avoid unnecessary re-renders
		if (tabState.active !== id) {
			tabState.active = id;
			activeTab = id;

			// Only use anchor navigation if tab doesn't have href (href navigation is handled by Tab component)
			// Scope anchor to this group to avoid conflicts with multiple tab groups
			if (!tab.href) {
				navigateToAnchor(`${groupId}-${id}`);
			}

			onChange?.(id);

			// Focus the selected tab (scoped to this group)
			const button = document.getElementById(`tab-${groupId}-${id}`);
			if (button) {
				button.focus();
			}
		}
	};

	// Keyboard navigation handler
	const handleKeydown = (e: KeyboardEvent, currentId: string) => {
		const tabList = tabState.tabs.filter((tab) => !tab.disabled);
		const currentIndex = tabList.findIndex((tab) => tab.id === currentId);
		if (currentIndex === -1) return;

		let targetIndex = currentIndex;

		switch (e.key) {
			case 'ArrowLeft':
				e.preventDefault();
				targetIndex = currentIndex > 0 ? currentIndex - 1 : tabList.length - 1;
				break;
			case 'ArrowRight':
				e.preventDefault();
				targetIndex = currentIndex < tabList.length - 1 ? currentIndex + 1 : 0;
				break;
			case 'Home':
				e.preventDefault();
				targetIndex = 0;
				break;
			case 'End':
				e.preventDefault();
				targetIndex = tabList.length - 1;
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				selectTab(currentId);
				return;
			default:
				return;
		}

		if (targetIndex !== currentIndex && tabList[targetIndex]) {
			selectTab(tabList[targetIndex].id);
		}
	};

	// Set context - pass the reactive state object directly!
	setContext(tabContext, {
		state: tabState,
		get variant() {
			return variant;
		},
		groupId,
		register
	});
</script>

<section class="tab-group {variant}">
	<div class="tab-head">
		<div role="tablist">
			{#each tabState.tabs as tab}
				<li class={tabState.active == tab.id ? 'active' : 'inactive'} class:disabled={tab.disabled}>
					<button
						id="tab-{groupId}-{tab.id}"
						role="tab"
						aria-selected={tabState.active === tab.id}
						aria-controls="tabpanel-{groupId}-{tab.id}"
						aria-disabled={tab.disabled || false}
						tabindex={tab.disabled ? -1 : tabState.active === tab.id ? 0 : -1}
						disabled={tab.disabled || false}
						onclick={() => selectTab(tab.id)}
						onkeydown={(e) => !tab.disabled && handleKeydown(e, tab.id)}
					>
						{tab.label}
					</button>
				</li>
			{/each}
		</div>
	</div>
	<div class="tab-content">
		{@render children?.()}
	</div>
</section>

<style lang="scss">
	.tab-head {
		min-height: 2rem;
		position: relative;

		div[role='tablist'] {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			box-sizing: border-box;
			min-height: 2rem;
			overflow: hidden;
			width: 100%;
		}

		li {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		li.active button {
			font-weight: 700;
			cursor: default;
		}

		li.disabled button {
			opacity: 0.5;
			cursor: not-allowed;
		}

		button {
			appearance: none;
			border: none 0;
			background: transparent;
			line-height: 1.8rem;
			min-height: 2rem;
			padding-left: 1rem;
			padding-right: 1rem;
			cursor: pointer;
			position: relative;
			z-index: 2;

			&:focus {
				outline: none;
			}

			&:focus-visible {
				outline: 2px solid var(--tab-focus-outline, rgb(0, 123, 255));
				outline-offset: 2px;
				border-radius: 0.25rem;
			}

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}
	}

	.tab-content {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	.traditional {
		button {
			border-radius: 0.5rem 0.5rem 0 0;
		}

		.inactive button {
			background: var(--tab-traditional-inactive-bg, transparent);
			color: var(--tab-traditional-inactive-fg, rgb(150, 150, 150));
		}

		.inactive button:hover {
			background: var(--tab-traditional-hover-bg, transparent);
			color: var(--tab-traditional-hover-fg, rgb(220, 220, 220));
		}

		.active button {
			background: var(--tab-traditional-active-bg, rgb(220, 220, 230));
			color: var(--tab-traditional-active-fg, rgb(50, 50, 50));
		}

		.tab-head {
			border-bottom: solid 0.2rem var(--tab-traditional-border, rgb(220, 220, 230));
		}
	}

	.underline {
		button {
			border-bottom: solid 0.2rem var(--tab-underline-inactive-fg, rgb(100, 100, 100));
		}

		.tab-head {
			border-bottom: solid 0.2rem var(--tab-underline-inactive-fg, rgb(100, 100, 100));
		}

		.inactive button {
			background: var(--tab-underline-inactive-bg, transparent);
			color: var(--tab-underline-inactive-fg, rgb(150, 150, 150));
		}

		.inactive button:hover {
			background: var(--tab-underline-hover-bg, transparent);
			color: var(--tab-underline-hover-fg, rgb(220, 220, 220));
		}

		.active button {
			color: var(--tab-underline-active-fg, rgb(255, 134, 78));
			border-color: var(--tab-underline-active-fg, rgb(255, 134, 78));
			background: var(--tab-underline-active-bg, rgb(80, 80, 80));
		}
	}

	.outline {
		button {
			border-radius: 0.5rem 0.5rem 0 0;
		}

		.tab-head {
			border-bottom: solid 0.1rem var(--tab-outline-border, rgb(220, 220, 220));
		}

		.inactive button {
			color: var(--tab-outline-inactive-fg, rgb(120, 120, 120));
		}

		.active button {
			border-style: solid;
			border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
			border-color: var(--tab-outline-border, rgb(220, 220, 220));
			color: var(--tab-outline-active-fg, rgb(50, 50, 50));
			border-bottom-color: var(--base-bg, rgb(50, 50, 50));
			background: var(--tab-outline-active-bg, transparent);
			line-height: 1.7rem;
			min-height: 1.7rem;
		}
	}

	.overline {
		.tab-head {
			background: var(--tab-overline-bg, rgb(100, 100, 100));
		}

		button {
			border-top: solid 0.2rem;
		}

		.active button {
			color: var(--tab-overline-active-fg, rgb(255, 134, 78));
			border-color: var(--tab-overline-active-fg, rgb(255, 134, 78));
			background: var(--tab-overline-active-bg, rgb(50, 50, 50));
		}

		.inactive button {
			border-style: none;
			color: var(--tab-overline-fg, rgb(180, 180, 180));
		}
	}

	.pills {
		.tab-head {
			border-bottom: none;
		}

		div[role='tablist'] {
			gap: 0.5rem;
		}

		button {
			border-radius: 1.5rem;
			padding-left: 1.25rem;
			padding-right: 1.25rem;
			transition: all 0.2s ease;
		}

		.inactive button {
			background: var(--tab-pills-inactive-bg, rgb(240, 240, 240));
			color: var(--tab-pills-inactive-fg, rgb(100, 100, 100));
		}

		.inactive button:hover {
			background: var(--tab-pills-hover-bg, rgb(230, 230, 230));
			color: var(--tab-pills-hover-fg, rgb(50, 50, 50));
		}

		.active button {
			background: var(--tab-pills-active-bg, rgb(0, 123, 255));
			color: var(--tab-pills-active-fg, rgb(255, 255, 255));
			box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
		}
	}

	.segmented {
		.tab-head {
			border-bottom: none;
			background: var(--tab-segmented-bg, rgb(240, 240, 240));
			border-radius: 0.5rem;
			padding: 0.25rem;
		}

		div[role='tablist'] {
			gap: 0.25rem;
		}

		button {
			border-radius: 0.375rem;
			flex: 1;
			min-width: 0;
			transition: all 0.2s ease;
		}

		.inactive button {
			background: transparent;
			color: var(--tab-segmented-inactive-fg, rgb(100, 100, 100));
		}

		.inactive button:hover {
			background: var(--tab-segmented-hover-bg, rgba(255, 255, 255, 0.5));
			color: var(--tab-segmented-hover-fg, rgb(50, 50, 50));
		}

		.active button {
			background: var(--tab-segmented-active-bg, rgb(255, 255, 255));
			color: var(--tab-segmented-active-fg, rgb(50, 50, 50));
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
			font-weight: 500;
		}
	}

	.minimal {
		.tab-head {
			border-bottom: solid 0.1rem var(--tab-minimal-border, rgb(230, 230, 230));
		}

		button {
			border-radius: 0;
			transition: color 0.2s ease;
		}

		.inactive button {
			background: transparent;
			color: var(--tab-minimal-inactive-fg, rgb(150, 150, 150));
		}

		.inactive button:hover {
			background: transparent;
			color: var(--tab-minimal-hover-fg, rgb(50, 50, 50));
		}

		.active button {
			background: transparent;
			color: var(--tab-minimal-active-fg, rgb(0, 123, 255));
			border-bottom: solid 0.2rem var(--tab-minimal-active-fg, rgb(0, 123, 255));
			margin-bottom: -0.1rem;
			font-weight: 500;
		}
	}
</style>
