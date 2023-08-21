export type DataRow = Record<string, unknown>;
export type DataCol = {
	key: string;
	label: string;
	type?: string;
	format?: (row: DataRow, key: string) => string;
	link?: (row: DataRow, key: string) => string;
	hide?: boolean;
};
export type Pagination = { page: number; perPage: number; total?: number };
