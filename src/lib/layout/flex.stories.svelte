<script lang="ts">
    import FlexRow from './flex-row.svelte';
    import FlexItem from './flex-item.svelte';
    import Card from '../generic/card/card.svelte';
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	const sources = [{ url: '/assets/svelte.png' }];
</script>

<Meta title="Layout/Flex" component={FlexRow} />

<Story name="Normal">
	<FlexRow>
        <Card>
            <h2>Card Title</h2>
            <p>Card Description</p>
        </Card>
        <Card>
            <h2>Card Title</h2>
            <p>Card Description</p>
        </Card>
        <Card>
            <h2>Card Title</h2>
            <p>Card Description</p>
        </Card>
    </FlexRow>
</Story>

<Story name="Different Sizes">
    <FlexRow>
        <Card>
            <h2>Card Title</h2>
            <p>Card Description</p>
        </Card>
        <div>foobar</div>
        <button>Click Me</button>
    </FlexRow>
</Story>

<Story name="Different Sizes (Align Middle)">
    <FlexRow alignItems="center">
        <Card>
            <h2>Card Title</h2>
            <p>Card Description</p>
        </Card>
        <div>foobar</div>
        <button>Click Me</button>
    </FlexRow>
</Story>

<Story name="Wrap">
    <FlexRow alignItems="center" wrap={true}>
        <Card>
            <h2>Card 1</h2>
            <p>Card Description</p>
        </Card>
        <Card>
            <h2>Card 2</h2>
            <p>Card Description</p>
        </Card>
        <Card>
            <h2>Card 3</h2>
            <p>Card Description</p>
        </Card>
        <Card>
            <h2>Card 4</h2>
            <p>Card Description</p>
        </Card>
        <Card>
            <h2>Card 5</h2>
            <p>Card Description</p>
        </Card>
        <Card>
            <h2>Card 6</h2>
            <p>Card Description</p>
        </Card>
    </FlexRow>
</Story>