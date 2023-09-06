<script lang="ts">
	import EnvelopeIcon from '$src/lib/icons/envelope-icon.svelte';

	export let emailAddress = '';
</script>

<a href="mailto:{emailAddress}" title="Email Address">
	<span class="icon">
		<EnvelopeIcon />
	</span>
	<span class="address">
		{emailAddress}
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
