/**
 * Unified size type for all components
 * Controls font size, padding, and general component scale
 */
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Width options for components
 * auto: content-based width (no min-width)
 * xs-xl: fixed minimum widths
 * full: fills available space (100%)
 */
export type ComponentWidth = 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Size utility functions for consistent spacing and sizing
 */
export const sizeMap = {
	sm: '10rem',
	md: '20rem',
	lg: '30rem',
	xl: 'auto',
	full: '100%'
} as const;

/**
 * Width map for component widths
 */
export const widthMap = {
	auto: 'auto',
	xs: '10rem',
	sm: '15rem',
	md: '20rem',
	lg: '25rem',
	xl: '30rem',
	full: '100%'
} as const;

/**
 * Get max width for a given size
 */
export const getMaxWidth = (size: ComponentSize): string => {
	return sizeMap[size];
};

/**
 * Get display type for a given size (block for xl, inline-block for others)
 */
export const getDisplayType = (size: ComponentSize): 'block' | 'inline-block' => {
	return size === 'xl' ? 'block' : 'inline-block';
};

/**
 * Get min-width for a given width option
 */
export const getMinWidth = (width: ComponentWidth): string => {
	return widthMap[width];
};
