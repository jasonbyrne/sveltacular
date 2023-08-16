<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import TextArea from './text-area.svelte';
</script>

<Meta title="Text Input" component={TextArea} />

<Story name="Text Area (small)">
	<TextArea placeholder="Placeholder text" rows={3} size="sm">Form Field</TextArea>
</Story>

<Story name="Text Area (large)">
	<TextArea placeholder="Placeholder text" rows={10} size="lg">Form Field</TextArea>
</Story>
