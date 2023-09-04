<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import InfoBox from './info-box.svelte';
</script>

<Meta title="Forms/InfoBox" component={InfoBox} />

<Story name="Default">
	<InfoBox value="Some text goes here">Some Label</InfoBox>
</Story>

<Story name="With Link">
	<InfoBox value="Some text goes here" href="https://www.google.com">Some Label</InfoBox>
</Story>
