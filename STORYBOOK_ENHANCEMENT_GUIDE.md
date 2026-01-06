# Storybook Enhancement Guide

This guide explains how to enhance Storybook stories with better documentation, controls, and accessibility notes.

## Pattern for Enhanced Stories

All stories should follow this pattern:

```svelte
<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import YourComponent from './your-component.svelte';

	/**
	 * Component description explaining what it does.
	 * 
	 * **Accessibility**: Notes about accessibility features, ARIA attributes, keyboard navigation, etc.
	 * 
	 * **Usage**: 
	 * ```svelte
	 * <YourComponent prop1="value" prop2={value} />
	 * ```
	 */
	const { Story } = defineMeta({
		component: YourComponent,
		title: 'Category/ComponentName',
		tags: ['autodocs'],
		argTypes: {
			prop1: {
				control: 'text', // or 'select', 'boolean', 'number', etc.
				description: 'Description of what this prop does',
				table: {
					type: { summary: 'TypeName' },
					defaultValue: { summary: 'defaultValue' }
				}
			},
			// ... more props
		},
		args: {
			// Default args
		}
	});
</script>

<Story name="Example" args={{ prop1: 'value' }}>
	Description of what this story demonstrates.
</Story>
```

## Key Elements

### 1. Component Documentation (JSDoc comment)
- Brief description of what the component does
- **Accessibility** section with notes about:
  - ARIA attributes used
  - Keyboard navigation support
  - Focus management
  - Screen reader considerations
- **Usage** section with code example

### 2. argTypes
Define controls and documentation for each prop:
- `control`: Type of control ('text', 'select', 'boolean', 'number', 'color', etc.)
- `description`: Human-readable description
- `table`: Type information and default values

### 3. Story Descriptions
Each Story should have a brief description explaining what it demonstrates.

## Control Types

- `'text'` - Text input
- `'select'` - Dropdown with options
- `'boolean'` - Checkbox
- `'number'` - Number input
- `'color'` - Color picker
- `'date'` - Date picker
- `'object'` - JSON editor

## Examples

See these enhanced stories for reference:
- `src/lib/forms/button/button.stories.svelte`
- `src/lib/forms/text-box/text-box.stories.svelte`
- `src/lib/forms/form.stories.svelte`
- `src/lib/generic/card/card.stories.svelte`
- `src/lib/modals/alert.stories.svelte`

## Accessibility Notes Template

When documenting accessibility, include:
- ARIA attributes used (aria-label, aria-describedby, role, etc.)
- Keyboard navigation (Tab, Enter, Escape, arrow keys)
- Focus management (focus trapping, focus restoration)
- Screen reader considerations
- Any accessibility warnings or best practices

## Status

The following stories have been enhanced:
- ✅ Button
- ✅ TextBox
- ✅ Form
- ✅ Card
- ✅ Alert

Remaining stories should be enhanced following this pattern.









