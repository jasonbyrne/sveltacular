import{p as ct,f,a as ut,t as d,b as t,e as m,s as o,c as mt}from"./iframe-D7RYvwF5.js";import{c as vt}from"./create-runtime-stories-z04xijIr.js";import{d as $t}from"./index-CU8YG541.js";import{T as n}from"./tooltip-BmMjxRoK.js";import{B as p}from"./button-BYNa-MSv.js";import{B as ot}from"./badge-Dj1iWtG5.js";import{L as gt}from"./link-ChNHN7sj.js";import{i as ft}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";import"./this-p55_KPOp.js";import"./unique-id-JjuMjhtj.js";import"./use-position.svelte-BiO9WjIV.js";import"./spinner-Cpf7SZnL.js";import"./icon-v8TPefiR.js";const ht={component:n,title:"Generic/Tooltip",tags:["autodocs"],argTypes:{title:{control:"text",description:"Optional title text displayed above the main text",table:{type:{summary:"string | undefined"}}},text:{control:"text",description:"Main tooltip text content",table:{type:{summary:"string | undefined"}}},content:{control:"object",description:"Optional snippet for custom rich content",table:{type:{summary:"Snippet | undefined"}}},placement:{control:"select",options:["top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end"],description:"Position of the tooltip relative to trigger",table:{type:{summary:"Placement"},defaultValue:{summary:"'top'"}}},trigger:{control:"select",options:["hover","focus","click","manual"],description:"How the tooltip is triggered",table:{type:{summary:"'hover' | 'focus' | 'click' | 'manual'"},defaultValue:{summary:"'hover'"}}},arrow:{control:"boolean",description:"Show arrow pointing to trigger",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},openDelay:{control:"number",description:"Delay in ms before showing tooltip",table:{type:{summary:"number"},defaultValue:{summary:"0"}}},closeDelay:{control:"number",description:"Delay in ms before hiding tooltip",table:{type:{summary:"number"},defaultValue:{summary:"0"}}},open:{control:"boolean",description:"Controlled open state (for manual trigger mode)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Whether the tooltip is disabled",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},offset:{control:"number",description:"Offset distance from trigger element in pixels",table:{type:{summary:"number"},defaultValue:{summary:"8"}}}},parameters:{docs:{description:{component:`Tooltip component for displaying contextual information on hover, focus, or click.

**Accessibility**: Tooltips are properly positioned and include ARIA attributes.
Supports keyboard navigation (Tab to focus, Escape to close). The component
automatically hides when content is empty or whitespace-only.

**Usage**:
\`\`\`svelte
<Tooltip text="Helpful information">
  <Button>Hover me</Button>
</Tooltip>
\`\`\``}}}},{Story:_}=$t();var yt=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!></div>'),xt=f('<div style="padding: 100px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;"><div><h4 style="margin-bottom: 1rem;">Top</h4> <div style="display: flex; flex-direction: column; gap: 0.5rem;"><!> <!> <!></div></div> <div><h4 style="margin-bottom: 1rem;">Bottom</h4> <div style="display: flex; flex-direction: column; gap: 0.5rem;"><!> <!> <!></div></div> <div><h4 style="margin-bottom: 1rem;">Left</h4> <div style="display: flex; flex-direction: column; gap: 0.5rem;"><!> <!> <!></div></div> <div><h4 style="margin-bottom: 1rem;">Right</h4> <div style="display: flex; flex-direction: column; gap: 0.5rem;"><!> <!> <!></div></div></div>'),_t=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!></div>'),Tt=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!></div>'),bt=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!> <p style="margin-left: 2rem; color: #666;">Click the button to toggle. Click outside or press Escape to close.</p></div>'),wt=f('<div style="padding: 60px; text-align: center;"><p style="margin-bottom: 1rem; color: #666;">Manual mode allows you to control the tooltip programmatically via the <code style="background: #f0f0f0; padding: 0.125rem 0.25rem; border-radius: 0.25rem;">open</code> prop.</p> <p style="color: #666;">Use <code style="background: #f0f0f0; padding: 0.125rem 0.25rem; border-radius: 0.25rem;">bind:open</code> to control the state from a parent component.</p> <div style="margin-top: 2rem;"><!></div></div>'),Bt=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!> <p style="margin-left: 2rem; color: #666;">Tooltip appears after 500ms delay</p></div>'),Pt=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!> <p style="margin-left: 2rem; color: #666;">Tooltip closes after 500ms delay</p></div>'),Ct=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!> <p style="margin-left: 2rem; color: #666;">300ms delay for both open and close</p></div>'),kt=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!></div>'),Dt=f('<div style="padding: 100px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; place-items: center;"><!> <!> <!> <!></div>'),At=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;"><!> <!> <!></div>'),Wt=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!></div>'),zt=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!></div>'),Lt=f('<div style="text-align: left;"><strong style="display: block; margin-bottom: 0.25rem;">Pro Tip!</strong> <span>Use <code style="background: rgba(255,255,255,0.2); padding: 0 0.25rem; border-radius: 2px;">Ctrl+K</code> to open command palette</span></div>'),St=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!></div>'),Rt=f('<div style="text-align: left;"><strong style="display: block; margin-bottom: 0.5rem;">Features:</strong> <ul style="margin: 0; padding-left: 1.25rem; line-height: 1.6;"><li>Smart positioning</li> <li>Multiple triggers</li> <li>Rich content</li> <li>Accessible</li></ul></div>'),jt=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!></div>'),Et=f(`<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;"><!> <p style="margin-left: 2rem; color: #666;">Tooltip is disabled and won't appear</p></div>`),Ft=f('<span style="text-decoration: underline dotted; cursor: help;">Hover me</span>'),Ht=f('<div style="padding: 60px; display: flex; gap: 2rem; justify-content: center; align-items: center;"><!> <!> <!> <!></div>'),Nt=f('<div style="position: relative; height: 400px;"><div style="position: absolute; top: 10px; left: 10px;"><!></div> <div style="position: absolute; top: 10px; right: 10px;"><!></div> <div style="position: absolute; bottom: 10px; left: 10px;"><!></div> <div style="position: absolute; bottom: 10px; right: 10px;"><!></div></div>'),Ot=f('<div style="padding: 60px; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;"><!> <!> <!> <!> <!></div>'),Mt=f('<div style="padding: 60px;"><div style="text-align: center; margin-bottom: 2rem;"><p style="color: #666; margin-bottom: 0.5rem;">Use <kbd style="background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 0.25rem; border: 1px solid #ccc;">Tab</kbd> to navigate, <kbd style="background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 0.25rem; border: 1px solid #ccc;">Escape</kbd> to close</p></div> <div style="display: flex; gap: 1rem; justify-content: center;"><!> <!> <!></div></div>'),Vt=f('<div style="padding: 60px;"><div style="text-align: center; margin-bottom: 2rem;"><p style="color: #666;">These tooltips have no content and should NOT appear when triggered:</p></div> <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;"><!> <!> <!></div></div>'),It=f('<span style="display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: #6b7280; color: white; font-size: 12px; cursor: help;">?</span>'),Kt=f('<span style="display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: #6b7280; color: white; font-size: 12px; cursor: help;">?</span>'),Ut=f('<span style="display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: #6b7280; color: white; font-size: 12px; cursor: help;">?</span>'),qt=f('<div style="padding: 60px; max-width: 400px; margin: 0 auto;"><form style="display: flex; flex-direction: column; gap: 1.5rem;"><div><label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 500;">Email Address <!></label> <input type="email" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="you@example.com"/></div> <div><label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 500;">Password <!></label> <input type="password" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="••••••••"/></div> <div><label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 500;">Phone Number <!></label> <input type="tel" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" placeholder="+1 (555) 123-4567"/></div></form></div>'),Qt=f("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function rt(nt,lt){ct(lt,!1),ft();var A=Qt(),W=ut(A);_(W,{name:"Default (Hover Top)",children:(c,b)=>{var e=yt(),i=m(e);n(i,{text:"This is a tooltip on top",children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Hover me");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Basic Examples"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip text="This is a tooltip on top">
	<Button>Hover me</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var z=o(W,2);_(z,{name:"All Placements",children:(c,b)=>{var e=xt(),i=m(e),a=o(m(i),2),u=m(a);n(u,{text:"Top start",placement:"top-start",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Top Start");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=o(u,2);n(s,{text:"Top center",placement:"top",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Top Center");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var l=o(s,2);n(l,{text:"Top end",placement:"top-end",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Top End");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var r=o(i,2),v=o(m(r),2),g=m(v);n(g,{text:"Bottom start",placement:"bottom-start",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Bottom Start");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var $=o(g,2);n($,{text:"Bottom center",placement:"bottom",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Bottom Center");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var w=o($,2);n(w,{text:"Bottom end",placement:"bottom-end",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Bottom End");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var B=o(r,2),D=o(m(B),2),P=m(D);n(P,{text:"Left start",placement:"left-start",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Left Start");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var Z=o(P,2);n(Z,{text:"Left center",placement:"left",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Left Center");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var it=o(Z,2);n(it,{text:"Left end",placement:"left-end",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Left End");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var at=o(B,2),dt=o(m(at),2),tt=m(dt);n(tt,{text:"Right start",placement:"right-start",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Right Start");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var et=o(tt,2);n(et,{text:"Right center",placement:"right",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Right Center");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}});var pt=o(et,2);n(pt,{text:"Right end",placement:"right-end",children:(h,C)=>{p(h,{size:"sm",children:(y,k)=>{var x=d("Right End");t(y,x)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 100px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;">
<div>
	<h4 style="margin-bottom: 1rem;">Top</h4>
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Tooltip text="Top start" placement="top-start">
			<Button size="sm">Top Start</Button>
		</Tooltip>
		<Tooltip text="Top center" placement="top">
			<Button size="sm">Top Center</Button>
		</Tooltip>
		<Tooltip text="Top end" placement="top-end">
			<Button size="sm">Top End</Button>
		</Tooltip>
	</div>
</div>

<div>
	<h4 style="margin-bottom: 1rem;">Bottom</h4>
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Tooltip text="Bottom start" placement="bottom-start">
			<Button size="sm">Bottom Start</Button>
		</Tooltip>
		<Tooltip text="Bottom center" placement="bottom">
			<Button size="sm">Bottom Center</Button>
		</Tooltip>
		<Tooltip text="Bottom end" placement="bottom-end">
			<Button size="sm">Bottom End</Button>
		</Tooltip>
	</div>
</div>

<div>
	<h4 style="margin-bottom: 1rem;">Left</h4>
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Tooltip text="Left start" placement="left-start">
			<Button size="sm">Left Start</Button>
		</Tooltip>
		<Tooltip text="Left center" placement="left">
			<Button size="sm">Left Center</Button>
		</Tooltip>
		<Tooltip text="Left end" placement="left-end">
			<Button size="sm">Left End</Button>
		</Tooltip>
	</div>
</div>

<div>
	<h4 style="margin-bottom: 1rem;">Right</h4>
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Tooltip text="Right start" placement="right-start">
			<Button size="sm">Right Start</Button>
		</Tooltip>
		<Tooltip text="Right center" placement="right">
			<Button size="sm">Right Center</Button>
		</Tooltip>
		<Tooltip text="Right end" placement="right-end">
			<Button size="sm">Right End</Button>
		</Tooltip>
	</div>
</div>
</div>
 </Tooltip>`}}});var L=o(z,2);_(L,{name:"Trigger: Hover",children:(c,b)=>{var e=_t(),i=m(e);n(i,{text:"Appears on hover",trigger:"hover",children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Hover me");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Trigger Modes"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip text="Appears on hover" trigger="hover">
	<Button>Hover me</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var S=o(L,2);_(S,{name:"Trigger: Focus",children:(c,b)=>{var e=Tt(),i=m(e);n(i,{text:"Appears on focus (Tab to me)",trigger:"focus",children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Focus me");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip text="Appears on focus (Tab to me)" trigger="focus">
	<Button>Focus me</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var R=o(S,2);_(R,{name:"Trigger: Click",children:(c,b)=>{var e=bt(),i=m(e);n(i,{text:"Click to toggle tooltip",trigger:"click",children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Click me");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip text="Click to toggle tooltip" trigger="click">
	<Button>Click me</Button>
</Tooltip>
<p style="margin-left: 2rem; color: #666;">
	Click the button to toggle. Click outside or press Escape to close.
</p>
</div>
 </Tooltip>`}}});var j=o(R,2);_(j,{name:"Trigger: Manual (Controlled)",children:(c,b)=>{var e=wt(),i=o(m(e),4),a=m(i);n(a,{text:"This tooltip is in manual mode",trigger:"manual",children:(u,s)=>{ot(u,{count:1,variant:"warning"})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; text-align: center;">
<p style="margin-bottom: 1rem; color: #666;">
	Manual mode allows you to control the tooltip programmatically via the <code
		style="background: #f0f0f0; padding: 0.125rem 0.25rem; border-radius: 0.25rem;">open</code
	> prop.
</p>
<p style="color: #666;">
	Use <code style="background: #f0f0f0; padding: 0.125rem 0.25rem; border-radius: 0.25rem;"
		>bind:open</code
	> to control the state from a parent component.
</p>
<div style="margin-top: 2rem;">
	<Tooltip text="This tooltip is in manual mode" trigger="manual">
		<Badge count={1} variant="warning" />
	</Tooltip>
</div>
</div>
 </Tooltip>`}}});var E=o(j,2);_(E,{name:"With Open Delay",children:(c,b)=>{var e=Bt(),i=m(e);n(i,{text:"Appears after 500ms",openDelay:500,children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Hover me (delayed)");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Delays"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip text="Appears after 500ms" openDelay={500}>
	<Button>Hover me (delayed)</Button>
</Tooltip>
<p style="margin-left: 2rem; color: #666;">Tooltip appears after 500ms delay</p>
</div>
 </Tooltip>`}}});var F=o(E,2);_(F,{name:"With Close Delay",children:(c,b)=>{var e=Pt(),i=m(e);n(i,{text:"Closes after 500ms",closeDelay:500,children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Hover me");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip text="Closes after 500ms" closeDelay={500}>
	<Button>Hover me</Button>
</Tooltip>
<p style="margin-left: 2rem; color: #666;">Tooltip closes after 500ms delay</p>
</div>
 </Tooltip>`}}});var H=o(F,2);_(H,{name:"With Both Delays",children:(c,b)=>{var e=Ct(),i=m(e);n(i,{text:"Opens and closes with delay",openDelay:300,closeDelay:300,children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Hover me");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip text="Opens and closes with delay" openDelay={300} closeDelay={300}>
	<Button>Hover me</Button>
</Tooltip>
<p style="margin-left: 2rem; color: #666;">300ms delay for both open and close</p>
</div>
 </Tooltip>`}}});var N=o(H,2);_(N,{name:"Without Arrow",children:(c,b)=>{var e=kt(),i=m(e);n(i,{text:"No arrow tooltip",arrow:!1,children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Hover me");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Arrow Variations"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip text="No arrow tooltip" arrow={false}>
	<Button>Hover me</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var O=o(N,2);_(O,{name:"With Arrow (All Sides)",children:(c,b)=>{var e=Dt(),i=m(e);n(i,{text:"Tooltip with arrow on top",placement:"top",arrow:!0,children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Top Arrow");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}});var a=o(i,2);n(a,{text:"Tooltip with arrow on bottom",placement:"bottom",arrow:!0,children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Bottom Arrow");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}});var u=o(a,2);n(u,{text:"Tooltip with arrow on left",placement:"left",arrow:!0,children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Left Arrow");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=o(u,2);n(s,{text:"Tooltip with arrow on right",placement:"right",arrow:!0,children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Right Arrow");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div
style="padding: 100px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; place-items: center;"
>
<Tooltip text="Tooltip with arrow on top" placement="top" arrow={true}>
	<Button>Top Arrow</Button>
</Tooltip>
<Tooltip text="Tooltip with arrow on bottom" placement="bottom" arrow={true}>
	<Button>Bottom Arrow</Button>
</Tooltip>
<Tooltip text="Tooltip with arrow on left" placement="left" arrow={true}>
	<Button>Left Arrow</Button>
</Tooltip>
<Tooltip text="Tooltip with arrow on right" placement="right" arrow={true}>
	<Button>Right Arrow</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var M=o(O,2);_(M,{name:"With Title",children:(c,b)=>{var e=At(),i=m(e);n(i,{title:"Pro Tip",text:"Keyboard shortcuts can speed up your workflow",children:(s,l)=>{p(s,{children:(r,v)=>{var g=d("Title + Text");t(r,g)},$$slots:{default:!0}})},$$slots:{default:!0}});var a=o(i,2);n(a,{title:"Important!",text:"Save your work regularly to avoid data loss",placement:"bottom",children:(s,l)=>{p(s,{children:(r,v)=>{var g=d("Title + Text (Bottom)");t(r,g)},$$slots:{default:!0}})},$$slots:{default:!0}});var u=o(a,2);n(u,{title:"Quick Info",placement:"right",children:(s,l)=>{p(s,{children:(r,v)=>{var g=d("Title Only");t(r,g)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Content Variations"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
<Tooltip title="Pro Tip" text="Keyboard shortcuts can speed up your workflow">
	<Button>Title + Text</Button>
</Tooltip>
<Tooltip
	title="Important!"
	text="Save your work regularly to avoid data loss"
	placement="bottom"
>
	<Button>Title + Text (Bottom)</Button>
</Tooltip>
<Tooltip title="Quick Info" placement="right">
	<Button>Title Only</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var V=o(M,2);_(V,{name:"Long Text Content",children:(c,b)=>{var e=Wt(),i=m(e);n(i,{text:"This is a much longer tooltip text that demonstrates how the tooltip handles wrapping and maximum width constraints. It should wrap nicely and remain readable.",children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Long content");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip
	text="This is a much longer tooltip text that demonstrates how the tooltip handles wrapping and maximum width constraints. It should wrap nicely and remain readable."
>
	<Button>Long content</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var I=o(V,2);_(I,{name:"Long Content with Title",children:(c,b)=>{var e=zt(),i=m(e);n(i,{title:"Detailed Information",text:"This is a much longer tooltip text with a title that demonstrates how the tooltip handles wrapping and maximum width constraints when both title and body text are present.",children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Long title + text");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip
	title="Detailed Information"
	text="This is a much longer tooltip text with a title that demonstrates how the tooltip handles wrapping and maximum width constraints when both title and body text are present."
>
	<Button>Long title + text</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var K=o(I,2);_(K,{name:"Rich Content (Snippet)",children:(c,b)=>{var e=St(),i=m(e);n(i,{placement:"bottom",content:u=>{var s=Lt();t(u,s)},children:(u,s)=>{p(u,{children:(l,r)=>{var v=d("Rich content");t(l,v)},$$slots:{default:!0}})},$$slots:{content:!0,default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip placement="bottom">
	{#snippet content()}
		<div style="text-align: left;">
			<strong style="display: block; margin-bottom: 0.25rem;">Pro Tip!</strong>
			<span
				>Use <code
					style="background: rgba(255,255,255,0.2); padding: 0 0.25rem; border-radius: 2px;"
					>Ctrl+K</code
				> to open command palette</span
			>
		</div>
	{/snippet}
	<Button>Rich content</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var U=o(K,2);_(U,{name:"Rich Content with List",children:(c,b)=>{var e=jt(),i=m(e);n(i,{placement:"right",content:u=>{var s=Rt();t(u,s)},children:(u,s)=>{p(u,{children:(l,r)=>{var v=d("Feature list");t(l,v)},$$slots:{default:!0}})},$$slots:{content:!0,default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
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
	<Button>Feature list</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var q=o(U,2);_(q,{name:"Disabled",children:(c,b)=>{var e=Et(),i=m(e);n(i,{text:"This tooltip won't show",disabled:!0,children:(a,u)=>{p(a,{children:(s,l)=>{var r=d("Disabled tooltip");t(s,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Disabled State"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center;">
<Tooltip text="This tooltip won't show" disabled>
	<Button>Disabled tooltip</Button>
</Tooltip>
<p style="margin-left: 2rem; color: #666;">Tooltip is disabled and won't appear</p>
</div>
 </Tooltip>`}}});var Q=o(q,2);_(Q,{name:"On Different Elements",children:(c,b)=>{var e=Ht(),i=m(e);n(i,{text:"Button tooltip",children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Button");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}});var a=o(i,2);n(a,{text:"Badge tooltip",placement:"bottom",children:(l,r)=>{ot(l,{count:5,variant:"positive"})},$$slots:{default:!0}});var u=o(a,2);n(u,{text:"Link tooltip",placement:"right",children:(l,r)=>{gt(l,{href:"#",children:(v,g)=>{var $=d("Link");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=o(u,2);n(s,{text:"Text tooltip",placement:"bottom",children:(l,r)=>{var v=Ft();t(l,v)},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Different Trigger Elements"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div
style="padding: 60px; display: flex; gap: 2rem; justify-content: center; align-items: center;"
>
<Tooltip text="Button tooltip">
	<Button>Button</Button>
</Tooltip>

<Tooltip text="Badge tooltip" placement="bottom">
	<Badge count={5} variant="positive" />
</Tooltip>

<Tooltip text="Link tooltip" placement="right">
	<Link href="#">Link</Link>
</Tooltip>

<Tooltip text="Text tooltip" placement="bottom">
	<span style="text-decoration: underline dotted; cursor: help;">Hover me</span>
</Tooltip>
</div>
 </Tooltip>`}}});var G=o(Q,2);_(G,{name:"Near Viewport Edge (Auto Flip)",children:(c,b)=>{var e=Nt(),i=m(e),a=m(i);n(a,{text:"Flips to stay visible",placement:"top",children:($,w)=>{p($,{size:"sm",children:(B,D)=>{var P=d("Top Left");t(B,P)},$$slots:{default:!0}})},$$slots:{default:!0}});var u=o(i,2),s=m(u);n(s,{text:"Flips to stay visible",placement:"top",children:($,w)=>{p($,{size:"sm",children:(B,D)=>{var P=d("Top Right");t(B,P)},$$slots:{default:!0}})},$$slots:{default:!0}});var l=o(u,2),r=m(l);n(r,{text:"Flips to stay visible",placement:"bottom",children:($,w)=>{p($,{size:"sm",children:(B,D)=>{var P=d("Bottom Left");t(B,P)},$$slots:{default:!0}})},$$slots:{default:!0}});var v=o(l,2),g=m(v);n(g,{text:"Flips to stay visible",placement:"bottom",children:($,w)=>{p($,{size:"sm",children:(B,D)=>{var P=d("Bottom Right");t(B,P)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Edge Cases"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="position: relative; height: 400px;">
<div style="position: absolute; top: 10px; left: 10px;">
	<Tooltip text="Flips to stay visible" placement="top">
		<Button size="sm">Top Left</Button>
	</Tooltip>
</div>
<div style="position: absolute; top: 10px; right: 10px;">
	<Tooltip text="Flips to stay visible" placement="top">
		<Button size="sm">Top Right</Button>
	</Tooltip>
</div>
<div style="position: absolute; bottom: 10px; left: 10px;">
	<Tooltip text="Flips to stay visible" placement="bottom">
		<Button size="sm">Bottom Left</Button>
	</Tooltip>
</div>
<div style="position: absolute; bottom: 10px; right: 10px;">
	<Tooltip text="Flips to stay visible" placement="bottom">
		<Button size="sm">Bottom Right</Button>
	</Tooltip>
</div>
</div>
 </Tooltip>`}}});var J=o(G,2);_(J,{name:"Multiple Tooltips",children:(c,b)=>{var e=Ot(),i=m(e);n(i,{text:"First tooltip",children:(r,v)=>{p(r,{size:"sm",children:(g,$)=>{var w=d("Button 1");t(g,w)},$$slots:{default:!0}})},$$slots:{default:!0}});var a=o(i,2);n(a,{text:"Second tooltip",children:(r,v)=>{p(r,{size:"sm",children:(g,$)=>{var w=d("Button 2");t(g,w)},$$slots:{default:!0}})},$$slots:{default:!0}});var u=o(a,2);n(u,{text:"Third tooltip",children:(r,v)=>{p(r,{size:"sm",children:(g,$)=>{var w=d("Button 3");t(g,w)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=o(u,2);n(s,{text:"Fourth tooltip",children:(r,v)=>{p(r,{size:"sm",children:(g,$)=>{var w=d("Button 4");t(g,w)},$$slots:{default:!0}})},$$slots:{default:!0}});var l=o(s,2);n(l,{text:"Fifth tooltip",children:(r,v)=>{p(r,{size:"sm",children:(g,$)=>{var w=d("Button 5");t(g,w)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Multiple Tooltips"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
<Tooltip text="First tooltip">
	<Button size="sm">Button 1</Button>
</Tooltip>
<Tooltip text="Second tooltip">
	<Button size="sm">Button 2</Button>
</Tooltip>
<Tooltip text="Third tooltip">
	<Button size="sm">Button 3</Button>
</Tooltip>
<Tooltip text="Fourth tooltip">
	<Button size="sm">Button 4</Button>
</Tooltip>
<Tooltip text="Fifth tooltip">
	<Button size="sm">Button 5</Button>
</Tooltip>
</div>
 </Tooltip>`}}});var X=o(J,2);_(X,{name:"Keyboard Navigation",children:(c,b)=>{var e=Mt(),i=o(m(e),2),a=m(i);n(a,{text:"Focus me with Tab",trigger:"focus",children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Button 1");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}});var u=o(a,2);n(u,{text:"Click me or use Enter/Space",trigger:"click",children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Button 2 (Click)");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=o(u,2);n(s,{text:"Focus me too",trigger:"focus",children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Button 3");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Keyboard Navigation Demo"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px;">
<div style="text-align: center; margin-bottom: 2rem;">
	<p style="color: #666; margin-bottom: 0.5rem;">
		Use <kbd
			style="background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 0.25rem; border: 1px solid #ccc;"
			>Tab</kbd
		>
		to navigate,
		<kbd
			style="background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 0.25rem; border: 1px solid #ccc;"
			>Escape</kbd
		> to close
	</p>
</div>
<div style="display: flex; gap: 1rem; justify-content: center;">
	<Tooltip text="Focus me with Tab" trigger="focus">
		<Button>Button 1</Button>
	</Tooltip>
	<Tooltip text="Click me or use Enter/Space" trigger="click">
		<Button>Button 2 (Click)</Button>
	</Tooltip>
	<Tooltip text="Focus me too" trigger="focus">
		<Button>Button 3</Button>
	</Tooltip>
</div>
</div>
 </Tooltip>`}}});var Y=o(X,2);_(Y,{name:"Empty Content (Should Not Show)",children:(c,b)=>{var e=Vt(),i=o(m(e),2),a=m(i);n(a,{text:"",children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Empty String");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}});var u=o(a,2);n(u,{text:"   ",children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Whitespace Only");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=o(u,2);n(s,{text:void 0,children:(l,r)=>{p(l,{children:(v,g)=>{var $=d("Undefined");t(v,$)},$$slots:{default:!0}})},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Empty Content (Should Not Show)"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px;">
<div style="text-align: center; margin-bottom: 2rem;">
	<p style="color: #666;">
		These tooltips have no content and should NOT appear when triggered:
	</p>
</div>
<div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
	<Tooltip text="">
		<Button>Empty String</Button>
	</Tooltip>
	<Tooltip text="   ">
		<Button>Whitespace Only</Button>
	</Tooltip>
	<Tooltip text={undefined}>
		<Button>Undefined</Button>
	</Tooltip>
</div>
</div>
 </Tooltip>`}}});var st=o(Y,2);_(st,{name:"Real World: Help Icons",children:(c,b)=>{var e=qt(),i=m(e),a=m(i),u=m(a),s=o(m(u));n(s,{text:"We'll never share your email with anyone else",placement:"right",children:(B,D)=>{var P=It();t(B,P)},$$slots:{default:!0}});var l=o(a,2),r=m(l),v=o(m(r));n(v,{title:"Password Requirements",text:"At least 8 characters with one uppercase letter, one number, and one special character.",placement:"right",children:(B,D)=>{var P=Kt();t(B,P)},$$slots:{default:!0}});var g=o(l,2),$=m(g),w=o(m($));n(w,{title:"Format",text:"Enter your phone number with country code, e.g., +1 (555) 123-4567",placement:"right",children:(B,D)=>{var P=Ut();t(B,P)},$$slots:{default:!0}}),t(c,e)},$$slots:{default:!0},parameters:{docs:{description:{story:"Real World Example"}},__svelteCsf:{rawCode:`<Tooltip {...args}>
   <div style="padding: 60px; max-width: 400px; margin: 0 auto;">
<form style="display: flex; flex-direction: column; gap: 1.5rem;">
	<div>
		<label
			style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 500;"
		>
			Email Address
			<Tooltip text="We'll never share your email with anyone else" placement="right">
				<span
					style="display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: #6b7280; color: white; font-size: 12px; cursor: help;"
					>?</span
				>
			</Tooltip>
		</label>
		<input
			type="email"
			style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;"
			placeholder="you@example.com"
		/>
	</div>

	<div>
		<label
			style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 500;"
		>
			Password
			<Tooltip
				title="Password Requirements"
				text="At least 8 characters with one uppercase letter, one number, and one special character."
				placement="right"
			>
				<span
					style="display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: #6b7280; color: white; font-size: 12px; cursor: help;"
					>?</span
				>
			</Tooltip>
		</label>
		<input
			type="password"
			style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;"
			placeholder="••••••••"
		/>
	</div>

	<div>
		<label
			style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 500;"
		>
			Phone Number
			<Tooltip
				title="Format"
				text="Enter your phone number with country code, e.g., +1 (555) 123-4567"
				placement="right"
			>
				<span
					style="display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: #6b7280; color: white; font-size: 12px; cursor: help;"
					>?</span
				>
			</Tooltip>
		</label>
		<input
			type="tel"
			style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;"
			placeholder="+1 (555) 123-4567"
		/>
	</div>
</form>
</div>
 </Tooltip>`}}}),t(nt,A),mt()}rt.__docgen={data:[],name:"tooltip.stories.svelte"};const T=vt(rt,ht),ue=["DefaultHoverTop","AllPlacements","TriggerHover","TriggerFocus","TriggerClick","TriggerManualControlled","WithOpenDelay","WithCloseDelay","WithBothDelays","WithoutArrow","WithArrowAllSides","WithTitle","LongTextContent","LongContentWithTitle","RichContentSnippet","RichContentWithList","Disabled","OnDifferentElements","NearViewportEdgeAutoFlip","MultipleTooltips","KeyboardNavigation","EmptyContentShouldNotShow","RealWorldHelpIcons"],me={...T.DefaultHoverTop,tags:["svelte-csf-v5"]},ve={...T.AllPlacements,tags:["svelte-csf-v5"]},$e={...T.TriggerHover,tags:["svelte-csf-v5"]},ge={...T.TriggerFocus,tags:["svelte-csf-v5"]},fe={...T.TriggerClick,tags:["svelte-csf-v5"]},he={...T.TriggerManualControlled,tags:["svelte-csf-v5"]},ye={...T.WithOpenDelay,tags:["svelte-csf-v5"]},xe={...T.WithCloseDelay,tags:["svelte-csf-v5"]},_e={...T.WithBothDelays,tags:["svelte-csf-v5"]},Te={...T.WithoutArrow,tags:["svelte-csf-v5"]},be={...T.WithArrowAllSides,tags:["svelte-csf-v5"]},we={...T.WithTitle,tags:["svelte-csf-v5"]},Be={...T.LongTextContent,tags:["svelte-csf-v5"]},Pe={...T.LongContentWithTitle,tags:["svelte-csf-v5"]},Ce={...T.RichContentSnippet,tags:["svelte-csf-v5"]},ke={...T.RichContentWithList,tags:["svelte-csf-v5"]},De={...T.Disabled,tags:["svelte-csf-v5"]},Ae={...T.OnDifferentElements,tags:["svelte-csf-v5"]},We={...T.NearViewportEdgeAutoFlip,tags:["svelte-csf-v5"]},ze={...T.MultipleTooltips,tags:["svelte-csf-v5"]},Le={...T.KeyboardNavigation,tags:["svelte-csf-v5"]},Se={...T.EmptyContentShouldNotShow,tags:["svelte-csf-v5"]},Re={...T.RealWorldHelpIcons,tags:["svelte-csf-v5"]};export{ve as AllPlacements,me as DefaultHoverTop,De as Disabled,Se as EmptyContentShouldNotShow,Le as KeyboardNavigation,Pe as LongContentWithTitle,Be as LongTextContent,ze as MultipleTooltips,We as NearViewportEdgeAutoFlip,Ae as OnDifferentElements,Re as RealWorldHelpIcons,Ce as RichContentSnippet,ke as RichContentWithList,fe as TriggerClick,ge as TriggerFocus,$e as TriggerHover,he as TriggerManualControlled,be as WithArrowAllSides,_e as WithBothDelays,xe as WithCloseDelay,ye as WithOpenDelay,we as WithTitle,Te as WithoutArrow,ue as __namedExportsOrder,ht as default};
