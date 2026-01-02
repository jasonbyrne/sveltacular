<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Wizard from './wizard.svelte';
	import WizardStep from './wizard-step.svelte';

	const { Story } = defineMeta({
		component: Wizard,
		title: 'Navigation/Wizard',
		tags: ['autodocs'],
		args: {
			onNext: fn(),
			onPrevious: fn(),
			onCancel: fn()
		}
	});
</script>

<Story name="Default" args={{ title: 'Create New Customer' }}>
	<WizardStep step={1} subtitle="Step 1">Step 1</WizardStep>
	<WizardStep step={2} subtitle="Step 2">Step 2</WizardStep>
	<WizardStep step={3} subtitle="Step 3">Step 3</WizardStep>
</Story>

<Story
	name="Errors"
	args={{
		title: 'Create New Customer',
		onNext: async () => ['Some field was not completed.', 'Another field was the wrong format.']
	}}
>
	<WizardStep step={1} subtitle="Step 1">Step 1</WizardStep>
	<WizardStep step={2} subtitle="Step 2">Step 2</WizardStep>
	<WizardStep step={3} subtitle="Step 3">Step 3</WizardStep>
</Story>
