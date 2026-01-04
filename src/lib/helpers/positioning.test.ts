/**
 * Tests for positioning utilities
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
	getRect,
	parsePlacement,
	getOppositeSide,
	type Placement,
	type Side
} from './positioning';
import { mockGetBoundingClientRect, mockViewport } from '$lib/test-utils';

describe('Positioning Utilities', () => {
	let reference: HTMLDivElement;
	let floating: HTMLDivElement;
	
	beforeEach(() => {
		reference = document.createElement('div');
		floating = document.createElement('div');
		document.body.appendChild(reference);
		document.body.appendChild(floating);
		
		// Mock viewport
		mockViewport(1024, 768);
		
		// Mock reference element position
		mockGetBoundingClientRect(reference, {
			x: 100,
			y: 100,
			width: 200,
			height: 100,
			top: 100,
			right: 300,
			bottom: 200,
			left: 100
		});
		
		// Mock floating element size
		mockGetBoundingClientRect(floating, {
			x: 0,
			y: 0,
			width: 150,
			height: 80,
			top: 0,
			right: 150,
			bottom: 80,
			left: 0
		});
	});
	
	afterEach(() => {
		document.body.removeChild(reference);
		document.body.removeChild(floating);
	});
	
	describe('getRect', () => {
		it('should get element rect', () => {
			const rect = getRect(reference);
			
			expect(rect.top).toBe(100);
			expect(rect.left).toBe(100);
			expect(rect.width).toBe(200);
			expect(rect.height).toBe(100);
		});
	});
	
	describe('parsePlacement', () => {
		it('should parse placement without alignment', () => {
			const { side, alignment } = parsePlacement('top');
			
			expect(side).toBe('top');
			expect(alignment).toBe('center');
		});
		
		it('should parse placement with start alignment', () => {
			const { side, alignment } = parsePlacement('top-start');
			
			expect(side).toBe('top');
			expect(alignment).toBe('start');
		});
		
		it('should parse placement with end alignment', () => {
			const { side, alignment } = parsePlacement('bottom-end');
			
			expect(side).toBe('bottom');
			expect(alignment).toBe('end');
		});
		
		it('should parse all sides', () => {
			const placements: Placement[] = ['top', 'bottom', 'left', 'right'];
			
			placements.forEach(placement => {
				const { side } = parsePlacement(placement);
				expect(side).toBe(placement);
			});
		});
	});
	
	describe('getOppositeSide', () => {
		it('should return opposite sides', () => {
			expect(getOppositeSide('top')).toBe('bottom');
			expect(getOppositeSide('bottom')).toBe('top');
			expect(getOppositeSide('left')).toBe('right');
			expect(getOppositeSide('right')).toBe('left');
		});
	});
});

