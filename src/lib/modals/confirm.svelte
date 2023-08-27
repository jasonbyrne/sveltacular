<script lang="ts">
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import DialogFooter from '$src/lib/modals/dialog-footer.svelte';
	import DialogHeader from '$src/lib/modals/dialog-header.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import { createEventDispatcher } from 'svelte';
	import Button from '../forms/button/button.svelte';
	import Divider from '$src/lib/generic/divider/divider.svelte';
	import DialogCloseButton from './dialog-close-button.svelte';

	export let open = false;
	export let title: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'md';
	export let yesText = 'Yes';
	export let noText = 'No';
	export let showCloseButton = true;

	const dispatch = createEventDispatcher<{ yes: void; no: void }>();

	const no = () => {
		dispatch('no');
		open = false;
	};

	const yes = () => {
		dispatch('yes');
		open = false;
	};
</script>

{#if open}
	<Overlay on:click={no}>
		<Dialog {size}>
			{#if title}
				<DialogHeader>
					{title}
				</DialogHeader>
				<Divider />
			{/if}
			<DialogCloseButton show={showCloseButton} on:click={no} />
			<DialogBody>
				<slot />
			</DialogBody>
			<Divider />
			<DialogFooter>
				<Button on:click={no} style="secondary" size="full">
					{noText}
				</Button>
				<Button on:click={yes} style="primary" size="full">
					{yesText}
				</Button>
			</DialogFooter>
		</Dialog>
	</Overlay>
{/if}
