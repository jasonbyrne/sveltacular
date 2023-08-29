<script lang="ts">
	export let href: string;
	export let target: string | undefined = undefined;
	export let underline: 'none' | 'hover' | 'always' = 'none';
	export let disabled = false;
	export let display: 'inline' | 'block' | 'inline-block' = 'inline';
</script>

{#if disabled}
	<span class="link disabled underline-{underline} {display}">
		<slot />
	</span>
{:else}
	<a {href} {target} class="link underline-{underline} {display}">
		<slot />
	</a>
{/if}

<style lang="scss">
	.link {
		text-decoration: underline;

		&.disabled {
			cursor: not-allowed;
		}

		&.underline-none,
		&.underline-hover {
			text-decoration: none;
		}

		&.block {
			display: block;
			width: 100%;
		}

		&.inline-block {
			display: inline-block;
		}

		&[href].underline-hover:hover {
			text-decoration: underline;
		}
	}
</style>
