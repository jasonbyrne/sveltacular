import type { TabStyle } from '$src/lib/types/generic.js';
import type { Writable } from 'svelte/store';

export interface TabContext {
	active: Writable<string | null>;
	style: TabStyle;
	squared: boolean;
}
export const tabContext = 'tabContext';
