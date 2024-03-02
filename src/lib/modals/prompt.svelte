<script lang="ts">
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import DialogFooter from '$src/lib/modals/dialog-footer.svelte';
	import DialogHeader from '$src/lib/modals/dialog-header.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { AllowedTextInputTypes, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import { createEventDispatcher } from 'svelte';
	import Button from '../forms/button/button.svelte';
	import Divider from '$src/lib/generic/divider/divider.svelte';
	import TextBox from '../forms/text-box/text-box.svelte';
	import DialogCloseButton from './dialog-close-button.svelte';

	export let open = false;
	export let title: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'md';
	export let okText = 'Yes';
	export let cancelText = 'No';
	export let okStyle: 'primary' | 'secondary' | 'danger' = 'primary';
	export let cancelStyle: 'primary' | 'secondary' | 'danger' = 'secondary';
	export let showCloseButton = true;
	export let placeholder = '';
	export let type: AllowedTextInputTypes = 'text';
	export let required = false;

	let value = '';

	const dispatch = createEventDispatcher<{ ok: string; cancel: void }>();

	const no = () => {
		open = false;
		dispatch('cancel');
	};

	const yes = () => {
		if (required && !value) return;
		open = false;
		dispatch('ok', value);
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
				<TextBox bind:value {placeholder} {type} {required} size="full">
					<slot />
				</TextBox>
			</DialogBody>
			<Divider />
			<DialogFooter>
				<Button on:click={no} style={cancelStyle} size="full">
					{cancelText}
				</Button>
				<Button on:click={yes} style={okStyle} size="full">
					{okText}
				</Button>
			</DialogFooter>
		</Dialog>
	</Overlay>
{/if}
