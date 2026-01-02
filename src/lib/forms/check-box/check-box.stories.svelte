<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import CheckBox from './check-box.svelte';

	const { Story } = defineMeta({
		component: CheckBox,
		title: 'Forms/CheckBox',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Standard" args={{ isChecked: true, label: 'Turn on sync' }} />

<Story name="NoLabel" args={{ isChecked: false }} />


