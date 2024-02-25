export type FormFieldSizeOptions = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ButtonStyle =
	| 'primary'
	| 'secondary'
	| 'positive'
	| 'negative'
	| 'danger'
	| 'ghost'
	| 'outline'
	| 'link';

export type DropdownOption = {
	value: string | null;
	name: string;
};

export type MenuOption = DropdownOption & { index: number };

export type AllowedTextInputTypes = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

export type RadioButtonValue = string | number | boolean | undefined;
