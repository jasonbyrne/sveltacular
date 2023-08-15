import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

export const navigateTo = (url: string) => {
	if (browser) setTimeout(() => goto(url), 0);
	else redirect(303, url);
};
