<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import FileArea from './file-area.svelte';
</script>

<Meta title="Forms/FileArea" component={FileArea} />

<Story name="Stanard">
	<div style="width: 300px; height: 300px;">
		<FileArea />
	</div>
</Story>
