<script lang="ts">
	import FlexItem from '../layout/flex-item.svelte';

    export let animation: 'pulse' | 'none' = 'none';
</script>

<FlexItem>
    <div class="box {animation}">
        <div class="label"></div>
        <div class="input"></div>
    </div>
</FlexItem>

<style>
    div.pulse {
        animation: pulse 2s infinite;
    }

	div.label {
		height: 1rem;
		background-color: var(--base-color-fg, #ccc);
		opacity: 0.5;
		border-radius: 1rem;
		margin-bottom: 1rem;
        width: 35%;
	}
    div.input {
        height: 2rem;
        width: 100%;
        border: 1px solid var(--form-input-border, black);
		background-color: var(--form-input-bg, white);
        opacity: 0.7;
        border-radius: 0.25rem;
    }

    @keyframes pulse {
		0%,
		100% {
			opacity: 0.5;
            scale: 0.99;
		}
		50% {
			opacity: 1;
            scale: 1;
		}
	}
</style>
