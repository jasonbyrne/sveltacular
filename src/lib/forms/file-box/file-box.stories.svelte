<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import FileBox from './file-box.svelte';
</script>

<Meta title="Forms/FileBox" component={FileBox} />

<Story name="Standard">
	<FileBox>Choose a file</FileBox>
</Story>
