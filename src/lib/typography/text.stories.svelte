<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Text from './text.svelte';

	const { Story } = defineMeta({
		component: Text,
		title: 'Typography/Text',
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies
	aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl. Sed euismod, nisl eget
	ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl.
</Story>

<Story name="TransformUppercase" args={{ transform: 'uppercase' }}>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod.
</Story>

<Story name="TransformCapitalize" args={{ transform: 'capitalize' }}>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod.
</Story>

<Story name="TransformLowercase" args={{ transform: 'lowercase' }}>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod.
</Story>
