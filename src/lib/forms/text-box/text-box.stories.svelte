<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import TextBox from './text-box.svelte';
</script>

<Meta title="Forms/TextBox" component={TextBox} />

<Story name="Stanard">
	<TextBox type="text" placeholder="Placeholder text">Form Field</TextBox>
</Story>
