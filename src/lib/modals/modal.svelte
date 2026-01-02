<script lang="ts">
	import type { Snippet } from 'svelte';
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import DialogCloseButton from './dialog-close-button.svelte';
	import { trapFocus, storeFocus, restoreFocus } from '$src/lib/helpers/focus.js';
	import { browser } from '$app/environment';

	let {
		open = $bindable(false),
		size = 'md' as FormFieldSizeOptions,
		showCloseButton = true,
		dismissable = true,
		title = undefined,
		onClose = undefined,
		children
	}: {
		open?: boolean;
		size?: FormFieldSizeOptions;
		showCloseButton?: boolean;
		dismissable?: boolean;
		title?: string | undefined;
		onClose?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	let dialogElement: HTMLDivElement | null = $state(null);
	let previousFocus: HTMLElement | null = $state(null);

	const close = () => {
		if (!dismissable) return;
		open = false;
		onClose?.();
		if (browser && previousFocus) {
			restoreFocus(previousFocus);
		}
	};

	let _showCloseButton = $derived(dismissable && showCloseButton);
	let modalId = $derived(`modal-${Math.random().toString(36).substring(7)}`);
	let titleId = $derived(title ? `${modalId}-title` : undefined);

	$effect(() => {
		if (open && browser && dialogElement) {
			previousFocus = storeFocus();
			const untrap = trapFocus(dialogElement);
			return () => {
				untrap();
			};
		}
	});
</script>

{#if open}
	<Overlay onclick={close}>
		<Dialog {size} bind:this={dialogElement} role="dialog" aria-modal="true" aria-labelledby={titleId}>
			<DialogCloseButton show={_showCloseButton} onClick={close} />
			<DialogBody>
				{@render children?.()}
			</DialogBody>
		</Dialog>
	</Overlay>
{/if}
