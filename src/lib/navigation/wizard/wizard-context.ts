import type { Subscribable } from '$src/lib/helpers/subscribable.js';

export type WizardState = {
	current: number;
	total: number;
};

export interface WizardContext {
	step: Subscribable<WizardState>;
	register: (step: number, title: string) => void;
	next: () => void;
	previous: () => void;
}
