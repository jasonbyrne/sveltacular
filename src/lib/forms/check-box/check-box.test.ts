import { fireEvent, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import CheckBox from './check-box.svelte';
import { render } from '$lib/test-utils';

describe('CheckBox', () => {
	it('renders an accessible checked checkbox', () => {
		render(CheckBox, {
			label: 'Accept terms',
			value: 'terms',
			isChecked: true,
			required: true
		});

		const checkbox = screen.getByLabelText('Accept terms');

		expect(checkbox).toBeChecked();
		expect(checkbox).toHaveAttribute('value', 'terms');
		expect(checkbox).toBeRequired();
	});

	it('reports checked state and value when toggled', async () => {
		const onChange = vi.fn();

		render(CheckBox, {
			label: 'Email updates',
			value: 'email',
			onChange
		});

		await fireEvent.click(screen.getByLabelText('Email updates'));

		expect(onChange).toHaveBeenCalledWith({ isChecked: true, value: 'email' });
	});

	it('does not render visible text when an aria label is supplied', () => {
		render(CheckBox, {
			label: 'Internal label',
			ariaLabel: 'Select row',
			isChecked: false,
			inline: true
		});

		expect(screen.getByLabelText('Select row')).toBeInTheDocument();
		expect(screen.queryByText('Internal label')).not.toBeInTheDocument();
	});

	it('renders disabled state without changing checked state', async () => {
		const onChange = vi.fn();

		render(CheckBox, {
			label: 'Disabled option',
			disabled: true,
			onChange
		});

		const checkbox = screen.getByLabelText('Disabled option');

		expect(checkbox).toBeDisabled();
		expect(checkbox).not.toBeChecked();
		expect(onChange).not.toHaveBeenCalled();
	});
});
