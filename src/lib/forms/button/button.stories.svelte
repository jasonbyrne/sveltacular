<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Button from './button.svelte';

	const { Story } = defineMeta({
		component: Button,
		title: 'Forms/Button',
		tags: ['autodocs'],
		args: {
			onClick: fn()
		}
	});
</script>

<Story name="Primary" args={{ style: 'primary', label: 'Click Me' }} />

<Story name="Secondary" args={{ style: 'secondary', label: 'Click Me' }} />

<Story name="Danger" args={{ style: 'danger', label: 'Click Me' }} />

<Story name="Positive" args={{ style: 'positive', label: 'Click Me' }} />

<Story name="Outline" args={{ style: 'outline', label: 'Click Me' }} />

<Story
	name="SingleClick"
	args={{ style: 'primary', repeatSubmitDelay: 'infinite', label: 'Single Click' }}
/>
