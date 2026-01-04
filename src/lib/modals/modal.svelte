<script lang="ts">
	import type { Snippet } from 'svelte';
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import DialogCloseButton from './dialog-close-button.svelte';
	import { trapFocus, storeFocus, restoreFocus } from '$src/lib/helpers/focus.js';
	import { animateFadeIn, animateScaleIn } from '$src/lib/helpers/animations.js';
	import { browser } from '$app/environment';

	let {
		open = $bindable(false),
		size = 'md' as FormFieldSizeOptions,
		showCloseButton = true,
		dismissable = true,
		blur = false,
		glass = false,
		title = undefined,
		onClose = undefined,
		children
	}: {
		open?: boolean;
		size?: FormFieldSizeOptions;
		showCloseButton?: boolean;
		dismissable?: boolean;
		blur?: boolean;
		glass?: boolean;
		title?: string | undefined;
		onClose?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	let dialogElement = $state<HTMLDivElement | null>(null);
	let previousFocus = $state<HTMLElement | null>(null);

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
		if (open && browser) {
			// Store cleanup function
			let untrap: (() => void) | null = null;
			
			// Wait for next tick to ensure dialogElement is bound
			setTimeout(() => {
				if (dialogElement) {
					previousFocus = storeFocus();
					untrap = trapFocus(dialogElement);
				}
			}, 0);
			
			// Return cleanup function
			return () => {
				if (untrap) {
					untrap();
				}
			};
		}
	});

	// Trigger enter animation when modal opens
	$effect(() => {
		if (open && browser) {
			setTimeout(() => {
				if (dialogElement) animateScaleIn(dialogElement);
			}, 10);
		}
	});
</script>

{#if open}
	<Overlay {blur} onClick={close}>
		<div bind:this={dialogElement}>
			<Dialog {size} {glass} role="dialog" aria-modal="true" aria-labelledby={titleId}>
				<DialogCloseButton show={_showCloseButton} onClick={close} />
				<DialogBody>
					{@render children?.()}
				</DialogBody>
			</Dialog>
		</div>
	</Overlay>
{/if}
