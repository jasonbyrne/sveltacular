<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import UrlBox from './url-box.svelte';

	const { Story } = defineMeta({
		component: UrlBox,
		title: 'Forms/UrlBox',
		tags: ['autodocs'],
		args: {
			onChange: fn(),
			onInput: fn()
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'www.svelte.dev' }} />
