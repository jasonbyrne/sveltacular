/**
 * Capitalize the first letter of each word in a string, unless the word only has one letter
 */
export const capitalize = (str: string) => {
	return str
		.split(' ')
		.map((word) => {
			if (word.length === 1) return word;
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
};
