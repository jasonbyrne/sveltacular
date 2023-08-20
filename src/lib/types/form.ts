export type FormFieldSizeOptions = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ButtonStyle =
	| 'positive'
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'negative'
	| 'danger'
	| 'ghost'
	| 'link';

export type DropdownOption = {
	value: string;
	name: string;
};

export type MenuOption = DropdownOption & { index: number };

export type AllowedTextInputTypes = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

export type RadioButtonValue = string | number | boolean | undefined;
