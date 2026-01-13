# Global Dropdown Management Implementation

## Overview
Implemented a singleton dropdown manager that ensures only one dropdown can be open at a time across the entire application, providing a cleaner and more professional user experience.

## Problem Solved
Previously, users could open multiple dropdown buttons simultaneously, leading to:
- Cluttered interface with overlapping menus
- Confusing UX where multiple actions are visible at once
- No automatic cleanup when clicking outside dropdowns

## Solution Architecture

### 1. Dropdown Manager (Singleton Pattern)
**File**: `src/lib/navigation/dropdown-button/dropdown-manager.svelte.ts`

A global state manager using Svelte 5 runes to track and control dropdown state:

```typescript
let openDropdownId: string | null = $state(null);

export const dropdownManager = {
  open(id: string): boolean,    // Open dropdown, close others
  close(id: string): void,      // Close specific dropdown
  isOpen(id: string): boolean,  // Check if dropdown is open
  closeAll(): void              // Close all dropdowns
};
```

**Key Features**:
- Singleton instance shared across all dropdown components
- Uses Svelte 5 `$state` for reactivity
- Simple, type-safe API
- Automatic state synchronization

### 2. Updated DropdownButton Component
**File**: `src/lib/navigation/dropdown-button/dropdown-button.svelte`

Integrated the global manager with existing dropdown functionality:

#### State Management
```typescript
const onClick = () => {
  const shouldOpen = dropdownManager.open(id);
  open = shouldOpen;
};
```

#### Global State Synchronization
```typescript
// Sync with global manager
$effect(() => {
  const isOpen = dropdownManager.isOpen(id);
  if (isOpen !== open) {
    open = isOpen;
  }
});

// Close when another dropdown opens
$effect(() => {
  if (!dropdownManager.isOpen(id) && open) {
    open = false;
  }
});
```

#### Outside Click Detection
```typescript
$effect(() => {
  if (!open) return;

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef && !containerRef.contains(e.target as Node)) {
      dropdownManager.close(id);
      open = false;
    }
  };

  // Add listener after small delay to avoid immediate closure
  const timeoutId = setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);

  return () => {
    clearTimeout(timeoutId);
    document.removeEventListener('click', handleClickOutside);
  };
});
```

#### Cleanup on Unmount
```typescript
$effect(() => {
  return () => {
    dropdownManager.close(id);
  };
});
```

## User Experience Benefits

### 1. Single Dropdown at a Time
- Opening a new dropdown automatically closes any other open dropdown
- Prevents visual clutter and confusion
- Maintains focus on current user action

### 2. Click Outside to Close
- Clicking anywhere outside an open dropdown closes it
- Standard UX pattern users expect
- Works across entire document

### 3. Keyboard Support
- Pressing **Escape** key closes the currently open dropdown
- Returns focus to the dropdown button
- Maintains accessibility standards

### 4. Automatic Cleanup
- Dropdowns are removed from manager when component unmounts
- No memory leaks or stale references
- Clean state management lifecycle

## Testing

### Storybook Stories
**File**: `src/lib/navigation/dropdown-button/dropdown-button.stories.svelte`

Added **MultipleDropdowns** story demonstrating:
- Three dropdown buttons side by side
- Only one can be open at a time
- Click outside or press Escape to close
- Visual feedback of global management

### Manual Testing Checklist
- [ ] Open dropdown 1, then dropdown 2 → dropdown 1 closes automatically
- [ ] Open dropdown, click outside → dropdown closes
- [ ] Open dropdown, press Escape → dropdown closes
- [ ] Open dropdown in datagrid row 1, open dropdown in row 5 → first closes
- [ ] Navigate between pages with dropdowns → state resets correctly
- [ ] Unmount component with open dropdown → no console errors

## Implementation Notes

### Why Singleton Pattern?
- Shared state across all dropdown instances
- Single source of truth for open/closed state
- Minimal memory footprint
- Easy to extend with additional features

### Why $state() Instead of Stores?
- Simpler syntax with Svelte 5 runes
- Better performance (fine-grained reactivity)
- Type-safe by default
- Aligns with Svelte 5 best practices

### Why Timeout for Click Listener?
```typescript
setTimeout(() => {
  document.addEventListener('click', handleClickOutside);
}, 0);
```
Without the timeout, the same click that opens the dropdown would immediately trigger the outside click handler and close it. The timeout defers listener registration until after the current event cycle.

### DOM Ref Linter Warning
The Svelte linter shows a warning about `menuRef` not using `$state()`. This is a false positive:
- DOM element refs with `bind:this` don't need `$state()`
- They're not reactive state - just references to DOM elements
- The implementation follows official Svelte 5 patterns
- The warning can be safely ignored

## Browser Compatibility
- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **IE11**: Not supported (uses modern JavaScript features)
- **Mobile**: Full support (iOS Safari, Chrome Android)

## Performance Considerations
- Minimal overhead: Single global state variable
- Event listeners added/removed efficiently
- No unnecessary re-renders
- Cleanup prevents memory leaks

## API Reference

### dropdownManager.open(id: string): boolean
Opens a dropdown and closes any other open dropdown.
- **Parameters**: `id` - Unique identifier for the dropdown
- **Returns**: `true` if dropdown opened, `false` if it was toggled closed
- **Side Effects**: Closes any other open dropdown

### dropdownManager.close(id: string): void
Closes a specific dropdown.
- **Parameters**: `id` - Unique identifier for the dropdown
- **Side Effects**: Updates global state if this dropdown was open

### dropdownManager.isOpen(id: string): boolean
Checks if a specific dropdown is currently open.
- **Parameters**: `id` - Unique identifier for the dropdown
- **Returns**: `true` if this dropdown is open, `false` otherwise

### dropdownManager.closeAll(): void
Closes all dropdowns.
- **Side Effects**: Resets global state to null

## Future Enhancements

### Potential Improvements
1. **Nested Dropdowns**: Support for dropdown menus within dropdown menus
2. **Groups**: Allow multiple dropdowns within a group to be open simultaneously
3. **Opt-out**: Add prop to disable global management for special cases
4. **Animation**: Coordinate transitions when switching between dropdowns
5. **Focus Management**: Improved keyboard navigation between dropdowns
6. **Analytics**: Track dropdown usage patterns

### Example: Opt-out Feature
```typescript
<DropdownButton text="Actions" disableGlobalManagement={true}>
  <!-- This dropdown won't close others -->
</DropdownButton>
```

## Related Files
- `src/lib/navigation/dropdown-button/dropdown-button.svelte`
- `src/lib/navigation/dropdown-button/dropdown-manager.svelte.ts`
- `src/lib/navigation/dropdown-button/dropdown-button.stories.svelte`
- `src/lib/tables/data-grid.svelte` (uses DropdownButton)
- `src/lib/tables/data-grid.stories.svelte` (demonstrates in tables)

## Migration Notes
This feature is **backward compatible** - existing dropdown buttons automatically benefit from global management with no code changes required. The `open` bindable prop still works as expected for programmatic control.
