<div>
	<slot />
</div>

<style>
	div {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: auto;
		grid-gap: 1rem;
		justify-content: center;
		align-items: center;
		justify-items: center;
		align-content: center;
	}
</style>
