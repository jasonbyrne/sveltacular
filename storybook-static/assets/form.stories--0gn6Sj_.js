import{p as w,f as s,a as n,t as $,b as r,s as m,c as P}from"./iframe-D7RYvwF5.js";import{c as E}from"./create-runtime-stories-z04xijIr.js";import{d as M}from"./index-CU8YG541.js";import{b as R,c as D,F as h,a as f,d as H,M as C}from"./new-or-existing-combo-CqosF0Ko.js";import{T as y}from"./text-box-DRUkwi5y.js";import{B as N}from"./button-BYNa-MSv.js";import{F as A}from"./file-box-BzBTnKGD.js";import{T as L}from"./time-box-DklgIJNc.js";import{B as U}from"./bool-box-CQa7A6DN.js";import{i as k}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./date-box-9Xpl72lQ.js";import"./each-ldT_kV30.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";import"./input-CeMRp2yv.js";import"./unique-id-JjuMjhtj.js";import"./form-field-De-aDgvW.js";import"./form-input-wrapper-C7eEHXga.js";import"./this-p55_KPOp.js";import"./animations-2Xgw79Wl.js";import"./icon-v8TPefiR.js";import"./dimension-box-Dsc_-JKs.js";import"./round-to-decimals-DnJU7sfx.js";import"./file-area-CFZOiRoq.js";import"./info-box-C0eM7SX6.js";import"./number-box-NeQZmjQa.js";import"./number-range-box-BI9dUdti.js";import"./slider-BoYL6lNd.js";import"./tag-box-eLUC7d1O.js";import"./multi-select-base-BVBcCcU5.js";import"./chip-Dujg20l0.js";import"./menu-Dbx_mKWU.js";import"./flex-item-vFOmLPoH.js";import"./flex-row-DqBsqYfl.js";import"./text-area-sIxBJGNy.js";import"./url-box--NyW8gpb.js";import"./list-box-ZLqeBCYW.js";import"./ucfirst-D2sS6U5O.js";import"./form-Dq9J9N2L.js";import"./prompt-BhA4zG_Z.js";import"./dialog-close-button-BPUww50_.js";import"./dialog-header-BQj1Bwmf.js";import"./overlay-oqNK3s9E.js";import"./divider-C9z6YG8R.js";import"./section-B_5Ba0zn.js";import"./header-HUhkViHE.js";import"./headline-CIaj2uGK.js";import"./text-AqgJ9I0K.js";import"./subtitle-GbSccjrP.js";import"./paragraph-CHHUMgDW.js";import"./form-actions-BnEuTURS.js";import"./check-box-OK_327bz.js";import"./check-box-group-EZZB9HkT.js";import"./radio-group-NO_Dg_o0.js";import"./reference-box-CI0kQ0D5.js";import"./address-Ct4VI9gk.js";import"./date-time-i0r4n8hq.js";import"./dot-CoKckK0c.js";import"./email-rauEzqxm.js";import"./empty-C7UgyjBN.js";import"./link-ChNHN7sj.js";import"./notice-B1x1MFLK.js";import"./panel-yWmqafqz.js";import"./phone-hLszVyOu.js";import"./pill-DR-s1mUs.js";import"./toaster-BQqIBbM6.js";import"./list-item-CrOOr9EG.js";import"./tooltip-BmMjxRoK.js";import"./use-position.svelte-BiO9WjIV.js";import"./badge-Dj1iWtG5.js";import"./spinner-Cpf7SZnL.js";import"./avatar-BVGfFP4s.js";import"./popover-QM0nJ1W5.js";import"./index-Bt-Xh7oU.js";import"./rating-DIIEeRXX.js";import"./flex-col-DvP6OZHd.js";import"./alert-Dy-xpI9C.js";import"./confirm-BdLc6A95.js";import"./modal-BMpbTGUP.js";import"./focus-BZu1pbN6.js";import"./accordion-DiDzIMT4.js";import"./breadcrumbs-BQNBJaaU.js";import"./pagination-BTpbJoKY.js";import"./side-bar-B4J1wJ5R.js";import"./image-BAmQngrP.js";import"./wizard-step-uepBHMUi.js";import"./command-palette-D_3RzOuv.js";import"./drawer-4pHi49HG.js";import"./loading-BQ4zLagy.js";import"./code-block-JkbKDLWE.js";import"./copy-icon-BfCwZnDS.js";import"./code-CP198VNU.js";import"./timeline-item-DQtPq0xE.js";import"./progress-DwQDvMts.js";import"./skeleton-input-BOEGaRdx.js";import"./skeleton-paragraph-CtXwBfZX.js";import"./random-CGfuDAzW.js";import"./skeleton-text-CXhNE6IQ.js";import"./skeleton-table-wsRku2a2.js";import"./countries-aRLqtU80.js";import"./united-states-DUd_7Pvl.js";const O={component:R,title:"Forms/Form",tags:["autodocs"],argTypes:{action:{control:"text",description:"Form action URL",table:{type:{summary:"string"}}},method:{control:"select",options:["get","post","put","patch","delete"],description:"HTTP method for form submission",table:{type:{summary:"HttpMethod"},defaultValue:{summary:"post"}}},onSubmit:{action:"submitted",description:"Called when form is submitted",table:{type:{summary:"(event: SubmitEvent) => void"}}}},args:{action:"/submit",method:"post"},parameters:{docs:{description:{component:`Form component for wrapping form fields and handling submission.

**Accessibility**: Form includes proper semantic HTML and supports keyboard navigation.
All form fields should have associated labels for screen readers.

**Usage**:
\`\`\`svelte
<Form action="/submit" method="post" onSubmit={handleSubmit}>
  <TextBox label="Name" bind:value={name} />
  <Button type="submit" variant="primary">Submit</Button>
</Form>
\`\`\``}}}},{Story:V}=M();var j=s("<!> <!>",1),q=s("<!> <!>",1),z=s("<!> <!>",1),G=s("<!> <!>",1),I=s("<!> <!> <!> <!>",1);function x(B,g){w(g,!1),k(),V(B,{name:"Default",args:{action:"/submit",method:"post"},children:(S,K)=>{var _=I(),b=n(_);D(b,{children:(t,d)=>{var o=$("Basic form");r(t,o)},$$slots:{default:!0}});var v=m(b,2);h(v,{title:"Section",children:(t,d)=>{var o=z(),l=n(o);f(l,{children:(i,c)=>{var a=j(),p=n(a);y(p,{type:"text",placeholder:"Enter your name",label:"Name"});var u=m(p,2);y(u,{type:"email",placeholder:"Enter your email",label:"Email"}),r(i,a)}});var e=m(l,2);f(e,{children:(i,c)=>{var a=q(),p=n(a);C(p,{label:"Money"});var u=m(p,2);A(u,{label:"File"}),r(i,a)}}),r(t,o)},$$slots:{default:!0}});var F=m(v,2);h(F,{title:"Section 2",children:(t,d)=>{f(t,{children:(o,l)=>{var e=G(),i=n(e);L(i,{label:"Time"});var c=m(i,2);U(c,{label:"Bool"}),r(o,e)}})},$$slots:{default:!0}});var T=m(F,2);H(T,{children:(t,d)=>{N(t,{variant:"primary",children:(o,l)=>{var e=$("Submit");r(o,e)},$$slots:{default:!0}})}}),r(S,_)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Form {...args}>
   <FormHeader>Basic form</FormHeader>
<FormSection title="Section">
<FormRow>
	<TextBox type="text" placeholder="Enter your name" label="Name" />
	<TextBox type="email" placeholder="Enter your email" label="Email" />
</FormRow>
<FormRow>
	<MoneyBox label="Money" />
	<FileBox label="File" />
</FormRow>
</FormSection>
<FormSection title="Section 2">
<FormRow>
	<TimeBox label="Time" />
	<BoolBox label="Bool" />
</FormRow>
</FormSection>
<FormFooter>
<Button variant="primary">Submit</Button>
</FormFooter>
 </Form>`}}}),P()}x.__docgen={data:[],name:"form.stories.svelte"};const J=E(x,O),Gt=["Default"],It={...J.Default,tags:["svelte-csf-v5"]};export{It as Default,Gt as __namedExportsOrder,O as default};
