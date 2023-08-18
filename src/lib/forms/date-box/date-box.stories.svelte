<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import DateBox from './date-box.svelte';
</script>

<Meta title="Forms/DateBox" component={DateBox} />

<Story name="Date">
	<DateBox type="date">Birthdate</DateBox>
</Story>

<Story name="Date + Time">
	<DateBox type="datetime-local">Deadline</DateBox>
</Story>

<Story name="Date (Nullable)">
	<DateBox type="date" nullable={true}>End Date</DateBox>
</Story>
