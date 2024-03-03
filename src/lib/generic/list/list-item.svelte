<script lang="ts">
	import { getContext } from "svelte";
	import { listContext, type ListContext } from "./list.js";

    const ctx = getContext<ListContext>(listContext);
	const listStyle = ctx.style || 'none';
</script>

<li class="{listStyle}">
    <slot />
</li>


<style>
	li.striped {
        background-color: var(--list-row-bg, #fff);
		color: var(--list-row-fg, #000);
        padding: 0.5rem;

        &:nth-of-type(odd) {
            background-color: var(--list-row-alt-bg, #eee);
            color: var(--list-row-alt-fg, #000);
        }
	}
</style>
