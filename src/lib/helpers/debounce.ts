/**
 * Creates a debounced function that delays invoking func until after delayMs milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param func - The function to debounce
 * @param delayMs - The number of milliseconds to delay (default: 300)
 * @returns A debounced version of the function
 */
const debounce = <T extends () => void>(func: T, delayMs = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return () => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(), delayMs);
	};
};

export default debounce;
