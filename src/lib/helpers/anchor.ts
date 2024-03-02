import { browser } from '$app/environment';

export const navigateToAnchor = (anchor: string) => {
	if (browser) {
		setTimeout(() => {
			if (window.top) window.top.location.hash = anchor;
			else window.location.href = anchor;
		}, 0);
	}
};

export const getAnchor = (): string | null => {
	return browser ? window.location.hash : null;
};
