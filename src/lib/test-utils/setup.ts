/**
 * Vitest setup file
 * Runs before all test files
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	takeRecords() {
		return [];
	}
	unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	unobserve() {}
} as any;

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
	return setTimeout(cb, 0) as unknown as number;
};

global.cancelAnimationFrame = (id: number) => {
	clearTimeout(id);
};

// Mock scrollTo
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

// Mock Web Animations API
Element.prototype.animate = vi.fn(() => ({
	cancel: vi.fn(),
	finish: vi.fn(),
	pause: vi.fn(),
	play: vi.fn(),
	reverse: vi.fn(),
	updatePlaybackRate: vi.fn(),
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	dispatchEvent: vi.fn(),
	commitStyles: vi.fn(),
	persist: vi.fn(),
	effect: null,
	finished: Promise.resolve(),
	id: '',
	oncancel: null,
	onfinish: null,
	onremove: null,
	pending: false,
	playState: 'finished',
	playbackRate: 1,
	ready: Promise.resolve(),
	replaceState: 'active',
	startTime: null,
	timeline: null,
	currentTime: 0
})) as unknown as typeof Element.prototype.animate;

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value.toString();
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		}
	};
})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});

// Mock sessionStorage
const sessionStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value.toString();
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		}
	};
})();

Object.defineProperty(window, 'sessionStorage', {
	value: sessionStorageMock
});

// Reset mocks after each test
import { afterEach } from 'vitest';
afterEach(() => {
	vi.clearAllMocks();
	localStorageMock.clear();
	sessionStorageMock.clear();
});
