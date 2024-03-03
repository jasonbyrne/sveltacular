<script lang="ts">
	export let side: 'top' | 'bottom' = 'top';
	export let align: 'left' | 'center' | 'right' = 'center';
</script>

<caption class="{side} {align}">
	<slot />
</caption>

<style lang="scss">
	caption {
		padding: 0.5rem 0.75rem;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.25rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-family: sans-serif;
		text-shadow: 1px 1px 1px black;
		text-align: center;
		caption-side: top;

		&.bottom {
			caption-side: bottom;
		}

		&.left {
			text-align: left;
		}

		&.right {
			text-align: right;
		}
	}
</style>
