![Sveltacular](https://raw.githubusercontent.com/jasonbyrne/sveltacular/main/static/sveltacular.png)

Sveltacular is a TypeScript and SASS based component library for Svelte 5, with no other dependencies.

Why did I create it when there are other options? Well, mainly because the best options out there were based on Tailwind. And, no disrespect to those who love it, but I didn't want to use Tailwind. So since I didn't find what I was looking for, I made my own.

## Installation

```bash
npm i sveltacular
```

## Quick Start

### 1. Import the default stylesheet (once, in your app root)

**For SvelteKit**, add this to `src/routes/+layout.svelte`:

```svelte
<script lang="ts">
	import 'sveltacular/styles.css';
</script>

<slot />
```

**For regular Svelte**, add it to your main `App.svelte` or root component:

```svelte
<script lang="ts">
	import 'sveltacular/styles.css';
</script>
```

### 2. Use components anywhere

```svelte
<script lang="ts">
	import { Button } from 'sveltacular';
</script>

<Button variant="primary" label="Hello World" />
```

**Note**: The stylesheet import is required for components to render with default styling. Import it once at the app level (not in individual components). If you prefer to provide your own theme, you can skip this import and define your own CSS variables (see [Theming](#theming) below).

## Component Catalog

### Forms

- **Button** - Multiple variants (primary, secondary, positive, danger, outline)
- **TextBox** - Text input with validation and formatting options
- **NumberBox** - Number input with min/max/decimals
- **TextArea** - Multi-line text input
- **CheckBox** / **CheckBoxGroup** - Checkbox inputs
- **RadioGroup** / **RadioBox** - Radio button inputs
- **ListBox** - Dropdown/select with search
- **DateBox** - Date picker
- **TimeBox** - Time picker
- **PhoneBox** - Phone number input
- **FileBox** / **FileArea** - File upload
- **Slider** - Range slider input
- **Form** - Form container with validation

### Generic Components

- **Card** - Card container
- **Pill** - Badge/pill component
- **Badge** - Notification badge
- **Avatar** - User avatar with initials fallback
- **Tooltip** - Hover tooltip
- **Popover** - Popover dialog
- **Spinner** - Loading spinner
- **Rating** - Star rating component
- **Chip** - Removable tag/chip
- **Notice** - Alert/notice component
- **Menu** - Dropdown menu
- **List** - Styled list component

### Navigation

- **AppBar** - Application bar
- **SideBar** - Side navigation
- **Breadcrumbs** - Breadcrumb navigation
- **Tabs** - Tab navigation
- **Accordion** - Collapsible sections
- **Wizard** - Multi-step wizard
- **Pagination** - Page navigation
- **Drawer** - Slide-out drawer

### Modals

- **Modal** - Generic modal dialog
- **Alert** - Alert dialog
- **Confirm** - Confirmation dialog
- **Prompt** - Input prompt dialog

### Tables

- **Table** - Table component with header/body/footer
- **DataGrid** - Advanced data grid

### Typography

- **Headline** - Heading component
- **Subtitle** - Subtitle component
- **Text** - Text component
- **Paragraph** - Paragraph component
- **CodeBlock** - Code block

### Layout

- **FlexRow** / **FlexCol** - Flexbox layout
- **Grid** - Grid layout

## Import Patterns

Sveltacular supports multiple import patterns for flexibility:

```typescript
// Root-level imports (all components)
import { Button, Card, Modal } from 'sveltacular';

// Category-level imports
import { Button, TextBox, Form } from 'sveltacular/forms';
import { Card, Badge, Avatar } from 'sveltacular/generic';
import { AppBar, Tabs, Wizard } from 'sveltacular/navigation';

// Component-level imports
import { Button } from 'sveltacular/forms/button';
import { CheckBox, CheckBoxGroup } from 'sveltacular/forms/check-box';
```

## Theming

Sveltacular uses CSS variables for theming. When you import `sveltacular/styles.css`, all default CSS variables are included. You can override any of these variables to customize the appearance of components.

See [THEMING.md](./THEMING.md) for a complete list of available CSS variables.

### Customizing the Theme

Override CSS variables in your own stylesheet (after importing the default styles):

```css
/* Import default styles first */
@import 'sveltacular/styles.css';

/* Then override variables as needed */
:root {
	--button-primary-bg: #1e88e5;
	--form-input-border: #e0e0e0;
	--base-color-bg: #ffffff;
}
```

Or in a Svelte component:

```svelte
<script>
	import 'sveltacular/styles.css';
	import { Button } from 'sveltacular';
</script>

<style>
	:global(:root) {
		--button-primary-bg: #1e88e5;
		--form-input-border: #e0e0e0;
		--base-color-bg: #ffffff;
	}
</style>
```

### Providing Your Own Theme

If you prefer not to use the default stylesheet, you can define all CSS variables yourself. See [THEMING.md](./THEMING.md) for the complete list of required variables.

## Form Validation

Sveltacular includes a validation system:

```typescript
import { createValidationRules, validate } from 'sveltacular/forms/validation';

const rules = [
	createValidationRules.required('Name is required'),
	createValidationRules.minLength(3, 'Must be at least 3 characters'),
	createValidationRules.email('Invalid email address')
];

const result = validate(emailValue, rules);
if (!result.isValid) {
	console.error(result.message);
}
```

## Accessibility

Sveltacular components include:

- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management utilities
- Semantic HTML structure

## Run Storybook

Browse all available components and their props by running Storybook locally:

```bash
npm run storybook
```

## Contributing

Contributions are welcome! Please see the contributing guidelines (coming soon).

## License

MIT
