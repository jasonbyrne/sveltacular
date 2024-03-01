<script lang="ts">


</script>

<section>
    <slot />
</section>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column-reverse;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        gap: 1rem;
        z-index: 9999;
        max-width: 100%;
        width: 20rem;
    }
</style>