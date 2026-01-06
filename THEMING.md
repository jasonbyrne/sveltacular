# Theming Guide

This document describes all CSS variables used in the Sveltacular component library. These variables allow you to customize the appearance of components without modifying the source code.

## Default Stylesheet

All CSS variables listed in this guide are defined in the default stylesheet. To use the default theme, import the stylesheet in your application:

```svelte
<script>
	import 'sveltacular/styles.css';
	import { Button } from 'sveltacular';
</script>
```

This provides all default CSS variable values. You can then override any variables to customize the theme (see [Usage Examples](#usage-examples) below).

If you prefer to define all CSS variables yourself, you can skip importing the default stylesheet and provide your own theme definitions.

## Design Token System

Sveltacular uses a comprehensive design token system organized into logical categories. Design tokens provide consistent spacing, typography, colors, and other design values across all components.

## CSS Variable Naming Convention

Variables follow the pattern: `--{category}-{element}-{property}`

- **category**: The component category (e.g., `form`, `button`, `nav`, `table`)
- **element**: The specific element (e.g., `input`, `primary`, `header`)
- **property**: The CSS property being customized (e.g., `bg`, `fg`, `border`)

## Design Tokens - Foundation

### Spacing Scale

Consistent spacing values used for padding, margins, and gaps:

- `--spacing-xs`: 0.25rem (4px)
- `--spacing-sm`: 0.5rem (8px)
- `--spacing-md`: 0.75rem (12px)
- `--spacing-base`: 1rem (16px)
- `--spacing-lg`: 1.5rem (24px)
- `--spacing-xl`: 2rem (32px)
- `--spacing-2xl`: 3rem (48px)

### Border Radius Scale

Standardized border radius values for consistent rounded corners:

- `--radius-xs`: 0.125rem (2px)
- `--radius-sm`: 0.25rem (4px)
- `--radius-md`: 0.5rem (8px)
- `--radius-lg`: 0.75rem (12px)
- `--radius-xl`: 1rem (16px)
- `--radius-full`: 50% (for circular elements)
- `--radius-pill`: 1.5rem (24px) (for pill-shaped elements)

### Font Size Scale

Typography scale for consistent text sizing:

- `--font-xs`: 0.625rem (10px)
- `--font-sm`: 0.75rem (12px)
- `--font-base`: 0.875rem (14px)
- `--font-md`: 1rem (16px)
- `--font-lg`: 1.125rem (18px)
- `--font-xl`: 1.25rem (20px)
- `--font-2xl`: 1.5rem (24px)

### Border Width Scale

Standard border widths:

- `--border-thin`: 1px
- `--border-base`: 2px
- `--border-thick`: 3px

### Shadow Scale

Elevation and depth through shadows:

- `--shadow-sm`: 0 1px 2px rgba(0, 0, 0, 0.05)
- `--shadow-md`: 0 4px 6px rgba(0, 0, 0, 0.1)
- `--shadow-lg`: 0 10px 15px rgba(0, 0, 0, 0.1)
- `--shadow-xl`: 0 20px 25px rgba(0, 0, 0, 0.15)

### Transition Durations

Animation timing for smooth interactions:

- `--transition-fast`: 0.15s
- `--transition-base`: 0.2s
- `--transition-slow`: 0.3s
- `--transition-slower`: 0.5s

### Transition Easing

Easing functions for animations:

- `--ease-in-out`: ease-in-out
- `--ease-out`: ease-out
- `--ease-in`: ease-in

## Color Palette - Modernized & Friendly

### Base Colors

Warmer, softer tones for a more approachable aesthetic:

- `--base-color-bg`: Background color (default: `#fafafa` - soft off-white)
- `--base-color-fg`: Foreground/text color (default: `#2d3748` - warm dark gray)
- `--base-link-fg`: Link text color (default: `#4a90e2` - warm blue)
- `--base-link-hover-fg`: Link hover text color (default: `#3182ce` - darker warm blue)
- `--base-accent-fg`: Accent foreground color (default: `#4a5568` - medium warm gray)
- `--base-accent-bg`: Accent background color (default: `#e2e8f0` - light warm gray)

### Neutral Grays

Warm-toned gray scale for consistent neutral colors:

- `--gray-50`: `#f7fafc` (lightest)
- `--gray-100`: `#edf2f7`
- `--gray-200`: `#e2e8f0`
- `--gray-300`: `#cbd5e0`
- `--gray-400`: `#a0aec0`
- `--gray-500`: `#718096`
- `--gray-600`: `#4a5568`
- `--gray-700`: `#2d3748`
- `--gray-800`: `#1a202c`
- `--gray-900`: `#171923` (darkest)

### Semantic Colors

Friendlier, softer semantic colors for states and actions:

- `--color-success`: Success color (default: `#48bb78` - softer green)
- `--color-success-hover`: Success hover (default: `#38a169`)
- `--color-error`: Error color (default: `#f56565` - softer red)
- `--color-error-hover`: Error hover (default: `#e53e3e`)
- `--color-warning`: Warning color (default: `#ed8936` - warm orange)
- `--color-warning-hover`: Warning hover (default: `#dd6b20`)
- `--color-info`: Info color (default: `#4299e1` - soft blue)
- `--color-info-hover`: Info hover (default: `#3182ce`)

### Typography

- `--base-font-family`: Base font family (default: `'Roboto', sans-serif`)
- `--base-headline-font-family`: Headline font family (default: `'Roboto', sans-serif`)
- `--base-mono-font-family`: Monospace font family (default: `'Roboto Mono', monospace`)

## Component-Specific Variables

### Button Components

- `--button-primary-bg`: Primary button background (uses `--color-info`)
- `--button-primary-fg`: Primary button text (default: `#fff`)
- `--button-primary-border`: Primary button border (uses `--color-info`)
- `--button-primary-hover-bg`: Primary button hover background (uses `--color-info-hover`)
- `--button-primary-hover-fg`: Primary button hover text (default: `#fff`)

- `--button-secondary-bg`: Secondary button background (uses `--gray-600`)
- `--button-secondary-fg`: Secondary button text (default: `#fff`)
- `--button-secondary-border`: Secondary button border (uses `--gray-600`)
- `--button-secondary-hover-bg`: Secondary button hover background (uses `--gray-700`)
- `--button-secondary-hover-fg`: Secondary button hover text (default: `#fff`)

- `--button-positive-bg`: Positive button background (uses `--color-success`)
- `--button-positive-fg`: Positive button text (default: `#fff`)
- `--button-positive-border`: Positive button border (uses `--color-success`)
- `--button-positive-hover-bg`: Positive button hover background (uses `--color-success-hover`)
- `--button-positive-hover-fg`: Positive button hover text (default: `#fff`)

- `--button-danger-bg`: Danger button background (uses `--color-error`)
- `--button-danger-fg`: Danger button text (default: `#fff`)
- `--button-danger-border`: Danger button border (uses `--color-error`)
- `--button-danger-hover-bg`: Danger button hover background (uses `--color-error-hover`)
- `--button-danger-hover-fg`: Danger button hover text (default: `#fff`)

- `--button-ghost-hover-bg`: Ghost button hover background (uses `--gray-200`)
- `--button-ghost-hover-fg`: Ghost button hover text (uses `--base-color-fg`)

- `--button-outline-fg`: Outline button text (uses `--base-color-fg`)
- `--button-outline-border`: Outline button border (uses `--gray-400`)
- `--button-outline-hover-bg`: Outline button hover background (uses `--gray-200`)
- `--button-outline-hover-fg`: Outline button hover text (uses `--base-color-fg`)

### Form Input Components

- `--form-input-bg`: Input background color (default: `#fff`)
- `--form-input-fg`: Input text color (uses `--base-color-fg`)
- `--form-input-border`: Input border color (uses `--gray-300`)
- `--form-input-border-focus`: Input border color on focus (uses `--color-info`)
- `--form-input-border-error`: Input border color when error (uses `--color-error`)
- `--form-input-border-error-focus`: Input border color on focus when error (uses `--color-error-hover`)
- `--form-input-placeholder`: Placeholder text color (uses `--gray-500`)
- `--form-input-checked-bg`: Checked input background (uses `--color-info`)
- `--form-input-checked-fg`: Checked input foreground (default: `#fff`)
- `--form-input-selected-bg`: Selected input background (uses `--color-info`)
- `--form-input-selected-fg`: Selected input foreground (default: `#fff`)
- `--form-input-accent-bg`: Prefix/suffix background (uses `--gray-200`)
- `--form-input-accent-fg`: Prefix/suffix foreground (uses `--base-color-fg`)
- `--form-input-helper-text-fg`: Helper text color (uses `--gray-600`)
- `--form-input-error-fg`: Error message color (uses `--color-error`)

### Form Switch Components

- `--form-switch-unchecked-bg`: Unchecked switch background (uses `--gray-500`)
- `--form-switch-unchecked-fg`: Unchecked switch foreground (default: `#fff`)
- `--form-switch-checked-bg`: Checked switch background (uses `--color-info`)
- `--form-switch-checked-fg`: Checked switch foreground (default: `#fff`)

### Navigation Components

#### Navigation Bar

- `--nav-bg`: Navigation background (default: `#fff`)
- `--nav-fg`: Navigation text (uses `--base-color-fg`)
- `--nav-link-fg`: Navigation link text (uses `--base-color-fg`)
- `--nav-link-hover-fg`: Navigation link hover text (uses `--base-link-fg`)
- `--nav-font-family`: Navigation font family (uses `--base-font-family`)

#### Breadcrumbs

- `--breadcrumbs-fg`: Breadcrumbs text (uses `--base-color-fg`)
- `--breadcrumbs-link-fg`: Breadcrumbs link text (uses `--base-link-fg`)
- `--breadcrumbs-link-hover-fg`: Breadcrumbs link hover text (uses `--base-link-hover-fg`)
- `--breadcrumbs-font-family`: Breadcrumbs font family (uses `--base-font-family`)

#### Sidebar

- `--sidebar-bg`: Sidebar background (default: `#fff`)
- `--sidebar-fg`: Sidebar text (uses `--base-color-fg`)
- `--sidebar-link-fg`: Sidebar link text (uses `--base-link-fg`)
- `--sidebar-link-hover-fg`: Sidebar link hover text (uses `--base-link-hover-fg`)
- `--sidebar-link-active-fg`: Active sidebar link text (uses `--base-color-fg`)
- `--sidebar-link-active-hover-fg`: Active sidebar link hover text (uses `--base-color-fg`)
- `--sidebar-font-family`: Sidebar font family (uses `--base-font-family`)

#### Tabs

- `--tab-traditional-inactive-bg`: Traditional tab inactive background (default: `transparent`)
- `--tab-traditional-inactive-fg`: Traditional tab inactive text (uses `--gray-500`)
- `--tab-traditional-hover-bg`: Traditional tab hover background (default: `transparent`)
- `--tab-traditional-hover-fg`: Traditional tab hover text (uses `--gray-700`)
- `--tab-traditional-active-bg`: Traditional tab active background (uses `--gray-200`)
- `--tab-traditional-active-fg`: Traditional tab active text (uses `--base-color-fg`)
- `--tab-traditional-border`: Traditional tab border (uses `--gray-300`)

- `--tab-underline-inactive-bg`: Underline tab inactive background (default: `transparent`)
- `--tab-underline-inactive-fg`: Underline tab inactive text (uses `--gray-500`)
- `--tab-underline-hover-bg`: Underline tab hover background (default: `transparent`)
- `--tab-underline-hover-fg`: Underline tab hover text (uses `--gray-700`)
- `--tab-underline-active-bg`: Underline tab active background (uses `--gray-800`)
- `--tab-underline-active-fg`: Underline tab active text (uses `--color-warning`)

- `--tab-outline-border`: Outline tab border (uses `--gray-300`)
- `--tab-outline-inactive-fg`: Outline tab inactive text (uses `--gray-500`)

- `--tab-overline-bg`: Overline tab background (uses `--gray-600`)
- `--tab-overline-active-bg`: Overline tab active background (uses `--gray-800`)
- `--tab-overline-active-fg`: Overline tab active text (uses `--color-warning`)
- `--tab-overline-fg`: Overline tab text (uses `--gray-300`)

### Table Components

- `--table-bg`: Table background (default: `#fff`)
- `--table-fg`: Table text (uses `--base-color-fg`)
- `--table-border`: Table border (uses `--gray-300`)
- `--table-header-bg`: Table header background (uses `--gray-100`)
- `--table-header-fg`: Table header text (uses `--base-color-fg`)
- `--table-header-border`: Table header border (uses `--gray-300`)
- `--table-row-even-bg`: Even row background (default: `#fff`)
- `--table-row-even-fg`: Even row text (uses `--base-color-fg`)
- `--table-row-even-border`: Even row border (uses `--gray-200`)
- `--table-row-odd-bg`: Odd row background (uses `--gray-50`)
- `--table-row-odd-fg`: Odd row text (uses `--base-color-fg`)
- `--table-row-odd-border`: Odd row border (uses `--gray-200`)
- `--table-footer-bg`: Table footer background (uses `--gray-100`)
- `--table-footer-fg`: Table footer text (uses `--base-color-fg`)
- `--table-footer-border`: Table footer border (uses `--gray-300`)

### Modal Components

- `--modal-bg`: Modal background (default: `#fff`)
- `--modal-fg`: Modal text (uses `--base-color-fg`)
- `--modal-header-bg`: Modal header background (default: `#fff`)
- `--modal-header-fg`: Modal header text (uses `--base-color-fg`)
- `--modal-header-border`: Modal header border (uses `--gray-300`)
- `--modal-body-bg`: Modal body background (default: `#fff`)
- `--modal-body-fg`: Modal body text (uses `--base-color-fg`)
- `--modal-body-border`: Modal body border (uses `--gray-300`)
- `--modal-footer-bg`: Modal footer background (default: `#fff`)
- `--modal-footer-fg`: Modal footer text (uses `--base-color-fg`)
- `--modal-footer-border`: Modal footer border (uses `--gray-300`)

### Card Components

- `--card-bg`: Card background (default: `#fff`)
- `--card-fg`: Card text (uses `--base-color-fg`)
- `--card-link-fg`: Card link text (uses `--base-link-fg`)
- `--card-link-hover-fg`: Card link hover text (uses `--base-link-hover-fg`)

### Footer

- `--footer-bg`: Footer background (default: `#fff`)
- `--footer-fg`: Footer text (uses `--base-color-fg`)
- `--footer-link-fg`: Footer link text (uses `--base-link-fg`)
- `--footer-link-hover-fg`: Footer link hover text (uses `--base-link-hover-fg`)
- `--footer-font-family`: Footer font family (uses `--base-font-family`)

### Tooltip

- `--tooltip-bg`: Tooltip background (uses `--gray-800`)
- `--tooltip-fg`: Tooltip text (default: `#fff`)

### Popover

- `--popover-bg`: Popover background (default: `#fff`)
- `--popover-border`: Popover border (uses `--gray-300`)

### Badge

- `--badge-bg`: Badge background (uses `--color-error`)
- `--badge-fg`: Badge text (default: `#fff`)
- `--badge-standard-bg`: Standard badge background (uses `--gray-600`)
- `--badge-standard-fg`: Standard badge text (default: `#fff`)
- `--badge-positive-bg`: Positive badge background (uses `--color-success`)
- `--badge-positive-fg`: Positive badge text (default: `#fff`)
- `--badge-negative-bg`: Negative badge background (uses `--color-error`)
- `--badge-negative-fg`: Negative badge text (default: `#fff`)
- `--badge-warning-bg`: Warning badge background (uses `--color-warning`)
- `--badge-warning-fg`: Warning badge text (default: `#fff`)

### Spinner

- `--spinner-border`: Spinner border color (default: `rgba(0, 0, 0, 0.1)`)
- `--spinner-primary-color`: Primary spinner color (uses `--color-info`)
- `--spinner-secondary-color`: Secondary spinner color (uses `--gray-600`)

### Body

- `--body-bg`: Body background (uses `--base-color-bg`)
- `--body-fg`: Body text (uses `--base-color-fg`)

## Usage Examples

### Basic Theme Customization

To customize the theme, define these variables in your global CSS or in a theme provider:

```css
:root {
	/* Override base colors */
	--base-color-bg: #ffffff;
	--base-color-fg: #1a1a1a;
	
	/* Customize spacing */
	--spacing-base: 1.25rem; /* Increase default spacing */
	
	/* Customize border radius */
	--radius-md: 0.75rem; /* More rounded corners */
	
	/* Customize semantic colors */
	--color-success: #10b981;
	--color-error: #ef4444;
	
	/* Component-specific overrides */
	--button-primary-bg: #3b82f6;
	--form-input-border: #d1d5db;
}
```

### Dark Mode Theme

For dark mode, override these in a `[data-theme="dark"]` selector:

```css
[data-theme="dark"] {
	/* Base colors */
	--base-color-bg: #1a202c;
	--base-color-fg: #f7fafc;
	
	/* Semantic colors - adjusted for dark mode */
	--color-info: #63b3ed;
	--color-success: #68d391;
	--color-error: #fc8181;
	--color-warning: #f6ad55;
	
	/* Component overrides */
	--button-primary-bg: #4299e1;
	--form-input-bg: #2d3748;
	--form-input-border: #4a5568;
	--form-input-fg: #f7fafc;
	
	/* Table styling */
	--table-bg: #2d3748;
	--table-header-bg: #1a202c;
	--table-row-odd-bg: #374151;
}
```

### Using Design Tokens in Custom Components

When building custom components, use the design tokens for consistency:

```scss
.my-custom-component {
	padding: var(--spacing-base);
	margin: var(--spacing-md);
	border-radius: var(--radius-md);
	border: var(--border-thin) solid var(--gray-300);
	box-shadow: var(--shadow-md);
	font-size: var(--font-base);
	transition: all var(--transition-base) var(--ease-in-out);
	
	&:hover {
		background-color: var(--gray-100);
	}
}
```

## Migration Guide

If you're updating from an older version of Sveltacular, you may need to update your custom theme variables. The new design token system provides:

1. **Consistent spacing** - Use `--spacing-*` variables instead of hard-coded rem/px values
2. **Standardized border radius** - Use `--radius-*` variables for consistent rounded corners
3. **Typography scale** - Use `--font-*` variables for consistent text sizing
4. **Modernized colors** - Warmer, friendlier color palette with semantic color variables
5. **Shadow system** - Use `--shadow-*` variables for consistent elevation
6. **Transition timing** - Use `--transition-*` variables for consistent animations

All component-specific variables remain backward compatible, but now reference the design token system for easier theming.
