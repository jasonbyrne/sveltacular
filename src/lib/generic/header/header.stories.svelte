<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Button from '$src/lib/forms/button/button.svelte';
	import Text from '$src/lib/typography/text.svelte';
	import Header from './header.svelte';
</script>

<Meta title="Generic/Headline" component={Header} />

<Story name="Default">
	<Header title="Headline" subtitle="Subtitle">
		<Button>Button</Button>
	</Header>
	<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget</Text>
</Story>

<Story name="Underline">
	<Header title="Header" subtitle="Subtitle" underline>
		<Button>Button</Button>
	</Header>
	<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget</Text>
</Story>

<Story name="Level 1">
	<Header title="Header" subtitle="Subtitle" level={1}>
		<Button>Button</Button>
	</Header>
	<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget</Text>
</Story>

<Story name="Level 2">
	<Header title="Header" subtitle="Subtitle" level={2}>
		<Button>Button</Button>
	</Header>
	<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget</Text>
</Story>

<Story name="Level 3">
	<Header title="Header" subtitle="Subtitle" level={3}>
		<Button>Button</Button>
	</Header>
	<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget</Text>
</Story>

<Story name="Level 4">
	<Header title="Header" subtitle="Subtitle" level={4}>
		<Button>Button</Button>
	</Header>
	<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget</Text>
</Story>

<Story name="Level 5">
	<Header title="Header" subtitle="Subtitle" level={5}>
		<Button>Button</Button>
	</Header>
	<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget</Text>
</Story>

<Story name="Level 6">
	<Header title="Header" subtitle="Subtitle" level={6}>
		<Button>Button</Button>
	</Header>
	<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget</Text>
</Story>
