<script lang="ts">
	export let href: string;
	export let target: string | undefined = undefined;
	export let underline: 'none' | 'hover' | 'always' = 'none';
	export let disabled = false;
</script>

{#if disabled}
	<span class="link underline-{underline}">
		<slot />
	</span>
{:else}
	<a {href} {target} class="link underline-{underline}">
		<slot />
	</a>
{/if}

<style lang="scss">
	.link {
		text-decoration: underline;
		color: inherit;
		cursor: pointer;

		&.underline-none,
		&.underline-hover {
			text-decoration: none;
		}
	}

	a.link {
		&.underline-hover:hover {
			text-decoration: underline;
		}
	}

	span.link {
		cursor: default;
		color: rgba(255, 255, 255, 0.5);
	}
</style>
