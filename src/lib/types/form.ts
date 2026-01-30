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
 * Dropdown option structure
 */
export type DropdownOption = {
	value: string | number | null;
	name: string;
	id?: string;
	label?: string;
	disabled?: boolean;
};

/**
 * Menu option with optional index
 */
export type MenuOption = DropdownOption & { index?: number };

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
 * @template T The type of item returned (e.g., DropdownOption, ReferenceItem)
 */
export type SearchFunction<T extends { name: string } = DropdownOption> = (
	text: string
) => Promise<T[]>;

/**
 * Generic create new function type
 * @template T The type of item returned (e.g., DropdownOption, ReferenceItem)
 */
export type CreateNewFunction<T extends { name: string } = DropdownOption> = (
	inputName: string
) => Promise<T | null>;
