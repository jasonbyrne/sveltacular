<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Prompt from './prompt.svelte';
</script>

<Meta title="Modals/Prompt" component={Prompt} />

<Story name="Default">
	<Prompt open title="Rename File">What would you like to rename this file to?</Prompt>
</Story>
