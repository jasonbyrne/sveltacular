<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Text from './text.svelte';
</script>

<Meta title="Typography/Text" component={Text} />

<Story name="Default">
	<Text>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies
		aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl. Sed euismod, nisl eget
		ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl.
	</Text>
</Story>

<Story name="Transform: Uppercase">
	<Text transform="uppercase"
		>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod.</Text
	>
</Story>

<Story name="Transform: Capitalize">
	<Text transform="capitalize"
		>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod.</Text
	>
</Story>

<Story name="Transform: Lowercase">
	<Text transform="lowercase"
		>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod.</Text
	>
</Story>
