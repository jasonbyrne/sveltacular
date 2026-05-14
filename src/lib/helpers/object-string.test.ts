import { describe, expect, it } from 'vitest';
import { nobr } from './nobr.js';
import { removeProperties } from './remove-properties.js';
import { splitNewLines } from './split-new-lines.js';

describe('object and string helpers', () => {
	it('removes named properties without mutating the original object', () => {
		const original = { id: 1, name: 'Ada', secret: 'hidden' };

		expect(removeProperties(original, ['secret'])).toEqual({ id: 1, name: 'Ada' });
		expect(original).toEqual({ id: 1, name: 'Ada', secret: 'hidden' });
	});

	it('returns an empty object for nullish input', () => {
		expect(removeProperties(null, ['anything'])).toEqual({});
		expect(removeProperties(undefined, ['anything'])).toEqual({});
	});

	it('splits and removes newlines', () => {
		expect(splitNewLines('one\ntwo\nthree')).toEqual(['one', 'two', 'three']);
		expect(nobr('one\ntwo\nthree')).toBe('one two three');
	});
});
