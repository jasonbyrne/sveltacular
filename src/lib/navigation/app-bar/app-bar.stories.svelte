<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AppBar from './app-bar.svelte';

	const { Story } = defineMeta({
		component: AppBar,
		title: 'Navigation/AppBar',
		tags: ['autodocs']
	});
</script>

<Story name="TopExtraSmall" args={{ size: 'xs', position: 'top' }}>Site Header</Story>

<Story name="TopSmall" args={{ size: 'sm', position: 'top' }}>App bar content would go here</Story>

<Story name="TopMedium" args={{ size: 'md', position: 'top' }}>App bar with navigation would go here</Story>

<Story name="TopLarge" args={{ size: 'lg', position: 'top' }}>App bar with branding and navigation would go here</Story>

<Story name="TopXLarge" args={{ size: 'xl', position: 'top' }}>
	App bar with branding, breadcrumbs and navigation would go here
</Story>

<Story name="BottomExtraSmall" args={{ size: 'xs', position: 'bottom', isFixed: true }}>This is the footer</Story>

<Story name="BottomLarge" args={{ size: 'lg', position: 'bottom', isFixed: true }}>Footer navigation would go here</Story>


