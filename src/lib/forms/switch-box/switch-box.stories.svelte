<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import SwitchBox from './switch-box.svelte';
</script>

<Meta title="Forms/SwitchBox" component={SwitchBox} />

<Story name="Default">
	<SwitchBox checked={true}>Turn on sync</SwitchBox>
</Story>

<Story name="Medium">
	<SwitchBox checked={true} size="md">Turn on sync</SwitchBox>
</Story>

<Story name="Large">
	<SwitchBox checked={true} size="lg">Turn on sync</SwitchBox>
</Story>

<Story name="X-Large">
	<SwitchBox checked={true} size="xl">Turn on sync</SwitchBox>
</Story>

<Story name="Small">
	<SwitchBox checked={true} size="sm">Turn on sync</SwitchBox>
</Story>

<Story name="No Label">
	<SwitchBox checked={false} />
</Story>
