<script lang="ts">
	import BoolBox from '$src/lib/forms/bool-box/bool-box.svelte';
	import Button from '$src/lib/forms/button/button.svelte';
	import CheckBox from '$src/lib/forms/check-box/check-box.svelte';
	import Panel from '$src/lib/generic/panel/panel.svelte';
	import AppBar from '$src/lib/navigation/app-bar/app-bar.svelte';
	import AppLogo from '$src/lib/navigation/app-bar/app-logo.svelte';
</script>

<AppBar size="sm" position="top">
	<AppLogo src="/sveltacular-transparent.png" alt="Sveltacular" href="/" />
	<div>sdfasd</div>
</AppBar>

<main>
	<article>
		<h2>Button</h2>
		<code>&lt;Button style="*" label="[button text]" /&gt;</code>
		<div>
			<Button style="primary" label="primary" />
			<Button style="secondary" label="secondary" />
			<Button style="positive" label="positive" />
			<Button style="danger" label="danger" />
			<Button style="outline" label="outline" />
		</div>
	</article>
	<article>
		<h2>BoolBox</h2>
		<code>&lt;BoolBox style="*"&gt;[button text]&lt;/BoolBox&gt;</code>
		<div><BoolBox /></div>
		<code>&lt;BoolBox options=['Visible', 'Hidden']&gt;[button text]&lt;/BoolBox&gt;</code>
		<div>
			<BoolBox options={['Visible', 'Hidden']} />
		</div>
	</article>
	<article>
		<h2>CheckBox</h2>
		<code>&lt;CheckBox isChecked=true|false>[text]&lt;/CheckBox></code>
		<div>
			<CheckBox isChecked={true}>Turn on sync</CheckBox>
		</div>
	</article>
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
