<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Dot from './dot.svelte';
</script>

<Meta title="Generic/Dot" component={Dot} />

<Story name="Standard">
	<Dot />
</Story>

<Story name="X-Large">
	<Dot size="xl" color="red" />
</Story>
