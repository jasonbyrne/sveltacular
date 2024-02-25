export type DataRow = Record<string, unknown>;
export type DataCol<T extends DataRow = DataRow> = {
	key: string;
	label: string;
	type?: string;
	nullText?: string;
	emptyText?: string;
	format?: (row: T, key: keyof T) => string;
	link?: (row: T, key: keyof T) => string;
	hide?: boolean;
	width?: number | string;
};
export type PaginationProperties = { page: number; perPage: number; total?: number };
