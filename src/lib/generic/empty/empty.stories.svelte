<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Empty from './empty.svelte';
	import FolderOpenIcon from '$src/lib/icons/folder-open-icon.svelte';
</script>

<Meta title="Generic/Empty" component={Empty} />

<Story name="Default">
	<Empty />
</Story>

<Story name="With Message">
	<Empty text="No results found" />
</Story>

<Story name="With Message and Icon">
	<Empty text="No results found">
		<FolderOpenIcon />
	</Empty>
</Story>
