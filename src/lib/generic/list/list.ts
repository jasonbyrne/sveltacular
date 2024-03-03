export type ListStyle =
	| 'none'
	| 'disc'
	| 'circle'
	| 'square'
	| 'decimal'
	| 'decimal-leading-zero'
	| 'striped';

export interface ListContext {
	style: ListStyle;
}
export const listContext = 'listContext';
