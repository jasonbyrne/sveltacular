import type { Writable } from 'svelte/store';

export interface TabContext {
	active: Writable<string | null>;
}
export const tabContext = 'tabContext';
