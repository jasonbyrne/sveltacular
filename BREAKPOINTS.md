# Responsive Breakpoints

This document describes the global breakpoint system used throughout Sveltacular.

## Breakpoint Values

The following breakpoints are defined in `src/styles/_breakpoints.scss` as a map:

```scss
$breakpoints: (
    'mobile': 320px,   // Smallest phones start at 320px, most are 375px or higher
    'phablet': 480px,  // Large phones (iPhone 14 Pro Max: 430px)
    'tablet': 641px,   // Tablets (iPad: 768px portrait)
    'desktop': 1000px, // Medium laptops/desktops
    'large': 1280px    // Large laptops/desktops
);
```

## Using Breakpoints in Components

### Mobile-First Approach (min-width)

Use the `breakpoint-up` mixin for mobile-first responsive design:

```scss
@use '$styles/breakpoints' as *;

.my-component {
    // Mobile styles (default)
    padding: 1rem;
    
    // Phablet and up
    @include breakpoint-up('phablet') {
        padding: 1.5rem;
    }
    
    // Tablet and up
    @include breakpoint-up('tablet') {
        padding: 2rem;
    }
    
    // Desktop and up
    @include breakpoint-up('desktop') {
        padding: 2.5rem;
    }
    
    // Large screens
    @include breakpoint-up('large') {
        padding: 3rem;
    }
}
```

### Desktop-First Approach (max-width)

Use the `breakpoint-down` mixin for desktop-first responsive design:

```scss
@use '$styles/breakpoints' as *;

.my-component {
    // Desktop styles (default)
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    
    // Tablets and smaller (max-width: 640.98px)
    @include breakpoint-down('tablet') {
        grid-template-columns: repeat(2, 1fr);
    }
    
    // Phablet and smaller (max-width: 479.98px)
    @include breakpoint-down('phablet') {
        grid-template-columns: 1fr;
    }
}
```

### Between Breakpoints

Use the `breakpoint-between` mixin to target a specific range:

```scss
@use '$styles/breakpoints' as *;

.my-component {
    // Only apply to devices between phablet and desktop
    @include breakpoint-between('phablet', 'desktop') {
        padding: 2rem;
    }
}
```

## Example: Form Row Component

The `form-row` component demonstrates responsive behavior using a desktop-first approach:

```svelte
<style lang="scss">
    @use '$styles/breakpoints' as *;

    .form-row {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-base);
        align-items: flex-start;

        // Switch to column layout on mobile phones and below
        @include breakpoint-down('phablet') {
            flex-direction: column;
            align-items: stretch;
        }
    }
</style>
```

This means:
- On mobile devices (≤ 479.98px): Fields stack vertically
- On phablet and larger (≥ 480px): Fields appear side-by-side

## Best Practices

1. **Choose the Right Approach**: 
   - Use `breakpoint-up` for mobile-first (recommended for most cases)
   - Use `breakpoint-down` for desktop-first
   - Use `breakpoint-between` for specific ranges
2. **Use Quoted Strings**: Always quote breakpoint names: `'phablet'`, not `phablet`
3. **Avoid Overlap**: The mixins use `0.02px` subtraction to prevent overlap between breakpoints
4. **Test at Boundaries**: Test your components at each breakpoint to ensure smooth transitions
5. **Consider Touch Targets**: On mobile/tablet, ensure interactive elements are at least 44px × 44px
6. **Import Breakpoints File**: Always import the breakpoints file at the top of your component's `<style>` block using the `$styles` alias:
   ```scss
   @use '$styles/breakpoints' as *;
   ```
   Note: Import `breakpoints` (not `theme.scss`) to avoid pulling in unused global CSS selectors
7. **Error Handling**: If you mistype a breakpoint name, you'll see a warning in the console

## Path Aliases

The project uses the `$styles` alias (defined in `svelte.config.js`) to reference the styles directory:

```scss
// ✅ Good - uses alias for breakpoints
@use '$styles/breakpoints' as *;

// ❌ Avoid - importing full theme (includes global CSS)
@use '$styles/theme.scss' as *;

// ❌ Avoid - relative paths
@use '../../styles/breakpoints' as *;
```

Available aliases:
- `$src` → `./src`
- `$lib` → `./src/lib`
- `$styles` → `./src/styles`
- `$assets` → `./src/assets`
- `$types` → `./src/types`
- `$static` → `./static`

## Common Responsive Patterns

### Stack on Mobile, Side-by-Side on Desktop (Mobile-First)
```scss
.container {
    display: flex;
    flex-direction: column;
    
    @include breakpoint-up('tablet') {
        flex-direction: row;
    }
}
```

### Stack on Mobile, Side-by-Side on Desktop (Desktop-First)
```scss
.container {
    display: flex;
    flex-direction: row;
    
    @include breakpoint-down('tablet') {
        flex-direction: column;
    }
}
```

### Hide on Mobile, Show on Desktop
```scss
.desktop-only {
    display: none;
    
    @include breakpoint-up('desktop') {
        display: block;
    }
}
```

### Show on Mobile, Hide on Desktop
```scss
.mobile-only {
    display: block;
    
    @include breakpoint-up('desktop') {
        display: none;
    }
}
```

### Responsive Grid (Mobile-First)
```scss
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    
    @include breakpoint-up('phablet') {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @include breakpoint-up('tablet') {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @include breakpoint-up('large') {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

### Responsive Typography
```scss
.heading {
    font-size: 1.5rem;
    
    @include breakpoint-up('tablet') {
        font-size: 2rem;
    }
    
    @include breakpoint-up('desktop') {
        font-size: 2.5rem;
    }
}
```

### Tablet-Specific Styles
```scss
.special-layout {
    padding: 1rem;
    
    // Only apply to tablets (between phablet and desktop)
    @include breakpoint-between('phablet', 'desktop') {
        padding: 2rem;
        background: var(--gray-100);
    }
}
```

