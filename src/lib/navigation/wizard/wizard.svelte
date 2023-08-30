<script lang="ts">
	import { setContext } from 'svelte';
	import type { WizardContext, WizardState } from './wizard-context.js';
	import { writable } from 'svelte/store';
	import { subscribable } from '$src/lib/helpers/subscribable.js';
	import Section from '$src/lib/generic/section/section.svelte';
	import Header from '$src/lib/generic/header/header.svelte';
	import Button from '$src/lib/forms/button/button.svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';

	export let title: string;
	export let level: SectionLevel = 3;

	const steps: { [key: number]: string } = {};
	let wizardState: WizardState = {
		current: 0,
		total: 0
	};
	const wizardStore = writable(wizardState);

	const publish = (change: Partial<WizardState>) => {
		wizardState = {
			...wizardState,
			...change
		};
		wizardStore.set(wizardState);
	};

	const register = (stepNumber: number, subtitle: string) => {
		steps[stepNumber] = subtitle;
		publish({
			total: Object.values(steps).length
		});
	};

	const next = () => {
		publish({
			current: wizardState.current + 1
		});
	};

	const previous = () => {
		publish({
			current: wizardState.current - 1
		});
	};

	const done = () => {
		alert('Done');
	};

	setContext<WizardContext>('wizard', {
		step: subscribable(wizardStore),
		register,
		next,
		previous
	});

	setTimeout(next, 100);

	$: isFirstStep = wizardState.current <= 1;
	$: subtitle = steps[wizardState.current];
</script>

<Section>
	<Header {title} {subtitle} {level} />
	<div class="content">
		<slot />
	</div>
	<footer>
		<div>
			{#if !isFirstStep}
				<Button type="button" style="secondary" on:click={previous}>Previous</Button>
			{/if}
		</div>
		<div>
			<div>Step {wizardState.current} of {wizardState.total}</div>
		</div>
		<div>
			{#if wizardState.current < wizardState.total}
				<Button type="button" style="primary" on:click={next}>Next</Button>
			{:else}
				<Button type="submit" style="primary" on:click={done}>Done</Button>
			{/if}
		</div>
	</footer>
</Section>

<style>
	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
