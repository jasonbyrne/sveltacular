<script lang="ts">
	import type { Snippet } from 'svelte';
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import DialogFooter from '$src/lib/modals/dialog-footer.svelte';
	import DialogHeader from '$src/lib/modals/dialog-header.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { AllowedTextInputTypes, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import Button from '../forms/button/button.svelte';
	import Divider from '$src/lib/generic/divider/divider.svelte';
	import TextBox from '../forms/text-box/text-box.svelte';
	import DialogCloseButton from './dialog-close-button.svelte';

	let {
		open = $bindable(false),
		title = undefined,
		size = 'md' as FormFieldSizeOptions,
		okText = 'Yes',
		cancelText = 'No',
		okVariant = 'primary' as 'primary' | 'secondary' | 'danger',
		cancelVariant = 'secondary' as 'primary' | 'secondary' | 'danger',
		showCloseButton = true,
		placeholder = '',
		type = 'text' as AllowedTextInputTypes,
		required = false,
		onOk = undefined,
		onCancel = undefined,
		children
	}: {
		open?: boolean;
		title?: string | undefined;
		size?: FormFieldSizeOptions;
		okText?: string;
		cancelText?: string;
		okVariant?: 'primary' | 'secondary' | 'danger';
		cancelVariant?: 'primary' | 'secondary' | 'danger';
		showCloseButton?: boolean;
		placeholder?: string;
		type?: AllowedTextInputTypes;
		required?: boolean;
		onOk?: ((value: string) => void) | undefined;
		onCancel?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	let value = $state('');

	const no = () => {
		open = false;
		onCancel?.();
	};

	const yes = () => {
		if (required && !value) return;
		open = false;
		onOk?.(value);
	};
</script>

{#if open}
	<Overlay onclick={no}>
		<Dialog {size}>
			{#if title}
				<DialogHeader>
					{title}
				</DialogHeader>
				<Divider />
			{/if}
			<DialogCloseButton show={showCloseButton} onClick={no} />
			<DialogBody>
				<TextBox bind:value {placeholder} {type} {required} size="full">
					{@render children?.()}
				</TextBox>
			</DialogBody>
			<Divider />
			<DialogFooter>
				<Button onclick={no} variant={cancelVariant} size="full" label={cancelText} />
				<Button onclick={yes} variant={okVariant} size="full" label={okText} />
			</DialogFooter>
		</Dialog>
	</Overlay>
{/if}
