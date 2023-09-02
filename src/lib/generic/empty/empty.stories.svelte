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

<Story name="Horizontal">
	<Empty text="No results found" orientation="horizontal" />
</Story>

<Story name="Horizontal with Icon">
	<Empty text="No results found" orientation="horizontal">
		<FolderOpenIcon />
	</Empty>
</Story>

<Story name="X-Large">
	<Empty text="No results found" size="xl" />
</Story>

<Story name="X-Large with Icon">
	<Empty text="No results found" size="xl">
		<FolderOpenIcon />
	</Empty>
</Story>

<Story name="Large">
	<Empty text="No results found" size="lg" />
</Story>

<Story name="Large with Icon">
	<Empty text="No results found" size="lg">
		<FolderOpenIcon />
	</Empty>
</Story>

<Story name="Medium">
	<Empty text="No results found" size="md" />
</Story>

<Story name="Medium with Icon">
	<Empty text="No results found" size="md">
		<FolderOpenIcon />
	</Empty>
</Story>

<Story name="Small">
	<Empty text="No results found" size="sm" />
</Story>

<Story name="Small with Icon">
	<Empty text="No results found" size="sm">
		<FolderOpenIcon />
	</Empty>
</Story>

<Story name="Horizontal Reverse">
	<Empty text="No results found" orientation="horizontal" reverse>
		<FolderOpenIcon />
	</Empty>
</Story>

<Story name="Vertical Reverse">
	<Empty text="No results found" orientation="vertical" reverse>
		<FolderOpenIcon />
	</Empty>
</Story>

<Story name="Small with Icon (Horizontal Left)">
	<Empty text="No results found" size="sm" align="start" orientation="horizontal">
		<FolderOpenIcon />
	</Empty>
</Story>

<Story name="Small with Icon (Horizontal Right)">
	<Empty text="No results found" size="sm" align="end" orientation="horizontal">
		<FolderOpenIcon />
	</Empty>
</Story>
