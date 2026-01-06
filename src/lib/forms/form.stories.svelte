<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Form from './form.svelte';
	import TextBox from './text-box/text-box.svelte';
	import Button from './button/button.svelte';
	import FormRow from './form-row/form-row.svelte';
	import FormHeader from './form-header.svelte';
	import FormSection from './form-section/form-section.svelte';
	import FormFooter from './form-footer.svelte';
	import FileBox from './file-box/file-box.svelte';
	import MoneyBox from './money-box/money-box.svelte';
	import TimeBox from './time-box/time-box.svelte';
	import BoolBox from './bool-box/bool-box.svelte';

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
	<FormHeader>Basic form</FormHeader>
	<FormSection title="Section">
		<FormRow>
			<TextBox type="text" placeholder="Enter your name" label="Name" />
			<TextBox type="email" placeholder="Enter your email" label="Email" />
		</FormRow>
		<FormRow>
			<MoneyBox label="Money" />
			<FileBox label="File" />
		</FormRow>
	</FormSection>
	<FormSection title="Section 2">
		<FormRow>
			<TimeBox label="Time" />
			<BoolBox label="Bool" />
		</FormRow>
	</FormSection>
	<FormFooter>
		<Button variant="primary" label="Submit" />
	</FormFooter>
</Story>
