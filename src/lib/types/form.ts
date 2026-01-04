// Re-export ComponentSize for backward compatibility
export type { ComponentSize as FormFieldSizeOptions } from './size.js';

/**
 * Button variant options
 */
export type ButtonVariant = 'primary' | 'secondary' | 'positive' | 'danger' | 'outline' | 'link';

/**
 * Dropdown option structure
 */
export type DropdownOption = {
	value: string | null;
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
