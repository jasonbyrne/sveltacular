<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getContext, onMount } from 'svelte';
	import Notice from '$src/lib/generic/notice/notice.svelte';

	interface WizardContext {
		state: {
			currentStep: number | null;
			errors: string[];
			steps: Array<{ step: number; subtitle: string }>;
		};
		register: (step: number, subtitle: string) => void;
	}

	const wizard = getContext<WizardContext>('wizard');

	let {
		step,
		subtitle,
		children
	}: {
		step: number;
		subtitle: string;
		children: Snippet;
	} = $props();

	// Register on mount
	onMount(() => {
		wizard.register(step, subtitle);
	});

	// Access the $state object's properties directly - THIS creates reactive dependencies!
	const isCurrentStep = $derived(wizard.state.currentStep === step);
	const errors = $derived(wizard.state.errors);
</script>

<div class="step" class:current={isCurrentStep}>
	{#if isCurrentStep && errors.length > 0}
		<div class="errors">
			<Notice variant="error" size="md">{errors.join(' ')}</Notice>
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
