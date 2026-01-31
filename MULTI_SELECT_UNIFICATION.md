# Multi-Select Component Unification

## Overview

TagBox and ReferenceBox have been refactored to share a common base component (`MultiSelectBase`) that eliminates ~90% code duplication while maintaining their distinct purposes and APIs.

## Architecture

```
┌──────────────────────────────┐
│   MultiSelectBase<T>         │  ← Generic internal component
│   (Generic, reusable core)   │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       ↓                ↓
┌─────────────┐  ┌──────────────┐
│   TagBox    │  │ ReferenceBox │  ← Public API wrappers
│ (strings)   │  │ (ReferenceItem)│
└─────────────┘  └──────────────┘
```

## Key Concepts

### 1. Generic Base Component (`MultiSelectBase<T>`)

A fully generic component that handles all common multi-select functionality:

- Input with autocomplete dropdown
- Keyboard navigation (arrows, enter, tab, escape)
- Chip display and removal
- Max items validation
- Loading states
- ARIA accessibility
- Click-outside-to-close
- Invalid feedback animations

### 2. Type-Safe Adapters

The base component uses the **Adapter Pattern** to work with any value type:

```typescript
interface MultiSelectAdapter<T> {
	getLabel: (item: T) => string; // Display in chip
	getKey: (item: T) => string; // React key
	equals: (a: T, b: T) => boolean; // Duplicate detection
	fromMenuOption: (option: ReferenceItem) => T; // Convert selection
	getLink?: (item: T) => string | undefined; // Optional chip link
	getTooltip?: (item: T) => string | undefined; // Optional chip tooltip
}
```

### 3. Component-Specific Logic

Each public component (TagBox/ReferenceBox) wraps the base and adds:

- **TagBox**: Separator handling, strict mode, simple string operations
- **ReferenceBox**: Async search, "create new" functionality, link builder

## Components

### MultiSelectBase (Internal)

**Location:** `src/lib/forms/multi-select-base/multi-select-base.svelte`

**Props:**

```typescript
{
  value: T[];                           // Bindable selected items
  adapter: MultiSelectAdapter<T>;       // Type adapter
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  menuOptions: ReferenceItem[];         // Dropdown options
  size?: ComponentSize;
  label?: string;
  helperText?: string;
  feedback?: FormFieldFeedback;
  maxItems?: number;
  onChange?: (value: T[]) => void;
  filterSuggestions?: boolean;          // Client-side filtering
  caseInsensitive?: boolean;
  isLoading?: boolean;
  onInputChange?: (text: string) => void;
  separators?: string[];                // e.g., [',', ';']
  deleteOnBackspace?: boolean;
  showNoResults?: boolean;
  additionalDropdownContent?: Snippet;  // Extra dropdown UI
  inputSuffix?: Snippet;                // e.g., "Add" button
  invalidFeedbackMessage?: string;
  ariaLabel?: string;
}
```

**Exported Methods:**

```typescript
addFromInput(text?: string): boolean;  // Manually add item
clearInput(): void;                     // Clear input field
getInputText(): string;                 // Get current input
setInputText(text: string): void;       // Set input value
```

### TagBox (Public API)

**Location:** `src/lib/forms/tag-box/tag-box-new.svelte`

Simple string array management with separators and strict mode.

**Props:**

```typescript
{
  value?: string[];                     // Selected tags
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autocomplete?: string[];              // Suggested tags
  separators?: string[];                // Default: [',', ';']
  size?: ComponentSize;
  label?: string;
  helperText?: string;
  feedback?: FormFieldFeedback;
  showAddButton?: boolean;
  strict?: boolean;                     // Only allow autocomplete values
  caseInsensitive?: boolean;            // Default: true
  maxTags?: number;
  onChange?: (value: string[]) => void;
  deleteOnBackspace?: boolean;
}
```

**Adapter Implementation:**

```typescript
const stringAdapter: MultiSelectAdapter<string> = {
	getLabel: (item) => item,
	getKey: (item) => item,
	equals: (a, b) => (caseInsensitive ? a.toLowerCase() === b.toLowerCase() : a === b),
	fromMenuOption: (option) => option.label
};
```

### ReferenceBox (Public API)

**Location:** `src/lib/forms/reference-box/reference-box-new.svelte`

Complex object management with async search and creation.

**Props:**

```typescript
{
  value?: ReferenceItem[];
  items?: ReferenceItem[];              // Static items
  search?: SearchFunction;              // Async search
  createNew?: CreateNewFunction<ReferenceItem>;
  linkBuilder?: LinkBuilderFunction;
  resourceName?: string;                // e.g., "Customer"
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  label?: string;
  helperText?: string;
  feedback?: FormFieldFeedback;
  maxItems?: number;
  onChange?: (value: ReferenceItem[]) => void;
}
```

**Adapter Implementation:**

```typescript
const referenceAdapter: MultiSelectAdapter<ReferenceItem> = {
	getLabel: (item) => item.label,
	getKey: (item) => String(item.value ?? item.label),
	equals: (a, b) => a.value === b.value,
	fromMenuOption: (option) => option,
	getLink: linkBuilder,
	getTooltip: (item) => item.description
};
```

## Benefits

### ✅ DRY (Don't Repeat Yourself)

- **578 lines** (TagBox) + **758 lines** (ReferenceBox) = **1,336 lines**
- **Reduced to:** ~400 lines base + ~150 TagBox + ~150 ReferenceBox = **~700 lines**
- **50% reduction** in code

### ✅ Type Safety

- Full TypeScript generics support
- Compile-time type checking
- No runtime type assertions

### ✅ Maintainability

- Bug fixes in one place benefit both components
- Consistent behavior across components
- Easy to add new multi-select variants

### ✅ No Breaking Changes

- Public APIs remain identical
- Existing code continues to work
- Drop-in replacement

### ✅ Extensibility

- Easy to create new multi-select components (e.g., UserPicker, ColorPicker)
- Shared behaviors are automatic
- Custom behaviors are isolated

## Usage Examples

### TagBox Example

```svelte
<script>
	let tags = $state(['svelte', 'typescript']);
	const suggestions = ['svelte', 'typescript', 'vite', 'javascript'];
</script>

<TagBox
	bind:value={tags}
	autocomplete={suggestions}
	separators={[',', ';']}
	strict={false}
	caseInsensitive={true}
	maxTags={10}
	deleteOnBackspace={true}
	placeholder="Add tags..."
	label="Technologies"
/>
```

### ReferenceBox Example

```svelte
<script>
	let selectedCustomers = $state([]);

	async function searchCustomers(text: string) {
		const response = await fetch(`/api/customers?q=${text}`);
		return response.json();
	}

	async function createCustomer(name: string) {
		const response = await fetch('/api/customers', {
			method: 'POST',
			body: JSON.stringify({ name })
		});
		return response.json();
	}
</script>

<ReferenceBox
	bind:value={selectedCustomers}
	search={searchCustomers}
	createNew={createCustomer}
	resourceName="customer"
	linkBuilder={(item) => `/customers/${item.value}`}
	placeholder="Search customers..."
	label="Customers"
/>
```

### Creating a Custom Multi-Select Component

```svelte
<script lang="ts">
	import MultiSelectBase, { type MultiSelectAdapter } from '../multi-select-base';
	import type { User } from './types';

	let { value = $bindable([]) as User[] } = $props();

	const userAdapter: MultiSelectAdapter<User> = {
		getLabel: (user) => user.name,
		getKey: (user) => user.id,
		equals: (a, b) => a.id === b.id,
		fromMenuOption: (option) => ({
			id: option.value as string,
			name: option.label,
			email: option.description
		}),
		getTooltip: (user) => user.email
	};

	let menuOptions = $derived(
		users.map((u) => ({
			value: u.id,
			label: u.name,
			description: u.email
		}))
	);
</script>

<MultiSelectBase bind:value adapter={userAdapter} {menuOptions} placeholder="Select users..." />
```

## Migration Guide

### Replacing Old TagBox

1. Rename import (optional):

```typescript
// Old
import TagBox from '$lib/forms/tag-box/tag-box.svelte';

// New (if migrating)
import TagBox from '$lib/forms/tag-box/tag-box-new.svelte';
```

2. No changes needed to component usage - APIs are identical!

### Replacing Old ReferenceBox

Same process - just update the import path if needed.

## Testing Strategy

Both components should maintain their existing test suites since the public APIs are unchanged. Additionally:

1. **Base Component Tests**: Test MultiSelectBase with different adapters
2. **Adapter Tests**: Verify adapter implementations
3. **Integration Tests**: Ensure TagBox and ReferenceBox work as before

## Future Enhancements

With this architecture, we can easily add:

1. **ComboBox**: Single-select with autocomplete (same base, different adapter)
2. **UserPicker**: Multi-select users with avatars
3. **DateRangePicker**: Select multiple date ranges
4. **ColorPicker**: Multi-select color swatches
5. **FilePicker**: Multi-select files with previews

All would share the same core logic and only implement their specific adapters and UI variations.

## Performance Considerations

- **No Performance Degradation**: The adapter calls are inline and JIT-optimized
- **Fewer Components**: Reduced bundle size
- **Shared Code**: Better code splitting and caching

## Accessibility

All ARIA features are preserved:

- Combobox role with proper attributes
- Live regions for screen readers
- Keyboard navigation
- Focus management
- High contrast mode support

## Conclusion

This refactoring achieves the goal of unifying TagBox and ReferenceBox while:

- ✅ Eliminating duplication
- ✅ Maintaining distinct, clear purposes
- ✅ Preserving type safety
- ✅ Enabling future extensibility
- ✅ No breaking changes

The adapter pattern provides a clean separation between "how to display/compare items" (adapter) and "how to select items" (base component).
