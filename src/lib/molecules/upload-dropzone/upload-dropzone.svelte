<script lang="ts">
	import UploadIcon from '$src/lib/icons/upload-icon.svelte';
	import { createEventDispatcher } from 'svelte';

	let disabled = false;
	let isDragging = false;

	type SelectFilesTarget = null | { files: FileList | null | undefined };
	type DroppedFiles = FileList | File[];

	const dispatch = createEventDispatcher<{ filesSelected: FileList | File[] }>();

	const selectFiles = async (e: Event) => {
		const target = e.target as unknown as SelectFilesTarget;
		if (!target?.files || !target.files.length) return;
		const files = [...target.files].filter((file) => file.type.startsWith('image/'));
		if (!files.length) return;
		dispatch('filesSelected', files);
	};

	const dropFiles = async (e: DragEvent) => {
		dragStop(e);
		if (!e.dataTransfer) return;
		// Get image files from drag and drop
		const files = e.dataTransfer.items
			? ([...e.dataTransfer.items]
					.filter((item) => item.kind === 'file')
					.map((item) => item.getAsFile())
					.filter((item) => !!item) as DroppedFiles)
			: e.dataTransfer.files;
		if (!files.length) return;
		dispatch('filesSelected', files);
	};

	const dragStart = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		isDragging = true;
	};

	const dragStop = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		isDragging = false;
	};
</script>

<div class="dropzone" class:disabled class:isDragging>
	<label
		on:drop={dropFiles}
		on:dragenter={dragStart}
		on:dragstart={dragStart}
		on:dragover={dragStart}
		on:dragend={dragStop}
		on:dragleave={dragStop}
		on:dragexit={dragStop}
	>
		<input type="file" id="upload-button" accept="image/*" on:change={selectFiles} {disabled} />
		<div class="icon"><UploadIcon /></div>
		<div class="text">
			{#if $$slots.default}
				<slot />
			{:else}
				<span>Drop file or click to select</span>
			{/if}
		</div>
	</label>
</div>

<style lang="scss">
	input[type='file'] {
		display: none;
	}

	.dropzone {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		border: 2px dashed #ccc;
		border-radius: 0.25rem;
		color: #ccc;
		font-size: 1.5rem;
		font-weight: bold;
		cursor: pointer;

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&.isDragging {
			background-color: #bbf;
			color: #333;
		}
	}
</style>
