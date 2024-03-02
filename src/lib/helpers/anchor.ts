import { browser } from '$app/environment';

export const navigateToAnchor = (anchor: string) => {
	if (!browser) return;
	setTimeout(() => {
		if (window.top) window.top.location.hash = anchor;
		else window.location.href = anchor;
	}, 0);
};

export const getAnchor = (): string | null => {
	if (!browser) return null;
	const hash = window.top ? window.top.location.hash : window.location.hash;
	return hash ? hash.slice(1) : null;
};
