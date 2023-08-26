<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import DateTime from './date-time.svelte';
</script>

<Meta title="Generic/DateTime" component={Date} />

<Story name="Default">
	<DateTime />
</Story>

<Story name="Date Time Long">
	<DateTime style="long" type="datetime" />
</Story>

<Story name="Date Time Long (GB)">
	<DateTime style="long" type="datetime" lang="en-gb" />
</Story>

<Story name="Date Long">
	<DateTime style="long" type="date" />
</Story>

<Story name="Date Time Short">
	<DateTime style="short" type="datetime" />
</Story>

<Story name="Date Short">
	<DateTime style="short" type="date" />
</Story>

<Story name="YYYY-MM-DD">
	<DateTime type="ymd" />
</Story>

<Story name="YYYY-MM-DD HH:MM">
	<DateTime type="ymdhm" />
</Story>

<Story name="YYYY-MM-DD HH:MM:SS">
	<DateTime type="ymdhms" />
</Story>

<Story name="YYYY-MM-DD HH:MM TZ">
	<DateTime type="ymdhmt" />
</Story>

<Story name="Time Long">
	<DateTime style="long" type="time" />
</Story>

<Story name="Time Medium">
	<DateTime style="medium" type="time" />
</Story>

<Story name="Time Short">
	<DateTime style="short" type="time" />
</Story>

<Story name="Ago Short (Now)">
	<DateTime style="short" type="ago" />
</Story>

<Story name="Ago Short (Past)">
	<DateTime style="short" type="ago" value="2023-08-13" />
</Story>

<Story name="Ago Short (Future)">
	<DateTime style="short" type="ago" value="2030-08-13" />
</Story>

<Story name="Ago Long (Now)">
	<DateTime style="long" type="ago" />
</Story>

<Story name="Ago Long (Past)">
	<DateTime style="long" type="ago" value="2023-08-13" />
</Story>

<Story name="Ago Long (Future)">
	<DateTime style="long" type="ago" value="2030-08-13" />
</Story>
