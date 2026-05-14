import { fireEvent, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { tick } from 'svelte';
import Button from './button.svelte';
import { render } from '$lib/test-utils';

describe('Button', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('calls onClick for enabled buttons', async () => {
		const onClick = vi.fn();

		render(Button, {
			ariaLabel: 'Save',
			onClick,
			repeatSubmitDelay: 0
		});

		await fireEvent.click(screen.getByRole('button', { name: 'Save' }));

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick while disabled', async () => {
		const onClick = vi.fn();

		render(Button, {
			ariaLabel: 'Delete',
			disabled: true,
			onClick
		});

		await fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

		expect(onClick).not.toHaveBeenCalled();
		expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute('aria-disabled', 'true');
	});

	it('uses loading state as disabled busy state', () => {
		render(Button, {
			ariaLabel: 'Sync',
			loading: true
		});

		const button = screen.getByRole('button', { name: 'Sync' });

		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-busy', 'true');
		expect(screen.getByLabelText('Loading')).toBeInTheDocument();
	});

	it('temporarily disables repeated submissions', async () => {
		vi.useFakeTimers();
		const onClick = vi.fn();

		render(Button, {
			ariaLabel: 'Submit',
			onClick,
			repeatSubmitDelay: 100
		});

		const button = screen.getByRole('button', { name: 'Submit' });
		await fireEvent.click(button);

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(button).toBeDisabled();

		await fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(100);
		await tick();
		expect(button).toBeEnabled();
	});
});
