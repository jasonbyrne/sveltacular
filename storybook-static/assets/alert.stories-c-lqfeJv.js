import{p as f,f as _,a as y,t as o,b as r,s as d,c as h}from"./iframe-D7RYvwF5.js";import{c as w}from"./create-runtime-stories-z04xijIr.js";import{d as A}from"./index-CU8YG541.js";import{A as b}from"./alert-Dy-xpI9C.js";import{i as v}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./dialog-close-button-BPUww50_.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";import"./dialog-header-BQj1Bwmf.js";import"./flex-row-DqBsqYfl.js";import"./divider-C9z6YG8R.js";import"./overlay-oqNK3s9E.js";import"./button-BYNa-MSv.js";import"./spinner-Cpf7SZnL.js";import"./icon-v8TPefiR.js";const{fn:$}=__STORYBOOK_MODULE_TEST__,S={component:b,title:"Modals/Alert",tags:["autodocs"],argTypes:{open:{control:"boolean",description:"Whether the alert is open",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},title:{control:"text",description:"Alert title",table:{type:{summary:"string | undefined"}}},size:{control:"select",options:["sm","md","lg","xl","full"],description:"Size of the alert modal",table:{type:{summary:"ComponentSize"},defaultValue:{summary:"md"}}},buttonText:{control:"text",description:"Text for the action button",table:{type:{summary:"string"},defaultValue:{summary:"OK"}}},buttonVariant:{control:"select",options:["primary","secondary","danger"],description:"Variant of the action button",table:{type:{summary:"ButtonVariant"},defaultValue:{summary:"primary"}}},onClose:{action:"closed",description:"Called when alert is closed",table:{type:{summary:"() => void"}}}},args:{onClose:$(),open:!0},parameters:{docs:{description:{component:`Alert modal component for displaying important messages.

**Accessibility**:
- Uses \`role="alertdialog"\` for screen readers
- Focus is trapped within the modal
- Supports keyboard navigation (ESC to close)
- Properly labeled with aria-labelledby

**Usage**:
\`\`\`svelte
<Alert
  bind:open={showAlert}
  title="Error"
  buttonVariant="danger"
  onClose={handleClose}
>
  Something went wrong.
</Alert>
\`\`\``}}}},{Story:a}=A();var x=_("<!> <!> <!>",1);function p(u,c){f(c,!1),v();var n=x(),l=y(n);a(l,{name:"Default",args:{title:"Error",open:!0},children:(e,m)=>{var t=o("Something went wrong and we need to make sure you see this.");r(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Alert {...args}>
  Something went wrong and we need to make sure you see this.
</Alert>`}}});var i=d(l,2);a(i,{name:"AlertNoTitle",args:{open:!0},children:(e,m)=>{var t=o("Something went wrong and we need to make sure you see this.");r(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Alert {...args}>
  Something went wrong and we need to make sure you see this.
</Alert>`}}});var g=d(i,2);a(g,{name:"AlertXLarge",args:{title:"Extra Large",open:!0,size:"xl"},children:(e,m)=>{var t=o("Something went wrong and we need to make sure you see this.");r(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Alert {...args}>
  Something went wrong and we need to make sure you see this.
</Alert>`}}}),r(u,n),h()}p.__docgen={data:[],name:"alert.stories.svelte"};const s=w(p,S),F=["Default","AlertNoTitle","AlertXLarge"],W={...s.Default,tags:["svelte-csf-v5"]},Y={...s.AlertNoTitle,tags:["svelte-csf-v5"]},j={...s.AlertXLarge,tags:["svelte-csf-v5"]};export{Y as AlertNoTitle,j as AlertXLarge,W as Default,F as __namedExportsOrder,S as default};
