<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import CheckBoxGroup from './check-box-group.svelte';
</script>

<Meta title="Forms/CheckBoxGroup" component={CheckBoxGroup} />

<Story name="Standard">
	<CheckBoxGroup
		items={[
			{ name: 'Option 1', value: '1' },
			{ name: 'Option 2', value: '2' },
			{ name: 'Option 3', value: '3' }
		]}
	>
		Choose one or more:</CheckBoxGroup
	>
</Story>
