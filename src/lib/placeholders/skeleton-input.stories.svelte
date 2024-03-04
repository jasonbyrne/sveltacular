<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import SkeletonInput from './skeleton-input.svelte';
</script>

<Meta title="Placeholders/SkeletonInput" component={SkeletonInput} />

<Story name="Default">
	<SkeletonInput />
</Story>


<Story name="Pulse">
	<SkeletonInput animation="pulse" />
</Story>
