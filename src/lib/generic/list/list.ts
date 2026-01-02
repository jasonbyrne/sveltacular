export type ListVariant =
	| 'none'
	| 'disc'
	| 'circle'
	| 'square'
	| 'decimal'
	| 'decimal-leading-zero'
	| 'striped';

export interface ListContext {
	variant: ListVariant;
}
export const listContext = 'listContext';
