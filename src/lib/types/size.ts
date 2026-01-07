/**
 * Unified size type for all components
 */
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

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
 * Get max width for a given size
 */
export const getMaxWidth = (size: ComponentSize): string => {
	return sizeMap[size];
};

/**
 * Get display type for a given size (block for xl/full, inline-block for others)
 */
export const getDisplayType = (size: ComponentSize): 'block' | 'inline-block' => {
	return ['xl', 'full'].includes(size) ? 'block' : 'inline-block';
};














