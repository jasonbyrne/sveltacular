<script lang="ts">
	import type { Snippet } from 'svelte';
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import DialogFooter from '$src/lib/modals/dialog-footer.svelte';
	import DialogHeader from '$src/lib/modals/dialog-header.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import Button from '../forms/button/button.svelte';
	import Divider from '$src/lib/generic/divider/divider.svelte';
	import DialogCloseButton from './dialog-close-button.svelte';

	let {
		open = $bindable(false),
		title = undefined,
		size = 'md' as FormFieldSizeOptions,
		yesText = 'Yes',
		noText = 'No',
		yesVariant = 'primary' as 'primary' | 'secondary' | 'danger',
		noVariant = 'secondary' as 'primary' | 'secondary' | 'danger',
		showCloseButton = true,
		onYes = undefined,
		onNo = undefined,
		children
	}: {
		open?: boolean;
		title?: string | undefined;
		size?: FormFieldSizeOptions;
		yesText?: string;
		noText?: string;
		yesVariant?: 'primary' | 'secondary' | 'danger';
		noVariant?: 'primary' | 'secondary' | 'danger';
		showCloseButton?: boolean;
		onYes?: (() => void) | undefined;
		onNo?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	const no = () => {
		open = false;
		onNo?.();
	};

	const yes = () => {
		open = false;
		onYes?.();
	};
</script>

{#if open}
	<Overlay onClick={no}>
		<Dialog
			{size}
			role="alertdialog"
			aria-modal="true"
			aria-labelledby={title ? 'confirm-title' : undefined}
		>
			{#if title}
				<DialogHeader id="confirm-title">
					{title}
				</DialogHeader>
				<Divider />
			{/if}
			<DialogCloseButton show={showCloseButton} onClick={no} />
			<DialogBody>
				{@render children?.()}
			</DialogBody>
			<Divider />
			<DialogFooter>
				<Button onClick={no} variant={noVariant} size="full" label={noText} />
				<Button onClick={yes} variant={yesVariant} size="full" label={yesText} />
			</DialogFooter>
		</Dialog>
	</Overlay>
{/if}
