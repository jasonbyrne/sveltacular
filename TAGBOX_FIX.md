# TagBox Fix: Separator and Enter Key Issues

## Problem
TagBox was not adding new tags when users pressed comma or Enter keys. The tags would not populate in the array despite the user attempting to add them.

## Root Cause
The issue was in the `MultiSelectBase` component's separator handling:

1. **Separator Detection (Comma)**: When a separator character was detected in `handleInput()`, the component would:
   - Extract the text before the separator
   - Set `inputText = textBeforeSeparator`
   - Notify the parent via `onInputChange(inputText)`
   - **Immediately clear** `inputText = ''` (Line 244)
   - When TagBox's `handleSeparatorInput()` tried to get the text via `getInputText()`, it was already empty!

2. **Enter Key**: The Enter key handler only worked for selecting from the dropdown menu. It didn't handle free-text entry for TagBox, so pressing Enter with typed text did nothing.

## Solution

### Fix 1: Separator Handling in MultiSelectBase
Modified `handleInput()` to:
- Keep the trimmed text in `inputText` instead of clearing it immediately
- Pass `inputText + lastChar` to the parent so it knows a separator was triggered
- Let the parent component (TagBox) handle clearing the input after successfully processing

```typescript
// Before: inputText was cleared immediately
inputText = textBeforeSeparator;
onInputChange?.(inputText);
inputText = ''; // ❌ Too early!

// After: Keep the text for parent to retrieve
inputText = textBeforeSeparator;
onInputChange?.(inputText + lastChar); // Include separator to signal parent
// Parent clears input after processing ✓
```

### Fix 2: Enter Key Support in MultiSelectBase
Modified `handleKeydown()` to:
- Check if there's input text when Enter is pressed
- If no dropdown selection is active, treat Enter like a separator
- Pass the text with `\n` character to signal Enter was pressed

```typescript
else if (inputText.trim()) {
    // Treat Enter like a separator for free-text entry
    const trimmedText = inputText.trim();
    inputText = trimmedText;
    onInputChange?.(trimmedText + '\n');
}
```

### Fix 3: TagBox Separator Detection
Updated `onInputChangeWithSeparators()` to:
- Check for both configured separators AND the `\n` character (indicating Enter)
- Call `handleSeparatorInput()` when either is detected

```typescript
const lastChar = text[text.length - 1];
const isSeparator = separators.includes(lastChar);
const isEnter = lastChar === '\n';

if (isSeparator || isEnter) {
    handleSeparatorInput();
}
```

## Flow After Fix

### Adding a tag with comma:
1. User types "hello,"
2. MultiSelectBase detects comma
3. Sets `inputText = "hello"`
4. Calls `onInputChange("hello,")`
5. TagBox detects comma at end
6. Calls `handleSeparatorInput()`
7. Gets "hello" via `getInputText()`
8. Validates and adds tag
9. Clears input via `clearInput()`
✓ Tag added successfully!

### Adding a tag with Enter:
1. User types "world" and presses Enter
2. MultiSelectBase detects Enter key
3. Sets `inputText = "world"`
4. Calls `onInputChange("world\n")`
5. TagBox detects `\n` at end
6. Calls `handleSeparatorInput()`
7. Gets "world" via `getInputText()`
8. Validates and adds tag
9. Clears input via `clearInput()`
✓ Tag added successfully!

## Files Changed
1. `/src/lib/forms/multi-select-base/multi-select-base.svelte`
   - Modified `handleInput()` separator handling
   - Modified `handleKeydown()` Enter key handling

2. `/src/lib/forms/tag-box/tag-box.svelte`
   - Modified `onInputChangeWithSeparators()` to detect Enter key

## Testing
- Existing tests pass (no regressions)
- Manual testing recommended:
  - Open TagBox story in Storybook
  - Type text and press comma - should add tag
  - Type text and press Enter - should add tag
  - Type text and press semicolon - should add tag (default separator)

## Impact
This fix also benefits any other components using MultiSelectBase with separators, including ReferenceBox if it's configured with separators in the future.
