<script lang="ts">
	import { setContext } from 'svelte';

	setContext('app-branding', true);
</script>

<div class="branding">
	<slot />
</div>

<style>
	div {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
</style>
