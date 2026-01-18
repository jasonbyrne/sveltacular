import type { DropdownOption } from '$src/lib/index.js';

export type SearchFunction = (text: string) => Promise<DropdownOption[]>;

export type CreateNewFunction = (inputName: string) => Promise<DropdownOption | null>;
