<header>
	<h1><slot /></h1>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1.75rem;
		overflow: hidden;
		color: #000;

		h1 {
			margin: 0;
			flex-grow: 1;
			font-size: 1.25rem;
			line-height: 1.75rem;
		}
	}
</style>
