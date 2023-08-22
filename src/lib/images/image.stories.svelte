<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Image from './image.svelte';

	const sources = [{ url: '/assets/svelte.png' }];
</script>

<Meta title="Images/Image" component={Image} />

<Story name="Without Caption">
	<div style="width: 100px; height: 100px">
		<Image src={sources} />
	</div>
</Story>

<Story name="With Caption">
	<div style="width: 300px; height: 300px">
		<Image src={sources}>Svelte Logo</Image>
	</div>
</Story>
