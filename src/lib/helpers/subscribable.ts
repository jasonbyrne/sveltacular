import type { Writable } from 'svelte/store';

export const subscribable = <T>(subject: Writable<T>) => {
	return { subscribe: subject.subscribe };
};

export type Subscribable<T> = ReturnType<typeof subscribable<T>>;
