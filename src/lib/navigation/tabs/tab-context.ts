import type { Subscribable } from '$src/lib/index.js';

export type TabVariant = 'traditional' | 'underline' | 'outline' | 'overline';

export type TabDefinition = { id: string; name: string; defaultActive: boolean };

export interface TabContext {
	active: Subscribable<string | null>;
	variant: TabVariant;
	register: (id: string, name: string, isActive: boolean) => void;
}
export const tabContext = 'tabContext';
