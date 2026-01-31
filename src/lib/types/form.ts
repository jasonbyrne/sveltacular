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
