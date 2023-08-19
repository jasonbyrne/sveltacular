<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import SwitchBox from './switch-box.svelte';
</script>

<Meta title="Forms/SwitchBox" component={SwitchBox} />

<Story name="Standard">
	<SwitchBox isChecked={true}>Turn on sync</SwitchBox>
</Story>

<Story name="No Label">
	<SwitchBox isChecked={false} />
</Story>
