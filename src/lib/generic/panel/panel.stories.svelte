<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Panel from './panel.svelte';
	import Paragraph from '$src/lib/typography/paragraph.svelte';
</script>

<Meta title="Generic/Panel" component={Panel} />

<Story name="Default">
	<Panel title="This is the panel title">
		<Paragraph>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus lorem ut arcu iaculis
			ornare. Praesent nec metus elit. Duis nec lorem dapibus massa tempor mollis. Nam mollis odio
			dui, in tempor nunc rutrum sed. Cras molestie risus lectus, id ultrices libero venenatis nec.
			Praesent convallis sit amet dui ut mollis. Proin fermentum, tellus ac malesuada convallis,
			arcu ipsum cursus ex, vitae imperdiet ligula risus in quam. Aenean dictum dui leo, quis
			aliquet urna gravida vitae. Nullam suscipit consectetur velit. Vestibulum finibus lectus ut
			aliquam rhoncus. In ut dictum leo, at facilisis ipsum.
		</Paragraph>
		<Paragraph>
			Fusce in ornare nibh. Phasellus est lorem, eleifend facilisis dictum et, tincidunt quis felis.
			Interdum et malesuada fames ac ante ipsum primis in faucibus. In tristique volutpat turpis.
			Cras ultrices ac dui sit amet vulputate. Pellentesque habitant morbi tristique senectus et
			netus et malesuada fames ac turpis egestas. Curabitur ac eros efficitur, malesuada nunc
			imperdiet, vulputate orci. Praesent rutrum urna vitae convallis efficitur. Proin mollis
			iaculis tortor eget scelerisque.
		</Paragraph>
	</Panel>
</Story>
