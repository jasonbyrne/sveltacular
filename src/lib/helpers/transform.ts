export type StripNulls<T> = {
	[P in keyof T]: NonNullable<T[P]>;
};

export const stripNulls = <T extends object>(obj: T): StripNulls<T> => {
	if (!obj) return {} as StripNulls<T>;
	return obj as StripNulls<T>;
};
