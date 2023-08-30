/**
 * Round a number to a specific number of decimals
 *
 * @param value
 * @param decimals
 * @returns
 */
export const roundToDecimals = (value: number, decimals: number): number => {
	if (!decimals) return Math.round(value);
	return Number(Math.round(Number(`${value}e${decimals}`)) + `e-${decimals}`);
};

/**
 * Format a number to a string with a specific number of decimals
 */
export const formatNumber = (value: number, decimals: number): string => {
	return roundToDecimals(value, decimals).toLocaleString();
};
