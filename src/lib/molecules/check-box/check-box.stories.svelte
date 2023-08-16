<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import CheckBox from './check-box.svelte';
</script>

<Meta title="Checkbox" component={CheckBox} />

<Story name="Standard">
	<CheckBox isChecked={true}>Turn on sync</CheckBox>
</Story>

<Story name="No Label">
	<CheckBox isChecked={false} />
</Story>
