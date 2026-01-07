<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Paragraph from './paragraph.svelte';

	const { Story } = defineMeta({
		component: Paragraph,
		title: 'Typography/Paragraph',
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies
	aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl. Sed euismod, nisl eget
	ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl.
</Story>
