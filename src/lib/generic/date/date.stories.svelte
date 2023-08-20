<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Date from './date.svelte';
</script>

<Meta title="Generic/Date" component={Date} />

<Story name="Default">
	<Date />
</Story>

<Story name="Date Time Long">
	<Date style="long" type="datetime" />
</Story>

<Story name="Date Time Long (GB)">
	<Date style="long" type="datetime" lang="en-gb" />
</Story>

<Story name="Date Long">
	<Date style="long" type="date" />
</Story>

<Story name="Date Time Short">
	<Date style="short" type="datetime" />
</Story>

<Story name="Date Short">
	<Date style="short" type="date" />
</Story>

<Story name="YYYY-MM-DD">
	<Date type="ymd" />
</Story>

<Story name="YYYY-MM-DD HH:MM">
	<Date type="ymdhm" />
</Story>

<Story name="YYYY-MM-DD HH:MM:SS">
	<Date type="ymdhms" />
</Story>

<Story name="YYYY-MM-DD HH:MM TZ">
	<Date type="ymdhmt" />
</Story>

<Story name="Time Long">
	<Date style="long" type="time" />
</Story>

<Story name="Time Medium">
	<Date style="medium" type="time" />
</Story>

<Story name="Time Short">
	<Date style="short" type="time" />
</Story>

<Story name="Ago Short (Now)">
	<Date style="short" type="ago" />
</Story>

<Story name="Ago Short (Past)">
	<Date style="short" type="ago" value="2023-08-13" />
</Story>

<Story name="Ago Short (Future)">
	<Date style="short" type="ago" value="2030-08-13" />
</Story>

<Story name="Ago Long (Now)">
	<Date style="long" type="ago" />
</Story>

<Story name="Ago Long (Past)">
	<Date style="long" type="ago" value="2023-08-13" />
</Story>

<Story name="Ago Long (Future)">
	<Date style="long" type="ago" value="2030-08-13" />
</Story>
