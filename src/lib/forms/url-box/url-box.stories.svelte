<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import UrlBox from './url-box.svelte';
</script>

<Meta title="Forms/UrlBox" component={UrlBox} />

<Story name="Default">
	<UrlBox placeholder="www.svelte.dev" />
</Story>
