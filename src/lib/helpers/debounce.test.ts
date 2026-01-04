import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import debounce from './debounce.js';

describe('debounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should delay function execution', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced();
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should cancel previous calls', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced();
		debounced();
		debounced();

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should use default delay of 300ms', () => {
		const fn = vi.fn();
		const debounced = debounce(fn);

		debounced();
		vi.advanceTimersByTime(299);
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(fn).toHaveBeenCalledTimes(1);
	});
});




