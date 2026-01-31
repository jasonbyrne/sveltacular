import{p as T,f as c,a as p,t as i,b as a,s as o,g as z,d as D,c as N}from"./iframe-D7RYvwF5.js";import{c as j}from"./create-runtime-stories-z04xijIr.js";import{d as E}from"./index-CU8YG541.js";import{C as m}from"./chip-Dujg20l0.js";import{i as H}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";import"./icon-v8TPefiR.js";const{fn:x}=__STORYBOOK_MODULE_TEST__,O={component:m,title:"Generic/Chip",tags:["autodocs"],argTypes:{label:{control:"text",description:"The text label displayed in the chip",table:{type:{summary:"string"}}},removable:{control:"boolean",description:"Whether the chip can be removed",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},size:{control:"select",options:["sm","md","lg"],description:"Size of the chip",table:{type:{summary:"ComponentSize"},defaultValue:{summary:"'md'"}}},variant:{control:"select",options:["standard","positive","negative"],description:"Color variant of the chip",table:{type:{summary:"'standard' | 'positive' | 'negative'"},defaultValue:{summary:"'standard'"}}},link:{control:"object",description:"Link configuration with url and optional target",table:{type:{summary:"{ url: string; target?: string }"}}},children:{control:!1,description:"Snippet for additional content",table:{type:{summary:"Snippet"}}},onRemove:{action:"removed",description:"Called when the chip is removed",table:{type:{summary:"() => void"}}}},args:{onRemove:x()},parameters:{docs:{description:{component:`Chip component for displaying tags, labels, or removable items.

**Accessibility**: Removable chips include an \`aria-label\` on the remove button
for screen readers. The remove button is keyboard accessible and includes focus styles.

**Usage**:
\`\`\`svelte
<Chip label="Tag" removable onRemove={() => console.log('removed')} />
\`\`\``}}}},{Story:n}=E();var M=c("<!> Chip with children snippet displaying additional information below the label.",1),U=c("<!> Chip combining a link with additional children content.",1),V=c("<!> Fully-featured chip with label, children content, link, and remove button.",1),F=c("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function R(L,P){T(P,!1),H();var f=F(),u=p(f);n(u,{name:"Default",args:{label:"Chip"},children:(t,s)=>{var e=i("Standard chip with default styling.");a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
  Standard chip with default styling.
</Chip>`}}});var C=o(u,2);n(C,{name:"Removable",args:{label:"Removable Chip",removable:!0},children:(t,s)=>{var e=i("Chip with a remove button that can be clicked or activated with keyboard.");a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
  Chip with a remove button that can be clicked or activated with keyboard.
</Chip>`}}});var _=o(C,2);n(_,{name:"Positive",args:{label:"Success",variant:"positive"},children:(t,s)=>{var e=i("Positive variant chip (typically green) for success states.");a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
  Positive variant chip (typically green) for success states.
</Chip>`}}});var g=o(_,2);n(g,{name:"Negative",args:{label:"Error",variant:"negative"},children:(t,s)=>{var e=i("Negative variant chip (typically red) for error or warning states.");a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
  Negative variant chip (typically red) for error or warning states.
</Chip>`}}});var b=o(g,2);n(b,{name:"Sizes",args:{label:"Chip"},children:(t,s)=>{var e=i("Chip in different sizes: sm, md, lg.");a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
  Chip in different sizes: sm, md, lg.
</Chip>`}}});var $=o(b,2);n($,{name:"WithRemoveHandler",args:{label:"Click to remove",removable:!0},children:(t,s)=>{var e=i("Removable chip with remove handler for demonstration.");a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
  Removable chip with remove handler for demonstration.
</Chip>`}}});var k=o($,2);n(k,{name:"WithLink",args:{label:"External Resource",link:{url:"https://example.com"}},children:(t,s)=>{var e=i("Chip with an external link icon that opens in a new tab.");a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
  Chip with an external link icon that opens in a new tab.
</Chip>`}}});var y=o(k,2);n(y,{name:"WithLinkAndCustomTarget",args:{label:"Same Tab Link",link:{url:"https://example.com",target:"_self"}},children:(t,s)=>{var e=i('Chip with a link that opens in the same tab (target="_self").');a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
  Chip with a link that opens in the same tab (target="_self").
</Chip>`}}});var w=o(y,2);n(w,{name:"WithChildren",children:(t,s)=>{var e=M(),l=p(e);m(l,{label:"User Profile",children:d=>{var h=i("john.doe@example.com");a(d,h)},$$slots:{default:!0}}),a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
   <Chip label="User Profile">
{#snippet children()}
	john.doe@example.com
{/snippet}
</Chip>
Chip with children snippet displaying additional information below the label.
 </Chip>`}}});var W=o(w,2);n(W,{name:"WithLinkAndChildren",children:(t,s)=>{var e=U(),l=p(e);m(l,{label:"Documentation",link:{url:"https://docs.example.com"},children:d=>{var h=i("v2.0.1");a(d,h)},$$slots:{default:!0}}),a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
   <Chip label="Documentation" link={{ url: 'https://docs.example.com' }}>
{#snippet children()}
	v2.0.1
{/snippet}
</Chip>
Chip combining a link with additional children content.
 </Chip>`}}});var S=o(W,2);n(S,{name:"RemovableWithLinkAndChildren",children:(t,s)=>{var e=V(),l=p(e);{const v=h=>{var A=i("Senior Developer");a(h,A)};let d=D(x);m(l,{label:"Team Member",removable:!0,link:{url:"https://profile.example.com/johndoe"},get onRemove(){return z(d)},children:v,$$slots:{default:!0}})}a(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Chip {...args}>
   <Chip
label="Team Member"
removable={true}
link={{ url: 'https://profile.example.com/johndoe' }}
onRemove={fn()}
>
{#snippet children()}
	Senior Developer
{/snippet}
</Chip>
Fully-featured chip with label, children content, link, and remove button.
 </Chip>`}}}),a(L,f),N()}R.__docgen={data:[],name:"chip.stories.svelte"};const r=j(R,O),ee=["Default","Removable","Positive","Negative","Sizes","WithRemoveHandler","WithLink","WithLinkAndCustomTarget","WithChildren","WithLinkAndChildren","RemovableWithLinkAndChildren"],te={...r.Default,tags:["svelte-csf-v5"]},ae={...r.Removable,tags:["svelte-csf-v5"]},ie={...r.Positive,tags:["svelte-csf-v5"]},ne={...r.Negative,tags:["svelte-csf-v5"]},re={...r.Sizes,tags:["svelte-csf-v5"]},se={...r.WithRemoveHandler,tags:["svelte-csf-v5"]},oe={...r.WithLink,tags:["svelte-csf-v5"]},le={...r.WithLinkAndCustomTarget,tags:["svelte-csf-v5"]},de={...r.WithChildren,tags:["svelte-csf-v5"]},he={...r.WithLinkAndChildren,tags:["svelte-csf-v5"]},pe={...r.RemovableWithLinkAndChildren,tags:["svelte-csf-v5"]};export{te as Default,ne as Negative,ie as Positive,ae as Removable,pe as RemovableWithLinkAndChildren,re as Sizes,de as WithChildren,oe as WithLink,he as WithLinkAndChildren,le as WithLinkAndCustomTarget,se as WithRemoveHandler,ee as __namedExportsOrder,O as default};
