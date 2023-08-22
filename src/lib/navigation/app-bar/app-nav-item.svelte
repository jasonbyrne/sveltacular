<script lang="ts">
	export let href: string;
	export let title: string;
</script>

<a {href}>
	{#if $$slots.default}
		<div class="icon">
			<slot />
		</div>
	{/if}
	<div class="title">{title}</div>
</a>

<style lang="scss">
	a {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		align-items: center;
		height: 100%;
		color: var(--nav-link-color, black);
		text-decoration: none;

		&:hover {
			color: var(--nav-link-hover-color, black);
			text-decoration: underline;
		}

		.icon {
			width: 100%;
			height: 1.5rem;
		}
	}
</style>
