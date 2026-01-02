<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Form from './form.svelte';
	import TextBox from './text-box/text-box.svelte';
	import Button from './button/button.svelte';

	/**
	 * Form component for wrapping form fields and handling submission.
	 *
	 * **Accessibility**: Form includes proper semantic HTML and supports keyboard navigation.
	 * All form fields should have associated labels for screen readers.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Form action="/submit" method="post" onSubmit={handleSubmit}>
	 *   <TextBox label="Name" bind:value={name} />
	 *   <Button type="submit" variant="primary" label="Submit" />
	 * </Form>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Form,
		title: 'Forms/Form',
		tags: ['autodocs'],
		argTypes: {
			action: {
				control: 'text',
				description: 'Form action URL',
				table: {
					type: { summary: 'string' }
				}
			},
			method: {
				control: 'select',
				options: ['get', 'post', 'put', 'patch', 'delete'],
				description: 'HTTP method for form submission',
				table: {
					type: { summary: 'HttpMethod' },
					defaultValue: { summary: 'post' }
				}
			},
			onSubmit: {
				action: 'submitted',
				description: 'Called when form is submitted',
				table: {
					type: { summary: '(event: SubmitEvent) => void' }
				}
			}
		},
		args: {
			action: '/submit',
			method: 'post'
		}
	});
</script>

<Story name="Default" args={{ action: '/submit', method: 'post' }}>
	Basic form with text input and submit button.
	<TextBox type="text" placeholder="Enter your name" label="Name" />
	<Button variant="primary" label="Submit" />
</Story>

<Story name="GetMethod" args={{ action: '/search', method: 'get' }}>
	Form using GET method for search functionality.
	<TextBox type="search" placeholder="Search..." label="Search" />
	<Button variant="primary" label="Search" />
</Story>
