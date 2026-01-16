<script lang="ts">
	/**
	 * This file demonstrates the type-safe usage of DataGrid with generics.
	 * It shows how TypeScript will catch errors at compile time.
	 */
	import DataGrid from './data-grid.svelte';
	import type { ColumnDef, JsonObject, DataGridActions } from '$src/lib/types/data.js';

	// Define a strongly-typed interface for our data
	interface Product extends JsonObject {
		id: number;
		name: string;
		price: number;
		category: string;
		inStock: boolean;
		rating: number;
	}

	// Sample data with the Product type
	const products: Product[] = [
		{
			id: 1,
			name: 'Laptop',
			price: 1299.99,
			category: 'Electronics',
			inStock: true,
			rating: 4.5
		},
		{
			id: 2,
			name: 'Coffee Mug',
			price: 12.99,
			category: 'Kitchen',
			inStock: true,
			rating: 4.8
		},
		{
			id: 3,
			name: 'Desk Chair',
			price: 299.99,
			category: 'Furniture',
			inStock: false,
			rating: 4.2
		}
	];

	// Type-safe column definitions
	// The 'key' property must match a property in the Product interface
	const columns: ColumnDef<Product>[] = [
		{ key: 'name', label: 'Product Name', type: 'text', sortable: true },
		{ key: 'category', label: 'Category', type: 'text', sortable: true },
		{ key: 'price', label: 'Price', type: 'currency', sortable: true },
		{ key: 'inStock', label: 'In Stock', type: 'check', align: 'center' },
		{ key: 'rating', label: 'Rating', type: 'number', sortable: true }
		// TypeScript error if you try to use a key that doesn't exist:
		// { key: 'invalidKey', label: 'Invalid', type: 'text' }  // ❌ Error!
	];

	// Type-safe actions with typed row parameter
	const actions: DataGridActions<Product> = {
		type: 'dropdown',
		items: [
			{
				text: 'View Details',
				href: (row) => {
					// row is typed as Product, so we get autocomplete and type checking
					return `/products/${row.id}`;
				}
			},
			{
				text: 'Edit',
				onClick: (row) => {
					// row.name, row.price, etc. are all typed correctly
					console.log(`Editing ${row.name} (${row.category})`);
					// row.invalidProperty would be a TypeScript error ❌
				}
			},
			{
				text: 'Toggle Stock',
				onClick: (row) => {
					// Type-safe property access
					console.log(`Toggling stock for ${row.name}: ${!row.inStock}`);
				}
			}
		]
	};

	// Type-safe selection handler
	function handleSelectionChange(selectedProducts: Product[]) {
		// selectedProducts is typed as Product[], not JsonObject[]
		selectedProducts.forEach((product) => {
			console.log(`Selected: ${product.name} - $${product.price}`);
			// Full type safety and autocomplete here
		});
	}

	// Type-safe format function
	const columnsWithFormat: ColumnDef<Product>[] = [
		{
			key: 'name',
			label: 'Product',
			type: 'text',
			format: (value: string, row: Product) => {
				// row is typed as Product
				return `${value} (${row.category})`;
			}
		},
		{
			key: 'price',
			label: 'Price',
			type: 'currency',
			format: (value: number, row: Product) => {
				// value is typed as number, row is typed as Product
				const discount = row.inStock ? 0 : 0.1;
				return `$${(value * (1 - discount)).toFixed(2)}`;
			}
		}
	];
</script>

<!-- Example 1: Basic type-safe DataGrid -->
<DataGrid rows={products} cols={columns} />

<!-- Example 2: With actions (type-safe) -->
<DataGrid rows={products} cols={columns} {actions} />

<!-- Example 3: With selection (type-safe callback) -->
<DataGrid
	rows={products}
	cols={columns}
	selectionMode="multi"
	onSelectionChange={handleSelectionChange}
/>

<!-- Example 4: With custom formatting (type-safe) -->
<DataGrid rows={products} cols={columnsWithFormat} />

<!--
  Type Safety Benefits Demonstrated:
  
  1. Column keys are validated against the Product interface
  2. Action callbacks receive typed Product objects
  3. Selection callbacks receive Product[] arrays
  4. Format functions have typed parameters
  5. Link generators have typed row parameters
  6. Custom components receive typed CellRendererProps<Product>
  
  Try these to see TypeScript errors:
  - Add a column with key: 'nonExistentField'
  - Access row.invalidProperty in an action callback
  - Try to assign wrong type to rows prop
-->
