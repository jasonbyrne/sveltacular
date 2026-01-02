<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import Header from '$src/lib/generic/header/header.svelte';
	import Button from '$src/lib/forms/button/button.svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';

	let {
		title,
		level = 3 as SectionLevel,
		disabled = $bindable(false),
		onNext = async () => [],
		onSubmit = async () => [] as string[] | void,
		onDone = undefined,
		onNextStep = undefined,
		onPreviousStep = undefined,
		onErrors = undefined,
		children
	}: {
		title: string;
		level?: SectionLevel;
		disabled?: boolean;
		onNext?: (step: number) => Promise<string[] | void>;
		onSubmit?: () => Promise<string[] | void>;
		onDone?: (() => void) | undefined;
		onNextStep?: ((step: number) => void) | undefined;
		onPreviousStep?: ((step: number) => void) | undefined;
		onErrors?: ((errors: string[]) => void) | undefined;
		children: Snippet;
	} = $props();

	// Use a SINGLE $state object - this is key for reactivity!
	const wizardState = $state({
		steps: [] as Array<{ step: number; subtitle: string }>,
		currentStep: null as number | null,
		errors: [] as string[]
	});

	// Register a step
	function register(stepNumber: number, subtitle: string) {
		// Avoid duplicates
		if (wizardState.steps.find((s) => s.step === stepNumber)) return;

		wizardState.steps.push({ step: stepNumber, subtitle });

		// Initialize to first step if not set
		if (wizardState.currentStep === null) {
			const sorted = [...wizardState.steps].sort((a, b) => a.step - b.step);
			wizardState.currentStep = sorted[0]?.step ?? null;
		}
	}

	// Set context - pass the reactive state object directly!
	setContext('wizard', {
		state: wizardState,
		register
	});

	// Derived values
	const sortedSteps = $derived([...wizardState.steps].sort((a, b) => a.step - b.step));
	const currentIndex = $derived(sortedSteps.findIndex((s) => s.step === wizardState.currentStep));
	const isFirstStep = $derived(currentIndex === 0);
	const isLastStep = $derived(currentIndex === sortedSteps.length - 1);
	const subtitle = $derived(sortedSteps[currentIndex]?.subtitle ?? '');
	const total = $derived(sortedSteps.length);

	// Navigation
	async function validate(callback: () => Promise<string[] | void>): Promise<string[]> {
		disabled = true;
		try {
			const result = await callback();
			wizardState.errors = Array.isArray(result) ? result : [];
		} catch (error) {
			wizardState.errors = [];
		} finally {
			disabled = false;
			onErrors?.(wizardState.errors);
		}
		return wizardState.errors;
	}

	async function next() {
		if (disabled || wizardState.currentStep === null) return;

		const validationErrors = await validate(() => onNext(wizardState.currentStep!));
		if (validationErrors.length > 0) return;

		// Move to next step
		const nextIndex = currentIndex + 1;
		if (nextIndex < sortedSteps.length) {
			wizardState.currentStep = sortedSteps[nextIndex].step;
			wizardState.errors = [];
			onNextStep?.(wizardState.currentStep);
		}
	}

	function previous() {
		if (disabled || wizardState.currentStep === null) return;

		const prevIndex = currentIndex - 1;
		if (prevIndex >= 0) {
			wizardState.currentStep = sortedSteps[prevIndex].step;
			wizardState.errors = [];
			onPreviousStep?.(wizardState.currentStep);
		}
	}

	async function done() {
		const submitErrors = await validate(onSubmit);
		if (submitErrors.length) return;

		onDone?.();

		// Reset
		disabled = false;
		wizardState.errors = [];
		wizardState.currentStep = sortedSteps[0]?.step ?? null;
	}
</script>

<section class:disabled>
	<Header {title} {subtitle} {level} />
	<div class="content">
		{@render children?.()}
	</div>
	<footer>
		<div>
			{#if !isFirstStep}
				<Button type="button" variant="secondary" onClick={previous} {disabled} label="Previous" />
			{/if}
		</div>
		<div>
			<div>Step {wizardState.currentStep ?? 0} of {total}</div>
		</div>
		<div>
			{#if isLastStep}
				<Button type="submit" variant="primary" onClick={done} {disabled} label="Done" />
			{:else}
				<Button type="button" variant="primary" onClick={next} {disabled} label="Next" />
			{/if}
		</div>
	</footer>
</section>

<style lang="scss">
	section {
		&.disabled {
			opacity: 0.5;
		}
	}

	footer {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;

		div {
			width: 100%;
		}
	}
</style>
