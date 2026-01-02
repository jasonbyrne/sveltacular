# Theming Guide

This document describes all CSS variables used in the Sveltacular component library. These variables allow you to customize the appearance of components without modifying the source code.

## CSS Variable Naming Convention

Variables follow the pattern: `--{category}-{element}-{property}`

- **category**: The component category (e.g., `form`, `button`, `nav`, `table`)
- **element**: The specific element (e.g., `input`, `primary`, `header`)
- **property**: The CSS property being customized (e.g., `bg`, `fg`, `border`)

## Base Variables

### Colors
- `--base-color-bg`: Background color (default: `#fff`)
- `--base-color-fg`: Foreground/text color (default: `#000`)
- `--base-link-fg`: Link text color (default: `#543fd7`)
- `--base-link-hover-fg`: Link hover text color (default: `#00f`)
- `--base-accent-fg`: Accent foreground color (default: `#555`)
- `--base-accent-bg`: Accent background color (default: `#ddd`)

### Typography
- `--base-font-family`: Base font family (default: `'Roboto', sans-serif`)
- `--base-headline-font-family`: Headline font family (default: `'Roboto', sans-serif`)
- `--base-mono-font-family`: Monospace font family (default: `'Roboto Mono', monospace`)

## Form Components

### Form Inputs
- `--form-input-bg`: Input background color (default: `white`)
- `--form-input-fg`: Input text color (default: `black`)
- `--form-input-border`: Input border color (default: `black`)
- `--form-input-border-focus`: Input border color on focus (default: `black`)
- `--form-input-border-error`: Input border color when error (default: `#a00`)
- `--form-input-border-error-focus`: Input border color on focus when error (default: `#c00`)
- `--form-input-placeholder`: Placeholder text color (default: `#888`)
- `--form-input-checked-bg`: Checked input background (default: `#3182ce`)
- `--form-input-checked-fg`: Checked input foreground (default: `#fff`)
- `--form-input-selected-bg`: Selected input background (default: `#3182ce`)
- `--form-input-selected-fg`: Selected input foreground (default: `white`)
- `--form-input-accent-bg`: Prefix/suffix background (default: `#ccc`)
- `--form-input-accent-fg`: Prefix/suffix foreground (default: `black`)
- `--form-input-helper-text-fg`: Helper text color (default: `#666`)
- `--form-input-error-fg`: Error message color (default: `#a00`)

### Form Switches
- `--form-switch-unchecked-bg`: Unchecked switch background (default: `rgb(80, 80, 80)`)
- `--form-switch-unchecked-fg`: Unchecked switch foreground (default: `white`)
- `--form-switch-checked-bg`: Checked switch background (default: `#3182ce`)
- `--form-switch-checked-fg`: Checked switch foreground (default: `white`)

## Button Components

### Button Variants
- `--button-primary-bg`: Primary button background (default: `#1e88e5`)
- `--button-primary-fg`: Primary button text (default: `#fff`)
- `--button-primary-border`: Primary button border (default: `#1e88e5`)
- `--button-primary-hover-bg`: Primary button hover background (default: `#0052a3`)
- `--button-primary-hover-fg`: Primary button hover text (default: `#fff`)

- `--button-secondary-bg`: Secondary button background (default: `#555`)
- `--button-secondary-fg`: Secondary button text (default: `#fff`)
- `--button-secondary-border`: Secondary button border (default: `#aaa`)
- `--button-secondary-hover-bg`: Secondary button hover background (default: `#333`)
- `--button-secondary-hover-fg`: Secondary button hover text (default: `#fff`)

- `--button-positive-bg`: Positive button background (default: `#43a047`)
- `--button-positive-fg`: Positive button text (default: `#fff`)
- `--button-positive-border`: Positive button border (default: `#43a047`)
- `--button-positive-hover-bg`: Positive button hover background (default: `#388e3c`)
- `--button-positive-hover-fg`: Positive button hover text (default: `#fff`)

- `--button-danger-bg`: Danger button background (default: `#e53935`)
- `--button-danger-fg`: Danger button text (default: `#fff`)
- `--button-danger-border`: Danger button border (default: `#e53935`)
- `--button-danger-hover-bg`: Danger button hover background (default: `#c62828`)
- `--button-danger-hover-fg`: Danger button hover text (default: `#fff`)

- `--button-ghost-hover-bg`: Ghost button hover background (default: `#000`)
- `--button-ghost-hover-fg`: Ghost button hover text (default: `#fff`)

- `--button-outline-fg`: Outline button text (default: `#fff`)
- `--button-outline-border`: Outline button border (default: `#fff`)
- `--button-outline-hover-bg`: Outline button hover background (default: `#000`)
- `--button-outline-hover-fg`: Outline button hover text (default: `#fff`)

## Navigation Components

### Navigation Bar
- `--nav-bg`: Navigation background (default: `#fff`)
- `--nav-fg`: Navigation text (default: `#000`)
- `--nav-link-fg`: Navigation link text (default: `black`)
- `--nav-link-hover-fg`: Navigation link hover text (default: `black`)
- `--nav-font-family`: Navigation font family (default: `'Roboto', sans-serif`)

### Breadcrumbs
- `--breadcrumbs-fg`: Breadcrumbs text (default: `black`)
- `--breadcrumbs-link-fg`: Breadcrumbs link text (default: `black`)
- `--breadcrumbs-link-hover-fg`: Breadcrumbs link hover text (default: `#900`)
- `--breadcrumbs-font-family`: Breadcrumbs font family (default: `'Roboto', sans-serif`)

### Sidebar
- `--sidebar-bg`: Sidebar background (default: `#fff`)
- `--sidebar-fg`: Sidebar text (default: `#000`)
- `--sidebar-link-fg`: Sidebar link text (default: `#543fd7`)
- `--sidebar-link-hover-fg`: Sidebar link hover text (default: `#00f`)
- `--sidebar-link-active-fg`: Active sidebar link text (default: `#000`)
- `--sidebar-link-active-hover-fg`: Active sidebar link hover text (default: `#000`)
- `--sidebar-font-family`: Sidebar font family (default: `'Roboto', sans-serif`)

### Tabs
- `--tab-traditional-inactive-bg`: Traditional tab inactive background (default: `transparent`)
- `--tab-traditional-inactive-fg`: Traditional tab inactive text (default: `rgb(150, 150, 150)`)
- `--tab-traditional-hover-bg`: Traditional tab hover background (default: `transparent`)
- `--tab-traditional-hover-fg`: Traditional tab hover text (default: `rgb(220, 220, 220)`)
- `--tab-traditional-active-bg`: Traditional tab active background (default: `rgb(220, 220, 230)`)
- `--tab-traditional-active-fg`: Traditional tab active text (default: `rgb(50, 50, 50)`)
- `--tab-traditional-border`: Traditional tab border (default: `rgb(220, 220, 230)`)

- `--tab-underline-inactive-bg`: Underline tab inactive background (default: `transparent`)
- `--tab-underline-inactive-fg`: Underline tab inactive text (default: `rgb(150, 150, 150)`)
- `--tab-underline-hover-bg`: Underline tab hover background (default: `transparent`)
- `--tab-underline-hover-fg`: Underline tab hover text (default: `rgb(220, 220, 220)`)
- `--tab-underline-active-bg`: Underline tab active background (default: `rgb(80, 80, 80)`)
- `--tab-underline-active-fg`: Underline tab active text (default: `rgb(255, 134, 78)`)

- `--tab-outline-border`: Outline tab border (default: `rgb(220, 220, 220)`)
- `--tab-outline-inactive-fg`: Outline tab inactive text (default: `rgb(120, 120, 120)`)

- `--tab-overline-bg`: Overline tab background (default: `rgb(100, 100, 100)`)
- `--tab-overline-active-bg`: Overline tab active background (default: `rgb(50, 50, 50)`)
- `--tab-overline-active-fg`: Overline tab active text (default: `rgb(255, 134, 78)`)
- `--tab-overline-fg`: Overline tab text (default: `rgb(180, 180, 180)`)

## Table Components

- `--table-bg`: Table background (default: `#fff`)
- `--table-fg`: Table text (default: `#000`)
- `--table-border`: Table border (default: `#000`)
- `--table-header-bg`: Table header background (default: `#fff`)
- `--table-header-fg`: Table header text (default: `#000`)
- `--table-header-border`: Table header border (default: `#000`)
- `--table-row-even-bg`: Even row background (default: `#fff`)
- `--table-row-even-fg`: Even row text (default: `#000`)
- `--table-row-even-border`: Even row border (default: `#000`)
- `--table-row-odd-bg`: Odd row background (default: `#fff`)
- `--table-row-odd-fg`: Odd row text (default: `#000`)
- `--table-row-odd-border`: Odd row border (default: `#000`)
- `--table-footer-bg`: Table footer background (default: `#fff`)
- `--table-footer-fg`: Table footer text (default: `#000`)
- `--table-footer-border`: Table footer border (default: `#000`)

## Modal Components

- `--modal-bg`: Modal background (default: `#fff`)
- `--modal-fg`: Modal text (default: `#000`)
- `--modal-header-bg`: Modal header background (default: `#fff`)
- `--modal-header-fg`: Modal header text (default: `#000`)
- `--modal-header-border`: Modal header border (default: `#000`)
- `--modal-body-bg`: Modal body background (default: `#fff`)
- `--modal-body-fg`: Modal body text (default: `#000`)
- `--modal-body-border`: Modal body border (default: `#000`)
- `--modal-footer-bg`: Modal footer background (default: `#fff`)
- `--modal-footer-fg`: Modal footer text (default: `#000`)
- `--modal-footer-border`: Modal footer border (default: `#000`)

## Card Components

- `--card-bg`: Card background (default: `#fff`)
- `--card-fg`: Card text (default: `#000`)
- `--card-link-fg`: Card link text (default: `#543fd7`)
- `--card-link-hover-fg`: Card link hover text (default: `#00f`)

## Footer

- `--footer-bg`: Footer background (default: `#fff`)
- `--footer-fg`: Footer text (default: `#000`)
- `--footer-link-fg`: Footer link text (default: `#543fd7`)
- `--footer-link-hover-fg`: Footer link hover text (default: `#00f`)
- `--footer-font-family`: Footer font family (default: `'Roboto', sans-serif`)

## Tooltip

- `--tooltip-bg`: Tooltip background (default: `#000`)
- `--tooltip-fg`: Tooltip text (default: `#fff`)

## Body

- `--body-bg`: Body background (default: `#fff`)
- `--body-fg`: Body text (default: `#000`)

## Usage Example

To customize the theme, define these variables in your global CSS or in a theme provider:

```css
:root {
	--base-color-bg: #ffffff;
	--base-color-fg: #000000;
	--button-primary-bg: #1e88e5;
	--form-input-border: #e0e0e0;
	/* ... other variables */
}
```

For dark mode, you can override these in a `[data-theme="dark"]` selector:

```css
[data-theme="dark"] {
	--base-color-bg: #1a1a1a;
	--base-color-fg: #ffffff;
	--button-primary-bg: #42a5f5;
	--form-input-border: #424242;
	/* ... other variables */
}
```

