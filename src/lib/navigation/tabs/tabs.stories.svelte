<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Tab from './tab.svelte';
	import TabGroup from './tab-group.svelte';
</script>

<Meta title="Navigation/TabGroup" component={TabGroup} />

<Story name="Standard">
	<TabGroup>
		<Tab title="Tab 1" active>
			<p>Tab 1 content</p>
		</Tab>
		<Tab title="Tab 2">
			<p>Tab 2 content</p>
		</Tab>
		<Tab title="Tab 3">
			<p>Tab 3 content</p>
		</Tab>
	</TabGroup>
</Story>
