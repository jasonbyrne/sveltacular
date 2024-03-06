export type JsonValue =
	| string
	| number
	| boolean
	| null
	| { [key: string]: JsonValue }
	| JsonValue[];

export type JsonObject = { [key: string]: JsonValue };

export type DataCol = {
	key: string;
	label: string;
	type?: string;
	nullText?: string;
	emptyText?: string;
	format?: (row: JsonObject, key: string) => string;
	link?: (row: JsonObject, key: string) => string;
	hide?: boolean;
	width?: number | string;
};

export type PaginationProperties = { page: number; perPage: number; total?: number };
