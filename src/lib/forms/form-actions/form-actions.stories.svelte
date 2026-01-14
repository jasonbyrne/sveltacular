<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FormActions from './form-actions.svelte';
	import type { AdditionalButton } from './form-actions.svelte';
	import type { ComponentProps } from 'svelte';

	type FormActionsProps = ComponentProps<typeof FormActions>;

	/**
	 * FormActions component provides a consistent layout for form action buttons.
	 *
	 * **Features:**
	 * - Submit button is always present (type="submit" by default)
	 * - Optional cancel button (just add onCancel handler)
	 * - Additional custom buttons can be placed between cancel and submit
	 * - Top-level disabled prop affects all buttons (useful during form submission)
	 * - Responsive: stacks vertically on mobile
	 *
	 * **Usage:**
	 * ```svelte
	 * <FormActions
	 *   onCancel={handleCancel}
	 *   submitText="Save Changes"
	 * />
	 * ```
	 */
	const { Story } = defineMeta({
		component: FormActions,
		title: 'Forms/FormActions',
		tags: ['autodocs'],
		argTypes: {
			disabled: {
				control: 'boolean',
				description: 'Disables all buttons (useful during form submission)',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			onCancel: {
				action: 'cancel',
				description: 'Cancel button handler. If provided, cancel button will be shown.',
				table: {
					type: { summary: '(() => void) | undefined' }
				}
			},
			onSubmit: {
				action: 'submit',
				description: 'Submit button handler (optional, form will submit naturally if not provided)',
				table: {
					type: { summary: '(() => void) | undefined' }
				}
			},
			cancelText: {
				control: 'text',
				description: 'Cancel button text',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'Cancel'" }
				}
			},
			cancelVariant: {
				control: 'select',
				options: ['primary', 'secondary', 'positive', 'danger', 'outline'],
				description: 'Cancel button variant',
				table: {
					type: { summary: 'ButtonVariant' },
					defaultValue: { summary: "'secondary'" }
				}
			},
			submitText: {
				control: 'text',
				description: 'Submit button text',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: "'Submit'" }
				}
			},
			submitVariant: {
				control: 'select',
				options: ['primary', 'secondary', 'positive', 'danger', 'outline'],
				description: 'Submit button variant',
				table: {
					type: { summary: 'ButtonVariant' },
					defaultValue: { summary: "'primary'" }
				}
			},
			additionalButtons: {
				control: 'object',
				description: 'Additional buttons to show between cancel and submit',
				table: {
					type: { summary: 'AdditionalButton[]' },
					defaultValue: { summary: '[]' }
				}
			}
		},
		args: {
			onCancel: fn(),
			onSubmit: fn()
		}
	});
</script>

<Story name="Default (Submit Only)">
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
			<FormActions {...args} onCancel={undefined} />
		</div>
	{/snippet}
</Story>

<Story name="With Cancel Button" args={{ onCancel: fn() }}>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
			<FormActions {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="Custom Text"
	args={{ onCancel: fn(), cancelText: 'Go Back', submitText: 'Save Changes' }}
>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
			<FormActions {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="Custom Variants"
	args={{
		onCancel: fn(),
		cancelVariant: 'outline',
		submitVariant: 'positive',
		submitText: 'Save'
	}}
>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
			<FormActions {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="Danger Action"
	args={{
		onCancel: fn(),
		cancelText: 'Keep',
		submitText: 'Delete',
		submitVariant: 'danger'
	}}
>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Are you sure you want to delete this item?</p>
			<FormActions {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="With Additional Buttons"
	args={{
		onCancel: fn(),
		submitText: 'Publish',
		additionalButtons: [
			{ text: 'Save Draft', variant: 'outline', onClick: fn() },
			{ text: 'Preview', variant: 'secondary', onClick: fn() }
		] as AdditionalButton[]
	}}
>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Article editor...</p>
			<FormActions {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="Disabled State"
	args={{
		onCancel: fn(),
		submitText: 'Saving...',
		disabled: true
	}}
>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Form is being saved...</p>
			<FormActions {...args} />
		</div>
	{/snippet}
</Story>

<Story name="With Custom Content" args={{ onCancel: fn() }}>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
			<FormActions {...args}>
				<span style="color: var(--gray-500); font-size: var(--font-sm);">
					Last saved: 2 minutes ago
				</span>
			</FormActions>
		</div>
	{/snippet}
</Story>

<Story
	name="Multiple Additional Buttons"
	args={{
		onCancel: fn(),
		submitText: 'Finish',
		additionalButtons: [
			{ text: 'Reset', variant: 'outline', onClick: fn() },
			{ text: 'Save Progress', variant: 'secondary', onClick: fn() },
			{ text: 'Validate', variant: 'outline', onClick: fn() }
		] as AdditionalButton[]
	}}
>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Complex form with multiple actions...</p>
			<FormActions {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="No Cancel, With Additional"
	args={{
		submitText: 'Next',
		additionalButtons: [
			{ text: 'Previous', variant: 'secondary', onClick: fn() }
		] as AdditionalButton[]
	}}
>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Wizard step 2 of 3...</p>
			<FormActions {...args} onCancel={undefined} />
		</div>
	{/snippet}
</Story>

<Story
	name="Responsive Demo"
	args={{
		onCancel: fn(),
		submitText: 'Save',
		additionalButtons: [{ text: 'Reset', variant: 'outline', onClick: fn() }] as AdditionalButton[]
	}}
>
	{#snippet children(args: Partial<FormActionsProps>)}
		<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
			<p style="margin: 0 0 1rem 0;">Resize window to see responsive behavior (stacks on mobile)</p>
			<FormActions {...args}>
				<span style="color: var(--gray-500); font-size: var(--font-sm);"> Draft saved </span>
			</FormActions>
		</div>
	{/snippet}
</Story>

<Story name="Real-World: Contact Form">
	{#snippet children(args: Partial<FormActionsProps>)}
		<div
			style="max-width: 600px; background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"
		>
			<h3 style="margin-top: 0;">Contact Us</h3>
			<form>
				<div style="margin-bottom: 1rem;">
					<label for="contact-name" style="display: block; margin-bottom: 0.5rem;">Name</label>
					<input
						id="contact-name"
						type="text"
						style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
					/>
				</div>
				<div style="margin-bottom: 1rem;">
					<label for="contact-email" style="display: block; margin-bottom: 0.5rem;">Email</label>
					<input
						id="contact-email"
						type="email"
						style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
					/>
				</div>
				<div style="margin-bottom: 1rem;">
					<label for="contact-message" style="display: block; margin-bottom: 0.5rem;">Message</label
					>
					<textarea
						id="contact-message"
						rows="4"
						style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
					></textarea>
				</div>
				<FormActions onCancel={fn()} submitText="Send Message" submitVariant="primary" />
			</form>
		</div>
	{/snippet}
</Story>

<Story name="Real-World: Article Editor">
	{#snippet children(args: Partial<FormActionsProps>)}
		<div
			style="max-width: 800px; background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"
		>
			<h3 style="margin-top: 0;">Edit Article</h3>
			<form>
				<div style="margin-bottom: 1rem;">
					<label for="article-title" style="display: block; margin-bottom: 0.5rem;">Title</label>
					<input
						id="article-title"
						type="text"
						value="My Article Title"
						style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
					/>
				</div>
				<div style="margin-bottom: 1rem;">
					<label for="article-content" style="display: block; margin-bottom: 0.5rem;">Content</label
					>
					<textarea
						id="article-content"
						rows="8"
						style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
						>Article content here...</textarea
					>
				</div>
				<FormActions
					onCancel={fn()}
					submitText="Publish"
					submitVariant="positive"
					additionalButtons={[
						{ text: 'Save Draft', variant: 'outline', onClick: fn() },
						{ text: 'Preview', variant: 'secondary', onClick: fn() }
					] as AdditionalButton[]}
				>
					<span style="color: var(--gray-500); font-size: var(--font-sm);">
						Auto-saved 30 seconds ago
					</span>
				</FormActions>
			</form>
		</div>
	{/snippet}
</Story>

<Story name="Real-World: Destructive Action">
	{#snippet children(args: Partial<FormActionsProps>)}
		<div
			style="max-width: 500px; background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"
		>
			<h3 style="margin-top: 0;">Delete Account</h3>
			<p style="color: var(--gray-600);">
				This action cannot be undone. This will permanently delete your account and all associated
				data.
			</p>
			<div style="margin: 1.5rem 0;">
				<label for="confirm-delete" style="display: flex; align-items: center; gap: 0.5rem;">
					<input id="confirm-delete" type="checkbox" />
					<span>I understand this action is permanent</span>
				</label>
			</div>
			<FormActions
				onCancel={fn()}
				cancelText="Keep Account"
				submitText="Delete My Account"
				submitVariant="danger"
			/>
		</div>
	{/snippet}
</Story>
