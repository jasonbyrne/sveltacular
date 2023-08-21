export type DataRow = Record<string, unknown>;
export type DataCol<T extends DataRow = DataRow> = {
	key: string;
	label: string;
	type?: string;
	format?: (row: T, key: keyof T) => string;
	link?: (row: T, key: keyof T) => string;
	hide?: boolean;
};
export type Pagination = { page: number; perPage: number; total?: number };
