# Testing Guide for Sveltacular

This guide covers the comprehensive testing infrastructure for Sveltacular, including unit tests, integration tests, visual regression tests, and accessibility testing.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Writing Unit Tests](#writing-unit-tests)
- [Writing E2E Tests](#writing-e2e-tests)
- [Test Utilities](#test-utilities)
- [Testing Patterns](#testing-patterns)
- [Coverage Requirements](#coverage-requirements)
- [CI/CD Integration](#cicd-integration)

---

## Overview

Sveltacular uses a multi-layered testing approach:

1. **Unit Tests** - Test individual components and utilities in isolation
2. **Integration Tests** - Test component interactions and workflows
3. **E2E Tests** - Test complete user flows in a real browser
4. **Visual Regression** - Catch unintended visual changes
5. **Accessibility Tests** - Ensure WCAG 2.1 AA compliance

**Coverage Target:** 80%+ for lines, functions, branches, and statements

---

## Testing Stack

### Unit & Integration Testing

- **Vitest** - Fast unit test framework with Vite integration
- **@testing-library/svelte** - Component testing utilities
- **@testing-library/jest-dom** - DOM matchers
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM implementation for Node.js

### E2E & Visual Testing

- **Playwright** - Cross-browser E2E testing
- **Storybook** - Component documentation and visual testing

### Coverage

- **@vitest/coverage-v8** - Code coverage reporting

---

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Debug E2E tests
npm run test:e2e:debug

# Run specific test file
npx playwright test tests/e2e/button.spec.ts
```

### All Tests

```bash
# Run unit and E2E tests
npm run test:all
```

---

## Writing Unit Tests

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '$lib/test-utils';
import Button from './button.svelte';

describe('Button', () => {
	it('should render with label', () => {
		const { container } = render(Button, { label: 'Click me' });
		const button = container.querySelector('button');

		expect(button).toBeInTheDocument();
		expect(button?.textContent).toContain('Click me');
	});
});
```

### Testing User Interactions

```typescript
import { fireEvent } from '@testing-library/svelte';
import { vi } from 'vitest';

it('should call onClick when clicked', async () => {
	const onClick = vi.fn();
	const { container } = render(Button, { label: 'Click', onClick });
	const button = container.querySelector('button')!;

	await fireEvent.click(button);

	expect(onClick).toHaveBeenCalledTimes(1);
});
```

### Testing Reactive State

```typescript
import { waitForSvelte } from '$lib/test-utils';

it('should update value on input', async () => {
	let value = $state('');
	const { container } = render(TextBox, { label: 'Name', value });
	const input = container.querySelector('input')!;

	await fireEvent.input(input, { target: { value: 'Jane' } });
	await waitForSvelte();

	expect(input).toHaveValue('Jane');
});
```

### Testing Accessibility

```typescript
import { hasAccessibleName, isKeyboardAccessible } from '$lib/test-utils';

it('should be accessible', () => {
	const { container } = render(Button, { label: 'Accessible' });
	const button = container.querySelector('button')!;

	expect(hasAccessibleName(button)).toBe(true);
	expect(isKeyboardAccessible(button)).toBe(true);
	expect(button).toHaveAttribute('aria-label');
});
```

---

## Writing E2E Tests

### Basic E2E Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/?path=/story/forms-button--default');
		await page.waitForSelector('iframe[id="storybook-preview-iframe"]');
	});

	test('should render and be clickable', async ({ page }) => {
		const frame = page.frameLocator('iframe[id="storybook-preview-iframe"]');
		const button = frame.locator('button').first();

		await expect(button).toBeVisible();
		await button.click();
	});
});
```

### Visual Regression Test

```typescript
test('should match visual snapshot', async ({ page }) => {
	const frame = page.frameLocator('iframe[id="storybook-preview-iframe"]');
	const button = frame.locator('button').first();

	await expect(button).toHaveScreenshot('button-default.png');
});
```

### Testing Keyboard Navigation

```typescript
test('should navigate with keyboard', async ({ page }) => {
	const frame = page.frameLocator('iframe[id="storybook-preview-iframe"]');
	const button = frame.locator('button').first();

	await button.focus();
	await page.keyboard.press('Enter');

	// Assert expected behavior
});
```

---

## Test Utilities

### Render Helpers

```typescript
import { render, waitForSvelte, waitForTicks } from '$lib/test-utils';

// Enhanced render with common setup
const { container } = render(Component, { prop: 'value' });

// Wait for Svelte to update DOM
await waitForSvelte();

// Wait for multiple ticks
await waitForTicks(3);
```

### Mock Helpers

```typescript
import {
	mockFetch,
	mockTimers,
	mockViewport,
	mockMediaQuery,
	mockClipboard
} from '$lib/test-utils';

// Mock fetch API
mockFetch({ data: 'response' }, { ok: true, status: 200 });

// Mock timers
mockTimers(); // Use in beforeEach
vi.advanceTimersByTime(1000);

// Mock viewport size
mockViewport(375, 667); // Mobile viewport

// Mock media query
mockMediaQuery('(prefers-color-scheme: dark)', true);
```

### Accessibility Helpers

```typescript
import {
	hasAccessibleName,
	getAccessibleName,
	isKeyboardAccessible,
	hasRole,
	isInvalid,
	isRequired,
	getFocusableElements
} from '$lib/test-utils';

// Check accessibility
expect(hasAccessibleName(element)).toBe(true);
expect(getAccessibleName(element)).toBe('Submit');
expect(isKeyboardAccessible(element)).toBe(true);

// Check ARIA attributes
expect(hasRole(element, 'button')).toBe(true);
expect(isInvalid(element)).toBe(false);
expect(isRequired(element)).toBe(true);

// Get all focusable elements
const focusable = getFocusableElements(container);
```

### Test Data

```typescript
import {
	mockMenuItems,
	mockListItems,
	mockUsers,
	mockTableData,
	generateLargeDataset
} from '$lib/test-utils';

// Use predefined test data
const items = mockListItems;

// Generate large datasets for performance testing
const largeDataset = generateLargeDataset(10000);
```

---

## Testing Patterns

### Testing Component Variants

```typescript
describe('Size Variants', () => {
	it('should apply size classes', () => {
		const sizes = ['sm', 'md', 'lg', 'xl'] as const;

		sizes.forEach((size) => {
			const { container } = render(Button, { label: 'Test', size });
			const button = container.querySelector('button');
			expect(button).toHaveClass(size);
		});
	});
});
```

### Testing Error States

```typescript
describe('Validation', () => {
	it('should show error message', () => {
		const { container } = render(TextBox, {
			label: 'Email',
			errorText: 'Invalid email'
		});

		const error = container.querySelector('.error-text');
		const input = container.querySelector('input');

		expect(error).toBeInTheDocument();
		expect(error?.textContent).toBe('Invalid email');
		expect(input).toHaveAttribute('aria-invalid', 'true');
	});
});
```

### Testing Async Operations

```typescript
describe('Async Loading', () => {
	it('should show loading state', async () => {
		vi.useFakeTimers();

		const { container } = render(Component, { isLoading: true });

		expect(container.querySelector('.loading')).toBeInTheDocument();

		vi.useRealTimers();
	});
});
```

### Testing Keyboard Navigation

```typescript
describe('Keyboard Navigation', () => {
	it('should navigate with arrow keys', async () => {
		const { container } = render(Menu, { items: mockMenuItems });
		const menu = container.querySelector('[role="menu"]')!;

		await fireEvent.keyDown(menu, { key: 'ArrowDown' });

		const firstItem = container.querySelector('[role="menuitem"]');
		expect(firstItem).toHaveAttribute('tabindex', '0');
	});
});
```

### Testing Focus Management

```typescript
describe('Focus Trap', () => {
	it('should trap focus within modal', async () => {
		const { container } = render(Modal, { open: true });
		const modal = container.querySelector('[role="dialog"]')!;
		const focusable = getFocusableElements(modal);

		expect(focusable.length).toBeGreaterThan(0);
		expect(isFocusTrapped(modal)).toBe(true);
	});
});
```

---

## Coverage Requirements

### Thresholds

All coverage metrics must meet or exceed **80%**:

- Lines: 80%
- Functions: 80%
- Branches: 80%
- Statements: 80%

### Viewing Coverage

```bash
# Generate coverage report
npm run test:coverage

# Open HTML report
open coverage/index.html
```

### Coverage Report Locations

- **Text Report** - Terminal output
- **HTML Report** - `coverage/index.html`
- **LCOV Report** - `coverage/lcov.info` (for CI/CD)
- **JSON Report** - `coverage/coverage-final.json`

### Excluded from Coverage

- Storybook stories (`*.stories.svelte`)
- Test files (`*.test.ts`, `*.spec.ts`)
- Test utilities (`test-utils/**`)
- Type definitions (`types/**`)
- Barrel exports (`index.ts`)

---

## CI/CD Integration

### GitHub Actions Workflows

#### Test Workflow (`.github/workflows/test.yml`)

Runs on every push and pull request:

1. **Unit Tests** - Run on Node 18.x and 20.x
2. **Type Checking** - Validate TypeScript
3. **Linting** - Check code style
4. **Coverage** - Upload to Codecov
5. **E2E Tests** - Run Playwright tests
6. **Build** - Verify package builds

#### Publish Workflow (`.github/workflows/publish.yml`)

Runs on release creation:

1. Run all tests
2. Build package
3. Publish to NPM

#### Storybook Workflow (`.github/workflows/storybook.yml`)

Deploys Storybook to GitHub Pages on main branch push.

### Local Pre-commit Checks

Before committing, ensure:

```bash
# Type check
npm run check

# Lint
npm run lint

# Test
npm run test

# Coverage
npm run test:coverage
```

---

## Best Practices

### DO ✅

- Write tests for all new components
- Test accessibility features
- Test error states and edge cases
- Use descriptive test names
- Keep tests focused and isolated
- Mock external dependencies
- Test keyboard navigation
- Verify ARIA attributes
- Use test utilities for consistency
- Aim for 80%+ coverage

### DON'T ❌

- Test implementation details
- Write brittle tests that break on refactoring
- Skip accessibility tests
- Ignore edge cases
- Test third-party library internals
- Use sleep/setTimeout (use waitForSvelte instead)
- Duplicate test logic
- Leave tests commented out
- Skip CI checks

---

## Troubleshooting

### Tests Timing Out

```typescript
// Increase timeout for slow tests
test(
	'slow operation',
	async () => {
		// ...
	},
	{ timeout: 10000 }
);
```

### Flaky Tests

```typescript
// Use proper wait utilities
await waitForSvelte();
await waitForElement('.selector');

// Mock timers for consistency
vi.useFakeTimers();
```

### Coverage Not Meeting Threshold

```bash
# Identify uncovered lines
npm run test:coverage

# Check HTML report for details
open coverage/index.html
```

### E2E Tests Failing

```bash
# Run with headed browser
npx playwright test --headed

# Debug mode
npm run test:e2e:debug

# Update snapshots
npx playwright test --update-snapshots
```

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro)
- [Playwright Documentation](https://playwright.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Accessibility Testing Guide](./ACCESSIBILITY.md)

---

## Contributing

When adding new components:

1. Write unit tests covering all props and states
2. Write accessibility tests
3. Add E2E tests for critical user flows
4. Ensure 80%+ coverage
5. Update this guide if introducing new patterns

For questions or issues, please open a GitHub issue.
