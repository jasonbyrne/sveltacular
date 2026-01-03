import { describe, it, expect } from 'vitest';
import { fuzzyMatch, fuzzySearch, highlightMatches } from './fuzzy-search.js';

describe('fuzzy-search', () => {
	describe('fuzzyMatch', () => {
		it('should return perfect score for empty query', () => {
			const result = fuzzyMatch('', 'hello');
			expect(result).toEqual({ score: 1, matches: [] });
		});

		it('should return null for empty string', () => {
			const result = fuzzyMatch('test', '');
			expect(result).toBeNull();
		});

		it('should match exact string', () => {
			const result = fuzzyMatch('hello', 'hello');
			expect(result).not.toBeNull();
			expect(result?.score).toBeGreaterThan(0);
			expect(result?.matches).toEqual([0, 1, 2, 3, 4]);
		});

		it('should match fuzzy characters', () => {
			const result = fuzzyMatch('gtp', 'Go to Profile');
			expect(result).not.toBeNull();
			expect(result?.matches.length).toBe(3);
		});

		it('should return null when not all characters match', () => {
			const result = fuzzyMatch('xyz', 'hello world');
			expect(result).toBeNull();
		});

		it('should be case insensitive by default', () => {
			const result1 = fuzzyMatch('hello', 'HELLO');
			const result2 = fuzzyMatch('HELLO', 'hello');
			expect(result1).not.toBeNull();
			expect(result2).not.toBeNull();
		});

		it('should support case sensitive matching', () => {
			const result1 = fuzzyMatch('Hello', 'hello', true);
			expect(result1).toBeNull();

			const result2 = fuzzyMatch('Hello', 'Hello', true);
			expect(result2).not.toBeNull();
		});

		it('should give bonus for consecutive matches', () => {
			const consecutive = fuzzyMatch('hel', 'hello');
			const nonConsecutive = fuzzyMatch('hlo', 'hello');
			expect(consecutive!.score).toBeGreaterThan(nonConsecutive!.score);
		});

		it('should give bonus for word boundary matches', () => {
			const wordBoundary = fuzzyMatch('gtp', 'Go to Profile');
			const nonBoundary = fuzzyMatch('otr', 'Go to Profile');
			expect(wordBoundary!.score).toBeGreaterThan(nonBoundary!.score);
		});

		it('should give bonus for camelCase matches', () => {
			const result = fuzzyMatch('gth', 'goToHome');
			expect(result).not.toBeNull();
			expect(result?.score).toBeGreaterThan(0.5);
		});
	});

	describe('fuzzySearch', () => {
		it('should search array of strings', () => {
			const items = ['hello', 'world', 'help', 'welcome'];
			const results = fuzzySearch('hel', items);

			expect(results.length).toBe(2);
			expect(results[0].item).toBe('hello');
			expect(results[1].item).toBe('help');
		});

		it('should search object properties', () => {
			const items = [
				{ id: 1, name: 'hello', desc: 'world' },
				{ id: 2, name: 'help', desc: 'me' },
				{ id: 3, name: 'welcome', desc: 'home' }
			];
			const results = fuzzySearch('hel', items, { keys: ['name', 'desc'] });

			expect(results.length).toBe(2);
			expect(results[0].item.name).toBe('hello');
			expect(results[1].item.name).toBe('help');
		});

		it('should respect threshold', () => {
			const items = ['hello', 'world', 'help'];
			const results = fuzzySearch('hel', items, { threshold: 0.5 });

			// Only items with score >= 0.5 should be included
			expect(results.every((r) => r.score >= 0.5)).toBe(true);
		});

		it('should respect limit', () => {
			const items = ['hello', 'help', 'helicopter', 'helmet'];
			const results = fuzzySearch('hel', items, { limit: 2 });

			expect(results.length).toBe(2);
		});

		it('should sort by score descending', () => {
			const items = ['help', 'hello', 'helicopter'];
			const results = fuzzySearch('hel', items);

			// Scores should be in descending order
			for (let i = 1; i < results.length; i++) {
				expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
			}
		});

		it('should handle empty query', () => {
			const items = ['hello', 'world'];
			const results = fuzzySearch('', items);

			expect(results.length).toBe(2);
			expect(results[0].score).toBe(1);
		});

		it('should return empty array for no matches', () => {
			const items = ['hello', 'world'];
			const results = fuzzySearch('xyz', items);

			expect(results.length).toBe(0);
		});

		it('should track matchedKey for objects', () => {
			const items = [
				{ name: 'hello', description: 'world' },
				{ name: 'world', description: 'hello there' }
			];
			const results = fuzzySearch('hello', items, { keys: ['name', 'description'] });

			expect(results[0].matchedKey).toBeDefined();
			expect(['name', 'description'].includes(results[0].matchedKey!)).toBe(true);
		});

		it('should prioritize better matches in objects', () => {
			const items = [
				{ name: 'hello world', description: 'test' },
				{ name: 'test', description: 'he... lo' }
			];
			const results = fuzzySearch('helo', items, { keys: ['name', 'description'] });

			// Consecutive match should score higher
			expect(results[0].item.name).toBe('hello world');
		});
	});

	describe('highlightMatches', () => {
		it('should return original string for empty matches', () => {
			const result = highlightMatches('hello', []);
			expect(result).toBe('hello');
		});

		it('should wrap matched characters in mark tags', () => {
			const result = highlightMatches('hello', [0, 1, 2]);
			expect(result).toBe('<mark>h</mark><mark>e</mark><mark>l</mark>lo');
		});

		it('should handle non-consecutive matches', () => {
			const result = highlightMatches('hello', [0, 2, 4]);
			expect(result).toBe('<mark>h</mark>e<mark>l</mark>l<mark>o</mark>');
		});

		it('should handle matches at end', () => {
			const result = highlightMatches('hello', [3, 4]);
			expect(result).toBe('hel<mark>l</mark><mark>o</mark>');
		});

		it('should handle single match', () => {
			const result = highlightMatches('hello', [0]);
			expect(result).toBe('<mark>h</mark>ello');
		});

		it('should handle all characters matched', () => {
			const result = highlightMatches('hello', [0, 1, 2, 3, 4]);
			expect(result).toBe(
				'<mark>h</mark><mark>e</mark><mark>l</mark><mark>l</mark><mark>o</mark>'
			);
		});
	});
});

