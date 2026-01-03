/**
 * Positioning Utilities
 * 
 * Pure JavaScript positioning calculations for tooltips, popovers, dropdowns, etc.
 * Handles viewport collision detection, auto-flip positioning, and arrow placement.
 * 
 * Built from scratch with zero dependencies as an alternative to Floating UI.
 */

export type Placement = 
	| 'top' 
	| 'top-start' 
	| 'top-end'
	| 'bottom' 
	| 'bottom-start' 
	| 'bottom-end'
	| 'left' 
	| 'left-start' 
	| 'left-end'
	| 'right' 
	| 'right-start' 
	| 'right-end';

export type Side = 'top' | 'bottom' | 'left' | 'right';
export type Alignment = 'start' | 'center' | 'end';

export interface Position {
	top: number;
	left: number;
	side: Side;
	alignment: Alignment;
}

export interface ArrowPosition {
	top?: number;
	left?: number;
	side: Side;
}

export interface PositionOptions {
	/**
	 * Preferred placement for the floating element
	 */
	placement: Placement;
	
	/**
	 * Offset from the reference element in pixels
	 * @default 8
	 */
	offset?: number;
	
	/**
	 * Whether to flip to opposite side if doesn't fit
	 * @default true
	 */
	autoFlip?: boolean;
	
	/**
	 * Whether to adjust alignment if doesn't fit
	 * @default true
	 */
	autoAlign?: boolean;
	
	/**
	 * Padding from viewport edges in pixels
	 * @default 8
	 */
	viewportPadding?: number;
	
	/**
	 * Whether to include an arrow/pointer
	 * @default false
	 */
	arrow?: boolean;
	
	/**
	 * Size of the arrow in pixels
	 * @default 8
	 */
	arrowSize?: number;
}

export interface Rect {
	top: number;
	left: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
}

/**
 * Get the bounding rect of an element
 */
export function getRect(element: Element): Rect {
	const rect = element.getBoundingClientRect();
	return {
		top: rect.top,
		left: rect.left,
		right: rect.right,
		bottom: rect.bottom,
		width: rect.width,
		height: rect.height
	};
}

/**
 * Get the viewport dimensions
 */
export function getViewport(): Rect {
	return {
		top: 0,
		left: 0,
		right: window.innerWidth,
		bottom: window.innerHeight,
		width: window.innerWidth,
		height: window.innerHeight
	};
}

/**
 * Parse placement string into side and alignment
 */
export function parsePlacement(placement: Placement): { side: Side; alignment: Alignment } {
	const [side, alignment = 'center'] = placement.split('-') as [Side, Alignment?];
	return { side, alignment: alignment || 'center' };
}

/**
 * Get the opposite side
 */
export function getOppositeSide(side: Side): Side {
	const opposites: Record<Side, Side> = {
		top: 'bottom',
		bottom: 'top',
		left: 'right',
		right: 'left'
	};
	return opposites[side];
}

/**
 * Calculate position for a given side and alignment
 */
function calculatePositionForSide(
	reference: Rect,
	floating: Rect,
	side: Side,
	alignment: Alignment,
	offset: number
): { top: number; left: number } {
	let top = 0;
	let left = 0;

	// Calculate based on side
	switch (side) {
		case 'top':
			top = reference.top - floating.height - offset;
			left = reference.left;
			break;
		case 'bottom':
			top = reference.bottom + offset;
			left = reference.left;
			break;
		case 'left':
			top = reference.top;
			left = reference.left - floating.width - offset;
			break;
		case 'right':
			top = reference.top;
			left = reference.right + offset;
			break;
	}

	// Adjust for alignment
	if (side === 'top' || side === 'bottom') {
		switch (alignment) {
			case 'start':
				// left already set
				break;
			case 'center':
				left = reference.left + reference.width / 2 - floating.width / 2;
				break;
			case 'end':
				left = reference.right - floating.width;
				break;
		}
	} else {
		// left or right
		switch (alignment) {
			case 'start':
				// top already set
				break;
			case 'center':
				top = reference.top + reference.height / 2 - floating.height / 2;
				break;
			case 'end':
				top = reference.bottom - floating.height;
				break;
		}
	}

	return { top, left };
}

/**
 * Check if floating element fits in viewport at given position
 */
function fitsInViewport(
	position: { top: number; left: number },
	floating: Rect,
	viewport: Rect,
	padding: number
): boolean {
	const right = position.left + floating.width;
	const bottom = position.top + floating.height;

	return (
		position.top >= viewport.top + padding &&
		position.left >= viewport.left + padding &&
		right <= viewport.right - padding &&
		bottom <= viewport.bottom - padding
	);
}

/**
 * Calculate the best position for a floating element
 */
export function calculatePosition(
	referenceElement: Element,
	floatingElement: Element,
	options: PositionOptions
): Position {
	const {
		placement,
		offset = 8,
		autoFlip = true,
		autoAlign = true,
		viewportPadding = 8
	} = options;

	const reference = getRect(referenceElement);
	const floating = getRect(floatingElement);
	const viewport = getViewport();

	let { side, alignment } = parsePlacement(placement);

	// Try preferred placement
	let position = calculatePositionForSide(reference, floating, side, alignment, offset);
	let fits = fitsInViewport(position, floating, viewport, viewportPadding);

	// Try flipping to opposite side if doesn't fit
	if (!fits && autoFlip) {
		const oppositeSide = getOppositeSide(side);
		const flippedPosition = calculatePositionForSide(reference, floating, oppositeSide, alignment, offset);
		const flippedFits = fitsInViewport(flippedPosition, floating, viewport, viewportPadding);

		if (flippedFits) {
			side = oppositeSide;
			position = flippedPosition;
			fits = true;
		}
	}

	// Try adjusting alignment if still doesn't fit
	if (!fits && autoAlign) {
		const alignments: Alignment[] = ['start', 'center', 'end'];
		for (const testAlignment of alignments) {
			if (testAlignment === alignment) continue;

			const adjustedPosition = calculatePositionForSide(reference, floating, side, testAlignment, offset);
			const adjustedFits = fitsInViewport(adjustedPosition, floating, viewport, viewportPadding);

			if (adjustedFits) {
				alignment = testAlignment;
				position = adjustedPosition;
				fits = true;
				break;
			}
		}
	}

	// Clamp to viewport if still doesn't fit
	if (!fits) {
		position.left = Math.max(
			viewport.left + viewportPadding,
			Math.min(position.left, viewport.right - floating.width - viewportPadding)
		);
		position.top = Math.max(
			viewport.top + viewportPadding,
			Math.min(position.top, viewport.bottom - floating.height - viewportPadding)
		);
	}

	return {
		top: position.top,
		left: position.left,
		side,
		alignment
	};
}

/**
 * Calculate arrow position relative to the floating element
 */
export function calculateArrowPosition(
	referenceElement: Element,
	floatingElement: Element,
	side: Side,
	arrowSize: number = 8
): ArrowPosition {
	const reference = getRect(referenceElement);
	const floating = getRect(floatingElement);

	// Arrow should be on the opposite side of where the tooltip is positioned
	// If tooltip is on top, arrow is on bottom pointing down toward the element
	const arrowPosition: ArrowPosition = { side: getOppositeSide(side) };

	// Calculate arrow position to point at center of reference element
	// Arrow CSS creates a triangle using borders, which is arrowSize*2 wide/tall
	// The point of the arrow is at the center of that dimension
	if (side === 'top' || side === 'bottom') {
		// Arrow is horizontally positioned
		const referenceCenterX = reference.left + reference.width / 2;
		const floatingLeft = floating.left;
		// Center the arrow (which is arrowSize*2 wide) on the reference center
		arrowPosition.left = referenceCenterX - floatingLeft - arrowSize;
		
		// Clamp arrow within floating element bounds, with padding to avoid rounded corners
		// Typical border-radius is 4-6px, so keep arrow at least 8px from edges
		const cornerPadding = arrowSize; // Keep arrow away from border-radius areas
		arrowPosition.left = Math.max(
			cornerPadding,
			Math.min(arrowPosition.left, floating.width - cornerPadding - arrowSize * 2)
		);
	} else {
		// Arrow is vertically positioned
		const referenceCenterY = reference.top + reference.height / 2;
		const floatingTop = floating.top;
		// Center the arrow (which is arrowSize*2 tall) on the reference center
		arrowPosition.top = referenceCenterY - floatingTop - arrowSize;
		
		// Clamp arrow within floating element bounds, with padding to avoid rounded corners
		// Typical border-radius is 4-6px, so keep arrow at least 8px from edges
		const cornerPadding = arrowSize; // Keep arrow away from border-radius areas
		arrowPosition.top = Math.max(
			cornerPadding,
			Math.min(arrowPosition.top, floating.height - cornerPadding - arrowSize * 2)
		);
	}

	return arrowPosition;
}

/**
 * Create a positioning update function that can be called on scroll/resize
 */
export function createPositionUpdater(
	referenceElement: Element,
	floatingElement: Element,
	options: PositionOptions,
	onUpdate: (position: Position, arrow?: ArrowPosition) => void
): () => void {
	const update = () => {
		const position = calculatePosition(referenceElement, floatingElement, options);
		
		let arrow: ArrowPosition | undefined;
		if (options.arrow) {
			arrow = calculateArrowPosition(
				referenceElement,
				floatingElement,
				position.side,
				options.arrowSize
			);
		}

		onUpdate(position, arrow);
	};

	// Initial update
	update();

	// Listen for scroll and resize
	window.addEventListener('scroll', update, { passive: true });
	window.addEventListener('resize', update, { passive: true });

	// Return cleanup function
	return () => {
		window.removeEventListener('scroll', update);
		window.removeEventListener('resize', update);
	};
}

