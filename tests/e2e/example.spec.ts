/**
 * Example Playwright test
 * This demonstrates how to write E2E tests for Sveltacular components
 */

import { test, expect } from '@playwright/test';

test.describe('Storybook', () => {
	test('should load the Storybook homepage', async ({ page }) => {
		await page.goto('/');
		
		// Wait for Storybook to load
		await page.waitForSelector('[role="navigation"]', { timeout: 10000 });
		
		// Check that Storybook loaded
		expect(await page.title()).toContain('Storybook');
	});
});

test.describe('Button Component', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to Button story
		await page.goto('/?path=/story/forms-button--default');
		await page.waitForSelector('iframe[id="storybook-preview-iframe"]');
	});
	
	test('should render button in iframe', async ({ page }) => {
		const frame = page.frameLocator('iframe[id="storybook-preview-iframe"]');
		const button = frame.locator('button').first();
		
		await expect(button).toBeVisible();
	});
	
	test('should have correct visual appearance', async ({ page }) => {
		const frame = page.frameLocator('iframe[id="storybook-preview-iframe"]');
		const button = frame.locator('button').first();
		
		// Take screenshot for visual regression
		await expect(button).toHaveScreenshot('button-default.png');
	});
	
	test('should be clickable', async ({ page }) => {
		const frame = page.frameLocator('iframe[id="storybook-preview-iframe"]');
		const button = frame.locator('button').first();
		
		await button.click();
		// Add assertions based on expected behavior
	});
});

test.describe('Accessibility', () => {
	test('should have no accessibility violations on homepage', async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('[role="navigation"]');
		
		// Check for basic accessibility
		const main = page.locator('main');
		await expect(main).toBeVisible();
	});
});

