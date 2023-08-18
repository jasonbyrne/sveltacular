<script lang="ts">
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import DialogFooter from '$src/lib/modals/dialog-footer.svelte';
	import DialogHeader from '$src/lib/modals/dialog-header.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Divider from '$src/lib/generic/divider/divider.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import Button from '../forms/button/button.svelte';

	export let open = false;
	export let title: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'md';
	export let buttonText = 'OK';
	export let showCloseButton = true;

	const close = () => (open = false);
</script>

{#if open}
	<Overlay>
		<Dialog {size}>
			<div>
				{#if title}
					<DialogHeader on:close={close} {showCloseButton}>
						{title}
					</DialogHeader>
					<Divider />
				{/if}
				<DialogBody>
					<slot />
				</DialogBody>
				<Divider />
			</div>
			<DialogFooter>
				<Button on:click={close} size="full">
					{buttonText}
				</Button>
			</DialogFooter>
		</Dialog>
	</Overlay>
{/if}

<style>
	div {
		padding-bottom: 3rem;
	}
</style>
