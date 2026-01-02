<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getContext } from 'svelte';
	import type { WizardContext } from './wizard-context.js';
	import Notice from '$src/lib/generic/notice/notice.svelte';

	const wizard = getContext<WizardContext>('wizard');
	const state = wizard.state;

	let {
		step,
		subtitle,
		children
	}: {
		step: number;
		subtitle: string;
		children: Snippet;
	} = $props();

	wizard.register(step, subtitle);

	let isCurrentStep = $derived($state.currentStep === step);
	let errors = $derived($state.errors);
</script>

<div class="step {isCurrentStep ? 'current' : ''}">
	{#if errors.length}
		<div class="errors">
			<Notice style="error" size="md">{errors.join(' ')}</Notice>
		</div>
	{/if}
	{@render children?.()}
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
