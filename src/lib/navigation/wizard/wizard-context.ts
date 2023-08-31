import type { Subscribable } from '$src/lib/helpers/subscribable.js';

export type WizardState = {
	currentStep: number;
	totalSteps: number;
	disabled: boolean;
};

export interface WizardContext {
	state: Subscribable<WizardState>;
	register: (step: number, title: string) => void;
}
