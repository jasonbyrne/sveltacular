<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import BoolBox from './bool-box.svelte';

	const { Story } = defineMeta({
		component: BoolBox,
		title: 'Forms/BoolBox',
		tags: ['autodocs'],
		args: {
			label: 'Label',
			onChange: fn(),
			helperText: 'Helper text'
		}
	});
</script>

<Story name="Default" args={{}} />

<Story name="YesNo" args={{ options: ['Yes', 'No'] }} />

<Story name="TrueFalse" args={{ options: ['True', 'False'] }} />

<Story name="OnOff" args={{ options: ['On', 'Off'] }} />

<Story name="EnabledDisabled" args={{ options: ['Enabled', 'Disabled'] }} />

<Story name="ActiveInactive" args={{ options: ['Active', 'Inactive'] }} />

<Story name="VisibleHidden" args={{ options: ['Visible', 'Hidden'] }} />
