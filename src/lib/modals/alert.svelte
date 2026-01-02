<script lang="ts">
	import type { Snippet } from 'svelte';
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import DialogFooter from '$src/lib/modals/dialog-footer.svelte';
	import DialogHeader from '$src/lib/modals/dialog-header.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Divider from '$src/lib/generic/divider/divider.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import Button from '../forms/button/button.svelte';
	import DialogCloseButton from './dialog-close-button.svelte';

	let {
		open = $bindable(false),
		title = undefined,
		size = 'md' as FormFieldSizeOptions,
		buttonText = 'OK',
		buttonVariant = 'primary' as 'primary' | 'secondary' | 'danger',
		showCloseButton = true,
		onClose = undefined,
		children
	}: {
		open?: boolean;
		title?: string | undefined;
		size?: FormFieldSizeOptions;
		buttonText?: string;
		buttonVariant?: 'primary' | 'secondary' | 'danger';
		showCloseButton?: boolean;
		onClose?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	const close = () => {
		open = false;
		onClose?.();
	};
</script>

{#if open}
	<Overlay onclick={close}>
		<Dialog {size} role="alertdialog" aria-labelledby={title ? 'alert-title' : undefined}>
			{#if title}
				<DialogHeader id="alert-title">
					{title}
				</DialogHeader>
				<Divider />
			{/if}
			<DialogCloseButton show={showCloseButton} onClick={close} />
			<DialogBody>
				{@render children?.()}
			</DialogBody>
			<Divider />
			<DialogFooter>
				<Button onclick={close} size="full" variant={buttonVariant} label={buttonText} />
			</DialogFooter>
		</Dialog>
	</Overlay>
{/if}
