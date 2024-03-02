<script lang="ts">
    export let type: 'unordered' | 'ordered' = 'unordered';
    export let style: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' = 'none';
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