<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import type { WizardContext, WizardState } from './wizard-context.js';

	const wizard = getContext<WizardContext>('wizard');
	const wizardStep = wizard.step;

	export let step: number;
	export let subtitle: string;

	wizard.register(step, subtitle);

	let isCurrentStep = false;

	const unsub = wizardStep.subscribe((state: WizardState) => {
		isCurrentStep = state.current === step;
	});

	onDestroy(unsub);
</script>

<div class="step {isCurrentStep ? 'current' : ''}">
	<slot />
</div>

<style lang="scss">
	.step {
		display: none;

		&.current {
			display: block;
		}
	}
</style>
