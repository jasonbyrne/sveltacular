<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import type { WizardContext, WizardState } from './wizard-context.js';

	const wizard = getContext<WizardContext>('wizard');
	const state = wizard.state;

	export let step: number;
	export let subtitle: string;

	wizard.register(step, subtitle);

	$: isCurrentStep = $state.currentStep === step;
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
