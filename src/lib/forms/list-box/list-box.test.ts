import { fireEvent, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import { tick } from 'svelte';
import ListBox from './list-box.svelte';
import { render } from '$lib/test-utils';

const items = [
	{ label: 'Alpha', value: 'alpha' },
	{ label: 'Beta', value: 'beta' },
	{ label: 'Gamma', value: 3 }
];

describe('ListBox', () => {
	it('renders the selected item and accessible combobox state', () => {
		render(ListBox, {
			label: 'Choice',
			value: 'beta',
			items,
			required: true
		});

		const input = screen.getByLabelText('Choice');

		expect(input).toHaveValue('Beta');
		expect(input).toHaveAttribute('role', 'combobox');
		expect(input).toHaveAttribute('aria-expanded', 'false');
		expect(input).toBeRequired();
	});

	it('opens options and selects by click', async () => {
		const onChange = vi.fn();

		render(ListBox, {
			label: 'Choice',
			value: null,
			items,
			onChange
		});

		await fireEvent.click(screen.getByLabelText('Choice'));
		await tick();

		expect(screen.getByLabelText('Choice')).toHaveAttribute('aria-expanded', 'true');

		await fireEvent.click(screen.getByRole('option', { name: 'Alpha' }));
		await tick();

		expect(onChange).toHaveBeenCalledWith('alpha');
		expect(screen.getByLabelText('Choice')).toHaveValue('Alpha');
		expect(screen.getByLabelText('Choice')).toHaveAttribute('aria-expanded', 'false');
	});

	it('maps custom field names and preserves numeric values', async () => {
		const onChange = vi.fn();

		render(ListBox, {
			label: 'Department',
			value: 20,
			fieldNames: { label: 'name', value: 'id' },
			items: [
				{ id: 10, name: 'Engineering' },
				{ id: 20, name: 'Design' }
			],
			onChange
		});

		expect(screen.getByLabelText('Department')).toHaveValue('Design');

		await fireEvent.click(screen.getByLabelText('Department'));
		await fireEvent.click(screen.getByRole('option', { name: 'Engineering' }));
		await tick();

		expect(onChange).toHaveBeenCalledWith(10);
		expect(screen.getByLabelText('Department')).toHaveValue('Engineering');
	});

	it('filters searchable options and selects with Enter', async () => {
		const onChange = vi.fn();

		render(ListBox, {
			label: 'Choice',
			value: null,
			items,
			searchable: true,
			onChange
		});

		const input = screen.getByLabelText('Choice');
		await fireEvent.keyDown(input, { key: 'g' });
		await fireEvent.input(input, { target: { value: 'ga' } });
		await tick();

		expect(screen.queryByRole('option', { name: 'Alpha' })).not.toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'Gamma' })).toBeInTheDocument();

		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		await fireEvent.keyDown(input, { key: 'Enter' });
		await tick();

		expect(onChange).toHaveBeenCalledWith(3);
		expect(input).toHaveValue('Gamma');
	});

	it('clears searchable selections', async () => {
		const onChange = vi.fn();

		render(ListBox, {
			label: 'Choice',
			value: 'alpha',
			items,
			searchable: true,
			onChange
		});

		await fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
		await tick();

		expect(onChange).toHaveBeenCalledWith(null);
		expect(screen.getByLabelText('Choice')).toHaveValue('');
	});

	it('does not open when disabled or readonly', async () => {
		const { unmount } = render(ListBox, {
			label: 'Disabled choice',
			value: 'alpha',
			items,
			disabled: true
		});

		await fireEvent.click(screen.getByLabelText('Disabled choice'));
		expect(screen.getByLabelText('Disabled choice')).toHaveAttribute('aria-expanded', 'false');

		unmount();

		render(ListBox, {
			label: 'Readonly choice',
			value: 'alpha',
			items,
			readonly: true
		});

		await fireEvent.click(screen.getByLabelText('Readonly choice'));
		expect(screen.getByLabelText('Readonly choice')).toHaveAttribute('aria-expanded', 'false');
	});

	it('runs async search and announces no results', async () => {
		vi.useFakeTimers();
		const search = vi.fn(async (text: string) =>
			text === 'match' ? [{ label: 'Matched', value: 'matched' }] : []
		);

		render(ListBox, {
			label: 'Remote choice',
			value: null,
			search
		});

		const input = screen.getByLabelText('Remote choice');
		await fireEvent.keyDown(input, { key: 'm' });
		await fireEvent.input(input, { target: { value: 'match' } });
		await vi.advanceTimersByTimeAsync(300);
		await tick();

		expect(search).toHaveBeenCalledWith('match');
		expect(screen.getByRole('option', { name: 'Matched' })).toBeInTheDocument();

		await fireEvent.keyDown(input, { key: 'n' });
		await fireEvent.input(input, { target: { value: 'none' } });
		await vi.advanceTimersByTimeAsync(300);
		await tick();

		expect(search).toHaveBeenCalledWith('none');
		expect(screen.getByText('No results found')).toBeInTheDocument();
		vi.useRealTimers();
	});
});
