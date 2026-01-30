<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Progress from './progress.svelte';

	const { Story } = defineMeta({
		component: Progress,
		title: 'Placeholders/Progress',
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'range', min: 0, max: 100, step: 1 },
				description: 'Progress value (0-100)'
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg', 'xl'],
				description: 'Size of the progress bar',
				table: {
					type: { summary: 'ComponentSize' },
					defaultValue: { summary: 'md' }
				}
			}
		}
	});
</script>

<Story name="Default" args={{ value: 50 }} />

<Story name="Sizes">
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<div>
			<h4>Extra Small (xs)</h4>
			<Progress value={65} size="xs" />
		</div>
		<div>
			<h4>Small (sm)</h4>
			<Progress value={75} size="sm" />
		</div>
		<div>
			<h4>Medium (md)</h4>
			<Progress value={50} size="md" />
		</div>
		<div>
			<h4>Large (lg)</h4>
			<Progress value={80} size="lg" />
		</div>
		<div>
			<h4>Extra Large (xl)</h4>
			<Progress value={90} size="xl" />
		</div>
	</div>
</Story>

<Story name="Different Values">
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		<Progress value={10} />
		<Progress value={30} />
		<Progress value={50} />
		<Progress value={75} />
		<Progress value={100} />
	</div>
</Story>
