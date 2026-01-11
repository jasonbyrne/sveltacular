<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import TabGroup from './tab-group.svelte';
	import Tab from './tab.svelte';

	const { Story } = defineMeta({
		component: TabGroup,
		title: 'Navigation/TabGroup',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story name="Traditional">
	<Tab label="Tab one">Tab one</Tab>
	<Tab label="Tab two">Tab two</Tab>
	<Tab label="Tab three">Tab three</Tab>
</Story>

<Story name="Underline" args={{ variant: 'underline' }}>
	<Tab label="Tab one">Tab one</Tab>
	<Tab label="Tab two">Tab two</Tab>
	<Tab label="Tab three">Tab three</Tab>
</Story>

<Story name="Outline" args={{ variant: 'outline' }}>
	<Tab label="Tab one">Tab one</Tab>
	<Tab label="Tab two">Tab two</Tab>
	<Tab label="Tab three">Tab three</Tab>
</Story>

<Story name="Overline" args={{ variant: 'overline' }}>
	<Tab label="Tab one">Tab one</Tab>
	<Tab label="Tab two">Tab two</Tab>
	<Tab label="Tab three">Tab three</Tab>
</Story>

<Story name="With Active Tab" args={{ variant: 'traditional', activeTab: 'tab_two' }}>
	<Tab label="Tab one">Tab one content</Tab>
	<Tab id="tab_two" label="Tab two">Tab two content (active via activeTab prop)</Tab>
	<Tab label="Tab three">Tab three content</Tab>
</Story>

<Story name="Pills" args={{ variant: 'pills' }}>
	<Tab label="Tab one">Tab one content</Tab>
	<Tab label="Tab two">Tab two content</Tab>
	<Tab label="Tab three">Tab three content</Tab>
</Story>

<Story name="Segmented" args={{ variant: 'segmented' }}>
	<Tab label="Tab one">Tab one content</Tab>
	<Tab label="Tab two">Tab two content</Tab>
	<Tab label="Tab three">Tab three content</Tab>
</Story>

<Story name="Minimal" args={{ variant: 'minimal' }}>
	<Tab label="Tab one">Tab one content</Tab>
	<Tab label="Tab two">Tab two content</Tab>
	<Tab label="Tab three">Tab three content</Tab>
</Story>

<Story name="Keyboard Navigation" args={{ variant: 'underline' }}>
	<Tab label="First Tab">Use arrow keys to navigate between tabs</Tab>
	<Tab label="Second Tab">Home key goes to first tab</Tab>
	<Tab label="Third Tab">End key goes to last tab</Tab>
	<Tab label="Fourth Tab">Enter or Space activates the focused tab</Tab>
</Story>
