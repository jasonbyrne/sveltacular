<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Scorecard from './scorecard.svelte';
	import CardContainer from '../card/card-container.svelte';
</script>

<Meta title="Generic/Scorecard" component={Scorecard} />

<Story name="Default">
	<Scorecard value={12334}>Page Views</Scorecard>
	<Scorecard value={932}>Visitors</Scorecard>
</Story>

<Story name="Above">
	<Scorecard value={12334} caption="above">Page Views</Scorecard>
</Story>

<Story name="Below">
	<Scorecard value={12334} caption="below">Page Views</Scorecard>
</Story>

<Story name="Left">
	<Scorecard value={12334} caption="left">Page Views</Scorecard>
</Story>

<Story name="Right">
	<Scorecard value={12334} caption="right">Page Views</Scorecard>
</Story>

<Story name="Link">
	<Scorecard value={12334} caption="above" href="https://www.google.com">Page Views</Scorecard>
</Story>

<Story name="In Container">
	<CardContainer>
		<Scorecard value={12334} href="https://www.google.com">Page Views</Scorecard>
		<Scorecard value={2356}>Visits</Scorecard>
		<Scorecard value={932}>Visitors</Scorecard>
		<Scorecard value={3.74}>Pages/Visit</Scorecard>
	</CardContainer>
</Story>
