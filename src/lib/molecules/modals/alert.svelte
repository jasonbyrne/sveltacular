<script lang="ts">
	import DialogBody from '$src/lib/atoms/dialog-body.svelte';
	import DialogFooter from '$src/lib/atoms/dialog-footer.svelte';
	import DialogHeader from '$src/lib/atoms/dialog-header.svelte';
	import Dialog from '$src/lib/atoms/dialog-window.svelte';
	import Overlay from '$src/lib/atoms/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/types/form.js';
	import Button from '../button/button.svelte';
	import Divider from '../divider/divider.svelte';

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
				<Button on:click={close}>
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
