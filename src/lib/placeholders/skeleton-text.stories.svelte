<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import SkeletonText from './skeleton-text.svelte';
</script>

<Meta title="Placeholders/SkeletonText" component={SkeletonText} />

<Story name="Default">
	<SkeletonText />
	<SkeletonText />
	<SkeletonText />
</Story>


<Story name="Pulse">
	<SkeletonText animation="pulse" />
	<SkeletonText animation="pulse" />
	<SkeletonText animation="pulse" />
</Story>
