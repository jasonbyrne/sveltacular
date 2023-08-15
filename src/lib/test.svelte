<script lang="ts">
	export let title: string;
</script>

<div style="color: red">
	<h1>{title}</h1>
	<slot />
</div>
