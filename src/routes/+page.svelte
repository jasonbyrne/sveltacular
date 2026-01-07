<script lang="ts">
	import AppBar from '$src/lib/navigation/app-bar/app-bar.svelte';
	import AppLogo from '$src/lib/navigation/app-bar/app-logo.svelte';
	import Paragraph from '$src/lib/typography/paragraph.svelte';
</script>

<AppBar size="sm" position="top">
	<AppLogo src="/sveltacular-transparent.png" alt="Sveltacular" href="/" />
	<div>Svelte 5 Native Component Library</div>
</AppBar>

<main>
	<Paragraph>This is a placeholder. We are deploying Storybook, not this page.</Paragraph>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 70px;
	}
</style>
