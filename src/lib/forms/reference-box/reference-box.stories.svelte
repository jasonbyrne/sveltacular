<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import ReferenceBox from './reference-box.svelte';
	import type { ReferenceItem } from '$lib/types/form.js';

	// Sample static items
	const staticItems: ReferenceItem[] = [
		{ value: 1, label: 'Product A', description: 'High-quality product with excellent features' },
		{ value: 2, label: 'Product B', description: 'Budget-friendly option for everyday use' },
		{ value: 3, label: 'Product C', description: 'Premium choice with advanced capabilities' },
		{ value: 4, label: 'Product D' },
		{ value: 5, label: 'Product E', description: 'Latest model with cutting-edge technology' }
	];

	// Sample items with descriptions
	const itemsWithDescriptions: ReferenceItem[] = [
		{
			value: 'user-1',
			label: 'John Doe',
			description: 'Senior Developer - Frontend Team'
		},
		{
			value: 'user-2',
			label: 'Jane Smith',
			description: 'Product Manager - Product Team'
		},
		{
			value: 'user-3',
			label: 'Bob Johnson',
			description: 'Designer - Design Team'
		},
		{
			value: 'user-4',
			label: 'Alice Williams',
			description: 'QA Engineer - Quality Team'
		},
		{
			value: 'user-5',
			label: 'Charlie Brown',
			description: 'DevOps Engineer - Infrastructure Team'
		}
	];

	// Simulated async search function
	const searchFunction = async (text: string): Promise<ReferenceItem[]> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 300));

		const searchLower = text.toLowerCase();
		const allItems: ReferenceItem[] = [
			{ value: 1, label: 'Apple', description: 'Fruit company' },
			{ value: 2, label: 'Amazon', description: 'E-commerce giant' },
			{ value: 3, label: 'Microsoft', description: 'Software company' },
			{ value: 4, label: 'Google', description: 'Search engine company' },
			{ value: 5, label: 'Meta', description: 'Social media company' },
			{ value: 6, label: 'Tesla', description: 'Electric vehicle company' },
			{ value: 7, label: 'Netflix', description: 'Streaming service' },
			{ value: 8, label: 'Spotify', description: 'Music streaming service' }
		];

		return allItems.filter(
			(item) =>
				item.label.toLowerCase().includes(searchLower) ||
				item.description?.toLowerCase().includes(searchLower)
		);
	};

	// Create new function
	const createNewFunction = async (name: string): Promise<ReferenceItem | null> => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));
		return {
			value: `new-${Date.now()}`,
			label: name,
			description: 'Newly created item'
		};
	};

	// Link builder function for generating links to item details
	const linkBuilder = (item: ReferenceItem): string | undefined => {
		// Generate a link based on item value
		return `https://example.com/items/${item.value}`;
	};

	// Link builder for users
	const userLinkBuilder = (item: ReferenceItem): string | undefined => {
		// Generate a link to user profile
		return `https://example.com/users/${item.value}`;
	};

	// Database types for field mapping examples
	type Topic = { id: number; name: string; slug: string };
	type Category = { id: number; title: string; description: string };

	// Sample database objects
	const topics: Topic[] = [
		{ id: 1, name: 'AI & Machine Learning', slug: 'ai-ml' },
		{ id: 2, name: 'Web Development', slug: 'web-dev' },
		{ id: 3, name: 'Cloud Computing', slug: 'cloud' },
		{ id: 4, name: 'Data Science', slug: 'data-science' },
		{ id: 5, name: 'Mobile Development', slug: 'mobile' }
	];

	const categories: Category[] = [
		{ id: 1, title: 'Technology', description: 'Latest tech trends and innovations' },
		{ id: 2, title: 'Business', description: 'Business strategies and insights' },
		{ id: 3, title: 'Science', description: 'Scientific discoveries and research' },
		{ id: 4, title: 'Health', description: 'Health and wellness topics' }
	];

	// Example showing generic types with CardPlayer
	type CardPlayer = { id: number; name: string; team: string; position: string };
	
	const cardPlayers: CardPlayer[] = [
		{ id: 1, name: 'LeBron James', team: 'Los Angeles Lakers', position: 'Forward' },
		{ id: 2, name: 'Stephen Curry', team: 'Golden State Warriors', position: 'Guard' },
		{ id: 3, name: 'Kevin Durant', team: 'Phoenix Suns', position: 'Forward' },
		{ id: 4, name: 'Giannis Antetokounmpo', team: 'Milwaukee Bucks', position: 'Forward' },
		{ id: 5, name: 'Luka Dončić', team: 'Dallas Mavericks', position: 'Guard' }
	];

	// Generic type functions that work directly with CardPlayer type
	const searchPlayers = async (text: string): Promise<CardPlayer[]> => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		const searchLower = text.toLowerCase();
		return cardPlayers.filter(
			(player) =>
				player.name.toLowerCase().includes(searchLower) ||
				player.team.toLowerCase().includes(searchLower) ||
				player.position.toLowerCase().includes(searchLower)
		);
	};

	const createNewPlayer = async (name: string): Promise<CardPlayer | null> => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return {
			id: Date.now(),
			name,
			team: 'Free Agent',
			position: 'Unknown'
		};
	};

	const playerLinkBuilder = (player: CardPlayer): string | undefined => {
		// This function receives CardPlayer directly, not ReferenceItem
		return `https://example.com/players/${player.id}`;
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
					type: { summary: '(text: string) => Promise<T[]>' }
				}
			},
			createNew: {
				control: false,
				description: 'Async function to create new items',
				table: {
					type: { summary: '(inputName: string) => Promise<T | null>' }
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
					type: { summary: '(item: T) => string | undefined' }
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


<Story
	name="WithDatabaseObjects"
	args={{
		label: 'Topics (Database Objects)',
		placeholder: 'Search and add topics...',
		items: topics,
		fieldNames: { label: 'name', value: 'id' },
		value: [topics[0], topics[2]],
		helperText: 'Using fieldNames to map database objects directly - no transformation needed!'
	}}
/>

<Story
	name="WithFieldMappingAndDescription"
	args={{
		label: 'Categories (with Description Field)',
		placeholder: 'Search categories...',
		items: categories,
		fieldNames: { label: 'title', value: 'id', description: 'description' },
		value: [categories[0]],
		helperText: 'Map custom field names including description field'
	}}
/>

<Story
	name="FieldMappingBackwardsCompatible"
	args={{
		label: 'Products (Traditional ReferenceItem)',
		placeholder: 'Search products...',
		items: staticItems,
		value: [staticItems[0], staticItems[1]],
		helperText: 'Without fieldNames prop, component works exactly as before'
	}}
/>

<Story
	name="GenericTypeWithAllFeatures"
	args={{
		label: 'Card Players (Generic Types Demo)',
		placeholder: 'Search players...',
		fieldNames: { label: 'name', value: 'id' },
		search: searchPlayers,
		createNew: createNewPlayer,
		linkBuilder: playerLinkBuilder,
		resourceName: 'player',
		value: [cardPlayers[0]],
		helperText: 'Demonstrates generic types - search, createNew, and linkBuilder all work directly with CardPlayer type (not ReferenceItem)'
	}}
/>
