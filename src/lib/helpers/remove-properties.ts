// Remove properties from an object from an array of strings representing the property names
export const removeProperties = (obj: unknown, props: string[]) => {
	if (!obj) return {};
	const newObj: Record<string, unknown> = { ...obj };
	props.forEach((prop) => {
		delete newObj[prop];
	});
	return newObj;
};
