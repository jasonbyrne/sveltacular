<script lang="ts">
	import DialogBody from '$src/lib/modals/dialog-body.svelte';
	import DialogFooter from '$src/lib/modals/dialog-footer.svelte';
	import DialogHeader from '$src/lib/modals/dialog-header.svelte';
	import Dialog from '$src/lib/modals/dialog-window.svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import type { FormFieldSizeOptions } from '$src/types/form.js';
	import { createEventDispatcher } from 'svelte';
	import Button from '../forms/button/button.svelte';
	import Divider from '$src/lib/generic/divider/divider.svelte';

	export let open = false;
	export let title: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'md';
	export let yesText = 'Yes';
	export let noText = 'No';
	export let showCloseButton = true;

	const dispatch = createEventDispatcher<{ yes: void; no: void }>();

	const no = () => {
		open = false;
		dispatch('no');
	};

	const yes = () => {
		open = false;
		dispatch('yes');
	};
</script>

{#if open}
	<Overlay>
		<Dialog {size}>
			<div class="body">
				{#if title}
					<DialogHeader on:close={no} {showCloseButton}>
						{title}
					</DialogHeader>
					<Divider />
				{/if}
				<DialogBody>
					<slot />
				</DialogBody>
				<Divider />
			</div>
			<DialogFooter>
				<div class="footer">
					<Button on:click={no} style="secondary">
						{noText}
					</Button>
					<Button on:click={yes} style="primary">
						{yesText}
					</Button>
				</div>
			</DialogFooter>
		</Dialog>
	</Overlay>
{/if}

<style>
	.body {
		padding-bottom: 3rem;
	}
	.footer {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
</style>
