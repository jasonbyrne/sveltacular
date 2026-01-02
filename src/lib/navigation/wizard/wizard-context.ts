export type WizardStepDefinition = {
	step: number;
	subtitle: string;
};

export interface WizardContext {
	state: {
		currentStep: number | null;
		errors: string[];
		steps: Array<{ step: number; subtitle: string }>;
	};
	register: (step: number, subtitle: string) => void;
}
