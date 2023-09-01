import type { DropdownOption } from '$src/lib/index.js';

export type SearchFunction = (text: string) => Promise<DropdownOption[]>;
