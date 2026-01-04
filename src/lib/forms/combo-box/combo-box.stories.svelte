<script lang="ts" module>
	import type { Meta } from '@storybook/svelte';
	import ComboBoxStories from './combo-box.stories.svelte';

	export const meta: Meta = {
		title: 'Forms/ComboBox',
		component: ComboBoxStories,
		tags: ['autodocs']
	};
</script>

<script lang="ts">
	import ComboBox from './combo-box.svelte';
	import type { DropdownOption } from '$src/lib/types/form.js';

	// Sample data
	const fruits: DropdownOption[] = [
		{ value: 'apple', name: 'Apple' },
		{ value: 'banana', name: 'Banana' },
		{ value: 'cherry', name: 'Cherry' },
		{ value: 'date', name: 'Date' },
		{ value: 'elderberry', name: 'Elderberry' },
		{ value: 'fig', name: 'Fig' },
		{ value: 'grape', name: 'Grape' },
		{ value: 'honeydew', name: 'Honeydew' },
		{ value: 'kiwi', name: 'Kiwi' },
		{ value: 'lemon', name: 'Lemon' },
		{ value: 'mango', name: 'Mango' },
		{ value: 'nectarine', name: 'Nectarine' },
		{ value: 'orange', name: 'Orange' },
		{ value: 'papaya', name: 'Papaya' },
		{ value: 'quince', name: 'Quince' }
	];

	// Generate large dataset for virtual scrolling demo
	const largeDataset: DropdownOption[] = Array.from({ length: 10000 }, (_, i) => ({
		value: `item-${i}`,
		name: `Item ${i + 1}`
	}));

	// Countries for realistic demo
	const countries: DropdownOption[] = [
		{ value: 'us', name: 'United States' },
		{ value: 'uk', name: 'United Kingdom' },
		{ value: 'ca', name: 'Canada' },
		{ value: 'au', name: 'Australia' },
		{ value: 'de', name: 'Germany' },
		{ value: 'fr', name: 'France' },
		{ value: 'es', name: 'Spain' },
		{ value: 'it', name: 'Italy' },
		{ value: 'jp', name: 'Japan' },
		{ value: 'cn', name: 'China' },
		{ value: 'in', name: 'India' },
		{ value: 'br', name: 'Brazil' },
		{ value: 'mx', name: 'Mexico' },
		{ value: 'za', name: 'South Africa' }
	];

	let basicValue = $state<string | null>(null);
	let searchableValue = $state<string | null>(null);
	let multiValue = $state<string[]>([]);
	let maxSelectValue = $state<string[]>([]);
	let virtualValue = $state<string | null>(null);
	let disabledValue = $state<string | null>('banana');
	let errorValue = $state<string | null>(null);
	let successValue = $state<string | null>('apple');
	let asyncValue = $state<string | null>(null);
	let asyncItems = $state<DropdownOption[]>([]);

	// Simulate async search
	const handleAsyncSearch = async (query: string): Promise<DropdownOption[]> => {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Filter countries based on query
		return countries.filter((country) =>
			country.name.toLowerCase().includes(query.toLowerCase())
		);
	};
</script>

<!-- Basic ComboBox -->
<div class="story">
	<h2>Basic ComboBox</h2>
	<p>Simple single-select combobox with static options.</p>

	<ComboBox
		bind:value={basicValue}
		items={fruits}
		label="Select a fruit"
		placeholder="Choose a fruit..."
		helpText="Select your favorite fruit"
	/>

	<div class="output">
		<strong>Selected:</strong> {basicValue || 'None'}
	</div>
</div>

<!-- Searchable ComboBox -->
<div class="story">
	<h2>Searchable with Typeahead</h2>
	<p>ComboBox with search/filter functionality enabled.</p>

	<ComboBox
		bind:value={searchableValue}
		items={fruits}
		label="Search fruits"
		placeholder="Type to search..."
		searchable
		helpText="Type to filter options"
	/>

	<div class="output">
		<strong>Selected:</strong> {searchableValue || 'None'}
	</div>
</div>

<!-- Multi-Select ComboBox -->
<div class="story">
	<h2>Multi-Select with Chips</h2>
	<p>Select multiple options displayed as removable chips.</p>

	<ComboBox
		bind:value={multiValue}
		items={fruits}
		label="Select multiple fruits"
		placeholder="Choose fruits..."
		multiSelect
		searchable
		helpText="Select as many as you like"
	/>

	<div class="output">
		<strong>Selected ({multiValue.length}):</strong> {multiValue.join(', ') || 'None'}
	</div>
</div>

<!-- Multi-Select with Max Selections -->
<div class="story">
	<h2>Multi-Select with Limit</h2>
	<p>Multi-select with a maximum number of selections (3).</p>

	<ComboBox
		bind:value={maxSelectValue}
		items={fruits}
		label="Select up to 3 fruits"
		placeholder="Choose up to 3..."
		multiSelect
		searchable
		maxSelections={3}
		helpText="You can select a maximum of 3 fruits"
	/>

	<div class="output">
		<strong>Selected ({maxSelectValue.length}/3):</strong> {maxSelectValue.join(', ') || 'None'}
	</div>
</div>

<!-- Virtual Scrolling -->
<div class="story">
	<h2>Virtual Scrolling for Large Lists</h2>
	<p>Efficiently handles 10,000+ items with virtual scrolling.</p>

	<ComboBox
		bind:value={virtualValue}
		items={largeDataset}
		label="Select from 10,000 items"
		placeholder="Search from 10,000 items..."
		searchable
		virtualScroll
		itemHeight={40}
		helpText="Virtual scrolling maintains 60fps with large datasets"
	/>

	<div class="output">
		<strong>Selected:</strong> {virtualValue || 'None'}
	</div>
</div>

<!-- Async Search -->
<div class="story">
	<h2>Async Search</h2>
	<p>Dynamic options loaded via async search function.</p>

	<ComboBox
		bind:value={asyncValue}
		items={asyncItems}
		label="Search countries"
		placeholder="Type to search countries..."
		searchable
		onSearch={handleAsyncSearch}
		helpText="Options are loaded dynamically as you type"
	/>

	<div class="output">
		<strong>Selected:</strong> {asyncValue || 'None'}
	</div>
</div>

<!-- Disabled State -->
<div class="story">
	<h2>Disabled State</h2>
	<p>ComboBox in disabled state.</p>

	<ComboBox
		bind:value={disabledValue}
		items={fruits}
		label="Disabled combobox"
		disabled
	/>
</div>

<!-- Error State -->
<div class="story">
	<h2>Error State</h2>
	<p>ComboBox with error message.</p>

	<ComboBox
		bind:value={errorValue}
		items={fruits}
		label="Required field"
		placeholder="This field is required..."
		required
		errorText="Please select an option"
	/>

	<div class="output">
		<strong>Selected:</strong> {errorValue || 'None'}
	</div>
</div>

<!-- Success State -->
<div class="story">
	<h2>Success State</h2>
	<p>ComboBox with success message.</p>

	<ComboBox
		bind:value={successValue}
		items={fruits}
		label="Validated field"
		successText="Great choice!"
	/>

	<div class="output">
		<strong>Selected:</strong> {successValue || 'None'}
	</div>
</div>

<!-- Keyboard Navigation Demo -->
<div class="story">
	<h2>Keyboard Navigation</h2>
	<p>Full keyboard support following ARIA 1.2 Combobox pattern:</p>

	<div class="keyboard-guide">
		<h3>Keyboard Shortcuts:</h3>
		<ul>
			<li><kbd>↓</kbd> / <kbd>↑</kbd> - Navigate options</li>
			<li><kbd>Enter</kbd> - Select highlighted option</li>
			<li><kbd>Escape</kbd> - Close dropdown</li>
			<li><kbd>Home</kbd> - Jump to first option</li>
			<li><kbd>End</kbd> - Jump to last option</li>
			<li><kbd>Tab</kbd> - Select and move to next field</li>
			<li><kbd>Backspace</kbd> - Remove last chip (multi-select, when input empty)</li>
			<li>Type any character - Filter options</li>
		</ul>
	</div>

	<ComboBox
		bind:value={searchableValue}
		items={fruits}
		label="Try keyboard navigation"
		placeholder="Click here and use arrow keys..."
		searchable
		helpText="Focus this field and try the keyboard shortcuts above"
	/>
</div>

<!-- Accessibility Features -->
<div class="story">
	<h2>Accessibility Features</h2>
	<div class="accessibility-info">
		<h3>Built-in Accessibility:</h3>
		<ul>
			<li>✅ ARIA 1.2 Combobox pattern with proper roles</li>
			<li>✅ <code>aria-expanded</code> indicates dropdown state</li>
			<li>✅ <code>aria-activedescendant</code> tracks highlighted option</li>
			<li>✅ <code>aria-autocomplete</code> describes search behavior</li>
			<li>✅ <code>aria-multiselectable</code> for multi-select mode</li>
			<li>✅ <code>aria-invalid</code> and <code>aria-describedby</code> for validation</li>
			<li>✅ Screen reader announcements for selection changes</li>
			<li>✅ Keyboard navigation with roving tabindex</li>
			<li>✅ Focus management and restoration</li>
			<li>✅ Clear, descriptive labels and help text</li>
		</ul>
	</div>
</div>

<!-- Size Variants -->
<div class="story">
	<h2>Size Variants</h2>
	<p>Different size options for various layouts.</p>

	<div style="display: grid; gap: 1rem;">
		<ComboBox
			items={fruits.slice(0, 5)}
			label="Small"
			size="sm"
			placeholder="Small size..."
		/>

		<ComboBox
			items={fruits.slice(0, 5)}
			label="Medium"
			size="md"
			placeholder="Medium size..."
		/>

		<ComboBox
			items={fruits.slice(0, 5)}
			label="Large"
			size="lg"
			placeholder="Large size..."
		/>

		<ComboBox
			items={fruits.slice(0, 5)}
			label="Full Width"
			size="full"
			placeholder="Full width..."
		/>
	</div>
</div>

<style>
	.story {
		margin-bottom: 3rem;
		padding: 1.5rem;
		border: 1px solid var(--gray-200);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	.story h2 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: var(--text);
		font-size: 1.5rem;
	}

	.story p {
		margin-bottom: 1.5rem;
		color: var(--gray-600);
	}

	.output {
		margin-top: 1rem;
		padding: 1rem;
		background: var(--gray-100);
		border-radius: var(--radius-md);
		font-family: monospace;
		color: var(--text);
	}

	.keyboard-guide,
	.accessibility-info {
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: var(--gray-50);
		border-radius: var(--radius-md);
		border-left: 4px solid var(--primary);
	}

	.keyboard-guide h3,
	.accessibility-info h3 {
		margin-top: 0;
		margin-bottom: 0.75rem;
		color: var(--text);
	}

	.keyboard-guide ul,
	.accessibility-info ul {
		margin: 0;
		padding-left: 1.5rem;
	}

	.keyboard-guide li,
	.accessibility-info li {
		margin-bottom: 0.5rem;
		color: var(--gray-700);
	}

	kbd {
		display: inline-block;
		padding: 0.125rem 0.375rem;
		background: var(--gray-200);
		border: 1px solid var(--gray-300);
		border-radius: 0.25rem;
		font-family: monospace;
		font-size: 0.875rem;
		font-weight: 600;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	code {
		padding: 0.125rem 0.375rem;
		background: var(--gray-200);
		border-radius: 0.25rem;
		font-family: monospace;
		font-size: 0.875rem;
	}
</style>
