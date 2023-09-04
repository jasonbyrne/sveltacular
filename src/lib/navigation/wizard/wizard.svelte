<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import type { WizardContext, WizardState } from './wizard-context.js';
	import { writable } from 'svelte/store';
	import { subscribable } from '$src/lib/helpers/subscribable.js';
	import Header from '$src/lib/generic/header/header.svelte';
	import Button from '$src/lib/forms/button/button.svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';

	export let title: string;
	export let level: SectionLevel = 3;
	export let disabled = false;
	export let onNext: (step: number) => Promise<string[] | void> = async () => [];
	export let onSubmit: () => Promise<string[] | void> = async () => [];

	let currentStep = 0;
	let errors: string[] = [];

	const dispatch = createEventDispatcher<{
		done: void;
		next: number;
		previous: number;
		errors: string[];
	}>();
	const steps: { [key: number]: string } = {};
	const wizardStore = writable<WizardState>({
		currentStep,
		totalSteps: 0,
		disabled,
		errors
	});

	const publish = () => {
		wizardStore.set({
			currentStep,
			totalSteps: Object.values(steps).length,
			disabled,
			errors
		});
	};

	const register = (stepNumber: number, subtitle: string) => {
		steps[stepNumber] = subtitle;
		publish();
	};

	const validate = async (callback: () => Promise<string[] | void>): Promise<string[]> => {
		disabled = true;
		errors = (await callback()) || [];
		disabled = false;
		dispatch('errors', errors);
		return errors;
	};

	const next = async () => {
		if (currentStep >= Object.values(steps).length || disabled) return;
		if (currentStep) {
			const errors = await validate(() => onNext(currentStep));
			if (errors.length) return publish();
		}
		currentStep++;
		dispatch('next', currentStep);
		publish();
	};

	const previous = () => {
		if (currentStep <= 1 || disabled) return;
		currentStep--;
		errors = [];
		dispatch('previous', currentStep);
		publish();
	};

	const reset = () => {
		disabled = false;
		currentStep = 1;
		publish();
	};

	const done = async () => {
		const errors = await validate(onSubmit);
		if (errors.length) return publish();
		dispatch('done');
		reset();
	};

	setContext<WizardContext>('wizard', {
		state: subscribable(wizardStore),
		register
	});

	setTimeout(next, 100);

	$: isFirstStep = currentStep <= 1;
	$: isLastStep = currentStep >= Object.values(steps).length;
	$: subtitle = steps[currentStep];
	$: total = Object.values(steps).length;
</script>

<section class:disabled>
	<Header {title} {subtitle} {level} />
	<div class="content">
		<slot />
	</div>
	<footer>
		<div>
			{#if !isFirstStep}
				<Button type="button" style="secondary" on:click={previous} {disabled}>Previous</Button>
			{/if}
		</div>
		<div>
			<div>Step {currentStep} of {total}</div>
		</div>
		<div>
			{#if isLastStep}
				<Button type="submit" style="primary" on:click={done} {disabled}>Done</Button>
			{:else}
				<Button type="button" style="primary" on:click={next} {disabled}>Next</Button>
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
