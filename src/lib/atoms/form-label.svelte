<script lang="ts">
	export let id: string;
</script>

<label for={id}><slot /></label>

<style lang="scss">
	label {
		display: block;
		margin-bottom: 0.5rem;
	}
</style>
