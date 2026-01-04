export type WizardStepDefinition = {
	step: number;
	subtitle: string;
};

export interface WizardState {
	currentStep: number | null;
	errors: string[];
	steps: Array<{ step: number; subtitle: string }>;
}

export interface WizardContext {
	state: WizardState;
	register: (step: number, subtitle: string) => void;
}
