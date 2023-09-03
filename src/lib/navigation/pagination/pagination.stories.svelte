<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Pagination from './pagination.svelte';
</script>

<Meta title="Navigation/Pagination" component={Pagination} />

<Story name="Single Page">
	<Pagination />
</Story>

<Story name="Two Pages">
	<Pagination currentPage={2} totalPages={2} />
</Story>

<Story name="Many Pages">
	<Pagination currentPage={10} totalPages={50} />
</Story>

<Story name="Align Start">
	<Pagination currentPage={1} totalPages={7} align="start" />
</Story>
