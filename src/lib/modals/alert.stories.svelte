<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Alert from './alert.svelte';
</script>

<Meta title="Modals/Alert" component={Alert} />

<Story name="Alert">
	<Alert title="Error" open>Something went wrong and we need to make sure you see this.</Alert>
</Story>

<Story name="Alert (No Title)">
	<Alert open>Something went wrong and we need to make sure you see this.</Alert>
</Story>

<Story name="Alert (X-Large)">
	<Alert title="Extra Large" open size="xl"
		>Something went wrong and we need to make sure you see this.</Alert
	>
</Story>
