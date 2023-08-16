<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Link from './link.svelte';
</script>

<Meta title="Link" component={Link} />

<Story name="Standard">
	<Link href="https://www.google.com">Google</Link>
</Story>

<Story name="Underline on hover">
	<Link href="https://www.google.com" underline="hover">Google</Link>
</Story>

<Story name="Underline always">
	<Link href="https://www.google.com" underline="always">Google</Link>
</Story>

<Story name="Disabled">
	<Link href="https://www.google.com" disabled={true}>Google</Link>
</Story>
