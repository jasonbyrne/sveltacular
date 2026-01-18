# DataGrid Type Safety Guide

The DataGrid components now support full type safety through TypeScript generics. This means you can specify the exact schema of your row data and get type checking throughout your DataGrid usage.

## Basic Usage

### Define Your Row Type

First, define an interface for your row data that extends `PlainObject`:

```typescript
import type { PlainObject } from '$src/lib/types/data.js';

interface Employee extends PlainObject {
  id: number;
  name: string;
  age: number;
  email: string;
  isActive: boolean;
  salary: number;
  updatedAt: string;
}
```

### Create Type-Safe Column Definitions

Use the generic `ColumnDef<T>` type to define your columns:

```typescript
import type { ColumnDef } from '$src/lib/types/data.js';

const cols: ColumnDef<Employee>[] = [
  { key: 'name', label: 'Name', type: 'text', sortable: true },
  { key: 'age', label: 'Age', type: 'number', sortable: true },
  { key: 'email', label: 'Email', type: 'email', sortable: true },
  { key: 'isActive', label: 'Active?', type: 'check', sortable: true },
  { key: 'salary', label: 'Salary', type: 'currency', sortable: true },
  { key: 'updatedAt', label: 'Updated', type: 'date', sortable: true }
];
```

The `key` property will be type-checked against your `Employee` interface, ensuring you can only reference valid properties.

### Use the DataGrid Component

```svelte
<script lang="ts">
  import DataGrid from '$lib/tables/data-grid.svelte';
  import type { Employee } from './types';
  
  const employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      isActive: true,
      salary: 100000,
      updatedAt: '2024-01-01T00:00:00Z'
    },
    // ... more employees
  ];
  
  const cols: ColumnDef<Employee>[] = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    // ... more columns
  ];
</script>

<DataGrid rows={employees} {cols} />
```

## Advanced Features

### Type-Safe Actions

Actions are also type-safe and receive properly typed row data:

```typescript
import type { RowActions } from '$src/lib/types/data.js';

const actions: RowActions<Employee> = {
  type: 'dropdown',
  items: [
    {
      text: 'Edit',
      onClick: (row) => {
        // row is typed as Employee
        console.log(row.name, row.email);
      }
    },
    {
      text: 'View Details',
      href: (row) => {
        // row is typed as Employee
        return `/employees/${row.id}`;
      }
    }
  ]
};
```

### Custom Cell Renderers with Generics

When creating custom cell renderer components, use the generic `CellRendererProps<T>`:

```svelte
<!-- StatusCell.svelte -->
<script lang="ts" generics="T extends PlainObject">
  import type { CellRendererProps, PlainObject } from '$src/lib/types/data.js';
  import Pill from '$lib/generic/pill/pill.svelte';
  
  let { row, value }: CellRendererProps<T> = $props();
  
  // row and value are properly typed
</script>

{#if value === 'active'}
  <Pill variant="positive" compact label="✓ Active" />
{:else if value === 'completed'}
  <Pill variant="standard" compact label="✓ Completed" />
{:else}
  <Pill variant="negative" compact label="⚠ Inactive" />
{/if}
```

Then use it in your column definition:

```typescript
const cols: ColumnDef<Employee>[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'custom',
    component: StatusCell,
    align: 'center'
  }
];
```

### Custom Cell Snippets

When using cell snippets, the context is fully typed:

```svelte
{#snippet nameCell({ row, value }: { row: Employee; value: unknown })}
  <div>
    <strong>{value}</strong>
    <small>{row.email}</small>
  </div>
{/snippet}

<DataGrid
  rows={employees}
  cols={cols}
  cells={{
    name: nameCell
  }}
/>
```

### Array Columns with Type Safety

For array columns, you get type-safe access to array elements:

```typescript
interface Project extends PlainObject {
  id: number;
  name: string;
  tags: string[];
  team: Array<{ id: number; name: string }>;
}

const cols: ColumnDef<Project>[] = [
  {
    key: 'tags',
    label: 'Tags',
    type: 'array',
    separator: 'pill',
    link: (tag: string) => `/tags/${tag}`
  },
  {
    key: 'team',
    label: 'Team',
    type: 'array',
    displayKey: 'name',
    separator: 'comma',
    link: (member: { id: number; name: string }) => `/users/${member.id}`
  }
];
```

### Selection with Type Safety

The `onSelectionChange` callback receives properly typed rows:

```svelte
<DataGrid
  rows={employees}
  cols={cols}
  selectionMode="multi"
  onSelectionChange={(selectedRows) => {
    // selectedRows is typed as Employee[]
    selectedRows.forEach(emp => {
      console.log(emp.name, emp.email);
    });
  }}
/>
```

## Benefits

1. **Compile-Time Safety**: Catch typos and invalid property access at compile time
2. **Better IntelliSense**: Get autocomplete for column keys, row properties, and more
3. **Refactoring Safety**: When you rename a property in your interface, TypeScript will flag all places that need updating
4. **Self-Documenting**: The types serve as documentation for what data is expected
5. **Error Prevention**: Prevent runtime errors from accessing non-existent properties

## Migration from Non-Generic Version

If you have existing DataGrid usage without explicit types, you can gradually add types:

1. Define interfaces for your row data
2. Add the generic type to your column definitions: `ColumnDef<YourType>[]`
3. Add types to your action callbacks if you use them
4. Add types to custom cell renderers if you use them

All existing code will continue to work (it will use `PlainObject` as the default type), but you'll get better type safety by adding explicit types.
