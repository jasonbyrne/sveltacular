/**
 * Fuzzy search utility for command palette and other search features
 * Zero dependencies, custom implementation
 */

export interface FuzzyMatch {
	/** The item that matched */
	item: any;
	/** The score of the match (higher is better) */
	score: number;
	/** The indices of matched characters in the string */
	matches: number[];
	/** The key that was matched (if searching object properties) */
	matchedKey?: string;
}

export interface FuzzySearchOptions {
	/** Keys to search in if items are objects */
	keys?: string[];
	/** Minimum score threshold (0-1) */
	threshold?: number;
	/** Maximum results to return */
	limit?: number;
	/** Case sensitive search */
	caseSensitive?: boolean;
}

/**
 * Calculate fuzzy match score for a query against a string
 * Returns { score, matches } where matches are character indices
 */
export function fuzzyMatch(
	query: string,
	str: string,
	caseSensitive = false
): { score: number; matches: number[] } | null {
	if (!query) return { score: 1, matches: [] };
	if (!str) return null;

	const queryStr = caseSensitive ? query : query.toLowerCase();
	const searchStr = caseSensitive ? str : str.toLowerCase();

	let score = 0;
	let queryIndex = 0;
	const matches: number[] = [];
	let previousMatchIndex = -1;
	let consecutiveMatchCount = 0;

	// Try to match each character in the query
	for (let i = 0; i < searchStr.length && queryIndex < queryStr.length; i++) {
		if (searchStr[i] === queryStr[queryIndex]) {
			matches.push(i);

			// Base score for match
			score += 1;

			// Bonus for consecutive matches
			if (previousMatchIndex === i - 1) {
				consecutiveMatchCount++;
				score += consecutiveMatchCount * 5; // Exponential bonus
			} else {
				consecutiveMatchCount = 0;
			}

			// Bonus for matching at word boundaries
			if (i === 0 || searchStr[i - 1] === ' ' || searchStr[i - 1] === '-') {
				score += 10;
			}

			// Bonus for matching uppercase in camelCase
			if (str[i] === str[i].toUpperCase() && str[i] !== str[i].toLowerCase()) {
				score += 5;
			}

			previousMatchIndex = i;
			queryIndex++;
		}
	}

	// Must match all characters in query
	if (queryIndex !== queryStr.length) {
		return null;
	}

	// Normalize score based on string length
	score = score / str.length;

	return { score, matches };
}

/**
 * Search an array of items with fuzzy matching
 */
export function fuzzySearch<T = any>(
	query: string,
	items: T[],
	options: FuzzySearchOptions = {}
): FuzzyMatch[] {
	const {
		keys = [],
		threshold = 0,
		limit = Infinity,
		caseSensitive = false
	} = options;

	const results: FuzzyMatch[] = [];

	for (const item of items) {
		let bestMatch: { score: number; matches: number[]; matchedKey?: string } | null = null;

		// If item is a string, search directly
		if (typeof item === 'string') {
			const match = fuzzyMatch(query, item, caseSensitive);
			if (match && match.score >= threshold) {
				bestMatch = match;
			}
		}
		// If item is an object, search specified keys
		else if (typeof item === 'object' && item !== null) {
			for (const key of keys) {
				const value = (item as any)[key];
				if (typeof value === 'string') {
					const match = fuzzyMatch(query, value, caseSensitive);
					if (match && match.score >= threshold) {
						if (!bestMatch || match.score > bestMatch.score) {
							bestMatch = { ...match, matchedKey: key };
						}
					}
				}
			}
		}

		if (bestMatch) {
			results.push({
				item,
				score: bestMatch.score,
				matches: bestMatch.matches,
				matchedKey: bestMatch.matchedKey
			});
		}
	}

	// Sort by score (descending)
	results.sort((a, b) => b.score - a.score);

	// Apply limit
	return results.slice(0, limit);
}

/**
 * Highlight matched characters in a string
 * Returns HTML string with <mark> tags around matches
 */
export function highlightMatches(str: string, matches: number[]): string {
	if (!matches.length) return str;

	let result = '';
	let lastIndex = 0;

	for (const index of matches) {
		result += str.slice(lastIndex, index);
		result += `<mark>${str[index]}</mark>`;
		lastIndex = index + 1;
	}

	result += str.slice(lastIndex);
	return result;
}

