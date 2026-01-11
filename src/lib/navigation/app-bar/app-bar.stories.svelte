<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AppBar from './app-bar.svelte';
	import AppLogo from './app-logo.svelte';
	import AppBranding from './app-branding.svelte';
	import AppNav from './app-nav.svelte';
	import AppNavItem from './app-nav-item.svelte';
	import Icon from '$src/lib/icons/icon.svelte';

	const { Story } = defineMeta({
		component: AppBar,
		title: 'Navigation/AppBar',
		tags: ['autodocs']
	});
</script>

<Story name="WithLogoAndNavigation" args={{ size: 'lg', position: 'top', padding: 'lg' }}>
	<AppBranding>
		<AppLogo href="/" alt="Sveltacular">
			<span style="font-size: 1.5rem; font-weight: bold; color: #0066cc;">Sveltacular</span>
		</AppLogo>
	</AppBranding>
	<AppNav align="right" spacing="loose">
		<AppNavItem href="/" title="Home">
			<Icon type="home" size="sm" />
		</AppNavItem>
		<AppNavItem href="/products" title="Products">
			<Icon type="folder-open" size="sm" />
		</AppNavItem>
		<AppNavItem href="/about" title="About">
			<Icon type="link" size="sm" />
		</AppNavItem>
		<AppNavItem href="/contact" title="Contact">
			<Icon type="envelope" size="sm" />
		</AppNavItem>
	</AppNav>
</Story>

<Story name="WithTextLogoAndNavigation" args={{ size: 'md', position: 'top', padding: 'lg' }}>
	<AppBranding>
		<AppLogo href="/" alt="MyApp">
			<span style="font-size: 1.25rem; font-weight: 700; letter-spacing: -0.5px;">MyApp</span>
		</AppLogo>
	</AppBranding>
	<AppNav align="right" spacing="medium">
		<AppNavItem href="/" title="Home" />
		<AppNavItem href="/features" title="Features" />
		<AppNavItem href="/pricing" title="Pricing" />
		<AppNavItem href="/docs" title="Documentation" />
		<AppNavItem href="/contact" title="Contact" />
	</AppNav>
</Story>

<Story name="CenteredNavigation" args={{ size: 'md', position: 'top', padding: 'lg' }}>
	<AppNav align="center" spacing="loose">
		<AppNavItem href="/" title="Home">
			<Icon type="home" size="sm" />
		</AppNavItem>
		<AppNavItem href="/shop" title="Shop" />
		<AppNavItem href="/blog" title="Blog" />
		<AppNavItem href="/about" title="About" />
		<AppNavItem href="/contact" title="Contact">
			<Icon type="envelope" size="sm" />
		</AppNavItem>
	</AppNav>
</Story>

<Story name="FullFeatured" args={{ size: 'xl', position: 'top', padding: 'lg' }}>
	<AppBranding>
		<AppLogo href="/" alt="Company Logo">
			<div style="display: flex; align-items: center; gap: 0.75rem;">
				<div
					style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.25rem;"
				>
					C
				</div>
				<div>
					<div style="font-size: 1.25rem; font-weight: 700; line-height: 1.2;">Company</div>
					<div style="font-size: 0.875rem; color: #666; line-height: 1.2;">Premium Solutions</div>
				</div>
			</div>
		</AppLogo>
	</AppBranding>
	<AppNav align="right" spacing="loose">
		<AppNavItem href="/" title="Home">
			<Icon type="home" size="sm" />
		</AppNavItem>
		<AppNavItem href="/products" title="Products">
			<Icon type="folder-open" size="sm" />
		</AppNavItem>
		<AppNavItem href="/services" title="Services" />
		<AppNavItem href="/about" title="About" />
		<AppNavItem href="/contact" title="Contact">
			<Icon type="envelope" size="sm" />
		</AppNavItem>
	</AppNav>
</Story>

<Story name="SimpleBranding" args={{ size: 'md', position: 'top', padding: 'lg' }}>
	<AppBranding>
		<span style="font-size: 1.125rem; font-weight: 600;">Brand Name</span>
	</AppBranding>
	<AppNav align="right" spacing="medium">
		<AppNavItem href="/" title="Home" />
		<AppNavItem href="/about" title="About" />
		<AppNavItem href="/contact" title="Contact" />
	</AppNav>
</Story>

<Story name="CompactNavigation" args={{ size: 'sm', position: 'top', padding: 'sm' }}>
	<AppBranding>
		<span style="font-size: 1rem; font-weight: 600;">App</span>
	</AppBranding>
	<AppNav align="right" spacing="tight">
		<AppNavItem href="/" title="Home">
			<Icon type="home" size="sm" />
		</AppNavItem>
		<AppNavItem href="/about" title="About" />
		<AppNavItem href="/contact" title="Contact">
			<Icon type="envelope" size="sm" />
		</AppNavItem>
	</AppNav>
</Story>

<Story
	name="FooterWithNavigation"
	args={{ size: 'lg', position: 'bottom', isFixed: true, padding: 'lg' }}
>
	<AppNav align="center" spacing="medium">
		<AppNavItem href="/" title="Home" />
		<AppNavItem href="/privacy" title="Privacy" />
		<AppNavItem href="/terms" title="Terms" />
		<AppNavItem href="/contact" title="Contact" />
	</AppNav>
</Story>
