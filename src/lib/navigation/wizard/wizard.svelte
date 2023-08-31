<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import type { WizardContext, WizardState } from './wizard-context.js';
	import { writable } from 'svelte/store';
	import { subscribable } from '$src/lib/helpers/subscribable.js';
	import Section from '$src/lib/generic/section/section.svelte';
	import Header from '$src/lib/generic/header/header.svelte';
	import Button from '$src/lib/forms/button/button.svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';

	export let title: string;
	export let level: SectionLevel = 3;
	export let disabled = false;

	let currentStep = 0;

	const dispatch = createEventDispatcher<{ submit: void; next: number; previous: number }>();
	const steps: { [key: number]: string } = {};
	const wizardStore = writable<WizardState>({
		currentStep,
		totalSteps: 0,
		disabled
	});

	const publish = () => {
		wizardStore.set({
			currentStep,
			totalSteps: Object.values(steps).length,
			disabled
		});
	};

	const register = (stepNumber: number, subtitle: string) => {
		steps[stepNumber] = subtitle;
		publish();
	};

	const next = () => {
		if (currentStep >= Object.values(steps).length || disabled) return;
		currentStep++;
		dispatch('next', currentStep);
		publish();
	};

	const previous = () => {
		if (currentStep <= 1 || disabled) return;
		currentStep--;
		dispatch('previous', currentStep);
		publish();
	};

	const done = () => {
		disabled = true;
		dispatch('submit');
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
	}
</style>
