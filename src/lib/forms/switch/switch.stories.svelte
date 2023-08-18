<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Switch from './switch.svelte';
</script>

<Meta title="Forms/Switch" component={Switch} />

<Story name="Standard">
	<Switch isChecked={true}>Turn on sync</Switch>
</Story>

<Story name="No Label">
	<Switch isChecked={false} />
</Story>
