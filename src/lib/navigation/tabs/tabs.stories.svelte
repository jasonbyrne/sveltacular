<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Tab from './tab.svelte';
	import TabGroup from './tab-group.svelte';
	import Headline from '$src/lib/typography/headline.svelte';
</script>

<Meta title="Navigation/TabGroup" component={TabGroup} />

<Story name="Traditional">
	<TabGroup>
		<Tab title="Tab 1" active>
			<Headline level={3}>Some Content</Headline>
			<p>Tab 1 content</p>
		</Tab>
		<Tab title="Tab 2">
			<Headline level={3}>Some Other Content</Headline>
			<p>Tab 2 content</p>
		</Tab>
		<Tab title="Tab 3">
			<Headline level={3}>Yet More Content</Headline>
			<p>Tab 3 content</p>
		</Tab>
	</TabGroup>
</Story>

<Story name="Underline">
	<TabGroup style="underline">
		<Tab title="Tab 1" active>
			<Headline level={3}>Some Content</Headline>
			<p>Tab 1 content</p>
		</Tab>
		<Tab title="Tab 2">
			<Headline level={3}>Some Other Content</Headline>
			<p>Tab 2 content</p>
		</Tab>
		<Tab title="Tab 3">
			<Headline level={3}>Yet More Content</Headline>
			<p>Tab 3 content</p>
		</Tab>
	</TabGroup>
</Story>

<Story name="Outline">
	<TabGroup style="outline">
		<Tab title="Tab 1" active>
			<Headline level={3}>Some Content</Headline>
			<p>Tab 1 content</p>
		</Tab>
		<Tab title="Tab 2">
			<Headline level={3}>Some Other Content</Headline>
			<p>Tab 2 content</p>
		</Tab>
		<Tab title="Tab 3">
			<Headline level={3}>Yet More Content</Headline>
			<p>Tab 3 content</p>
		</Tab>
	</TabGroup>
</Story>

<Story name="Overline">
	<TabGroup style="overline">
		<Tab title="Tab 1" active>
			<Headline level={3}>Some Content</Headline>
			<p>Tab 1 content</p>
		</Tab>
		<Tab title="Tab 2">
			<Headline level={3}>Some Other Content</Headline>
			<p>Tab 2 content</p>
		</Tab>
		<Tab title="Tab 3">
			<Headline level={3}>Yet More Content</Headline>
			<p>Tab 3 content</p>
		</Tab>
	</TabGroup>
</Story>
