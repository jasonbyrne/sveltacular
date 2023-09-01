import type { Subscribable } from '$src/lib/index.js';

export type TabStyle = 'traditional' | 'underline' | 'outline' | 'overline';

export type TabDefinition = { id: string; name: string };

export interface TabContext {
	active: Subscribable<string | null>;
	style: TabStyle;
	register: (id: string, name: string, isActive: boolean) => void;
}
export const tabContext = 'tabContext';
