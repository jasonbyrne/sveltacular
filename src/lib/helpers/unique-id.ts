/**
 * Generates a unique ID string using timestamp and random number
 * @returns A unique hexadecimal string identifier
 */
export const uniqueId = (): string => {
	return Math.floor(Math.random() * Date.now()).toString(16);
};
