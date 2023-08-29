<script lang="ts">
	import UploadIcon from '$src/lib/icons/upload-icon.svelte';
	import { createEventDispatcher } from 'svelte';

	type SelectFilesTarget = null | { files: FileList | null | undefined };
	type DroppedFiles = FileList | File[];

	export let selectedFiles: DroppedFiles = [];
	export let disabled = false;
	export let fileLimit: number = 1;
	export let fileMimePattern: string | RegExp | undefined = undefined;

	let isDragging = false;

	const dispatch = createEventDispatcher<{ filesSelected: FileList | File[] }>();

	const filterFiles = (files: DroppedFiles) => {
		if (!fileMimePattern) return files;
		return [...files].filter((file) => {
			if (!file.type) return false;
			if (!fileMimePattern) return true;
			if (typeof fileMimePattern === 'string') return file.type.startsWith(fileMimePattern);
			return file.type.match(fileMimePattern);
		});
	};

	const addFiles = async (files: DroppedFiles) => {
		if (!files.length) return;
		selectedFiles = [...files, selectedFiles].flat().slice(0, fileLimit) as DroppedFiles;
		dispatch('filesSelected', selectedFiles);
	};

	const selectFiles = async (e: Event) => {
		const target = e.target as unknown as SelectFilesTarget;
		if (!target?.files || !target.files.length) return;
		addFiles(filterFiles([...target.files]));
	};

	const dropFiles = async (e: DragEvent) => {
		dragStop(e);
		if (!e.dataTransfer) return;
		// Get image files from drag and drop
		const files = e.dataTransfer.items
			? ([...e.dataTransfer.items]
					.filter((item) => item.kind === 'file')
					.map((item) => item.getAsFile()) as DroppedFiles)
			: e.dataTransfer.files;
		addFiles(filterFiles(files));
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

	$: filesClass = selectedFiles.length ? 'has-files' : 'no-files';
	$: enabledClass = disabled ? 'disabled' : '';
	$: draggingClass = isDragging ? 'isDragging' : '';
	$: filesSelectedText = selectedFiles.length
		? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
		: '';
</script>

<div
	class="dropzone {filesClass} {enabledClass} {draggingClass}"
	data-file-count={selectedFiles.length}
>
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
			{#if filesSelectedText}
				<span class="file-count">{filesSelectedText}</span>
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
		border: 2px dashed var(--form-input-border, black);
		background-color: var(--form-input-bg, white);
		color: var(--form-input-fg, black);
		border-radius: 0.25rem;
		cursor: pointer;

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&.isDragging {
			background-color: var(--form-input-selected-bg, #3182ce);
			color: var(--form-input-selected-fg, white);
		}

		label {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			padding: 1rem;
			cursor: pointer;

			.icon {
				width: 50%;
				opacity: 0.5;
			}

			.text {
				font-size: 1rem;
				letter-spacing: 0.075rem;
				margin-top: 1rem;
				opacity: 0.5;
				text-align: center;
			}

			.file-count {
				display: block;
				font-size: 0.75rem;
				margin-top: 0.5rem;
			}
		}
	}
</style>
