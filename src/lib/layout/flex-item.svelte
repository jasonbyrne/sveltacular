<script lang="ts">
	export let grow = false;
	export let align: 'start' | 'center' | 'end' | 'stretch' | 'auto' = 'auto';
</script>

<div style={`flex: ${grow ? 1 : 0}; align-self: ${align}`}>
	<slot />
</div>
