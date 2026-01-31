import{p as z,f as V,a as Y,t as a,b as t,s as i,c as N}from"./iframe-D7RYvwF5.js";import{c as q}from"./create-runtime-stories-z04xijIr.js";import{d as I}from"./index-CU8YG541.js";import{B as X}from"./bool-box-CQa7A6DN.js";import{i as H}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";import"./input-CeMRp2yv.js";import"./list-box-ZLqeBCYW.js";import"./ucfirst-D2sS6U5O.js";import"./this-p55_KPOp.js";import"./form-Dq9J9N2L.js";import"./form-field-De-aDgvW.js";import"./each-ldT_kV30.js";import"./unique-id-JjuMjhtj.js";import"./menu-Dbx_mKWU.js";import"./icon-v8TPefiR.js";import"./flex-item-vFOmLPoH.js";import"./flex-row-DqBsqYfl.js";import"./prompt-BhA4zG_Z.js";import"./dialog-close-button-BPUww50_.js";import"./dialog-header-BQj1Bwmf.js";import"./overlay-oqNK3s9E.js";import"./button-BYNa-MSv.js";import"./spinner-Cpf7SZnL.js";import"./divider-C9z6YG8R.js";import"./text-box-DRUkwi5y.js";import"./form-input-wrapper-C7eEHXga.js";import"./animations-2Xgw79Wl.js";const{fn:U}=__STORYBOOK_MODULE_TEST__,j={component:X,title:"Forms/BoolBox",tags:["autodocs"],argTypes:{value:{control:"boolean",description:"The boolean value (true/false)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},variant:{control:"select",options:["dropdown","switch","checkbox","radio"],description:"Visual variant of the boolean input",table:{type:{summary:"'dropdown' | 'switch' | 'checkbox' | 'radio'"},defaultValue:{summary:"'dropdown'"}}},options:{control:"object",description:"Tuple of two strings representing the true and false labels",table:{type:{summary:"[yes: string, no: string]"},defaultValue:{summary:"['Yes', 'No']"}}},size:{control:"select",options:["sm","md","lg","xl","full"],description:"Size of the input field",table:{type:{summary:"ComponentSize"},defaultValue:{summary:"'md'"}}},label:{control:"text",description:"Label text displayed above the input",table:{type:{summary:"string"}}},helperText:{control:"text",description:"Helper text displayed below the input",table:{type:{summary:"string"}}},feedback:{control:"object",description:"Feedback message with optional details array",table:{type:{summary:"FormFieldFeedback"}}},disabled:{control:"boolean",description:"Whether the input is disabled",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Whether the input is required",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onChange:{action:"changed",description:"Called when the value changes",table:{type:{summary:"(value: boolean) => void"}}}},args:{label:"Label",onChange:U(),helperText:"Helper text"},parameters:{docs:{description:{component:`BoolBox component for selecting boolean values with customizable labels and variants.

**Variants**:
- \`dropdown\`: Select-style dropdown (default)
- \`switch\`: Toggle switch
- \`checkbox\`: Standard checkbox
- \`radio\`: Radio button group

**Accessibility**: Provides full keyboard navigation and ARIA attributes for all variants.
The component supports screen readers and keyboard-only navigation.

**Usage**:
\`\`\`svelte
<BoolBox
  variant="switch"
  label="Enable notifications"
  options={['On', 'Off']}
  bind:value={enabled}
  helperText="Toggle to receive notifications"
/>
\`\`\``}}}},{Story:s}=I();var M=V("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function W(E,A){z(A,!1),H();var n=M(),c=Y(n);s(c,{name:"Dropdown",args:{variant:"dropdown"},children:(e,l)=>{var o=a("Default dropdown variant with Yes/No options.");t(e,o)},$$slots:{default:!0},parameters:{docs:{description:{story:"Dropdown Variant (Default)"}},__svelteCsf:{rawCode:`<BoolBox {...args}>
  Default dropdown variant with Yes/No options.
</BoolBox>`}}});var d=i(c,2);s(d,{name:"DropdownYesNo",args:{variant:"dropdown",options:["Yes","No"]},children:(e,l)=>{var o=a("Standard Yes/No boolean selection.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Standard Yes/No boolean selection.
</BoolBox>`}}});var v=i(d,2);s(v,{name:"DropdownTrueFalse",args:{variant:"dropdown",options:["True","False"]},children:(e,l)=>{var o=a("True/False boolean selection for technical contexts.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  True/False boolean selection for technical contexts.
</BoolBox>`}}});var p=i(v,2);s(p,{name:"DropdownOnOff",args:{variant:"dropdown",options:["On","Off"]},children:(e,l)=>{var o=a("On/Off selection for settings.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  On/Off selection for settings.
</BoolBox>`}}});var h=i(p,2);s(h,{name:"Switch",args:{variant:"switch",value:!0,options:["On","Off"]},children:(e,l)=>{var o=a("Toggle switch variant ideal for on/off states.");t(e,o)},$$slots:{default:!0},parameters:{docs:{description:{story:"Switch Variant"}},__svelteCsf:{rawCode:`<BoolBox {...args}>
  Toggle switch variant ideal for on/off states.
</BoolBox>`}}});var u=i(h,2);s(u,{name:"SwitchEnabled",args:{variant:"switch",value:!0,options:["Enabled","Disabled"]},children:(e,l)=>{var o=a("Switch showing enabled/disabled state.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Switch showing enabled/disabled state.
</BoolBox>`}}});var b=i(u,2);s(b,{name:"SwitchSizes",args:{variant:"switch",value:!0,options:["Active","Inactive"]},children:(e,l)=>{var o=a("Switch variant with different sizes.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Switch variant with different sizes.
</BoolBox>`}}});var f=i(b,2);s(f,{name:"SwitchSmall",args:{variant:"switch",size:"sm",value:!0,options:["On","Off"]},children:(e,l)=>{var o=a("Small switch variant.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Small switch variant.
</BoolBox>`}}});var x=i(f,2);s(x,{name:"SwitchLarge",args:{variant:"switch",size:"lg",value:!0,options:["On","Off"]},children:(e,l)=>{var o=a("Large switch variant.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Large switch variant.
</BoolBox>`}}});var _=i(x,2);s(_,{name:"SwitchXLarge",args:{variant:"switch",size:"xl",value:!0,options:["On","Off"]},children:(e,l)=>{var o=a("Extra large switch variant.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Extra large switch variant.
</BoolBox>`}}});var m=i(_,2);s(m,{name:"Checkbox",args:{variant:"checkbox",value:!0,options:["Yes","No"]},children:(e,l)=>{var o=a("Checkbox variant for boolean selection.");t(e,o)},$$slots:{default:!0},parameters:{docs:{description:{story:"Checkbox Variant"}},__svelteCsf:{rawCode:`<BoolBox {...args}>
  Checkbox variant for boolean selection.
</BoolBox>`}}});var g=i(m,2);s(g,{name:"CheckboxAgree",args:{variant:"checkbox",value:!1,options:["Agree","Disagree"]},children:(e,l)=>{var o=a("Checkbox showing agreement state.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Checkbox showing agreement state.
</BoolBox>`}}});var w=i(g,2);s(w,{name:"CheckboxVisible",args:{variant:"checkbox",value:!0,options:["Visible","Hidden"]},children:(e,l)=>{var o=a("Checkbox for visibility toggle.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Checkbox for visibility toggle.
</BoolBox>`}}});var $=i(w,2);s($,{name:"CheckboxSmall",args:{variant:"checkbox",size:"sm",value:!0,options:["Yes","No"]},children:(e,l)=>{var o=a("Small checkbox variant.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Small checkbox variant.
</BoolBox>`}}});var B=i($,2);s(B,{name:"CheckboxLarge",args:{variant:"checkbox",size:"lg",value:!0,options:["Yes","No"]},children:(e,l)=>{var o=a("Large checkbox variant.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Large checkbox variant.
</BoolBox>`}}});var C=i(B,2);s(C,{name:"Radio",args:{variant:"radio",value:!0,options:["Yes","No"]},children:(e,l)=>{var o=a("Radio button variant for boolean selection.");t(e,o)},$$slots:{default:!0},parameters:{docs:{description:{story:"Radio Variant"}},__svelteCsf:{rawCode:`<BoolBox {...args}>
  Radio button variant for boolean selection.
</BoolBox>`}}});var S=i(C,2);s(S,{name:"RadioTrueFalse",args:{variant:"radio",value:!1,options:["True","False"]},children:(e,l)=>{var o=a("Radio buttons showing true/false options.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Radio buttons showing true/false options.
</BoolBox>`}}});var k=i(S,2);s(k,{name:"RadioActiveInactive",args:{variant:"radio",value:!0,options:["Active","Inactive"]},children:(e,l)=>{var o=a("Radio buttons for active/inactive state.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Radio buttons for active/inactive state.
</BoolBox>`}}});var R=i(k,2);s(R,{name:"RadioSmall",args:{variant:"radio",size:"sm",value:!0,options:["On","Off"]},children:(e,l)=>{var o=a("Small radio variant.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Small radio variant.
</BoolBox>`}}});var y=i(R,2);s(y,{name:"RadioLarge",args:{variant:"radio",size:"lg",value:!0,options:["On","Off"]},children:(e,l)=>{var o=a("Large radio variant.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Large radio variant.
</BoolBox>`}}});var L=i(y,2);s(L,{name:"WithLabel",args:{variant:"switch",label:"Enable notifications",helperText:"Receive push notifications on your device",options:["On","Off"]},children:(e,l)=>{var o=a("BoolBox with label and helper text.");t(e,o)},$$slots:{default:!0},parameters:{docs:{description:{story:"With Labels and Helper Text"}},__svelteCsf:{rawCode:`<BoolBox {...args}>
  BoolBox with label and helper text.
</BoolBox>`}}});var D=i(L,2);s(D,{name:"CheckboxWithLabel",args:{variant:"checkbox",label:"Subscribe to newsletter",helperText:"Get weekly updates in your inbox",options:["Subscribe","Unsubscribe"]},children:(e,l)=>{var o=a("Checkbox with label and helper text.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Checkbox with label and helper text.
</BoolBox>`}}});var O=i(D,2);s(O,{name:"RadioWithLabel",args:{variant:"radio",label:"Account status",helperText:"Select your account status",options:["Active","Inactive"]},children:(e,l)=>{var o=a("Radio buttons with label and helper text.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Radio buttons with label and helper text.
</BoolBox>`}}});var T=i(O,2);s(T,{name:"Required",args:{variant:"switch",label:"Accept terms",required:!0,helperText:"You must accept the terms to continue",options:["Accept","Decline"]},children:(e,l)=>{var o=a("Required BoolBox field with validation indicator.");t(e,o)},$$slots:{default:!0},parameters:{docs:{description:{story:"States"}},__svelteCsf:{rawCode:`<BoolBox {...args}>
  Required BoolBox field with validation indicator.
</BoolBox>`}}});var P=i(T,2);s(P,{name:"Disabled",args:{variant:"switch",label:"Feature toggle",disabled:!0,value:!0,options:["Enabled","Disabled"]},children:(e,l)=>{var o=a("Disabled BoolBox that cannot be changed.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  Disabled BoolBox that cannot be changed.
</BoolBox>`}}});var F=i(P,2);s(F,{name:"WithError",args:{variant:"checkbox",label:"Enable feature",feedback:{text:"This feature is currently unavailable",isError:!0},options:["Enable","Disable"]},children:(e,l)=>{var o=a("BoolBox with error feedback message.");t(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<BoolBox {...args}>
  BoolBox with error feedback message.
</BoolBox>`}}}),t(E,n),N()}W.__docgen={data:[],name:"bool-box.stories.svelte"};const r=q(W,j),ke=["Dropdown","DropdownYesNo","DropdownTrueFalse","DropdownOnOff","Switch","SwitchEnabled","SwitchSizes","SwitchSmall","SwitchLarge","SwitchXLarge","Checkbox","CheckboxAgree","CheckboxVisible","CheckboxSmall","CheckboxLarge","Radio","RadioTrueFalse","RadioActiveInactive","RadioSmall","RadioLarge","WithLabel","CheckboxWithLabel","RadioWithLabel","Required","Disabled","WithError"],Re={...r.Dropdown,tags:["svelte-csf-v5"]},ye={...r.DropdownYesNo,tags:["svelte-csf-v5"]},Le={...r.DropdownTrueFalse,tags:["svelte-csf-v5"]},De={...r.DropdownOnOff,tags:["svelte-csf-v5"]},Oe={...r.Switch,tags:["svelte-csf-v5"]},Te={...r.SwitchEnabled,tags:["svelte-csf-v5"]},Pe={...r.SwitchSizes,tags:["svelte-csf-v5"]},We={...r.SwitchSmall,tags:["svelte-csf-v5"]},Ee={...r.SwitchLarge,tags:["svelte-csf-v5"]},Ae={...r.SwitchXLarge,tags:["svelte-csf-v5"]},Fe={...r.Checkbox,tags:["svelte-csf-v5"]},ze={...r.CheckboxAgree,tags:["svelte-csf-v5"]},Ve={...r.CheckboxVisible,tags:["svelte-csf-v5"]},Ye={...r.CheckboxSmall,tags:["svelte-csf-v5"]},Ne={...r.CheckboxLarge,tags:["svelte-csf-v5"]},qe={...r.Radio,tags:["svelte-csf-v5"]},Ie={...r.RadioTrueFalse,tags:["svelte-csf-v5"]},Xe={...r.RadioActiveInactive,tags:["svelte-csf-v5"]},He={...r.RadioSmall,tags:["svelte-csf-v5"]},Ue={...r.RadioLarge,tags:["svelte-csf-v5"]},je={...r.WithLabel,tags:["svelte-csf-v5"]},Me={...r.CheckboxWithLabel,tags:["svelte-csf-v5"]},Ge={...r.RadioWithLabel,tags:["svelte-csf-v5"]},Ke={...r.Required,tags:["svelte-csf-v5"]},Je={...r.Disabled,tags:["svelte-csf-v5"]},Qe={...r.WithError,tags:["svelte-csf-v5"]};export{Fe as Checkbox,ze as CheckboxAgree,Ne as CheckboxLarge,Ye as CheckboxSmall,Ve as CheckboxVisible,Me as CheckboxWithLabel,Je as Disabled,Re as Dropdown,De as DropdownOnOff,Le as DropdownTrueFalse,ye as DropdownYesNo,qe as Radio,Xe as RadioActiveInactive,Ue as RadioLarge,He as RadioSmall,Ie as RadioTrueFalse,Ge as RadioWithLabel,Ke as Required,Oe as Switch,Te as SwitchEnabled,Ee as SwitchLarge,Pe as SwitchSizes,We as SwitchSmall,Ae as SwitchXLarge,Qe as WithError,je as WithLabel,ke as __namedExportsOrder,j as default};
