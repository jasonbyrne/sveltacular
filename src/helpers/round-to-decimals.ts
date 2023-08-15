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
