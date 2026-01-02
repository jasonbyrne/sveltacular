<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Email from './email.svelte';

	const { Story } = defineMeta({
		component: Email,
		title: 'Generic/Email',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ emailAddress: 'someone234@gmail.com' }} />


