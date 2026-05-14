import { fireEvent, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import { tick } from 'svelte';
import NumberBox from './number-box.svelte';
import { render } from '$lib/test-utils';

describe('NumberBox', () => {
	it('renders labeled number inputs with min, max, and step constraints', () => {
		render(NumberBox, {
			label: 'Quantity',
			value: 2,
			min: 1,
			max: 10,
			step: 0.5,
			required: true
		});

		const input = screen.getByLabelText('Quantity');

		expect(input).toHaveValue(2);
		expect(input).toHaveAttribute('type', 'number');
		expect(input).toHaveAttribute('min', '1');
		expect(input).toHaveAttribute('max', '10');
		expect(input).toHaveAttribute('step', '0.5');
		expect(input).toBeRequired();
	});

	it('emits parsed numbers as users type', async () => {
		const onInput = vi.fn();
		const onChange = vi.fn();

		render(NumberBox, {
			label: 'Price',
			value: 1,
			decimals: 2,
			onInput,
			onChange
		});

		await fireEvent.input(screen.getByLabelText('Price'), { target: { value: '12.34' } });
		await tick();

		expect(onInput).toHaveBeenLastCalledWith(12.34);
		expect(onChange).toHaveBeenLastCalledWith(12.34);
	});

	it('clamps and rounds values on change', async () => {
		const onChange = vi.fn();

		render(NumberBox, {
			label: 'Score',
			value: 1,
			min: 0,
			max: 10,
			decimals: 1,
			onChange
		});

		const input = screen.getByLabelText('Score');
		await fireEvent.input(input, { target: { value: '12.49' } });
		await fireEvent.change(input);
		await tick();

		expect(input).toHaveValue(10);
		expect(onChange).toHaveBeenLastCalledWith(10);
	});

	it('prevents decimal input when decimals are disabled', async () => {
		render(NumberBox, {
			label: 'Whole number',
			value: 1,
			decimals: 0
		});

		const event = new KeyboardEvent('keypress', {
			key: '.',
			bubbles: true,
			cancelable: true
		});

		screen.getByLabelText('Whole number').dispatchEvent(event);

		expect(event.defaultPrevented).toBe(true);
	});

	it('can toggle nullable values to null', async () => {
		const onCheckChanged = vi.fn();
		const onInput = vi.fn();

		render(NumberBox, {
			label: 'Optional amount',
			value: 8,
			nullable: true,
			nullText: 'No amount',
			onCheckChanged,
			onInput
		});

		await fireEvent.click(screen.getByRole('checkbox'));
		await tick();

		expect(screen.getByText('No amount')).toBeInTheDocument();
		expect(onCheckChanged).toHaveBeenLastCalledWith(false);
		expect(onInput).toHaveBeenLastCalledWith(null);
	});
});
