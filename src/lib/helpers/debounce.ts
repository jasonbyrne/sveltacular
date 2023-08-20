const debounce = <T extends () => void>(func: T, delayMs = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return () => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(), delayMs);
	};
};

export default debounce;
