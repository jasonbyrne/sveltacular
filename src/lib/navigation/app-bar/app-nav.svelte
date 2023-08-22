<script lang="ts">
	export let grow = false;
	export let align: 'left' | 'center' | 'right' = 'right';
	export let spacing: 'none' | 'tight' | 'medium' | 'loose' | 'spread' = 'medium';
</script>

<nav class="{grow ? 'grow' : ''} {align} {spacing}">
	<slot />
</nav>

<style>
	nav {
		display: flex;
		flex-grow: 0;
		gap: 1rem;
		margin: 1rem;
		width: 100%;

		&.grow {
			flex-grow: 1;
		}

		&.left {
			justify-content: left;
			align-items: left;
		}

		&.center {
			justify-content: center;
			align-items: center;
		}

		&.right {
			justify-content: right;
			align-items: right;
		}

		&.none {
			gap: 0;
		}

		&.tight {
			gap: 0.5rem;
		}

		&.medium {
			gap: 1rem;
		}

		&.loose {
			gap: 2rem;
		}

		&.spread {
			justify-content: space-evenly;
		}
	}
</style>
