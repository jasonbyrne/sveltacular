import { fireEvent, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import { tick } from 'svelte';
import TextBox from './text-box.svelte';
import { render } from '$lib/test-utils';

describe('TextBox', () => {
	it('associates labels, helper text, and required state with the input', () => {
		render(TextBox, {
			label: 'Display name',
			value: 'Ada',
			required: true,
			helperText: 'Shown publicly'
		});

		const input = screen.getByLabelText('Display name');
		const helper = screen.getByText('Shown publicly');
		const helperContainer = helper.closest('[id]');

		expect(input).toHaveValue('Ada');
		expect(input).toHaveAttribute('aria-required', 'true');
		expect(helperContainer?.id).toBeTruthy();
		expect(input).toHaveAttribute('aria-describedby', helperContainer?.id);
	});

	it('prefers feedback messaging over helper text and marks errors as invalid', () => {
		render(TextBox, {
			label: 'Email',
			value: 'bad email',
			helperText: 'We will never share this',
			feedback: { text: 'Enter a valid email address', isError: true }
		});

		const input = screen.getByLabelText('Email');
		const error = screen.getByRole('alert');

		expect(screen.queryByText('We will never share this')).not.toBeInTheDocument();
		expect(error).toHaveTextContent('Enter a valid email address');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAttribute('aria-describedby', error.id);
	});

	it('normalizes text case and notifies change handlers', async () => {
		const onInput = vi.fn();
		const onChange = vi.fn();

		render(TextBox, {
			label: 'Code',
			value: '',
			textCase: 'upper',
			onInput,
			onChange
		});

		const input = screen.getByLabelText('Code');
		await fireEvent.input(input, { target: { value: 'ab12' } });
		await tick();

		expect(input).toHaveValue('AB12');
		expect(onInput).toHaveBeenLastCalledWith('AB12');
		expect(onChange).toHaveBeenLastCalledWith('AB12');
	});

	it('strips whitespace for email inputs', async () => {
		const onInput = vi.fn();

		render(TextBox, {
			label: 'Email',
			type: 'email',
			value: '',
			onInput
		});

		const input = screen.getByLabelText('Email');
		await fireEvent.input(input, { target: { value: 'ada love@example.com' } });
		await tick();

		expect(input).toHaveValue('adalove@example.com');
		expect(onInput).toHaveBeenLastCalledWith('adalove@example.com');
	});

	it('submits the current value from the Enter key', async () => {
		const onSubmit = vi.fn();

		render(TextBox, {
			label: 'Search',
			value: 'storybook',
			onSubmit
		});

		await fireEvent.keyDown(screen.getByLabelText('Search'), { key: 'Enter' });

		expect(onSubmit).toHaveBeenCalledWith('storybook');
	});

	it('can toggle nullable values off and back on', async () => {
		const onCheckChanged = vi.fn();
		const onInput = vi.fn();

		render(TextBox, {
			label: 'Middle name',
			value: 'Byron',
			nullable: true,
			nullText: 'None',
			onCheckChanged,
			onInput
		});

		const input = screen.getByLabelText('Middle name');
		const toggle = screen.getByRole('checkbox');

		expect(input).toBeEnabled();
		await fireEvent.click(toggle);
		await tick();

		expect(screen.getByText('None')).toBeInTheDocument();
		expect(onCheckChanged).toHaveBeenLastCalledWith(false);
		expect(onInput).toHaveBeenLastCalledWith(null);

		await fireEvent.click(toggle);
		await tick();

		expect(screen.getByLabelText('Middle name')).toHaveValue('Byron');
		expect(onCheckChanged).toHaveBeenLastCalledWith(true);
	});
});
