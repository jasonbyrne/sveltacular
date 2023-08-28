<tr>
	<slot />
</tr>

<style>
	tr {
		background-color: var(--table-row-bg, #fff);
		color: var(--table-row-fg, #000);
		border-bottom: solid 1px var(--table-row-border, #000);
	}

	tr:nth-of-type(odd) {
		background-color: var(--table-row-alt-bg, #ccc);
		color: var(--table-row-alt-fg, #000);
	}
</style>
