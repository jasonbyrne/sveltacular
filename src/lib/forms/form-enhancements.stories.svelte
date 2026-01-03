<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';
	import FormEnhancementsDemo from './form-enhancements.stories.svelte';

	export const meta: Meta = {
		title: 'Forms/Enhancements',
		component: FormEnhancementsDemo,
		tags: ['autodocs']
	};
</script>

<script lang="ts">
	import TextBox from './text-box/text-box.svelte';
	import TextArea from './text-area/text-area.svelte';
	import Slider from './slider/slider.svelte';
	import FileArea from './file-area/file-area.svelte';
	import Button from './button/button.svelte';

	let textValue = $state('');
	let emailValue = $state('');
	let isValidating = $state(false);
	let emailError = $state('');
	let emailSuccess = $state('');
	let textareaValue = $state('');
	let sliderValue = $state(50);
	let selectedFiles = $state<FileList | File[]>([]);

	// Simulate async validation
	const validateEmail = async () => {
		if (!emailValue) {
			emailError = '';
			emailSuccess = '';
			return;
		}

		isValidating = true;
		emailError = '';
		emailSuccess = '';

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		isValidating = false;

		if (!emailValue.includes('@')) {
			emailError = 'Please enter a valid email address';
		} else if (emailValue === 'taken@example.com') {
			emailError = 'This email is already taken';
		} else {
			emailSuccess = 'Email is available!';
		}
	};

	const formatSliderValue = (value: number) => {
		if (value < 33) return `${value}% - Low`;
		if (value < 66) return `${value}% - Medium`;
		return `${value}% - High`;
	};
</script>

<div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
	<h1 style="margin-bottom: 2rem;">Form Enhancements Demo</h1>

	<!-- Success States & Loading States -->
	<section style="margin-bottom: 3rem;">
		<h2 style="margin-bottom: 1rem;">Success & Loading States</h2>
		<p style="margin-bottom: 1rem; color: var(--body-fg-muted);">
			Try typing an email and clicking outside the field to trigger validation. Use
			"taken@example.com" to see an error, or any other valid email to see success.
		</p>

		<TextBox
			bind:value={emailValue}
			label="Email Address"
			type="email"
			placeholder="Enter your email"
			helperText="We'll check if this email is available"
			errorText={emailError}
			successText={emailSuccess}
			isLoading={isValidating}
			size="full"
			onInput={() => {
				emailError = '';
				emailSuccess = '';
			}}
			onChange={validateEmail}
		/>
	</section>

	<!-- Character Counter -->
	<section style="margin-bottom: 3rem;">
		<h2 style="margin-bottom: 1rem;">Character Counter</h2>
		<p style="margin-bottom: 1rem; color: var(--body-fg-muted);">
			Character counter with visual indicators. Watch the color change as you approach the limit.
		</p>

		<TextBox
			bind:value={textValue}
			label="Bio"
			placeholder="Tell us about yourself"
			helperText="Keep it short and sweet"
			maxlength={100}
			showCharacterCount={true}
			size="full"
		/>
	</section>

	<!-- Auto-resize TextArea -->
	<section style="margin-bottom: 3rem;">
		<h2 style="margin-bottom: 1rem;">Auto-resize TextArea</h2>
		<p style="margin-bottom: 1rem; color: var(--body-fg-muted);">
			The textarea automatically grows as you type, with configurable min/max rows.
		</p>

		<TextArea
			bind:value={textareaValue}
			label="Comments"
			placeholder="Start typing to see the auto-resize in action..."
			autoResize={true}
			minRows={3}
			maxRows={10}
			size="full"
		/>

		<div style="margin-top: 1rem;">
			<Button
				variant="secondary"
				size="sm"
				onclick={() => {
					textareaValue =
						'This is a long text that will demonstrate the auto-resize feature.\n\nNotice how the textarea grows to fit the content.\n\nYou can keep typing and it will continue to expand up to the maximum number of rows.\n\nAfter that, it will show a scrollbar.';
				}}
			>
				Fill with Sample Text
			</Button>
			<Button
				variant="secondary"
				size="sm"
				onclick={() => {
					textareaValue = '';
				}}
			>
				Clear
			</Button>
		</div>
	</section>

	<!-- Enhanced Slider with Tooltip -->
	<section style="margin-bottom: 3rem;">
		<h2 style="margin-bottom: 1rem;">Slider with Tooltip</h2>
		<p style="margin-bottom: 1rem; color: var(--body-fg-muted);">
			Drag the slider or use keyboard arrows. The tooltip shows the current value while dragging or
			focused.
		</p>

		<Slider
			bind:value={sliderValue}
			label="Volume"
			min={0}
			max={100}
			step={1}
			showTooltip={true}
			showValue={true}
			size="full"
		/>

		<div style="margin-top: 1.5rem;">
			<Slider
				bind:value={sliderValue}
				label="Intensity Level"
				min={0}
				max={100}
				step={5}
				showTooltip={true}
				showValue={true}
				formatValue={formatSliderValue}
				size="full"
			/>
		</div>
	</section>

	<!-- Enhanced File Area with Drag States -->
	<section style="margin-bottom: 3rem;">
		<h2 style="margin-bottom: 1rem;">File Area with Drag States</h2>
		<p style="margin-bottom: 1rem; color: var(--body-fg-muted);">
			Drag a file over the area to see the enhanced visual feedback. Notice the smooth transitions
			and hover effects.
		</p>

		<div style="height: 200px;">
			<FileArea bind:selectedFiles fileLimit={5} />
		</div>

		{#if selectedFiles.length > 0}
			<div style="margin-top: 1rem;">
				<strong>Selected files:</strong>
				<ul style="margin-top: 0.5rem;">
					{#each selectedFiles as file}
						<li>{file.name} ({Math.round(file.size / 1024)} KB)</li>
					{/each}
				</ul>
			</div>
		{/if}
	</section>

	<!-- Combined Example -->
	<section style="margin-bottom: 3rem;">
		<h2 style="margin-bottom: 1rem;">All Enhancements Combined</h2>
		<p style="margin-bottom: 1rem; color: var(--body-fg-muted);">
			A form showcasing all the new enhancements working together.
		</p>

		<div style="display: flex; flex-direction: column; gap: 1.5rem;">
			<TextBox
				label="Username"
				placeholder="Choose a username"
				helperText="Must be 3-20 characters"
				maxlength={20}
				showCharacterCount={true}
				size="full"
			/>

			<TextArea
				label="Description"
				placeholder="Describe your project..."
				autoResize={true}
				minRows={2}
				maxRows={8}
				size="full"
			/>

			<Slider label="Priority" min={1} max={10} step={1} showTooltip={true} size="full" />

			<div style="height: 150px;">
				<FileArea fileLimit={3} />
			</div>

			<div style="display: flex; gap: 0.5rem;">
				<Button variant="primary">Submit</Button>
				<Button variant="secondary">Cancel</Button>
			</div>
		</div>
	</section>
</div>

<style>
	h1 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--body-fg);
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--body-fg);
	}

	section {
		padding: 1.5rem;
		background: var(--card-bg, #fff);
		border-radius: var(--radius-lg, 0.5rem);
		border: 1px solid var(--border-color, #e5e7eb);
	}
</style>

