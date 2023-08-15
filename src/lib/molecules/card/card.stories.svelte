<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Card from './card.svelte';
</script>

<Meta title="Cards" component={Card} />

<Story name="Primary">
	<Card title="Card title">This is the content of the card</Card>
</Story>
