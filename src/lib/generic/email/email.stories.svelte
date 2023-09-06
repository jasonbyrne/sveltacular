<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Email from './email.svelte';
</script>

<Meta title="Generic/Email" component={Email} />

<Story name="Default">
	<Email emailAddress="someone234@gmail.com" />
</Story>
