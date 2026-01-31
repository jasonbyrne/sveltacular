---
name: Field Mapping Implementation
overview: Add optional field mapping to form components (ReferenceBox, ListBox, RadioGroup, CheckBoxGroup) to eliminate manual data transformation between database objects and ReferenceItem format.
todos:
  - id: design-type-system
    content: Finalize type system design and generic constraints for ReferenceBox
    status: pending
  - id: create-mapper-utility
    content: Create shared field mapper utility and FieldNameMapping type in form.ts
    status: pending
  - id: update-referencebox
    content: Implement field mapping in ReferenceBox with generic type parameter
    status: pending
  - id: update-listbox
    content: Implement field mapping in ListBox (without generics, value stays primitive)
    status: pending
  - id: update-radiogroup
    content: Implement field mapping in RadioGroup (returns just the value)
    status: pending
  - id: update-checkboxgroup
    content: Implement field mapping in CheckBoxGroup (returns array of values)
    status: pending
  - id: handle-search-integration
    content: Decide on and implement search function integration with field mapping
    status: pending
  - id: handle-createnew-integration
    content: Decide on and implement createNew function integration with field mapping
    status: pending
  - id: update-multiselectbase
    content: Update MultiSelectBase if needed to support field mapping transformations
    status: pending
  - id: add-storybook-examples
    content: Create new Storybook stories demonstrating field mapping usage
    status: pending
  - id: write-tests
    content: Write comprehensive tests for field mapping functionality
    status: pending
  - id: test-backwards-compatibility
    content: Verify all existing usage patterns still work without breaking changes
    status: pending
isProject: false
---

# Field Mapping for Form Components

## Overview

Enable form components (ReferenceBox, ListBox, RadioGroup, CheckBoxGroup) to work directly with database object types by adding a `fieldNames` prop. This eliminates the need for manual transformation between database objects and the internal ReferenceItem format.

## The Problem Being Solved

**Current painful flow (bidirectional transformation hell):**

```svelte
<script lang="ts">
  // Your article from database
  let article = {
    title: 'My Article',
    categoryId: 5,
    topics: [{id: 1, name: 'Tech'}, {id: 5, name: 'Science'}]
  };
  
  let allTopics = [{id: 1, name: 'Tech'}, {id: 2, name: 'AI'}, ...];
  let categories = [{id: 5, name: 'Business'}, ...];

  // 😫 Transform DB objects to ReferenceItem for component
  let selectedTopics = article.topics.map(t => ({
    value: t.id, 
    label: t.name
  }));
  
  let topicItems = allTopics.map(t => ({
    value: t.id,
    label: t.name
  }));
  
  let categoryItems = categories.map(c => ({
    value: c.id,
    label: c.name
  }));
  
  // 😫 Handle onChange to transform BACK to DB objects
  function handleTopicsChange(referenceItems: ReferenceItem[]) {
    article.topics = referenceItems.map(ri => ({
      id: ri.value,
      name: ri.label
    }));
  }
</script>

<ReferenceBox
  bind:value={selectedTopics}
  items={topicItems}
  onChange={handleTopicsChange}
/>

<ListBox
  bind:value={article.categoryId}
  items={categoryItems}
/>
```

**New simplified flow (no transformation needed):**

```svelte
<script lang="ts">
  type Topic = { id: number; name: string; slug: string };
  type Category = { id: number; name: string };
  
  let article = {
    categoryId: 5,
    topics: [{id: 1, name: 'Tech', slug: 'tech'}, ...]
  };
  
  let allTopics: Topic[] = [...];
  let categories: Category[] = [...];
</script>

<ReferenceBox<Topic>
  bind:value={article.topics}
  items={allTopics}
  fieldNames={{ label: 'name', value: 'id' }}
/>

<ListBox
  bind:value={article.categoryId}
  items={categories}
  fieldNames={{ label: 'name', value: 'id' }}
/>
```

## Design Decisions

### Decision 1: Single `fieldNames` Property vs Separate Props

**Chosen approach:** Single `fieldNames` object property

```svelte
<!-- ✅ Chosen approach -->
<ReferenceBox
  items={topics}
  fieldNames={{ label: "name", value: "id" }}
/>

<!-- ❌ Alternative (rejected) -->
<ReferenceBox
  items={topics}
  labelField="name"
  valueField="id"
/>
```

**Rationale:**
- ✅ More extensible for future fields (description, disabled, etc.)
- ✅ Groups related configuration together
- ✅ Cleaner API surface (one prop vs many)
- ✅ Matches common pattern for config objects
- ✅ TypeScript autocomplete shows full object shape with JSDoc
- ✅ Less ambiguity (no confusion between `value` prop and `valueField` prop)

### Decision 2: Component Patterns by Selection Type

**Two distinct patterns based on UI visibility:**

1. **Visible selection (chips/tags) → Full objects**
   - ReferenceBox (multi-select with chips)
   - User needs full objects to display chip labels

2. **Hidden selection (list items, radios, checkboxes) → Just values**
   - ListBox (single-select dropdown)
   - RadioGroup (single-select radios)
   - CheckBoxGroup (multi-select checkboxes)
   - Labels already visible in UI, only need to track selected IDs

## Component-Specific Patterns

### ReferenceBox (Multi-Select with Chips)

**Binding pattern:** Full objects

- **Without field mapping** (current, preserved):
  ```svelte
  <ReferenceBox bind:value={referenceItems} items={referenceItems} />
  ```
  - `value`: `ReferenceItem[]`
  - `items`: `ReferenceItem[]`

- **With field mapping** (new):
  ```svelte
  <ReferenceBox<Topic>
    bind:value={topics}
    items={allTopics}
    fieldNames={{ label: 'name', value: 'id' }}
  />
  ```
  - `value`: `Topic[]` (full objects - needed for chip display)
  - `items`: `Topic[]` (full objects)
  - `onChange`: `(topics: Topic[]) => void`

### ListBox (Single-Select Dropdown)

**Binding pattern:** Just the value

- **Without field mapping** (current, preserved):
  ```svelte
  <ListBox bind:value={selectedValue} items={referenceItems} />
  ```
  - `value`: `string | number | null`
  - `items`: `ReferenceItem[]`

- **With field mapping** (new):
  ```svelte
  <ListBox
    bind:value={categoryId}
    items={categories}
    fieldNames={{ label: 'name', value: 'id' }}
  />
  ```
  - `value`: `string | number | null` (just the ID)
  - `items`: `Category[]` (full objects)
  - `onChange`: `(id: string | number | null) => void`

### RadioGroup (Single-Select Radios)

**Binding pattern:** Just the value (same as ListBox)

- **Without field mapping** (current, preserved):
  ```svelte
  <RadioGroup bind:group={selectedValue} items={referenceItems} />
  ```
  - `group`: `string`
  - `items`: `ReferenceItem[]`

- **With field mapping** (new):
  ```svelte
  <RadioGroup
    bind:group={categoryId}
    items={categories}
    fieldNames={{ label: 'name', value: 'id' }}
  />
  ```
  - `group`: `string | number` (just the ID)
  - `items`: `Category[]` (full objects)
  - `onChange`: `(id: string | number) => void`

### CheckBoxGroup (Multi-Select Checkboxes)

**Binding pattern:** Array of values only (not full objects)

- **Without field mapping** (current, preserved):
  ```svelte
  <CheckBoxGroup bind:group={selectedValues} items={referenceItems} />
  ```
  - `group`: `string[]`
  - `items`: `ReferenceItem[]`

- **With field mapping** (new):
  ```svelte
  <CheckBoxGroup
    bind:group={tagIds}
    items={tags}
    fieldNames={{ label: 'name', value: 'id' }}
  />
  ```
  - `group`: `(string | number)[]` (array of IDs only)
  - `items`: `Tag[]` (full objects)
  - `onChange`: `(ids: (string | number)[]) => void`

**Why not full objects?** Labels are already visible in checkboxes, you only need IDs for database storage.

## Type System Design

### 1. FieldNameMapping Type

Create in `src/lib/types/form.ts`:

```typescript
/**
 * Maps database object field names to ReferenceItem properties.
 * Allows components to work directly with your database objects.
 * 
 * @example
 * // Basic usage - map database fields to display format
 * fieldNames={{ label: 'name', value: 'id' }}
 * 
 * @example
 * // With optional fields
 * fieldNames={{ 
 *   label: 'title', 
 *   value: 'id', 
 *   description: 'subtitle',
 *   disabled: 'isInactive' 
 * }}
 */
export type FieldNameMapping = {
  /** 
   * Database field name to use for display label 
   * @default 'label'
   */
  label?: string;
  
  /** 
   * Database field name to use for unique value/ID 
   * @default 'value'
   */
  value?: string;
  
  /** 
   * Database field name to use for description/subtitle text
   * @default 'description'
   */
  description?: string;
  
  /** 
   * Database field name to use for disabled state
   * @default 'disabled'
   */
  disabled?: string;
};
```

### 2. Helper Utility Function

Create in `src/lib/types/form.ts`:

```typescript
/**
 * Creates field mapping transformation functions.
 * Used internally by components to convert between user types and ReferenceItem.
 * 
 * @internal
 */
export function createFieldMapper<T>(
  fieldNames?: FieldNameMapping
) {
  const labelField = fieldNames?.label ?? 'label';
  const valueField = fieldNames?.value ?? 'value';
  const descriptionField = fieldNames?.description ?? 'description';
  const disabledField = fieldNames?.disabled ?? 'disabled';

  return {
    /**
     * Converts user's database object to ReferenceItem for internal use
     */
    toReferenceItem: (item: T): ReferenceItem => {
      const obj = item as any;
      return {
        label: String(obj[labelField] ?? ''),
        value: obj[valueField] ?? null,
        description: obj[descriptionField],
        disabled: obj[disabledField]
      };
    },

    /**
     * Converts ReferenceItem back to user's database object type
     * Note: Only reconstructs mapped fields, additional fields are lost
     */
    fromReferenceItem: (ref: ReferenceItem): T => {
      const obj: any = {
        [labelField]: ref.label,
        [valueField]: ref.value
      };
      
      if (ref.description !== undefined) {
        obj[descriptionField] = ref.description;
      }
      
      if (ref.disabled !== undefined) {
        obj[disabledField] = ref.disabled;
      }
      
      return obj as T;
    },

    /**
     * Extracts just the value field from user's object
     */
    extractValue: (item: T): string | number | null => {
      return (item as any)[valueField] ?? null;
    },

    /**
     * Finds an item in array by matching value field
     */
    findByValue: (items: T[], value: string | number | null): T | undefined => {
      return items.find(item => (item as any)[valueField] === value);
    }
  };
}
```

### 3. Optional Helper Function for Users

Create in `src/lib/types/form.ts` for user convenience:

```typescript
/**
 * Helper function to create field name mappings with less syntax.
 * 
 * @example
 * // Instead of:
 * fieldNames={{ label: 'name', value: 'id' }}
 * 
 * // You can write:
 * fieldNames={mapFields('name', 'id')}
 */
export function mapFields(
  label: string,
  value: string,
  description?: string,
  disabled?: string
): FieldNameMapping {
  return {
    label,
    value,
    ...(description && { description }),
    ...(disabled && { disabled })
  };
}
```

## Implementation Details

### ReferenceBox Implementation

**File:** `src/lib/forms/reference-box/reference-box.svelte`

**Key changes:**

1. **Add generic type parameter:**
   ```typescript
   <script lang="ts" generics="T = ReferenceItem">
   ```

2. **Add fieldNames prop:**
   ```typescript
   let {
     value = $bindable([] as T[]),
     items = [] as T[],
     fieldNames = undefined as FieldNameMapping | undefined,
     // ... existing props
   } = $props();
   ```

3. **Create mapper:**
   ```typescript
   const mapper = $derived(createFieldMapper<T>(fieldNames));
   ```

4. **Transform items for internal use:**
   ```typescript
   const referenceItems = $derived(
     fieldNames ? items.map(item => mapper.toReferenceItem(item)) : items as ReferenceItem[]
   );
   ```

5. **Transform value bidirectionally:**
   ```typescript
   // Internal state (always ReferenceItem[])
   let internalValue = $state<ReferenceItem[]>([]);
   
   // Sync internal value from external value
   $effect(() => {
     if (fieldNames) {
       internalValue = value.map(item => mapper.toReferenceItem(item));
     } else {
       internalValue = value as ReferenceItem[];
     }
   });
   
   // Sync external value from internal value
   function updateExternalValue(newInternalValue: ReferenceItem[]) {
     if (fieldNames) {
       value = newInternalValue.map(ref => mapper.fromReferenceItem(ref));
     } else {
       value = newInternalValue as T[];
     }
     onChange?.(value);
   }
   ```

6. **Update adapter:**
   ```typescript
   let referenceAdapter = $derived<MultiSelectAdapter<ReferenceItem>>({
     getLabel: (item: ReferenceItem) => item.label,
     getKey: (item: ReferenceItem) => String(item.value ?? item.label),
     equals: (a: ReferenceItem, b: ReferenceItem) => a.value === b.value,
     fromMenuOption: (option: ReferenceItem) => option,
     getLink: linkBuilder 
       ? (item: ReferenceItem) => {
           // Find original item to pass to linkBuilder
           const original = fieldNames 
             ? value.find(v => mapper.toReferenceItem(v).value === item.value)
             : item;
           return linkBuilder(original as any);
         }
       : undefined,
     getTooltip: (item: ReferenceItem) => item.description
   });
   ```

**Backwards compatibility:** When `fieldNames` is undefined, `T` defaults to `ReferenceItem` and behavior is identical to current implementation.

### ListBox Implementation

**File:** `src/lib/forms/list-box/list-box.svelte`

**Key changes:**

1. **Add fieldNames prop (no generic needed):**
   ```typescript
   let {
     value = $bindable(null as string | number | null),
     items = [] as any[], // Can be ReferenceItem[] or custom type
     fieldNames = undefined as FieldNameMapping | undefined,
     // ... existing props
   } = $props();
   ```

2. **Create mapper:**
   ```typescript
   const mapper = $derived(createFieldMapper<any>(fieldNames));
   ```

3. **Transform items:**
   ```typescript
   const referenceItems = $derived(
     fieldNames ? items.map(item => mapper.toReferenceItem(item)) : items as ReferenceItem[]
   );
   ```

4. **Use referenceItems for display:**
   ```typescript
   const getText = () => 
     referenceItems.find((item) => item.value == value)?.label || '';
   ```

5. **Value binding stays primitive:**
   - `value` prop remains `string | number | null`
   - No transformation needed for value binding
   - Component extracts value field when selection is made

**Backwards compatibility:** When `fieldNames` is undefined, assumes items are already `ReferenceItem[]`.

### RadioGroup Implementation

**File:** `src/lib/forms/radio-group/radio-group.svelte`

**Key changes:**

1. **Add fieldNames prop:**
   ```typescript
   let {
     group = '',
     items = [] as any[],
     fieldNames = undefined as FieldNameMapping | undefined,
     // ... existing props
   } = $props();
   ```

2. **Transform items:**
   ```typescript
   const mapper = $derived(createFieldMapper<any>(fieldNames));
   const referenceItems = $derived(
     fieldNames ? items.map(item => mapper.toReferenceItem(item)) : items as ReferenceItem[]
   );
   ```

3. **Render with transformed items:**
   ```svelte
   {#each referenceItems as item}
     <RadioBox bind:group {disabled} value={item.value} {onChange}>
       {item.label}
     </RadioBox>
   {/each}
   ```

**Backwards compatibility:** When `fieldNames` is undefined, assumes items are already `ReferenceItem[]`.

### CheckBoxGroup Implementation

**File:** `src/lib/forms/check-box/check-box-group.svelte`

**Key changes:**

1. **Add fieldNames prop:**
   ```typescript
   let {
     group = $bindable([] as (string | number)[]),
     items = [] as any[],
     fieldNames = undefined as FieldNameMapping | undefined,
     // ... existing props
   } = $props();
   ```

2. **Transform items:**
   ```typescript
   const mapper = $derived(createFieldMapper<any>(fieldNames));
   const referenceItems = $derived(
     fieldNames ? items.map(item => mapper.toReferenceItem(item)) : items as ReferenceItem[]
   );
   ```

3. **Update itemsWithState sync logic:**
   ```typescript
   $effect(() => {
     const currentItems = referenceItems;
     const currentGroup = group;
     
     untrack(() => {
       const newItems = currentItems.map((item) => ({
         ...item,
         isChecked: currentGroup.includes(item.value as any)
       }));
       itemsWithState = newItems;
     });
   });
   ```

**Backwards compatibility:** When `fieldNames` is undefined, assumes items are already `ReferenceItem[]`.

## Search Function Integration

**Decision:** Search functions should ALWAYS return `ReferenceItem[]` (internal format).

**Rationale:**
- Search happens after items are provided, in the internal format
- Simpler mental model - search works with what the component displays
- Avoids complex type inference for async functions
- Users can transform in their search function if needed

**Example:**
```svelte
<script lang="ts">
  type Topic = { id: number; name: string };
  
  const searchTopics = async (text: string): Promise<ReferenceItem[]> => {
    const results = await api.searchTopics(text); // returns Topic[]
    
    // Transform to ReferenceItem[] in search function
    return results.map(t => ({
      value: t.id,
      label: t.name
    }));
  };
</script>

<ReferenceBox<Topic>
  bind:value={selectedTopics}
  search={searchTopics}
  fieldNames={{ label: 'name', value: 'id' }}
/>
```

**Alternative consideration:** Could provide `searchWithMapping` helper that auto-transforms:
```typescript
export function searchWithMapping<T>(
  searchFn: (text: string) => Promise<T[]>,
  fieldNames: FieldNameMapping
): SearchFunction {
  const mapper = createFieldMapper<T>(fieldNames);
  return async (text: string) => {
    const results = await searchFn(text);
    return results.map(r => mapper.toReferenceItem(r));
  };
}
```

## CreateNew Function Integration

**Decision:** CreateNew functions should ALWAYS return `ReferenceItem` (internal format).

**Rationale:**
- Same reasoning as search functions
- Newly created items get added to internal state first
- Simpler type system
- Component handles transformation to user type automatically

**Example:**
```svelte
<script lang="ts">
  const createTopic = async (name: string): Promise<ReferenceItem | null> => {
    const newTopic = await api.createTopic({ name }); // returns Topic
    
    // Transform to ReferenceItem
    return {
      value: newTopic.id,
      label: newTopic.name
    };
  };
</script>

<ReferenceBox<Topic>
  bind:value={selectedTopics}
  items={allTopics}
  createNew={createTopic}
  fieldNames={{ label: 'name', value: 'id' }}
/>
```

## Complete Usage Examples

### Example 1: Article with Multiple Selections

```svelte
<script lang="ts">
  type Topic = { id: number; name: string; slug: string };
  type Category = { id: number; name: string };
  type Tag = { id: number; name: string; color: string };
  
  let article = {
    title: 'My Article',
    categoryId: 5,
    tagIds: [1, 3, 7],
    topics: [
      { id: 1, name: 'AI', slug: 'ai' },
      { id: 3, name: 'Cloud', slug: 'cloud' }
    ]
  };
  
  let categories: Category[] = [
    { id: 1, name: 'Tech' },
    { id: 2, name: 'Science' },
    { id: 5, name: 'Business' }
  ];
  
  let tags: Tag[] = [
    { id: 1, name: 'Featured', color: 'blue' },
    { id: 3, name: 'Tutorial', color: 'green' },
    { id: 7, name: 'Advanced', color: 'red' }
  ];
  
  let topics: Topic[] = [
    { id: 1, name: 'AI', slug: 'ai' },
    { id: 2, name: 'Web Dev', slug: 'web-dev' },
    { id: 3, name: 'Cloud', slug: 'cloud' }
  ];
  
  function saveArticle() {
    // Everything is already in the right format!
    api.updateArticle({
      ...article,
      categoryId: article.categoryId,    // number
      tagIds: article.tagIds,            // number[]
      topicIds: article.topics.map(t => t.id)  // extract IDs from full objects
    });
  }
</script>

<FormRow>
  <ListBox
    bind:value={article.categoryId}
    items={categories}
    fieldNames={{ label: 'name', value: 'id' }}
    label="Category"
  />
</FormRow>

<FormRow>
  <RadioGroup
    bind:group={article.categoryId}
    items={categories}
    fieldNames={{ label: 'name', value: 'id' }}
    label="Category (Radio)"
  />
</FormRow>

<FormRow>
  <CheckBoxGroup
    bind:group={article.tagIds}
    items={tags}
    fieldNames={{ label: 'name', value: 'id' }}
    label="Tags"
  />
</FormRow>

<FormRow>
  <ReferenceBox<Topic>
    bind:value={article.topics}
    items={topics}
    fieldNames={{ label: 'name', value: 'id' }}
    label="Topics"
  />
</FormRow>

<Button onclick={saveArticle}>Save Article</Button>
```

### Example 2: With Async Search

```svelte
<script lang="ts">
  type Company = { id: number; name: string; industry: string };
  
  let selectedCompanies: Company[] = [];
  
  const searchCompanies = async (text: string): Promise<ReferenceItem[]> => {
    const results = await api.searchCompanies(text);
    return results.map(c => ({
      value: c.id,
      label: c.name,
      description: c.industry
    }));
  };
</script>

<ReferenceBox<Company>
  bind:value={selectedCompanies}
  search={searchCompanies}
  fieldNames={{ label: 'name', value: 'id', description: 'industry' }}
  label="Companies"
/>
```

### Example 3: Backwards Compatibility

```svelte
<script lang="ts">
  // Old code continues to work exactly as before
  let selected: ReferenceItem[] = [];
  let items: ReferenceItem[] = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' }
  ];
</script>

<ReferenceBox bind:value={selected} items={items} />
<ListBox bind:value={selectedValue} items={items} />
<RadioGroup bind:group={selectedValue} items={items} />
<CheckBoxGroup bind:group={selectedValues} items={items} />
```

## Discoverability Enhancements

### 1. JSDoc Documentation

Every component prop should have detailed JSDoc:

```typescript
{
  /**
   * Maps database field names to ReferenceItem properties.
   * Use this when your data uses different field names (e.g., 'name' instead of 'label').
   * 
   * @example
   * // Basic usage
   * fieldNames={{ label: 'name', value: 'id' }}
   * 
   * @example
   * // With description field
   * fieldNames={{ label: 'title', value: 'id', description: 'subtitle' }}
   */
  fieldNames?: FieldNameMapping;
}
```

### 2. Runtime Warnings

Add helpful warnings for common mistakes:

```typescript
if (fieldNames) {
  if (!fieldNames.label && !fieldNames.value) {
    console.warn(
      '[ReferenceBox] fieldNames should specify at least "label" or "value". ' +
      'Example: fieldNames={{ label: "name", value: "id" }}'
    );
  }
}
```

### 3. Storybook Documentation

Create comprehensive Storybook stories:

#### ReferenceBox Stories

- `WithDatabaseObjects` - Basic field mapping example
- `WithAsyncSearchAndFieldMapping` - Async search + field mapping
- `WithCreateNewAndFieldMapping` - CreateNew + field mapping
- `WithDescriptionField` - Mapping description field
- `BackwardsCompatible` - Show existing usage still works

#### ListBox Stories

- `WithDatabaseObjects` - Basic field mapping
- `SearchableWithFieldMapping` - Searchable + field mapping

#### RadioGroup Stories

- `WithDatabaseObjects` - Basic field mapping

#### CheckBoxGroup Stories

- `WithDatabaseObjects` - Basic field mapping

## Testing Strategy

### Unit Tests

Create tests in respective test files:

1. **Field mapping with various data types**
   - String IDs
   - Numeric IDs
   - Null values
   - Missing fields

2. **Bidirectional transformation (ReferenceBox)**
   - Value → Items transformation
   - Items → Value transformation
   - onChange receives correct type

3. **Value extraction (ListBox, RadioGroup, CheckBoxGroup)**
   - Correct value extracted from objects
   - Value binding works correctly
   - onChange receives correct primitive type

4. **Backwards compatibility**
   - No fieldNames prop = current behavior
   - All existing tests pass

5. **Edge cases**
   - Empty arrays
   - Undefined/null items
   - Missing label or value fields
   - Description and disabled field mapping

### Integration Tests

1. **Two-way binding**
   - Value changes update items
   - Item selection updates value
   - Types are preserved throughout

2. **Async search + field mapping**
   - Search results transform correctly
   - Selected items maintain correct type

3. **CreateNew + field mapping**
   - Newly created items transform correctly
   - Added to value with correct type

### Type Tests

Create a `field-mapping.types.test.ts`:

```typescript
import type { ReferenceBox, ListBox, RadioGroup, CheckBoxGroup } from '$lib/forms';

type Topic = { id: number; name: string };
type Category = { id: number; name: string };

// Test ReferenceBox generic inference
const referenceBox: ReferenceBox<Topic> = null as any;
referenceBox.value; // Should be Topic[]
referenceBox.onChange; // Should accept (topics: Topic[]) => void

// Test ListBox value type
const listBox: ListBox = null as any;
listBox.value; // Should be string | number | null

// Test RadioGroup value type
const radioGroup: RadioGroup = null as any;
radioGroup.group; // Should be string | number

// Test CheckBoxGroup value type
const checkboxGroup: CheckBoxGroup = null as any;
checkboxGroup.group; // Should be (string | number)[]
```

## Migration Guide

### For Users Currently Doing Manual Mapping

**Before:**
```svelte
<script lang="ts">
  let topics = dbTopics.map(t => ({ value: t.id, label: t.name }));
  let selected = article.topics.map(t => ({ value: t.id, label: t.name }));
  
  function handleChange(items: ReferenceItem[]) {
    article.topics = items.map(i => ({ id: i.value, name: i.label }));
  }
</script>

<ReferenceBox 
  bind:value={selected} 
  items={topics} 
  onChange={handleChange} 
/>
```

**After:**
```svelte
<script lang="ts">
  // No transformation needed!
</script>

<ReferenceBox<Topic>
  bind:value={article.topics}
  items={dbTopics}
  fieldNames={{ label: 'name', value: 'id' }}
/>
```

### For Users With Existing Code

**No migration needed!** All existing code continues to work:

```svelte
<!-- This continues to work exactly as before -->
<ReferenceBox bind:value={referenceItems} items={referenceItems} />
<ListBox bind:value={value} items={referenceItems} />
<RadioGroup bind:group={value} items={referenceItems} />
<CheckBoxGroup bind:group={values} items={referenceItems} />
```

## Open Questions & Decisions

### Question 1: Type Safety for Field Names

**Options:**
- A) Keep as `string` for flexibility (chosen for now)
- B) Use `keyof T` to ensure field names are valid

**Decision:** Keep as strings for flexibility. Users might have computed properties or want to pass through dynamic field names.

### Question 2: Description Field Auto-mapping

**Current approach:** Only map if explicitly specified in fieldNames

**Rationale:** Not all objects have description fields, and field names vary widely.

### Question 3: Other Components

**TagBox:** No field mapping needed - works with `string[]` directly

**NewOrExistingCombo:** Will automatically benefit from ListBox field mapping

## Components Affected

- ✅ **ReferenceBox** - Multi-select with chips (returns full objects)
- ✅ **ListBox** - Single-select dropdown (returns just value)
- ✅ **RadioGroup** - Single-select radios (returns just value)
- ✅ **CheckBoxGroup** - Multi-select checkboxes (returns array of values)
- ✅ **MultiSelectBase** - May need updates to support transformations
- ❌ **TagBox** - Not needed (works with string[])
- 🔄 **NewOrExistingCombo** - Automatically benefits from ListBox changes

## Success Criteria

1. ✅ Users can bind directly to database object types
2. ✅ No manual mapping code needed in user components
3. ✅ Full TypeScript type safety maintained
4. ✅ Backwards compatibility - all existing code works unchanged
5. ✅ Clean, intuitive API with single `fieldNames` prop
6. ✅ All existing tests pass
7. ✅ New tests cover field mapping scenarios
8. ✅ Storybook examples demonstrate all patterns
9. ✅ JSDoc provides excellent IDE autocomplete
10. ✅ Runtime warnings help with common mistakes

## Implementation Checklist

- [ ] Create `FieldNameMapping` type in `form.ts`
- [ ] Create `createFieldMapper()` utility in `form.ts`
- [ ] Create optional `mapFields()` helper in `form.ts`
- [ ] Update ReferenceBox with generic type and fieldNames prop
- [ ] Update ListBox with fieldNames prop
- [ ] Update RadioGroup with fieldNames prop
- [ ] Update CheckBoxGroup with fieldNames prop
- [ ] Update MultiSelectBase if needed
- [ ] Add JSDoc documentation to all new props
- [ ] Add runtime warnings for common mistakes
- [ ] Create Storybook stories for each component
- [ ] Write unit tests for field mapping
- [ ] Write integration tests for two-way binding
- [ ] Write type tests for generic inference
- [ ] Run all existing tests to ensure backwards compatibility
- [ ] Update component documentation
- [ ] Create migration guide examples
