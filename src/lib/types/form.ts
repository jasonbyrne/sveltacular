// Export size types for forms
export type { ComponentSize, ComponentWidth } from './size.js';

/**
 * Button variant options
 */
export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'positive'
	| 'danger'
	| 'outline'
	| 'link'
	| 'ghost';

/**
 * Reference item structure - unified type for dropdowns, menus, and selectable items
 */
export type ReferenceItem = {
	value: string | number | null;
	label: string;
	description?: string;
	disabled?: boolean;
	index?: number;
};

/**
 * Allowed text input types
 */
export type AllowedTextInputTypes = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

/**
 * Radio button value type
 */
export type RadioButtonValue = string | number | boolean | undefined;

/**
 * Generic search function type
 */
export type SearchFunction = (text: string) => Promise<ReferenceItem[]>;

/**
 * Generic create new function type
 */
export type CreateNewFunction<ReferenceItem> = (inputName: string) => Promise<ReferenceItem | null>;

/**
 * Link builder function type
 */
export type LinkBuilderFunction = (item: ReferenceItem) => string | undefined;

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
