<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Wizard from './wizard.svelte';
	import WizardStep from './wizard-step.svelte';
</script>

<Meta title="Navigation/Wizard" component={Wizard} />

<Story name="Default">
	<Wizard title="Create New Customer">
		<WizardStep step={1} subtitle="Customer Name">
			<p>Step 1</p>
		</WizardStep>
		<WizardStep step={2} subtitle="Customer Address">
			<p>Step 2</p>
		</WizardStep>
		<WizardStep step={3} subtitle="Customer Phone">
			<p>Step 3</p>
		</WizardStep>
	</Wizard>
</Story>
