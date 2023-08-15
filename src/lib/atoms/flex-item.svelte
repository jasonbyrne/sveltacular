<script>
	export let grow = false;
</script>

<div style={`flex: ${grow ? 1 : 0}`}>
	<slot />
</div>
