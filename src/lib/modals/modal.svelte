<script lang="ts">
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import DialogCloseButton from './dialog-close-button.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ close: void }>();

	export let open = false;
	export let size: FormFieldSizeOptions = 'md';
	export let showCloseButton = true;
	export let dismissable = true;

	const close = () => {
		if (!dismissable) return;
		dispatch('close');
		open = false;
	};

	$: _showCloseButton = dismissable && showCloseButton;
</script>

{#if open}
	<Overlay on:click={close}>
		<Dialog {size}>
			<DialogCloseButton show={_showCloseButton} on:click={close} />
			<DialogBody>
				<slot />
			</DialogBody>
		</Dialog>
	</Overlay>
{/if}
