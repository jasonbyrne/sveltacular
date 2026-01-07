<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Alert from './alert.svelte';

	/**
	 * Alert modal component for displaying important messages.
	 *
	 * **Accessibility**:
	 * - Uses `role="alertdialog"` for screen readers
	 * - Focus is trapped within the modal
	 * - Supports keyboard navigation (ESC to close)
	 * - Properly labeled with aria-labelledby
	 *
	 * **Usage**:
	 * ```svelte
	 * <Alert
	 *   bind:open={showAlert}
	 *   title="Error"
	 *   buttonVariant="danger"
	 *   onClose={handleClose}
	 * >
	 *   Something went wrong.
	 * </Alert>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Alert,
		title: 'Modals/Alert',
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: 'boolean',
				description: 'Whether the alert is open',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' }
				}
			},
			title: {
				control: 'text',
				description: 'Alert title',
				table: {
					type: { summary: 'string | undefined' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the alert modal',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: 'md' }
				}
			},
			buttonText: {
				control: 'text',
				description: 'Text for the action button',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'OK' }
				}
			},
			buttonVariant: {
				control: 'select',
				options: ['primary', 'secondary', 'danger'],
				description: 'Variant of the action button',
				table: {
					type: { summary: 'ButtonVariant' },
					defaultValue: { summary: 'primary' }
				}
			},
			onClose: {
				action: 'closed',
				description: 'Called when alert is closed',
				table: {
					type: { summary: '() => void' }
				}
			}
		},
		args: {
			onClose: fn(),
			open: true
		}
	});
</script>

<Story name="Default" args={{ title: 'Error', open: true }}>
	Something went wrong and we need to make sure you see this.
</Story>

<Story name="AlertNoTitle" args={{ open: true }}>
	Something went wrong and we need to make sure you see this.
</Story>

<Story name="AlertXLarge" args={{ title: 'Extra Large', open: true, size: 'xl' }}>
	Something went wrong and we need to make sure you see this.
</Story>
