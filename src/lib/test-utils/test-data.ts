/**
 * Test data fixtures for component testing
 */

import type { ReferenceItem } from '$lib/types/form.js';

type MenuItem = ReferenceItem;
type ListItem = { label: string; value: string };

/**
 * Sample menu items for testing
 */
export const mockMenuItems: MenuItem[] = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3', disabled: true },
	{ value: 'option4', label: 'Option 4' }
];

/**
 * Sample list items for testing
 */
export const mockListItems: ListItem[] = [
	{ label: 'Item 1', value: 'item1' },
	{ label: 'Item 2', value: 'item2' },
	{ label: 'Item 3', value: 'item3' },
	{ label: 'Item 4', value: 'item4' },
	{ label: 'Item 5', value: 'item5' }
];

/**
 * Large dataset for virtual scrolling tests
 */
export function generateLargeDataset(count: number = 1000): ListItem[] {
	return Array.from({ length: count }, (_, i) => ({
		label: `Item ${i + 1}`,
		value: `item${i + 1}`
	}));
}

/**
 * Sample form data for testing
 */
export const mockFormData = {
	text: 'Sample text',
	email: 'test@example.com',
	number: 42,
	date: '2024-01-01',
	checkbox: true,
	radio: 'option1',
	select: 'option2',
	textarea: 'Multi-line\ntext content'
};

/**
 * Sample user data for testing
 */
export const mockUsers = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
	{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

/**
 * Sample table data for testing
 */
export const mockTableData = {
	columns: [
		{ id: 'id', label: 'ID', sortable: true },
		{ id: 'name', label: 'Name', sortable: true },
		{ id: 'email', label: 'Email', sortable: true },
		{ id: 'role', label: 'Role', sortable: false }
	],
	rows: mockUsers
};

/**
 * Sample navigation items for testing
 */
export const mockNavItems = [
	{ id: 'home', label: 'Home', href: '/', icon: 'home' },
	{ id: 'about', label: 'About', href: '/about', icon: 'info' },
	{ id: 'contact', label: 'Contact', href: '/contact', icon: 'envelope' }
];

/**
 * Sample breadcrumb items for testing
 */
export const mockBreadcrumbs = [
	{ label: 'Home', href: '/' },
	{ label: 'Products', href: '/products' },
	{ label: 'Electronics', href: '/products/electronics' },
	{ label: 'Laptops' }
];

/**
 * Sample tab items for testing
 */
export const mockTabs = [
	{ id: 'tab1', label: 'Tab 1', content: 'Content 1' },
	{ id: 'tab2', label: 'Tab 2', content: 'Content 2' },
	{ id: 'tab3', label: 'Tab 3', content: 'Content 3', disabled: true }
];

/**
 * Sample color options for testing
 */
export const mockColors = [
	{ id: 'red', label: 'Red', value: '#ff0000' },
	{ id: 'green', label: 'Green', value: '#00ff00' },
	{ id: 'blue', label: 'Blue', value: '#0000ff' },
	{ id: 'yellow', label: 'Yellow', value: '#ffff00' }
];
