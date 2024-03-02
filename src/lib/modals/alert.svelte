<script lang="ts">
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import DialogFooter from '$src/lib/modals/dialog-footer.svelte';
	import DialogHeader from '$src/lib/modals/dialog-header.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Divider from '$src/lib/generic/divider/divider.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import Button from '../forms/button/button.svelte';
	import DialogCloseButton from './dialog-close-button.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ close: void }>();

	export let open = false;
	export let title: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'md';
	export let buttonText = 'OK';
	export let buttonStyle: 'primary' | 'secondary' | 'danger' = 'primary';
	export let showCloseButton = true;

	const close = () => {
		dispatch('close');
		open = false;
	};
</script>

{#if open}
	<Overlay on:click={close}>
		<Dialog {size}>
			{#if title}
				<DialogHeader>
					{title}
				</DialogHeader>
				<Divider />
			{/if}
			<DialogCloseButton show={showCloseButton} on:click={close} />
			<DialogBody>
				<slot />
			</DialogBody>
			<Divider />
			<DialogFooter>
				<Button on:click={close} size="full" style={buttonStyle}>
					{buttonText}
				</Button>
			</DialogFooter>
		</Dialog>
	</Overlay>
{/if}
