<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import BoolBox from './bool-box.svelte';
</script>

<Meta title="Forms/BoolBox" component={BoolBox} />

<Story name="Default">
	<BoolBox />
</Story>

<Story name="Yes/No">
	<BoolBox options={['Yes', 'No']} />
</Story>

<Story name="True/False">
	<BoolBox options={['True', 'False']} />
</Story>

<Story name="On/Off">
	<BoolBox options={['On', 'Off']} />
</Story>

<Story name="Enabled/Disabled">
	<BoolBox options={['Enabled', 'Disabled']} />
</Story>

<Story name="Active/Inactive">
	<BoolBox options={['Active', 'Inactive']} />
</Story>

<Story name="Visible/Hidden">
	<BoolBox options={['Visible', 'Hidden']} />
</Story>
