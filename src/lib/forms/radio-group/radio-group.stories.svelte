<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import RadioGroup from './radio-group.svelte';
</script>

<Meta title="Forms/RadioGroup" component={RadioGroup} />

<Story name="Standard">
	<RadioGroup
		items={[
			{ name: 'Option 1', value: '1' },
			{ name: 'Option 2', value: '2' },
			{ name: 'Option 3', value: '3' }
		]}
	/>
</Story>
