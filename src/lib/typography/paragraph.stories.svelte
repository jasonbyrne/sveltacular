<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Paragraph from './paragraph.svelte';
</script>

<Meta title="Typography/Paragraph" component={Paragraph} />

<Story name="Default">
	<Paragraph>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies
		aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl. Sed euismod, nisl eget
		ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl.
	</Paragraph>
	<Paragraph>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies
		aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl. Sed euismod, nisl eget
		ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl.
	</Paragraph>
</Story>
