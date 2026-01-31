import{p as L,f as c,a as h,t as B,b as m,s as e,e as s,c as R}from"./iframe-D7RYvwF5.js";import{c as F}from"./create-runtime-stories-z04xijIr.js";import{d as W}from"./index-CU8YG541.js";import{I as a}from"./icon-v8TPefiR.js";import{i as G}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";const H=["angle-right","angle-up","angle-left","angle-down","arrow-left","arrow-right","check","clipboard","close","copy","download","edit","envelope","envelope-full","export","eye","folder-open","hamburger","heart","heart-full","home","home-full","import","info","link","minus","mobile-phone","phone","plus","print","search","settings","star","star-full","trash","upload","user","warning"],O={component:a,title:"Icons/Icon",tags:["autodocs"],argTypes:{type:{control:"select",options:H,description:"Type-safe icon type for built-in SVG icons",table:{type:{summary:"IconType"},defaultValue:{summary:"undefined"}}},src:{control:"text",description:"URL to external icon/image (overrides type if both provided)",table:{type:{summary:"string"},defaultValue:{summary:"undefined"}}},mask:{control:"boolean",description:"Use CSS mask mode (uses theme foreground color by default)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},variant:{control:"select",options:["primary","secondary"],description:"Icon variant",table:{type:{summary:"IconVariant"},defaultValue:{summary:"primary"}}},fill:{control:"color",description:"Custom fill color (overrides theme color when mask is true)",table:{type:{summary:"string"},defaultValue:{summary:"var(--base-color-fg)"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Icon size bucket",table:{type:{summary:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'md'"}}},class:{control:"text",description:"Additional CSS classes",table:{type:{summary:"string"},defaultValue:{summary:"''"}}}},args:{type:"home",mask:!0,size:"md"},parameters:{docs:{description:{component:`Unified Icon component for displaying SVG icons and external images.

**Accessibility**: Icons use \`aria-hidden="true"\` by default as they are typically decorative.
If an icon conveys meaningful information without accompanying text, consider adding an \`aria-label\`
to the parent element.

**Usage**:
\`\`\`svelte
<!-- Built-in icon type -->
<Icon type="home" size="md" />

<!-- External image with mask (default) -->
<Icon src="/path/to/icon.svg" />

<!-- Custom fill color -->
<Icon type="check" fill="#00ff00" />

<!-- Non-mask mode for colored icons -->
<Icon type="home" mask={false} />
\`\`\``}}}},{Story:p}=W();var j=c('<div style="display: flex; align-items: center; gap: 2rem; padding: 2rem;"><div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><!> <span style="font-size: 0.75rem;">xs (12px)</span></div> <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><!> <span style="font-size: 0.75rem;">sm (16px)</span></div> <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><!> <span style="font-size: 0.75rem;">md (20px)</span></div> <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><!> <span style="font-size: 0.75rem;">lg (24px)</span></div> <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><!> <span style="font-size: 0.75rem;">xl (32px)</span></div></div>'),q=c('<div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;"><!> <!> <!> <!></div> Icons in mask mode (default) use the theme foreground color, adapting automatically to light/dark themes.',1),J=c('<div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;"><!> <!> <!> <!></div> Icons in non-mask mode render SVG directly with currentColor, allowing for more complex styling.',1),K=c('<div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;"><!> <!> <!> <!></div> Icons with custom fill colors override the theme color in mask mode.',1),Q=c('<div style="padding: 2rem;"><!> <p style="margin-top: 1rem; color: var(--gray-600);">External image via src prop. Use a relative path or full URL.</p></div>'),X=c('<div style="padding: 2rem;"><!> <p style="margin-top: 1rem; color: var(--gray-600);">External image with mask mode enabled (default). Uses theme foreground color.</p></div>'),Y=c('<div style="padding: 2rem;"><!> <p style="margin-top: 1rem; color: var(--gray-600);">External image without mask mode. Renders as a standard img tag.</p></div>'),Z=c(`<div style="padding: 2rem;"><p style="margin-bottom: 1rem;">Icons automatically adapt to theme colors:</p> <div style="display: flex; gap: 2rem; margin-bottom: 2rem;"><!> <!> <!> <!></div> <p style="color: var(--gray-600); font-size: 0.875rem;">In mask mode, icons use var(--base-color-fg) which changes based on the active theme. Toggle
			dark mode in Storybook to see the adaptation.</p></div>`),ee=c('<div style="padding: 2rem;"><div style="display: flex; flex-direction: column; gap: 1rem;"><div style="display: flex; align-items: center; gap: 0.5rem;"><!> <span>Home</span></div> <div style="display: flex; align-items: center; gap: 0.5rem;"><!> <span>Phone</span></div> <div style="display: flex; align-items: center; gap: 0.5rem;"><!> <span>Email</span></div> <div style="display: flex; align-items: center; gap: 0.5rem;"><!> <span>Success</span></div></div></div>'),ae=c('<div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap;"><button type="button" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: var(--base-color-bg); cursor: pointer;"><!> <span>Home</span></button> <button type="button" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: var(--base-color-bg); cursor: pointer;"><!> <span>Call</span></button> <button type="button" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: var(--base-color-bg); cursor: pointer;"><!> <span>Upload</span></button></div>'),ne=c('<div style="padding: 2rem;"><div style="display: flex; flex-direction: column; gap: 2rem;"><div style="display: flex; align-items: center; gap: 1rem;"><!> <span>Extra Small (xs) - 12px</span></div> <div style="display: flex; align-items: center; gap: 1rem;"><!> <span>Small (sm) - 16px</span></div> <div style="display: flex; align-items: center; gap: 1rem;"><!> <span>Medium (md) - 20px - Default</span></div> <div style="display: flex; align-items: center; gap: 1rem;"><!> <span>Large (lg) - 24px</span></div> <div style="display: flex; align-items: center; gap: 1rem;"><!> <span>Extra Large (xl) - 32px</span></div></div></div>'),se=c("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function U(V,N){L(N,!1),G();var I=se(),z=h(I);p(z,{name:"Default",args:{type:"home"},children:(t,g)=>{var n=B('Default icon with type="home" using mask mode (default) and medium size.');m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
  Default icon with type="home" using mask mode (default) and medium size.
</Icon>`}}});var k=e(z,2);p(k,{name:"Sizes",children:(t,g)=>{var n=j(),r=s(n),o=s(r);a(o,{type:"home",size:"xs"});var i=e(r,2),l=s(i);a(l,{type:"home",size:"sm"});var d=e(i,2),y=s(d);a(y,{type:"home",size:"md"});var f=e(d,2),u=s(f);a(u,{type:"home",size:"lg"});var x=e(f,2),_=s(x);a(_,{type:"home",size:"xl"}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="display: flex; align-items: center; gap: 2rem; padding: 2rem;">
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
	<Icon type="home" size="xs" />
	<span style="font-size: 0.75rem;">xs (12px)</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
	<Icon type="home" size="sm" />
	<span style="font-size: 0.75rem;">sm (16px)</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
	<Icon type="home" size="md" />
	<span style="font-size: 0.75rem;">md (20px)</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
	<Icon type="home" size="lg" />
	<span style="font-size: 0.75rem;">lg (24px)</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
	<Icon type="home" size="xl" />
	<span style="font-size: 0.75rem;">xl (32px)</span>
</div>
</div>
 </Icon>`}}});var b=e(k,2);p(b,{name:"MaskMode",args:{mask:!0},children:(t,g)=>{var n=q(),r=h(n),o=s(r);a(o,{type:"check",size:"lg",mask:!0});var i=e(o,2);a(i,{type:"home",size:"lg",mask:!0});var l=e(i,2);a(l,{type:"phone",size:"lg",mask:!0});var d=e(l,2);a(d,{type:"envelope",size:"lg",mask:!0}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;">
<Icon type="check" size="lg" mask={true} />
<Icon type="home" size="lg" mask={true} />
<Icon type="phone" size="lg" mask={true} />
<Icon type="envelope" size="lg" mask={true} />
</div>
Icons in mask mode (default) use the theme foreground color, adapting automatically to light/dark themes.
 </Icon>`}}});var $=e(b,2);p($,{name:"NonMaskMode",args:{mask:!1},children:(t,g)=>{var n=J(),r=h(n),o=s(r);a(o,{type:"check",size:"lg",mask:!1});var i=e(o,2);a(i,{type:"home",size:"lg",mask:!1});var l=e(i,2);a(l,{type:"phone",size:"lg",mask:!1});var d=e(l,2);a(d,{type:"envelope",size:"lg",mask:!1}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;">
<Icon type="check" size="lg" mask={false} />
<Icon type="home" size="lg" mask={false} />
<Icon type="phone" size="lg" mask={false} />
<Icon type="envelope" size="lg" mask={false} />
</div>
Icons in non-mask mode render SVG directly with currentColor, allowing for more complex styling.
 </Icon>`}}});var C=e($,2);p(C,{name:"CustomFill",children:(t,g)=>{var n=K(),r=h(n),o=s(r);a(o,{type:"check",size:"lg",fill:"#48bb78"});var i=e(o,2);a(i,{type:"home",size:"lg",fill:"#4299e1"});var l=e(i,2);a(l,{type:"phone",size:"lg",fill:"#ed8936"});var d=e(l,2);a(d,{type:"envelope",size:"lg",fill:"#f56565"}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;">
<Icon type="check" size="lg" fill="#48bb78" />
<Icon type="home" size="lg" fill="#4299e1" />
<Icon type="phone" size="lg" fill="#ed8936" />
<Icon type="envelope" size="lg" fill="#f56565" />
</div>
Icons with custom fill colors override the theme color in mask mode.
 </Icon>`}}});var w=e(C,2);p(w,{name:"ExternalImage",children:(t,g)=>{var n=Q(),r=s(n);a(r,{src:"/icons/envelope.svg",size:"lg"}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="padding: 2rem;">
<Icon src="/icons/envelope.svg" size="lg" />
<p style="margin-top: 1rem; color: var(--gray-600);">
	External image via src prop. Use a relative path or full URL.
</p>
</div>
 </Icon>`}}});var M=e(w,2);p(M,{name:"ExternalImageMasked",args:{src:"/icons/envelope.svg",mask:!0},children:(t,g)=>{var n=X(),r=s(n);a(r,{src:"/icons/envelope.svg",size:"lg",mask:!0}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="padding: 2rem;">
<Icon src="/icons/envelope.svg" size="lg" mask={true} />
<p style="margin-top: 1rem; color: var(--gray-600);">
	External image with mask mode enabled (default). Uses theme foreground color.
</p>
</div>
 </Icon>`}}});var E=e(M,2);p(E,{name:"ExternalImageNonMasked",args:{src:"/icons/envelope.svg",mask:!1},children:(t,g)=>{var n=Y(),r=s(n);a(r,{src:"/icons/envelope.svg",size:"lg",mask:!1}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="padding: 2rem;">
<Icon src="/icons/envelope.svg" size="lg" mask={false} />
<p style="margin-top: 1rem; color: var(--gray-600);">
	External image without mask mode. Renders as a standard img tag.
</p>
</div>
 </Icon>`}}});var S=e(E,2);p(S,{name:"ThemeAdaptation",children:(t,g)=>{var n=Z(),r=e(s(n),2),o=s(r);a(o,{type:"home",size:"lg"});var i=e(o,2);a(i,{type:"check",size:"lg"});var l=e(i,2);a(l,{type:"phone",size:"lg"});var d=e(l,2);a(d,{type:"envelope",size:"lg"}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="padding: 2rem;">
<p style="margin-bottom: 1rem;">Icons automatically adapt to theme colors:</p>
<div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
	<Icon type="home" size="lg" />
	<Icon type="check" size="lg" />
	<Icon type="phone" size="lg" />
	<Icon type="envelope" size="lg" />
</div>
<p style="color: var(--gray-600); font-size: 0.875rem;">
	In mask mode, icons use var(--base-color-fg) which changes based on the active theme. Toggle
	dark mode in Storybook to see the adaptation.
</p>
</div>
 </Icon>`}}});var T=e(S,2);p(T,{name:"WithText",children:(t,g)=>{var n=ee(),r=s(n),o=s(r),i=s(o);a(i,{type:"home",size:"sm"});var l=e(o,2),d=s(l);a(d,{type:"phone",size:"sm"});var y=e(l,2),f=s(y);a(f,{type:"envelope",size:"sm"});var u=e(y,2),x=s(u);a(x,{type:"check",size:"sm"}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="padding: 2rem;">
<div style="display: flex; flex-direction: column; gap: 1rem;">
	<div style="display: flex; align-items: center; gap: 0.5rem;">
		<Icon type="home" size="sm" />
		<span>Home</span>
	</div>
	<div style="display: flex; align-items: center; gap: 0.5rem;">
		<Icon type="phone" size="sm" />
		<span>Phone</span>
	</div>
	<div style="display: flex; align-items: center; gap: 0.5rem;">
		<Icon type="envelope" size="sm" />
		<span>Email</span>
	</div>
	<div style="display: flex; align-items: center; gap: 0.5rem;">
		<Icon type="check" size="sm" />
		<span>Success</span>
	</div>
</div>
</div>
 </Icon>`}}});var P=e(T,2);p(P,{name:"ButtonIcons",children:(t,g)=>{var n=ae(),r=s(n),o=s(r);a(o,{type:"home",size:"sm"});var i=e(r,2),l=s(i);a(l,{type:"phone",size:"sm"});var d=e(i,2),y=s(d);a(y,{type:"upload",size:"sm"}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap;">
<button
	type="button"
	style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: var(--base-color-bg); cursor: pointer;"
>
	<Icon type="home" size="sm" />
	<span>Home</span>
</button>
<button
	type="button"
	style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: var(--base-color-bg); cursor: pointer;"
>
	<Icon type="phone" size="sm" />
	<span>Call</span>
</button>
<button
	type="button"
	style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--radius-md); background: var(--base-color-bg); cursor: pointer;"
>
	<Icon type="upload" size="sm" />
	<span>Upload</span>
</button>
</div>
 </Icon>`}}});var D=e(P,2);p(D,{name:"SizeComparison",children:(t,g)=>{var n=ne(),r=s(n),o=s(r),i=s(o);a(i,{type:"home",size:"xs"});var l=e(o,2),d=s(l);a(d,{type:"home",size:"sm"});var y=e(l,2),f=s(y);a(f,{type:"home",size:"md"});var u=e(y,2),x=s(u);a(x,{type:"home",size:"lg"});var _=e(u,2),A=s(_);a(A,{type:"home",size:"xl"}),m(t,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Icon {...args}>
   <div style="padding: 2rem;">
<div style="display: flex; flex-direction: column; gap: 2rem;">
	<div style="display: flex; align-items: center; gap: 1rem;">
		<Icon type="home" size="xs" />
		<span>Extra Small (xs) - 12px</span>
	</div>
	<div style="display: flex; align-items: center; gap: 1rem;">
		<Icon type="home" size="sm" />
		<span>Small (sm) - 16px</span>
	</div>
	<div style="display: flex; align-items: center; gap: 1rem;">
		<Icon type="home" size="md" />
		<span>Medium (md) - 20px - Default</span>
	</div>
	<div style="display: flex; align-items: center; gap: 1rem;">
		<Icon type="home" size="lg" />
		<span>Large (lg) - 24px</span>
	</div>
	<div style="display: flex; align-items: center; gap: 1rem;">
		<Icon type="home" size="xl" />
		<span>Extra Large (xl) - 32px</span>
	</div>
</div>
</div>
 </Icon>`}}}),m(V,I),R()}U.__docgen={data:[],name:"icon.stories.svelte"};const v=F(U,O),ve=["Default","Sizes","MaskMode","NonMaskMode","CustomFill","ExternalImage","ExternalImageMasked","ExternalImageNonMasked","ThemeAdaptation","WithText","ButtonIcons","SizeComparison"],ge={...v.Default,tags:["svelte-csf-v5"]},ye={...v.Sizes,tags:["svelte-csf-v5"]},fe={...v.MaskMode,tags:["svelte-csf-v5"]},ue={...v.NonMaskMode,tags:["svelte-csf-v5"]},xe={...v.CustomFill,tags:["svelte-csf-v5"]},he={...v.ExternalImage,tags:["svelte-csf-v5"]},_e={...v.ExternalImageMasked,tags:["svelte-csf-v5"]},Ie={...v.ExternalImageNonMasked,tags:["svelte-csf-v5"]},ze={...v.ThemeAdaptation,tags:["svelte-csf-v5"]},ke={...v.WithText,tags:["svelte-csf-v5"]},be={...v.ButtonIcons,tags:["svelte-csf-v5"]},$e={...v.SizeComparison,tags:["svelte-csf-v5"]};export{be as ButtonIcons,xe as CustomFill,ge as Default,he as ExternalImage,_e as ExternalImageMasked,Ie as ExternalImageNonMasked,fe as MaskMode,ue as NonMaskMode,$e as SizeComparison,ye as Sizes,ze as ThemeAdaptation,ke as WithText,ve as __namedExportsOrder,O as default};
