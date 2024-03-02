<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
    import List from './list.svelte';
    import ListItem from './list-item.svelte';
</script>

<Meta title="Generic/List" component={List} />

<Story name="Default">
	<List type="unordered">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
    </List> 
</Story>


<Story name="Ordered">
	<List type="ordered">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
    </List> 
</Story>

<Story name="Squares">
	<List type="unordered" style="square">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
    </List> 
</Story>