export type ReferenceItem = {
	id: string | number;
	name: string;
	description?: string;
};

export type SearchFunction = (text: string) => Promise<ReferenceItem[]>;

export type CreateNewFunction = (inputName: string) => Promise<ReferenceItem | null>;

export type LinkBuilderFunction = (item: ReferenceItem) => string | undefined;