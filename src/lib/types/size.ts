/**
 * Unified size type for all components
 * Controls font size, padding, and general component scale
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Width options for components
 * auto: content-based width (no min-width)
 * xs-xl: fixed minimum widths
 * full: fills available space (100%)
 */
export type ComponentWidth = ComponentSize | 'auto' | 'full';

/**
 * Size utility functions for consistent spacing and sizing
 */
export const sizeMap: Record<ComponentSize, string> = {
	xs: '8rem',
	sm: '10rem',
	md: '20rem',
	lg: '25rem',
	xl: '30rem'
} as const;
