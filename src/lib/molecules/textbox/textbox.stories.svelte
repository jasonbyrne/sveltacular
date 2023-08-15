<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Textbox from './textbox.svelte';
</script>

<Meta title="Text Input" component={Textbox} />

<Story name="Stanard">
	<Textbox type="text" placeholder="Placeholder text">Form Field</Textbox>
</Story>
