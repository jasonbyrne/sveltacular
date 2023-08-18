<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Scorecard from './scorecard.svelte';
</script>

<Meta title="Generic/Scorecard" component={Scorecard} />

<Story name="Default">
	<Scorecard value={123}>Page Views</Scorecard>
</Story>
