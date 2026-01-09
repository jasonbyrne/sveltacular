<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FlexRow from './flex-row.svelte';
	import FlexCol from './flex-col.svelte';
	import FlexItem from './flex-item.svelte';

	/**
	 * Flexbox layout components for creating flexible, responsive layouts.
	 *
	 * **Components**:
	 * - `FlexRow` - Horizontal flex container (row direction)
	 * - `FlexCol` - Vertical flex container (column direction)
	 * - `FlexItem` - Individual flex item with growth and alignment controls
	 *
	 * **Usage**:
	 * ```svelte
	 * <FlexRow gap="md" justify="space-between">
	 *   <FlexItem grow>
	 *     <div>Content that grows</div>
	 *   </FlexItem>
	 *   <FlexItem>
	 *     <Button>Action</Button>
	 *   </FlexItem>
	 * </FlexRow>
	 * ```
	 */
	const { Story } = defineMeta({
		component: FlexRow,
		title: 'Layout/Flex',
		tags: ['autodocs'],
		argTypes: {
			gap: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl'],
				description: 'Gap between items using standard spacing tokens'
			},
			justify: {
				control: 'select',
				options: [
					'flex-start',
					'flex-end',
					'center',
					'space-between',
					'space-around',
					'space-evenly'
				],
				description: 'Justify content along the main axis'
			},
			align: {
				control: 'select',
				options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
				description: 'Align items along the cross axis'
			},
			wrap: {
				control: 'boolean',
				description: 'Whether to wrap items to next line'
			},
			fullWidth: {
				control: 'boolean',
				description: 'Whether to take full width'
			}
		}
	});
</script>

<Story name="BasicRow">
	<div class="container">
		<FlexRow gap="md">
			<div class="demo-box small">Item 1</div>
			<div class="demo-box small">Item 2</div>
			<div class="demo-box small">Item 3</div>
		</FlexRow>
	</div>
	Basic horizontal layout with medium gap spacing.
</Story>

<Story name="BasicColumn">
	<div class="container">
		<FlexCol gap="md">
			<div class="demo-box medium">Item 1</div>
			<div class="demo-box medium">Item 2</div>
			<div class="demo-box medium">Item 3</div>
		</FlexCol>
	</div>
	Basic vertical layout with medium gap spacing.
</Story>

<Story name="GapSizes">
	<div class="container">
		<FlexRow gap="xs">
			<div class="demo-box small">xs</div>
			<div class="demo-box small">gap</div>
		</FlexRow>
	</div>
	<div class="container">
		<FlexRow gap="sm">
			<div class="demo-box small">sm</div>
			<div class="demo-box small">gap</div>
		</FlexRow>
	</div>
	<div class="container">
		<FlexRow gap="md">
			<div class="demo-box small">md</div>
			<div class="demo-box small">gap</div>
		</FlexRow>
	</div>
	<div class="container">
		<FlexRow gap="base">
			<div class="demo-box small">base</div>
			<div class="demo-box small">gap</div>
		</FlexRow>
	</div>
	<div class="container">
		<FlexRow gap="lg">
			<div class="demo-box small">lg</div>
			<div class="demo-box small">gap</div>
		</FlexRow>
	</div>
	<div class="container">
		<FlexRow gap="xl">
			<div class="demo-box small">xl</div>
			<div class="demo-box small">gap</div>
		</FlexRow>
	</div>
	Different gap sizes using standard spacing tokens (xs, sm, md, base, lg, xl, 2xl).
</Story>

<Story name="JustifyContent">
	<div class="container">
		<strong>flex-start (default):</strong>
		<FlexRow justify="flex-start" gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box small">2</div>
		</FlexRow>
	</div>
	<div class="container">
		<strong>center:</strong>
		<FlexRow justify="center" gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box small">2</div>
		</FlexRow>
	</div>
	<div class="container">
		<strong>flex-end:</strong>
		<FlexRow justify="flex-end" gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box small">2</div>
		</FlexRow>
	</div>
	<div class="container">
		<strong>space-between:</strong>
		<FlexRow justify="space-between" gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box small">2</div>
		</FlexRow>
	</div>
	<div class="container">
		<strong>space-around:</strong>
		<FlexRow justify="space-around" gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box small">2</div>
		</FlexRow>
	</div>
	<div class="container">
		<strong>space-evenly:</strong>
		<FlexRow justify="space-evenly" gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box small">2</div>
		</FlexRow>
	</div>
	Different justify-content options for aligning items along the main axis.
</Story>

<Story name="AlignItems">
	<div class="container" style="height: 150px;">
		<strong>stretch (default):</strong>
		<FlexRow align="stretch" gap="md">
			<div class="demo-box small" style="height: auto;">1</div>
			<div class="demo-box medium" style="height: auto;">2</div>
			<div class="demo-box small" style="height: auto;">3</div>
		</FlexRow>
	</div>
	<div class="container" style="height: 150px;">
		<strong>flex-start:</strong>
		<FlexRow align="flex-start" gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box medium">2</div>
			<div class="demo-box small">3</div>
		</FlexRow>
	</div>
	<div class="container" style="height: 150px;">
		<strong>center:</strong>
		<FlexRow align="center" gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box medium">2</div>
			<div class="demo-box small">3</div>
		</FlexRow>
	</div>
	<div class="container" style="height: 150px;">
		<strong>flex-end:</strong>
		<FlexRow align="flex-end" gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box medium">2</div>
			<div class="demo-box small">3</div>
		</FlexRow>
	</div>
	Different align-items options for aligning items along the cross axis.
</Story>

<Story name="Wrap">
	<div class="container">
		<FlexRow wrap gap="md">
			<div class="demo-box small">1</div>
			<div class="demo-box small">2</div>
			<div class="demo-box small">3</div>
			<div class="demo-box small">4</div>
			<div class="demo-box small">5</div>
			<div class="demo-box small">6</div>
			<div class="demo-box small">7</div>
		</FlexRow>
	</div>
	Items wrap to the next line when there's not enough space.
</Story>

<Story name="FlexItemGrow">
	<div class="container">
		<FlexRow gap="md">
			<FlexItem>
				<div class="demo-box small">Fixed</div>
			</FlexItem>
			<FlexItem grow>
				<div class="demo-box medium" style="width: 100%;">Grows</div>
			</FlexItem>
			<FlexItem>
				<div class="demo-box small">Fixed</div>
			</FlexItem>
		</FlexRow>
	</div>
	Use FlexItem with grow prop to make items expand to fill available space.
</Story>

<Story name="FlexItemAlign">
	<div class="container" style="height: 150px;">
		<FlexRow align="stretch" gap="md">
			<FlexItem align="flex-start">
				<div class="demo-box small">Top</div>
			</FlexItem>
			<FlexItem align="center">
				<div class="demo-box small">Center</div>
			</FlexItem>
			<FlexItem align="flex-end">
				<div class="demo-box small">Bottom</div>
			</FlexItem>
			<FlexItem>
				<div class="demo-box medium" style="height: auto;">Stretch</div>
			</FlexItem>
		</FlexRow>
	</div>
	Individual items can override the container's alignment using FlexItem's align prop.
</Story>

<Story name="NestedLayout">
	<div class="container">
		<FlexRow gap="lg" justify="space-between">
			<FlexItem grow>
				<FlexCol gap="sm">
					<div class="demo-box medium" style="width: 100%;">Header</div>
					<div class="demo-box large" style="width: 100%;">Content</div>
					<div class="demo-box medium" style="width: 100%;">Footer</div>
				</FlexCol>
			</FlexItem>
			<FlexItem>
				<FlexCol gap="sm">
					<div class="demo-box tall">Side</div>
					<div class="demo-box tall">Bar</div>
				</FlexCol>
			</FlexItem>
		</FlexRow>
	</div>
	Nested flex layouts: FlexRow containing FlexCol with FlexItem for complex layouts.
</Story>

<Story name="FormLayout" args={{ gap: 'md' }}>
	<div class="container">
		<FlexCol gap="md">
			<FlexRow gap="md" justify="space-between">
				<FlexItem grow>
					<div class="demo-box medium" style="width: 100%;">Name Input</div>
				</FlexItem>
				<FlexItem>
					<div class="demo-box small" style="width: 100px;">Age Input</div>
				</FlexItem>
			</FlexRow>
			<FlexRow gap="md">
				<div class="demo-box large" style="width: 100%;">Address Input</div>
			</FlexRow>
			<FlexRow gap="md" justify="flex-end">
				<FlexItem>
					<div class="demo-box small" style="width: 100px;">Cancel</div>
				</FlexItem>
				<FlexItem>
					<div class="demo-box small" style="width: 100px;">Submit</div>
				</FlexItem>
			</FlexRow>
		</FlexCol>
	</div>
	Common form layout pattern using flex components.
</Story>

<Story name="FullWidth">
	<div class="container">
		<FlexRow gap="md" fullWidth>
			<div class="demo-box small">1</div>
			<div class="demo-box small">2</div>
			<div class="demo-box small">3</div>
		</FlexRow>
	</div>
	<div class="container">
		<FlexRow gap="md" fullWidth={false}>
			<div class="demo-box small">1</div>
			<div class="demo-box small">2</div>
			<div class="demo-box small">3</div>
		</FlexRow>
	</div>
	Toggle fullWidth to control whether the container takes full width. First row: fullWidth=true (default),
	Second row: fullWidth=false (auto width).
</Story>

<style>
	.demo-box {
		background: #e2e8f0;
		border: 2px solid #cbd5e0;
		padding: 1rem;
		border-radius: 4px;
		text-align: center;
		font-weight: 500;
		color: #2d3748;
	}

	.demo-box.small {
		width: 80px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.demo-box.medium {
		width: 120px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.demo-box.large {
		width: 180px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.demo-box.tall {
		width: 100px;
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container {
		padding: 1rem;
		background: #f7fafc;
		border: 1px dashed #cbd5e0;
		margin-bottom: 1rem;
	}
</style>
