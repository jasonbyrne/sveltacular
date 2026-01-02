<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FileArea from './file-area.svelte';

	const { Story } = defineMeta({
		component: FileArea,
		title: 'Forms/FileArea',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Standard" args={{}} />


