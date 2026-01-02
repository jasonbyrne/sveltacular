<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import type { WizardContext, WizardState } from './wizard-context.js';
	import { writable } from 'svelte/store';
	import { subscribable } from '$src/lib/helpers/subscribable.js';
	import Header from '$src/lib/generic/header/header.svelte';
	import Button from '$src/lib/forms/button/button.svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';

	let {
		title,
		level = 3 as SectionLevel,
		disabled = $bindable(false),
		onNext = async () => [] as string[] | void,
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

	let currentStep = $state(0);
	let errors = $state<string[]>([]);

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
		onErrors?.(errors);
		return errors;
	};

	const next = async () => {
		if (currentStep >= Object.values(steps).length || disabled) return;
		if (currentStep) {
			const errors = await validate(() => onNext(currentStep));
			if (errors.length) return publish();
		}
		currentStep++;
		onNextStep?.(currentStep);
		publish();
	};

	const previous = () => {
		if (currentStep <= 1 || disabled) return;
		currentStep--;
		errors = [];
		onPreviousStep?.(currentStep);
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
		onDone?.();
		reset();
	};

	setContext<WizardContext>('wizard', {
		state: subscribable(wizardStore),
		register
	});

	setTimeout(next, 100);

	let isFirstStep = $derived(currentStep <= 1);
	let isLastStep = $derived(currentStep >= Object.values(steps).length);
	let subtitle = $derived(steps[currentStep]);
	let total = $derived(Object.values(steps).length);
</script>

<section class:disabled>
	<Header {title} {subtitle} {level} />
	<div class="content">
		{@render children?.()}
	</div>
	<footer>
		<div>
			{#if !isFirstStep}
				<Button type="button" style="secondary" onclick={previous} {disabled} label="Previous" />
			{/if}
		</div>
		<div>
			<div>Step {currentStep} of {total}</div>
		</div>
		<div>
			{#if isLastStep}
				<Button type="submit" style="primary" onclick={done} {disabled} label="Done" />
			{:else}
				<Button type="button" style="primary" onclick={next} {disabled} label="Next" />
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
