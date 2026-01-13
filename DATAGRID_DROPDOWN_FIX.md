# DataGrid Dropdown Menu Overflow Fix

## Problem
When using action items with dropdown buttons in a DataGrid, the dropdown menus would get cut off when opened from rows near the bottom of the table. This was caused by:
1. Dropdown menus only opening downward
2. Table cells potentially clipping overflow content
3. No detection of available space before opening the menu

## Solution
Implemented automatic position detection and menu flipping for dropdown buttons in tables:

### 1. Enhanced DropdownButton Component
**File**: `src/lib/navigation/dropdown-button/dropdown-button.svelte`

- Added position detection logic that checks available space both above and below the button
- Automatically flips the menu to open upward when there's insufficient space below
- Handles both viewport boundaries and scrollable container boundaries (for virtual scroll tables)
- Enhanced z-index and added box-shadow for better visibility
- Inverted arrow rotation when opening upward

**Key Changes**:
```typescript
// Detects viewport and scroll container boundaries
$effect(() => {
  if (open && containerRef && menuRef) {
    // Check both viewport and scrollable parent containers
    // Flip menu upward if insufficient space below
    openUpward = spaceBelow < menuHeight && spaceAbove > spaceBelow;
  }
});
```

**CSS Changes**:
- Added `.open-upward` class that positions menu above button with `bottom: 100%`
- Updated border-radius to match opening direction
- Increased z-index to 1000 for better stacking
- Added box-shadow for visual depth

### 2. Updated TableCell Component
**File**: `src/lib/tables/table-cell.svelte`

- Added `overflow: visible` to action cells to prevent clipping
- Added `position: relative` to establish proper positioning context

### 3. Updated TableRow Component
**File**: `src/lib/tables/table-row.svelte`

- Added `position: relative` to establish positioning context for absolutely positioned dropdowns

### 4. Added Test Stories
**File**: `src/lib/tables/data-grid.stories.svelte`

- Added "WithActionsBottomRow" story to test dropdown behavior on last rows
- Added "WithPaginationAndActions" story to test dropdown on last row of each page

## Testing
To verify the fix:

1. Open Storybook and navigate to Tables/DataGrid
2. View "WithActionsBottomRow" or "WithActionsBottomRow" stories
3. Click on the dropdown button in the last few rows
4. The menu should automatically flip upward when near the bottom

## Technical Details

### Position Detection Algorithm
1. Calculate available space below button: `viewportHeight - containerRect.bottom`
2. Calculate available space above button: `containerRect.top`
3. Find nearest scrollable parent (with overflow-y: auto/scroll)
4. If scrollable parent exists, use more restrictive space constraints
5. Open upward if: `spaceBelow < menuHeight AND spaceAbove > spaceBelow`

### Browser Compatibility
- Uses standard DOM APIs (getBoundingClientRect, getComputedStyle)
- Works in all modern browsers
- No special polyfills required

## Additional Features

### Global Dropdown Management
Implemented a singleton dropdown manager to ensure only one dropdown can be open at a time:

**File**: `src/lib/navigation/dropdown-button/dropdown-manager.svelte.ts`

**Features**:
- Only one dropdown can be open at a time across the entire application
- Opening a new dropdown automatically closes any other open dropdown
- Click outside any dropdown automatically closes it
- Pressing Escape key closes the currently open dropdown
- Automatic cleanup when dropdown components are unmounted

**How it works**:
1. When a dropdown is clicked, it registers with the global manager
2. The manager closes any previously open dropdown
3. Click listeners on the document detect outside clicks and close dropdowns
4. Each dropdown syncs its state with the manager using Svelte 5 effects

This provides a cleaner, more professional UX where users don't have multiple overlapping menus cluttering the interface.

## Future Enhancements
Potential improvements for edge cases:
- Portal/teleport rendering for complex layouts
- Horizontal overflow detection (for narrow tables)
- Animation transitions when flipping direction
- Configurable flip behavior via props
- Optional prop to disable global dropdown management for special cases
