export type TabVariant =
	| 'traditional'
	| 'underline'
	| 'outline'
	| 'overline'
	| 'pills'
	| 'segmented'
	| 'minimal';

export type TabDefinition = {
	id: string;
	label: string;
	index: number;
	disabled?: boolean;
	href?: string;
};

export interface TabContext {
	state: {
		tabs: TabDefinition[];
		active: string | null;
	};
	variant: TabVariant;
	groupId: string;
	register: (id: string, label: string, href?: string, disabled?: boolean) => void;
}
export const tabContext = 'tabContext';
