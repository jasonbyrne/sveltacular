import type {
	SearchFunction as BaseSearchFunction,
	CreateNewFunction as BaseCreateNewFunction
} from '$src/lib/types/form.js';

export type ReferenceItem = {
	id: string | number;
	name: string;
	description?: string;
};

// Type aliases with ReferenceItem explicitly specified
export type SearchFunction = BaseSearchFunction<ReferenceItem>;
export type CreateNewFunction = BaseCreateNewFunction<ReferenceItem>;

export type LinkBuilderFunction = (item: ReferenceItem) => string | undefined;
