<script lang="ts">
	import { getContext } from 'svelte';
	import type { WizardContext } from './wizard-context.js';
	import Notice from '$src/lib/generic/notice/notice.svelte';

	const wizard = getContext<WizardContext>('wizard');
	const state = wizard.state;

	export let step: number;
	export let subtitle: string;

	wizard.register(step, subtitle);

	$: isCurrentStep = $state.currentStep === step;
	$: errors = $state.errors;
</script>

<div class="step {isCurrentStep ? 'current' : ''}">
	{#if errors.length}
		<div class="errors">
			<Notice style="error" size="md">{errors.join(' ')}</Notice>
		</div>
	{/if}
	<slot />
</div>

<style lang="scss">
	.step {
		display: none;

		&.current {
			display: block;
		}

		.errors {
			margin-bottom: 1rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
