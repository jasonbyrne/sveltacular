# TagBox Component Improvements

## Overview
The TagBox component has been significantly enhanced with better autocomplete functionality, validation options, and improved user experience.

## Key Improvements

### 1. **Custom Autocomplete Dropdown**
- **Before**: Used native HTML `<datalist>` with limited functionality and styling
- **After**: Custom dropdown using the `Menu` component with:
  - Better visual styling consistent with the design system
  - Smooth keyboard navigation
  - Highlighted search text
  - Better accessibility with ARIA attributes

### 2. **Strict Mode** (`strict` prop)
- **Default**: `false` (allows any tag to be added)
- **When enabled**: Only tags from the autocomplete list can be added
- **Use case**: When you want to limit tags to predefined values (e.g., programming languages, countries)
- **Feedback**: Visual shake animation and ARIA announcement when invalid tag is attempted

### 3. **Case-Insensitive Duplicate Detection** (`caseInsensitive` prop)
- **Default**: `true`
- **When enabled**: "React" and "react" are treated as duplicates
- **When disabled**: "React" and "react" are treated as different tags
- **Benefit**: Prevents duplicate tags with different casing

### 4. **Maximum Tags Limit** (`maxTags` prop)
- **Default**: `undefined` (no limit)
- **When set**: Limits the number of tags that can be added
- **Feedback**: Visual shake animation and ARIA announcement when limit is reached
- **Use case**: "Select your top 3 skills", "Choose up to 5 categories"

### 5. **Enhanced Keyboard Navigation**
- **Arrow Down/Up**: Navigate through autocomplete suggestions
- **Enter**: Add currently typed tag or select highlighted suggestion
- **Tab**: Select highlighted suggestion (or first if none highlighted) and continue
- **Escape**: Close autocomplete dropdown
- **Backspace**: Remove last tag when input is empty
- **Separators** (comma, semicolon, etc.): Automatically add tag

### 6. **Visual Feedback for Invalid Actions**
- **Shake animation**: Input shakes when:
  - Trying to add a duplicate tag
  - Trying to add an invalid tag in strict mode
  - Maximum tags limit is reached
- **Red border**: Briefly shows on invalid attempts
- **ARIA announcements**: Screen readers announce the reason for rejection

### 7. **Smart Filtering**
- Autocomplete suggestions are filtered based on:
  - Current input text (case-insensitive by default)
  - Already selected tags (don't show duplicates in dropdown)
- Auto-highlights first suggestion for quick selection

### 8. **Better Accessibility**
- **ARIA live region**: Announces suggestion count and errors to screen readers
- **Proper ARIA attributes**: 
  - `role="combobox"` on input
  - `aria-expanded` for dropdown state
  - `aria-controls` linking to listbox
  - `aria-activedescendant` for highlighted item
- **Keyboard-only navigation**: Fully functional without mouse

### 9. **Empty Tag Prevention**
- **Automatic trimming**: All tags are trimmed before being added
- **Empty validation**: Empty strings and whitespace-only tags are rejected
- **Automatic filtering**: Any empty tags in the value array are automatically filtered out
- **Add button state**: The "Add" button is disabled when input is empty or contains only whitespace

## New Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `strict` | `boolean` | `false` | Only allow tags from autocomplete list |
| `caseInsensitive` | `boolean` | `true` | Case-insensitive duplicate detection |
| `maxTags` | `number \| undefined` | `undefined` | Maximum number of tags allowed |

## Usage Examples

### Basic Usage (Unchanged)
```svelte
<TagBox
  label="Tags"
  placeholder="Add a tag..."
  bind:value={tags}
/>
```

### With Autocomplete (Enhanced)
```svelte
<TagBox
  label="Skills"
  placeholder="Type to search..."
  bind:value={skills}
  autocomplete={['JavaScript', 'TypeScript', 'Python', 'Java']}
/>
```

### Strict Mode (New)
```svelte
<TagBox
  label="Programming Languages"
  placeholder="Select a language..."
  bind:value={languages}
  autocomplete={['JavaScript', 'TypeScript', 'Python', 'Java']}
  strict={true}
  helperText="Only languages from the list are allowed"
/>
```

### With Maximum Tags (New)
```svelte
<TagBox
  label="Top 3 Skills"
  placeholder="Add a skill..."
  bind:value={topSkills}
  autocomplete={skillsList}
  maxTags={3}
  helperText="Select up to 3 skills"
/>
```

### Combined Features (New)
```svelte
<TagBox
  label="Select Technologies"
  placeholder="Type to search..."
  bind:value={selectedTech}
  autocomplete={techList}
  strict={true}
  maxTags={5}
  caseInsensitive={true}
  helperText="Choose up to 5 technologies from the list"
/>
```

## Storybook Examples

New stories have been added to showcase all features:
- **Standard**: Basic tag input
- **WithTags**: Pre-populated tags
- **WithAutocomplete**: Enhanced autocomplete dropdown
- **StrictMode**: Only allow predefined tags
- **MaxTags**: Limit number of tags
- **StrictModeWithMaxTags**: Combined validation
- **CaseSensitiveDuplicates**: Case-sensitive mode
- **ImprovedKeyboardNavigation**: Keyboard shortcuts demo
- **LargeAutocompleteList**: Performance with many options

## Breaking Changes

None! All existing usage continues to work as before. All new features are opt-in.

## Technical Details

### Components Used
- `Menu`: For the autocomplete dropdown
- `Chip`: For displaying tags (unchanged)
- `FormField`: For field wrapper (unchanged)

### Performance
- Filtered suggestions are computed reactively using `$derived`
- Debouncing is not needed for local filtering (instant)
- Virtual scrolling can be enabled on Menu for very large lists (future enhancement)

### Accessibility Improvements
- ARIA live region for screen reader announcements
- Proper combobox pattern implementation
- Keyboard navigation follows WAI-ARIA best practices
- Visual and auditory feedback for all states

## Future Enhancement Ideas

1. **Async autocomplete**: Support for fetching suggestions from an API
2. **Virtual scrolling**: For very large autocomplete lists (>1000 items)
3. **Tag validation**: Custom validation function per tag
4. **Tag colors/categories**: Support for colored or categorized tags
5. **Drag to reorder**: Allow reordering tags by dragging
6. **Copy/paste tags**: Support pasting comma-separated tags
7. **Tag suggestions**: Show "similar" tags when entering free-form text
