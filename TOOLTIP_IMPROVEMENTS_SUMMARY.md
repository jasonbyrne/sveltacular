# Tooltip Component - Complete Rewrite Summary

## Overview

The Tooltip component has been completely rewritten from scratch to meet best-in-breed standards based on research of leading Svelte 5 tooltip implementations including Bits UI, Melt UI, TheUI, Flowbite-Svelte, and other modern component libraries.

## Key Problems Solved

### Previous Issues
1. **Inconsistent behavior** - Dual positioning modes (autoPosition vs legacy) caused confusion
2. **Incorrect ARIA roles** - `role="button"` on wrapper was semantically incorrect
3. **Non-standard keyboard interaction** - Enter/Space toggled tooltip which isn't standard
4. **Limited functionality** - No delay options, no controlled state, text-only content
5. **Poor mobile support** - No consideration for touch devices
6. **Memory leaks** - Improper cleanup of event listeners
7. **Focus trigger not working** - Wrapper was not focusable
8. **Empty content showing** - Tooltips with empty/null text still appeared

### Solutions Implemented
✅ **Unified positioning system** - Single, consistent positioning approach using the existing `usePosition` helper
✅ **Proper accessibility** - Correct ARIA attributes, proper keyboard support (Escape to close)
✅ **Multiple trigger modes** - hover, focus, click, and manual/controlled modes
✅ **Delay controls** - Configurable open and close delays
✅ **Rich content support** - Both text strings and Svelte snippets
✅ **Disabled state** - Proper disabled state with visual feedback
✅ **Better mobile UX** - Considerations for touch devices
✅ **Proper cleanup** - All event listeners and timeouts properly cleaned up
✅ **Focus trigger fixed** - Wrapper is focusable when trigger is 'focus' or 'click'
✅ **Content validation** - Tooltips with empty/null/undefined text do not appear

---

## New Features

### 1. Title/Heading Support

Add an optional title that displays prominently above the tooltip content:

```svelte
<!-- Title + Text -->
<Tooltip title="Pro Tip" text="Keyboard shortcuts save time">
  <Button label="Help" />
</Tooltip>

<!-- Title only -->
<Tooltip title="New Feature">
  <Badge text="Beta" />
</Tooltip>

<!-- Title with custom content -->
<Tooltip title="Requirements">
  {#snippet content()}
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  {/snippet}
  <Button label="Info" />
</Tooltip>
```

The title is styled with:
- Bold font weight (600)
- Slightly larger font size (0.9375rem vs 0.875rem)
- Customizable via `--tooltip-title-fg` CSS variable
- Proper spacing from body content (0.25rem gap)

### 2. Multiple Trigger Modes

```svelte
<!-- Hover (default) -->
<Tooltip text="Hover to see" trigger="hover">
  <Button label="Hover me" />
</Tooltip>

<!-- Focus (keyboard accessible) -->
<Tooltip text="Focus to see" trigger="focus">
  <Button label="Tab to me" />
</Tooltip>

<!-- Click (toggle) -->
<Tooltip text="Click to toggle" trigger="click">
  <Button label="Click me" />
</Tooltip>

<!-- Manual (controlled) -->
<Tooltip text="Controlled" trigger="manual" bind:open={myState}>
  <Button label="Controlled" />
</Tooltip>
```

### 3. Delay Controls

```svelte
<!-- Open after 500ms -->
<Tooltip text="Delayed" openDelay={500}>
  <Button label="Hover me" />
</Tooltip>

<!-- Close after 300ms -->
<Tooltip text="Stays open" closeDelay={300}>
  <Button label="Hover me" />
</Tooltip>

<!-- Both delays -->
<Tooltip text="Both delays" openDelay={300} closeDelay={300}>
  <Button label="Hover me" />
</Tooltip>
```

### 4. Rich Content Support

```svelte
<!-- Simple text -->
<Tooltip text="Simple text">
  <Button label="Button" />
</Tooltip>

<!-- Title + Text -->
<Tooltip title="Pro Tip" text="Keyboard shortcuts speed up your workflow">
  <Button label="Title + Text" />
</Tooltip>

<!-- Title only -->
<Tooltip title="Important!">
  <Button label="Title only" />
</Tooltip>

<!-- Rich content with snippets (for complex layouts) -->
<Tooltip>
  {#snippet content()}
    <div>
      <strong>Pro Tip!</strong>
      <p>Use Ctrl+K for shortcuts</p>
    </div>
  {/snippet}
  <Button label="Rich content" />
</Tooltip>
```

### 5. Advanced Positioning

All 12 placement options from the positioning system:

```typescript
type Placement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';
```

```svelte
<Tooltip text="Positioned" placement="bottom-start">
  <Button label="Button" />
</Tooltip>
```

### 6. Disabled State

```svelte
<Tooltip text="Won't show" disabled>
  <Button label="Disabled" />
</Tooltip>
```

### 7. Custom Styling

```svelte
<Tooltip text="Custom" class="my-tooltip">
  <Button label="Button" />
</Tooltip>
```

### 8. Content Validation

Tooltips automatically validate content and will **not appear** if:
- `title`, `text`, and `content` are all empty/null/undefined
- `text` is only whitespace and no `title` or `content` provided
- All content values are falsy

```svelte
<!-- These will NOT show tooltips -->
<Tooltip text="">
  <Button label="Empty" />
</Tooltip>

<Tooltip text={undefined}>
  <Button label="Undefined" />
</Tooltip>

<Tooltip text="   ">
  <Button label="Whitespace" />
</Tooltip>

<!-- This WILL show (title is valid) -->
<Tooltip title="Warning!">
  <Button label="Has title" />
</Tooltip>
```

This prevents empty tooltips from appearing and causing confusion.

---

## Title vs Text vs Content

The tooltip supports three types of content that can be used together:

### Title (Optional Heading)
- **Use for:** Short heading or label
- **Styling:** Bold, slightly larger text
- **Example:** `title="Pro Tip"`

### Text (Body Content)
- **Use for:** Main tooltip message
- **Styling:** Regular text below title
- **Example:** `text="Save your work regularly"`

### Content (Custom Snippet)
- **Use for:** Complex layouts (lists, formatted text, etc.)
- **Styling:** Full control over markup
- **Example:** Custom HTML with lists, code blocks, etc.

### Best Practices

```svelte
<!-- ✅ Good: Title + Text for structured info -->
<Tooltip title="Password Requirements" text="At least 8 characters with one number">
  <Button label="Help" />
</Tooltip>

<!-- ✅ Good: Title only for brief labels -->
<Tooltip title="New Feature">
  <Badge text="Beta" />
</Tooltip>

<!-- ✅ Good: Text only for simple tooltips -->
<Tooltip text="Click to copy">
  <Icon name="copy" />
</Tooltip>

<!-- ✅ Good: Content snippet for complex layouts -->
<Tooltip>
  {#snippet content()}
    <ul>
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  {/snippet}
  <Button label="Features" />
</Tooltip>

<!-- ❌ Avoid: Title in content snippet (use title prop) -->
<Tooltip>
  {#snippet content()}
    <strong>Title</strong>
    <p>Text</p>
  {/snippet}
  <Button label="Bad" />
</Tooltip>
```

---

## Complete API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string \| undefined` | `undefined` | Optional title/heading displayed above content |
| `text` | `string \| undefined` | `undefined` | Simple text content for tooltip body |
| `content` | `Snippet \| undefined` | `undefined` | Rich content snippet (overrides text) |
| `placement` | `Placement` | `'top'` | Position relative to trigger element |
| `offset` | `number` | `8` | Distance in pixels from trigger |
| `arrow` | `boolean` | `true` | Show arrow pointing to trigger |
| `trigger` | `'hover' \| 'focus' \| 'click' \| 'manual'` | `'hover'` | How tooltip is triggered |
| `openDelay` | `number` | `0` | Delay in ms before showing |
| `closeDelay` | `number` | `0` | Delay in ms before hiding |
| `open` | `boolean` (bindable) | `false` | Controlled open state |
| `disabled` | `boolean` | `false` | Disable tooltip completely |
| `class` | `string` | `''` | Additional CSS classes for trigger |
| `children` | `Snippet` (required) | - | Trigger element content |

### Placement Options

```typescript
'top' | 'top-start' | 'top-end' |
'bottom' | 'bottom-start' | 'bottom-end' |
'left' | 'left-start' | 'left-end' |
'right' | 'right-start' | 'right-end'
```

---

## Accessibility Features

### ARIA Support

- ✅ `aria-describedby` - Links tooltip to trigger element
- ✅ `aria-expanded` - Shows state for click mode
- ✅ `aria-live="polite"` - Announces tooltip content to screen readers
- ✅ `role="tooltip"` - Proper semantic role

### Keyboard Navigation

- ✅ **Tab** - Focus triggers in focus mode
- ✅ **Escape** - Closes open tooltip
- ✅ **Enter/Space** - Toggles tooltip in click mode
- ✅ **Focus indicators** - Clear visual focus states

### Screen Reader Support

- Tooltips are announced when opened
- Content is properly associated with trigger
- State changes are communicated

---

## Behavioral Improvements

### Hover Mode
- Shows on `mouseenter`, hides on `mouseleave`
- Tooltip stays open when hovering over it
- Respects open/close delays
- Closes on Escape key

### Focus Mode
- Shows on `focus`, hides on `blur`
- Keyboard accessible with Tab navigation
- Wrapper is made focusable with `tabindex="0"`
- Closes on Escape key
- No toggle behavior (standard tooltip pattern)
- Ideal for keyboard-only users

### Click Mode
- Toggles on click
- Closes on click outside
- Closes on Escape key
- Keyboard accessible (Enter/Space to toggle)
- Shows `aria-expanded` state

### Manual Mode
- Fully controlled by parent component
- Bind to `open` prop for state management
- No automatic triggers
- Useful for programmatic control

---

## Smart Positioning

The tooltip uses the existing `usePosition` helper for intelligent positioning:

- ✅ **Auto-flip** - Flips to opposite side if doesn't fit
- ✅ **Auto-align** - Adjusts alignment to stay in viewport
- ✅ **Viewport padding** - Maintains safe distance from edges
- ✅ **Smart arrows** - Arrow always points to trigger center
- ✅ **Scroll/resize updates** - Position updates automatically

---

## Storybook Examples

The new stories showcase:

1. **Default (Hover Top)** - Basic usage
2. **All Placements** - All 12 placement options
3. **Trigger Modes** - Hover, Focus, Click, Manual
4. **Delays** - Open delay, close delay, both delays
5. **Arrow Variations** - With and without arrows
6. **With Title** - Title + text, title only combinations
7. **Content Types** - Text, rich content, lists
8. **Long Content** - Text wrapping with and without title
9. **Empty Content** - Validation of empty content
10. **Disabled State** - Disabled tooltip
11. **Different Elements** - Button, Badge, Link, Text
12. **Edge Cases** - Viewport edge handling
13. **Multiple Tooltips** - Multiple instances
14. **Keyboard Navigation** - Accessibility demo
15. **Real World** - Help icons in forms with titles

---

## Migration Guide

### Before (Old API)

```svelte
<Tooltip 
  text="My tooltip" 
  position="top" 
  autoPosition={true}
  arrow={true}
>
  <Button label="Button" />
</Tooltip>
```

### After (New API)

```svelte
<Tooltip 
  text="My tooltip" 
  placement="top"
  arrow={true}
>
  <Button label="Button" />
</Tooltip>
```

### Breaking Changes

1. ❌ `position` prop removed → Use `placement` instead
2. ❌ `autoPosition` prop removed → Always auto-positions now
3. ⚠️ Wrapper is now `<span>` instead of `<div>` with `role="button"`
4. ⚠️ Keyboard behavior changed - no Enter/Space toggle in hover mode

### New Features (Backward Compatible)

1. ✅ `trigger` prop - Choose trigger mode
2. ✅ `openDelay` / `closeDelay` props - Add delays
3. ✅ `content` snippet - Rich content support
4. ✅ `disabled` prop - Disable tooltip
5. ✅ `open` bindable prop - Controlled state
6. ✅ `class` prop - Custom trigger styling

---

## CSS Custom Properties

Customize tooltip appearance using CSS variables:

```css
:root {
  --tooltip-bg: #1a1a1a;           /* Background color */
  --tooltip-fg: #ffffff;            /* Text color */
  --tooltip-title-fg: #ffffff;     /* Title text color (defaults to tooltip-fg) */
  --radius-md: 0.375rem;            /* Border radius */
  --font-sm: 0.875rem;              /* Body font size */
  --shadow-lg: ...;                 /* Box shadow */
}
```

### Example Customization

```css
/* Lighter tooltip with colored title */
.my-tooltip {
  --tooltip-bg: #f9fafb;
  --tooltip-fg: #111827;
  --tooltip-title-fg: #6366f1;
}

/* Dark tooltip with accent title */
.dark-tooltip {
  --tooltip-bg: #1f2937;
  --tooltip-fg: #e5e7eb;
  --tooltip-title-fg: #fbbf24;
}
```

---

## Implementation Details

### State Management

Uses Svelte 5 runes for reactive state:
- `$state` - For open state, refs, timeouts
- `$derived` - For computed handlers, ARIA attributes
- `$effect` - For side effects (click outside, position updates, cleanup)

### Memory Management

Proper cleanup of:
- ✅ Event listeners (mouse, keyboard, click outside)
- ✅ Timeouts (open delay, close delay)
- ✅ Position manager (scroll, resize listeners)

### Performance

- Uses `requestAnimationFrame` for position updates
- Passive event listeners for scroll
- Conditional rendering (tooltip only in DOM when open)
- Efficient derived computations

---

## Testing Recommendations

### Manual Testing Checklist

1. **Hover Mode**
   - [ ] Shows on hover
   - [ ] Hides on leave
   - [ ] Stays open when hovering tooltip
   - [ ] Respects delays

2. **Focus Mode**
   - [ ] Shows on focus (Tab)
   - [ ] Hides on blur
   - [ ] Closes on Escape

3. **Click Mode**
   - [ ] Toggles on click
   - [ ] Closes on outside click
   - [ ] Closes on Escape
   - [ ] Works with Enter/Space

4. **Positioning**
   - [ ] Flips at viewport edges
   - [ ] Arrow points correctly
   - [ ] All 12 placements work

5. **Accessibility**
   - [ ] Screen reader announces content
   - [ ] Keyboard navigation works
   - [ ] Focus indicators visible

6. **Mobile**
   - [ ] Touch behavior appropriate
   - [ ] Viewport constraints respected

### Automated Testing

Consider adding tests for:
- Trigger modes (hover, focus, click)
- Delay functionality
- Click outside behavior
- Keyboard interactions
- ARIA attributes
- Position calculations

---

## Browser Compatibility

Works with all modern browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

Requires:
- Svelte 5
- Modern CSS (CSS variables, animations)
- Modern JavaScript (ES2020+)

---

## Comparison to Other Libraries

### Bits UI
- ✅ Similar trigger modes (hover, focus, click)
- ✅ Rich content support
- ✅ Controlled state
- ✅ Accessibility features

### Melt UI
- ✅ Headless approach (we have our own positioning)
- ✅ Accessibility-first
- ✅ Flexible content

### TheUI
- ✅ Multiple trigger modes
- ✅ Animation support
- ✅ Positioning options

### Flowbite-Svelte
- ✅ Multiple placements
- ✅ Arrow support
- ✅ Animation transitions

Our implementation matches or exceeds these libraries while maintaining consistency with the existing Sveltacular design system.

---

## Future Enhancements

Potential future improvements:

1. **Animation customization** - Allow custom enter/exit animations
2. **Portal target** - Allow specifying portal container
3. **Group management** - Close other tooltips when one opens
4. **Touch long-press** - Better mobile interaction
5. **Max width control** - Prop for custom max width
6. **Interactive mode** - Allow clicking links inside tooltip
7. **Follow cursor** - Tooltip follows mouse pointer
8. **Multiple triggers** - Combine trigger modes (e.g., hover + focus)

---

## Resources

### Research Sources
- [Bits UI Tooltip](https://bits-ui.com/docs/components/tooltip)
- [Melt UI](https://melt-ui.com)
- [TheUI Tooltip](https://theui.dev/docs/tooltip)
- [Flowbite-Svelte Tooltip](https://flowbite-svelte.com/docs/components/tooltip)
- [Svelte Plugins Tooltips](https://svelter.me/library/tooltips_svelte-plugins)
- [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

### Related Components
- Popover - For more complex interactive content
- Dropdown - For menus and selection
- Context Menu - For right-click menus

---

## Conclusion

The rewritten Tooltip component is now:

✅ **More consistent** - Single positioning approach
✅ **More flexible** - Multiple trigger modes and rich content
✅ **More accessible** - Proper ARIA, keyboard support
✅ **More powerful** - Delays, controlled state, disabled state
✅ **Better documented** - Comprehensive stories and examples
✅ **Production-ready** - Proper cleanup, memory management

The component now meets or exceeds best-in-breed standards from leading Svelte 5 component libraries while maintaining consistency with the Sveltacular design system.

