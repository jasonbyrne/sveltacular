import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

/**
 * Navigate to a URL using SvelteKit's navigation, with fallback to window.location
 * @param url - The URL to navigate to
 */
export const navigateTo = (url: string) => {
	if (browser) {
		setTimeout(() => {
			try {
				goto(url);
			} catch {
				if (window.top) window.top.location.href = url;
				else window.location.href = url;
			}
		}, 0);
	} else {
		redirect(303, url);
	}
};
