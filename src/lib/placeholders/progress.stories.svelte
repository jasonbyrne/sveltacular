<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Progress from './progress.svelte';
	import Button from '../forms/button/button.svelte';

	let value = 0;

	const increase = () => {
		value += 5;
		if (value > 100) value = 100;
	};

	const decrease = () => {
		value -= 5;
		if (value < 0) value = 0;
	};
</script>

<Meta title="Placeholders/Progress" component={Progress} />

<Story name="Default">
	<div>
		<Progress bind:value />
	</div>
	<Button on:click={decrease}>Decrease</Button>
	<Button on:click={increase}>Increase</Button>
	<Button on:click={() => (value = 0)}>Reset</Button>
	<Button on:click={() => (value = 100)}>Complete</Button>
</Story>
