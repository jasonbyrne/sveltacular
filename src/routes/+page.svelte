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

	article {
		width: 100%;
		max-width: 1200px;
		margin-top: 20px;
		padding-bottom: 10px;
		border-bottom: dashed 1px #ccc;

		code {
			font-family: monospace;
			background-color: #f4f4f4;
			padding: 8px;
			border-radius: 5px;
			display: block;
			margin-top: 4px;
			margin-bottom: 4px;
		}
	}
</style>
