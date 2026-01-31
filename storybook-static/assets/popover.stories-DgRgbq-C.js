import{p as C,f as b,a as x,t as l,b as r,g as s,d as i,s as g,c as T}from"./iframe-D7RYvwF5.js";import{c as R}from"./create-runtime-stories-z04xijIr.js";import{d as B}from"./index-CU8YG541.js";import{P as L}from"./popover-QM0nJ1W5.js";import{B as A}from"./button-BYNa-MSv.js";import{i as W}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";import"./this-p55_KPOp.js";import"./unique-id-JjuMjhtj.js";import"./index-Bt-Xh7oU.js";import"./use-position.svelte-BiO9WjIV.js";import"./spinner-Cpf7SZnL.js";import"./icon-v8TPefiR.js";const a=d=>{A(d,{children:(v,h)=>{var c=l("Click me");r(v,c)},$$slots:{default:!0}})},S={component:L,title:"Generic/Popover",tags:["autodocs"],argTypes:{open:{control:"boolean",description:"Whether the popover is open",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},position:{control:"select",options:["top","bottom","left","right"],description:"Basic position of the popover (used when placement is not specified)",table:{type:{summary:"'top' | 'bottom' | 'left' | 'right'"},defaultValue:{summary:"'bottom'"}}},placement:{control:"select",options:["top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end"],description:"Precise placement of the popover (overrides position when set)",table:{type:{summary:"Placement | undefined"}}},autoPosition:{control:"boolean",description:"Enable smart positioning that adjusts to stay within viewport",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},arrow:{control:"boolean",description:"Show arrow pointing to trigger element",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},offset:{control:"number",description:"Offset distance from trigger element in pixels",table:{type:{summary:"number"},defaultValue:{summary:"8"}}}},parameters:{docs:{description:{component:`Popover component for displaying floating content that can be opened and closed.

**Accessibility**: Popovers support keyboard navigation (Enter/Space to toggle,
Escape to close). Click outside to close. Uses smart positioning to stay within
viewport bounds.

**Usage**:
\`\`\`svelte
<Popover bind:open={isOpen} position="bottom">
  {#snippet trigger()}
    <Button>Open popover</Button>
  {/snippet}
  {#snippet children()}
    <div>Popover content</div>
  {/snippet}
</Popover>
\`\`\``}}}},{Story:p}=B();var V=b('<div style="padding: 1rem; min-width: 200px;"><h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Popover Title</h3> <p style="margin: 0; color: #666; font-size: 0.875rem;">This is rich content inside the popover. You can include any HTML or components here.</p></div>'),z=b("<!> <!> <!> <!> <!> <!> <!>",1);function w(d,v){C(v,!1),W();var h=z(),c=x(h);{let e=i(()=>({position:"bottom",trigger:a}));p(c,{name:"Bottom",get args(){return s(e)},children:(t,n)=>{var o=l("Popover positioned below the trigger element.");r(t,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Popover {...args}>
  Popover positioned below the trigger element.
</Popover>`}}})}var f=g(c,2);{let e=i(()=>({position:"top",trigger:a}));p(f,{name:"Top",get args(){return s(e)},children:(t,n)=>{var o=l("Popover positioned above the trigger element.");r(t,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Popover {...args}>
  Popover positioned above the trigger element.
</Popover>`}}})}var u=g(f,2);{let e=i(()=>({position:"left",trigger:a}));p(u,{name:"Left",get args(){return s(e)},children:(t,n)=>{var o=l("Popover positioned to the left of the trigger element.");r(t,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Popover {...args}>
  Popover positioned to the left of the trigger element.
</Popover>`}}})}var P=g(u,2);{let e=i(()=>({position:"right",trigger:a}));p(P,{name:"Right",get args(){return s(e)},children:(t,n)=>{var o=l("Popover positioned to the right of the trigger element.");r(t,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Popover {...args}>
  Popover positioned to the right of the trigger element.
</Popover>`}}})}var _=g(P,2);{let e=i(()=>({position:"bottom",arrow:!0,trigger:a}));p(_,{name:"WithArrow",get args(){return s(e)},children:(t,n)=>{var o=l("Popover with arrow pointing to the trigger element.");r(t,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Popover {...args}>
  Popover with arrow pointing to the trigger element.
</Popover>`}}})}var $=g(_,2);{let e=i(()=>({placement:"bottom-start",trigger:a}));p($,{name:"PrecisePlacement",get args(){return s(e)},children:(t,n)=>{var o=l("Popover with precise placement (bottom-start alignment).");r(t,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Popover {...args}>
  Popover with precise placement (bottom-start alignment).
</Popover>`}}})}var y=g($,2);{const e=n=>{var o=V();r(n,o)};let t=i(()=>({position:"bottom",trigger:a}));p(y,{name:"RichContent",get args(){return s(t)},children:e,$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Popover {...args}>
   {#snippet children()}
<div style="padding: 1rem; min-width: 200px;">
	<h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Popover Title</h3>
	<p style="margin: 0; color: #666; font-size: 0.875rem;">
		This is rich content inside the popover. You can include any HTML or components here.
	</p>
</div>
{/snippet}
 </Popover>`}}})}r(d,h),T()}w.__docgen={data:[],name:"popover.stories.svelte"};const m=R(w,S),Q=["Bottom","Top","Left","Right","WithArrow","PrecisePlacement","RichContent"],X={...m.Bottom,tags:["svelte-csf-v5"]},Z={...m.Top,tags:["svelte-csf-v5"]},ee={...m.Left,tags:["svelte-csf-v5"]},te={...m.Right,tags:["svelte-csf-v5"]},oe={...m.WithArrow,tags:["svelte-csf-v5"]},re={...m.PrecisePlacement,tags:["svelte-csf-v5"]},ne={...m.RichContent,tags:["svelte-csf-v5"]};export{X as Bottom,ee as Left,re as PrecisePlacement,ne as RichContent,te as Right,Z as Top,oe as WithArrow,Q as __namedExportsOrder,S as default};
