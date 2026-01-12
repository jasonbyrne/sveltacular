<script lang="ts">
	/**
	 * Theme Provider Demo Component
	 *
	 * Demonstrates theme switching functionality with example components.
	 */
	import ThemeProvider from './theme-provider.svelte';
	import { useTheme } from '$lib/helpers/theme.svelte';
	import Button from '$lib/forms/button/button.svelte';
	import Card from '$lib/generic/card/card.svelte';
	import Badge from '$lib/generic/badge/badge.svelte';
	import Notice from '$lib/generic/notice/notice.svelte';
	import TextBox from '$lib/forms/text-box/text-box.svelte';
	import TextArea from '$lib/forms/text-area/text-area.svelte';
	import CheckBox from '$lib/forms/check-box/check-box.svelte';
	import BoolBox from '$lib/forms/bool-box/bool-box.svelte';

	const theme = useTheme();

	let textValue = $state('');
	let textAreaValue = $state('This is a sample text area content...');
	let checked = $state(false);
	let switchOn = $state(true);
</script>

<ThemeProvider>
	<div style="padding: 2rem; min-height: 600px;">
		<!-- Theme Control Panel -->
		<Card>
			<div style="padding: 1.5rem; margin-bottom: 2rem;">
				<h2 style="margin-top: 0; margin-bottom: 1rem;">Theme Controls</h2>

				<div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
					<Button
						variant={theme.current === 'light' ? 'primary' : 'outline'}
						onClick={() => theme.set('light')}
					>
						☀️ Light
					</Button>
					<Button
						variant={theme.current === 'dark' ? 'primary' : 'outline'}
						onClick={() => theme.set('dark')}
					>
						🌙 Dark
					</Button>
					<Button
						variant={theme.current === 'system' ? 'primary' : 'outline'}
						onClick={() => theme.set('system')}
					>
						💻 System
					</Button>
					<Button variant="secondary" onClick={() => theme.toggle()}>🔄 Toggle</Button>
				</div>

				<div style="display: flex; gap: 1rem; font-size: 0.875rem; color: var(--base-accent-fg);">
					<div>
						<strong>Current:</strong>
						{theme.current}
					</div>
					<div>
						<strong>Resolved:</strong>
						{theme.resolved}
					</div>
					<div>
						<strong>Is Dark:</strong>
						{theme.isDark}
					</div>
				</div>
			</div>
		</Card>

		<!-- Component Showcase -->
		<h3 style="margin-bottom: 1rem;">Component Examples in Current Theme</h3>

		<div style="display: grid; gap: 1.5rem;">
			<!-- Buttons -->
			<Card>
				<div style="padding: 1.5rem;">
					<h4 style="margin-top: 0; margin-bottom: 1rem;">Buttons</h4>
					<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
						<Button variant="primary">Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="positive">Positive</Button>
						<Button variant="danger">Danger</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="link">Link</Button>
					</div>
				</div>
			</Card>

			<!-- Badges -->
			<Card>
				<div style="padding: 1.5rem;">
					<h4 style="margin-top: 0; margin-bottom: 1rem;">Badges</h4>
					<div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
						<Badge variant="standard" count={5} />
						<Badge variant="positive" count={3} />
						<Badge variant="negative" count={12} />
						<Badge variant="warning" count={7} />
					</div>
				</div>
			</Card>

			<!-- Notices -->
			<Card>
				<div style="padding: 1.5rem;">
					<h4 style="margin-top: 0; margin-bottom: 1rem;">Notices</h4>
					<div style="display: grid; gap: 0.75rem;">
						<Notice variant="info">This is an informational message.</Notice>
						<Notice variant="success">Operation completed successfully!</Notice>
						<Notice variant="attention">Please review your changes carefully.</Notice>
						<Notice variant="error">An error occurred while processing your request.</Notice>
					</div>
				</div>
			</Card>

			<!-- Form Inputs -->
			<Card>
				<div style="padding: 1.5rem;">
					<h4 style="margin-top: 0; margin-bottom: 1rem;">Form Inputs</h4>
					<div style="display: grid; gap: 1rem; max-width: 500px;">
						<TextBox bind:value={textValue} label="Text Input" placeholder="Enter some text..." />

						<TextArea bind:value={textAreaValue} label="Text Area" rows={4} />

						<CheckBox bind:isChecked={checked} label="Check Box Option" />

						<BoolBox
							variant="switch"
							bind:value={switchOn}
							options={['On', 'Off']}
							label="Switch Option"
						/>
					</div>
				</div>
			</Card>

			<!-- Typography -->
			<Card>
				<div style="padding: 1.5rem;">
					<h4 style="margin-top: 0; margin-bottom: 1rem;">Typography</h4>
					<p style="margin-bottom: 0.5rem;">
						This is regular text using the base foreground color.
					</p>
					<p style="margin-bottom: 0.5rem;">
						<button
							type="button"
							style="background: none; border: none; padding: 0; color: var(--base-link-fg); text-decoration: underline; cursor: pointer; font: inherit;"
							onclick={() => {}}
						>
							This is a link
						</button> with proper link styling.
					</p>
					<p style="margin-bottom: 0; color: var(--base-accent-fg); font-size: 0.875rem;">
						This is accent text using a muted color.
					</p>
				</div>
			</Card>
		</div>
	</div>
</ThemeProvider>
