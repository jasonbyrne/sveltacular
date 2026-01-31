<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import CheckBoxGroup from './check-box-group.svelte';

	// Database types for field mapping examples
	type Tag = { id: number; name: string; color: string };
	type Feature = { featureId: string; title: string; enabled: boolean };

	// Sample database objects
	const tags: Tag[] = [
		{ id: 1, name: 'Important', color: 'red' },
		{ id: 2, name: 'Featured', color: 'blue' },
		{ id: 3, name: 'Tutorial', color: 'green' },
		{ id: 4, name: 'Advanced', color: 'purple' },
		{ id: 5, name: 'Beginner', color: 'yellow' }
	];

	const features: Feature[] = [
		{ featureId: 'email', title: 'Email Notifications', enabled: true },
		{ featureId: 'sms', title: 'SMS Alerts', enabled: true },
		{ featureId: 'push', title: 'Push Notifications', enabled: false },
		{ featureId: 'digest', title: 'Daily Digest', enabled: true }
	];

	const { Story } = defineMeta({
		component: CheckBoxGroup,
		title: 'Forms/CheckBoxGroup',
		tags: ['autodocs'],
		args: {
			onChange: fn()
		}
	});
</script>

<Story
	name="Standard"
	args={{
		label: 'Choose one or more:',
		items: [
			{ label: 'Option 1', value: '1' },
			{ label: 'Option 2', value: '2' },
			{ label: 'Option 3', value: '3' }
		]
	}}
></Story>


<Story
	name="WithDatabaseObjects"
	args={{
		label: 'Tags (Database Objects)',
		items: tags,
		fieldNames: { label: 'name', value: 'id' },
		group: [1, 3],
		helperText: 'Using fieldNames to map database objects - returns array of IDs'
	}}
/>

<Story
	name="WithCustomFieldNames"
	args={{
		label: 'Enable Features',
		items: features,
		fieldNames: { label: 'title', value: 'featureId' },
		group: ['email', 'digest'],
		helperText: 'Map custom field names like featureId and title'
	}}
/>

<Story
	name="FieldMappingBackwardsCompatible"
	args={{
		label: 'Choose one or more (Traditional):',
		items: [
			{ label: 'Option 1', value: '1' },
			{ label: 'Option 2', value: '2' },
			{ label: 'Option 3', value: '3' }
		],
		group: ['1', '3'],
		helperText: 'Without fieldNames, component works exactly as before'
	}}
/>
