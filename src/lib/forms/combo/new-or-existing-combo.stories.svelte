<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import NewOrExistingCombo from './new-or-existing-combo.svelte';
	import { UnitedStates } from '$src/lib/data/united-states.js';
</script>

<Meta title="Forms/New or Existing Combo" component={NewOrExistingCombo} />

<Story name="Default">
	<NewOrExistingCombo items={UnitedStates} />
</Story>
