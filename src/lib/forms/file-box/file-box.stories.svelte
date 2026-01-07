<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FileBox from './file-box.svelte';

	const { Story } = defineMeta({
		component: FileBox,
		title: 'Forms/FileBox',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Standard" args={{ label: 'Choose a file' }} />
