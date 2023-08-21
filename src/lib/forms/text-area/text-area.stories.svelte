<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import TextArea from './text-area.svelte';
</script>

<Meta title="Forms/TextArea" component={TextArea} />

<Story name="Text Area (small)">
	<TextArea placeholder="Placeholder text" rows={3} size="sm" />
</Story>

<Story name="Text Area (large)">
	<TextArea placeholder="Placeholder text" rows={10} size="lg" />
</Story>

<Story name="Text Area (with label)">
	<TextArea placeholder="Placeholder text" rows={10}>Comments</TextArea>
</Story>
