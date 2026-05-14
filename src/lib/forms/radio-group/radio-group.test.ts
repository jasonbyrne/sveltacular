import { fireEvent, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import RadioGroup from './radio-group.svelte';
import { render } from '$lib/test-utils';

describe('RadioGroup', () => {
	it('renders choices and selects the current group value', () => {
		render(RadioGroup, {
			label: 'Plan',
			group: 'pro',
			items: [
				{ label: 'Free', value: 'free' },
				{ label: 'Pro', value: 'pro' }
			]
		});

		expect(screen.getByLabelText('Free')).not.toBeChecked();
		expect(screen.getByLabelText('Pro')).toBeChecked();
	});

	it('emits numeric values using the original value type when possible', async () => {
		const onChange = vi.fn();

		render(RadioGroup, {
			label: 'Rating',
			group: 1,
			items: [
				{ label: 'One', value: 1 },
				{ label: 'Two', value: 2 }
			],
			onChange
		});

		await fireEvent.click(screen.getByLabelText('Two'));

		expect(onChange).toHaveBeenCalledWith(2);
		expect(screen.getByLabelText('Two')).toBeChecked();
	});

	it('maps custom field names into radio labels and values', async () => {
		const onChange = vi.fn();

		render(RadioGroup, {
			label: 'Department',
			group: 10,
			fieldNames: { label: 'name', value: 'id' },
			items: [
				{ id: 10, name: 'Engineering' },
				{ id: 20, name: 'Design' }
			],
			onChange
		});

		await fireEvent.click(screen.getByLabelText('Design'));

		expect(screen.getByLabelText('Engineering')).not.toBeChecked();
		expect(screen.getByLabelText('Design')).toBeChecked();
		expect(onChange).toHaveBeenCalledWith(20);
	});

	it('disables every radio option when disabled', () => {
		render(RadioGroup, {
			label: 'Status',
			disabled: true,
			items: [
				{ label: 'Draft', value: 'draft' },
				{ label: 'Published', value: 'published' }
			]
		});

		expect(screen.getByLabelText('Draft')).toBeDisabled();
		expect(screen.getByLabelText('Published')).toBeDisabled();
	});
});
