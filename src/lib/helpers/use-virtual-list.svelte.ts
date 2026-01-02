/**
 * Virtual List Composable
 * 
 * Provides efficient rendering of large lists by only rendering visible items.
 * Maintains 60fps performance with 10,000+ items through viewport-based rendering.
 * 
 * @example
 * ```svelte
 * <script>
 *   import { useVirtualList } from '$lib/helpers/use-virtual-list.svelte';
 *   
 *   const items = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` }));
 *   const virtual = useVirtualList(items, { itemHeight: 40 });
 * </script>
 * 
 * <div bind:this={virtual.containerRef} style="height: 400px; overflow-y: auto;">
 *   <div style="height: {virtual.totalHeight}px; position: relative;">
 *     {#each virtual.visibleItems as item (item.index)}
 *       <div style="position: absolute; top: {item.offsetTop}px; height: {virtual.itemHeight}px;">
 *         {item.data.name}
 *       </div>
 *     {/each}
 *   </div>
 * </div>
 * ```
 */

export interface VirtualListOptions {
	/**
	 * Height of each item in pixels
	 */
	itemHeight: number;
	
	/**
	 * Number of items to render outside the visible viewport (buffer zone)
	 * Higher values provide smoother scrolling but render more items
	 * @default 3
	 */
	overscan?: number;
	
	/**
	 * Enable variable height items (experimental)
	 * When true, itemHeight is used as estimated height
	 * @default false
	 */
	variableHeight?: boolean;
}

export interface VirtualItem<T> {
	/**
	 * Original index in the source array
	 */
	index: number;
	
	/**
	 * The actual data item
	 */
	data: T;
	
	/**
	 * Offset from the top of the container
	 */
	offsetTop: number;
	
	/**
	 * Height of this specific item (for variable height)
	 */
	height: number;
}

export class VirtualList<T> {
	// Configuration
	private itemHeight: number;
	private overscan: number;
	private variableHeight: boolean;
	
	// State
	items = $state<T[]>([]);
	visibleItems = $state<VirtualItem<T>[]>([]);
	totalHeight = $state(0);
	scrollTop = $state(0);
	containerHeight = $state(0);
	
	// Container reference
	containerRef: HTMLElement | null = null;
	
	// Height cache for variable height items
	private heightCache = new Map<number, number>();
	
	// Scroll handler
	private scrollHandler: (() => void) | null = null;
	private resizeObserver: ResizeObserver | null = null;

	constructor(items: T[], options: VirtualListOptions) {
		this.items = items;
		this.itemHeight = options.itemHeight;
		this.overscan = options.overscan ?? 3;
		this.variableHeight = options.variableHeight ?? false;
		
		this.calculateTotalHeight();
		this.updateVisibleItems();
	}

	/**
	 * Update the items array
	 */
	setItems(items: T[]) {
		this.items = items;
		this.heightCache.clear();
		this.calculateTotalHeight();
		this.updateVisibleItems();
	}

	/**
	 * Set the container element and attach scroll listener
	 */
	setContainer(element: HTMLElement | null) {
		// Clean up previous container
		if (this.containerRef && this.scrollHandler) {
			this.containerRef.removeEventListener('scroll', this.scrollHandler);
		}
		
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}

		this.containerRef = element;

		if (!element) return;

		// Set up scroll listener
		this.scrollHandler = () => {
			this.scrollTop = element.scrollTop;
			this.updateVisibleItems();
		};
		element.addEventListener('scroll', this.scrollHandler, { passive: true });

		// Set up resize observer for container height
		this.resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				this.containerHeight = entry.contentRect.height;
				this.updateVisibleItems();
			}
		});
		this.resizeObserver.observe(element);

		// Initial measurements
		this.containerHeight = element.clientHeight;
		this.scrollTop = element.scrollTop;
		this.updateVisibleItems();
	}

	/**
	 * Calculate total height of all items
	 */
	private calculateTotalHeight() {
		if (this.variableHeight) {
			// Sum up cached heights or use estimated height
			let total = 0;
			for (let i = 0; i < this.items.length; i++) {
				total += this.heightCache.get(i) ?? this.itemHeight;
			}
			this.totalHeight = total;
		} else {
			this.totalHeight = this.items.length * this.itemHeight;
		}
	}

	/**
	 * Get the height of a specific item
	 */
	private getItemHeight(index: number): number {
		if (this.variableHeight) {
			return this.heightCache.get(index) ?? this.itemHeight;
		}
		return this.itemHeight;
	}

	/**
	 * Get the offset top position for a specific item
	 */
	private getItemOffsetTop(index: number): number {
		if (this.variableHeight) {
			let offset = 0;
			for (let i = 0; i < index; i++) {
				offset += this.getItemHeight(i);
			}
			return offset;
		}
		return index * this.itemHeight;
	}

	/**
	 * Find the start index based on scroll position
	 */
	private findStartIndex(): number {
		if (this.variableHeight) {
			// Binary search for variable height
			let low = 0;
			let high = this.items.length - 1;
			
			while (low <= high) {
				const mid = Math.floor((low + high) / 2);
				const offsetTop = this.getItemOffsetTop(mid);
				
				if (offsetTop < this.scrollTop) {
					low = mid + 1;
				} else if (offsetTop > this.scrollTop) {
					high = mid - 1;
				} else {
					return mid;
				}
			}
			
			return Math.max(0, high);
		}
		
		// Simple calculation for fixed height
		return Math.floor(this.scrollTop / this.itemHeight);
	}

	/**
	 * Update which items should be visible
	 */
	private updateVisibleItems() {
		if (this.items.length === 0 || this.containerHeight === 0) {
			this.visibleItems = [];
			return;
		}

		// Calculate visible range with overscan
		const startIndex = Math.max(0, this.findStartIndex() - this.overscan);
		
		let endIndex: number;
		if (this.variableHeight) {
			// Calculate end index for variable height
			let height = 0;
			endIndex = startIndex;
			const targetHeight = this.containerHeight + (this.overscan * this.itemHeight * 2);
			
			while (endIndex < this.items.length && height < targetHeight) {
				height += this.getItemHeight(endIndex);
				endIndex++;
			}
		} else {
			// Simple calculation for fixed height
			const visibleCount = Math.ceil(this.containerHeight / this.itemHeight);
			endIndex = Math.min(
				this.items.length,
				startIndex + visibleCount + this.overscan * 2
			);
		}

		// Create visible items array
		const visible: VirtualItem<T>[] = [];
		for (let i = startIndex; i < endIndex; i++) {
			visible.push({
				index: i,
				data: this.items[i],
				offsetTop: this.getItemOffsetTop(i),
				height: this.getItemHeight(i)
			});
		}

		this.visibleItems = visible;
	}

	/**
	 * Update the height of a specific item (for variable height mode)
	 */
	setItemHeight(index: number, height: number) {
		if (!this.variableHeight) return;
		
		const oldHeight = this.heightCache.get(index);
		if (oldHeight === height) return;
		
		this.heightCache.set(index, height);
		this.calculateTotalHeight();
		this.updateVisibleItems();
	}

	/**
	 * Scroll to a specific item index
	 */
	scrollToIndex(index: number, behavior: ScrollBehavior = 'smooth') {
		if (!this.containerRef) return;
		
		const offsetTop = this.getItemOffsetTop(index);
		this.containerRef.scrollTo({
			top: offsetTop,
			behavior
		});
	}

	/**
	 * Clean up event listeners
	 */
	destroy() {
		if (this.containerRef && this.scrollHandler) {
			this.containerRef.removeEventListener('scroll', this.scrollHandler);
		}
		
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
	}
}

/**
 * Create a virtual list instance
 */
export function useVirtualList<T>(items: T[], options: VirtualListOptions): VirtualList<T> {
	return new VirtualList(items, options);
}

