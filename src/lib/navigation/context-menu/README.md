# Context Menu Component

A fully-featured right-click menu component with keyboard navigation and nested submenus.

## Features

- ✅ Right-click trigger with contextmenu event
- ✅ Full keyboard navigation (↑↓←→, Home, End, Enter, Space, Escape)
- ✅ Nested submenus with multi-level support
- ✅ Auto-positioning with viewport collision detection
- ✅ Fully accessible (ARIA roles, keyboard support)
- ✅ Visual states: hover, focus, disabled, danger
- ✅ Icon support
- ✅ Click outside to close

## Basic Usage

```svelte
<script>
  import { ContextMenu, ContextMenuItem, ContextMenuDivider } from 'sveltacular';
  
  let menu;
  
  function showMenu(event) {
    event.preventDefault();
    menu.show(event);
  }
</script>

<div oncontextmenu={showMenu}>
  Right-click me
</div>

<ContextMenu bind:this={menu}>
  <ContextMenuItem onClick={() => console.log('New')}>
    New File
  </ContextMenuItem>
  <ContextMenuItem onClick={() => console.log('Open')}>
    Open
  </ContextMenuItem>
  <ContextMenuDivider />
  <ContextMenuItem onClick={() => console.log('Delete')} danger>
    Delete
  </ContextMenuItem>
</ContextMenu>
```

## With Icons

```svelte
<ContextMenuItem onClick={() => console.log('Copy')}>
  {#snippet icon()}
    <CopyIcon />
  {/snippet}
  Copy
</ContextMenuItem>
```

## Nested Submenus

```svelte
<ContextMenuItem>
  {#snippet submenu()}
    <ContextMenuItem onClick={() => console.log('Option 1')}>
      Option 1
    </ContextMenuItem>
    <ContextMenuItem onClick={() => console.log('Option 2')}>
      Option 2
    </ContextMenuItem>
  {/snippet}
  More Options
</ContextMenuItem>
```

## Props

### ContextMenu

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onOpen` | `() => void` | `undefined` | Callback when menu opens |
| `onClose` | `() => void` | `undefined` | Callback when menu closes |
| `closeOnClick` | `boolean` | `true` | Auto-close menu when item is clicked |

### ContextMenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() => void` | `undefined` | Callback when item is clicked |
| `disabled` | `boolean` | `false` | Disable the menu item |
| `danger` | `boolean` | `false` | Style as destructive action (red) |
| `icon` | `Snippet` | `undefined` | Optional icon snippet |
| `submenu` | `Snippet` | `undefined` | Optional submenu content |

## Methods

### show(event)

Show the context menu at the event position.

```svelte
menu.show(event);
```

### hide()

Hide the context menu.

```svelte
menu.hide();
```

## Keyboard Navigation

- **↑ / ↓** - Navigate between items
- **→** - Open submenu
- **←** - Close submenu
- **Enter / Space** - Activate item
- **Escape** - Close menu
- **Home** - Jump to first item
- **End** - Jump to last item

## Accessibility

- Uses ARIA `menu` and `menuitem` roles
- Full keyboard navigation support
- Focus management for submenus
- Screen reader compatible
- WCAG 2.1 AA compliant

## Testing

See `CONTEXT_MENU_TESTING.md` for comprehensive testing guide with 50+ test checkpoints.

## Note on Storybook

Due to limitations in the Storybook Svelte CSF parser with advanced Svelte 5 syntax, this component does not have interactive Storybook stories. However, the component is fully functional and can be tested in your application or by following the testing guide.

---

**Component Version:** 1.0.0  
**Last Updated:** January 3, 2026

