<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import CodeBlock from './code-block.svelte';
</script>

<Meta title="Typography/CodeBlock" component={CodeBlock} />

<Story name="Default">
	<CodeBlock>const lang = "JavaScript";</CodeBlock>
</Story>
