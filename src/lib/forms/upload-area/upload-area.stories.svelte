<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import UploadArea from './upload-area.svelte';
</script>

<Meta title="Forms/UploadArea" component={UploadArea} />

<Story name="Stanard">
	<div style="width: 300px; height: 300px;">
		<UploadArea />
	</div>
</Story>
