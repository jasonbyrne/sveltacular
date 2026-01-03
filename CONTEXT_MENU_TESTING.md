# Context Menu Testing Guide

## Overview

The Context Menu component provides right-click menu functionality with keyboard navigation and nested submenus. This guide outlines how to test all features.

## Test Checklist

### Basic Functionality

- [ ] **Right-click trigger**
  - Right-click on a target element opens the menu
  - Menu appears at mouse cursor position
  - Menu stays within viewport boundaries

- [ ] **Click outside to close**
  - Clicking outside the menu closes it
  - Right-clicking elsewhere opens menu at new position

- [ ] **Item selection**
  - Clicking a menu item triggers its onClick handler
  - Menu closes after item selection (when closeOnClick=true)

### Keyboard Navigation

- [ ] **Arrow keys**
  - ↓ moves to next item
  - ↑ moves to previous item
  - Wraps around from last to first item and vice versa

- [ ] **Home/End**
  - Home key moves to first item
  - End key moves to last item

- [ ] **Enter/Space**
  - Activates the currently focused item
  - Triggers the item's onClick handler

- [ ] **Escape**
  - Closes the menu
  - Returns focus to the trigger element

### Nested Submenus

- [ ] **Mouse hover**
  - Hovering over item with submenu opens it after 200ms delay
  - Moving away closes submenu
  - Submenu stays open when hovering over it

- [ ] **Arrow navigation**
  - → on item with submenu opens it
  - ← on submenu closes it and returns focus to parent

- [ ] **Multi-level nesting**
  - Submenus can contain more submenus
  - Navigation works at all levels

### Positioning

- [ ] **Viewport collision detection**
  - Menu adjusts position if it would go off right edge
  - Menu adjusts position if it would go off bottom edge
  - Menu never goes off left or top edges

- [ ] **Submenu positioning**
  - Submenus open to the right by default
  - Submenus open to the left when near right edge

### Visual States

- [ ] **Hover state**
  - Items highlight on mouse hover
  - Background color changes

- [ ] **Focus state**
  - Focused item has visible focus ring
  - Focus ring respects focus-visible (keyboard only)

- [ ] **Disabled state**
  - Disabled items have reduced opacity
  - Disabled items can't be clicked
  - Keyboard navigation skips disabled items

- [ ] **Danger state**
  - Danger items have red text color
  - Danger items have red background on hover

### Icons

- [ ] **Icon display**
  - Icons render correctly in menu items
  - Icons align with text
  - Icons maintain proper spacing

### Dividers

- [ ] **Visual separation**
  - Dividers create visual separation between groups
  - Dividers don't interfere with keyboard navigation

### Accessibility

- [ ] **ARIA roles**
  - Menu has role="menu"
  - Items have role="menuitem"
  - Dividers have role="separator"

- [ ] **Screen readers**
  - Menu items are announced correctly
  - Disabled state is announced
  - Submenu presence is indicated

- [ ] **Focus management**
  - Focus moves to menu when opened
  - Focus returns to trigger when closed with Escape
  - Focus trap works within menu

### Edge Cases

- [ ] **Empty menu**
  - Menu with no items doesn't break
  - Menu with only dividers works

- [ ] **Single item**
  - Menu with one item works correctly
  - Keyboard navigation handles single item

- [ ] **Rapid interactions**
  - Rapid clicking doesn't cause issues
  - Rapid keyboard navigation is smooth

- [ ] **Animation**
  - Menu fades in smoothly
  - No visual glitches during animation

## Manual Testing Steps

### 1. Basic Right-Click Menu

```
1. Navigate to Storybook: http://localhost:6006
2. Go to Navigation → Context Menu
3. Find "Basic Context Menu" section
4. Right-click on the demo area
5. Verify menu appears at cursor position
6. Click "New File" and verify action in console
7. Right-click again, click outside, verify menu closes
```

### 2. Keyboard Navigation

```
1. Right-click to open menu
2. Press ↓ multiple times, verify focus moves down
3. Press ↑ multiple times, verify focus moves up
4. Press Home, verify focus on first item
5. Press End, verify focus on last item
6. Press Enter on an item, verify action triggered
7. Press Escape, verify menu closes
```

### 3. Nested Submenus

```
1. Go to "Nested Submenus" section
2. Right-click on demo area
3. Hover over "New" item
4. Verify submenu opens after brief delay
5. Hover over "More Options..." in submenu
6. Verify second-level submenu opens
7. Click an item in nested submenu
8. Verify action triggered and menu closes
```

### 4. Icons and Visual States

```
1. Go to "With Icons" section
2. Right-click on demo area
3. Verify icons display correctly
4. Hover over items, verify highlight
5. Verify disabled items have reduced opacity
6. Verify danger item has red color
```

### 5. Real-world Example

```
1. Go to "Real-world Example: File Manager"
2. Right-click on the file card
3. Test all menu features in realistic context
4. Verify "Open With..." submenu works
5. Verify "Share" submenu works
6. Test "Move to Trash" danger action
```

## Browser Testing

Test in the following browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Known Limitations

- Context menus may not work correctly in iframe-based environments
- Some browsers may intercept right-click for their own menus
- Touch devices may need alternative trigger mechanism

## Performance Checklist

- [ ] Menu opens instantly (< 50ms)
- [ ] Keyboard navigation is responsive
- [ ] No lag when hovering over items
- [ ] Submenu animations are smooth (60fps)
- [ ] No memory leaks when opening/closing repeatedly

## Accessibility Audit

- [ ] Passes WCAG 2.1 AA contrast requirements
- [ ] Keyboard-only operation is fully functional
- [ ] Screen reader announces all states correctly
- [ ] Focus indicators are clearly visible
- [ ] No keyboard traps

## Browser Console Tests

Run these in the browser console to verify programmatic access:

```javascript
// Get menu instance
const menu = document.querySelector('.context-menu');

// Verify ARIA attributes
console.log('Role:', menu.getAttribute('role')); // Should be "menu"
console.log('Orientation:', menu.getAttribute('aria-orientation')); // Should be "vertical"

// Verify menu items
const items = menu.querySelectorAll('[role="menuitem"]');
console.log('Menu items:', items.length);

// Verify focus management
items[0].focus();
console.log('Active element:', document.activeElement === items[0]);
```

## Regression Testing

After any changes, verify:

- [ ] All existing stories still work
- [ ] No TypeScript errors
- [ ] No console errors or warnings
- [ ] No visual regressions
- [ ] Keyboard navigation still works
- [ ] Accessibility features unchanged

## Automated Testing (Future)

Consider adding:
- Unit tests for positioning logic
- Integration tests for keyboard navigation
- Visual regression tests with Playwright
- Accessibility tests with axe-core

---

**Last Updated:** January 3, 2026  
**Component Version:** 1.0.0  
**Tested By:** Initial implementation

