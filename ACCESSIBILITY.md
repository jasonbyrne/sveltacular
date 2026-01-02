# Accessibility Guide

Sveltacular is committed to WCAG 2.1 AA compliance across all components. This document outlines our accessibility features and best practices.

## Core Accessibility Features

### 1. Focus Management
Located in `src/lib/helpers/focus.ts`, provides:
- **Focus Trap**: Traps keyboard focus within modals and dialogs
- **Roving Tabindex**: Manages keyboard navigation in lists, menus, and tabs
- **Focus Restoration**: Restores focus when closing modals
- **Focusable Element Detection**: Finds all interactive elements

**Usage Example:**
```typescript
import { createFocusTrap, RovingTabindexManager } from '$lib/helpers/focus';

// Trap focus in a modal
const cleanup = createFocusTrap(modalElement);
// Later: cleanup();

// Roving tabindex for a menu
const manager = new RovingTabindexManager(menuItems, {
  orientation: 'vertical',
  loop: true
});
```

### 2. Screen Reader Announcements
Located in `src/lib/helpers/announcer.ts`, provides:
- **Live Region Management**: Announces dynamic content changes
- **Polite vs Assertive**: Control announcement priority
- **Convenience Functions**: Pre-built announcements for common scenarios

**Usage Example:**
```typescript
import { announcePolite, announceError, announceLoading } from '$lib/helpers/announcer';

// Polite announcement (won't interrupt)
announcePolite('3 items found');

// Assertive announcement (interrupts)
announceError('Email', 'Invalid email address');

// Loading states
announceLoading('Loading data...');
announceLoaded('Data loaded successfully');
```

## Component Accessibility Features

### Forms

#### TextBox
- ✅ Proper label association with `for`/`id`
- ✅ `aria-required` for required fields
- ✅ `aria-invalid` for validation errors
- ✅ `aria-describedby` linking to helper/error text
- ✅ Error messages in live regions with `role="alert"`
- ✅ Focus-visible styles for keyboard navigation

**Props:**
- `errorText`: Displays error with proper ARIA attributes
- `helperText`: Provides additional context
- `required`: Marks field as required

#### Button
- ✅ Proper button semantics
- ✅ `aria-label` support for icon-only buttons
- ✅ `aria-busy` for loading states
- ✅ `aria-disabled` when disabled
- ✅ Keyboard accessible (Enter/Space)

**Props:**
- `loading`: Shows loading state with aria-busy
- `ariaLabel`: Override accessible label
- `disabled`: Disables interaction

#### ListBox (Select/Combobox)
- ✅ ARIA 1.2 Combobox pattern
- ✅ `role="combobox"` on input
- ✅ `role="listbox"` on dropdown
- ✅ `role="option"` on each item
- ✅ `aria-expanded` state management
- ✅ `aria-activedescendant` for highlighted option
- ✅ `aria-autocomplete` for searchable variants
- ✅ Keyboard navigation (Arrow keys, Home, End, Enter, Escape)

### Navigation

#### Tabs
- ✅ ARIA Tabs pattern
- ✅ `role="tablist"` on container
- ✅ `role="tab"` on each tab button
- ✅ `role="tabpanel"` on content areas
- ✅ `aria-selected` on active tab
- ✅ `aria-controls` linking tab to panel
- ✅ Roving tabindex (only active tab is tabbable)
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ Focus-visible styles

**Keyboard Support:**
- `Arrow Left/Right`: Navigate between tabs
- `Home`: Jump to first tab
- `End`: Jump to last tab
- `Enter/Space`: Activate tab

#### Accordion
- ✅ ARIA Accordion pattern
- ✅ `<h3>` heading for semantic structure
- ✅ `aria-expanded` on toggle button
- ✅ `aria-controls` linking button to panel
- ✅ `role="region"` on content panel
- ✅ `aria-labelledby` on panel
- ✅ `hidden` attribute when collapsed
- ✅ Keyboard support (Enter/Space to toggle)

### Modals & Dialogs

#### Modal
- ✅ ARIA Dialog pattern
- ✅ `role="dialog"` on modal window
- ✅ `aria-modal="true"` to indicate modal behavior
- ✅ `aria-labelledby` linking to title
- ✅ Focus trap within modal
- ✅ Focus restoration on close
- ✅ Escape key to close (if dismissable)
- ✅ Click outside to close (if dismissable)

**Keyboard Support:**
- `Tab`: Cycles through focusable elements (trapped)
- `Shift+Tab`: Cycles backward
- `Escape`: Closes modal (if dismissable)

## Keyboard Navigation Standards

### Global Patterns
- **Tab**: Move to next focusable element
- **Shift+Tab**: Move to previous focusable element
- **Enter**: Activate buttons, links, submit forms
- **Space**: Activate buttons, toggle checkboxes
- **Escape**: Close modals, dropdowns, cancel operations

### List/Menu Navigation
- **Arrow Down/Up**: Navigate items (vertical)
- **Arrow Left/Right**: Navigate items (horizontal)
- **Home**: Jump to first item
- **End**: Jump to last item
- **Enter**: Select item
- **Escape**: Close menu

### Form Navigation
- **Tab**: Move between form fields
- **Arrow keys**: Navigate radio buttons, select options
- **Space**: Toggle checkboxes, open dropdowns

## Color Contrast

All components meet WCAG 2.1 AA contrast requirements:
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

CSS custom properties allow theme customization while maintaining contrast:
```scss
--body-fg: #212529;
--body-bg: #ffffff;
--form-input-border: #ced4da;
--danger: #dc3545;
--focus-ring: #007bff;
```

## Focus Indicators

All interactive elements have visible focus indicators:
- Modern `:focus-visible` pseudo-class (with fallback)
- 2px outline with offset for clarity
- High contrast focus rings
- Respects `prefers-reduced-motion`

## Screen Reader Support

Tested with:
- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (macOS/iOS)
- **TalkBack** (Android)

### Best Practices
1. Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
2. Provide text alternatives for icons
3. Use `aria-label` for icon-only buttons
4. Use `aria-hidden="true"` for decorative elements
5. Announce dynamic content changes
6. Provide clear error messages

## Testing Checklist

When creating or modifying components:

- [ ] Can be operated with keyboard only
- [ ] Has visible focus indicators
- [ ] Announces changes to screen readers
- [ ] Meets color contrast requirements
- [ ] Has proper ARIA attributes
- [ ] Follows established patterns (WAI-ARIA)
- [ ] Works with screen readers
- [ ] Respects `prefers-reduced-motion`
- [ ] Has semantic HTML structure
- [ ] Error states are clearly communicated

## Resources

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

## Reporting Issues

If you discover an accessibility issue:
1. Check if it's a known limitation
2. Test with multiple assistive technologies
3. Provide specific reproduction steps
4. Include WCAG criterion reference
5. Open an issue on GitHub

We take accessibility seriously and will prioritize fixes for any barriers to access.

