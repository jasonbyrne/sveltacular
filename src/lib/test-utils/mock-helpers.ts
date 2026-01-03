/**
 * Mock helpers for testing
 */

import { vi } from 'vitest';

/**
 * Mock a function with optional implementation
 */
export function mockFunction<T extends (...args: any[]) => any>(
	implementation?: T
): ReturnType<typeof vi.fn> {
	return implementation ? vi.fn(implementation) : vi.fn();
}

/**
 * Mock console methods to suppress output during tests
 */
export function mockConsole() {
	const originalConsole = { ...console };
	
	beforeEach(() => {
		console.log = vi.fn();
		console.warn = vi.fn();
		console.error = vi.fn();
		console.info = vi.fn();
	});
	
	afterEach(() => {
		Object.assign(console, originalConsole);
	});
}

/**
 * Mock fetch API
 */
export function mockFetch(response: any, options?: { ok?: boolean; status?: number }) {
	const mockResponse = {
		ok: options?.ok ?? true,
		status: options?.status ?? 200,
		json: async () => response,
		text: async () => JSON.stringify(response),
		blob: async () => new Blob([JSON.stringify(response)]),
		arrayBuffer: async () => new ArrayBuffer(0)
	};
	
	global.fetch = vi.fn().mockResolvedValue(mockResponse);
	
	return global.fetch;
}

/**
 * Mock setTimeout/setInterval for testing
 */
export function mockTimers() {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	
	afterEach(() => {
		vi.useRealTimers();
	});
}

/**
 * Mock Date.now() for consistent timestamps
 */
export function mockDateNow(timestamp: number = 1609459200000) {
	const originalDateNow = Date.now;
	
	beforeEach(() => {
		Date.now = vi.fn(() => timestamp);
	});
	
	afterEach(() => {
		Date.now = originalDateNow;
	});
}

/**
 * Mock window.location
 */
export function mockLocation(url: string = 'http://localhost:3000') {
	delete (window as any).location;
	window.location = new URL(url) as any;
}

/**
 * Mock clipboard API
 */
export function mockClipboard() {
	const mockClipboard = {
		writeText: vi.fn().mockResolvedValue(undefined),
		readText: vi.fn().mockResolvedValue(''),
		write: vi.fn().mockResolvedValue(undefined),
		read: vi.fn().mockResolvedValue([])
	};
	
	Object.defineProperty(navigator, 'clipboard', {
		value: mockClipboard,
		writable: true
	});
	
	return mockClipboard;
}

/**
 * Mock getBoundingClientRect for positioning tests
 */
export function mockGetBoundingClientRect(
	element: Element,
	rect: Partial<DOMRect>
): void {
	const defaultRect: DOMRect = {
		x: 0,
		y: 0,
		width: 100,
		height: 50,
		top: 0,
		right: 100,
		bottom: 50,
		left: 0,
		toJSON: () => ({})
	};
	
	element.getBoundingClientRect = vi.fn(() => ({ ...defaultRect, ...rect }));
}

/**
 * Mock viewport size
 */
export function mockViewport(width: number = 1024, height: number = 768): void {
	Object.defineProperty(window, 'innerWidth', {
		writable: true,
		configurable: true,
		value: width
	});
	
	Object.defineProperty(window, 'innerHeight', {
		writable: true,
		configurable: true,
		value: height
	});
	
	// Trigger resize event
	window.dispatchEvent(new Event('resize'));
}

/**
 * Mock media query
 */
export function mockMediaQuery(query: string, matches: boolean = true) {
	const mockMatchMedia = vi.fn().mockImplementation((q: string) => ({
		matches: q === query ? matches : false,
		media: q,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}));
	
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: mockMatchMedia
	});
	
	return mockMatchMedia;
}

/**
 * Mock prefers-reduced-motion
 */
export function mockPrefersReducedMotion(enabled: boolean = true): void {
	mockMediaQuery('(prefers-reduced-motion: reduce)', enabled);
}

/**
 * Mock prefers-color-scheme
 */
export function mockPrefersColorScheme(scheme: 'light' | 'dark' = 'light'): void {
	mockMediaQuery(`(prefers-color-scheme: ${scheme})`, true);
}

/**
 * Create a mock file for file input testing
 */
export function createMockFile(
	name: string = 'test.txt',
	content: string = 'test content',
	type: string = 'text/plain'
): File {
	const blob = new Blob([content], { type });
	return new File([blob], name, { type });
}

/**
 * Create multiple mock files
 */
export function createMockFiles(count: number = 3): File[] {
	return Array.from({ length: count }, (_, i) =>
		createMockFile(`file${i + 1}.txt`, `Content ${i + 1}`)
	);
}

