<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Confirm from './confirm.svelte';
</script>

<Meta title="Modals" component={Confirm} />

<Story name="Confirm">
	<Confirm title="Something Will Happen" open>Do you want to do this thing?</Confirm>
</Story>
