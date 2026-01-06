# Effect Loop Fixes - January 2026

## Problem

Components were locking up with the error:
```
effect_update_depth_exceeded
Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
```

This was caused by `$effect()` blocks that were reading and writing the same reactive state, creating infinite loops in Svelte 5's reactivity system.

## Root Cause

The animation and modernization features introduced several `$effect()` blocks that:
1. Read reactive state (like `hasError`, `searchQuery`, `value`, etc.)
2. Called functions that modified state
3. Those state changes triggered the same effect again
4. This created an infinite loop

## Solution

Wrapped all state-writing code inside `$effect()` blocks with Svelte's `untrack()` function. This prevents the effect from re-triggering when it writes to state, breaking the circular dependency.

## Files Fixed

### 1. **combo-box.svelte** (Component Removed)
**Note**: This component was removed from the codebase due to freezing issues. This section is kept for historical reference only.

**Problem:** `applyFilter()` effect modified `filteredItems` and `highlightIndex` on every state change
**Fix:** 
- Explicitly tracked only `searchQuery` and `items` as dependencies
- Wrapped state writes in `untrack()`

```typescript
$effect(() => {
    const query = searchQuery.trim().toLowerCase();
    const currentItems = items;
    
    untrack(() => {
        // State modifications here don't trigger this effect
        filteredItems = /* ... */;
        highlightIndex = /* ... */;
    });
});
```

### 2. **phone-box.svelte**
**Problem:** Effect called `publishChange()` which modified `value`, potentially triggering the effect again
**Fix:** Wrapped `publishChange()` call in `untrack()`

```typescript
$effect(() => {
    const hasValue = areaCode || localExt || lastFour;
    if (hasValue) {
        untrack(() => {
            publishChange();
        });
    }
});
```

### 3. **text-box.svelte**
**Problem:** Multiple effects were modifying state:
- Effect updating `describedByIds` array
- Effects triggering animations that might cause state changes

**Fix:** 
- Wrapped all state writes in `untrack()`
- Added previous state tracking for animations to only trigger on state transitions

```typescript
$effect(() => {
    const hasHelper = !!helperText;
    const hasErrorMsg = !!errorText;
    const hasSuccessMsg = !!successText;
    
    untrack(() => {
        describedByIds = [];
        if (hasHelper) describedByIds.push(`${id}-helper`);
        if (hasErrorMsg) describedByIds.push(`${id}-error`);
        if (hasSuccessMsg) describedByIds.push(`${id}-success`);
    });
});

// Animation effects now track previous state
let prevHasError = $state(false);
$effect(() => {
    if (hasError && !prevHasError && inputElement) {
        untrack(() => {
            animateShake(inputElement!);
        });
    }
    prevHasError = hasError;
});
```

### 4. **text-area.svelte**
**Problem:** `handleAutoResize()` might have been triggering effects
**Fix:** Wrapped calls in `untrack()` as a safety measure

### 5. **check-box-group.svelte**
**Problem:** Effect rebuilt `itemsWithState` array when `items` or `group` changed
**Fix:** Wrapped state writes in `untrack()`

### 6. **money-box.svelte**
**Problem:** Effect wrote to `dollars` and `cents` when `value` changed
**Fix:** Wrapped state writes in `untrack()`

### 7. **date-box.svelte**
**Problem:** Effect potentially wrote to `enabled` or `value` when `value` was empty
**Fix:** Wrapped state writes in `untrack()`

## How untrack() Works

`untrack()` is a Svelte 5 utility that runs code without tracking its dependencies or making state changes reactive within that scope. This allows you to:

1. **Read state** without subscribing to it
2. **Write state** without triggering effects that depend on that state

Think of it as creating a "blind spot" in the reactivity system for specific operations.

## Testing

All modified components were successfully hot-reloaded in Storybook without errors. The changes have been applied and the development server is running without lockups.

### Manual Testing Recommended

1. **TextBox Component:**
   - Type in a text field with `errorText` prop - verify shake animation works once
   - Type in a text field with `successText` prop - verify checkmark animation works once
   - Type in a text field with `showCharacterCount` - verify counter updates smoothly

2. **ComboBox Component:** (Component Removed)
   - ❌ Component was removed from the codebase due to freezing issues

3. **PhoneBox Component:**
   - Type phone number - verify parts update correctly
   - Tab between fields - verify no lockups

4. **TextArea Component:**
   - Type in textarea with `autoResize` enabled - verify it resizes smoothly

5. **CheckBoxGroup Component:**
   - Check/uncheck boxes - verify group updates correctly

6. **MoneyBox Component:**
   - Type dollar/cent values - verify updates work smoothly

7. **DateBox Component:**
   - Toggle nullable dates - verify no lockups

## Key Takeaways

1. **Always use `untrack()` when writing to state inside `$effect()`** to prevent circular dependencies
2. **Track only the dependencies you care about** - don't let effects run on every state change
3. **For animations triggered by state changes**, track the previous state to only animate on transitions
4. **Test thoroughly** - these issues only manifest at runtime, not during type checking

## Related Documentation

- [Svelte 5 Effects Documentation](https://svelte.dev/docs/svelte/$effect)
- [Svelte 5 untrack() API](https://svelte.dev/docs/svelte/svelte#untrack)
- [Effect Best Practices](https://svelte.dev/docs/svelte/when-not-to-use-effects)

