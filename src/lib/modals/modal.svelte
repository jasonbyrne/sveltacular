<script lang="ts">
	import type { Snippet } from 'svelte';
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import DialogCloseButton from './dialog-close-button.svelte';

	let {
		open = $bindable(false),
		size = 'md' as FormFieldSizeOptions,
		showCloseButton = true,
		dismissable = true,
		onClose = undefined,
		children
	}: {
		open?: boolean;
		size?: FormFieldSizeOptions;
		showCloseButton?: boolean;
		dismissable?: boolean;
		onClose?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	const close = () => {
		if (!dismissable) return;
		open = false;
		onClose?.();
	};

	let _showCloseButton = $derived(dismissable && showCloseButton);
</script>

{#if open}
	<Overlay onclick={close}>
		<Dialog {size}>
			<DialogCloseButton show={_showCloseButton} onClick={close} />
			<DialogBody>
				{@render children?.()}
			</DialogBody>
		</Dialog>
	</Overlay>
{/if}
