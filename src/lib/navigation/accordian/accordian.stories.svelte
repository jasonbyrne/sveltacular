<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Accordian from './accordian.svelte';
</script>

<Meta title="Navigation/Accordian" component={Accordian} />

<Story name="Standard">
	<Accordian title="Card title">
		<nav>
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
			<li>Item 4</li>
			<li>Item 5</li>
			<li>Item 6</li>
		</nav>
	</Accordian>
</Story>
