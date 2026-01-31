import{p as y,f as B,a as C,t as l,b as a,s as o,c as w}from"./iframe-D7RYvwF5.js";import{c as k}from"./create-runtime-stories-z04xijIr.js";import{d as W}from"./index-CU8YG541.js";import{T as N}from"./time-box-DklgIJNc.js";import{i as D}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";import"./input-CeMRp2yv.js";import"./unique-id-JjuMjhtj.js";import"./form-field-De-aDgvW.js";import"./each-ldT_kV30.js";import"./form-input-wrapper-C7eEHXga.js";import"./this-p55_KPOp.js";import"./animations-2Xgw79Wl.js";import"./icon-v8TPefiR.js";const{fn:v}=__STORYBOOK_MODULE_TEST__,E={component:N,title:"Forms/TimeBox",tags:["autodocs"],argTypes:{value:{control:"text",description:"The time value in HH:MM format",table:{type:{summary:"string | null"},defaultValue:{summary:"''"}}},size:{control:"select",options:["sm","md","lg","xl","full"],description:"Size of the input field",table:{type:{summary:"ComponentSize"},defaultValue:{summary:"'full'"}}},label:{control:"text",description:"Label text displayed above the input",table:{type:{summary:"string"}}},helperText:{control:"text",description:"Helper text displayed below the input",table:{type:{summary:"string"}}},feedback:{control:"object",description:"Feedback message with optional details array",table:{type:{summary:"FormFieldFeedback"}}},nullable:{control:"boolean",description:"Whether the field can be null (adds a checkbox to toggle value)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},nullText:{control:"text",description:"Text to display when nullable and unchecked",table:{type:{summary:"string"},defaultValue:{summary:"'-- : -- : --'"}}},disabled:{control:"boolean",description:"Whether the input is disabled",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Whether the input is required",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onChange:{action:"changed",description:"Called when the time value changes",table:{type:{summary:"(value: string | null) => void"}}},onCheckChanged:{action:"checkChanged",description:"Called when the nullable checkbox is toggled",table:{type:{summary:"(isChecked: boolean) => void"}}}},args:{onChange:v(),onCheckChanged:v()},parameters:{docs:{description:{component:`TimeBox component for selecting time values using the native HTML time input.

**Accessibility**: Uses native HTML5 time input with proper ARIA attributes.
Includes \`aria-required\` for required fields and proper label association.

**Usage**:
\`\`\`svelte
<TimeBox
  label="Start time"
  bind:value={time}
  helperText="Select a time"
/>
\`\`\``}}}},{Story:r}=W();var S=B("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function T(_,g){y(g,!1),D();var n=S(),m=C(n);r(m,{name:"Default",args:{label:"Time"},children:(e,i)=>{var t=l("Default TimeBox with label.");a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  Default TimeBox with label.
</TimeBox>`}}});var u=o(m,2);r(u,{name:"WithValue",args:{label:"Time",value:"14:30"},children:(e,i)=>{var t=l("TimeBox with a pre-selected time value (2:30 PM).");a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  TimeBox with a pre-selected time value (2:30 PM).
</TimeBox>`}}});var d=o(u,2);r(d,{name:"Required",args:{label:"Time",required:!0},children:(e,i)=>{var t=l("Required TimeBox field with validation indicator.");a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  Required TimeBox field with validation indicator.
</TimeBox>`}}});var c=o(d,2);r(c,{name:"WithHelperText",args:{label:"Meeting time",helperText:"Select the time for your meeting"},children:(e,i)=>{var t=l("TimeBox with helper text providing additional context.");a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  TimeBox with helper text providing additional context.
</TimeBox>`}}});var p=o(c,2);r(p,{name:"Disabled",args:{label:"Time",disabled:!0,value:"09:00"},children:(e,i)=>{var t=l("Disabled TimeBox that cannot be changed.");a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  Disabled TimeBox that cannot be changed.
</TimeBox>`}}});var h=o(p,2);r(h,{name:"WithError",args:{label:"Time",feedback:{text:"Please select a valid time",isError:!0}},children:(e,i)=>{var t=l("TimeBox with error feedback message.");a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  TimeBox with error feedback message.
</TimeBox>`}}});var b=o(h,2);r(b,{name:"Sizes",args:{label:"Time"},children:(e,i)=>{var t=l("TimeBox in different sizes: sm, md, lg, xl, full.");a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  TimeBox in different sizes: sm, md, lg, xl, full.
</TimeBox>`}}});var x=o(b,2);r(x,{name:"Nullable",args:{label:"Meeting time (optional)",nullable:!0,value:"14:30",helperText:"Uncheck to indicate no specific time preference"},children:(e,i)=>{var t=l(`TimeBox with nullable support. Toggle the checkbox to enable/disable the field. When unchecked, the
	value clears but is remembered if you re-check it.`);a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  TimeBox with nullable support. Toggle the checkbox to enable/disable the field. When unchecked, the
value clears but is remembered if you re-check it.
</TimeBox>`}}});var f=o(x,2);r(f,{name:"NullableEmpty",args:{label:"Appointment time",nullable:!0,helperText:"Check to set a time"},children:(e,i)=>{var t=l(`TimeBox with nullable support starting empty. When you check the box, it will default to the
	current time, or restore your last entered value.`);a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  TimeBox with nullable support starting empty. When you check the box, it will default to the
current time, or restore your last entered value.
</TimeBox>`}}});var $=o(f,2);r($,{name:"NullableCustomText",args:{label:"Alarm time",nullable:!0,nullText:"No alarm set",helperText:"Check to set an alarm"},children:(e,i)=>{var t=l("TimeBox with custom null text displayed when unchecked.");a(e,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<TimeBox {...args}>
  TimeBox with custom null text displayed when unchecked.
</TimeBox>`}}}),a(_,n),w()}T.__docgen={data:[],name:"time-box.stories.svelte"};const s=k(T,E),J=["Default","WithValue","Required","WithHelperText","Disabled","WithError","Sizes","Nullable","NullableEmpty","NullableCustomText"],Q={...s.Default,tags:["svelte-csf-v5"]},X={...s.WithValue,tags:["svelte-csf-v5"]},Z={...s.Required,tags:["svelte-csf-v5"]},ee={...s.WithHelperText,tags:["svelte-csf-v5"]},te={...s.Disabled,tags:["svelte-csf-v5"]},ae={...s.WithError,tags:["svelte-csf-v5"]},le={...s.Sizes,tags:["svelte-csf-v5"]},re={...s.Nullable,tags:["svelte-csf-v5"]},se={...s.NullableEmpty,tags:["svelte-csf-v5"]},ie={...s.NullableCustomText,tags:["svelte-csf-v5"]};export{Q as Default,te as Disabled,re as Nullable,ie as NullableCustomText,se as NullableEmpty,Z as Required,le as Sizes,ae as WithError,ee as WithHelperText,X as WithValue,J as __namedExportsOrder,E as default};
