<script lang="ts">
	import Tooltip from '$lib/generic/tooltip/tooltip.svelte';
	import Button from '$lib/forms/button/button.svelte';

	let manualOpen = $state(false);
</script>

<div style="padding: 4rem; max-width: 1200px; margin: 0 auto;">
	<h1 style="margin-bottom: 2rem;">Tooltip Component Test Page</h1>

	<!-- Hover Mode -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Hover Mode (Default)</h2>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip text="Top tooltip" placement="top">
				<Button label="Top" />
			</Tooltip>
			<Tooltip text="Bottom tooltip" placement="bottom">
				<Button label="Bottom" />
			</Tooltip>
			<Tooltip text="Left tooltip" placement="left">
				<Button label="Left" />
			</Tooltip>
			<Tooltip text="Right tooltip" placement="right">
				<Button label="Right" />
			</Tooltip>
		</div>
	</section>

	<!-- Focus Mode -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Focus Mode (Tab to see)</h2>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip text="Focus me with Tab" trigger="focus">
				<Button label="Focus 1" />
			</Tooltip>
			<Tooltip text="Another focus tooltip" trigger="focus">
				<Button label="Focus 2" />
			</Tooltip>
		</div>
	</section>

	<!-- Click Mode -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Click Mode (Toggle)</h2>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip text="Click to toggle" trigger="click">
				<Button label="Click Me" />
			</Tooltip>
			<Tooltip text="Click outside or Escape to close" trigger="click" placement="bottom">
				<Button label="Try Me" />
			</Tooltip>
		</div>
	</section>

	<!-- Manual Mode -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Manual Mode (Controlled)</h2>
		<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
			<Button label="Show Tooltip" onclick={() => (manualOpen = true)} />
			<Button label="Hide Tooltip" variant="secondary" onclick={() => (manualOpen = false)} />
			<Tooltip text="Controlled by buttons" trigger="manual" bind:open={manualOpen}>
				<span
					style="padding: 0.5rem 1rem; background: #6366f1; color: white; border-radius: 0.375rem;"
					>Controlled Element</span
				>
			</Tooltip>
			<span style="color: #666; margin-left: 1rem;">State: {manualOpen ? 'Open' : 'Closed'}</span>
		</div>
	</section>

	<!-- Delays -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">With Delays</h2>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip text="Opens after 500ms" openDelay={500}>
				<Button label="Open Delay" />
			</Tooltip>
			<Tooltip text="Closes after 500ms" closeDelay={500}>
				<Button label="Close Delay" />
			</Tooltip>
			<Tooltip text="Both delays 300ms" openDelay={300} closeDelay={300}>
				<Button label="Both Delays" />
			</Tooltip>
		</div>
	</section>

	<!-- With Title -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">With Title</h2>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip title="Pro Tip" text="Keyboard shortcuts speed up your workflow">
				<Button label="Title + Text" />
			</Tooltip>
			<Tooltip title="Warning!" text="This action cannot be undone" placement="bottom">
				<Button label="Warning" variant="danger" />
			</Tooltip>
			<Tooltip title="New Feature" placement="right">
				<Button label="Title Only" />
			</Tooltip>
			<Tooltip
				title="Important Information"
				text="This is a longer message with both a title and body text. The title appears bold and larger above the main content."
				placement="left"
			>
				<Button label="Long Title + Text" />
			</Tooltip>
		</div>
	</section>

	<!-- Rich Content -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Rich Content (Custom Snippets)</h2>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip placement="bottom">
				{#snippet content()}
					<div style="text-align: left;">
						<strong style="display: block; margin-bottom: 0.25rem;">Pro Tip!</strong>
						<span
							>Use
							<code
								style="background: rgba(255,255,255,0.2); padding: 0 0.25rem; border-radius: 2px;"
								>Ctrl+K</code
							>
							for shortcuts</span
						>
					</div>
				{/snippet}
				<Button label="Rich Content" />
			</Tooltip>

			<Tooltip placement="right">
				{#snippet content()}
					<div style="text-align: left;">
						<strong style="display: block; margin-bottom: 0.5rem;">Features:</strong>
						<ul style="margin: 0; padding-left: 1.25rem; line-height: 1.6;">
							<li>Smart positioning</li>
							<li>Multiple triggers</li>
							<li>Rich content</li>
							<li>Accessible</li>
						</ul>
					</div>
				{/snippet}
				<Button label="Feature List" />
			</Tooltip>
		</div>
		<p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
			Note: For most cases, use the <code
				style="background: #f0f0f0; padding: 0.125rem 0.25rem; border-radius: 0.25rem;">title</code
			>
			prop instead of custom snippets for better consistency.
		</p>
	</section>

	<!-- Without Arrow -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Without Arrow</h2>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip text="No arrow" arrow={false}>
				<Button label="No Arrow" />
			</Tooltip>
		</div>
	</section>

	<!-- Disabled -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Disabled State</h2>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip text="This won't show" disabled>
				<Button label="Disabled Tooltip" />
			</Tooltip>
		</div>
	</section>

	<!-- Edge Cases -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Edge Cases (Auto Flip)</h2>
		<div style="position: relative; height: 400px; border: 1px solid #ccc; border-radius: 0.5rem;">
			<div style="position: absolute; top: 10px; left: 10px;">
				<Tooltip text="Should flip down" placement="top">
					<Button label="Top Left" size="sm" />
				</Tooltip>
			</div>
			<div style="position: absolute; top: 10px; right: 10px;">
				<Tooltip text="Should flip down" placement="top">
					<Button label="Top Right" size="sm" />
				</Tooltip>
			</div>
			<div style="position: absolute; bottom: 10px; left: 10px;">
				<Tooltip text="Should flip up" placement="bottom">
					<Button label="Bottom Left" size="sm" />
				</Tooltip>
			</div>
			<div style="position: absolute; bottom: 10px; right: 10px;">
				<Tooltip text="Should flip up" placement="bottom">
					<Button label="Bottom Right" size="sm" />
				</Tooltip>
			</div>
		</div>
	</section>

	<!-- Keyboard Navigation -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Keyboard Navigation Test</h2>
		<p style="margin-bottom: 1rem; color: #666;">
			Press <kbd
				style="background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 0.25rem; border: 1px solid #ccc;"
				>Tab</kbd
			> to navigate between buttons. Press <kbd
				style="background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 0.25rem; border: 1px solid #ccc;"
				>Escape</kbd
			> to close tooltips.
		</p>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip text="Focus tooltip 1" trigger="focus">
				<Button label="Button 1" />
			</Tooltip>
			<Tooltip text="Click tooltip 2" trigger="click">
				<Button label="Button 2 (Click)" />
			</Tooltip>
			<Tooltip text="Focus tooltip 3" trigger="focus">
				<Button label="Button 3" />
			</Tooltip>
			<Tooltip text="Hover tooltip 4" trigger="hover">
				<Button label="Button 4 (Hover)" />
			</Tooltip>
		</div>
	</section>

	<!-- Long Text -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Long Text</h2>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip
				text="This is a much longer tooltip text that demonstrates how the tooltip handles wrapping and maximum width constraints. It should wrap nicely and remain readable even with lots of content."
			>
				<Button label="Long Content" />
			</Tooltip>
		</div>
	</section>

	<!-- Empty/Null Text (Should Not Show) -->
	<section style="margin-bottom: 4rem;">
		<h2 style="margin-bottom: 1rem;">Empty/Null Text (Should Not Show)</h2>
		<p style="margin-bottom: 1rem; color: #666;">
			These tooltips have empty or null text and should NOT appear:
		</p>
		<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
			<Tooltip text="">
				<Button label="Empty String" />
			</Tooltip>
			<Tooltip text="   ">
				<Button label="Whitespace Only" />
			</Tooltip>
			<Tooltip text={undefined}>
				<Button label="Undefined" />
			</Tooltip>
			<Tooltip text={null as any}>
				<Button label="Null" />
			</Tooltip>
		</div>
	</section>
</div>

<style>
	h1 {
		font-size: 2rem;
		font-weight: bold;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 600;
	}

	section {
		padding: 2rem;
		background: #f9fafb;
		border-radius: 0.5rem;
	}
</style>

