<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import NewOrExistingCombo from './new-or-existing-combo.svelte';
	import { US_States } from '$src/lib/data/united-states.js';
</script>

<Meta title="Forms/New or Existing Combo" component={NewOrExistingCombo} />

<Story name="Default">
	<NewOrExistingCombo items={US_States} />
</Story>
