<script lang="ts">
	import { setContext } from "svelte";
	import { listContext, type ListContext, type ListStyle } from "./list.js";

    export let type: 'unordered' | 'ordered' = 'unordered';
    export let style: ListStyle = 'none';

    const ctx: ListContext = {
		style,
	};
	setContext(listContext, ctx);
</script>

{#if type === 'unordered'}
    <ul class="{style}">
        <slot />
    </ul>
{:else}
    <ol>
        <slot />
    </ol>
{/if}

<style lang="scss">

    .none {
        list-style-type: none;
        padding-left: 0.5rem;
    }

    .striped {
        list-style-type: none;
        padding-left: 0;
    }

    .disc {
        list-style-type: disc;
    }

    .circle {
        list-style-type: circle;
    }

    .square {
        list-style-type: square;
    }

    .decimal {
        list-style-type: decimal;
    }

    .decimal-leading-zero {
        list-style-type: decimal-leading-zero;
    }
</style>