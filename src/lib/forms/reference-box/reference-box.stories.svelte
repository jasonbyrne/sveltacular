<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import ReferenceBox from './reference-box.svelte';
	import type { ReferenceItem, CreateNewFunction, SearchFunction } from './reference-box.js';

	// Sample static items
	const staticItems: ReferenceItem[] = [
		{ id: 1, name: 'Product A', description: 'High-quality product with excellent features' },
		{ id: 2, name: 'Product B', description: 'Budget-friendly option for everyday use' },
		{ id: 3, name: 'Product C', description: 'Premium choice with advanced capabilities' },
		{ id: 4, name: 'Product D' },
		{ id: 5, name: 'Product E', description: 'Latest model with cutting-edge technology' }
	];

	// Sample items with descriptions
	const itemsWithDescriptions: ReferenceItem[] = [
		{
			id: 'user-1',
			name: 'John Doe',
			description: 'Senior Developer - Frontend Team'
		},
		{
			id: 'user-2',
			name: 'Jane Smith',
			description: 'Product Manager - Product Team'
		},
		{
			id: 'user-3',
			name: 'Bob Johnson',
			description: 'Designer - Design Team'
		},
		{
			id: 'user-4',
			name: 'Alice Williams',
			description: 'QA Engineer - Quality Team'
		},
		{
			id: 'user-5',
			name: 'Charlie Brown',
			description: 'DevOps Engineer - Infrastructure Team'
		}
	];

	// Simulated async search function
	const searchFunction: SearchFunction = async (text: string): Promise<ReferenceItem[]> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 300));

		const searchLower = text.toLowerCase();
		const allItems: ReferenceItem[] = [
			{ id: 1, name: 'Apple', description: 'Fruit company' },
			{ id: 2, name: 'Amazon', description: 'E-commerce giant' },
			{ id: 3, name: 'Microsoft', description: 'Software company' },
			{ id: 4, name: 'Google', description: 'Search engine company' },
			{ id: 5, name: 'Meta', description: 'Social media company' },
			{ id: 6, name: 'Tesla', description: 'Electric vehicle company' },
			{ id: 7, name: 'Netflix', description: 'Streaming service' },
			{ id: 8, name: 'Spotify', description: 'Music streaming service' }
		];

		return allItems.filter(
			(item) =>
				item.name.toLowerCase().includes(searchLower) ||
				item.description?.toLowerCase().includes(searchLower)
		);
	};

	// Create new function
	const createNewFunction: CreateNewFunction = async (
		name: string
	): Promise<ReferenceItem | null> => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		return {
			id: `new-${Date.now()}`,
			name: name,
			description: 'Newly created item'
		};
	};

	// Link builder function for generating links to item details
	const linkBuilder = (item: ReferenceItem): string | undefined => {
		// Generate a link based on item ID
		return `https://example.com/items/${item.id}`;
	};

	// Link builder for users
	const userLinkBuilder = (item: ReferenceItem): string | undefined => {
		// Generate a link to user profile
		return `https://example.com/users/${item.id}`;
	};

	const { Story } = defineMeta({
		component: ReferenceBox,
		title: 'Forms/ReferenceBox',
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: 'text',
				description: 'Label text displayed above the input',
				table: {
					type: { summary: 'string' }
				}
			},
			placeholder: {
				control: 'text',
				description: 'Placeholder text shown when input is empty',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'Search and add items...'" }
				}
			},
			value: {
				control: 'object',
				description: 'Array of selected ReferenceItem objects',
				table: {
					type: { summary: 'ReferenceItem[]' },
					defaultValue: { summary: '[]' }
				}
			},
			items: {
				control: 'object',
				description: 'Static array of ReferenceItem objects for local filtering',
				table: {
					type: { summary: 'ReferenceItem[]' },
					defaultValue: { summary: '[]' }
				}
			},
			search: {
				control: false,
				description: 'Async search function that returns ReferenceItem[]',
				table: {
					type: { summary: 'SearchFunction' }
				}
			},
			createNew: {
				control: false,
				description: 'Async function to create new items',
				table: {
					type: { summary: 'CreateNewFunction' }
				}
			},
			resourceName: {
				control: 'text',
				description: 'Resource name for "Create new..." option',
				table: {
					type: { summary: 'string' }
				}
			},
			required: {
				control: 'boolean',
				description: 'Whether the input is required',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			disabled: {
				control: 'boolean',
				description: 'Whether the input is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the input field',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: "'full'" }
				}
			},
			helperText: {
				control: 'text',
				description: 'Helper text displayed below the input',
				table: {
					type: { summary: 'string' }
				}
			},
			feedback: {
				control: 'object',
				description: 'Feedback message with optional details array',
				table: {
					type: { summary: 'FormFieldFeedback' }
				}
			},
			maxItems: {
				control: 'number',
				description: 'Maximum number of items allowed (undefined = no limit)',
				table: {
					type: { summary: 'number | undefined' },
					defaultValue: { summary: 'undefined' }
				}
			},
			linkBuilder: {
				control: false,
				description: 'Function to generate links for selected items',
				table: {
					type: { summary: 'LinkBuilderFunction' }
				}
			},
			onChange: {
				action: 'changed',
				description: 'Called when items are added or removed',
				table: {
					type: { summary: '(value: ReferenceItem[]) => void' }
				}
			}
		},
		args: {
			onChange: fn(),
			size: 'full'
		}
	});
</script>

<Story
	name="Standard"
	args={{
		label: 'Products',
		placeholder: 'Search and add products...',
		helperText: 'Type to search, use Enter or Tab to select, Escape to close'
	}}
/>

<Story
	name="WithStaticItems"
	args={{
		label: 'Products',
		placeholder: 'Search products...',
		items: staticItems,
		helperText: 'Select from the list of available products'
	}}
/>

<Story
	name="WithSelectedItems"
	args={{
		label: 'Selected Products',
		placeholder: 'Search products...',
		items: staticItems,
		value: [staticItems[0], staticItems[2]],
		helperText: 'Items are displayed as chips below the input'
	}}
/>

<Story
	name="WithAsyncSearch"
	args={{
		label: 'Companies',
		placeholder: 'Type to search companies...',
		search: searchFunction,
		helperText: 'Search is performed asynchronously with a 300ms delay'
	}}
/>

<Story
	name="WithCreateNew"
	args={{
		label: 'Products',
		placeholder: 'Search or create products...',
		items: staticItems,
		createNew: createNewFunction,
		resourceName: 'Product',
		helperText: 'Create new items that do not exist in the list'
	}}
/>

<Story
	name="WithAsyncSearchAndCreate"
	args={{
		label: 'Companies',
		placeholder: 'Search or create companies...',
		search: searchFunction,
		createNew: createNewFunction,
		resourceName: 'Company',
		helperText: 'Combine async search with create new functionality'
	}}
/>

<Story
	name="WithDescriptions"
	args={{
		label: 'Team Members',
		placeholder: 'Search team members...',
		items: itemsWithDescriptions,
		helperText: 'Items with descriptions show additional information'
	}}
/>

<Story
	name="WithSelectedItemsAndDescriptions"
	args={{
		label: 'Team Members',
		placeholder: 'Search team members...',
		items: itemsWithDescriptions,
		value: [itemsWithDescriptions[0], itemsWithDescriptions[1]],
		helperText: 'Selected items show descriptions below the chip'
	}}
/>

<Story
	name="MaxItems"
	args={{
		label: 'Top 3 Products',
		placeholder: 'Select products...',
		items: staticItems,
		maxItems: 3,
		helperText: 'Maximum 3 items allowed'
	}}
/>

<Story
	name="Required"
	args={{
		label: 'Required Products',
		placeholder: 'Select at least one product...',
		items: staticItems,
		required: true,
		helperText: 'At least one item is required'
	}}
/>

<Story
	name="Disabled"
	args={{
		label: 'Products',
		placeholder: 'Search products...',
		items: staticItems,
		disabled: true,
		value: [staticItems[0], staticItems[1]],
		helperText: 'Component is disabled'
	}}
/>

<Story
	name="WithError"
	args={{
		label: 'Products',
		placeholder: 'Select products...',
		items: staticItems,
		feedback: { text: 'Maximum 3 items allowed', isError: true },
		value: [staticItems[0], staticItems[1], staticItems[2], staticItems[3]],
		maxItems: 3
	}}
/>

<Story
	name="ManyItems"
	args={{
		label: 'Selected Items',
		placeholder: 'Search items...',
		items: staticItems,
		value: staticItems,
		helperText: 'Multiple items displayed as chips'
	}}
/>

<Story
	name="KeyboardNavigation"
	args={{
		label: 'Products with Keyboard Navigation',
		placeholder: 'Type and use arrow keys...',
		items: staticItems,
		helperText: 'Use ↑↓ arrow keys to navigate, Enter/Tab to select, Esc to close'
	}}
/>

<Story
	name="LargeItemList"
	args={{
		label: 'All Products',
		placeholder: 'Type to search...',
		items: [
			...staticItems,
			{ id: 6, name: 'Product F', description: 'Feature-rich option' },
			{ id: 7, name: 'Product G', description: 'Enterprise solution' },
			{ id: 8, name: 'Product H', description: 'Starter package' },
			{ id: 9, name: 'Product I', description: 'Professional edition' },
			{ id: 10, name: 'Product J', description: 'Basic version' },
			{ id: 11, name: 'Product K' },
			{ id: 12, name: 'Product L', description: 'Advanced features' },
			{ id: 13, name: 'Product M', description: 'Customizable option' },
			{ id: 14, name: 'Product N', description: 'Scalable solution' },
			{ id: 15, name: 'Product O', description: 'Premium choice' }
		],
		helperText: 'Filtered suggestions update as you type'
	}}
/>

<Story
	name="WithLinkBuilder"
	args={{
		label: 'Products with Links',
		placeholder: 'Search products...',
		items: staticItems,
		value: [staticItems[0], staticItems[2]],
		linkBuilder: linkBuilder,
		helperText: 'Each selected item includes a link to view details'
	}}
/>

<Story
	name="WithLinkBuilderAndDescriptions"
	args={{
		label: 'Team Members with Profile Links',
		placeholder: 'Search team members...',
		items: itemsWithDescriptions,
		value: [itemsWithDescriptions[0], itemsWithDescriptions[1]],
		linkBuilder: userLinkBuilder,
		helperText: 'Selected items show descriptions and include profile links'
	}}
/>

<Story
	name="WithLinkBuilderAndAsyncSearch"
	args={{
		label: 'Companies with Links',
		placeholder: 'Search companies...',
		search: searchFunction,
		linkBuilder: linkBuilder,
		helperText: 'Async search with links to company details'
	}}
/>
