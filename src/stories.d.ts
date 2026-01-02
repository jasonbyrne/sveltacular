// Type declarations for Storybook Svelte CSF addon
// The 'snippet' template tag is provided by @storybook/addon-svelte-csf at runtime
declare const snippet: <T = any>(
	strings: TemplateStringsArray,
	...values: any[]
) => import('svelte').Snippet<T>;

// Module declaration for @storybook/addon-svelte-csf
declare module '@storybook/addon-svelte-csf' {
	export function defineMeta(config: any): { Story: any };
}
