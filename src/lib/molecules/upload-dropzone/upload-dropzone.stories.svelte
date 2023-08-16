<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import UploadDropzone from './upload-dropzone.svelte';
</script>

<Meta title="Upload" component={UploadDropzone} />

<Story name="Stanard">
	<div style="width: 300px; height: 300px;">
		<UploadDropzone />
	</div>
</Story>
