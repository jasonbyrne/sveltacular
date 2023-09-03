<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Loading from './loading.svelte';
	import SkeletonText from './skeleton-text.svelte';
</script>

<Meta title="Placeholders/Loading" component={Loading} />

<Story name="Default">
	<Loading />
</Story>

<Story name="Spinner">
	<Loading type="spinner" />
</Story>

<Story name="Content Block">
	<div>
		<Loading type="block">Loading Content...</Loading>
	</div>
</Story>

<Story name="Loading with SkeletonText">
	<div>
		<Loading type="block">
			<SkeletonText min={80} />
			<SkeletonText min={80} />
			<SkeletonText max={50} min={25} />
		</Loading>
	</div>
</Story>

<style>
	div {
		width: 100%;
		height: 200px;
	}
</style>
