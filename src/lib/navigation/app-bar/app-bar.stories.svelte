<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import AppBar from './app-bar.svelte';
	import AppLogo from './app-logo.svelte';
	import AppNav from './app-nav.svelte';
	import AppNavItem from './app-nav-item.svelte';
	import Icon from '$src/lib/images/icon.svelte';
	import AppBranding from './app-branding.svelte';
	import Breadcrumbs from '../breadcrumbs/breadcrumbs.svelte';

	const crumbs = [
		{ label: 'Search', href: 'https://www.google.com' },
		{ label: 'Search Term', href: 'https://www.google.com' },
		'Results'
	];
</script>

<Meta title="Navigation/AppBar" component={AppBar} />

<Story name="Top (Extra Small)">
	<AppBar size="xs" position="top">
		<strong>Site Header</strong>
	</AppBar>
</Story>

<Story name="Top (Small)">
	<AppBar size="sm" position="top">
		<AppLogo src="/assets/sveltacular-transparent.png" alt="Sveltacular" href="/" />
		<div>sdfasd</div>
	</AppBar>
</Story>

<Story name="Top (Medium)">
	<AppBar size="md" position="top">
		<AppLogo src="/assets/sveltacular-transparent.png" alt="Sveltacular" href="/" />
		<AppNav>
			<AppNavItem href="/about" title="About" />
			<AppNavItem href="/contact" title="Contact" />
		</AppNav>
	</AppBar>
</Story>

<Story name="Top (Large)">
	<AppBar size="lg" position="top">
		<AppBranding>
			<AppLogo src="/assets/sveltacular-transparent.png" alt="Sveltacular" href="/" />
		</AppBranding>
		<AppNav>
			<AppNavItem href="/about" title="About">
				<Icon href="/assets/icons/question.svg" />
			</AppNavItem>
			<AppNavItem href="/contact" title="Contact">
				<Icon href="/assets/icons/envelope.svg" />
			</AppNavItem>
		</AppNav>
	</AppBar>
</Story>

<Story name="Top (X-Large)">
	<AppBar size="xl" position="top">
		<AppBranding>
			<AppLogo src="/assets/sveltacular-transparent.png" alt="Sveltacular" href="/" />
			<Breadcrumbs homeUrl="https://www.google.com" {crumbs} size="md" />
		</AppBranding>
		<AppNav spacing="loose">
			<AppNavItem href="/about" title="About">
				<Icon href="/assets/icons/question.svg" />
			</AppNavItem>
			<AppNavItem href="/contact" title="Contact">
				<Icon href="/assets/icons/envelope.svg" />
			</AppNavItem>
		</AppNav>
	</AppBar>
</Story>

<Story name="Bottom (Extra Small)">
	<AppBar size="xs" position="bottom" isFixed={true}>This is the footer</AppBar>
</Story>

<Story name="Bottom (Large)">
	<AppBar size="lg" position="bottom" isFixed={true}>
		<AppNav align="center" spacing="space-evenly">
			<AppNavItem href="/about" title="About">
				<Icon href="/assets/icons/question.svg" />
			</AppNavItem>
			<AppNavItem href="/contact" title="Contact">
				<Icon href="/assets/icons/envelope.svg" />
			</AppNavItem>
		</AppNav>
	</AppBar>
</Story>
