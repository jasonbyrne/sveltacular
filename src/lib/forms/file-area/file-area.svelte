<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '$src/lib/icons/icon.svelte';

	type SelectFilesTarget = null | { files: FileList | null | undefined };
	type DroppedFiles = FileList | File[];

	let {
		selectedFiles = $bindable([] as DroppedFiles),
		disabled = false,
		fileLimit = 1,
		fileMimePattern = undefined as string | RegExp | undefined,
		onFilesSelected = undefined,
		children = undefined
	}: {
		selectedFiles?: DroppedFiles;
		disabled?: boolean;
		fileLimit?: number;
		fileMimePattern?: string | RegExp | undefined;
		onFilesSelected?: ((files: FileList | File[]) => void) | undefined;
		children?: Snippet;
	} = $props();

	let isDragging = $state(false);

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
		onFilesSelected?.(selectedFiles);
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

	let filesClass = $derived(selectedFiles.length ? 'has-files' : 'no-files');
	let enabledClass = $derived(disabled ? 'disabled' : '');
	let draggingClass = $derived(isDragging ? 'isDragging' : '');
	let filesSelectedText = $derived(
		selectedFiles.length
			? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
			: ''
	);
</script>

<div
	class="dropzone {filesClass} {enabledClass} {draggingClass}"
	data-file-count={selectedFiles.length}
>
	<label
		ondrop={dropFiles}
		ondragenter={dragStart}
		ondragstart={dragStart}
		ondragover={dragStart}
		ondragend={dragStop}
		ondragleave={dragStop}
		ondragexit={dragStop}
	>
		<input type="file" id="upload-button" accept="image/*" onchange={selectFiles} {disabled} />
		<div class="icon"><Icon type="upload" size="lg" /></div>
		<div class="text">
			{#if children}
				{@render children?.()}
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
		transition: all 0.2s ease-in-out;

		&:hover:not(.disabled) {
			border-color: var(--primary-500, #3b82f6);
			background-color: var(--primary-50, rgba(59, 130, 246, 0.05));
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&.isDragging {
			background-color: var(--form-input-selected-bg, #3182ce);
			color: var(--form-input-selected-fg, white);
			border-color: var(--form-input-selected-bg, #3182ce);
			border-style: solid;
			transform: scale(1.02);
			box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
			transition: all 0.2s ease-in-out;

			.icon {
				opacity: 1;
				transform: scale(1.1);
				transition: all 0.2s ease-in-out;
			}

			.text {
				opacity: 1;
			}
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
				transition: all 0.2s ease-in-out;
			}

			.text {
				font-size: 1rem;
				letter-spacing: 0.075rem;
				margin-top: 1rem;
				opacity: 0.5;
				text-align: center;
				transition: all 0.2s ease-in-out;
			}

			.file-count {
				display: block;
				font-size: 0.75rem;
				margin-top: 0.5rem;
			}
		}
	}
</style>
