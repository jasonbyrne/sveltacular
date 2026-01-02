/**
 * Round a number to a specific number of decimals
 * @param value - The number to round
 * @param decimals - Number of decimal places
 * @returns The rounded number
 */
export const roundToDecimals = (value: number, decimals: number): number => {
	if (!decimals) return Math.round(value);
	return Number(Math.round(Number(`${value}e${decimals}`)) + `e-${decimals}`);
};

/**
 * Format a number to a string with a specific number of decimals using locale formatting
 * @param value - The number to format
 * @param decimals - Number of decimal places
 * @returns The formatted number string
 */
export const formatNumber = (value: number, decimals: number): string => {
	return roundToDecimals(value, decimals).toLocaleString();
};
