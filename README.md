![Sveltacular](https://raw.githubusercontent.com/jasonbyrne/sveltacular/main/static/sveltacular.png)

Sveltacular is a comprehensive TypeScript and SASS based component library for Svelte 5, with **zero runtime dependencies**.

Why did I create it when there are other options? Well, mainly because the best options out there were based on Tailwind. And, no disrespect to those who love it, but I didn't want to use Tailwind. So since I didn't find what I was looking for, I made my own.

## Features

- ✅ **100+ Components** - Comprehensive component library covering forms, navigation, modals, tables, and more
- ✅ **Zero Dependencies** - Built with pure Svelte 5, TypeScript, and SASS
- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with ARIA support and keyboard navigation
- ✅ **Svelte 5 Native** - Uses modern runes (`$state`, `$derived`, `$props`) throughout
- ✅ **TypeScript** - Full type safety with comprehensive type definitions
- ✅ **Themable** - CSS custom properties for easy customization
- ✅ **Well Tested** - Unit tests, E2E tests, and comprehensive test utilities
- ✅ **Storybook** - Interactive documentation for all components

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

- **Button** - Multiple variants (primary, secondary, positive, danger, outline) with loading states
- **TextBox** - Text input with validation, success states, loading indicators, and character counting
- **NumberBox** - Number input with min/max/decimals
- **NumberRangeBox** - Range input for min/max values
- **TextArea** - Multi-line text input with auto-resize support
- **CheckBox** / **CheckBoxGroup** - Checkbox inputs with grouping
- **RadioGroup** / **RadioBox** - Radio button inputs
- **ListBox** - Dropdown/select with search and virtual scrolling
- **DateBox** - Date picker
- **TimeBox** - Time picker
- **PhoneBox** - Phone number input with formatting
- **FileBox** / **FileArea** - File upload with drag-and-drop
- **Slider** - Range slider with tooltip and value display
- **SwitchBox** - Toggle switch component
- **BoolBox** - Boolean input component
- **MoneyBox** - Currency input with formatting
- **TagBox** - Tag input with chip display
- **UrlBox** - URL input with validation
- **InfoBox** - Information display box
- **NewOrExistingCombo** - Combo component for new/existing selection
- **Form** - Form container with validation
- **FormField** - Form field wrapper with label and error handling
- **FormLabel** - Accessible form label
- **FormRow** - Form row layout
- **FormSection** - Form section grouping
- **FormHeader** / **FormFooter** - Form header and footer components

### Generic Components

- **Card** - Card container with variants
- **Pill** - Badge/pill component
- **Badge** - Notification badge
- **Avatar** - User avatar with initials fallback
- **Tooltip** - Hover tooltip with positioning
- **Popover** - Popover dialog with smart positioning
- **Spinner** - Loading spinner
- **Rating** - Star rating component
- **Chip** - Removable tag/chip
- **Notice** - Alert/notice component
- **Menu** - Dropdown menu with keyboard navigation
- **List** - Styled list component with variants
- **Empty** - Empty state component
- **Divider** - Visual divider/separator
- **Dot** - Status dot indicator
- **Panel** - Panel container
- **Section** - Section container
- **Header** - Header component
- **Link** - Styled link component
- **Email** - Email display component
- **Phone** - Phone number display
- **Address** - Address display component
- **DateTime** - Date/time display
- **Scorecard** - Scorecard/metric display
- **Toaster** - Toast notification system
- **Overlay** - Overlay component
- **DropdownItem** - Dropdown menu item
- **ThemeProvider** - Theme provider component

### Navigation

- **AppBar** - Application bar with navigation
- **SideBar** - Side navigation
- **Breadcrumbs** - Breadcrumb navigation
- **Tabs** - Tab navigation with keyboard support
- **Accordion** - Collapsible sections
- **Wizard** - Multi-step wizard
- **Pagination** - Page navigation
- **Drawer** - Slide-out drawer
- **CommandPalette** - Keyboard-driven command interface (⌘K / Ctrl+K) with fuzzy search
- **ContextMenu** - Right-click context menu with nested submenus
- **DropdownButton** - Button with dropdown menu

### Modals

- **Modal** - Generic modal dialog with focus trap
- **Alert** - Alert dialog
- **Confirm** - Confirmation dialog
- **Prompt** - Input prompt dialog
- **DialogWindow** - Dialog window component
- **DialogHeader** / **DialogBody** / **DialogFooter** - Dialog structure components
- **DialogCloseButton** - Dialog close button

### Tables

- **Table** - Table component with header/body/footer
- **DataGrid** - Advanced data grid with sorting and formatting
- **TableRow** / **TableCell** - Table row and cell components
- **TableHeader** / **TableHeaderCell** - Table header components
- **TableCaption** - Table caption component

### Typography

- **Headline** - Heading component
- **Subtitle** - Subtitle component
- **Text** - Text component
- **Paragraph** - Paragraph component
- **CodeBlock** - Code block with syntax highlighting
- **Code** - Inline code component

### Layout

- **FlexRow** / **FlexCol** - Flexbox layout components
- **FlexItem** - Flex item component
- **Grid** - Grid layout component

### Placeholders

- **Loading** - Loading placeholder
- **Progress** - Progress indicator
- **SkeletonText** - Text skeleton loader
- **SkeletonParagraph** - Paragraph skeleton loader
- **SkeletonInput** - Input skeleton loader
- **SkeletonTable** - Table skeleton loader

### Timeline

- **Timeline** - Timeline container
- **TimelineItem** - Timeline item component

### Images & Icons

- **Image** - Image component with lazy loading
- **Icon** - Icon component
- **SvgIcon** - SVG icon wrapper
- Built-in icons: AngleRightIcon, AngleUpIcon, CheckIcon, CopyIcon, EnvelopeIcon, FolderOpenIcon, HamburgerIcon, HomeIcon, LinkIcon, MobilePhoneIcon, PhoneIcon, UploadIcon

### Data

- **Countries** - Country data utilities
- **UnitedStates** - US states data
- **Canada** - Canadian provinces data
- **Colors** - Color utilities

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

Sveltacular is committed to **WCAG 2.1 AA compliance** across all components. Every component includes:

- ✅ **ARIA Attributes** - Proper roles, states, and properties for screen readers
- ✅ **Keyboard Navigation** - Full keyboard support for all interactive components
- ✅ **Focus Management** - Focus traps for modals, roving tabindex for menus
- ✅ **Screen Reader Support** - Live region announcements for dynamic content
- ✅ **Semantic HTML** - Proper HTML structure with meaningful elements
- ✅ **Color Contrast** - All components meet WCAG contrast requirements
- ✅ **Focus Indicators** - Visible focus rings for keyboard navigation
- ✅ **Reduced Motion** - Respects `prefers-reduced-motion` preference

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for detailed accessibility documentation and best practices.

## Form Enhancements

Sveltacular includes enhanced form components with modern UX features:

### TextBox Enhancements

- **Success States** - Visual success feedback with animated checkmark
- **Loading Indicators** - Show loading spinner during async validation
- **Character Counting** - Display character count with visual warnings (90% yellow, 100% red)

### TextArea Enhancements

- **Auto-Resize** - Automatically grows/shrinks based on content
- **Min/Max Rows** - Configurable row constraints

### Slider Enhancements

- **Tooltip Display** - Show value tooltip on drag/focus
- **Value Display** - Optional value display below slider
- **Custom Formatting** - Format values with custom formatter function

### FileArea Enhancements

- **Enhanced Drag States** - Visual feedback with scale, glow, and transitions
- **Smooth Animations** - CSS-based animations for optimal performance

## Testing

Sveltacular includes comprehensive testing infrastructure:

### Unit Tests

```bash
npm run test              # Run unit tests
npm run test:ui          # Run with UI
npm run test:coverage    # Run with coverage report
```

### E2E Tests

```bash
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run with UI
npm run test:e2e:debug   # Debug mode
```

### All Tests

```bash
npm run test:all         # Run unit and E2E tests
```

See [TESTING.md](./TESTING.md) for comprehensive testing documentation.

## Helpers & Utilities

Sveltacular provides a rich set of helper utilities:

### Focus Management

- `createFocusTrap` - Trap focus within modals
- `RovingTabindexManager` - Manage keyboard navigation in lists/menus

### Screen Reader Announcements

- `announcePolite` - Polite announcements
- `announceError` - Error announcements
- `announceLoading` - Loading state announcements

### Search & Filtering

- `fuzzySearch` - Zero-dependency fuzzy search implementation

### Animation Helpers

- Animation actions for fade, scale, slide effects
- Spring animations
- Respects `prefers-reduced-motion`

### Other Utilities

- `debounce` - Debounce function calls
- `uniqueId` - Generate unique IDs
- `capitalize` / `ucfirst` - String utilities
- `ago` - Relative time formatting
- `roundToDecimals` - Number formatting
- Date utilities, positioning helpers, and more

See the [helpers documentation](./src/lib/helpers/) for the complete list.

## Development

### Run Storybook

Browse all available components and their props by running Storybook locally:

```bash
npm run storybook
```

### Development Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run check            # Type check
npm run lint             # Lint code
npm run format           # Format code
```

## Documentation

- **[THEMING.md](./THEMING.md)** - Complete theming guide with all CSS variables
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** - Accessibility features and best practices
- **[TESTING.md](./TESTING.md)** - Testing guide and utilities
- **[Storybook](http://localhost:6006)** - Interactive component documentation (run `npm run storybook`)

## Recent Updates

### Version 1.0.6

- ✅ **Command Palette** - Keyboard-driven command interface with fuzzy search
- ✅ **Context Menu** - Right-click menu with nested submenus
- ✅ **Form Enhancements** - Success states, loading indicators, character counting, auto-resize
- ✅ **Comprehensive Testing** - Unit tests, E2E tests, and test utilities
- ✅ **Accessibility Improvements** - Enhanced ARIA support and keyboard navigation

## Contributing

Contributions are welcome! Please see the contributing guidelines (coming soon).

## License

Apache-2.0
