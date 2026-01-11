<script lang="ts">
	import Icon from '$src/lib/icons/icon.svelte';

	let { value }: { value: string } = $props();
</script>

<a href="mailto:{value}" title="Email Address">
	<span class="icon">
		<Icon type="envelope" size="sm" />
	</span>
	<span class="address">
		{value}
	</span>
</a>

<style lang="scss">
	a {
		color: inherit;
		text-decoration: none;

		span {
			display: inline-block;
			vertical-align: middle;
			line-height: 1.5rem;
		}

		.icon {
			width: 1rem;
			height: 1rem;
			position: relative;
		}

		&:hover {
			.address {
				text-decoration: underline;
			}
		}
	}
</style>
