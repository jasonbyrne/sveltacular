import { fireEvent, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import { tick } from 'svelte';
import TagBox from './tag-box.svelte';
import { render } from '$lib/test-utils';

describe('TagBox', () => {
	it('renders existing tags as removable chips', async () => {
		const onChange = vi.fn();

		render(TagBox, {
			label: 'Tags',
			value: ['svelte', 'typescript'],
			onChange
		});

		expect(screen.getByText('svelte')).toBeInTheDocument();
		expect(screen.getByText('typescript')).toBeInTheDocument();

		await fireEvent.click(screen.getByRole('button', { name: 'Remove svelte' }));
		await tick();

		expect(onChange).toHaveBeenCalledWith(['typescript']);
		expect(screen.queryByText('svelte')).not.toBeInTheDocument();
	});

	it('adds free-form tags with separators', async () => {
		const onChange = vi.fn();

		render(TagBox, {
			label: 'Tags',
			value: [],
			onChange
		});

		const input = screen.getByLabelText('Tags');
		await fireEvent.input(input, { target: { value: 'release,' } });
		await tick();

		expect(onChange).toHaveBeenCalledWith(['release']);
		expect(screen.getByText('release')).toBeInTheDocument();
		expect(input).toHaveValue('');
	});

	it('selects autocomplete suggestions with Enter', async () => {
		const onChange = vi.fn();

		render(TagBox, {
			label: 'Tags',
			value: [],
			autocomplete: ['Alpha', 'Beta'],
			onChange
		});

		const input = screen.getByLabelText('Tags');
		await fireEvent.input(input, { target: { value: 'be' } });
		await tick();

		expect(screen.getByRole('option', { name: 'Beta' })).toBeInTheDocument();

		await fireEvent.keyDown(input, { key: 'Enter' });
		await tick();

		expect(onChange).toHaveBeenCalledWith(['Beta']);
		expect(screen.getByText('Beta')).toBeInTheDocument();
	});

	it('rejects duplicate tags case-insensitively', async () => {
		vi.useFakeTimers();
		const onChange = vi.fn();

		render(TagBox, {
			label: 'Tags',
			value: ['Svelte'],
			caseInsensitive: true,
			onChange
		});

		await fireEvent.input(screen.getByLabelText('Tags'), { target: { value: 'svelte,' } });
		await tick();

		expect(onChange).not.toHaveBeenCalled();
		expect(screen.getByText('Tag already exists')).toBeInTheDocument();

		vi.useRealTimers();
	});

	it('enforces strict autocomplete values', async () => {
		const onChange = vi.fn();

		render(TagBox, {
			label: 'Tags',
			value: [],
			autocomplete: ['Allowed'],
			strict: true,
			onChange
		});

		await fireEvent.input(screen.getByLabelText('Tags'), { target: { value: 'Other,' } });
		await tick();

		expect(onChange).not.toHaveBeenCalled();
		expect(screen.getByText('Tag must be from the suggestions list')).toBeInTheDocument();
	});

	it('disables input and chip removal when disabled', () => {
		render(TagBox, {
			label: 'Tags',
			value: ['locked'],
			disabled: true
		});

		expect(screen.getByLabelText('Tags')).toBeDisabled();
		expect(screen.queryByRole('button', { name: 'Remove locked' })).not.toBeInTheDocument();
	});
});
