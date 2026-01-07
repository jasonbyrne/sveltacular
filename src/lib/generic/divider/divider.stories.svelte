<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Divider from './divider.svelte';

	/**
	 * Divider component for visually separating content sections.
	 *
	 * **Accessibility**: Uses semantic `<hr>` element. Screen readers will announce
	 * it as a separator, providing clear content boundaries.
	 *
	 * **Usage**:
	 * ```svelte
	 * <div>Content above</div>
	 * <Divider />
	 * <div>Content below</div>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Divider,
		title: 'Generic/Divider',
		tags: ['autodocs']
	});
</script>

<Story name="Standard">Standard horizontal divider for separating content sections.</Story>

<Story name="InContext">
	<div style="padding: 1rem;">
		<p>Content above the divider</p>
		<Divider />
		<p>Content below the divider</p>
	</div>
</Story>

<Story name="MultipleDividers">
	<div style="padding: 1rem;">
		<section>
			<h3 style="margin: 0 0 0.5rem 0;">Section 1</h3>
			<p style="margin: 0;">Content for section 1</p>
		</section>
		<Divider />
		<section>
			<h3 style="margin: 0 0 0.5rem 0;">Section 2</h3>
			<p style="margin: 0;">Content for section 2</p>
		</section>
		<Divider />
		<section>
			<h3 style="margin: 0 0 0.5rem 0;">Section 3</h3>
			<p style="margin: 0;">Content for section 3</p>
		</section>
	</div>
</Story>
