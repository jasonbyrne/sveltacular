<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Button from './button.svelte';
</script>

<Meta title="Buttons" component={Button} />

<Story name="Primary">
	<Button style="primary">Click Me</Button>
</Story>

<Story name="Secondary">
	<Button style="secondary">Click Me</Button>
</Story>

<Story name="Tertiary">
	<Button style="tertiary">Click Me</Button>
</Story>

<Story name="Danger">
	<Button style="danger">Click Me</Button>
</Story>

<Story name="Link">
	<Button style="link">Click Me</Button>
</Story>
