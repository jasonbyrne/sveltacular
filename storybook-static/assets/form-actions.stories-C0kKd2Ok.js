import{p as O,f as l,a as N,s as t,e as m,b as i,g as s,d,c as z}from"./iframe-D7RYvwF5.js";import{c as I}from"./create-runtime-stories-z04xijIr.js";import{d as K}from"./index-CU8YG541.js";import{F as v}from"./form-actions-BnEuTURS.js";import{L}from"./list-box-ZLqeBCYW.js";import{i as U}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./each-ldT_kV30.js";import"./button-BYNa-MSv.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";import"./spinner-Cpf7SZnL.js";import"./icon-v8TPefiR.js";import"./ucfirst-D2sS6U5O.js";import"./input-CeMRp2yv.js";import"./this-p55_KPOp.js";import"./form-Dq9J9N2L.js";import"./form-field-De-aDgvW.js";import"./unique-id-JjuMjhtj.js";import"./menu-Dbx_mKWU.js";import"./flex-item-vFOmLPoH.js";import"./flex-row-DqBsqYfl.js";import"./prompt-BhA4zG_Z.js";import"./dialog-close-button-BPUww50_.js";import"./dialog-header-BQj1Bwmf.js";import"./overlay-oqNK3s9E.js";import"./divider-C9z6YG8R.js";import"./text-box-DRUkwi5y.js";import"./form-input-wrapper-C7eEHXga.js";import"./animations-2Xgw79Wl.js";const{fn:o}=__STORYBOOK_MODULE_TEST__,G={title:"Forms/FormActions",tags:["autodocs"],parameters:{docs:{description:{component:`FormActions component provides a consistent layout for form action buttons.

**Features:**
- Submit button is always present (type="submit" by default)
- Optional cancel button (just add onCancel handler)
- Additional custom buttons can be placed between cancel and submit
- Top-level disabled prop affects all buttons (useful during form submission)
- Responsive: stacks vertically on mobile

**Usage:**
\`\`\`svelte
<FormActions
  onCancel={handleCancel}
  submitText="Save Changes"
/>
\`\`\``}}}},{Story:u}=K();var j=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Form content goes here...</p> <!></div>'),q=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Form content goes here...</p> <!></div>'),Y=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Form content goes here...</p> <!></div>'),H=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Form content goes here...</p> <!></div>'),J=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Are you sure you want to delete this item?</p> <!></div>'),Q=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Article editor...</p> <!></div>'),X=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Form is being saved...</p> <!></div>'),Z=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Form content goes here...</p> <!></div>'),ee=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Complex form with multiple actions...</p> <!></div>'),te=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Wizard step 2 of 3...</p> <!></div>'),re=l('<span style="color: var(--gray-500); font-size: var(--font-sm);">Draft saved</span>'),ae=l('<div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><p style="margin: 0 0 1rem 0;">Resize window to see responsive behavior (stacks on mobile)</p> <!></div>'),ne=l('<div style="max-width: 600px; background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><h3 style="margin-top: 0;">Contact Us</h3> <form><div style="margin-bottom: 1rem;"><label for="contact-name" style="display: block; margin-bottom: 0.5rem;">Name</label> <input id="contact-name" type="text" style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"/></div> <div style="margin-bottom: 1rem;"><label for="contact-email" style="display: block; margin-bottom: 0.5rem;">Email</label> <input id="contact-email" type="email" style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"/></div> <div style="margin-bottom: 1rem;"><label for="contact-message" style="display: block; margin-bottom: 0.5rem;">Message</label> <textarea id="contact-message" rows="4" style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"></textarea></div> <!></form></div>'),oe=l('<span style="color: var(--gray-500); font-size: var(--font-sm);">Auto-saved 30 seconds ago</span>'),ie=l('<div style="max-width: 800px; background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><h3 style="margin-top: 0;">Edit Article</h3> <form><div style="margin-bottom: 1rem;"><label for="article-title" style="display: block; margin-bottom: 0.5rem;">Title</label> <input id="article-title" type="text" value="My Article Title" style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"/></div> <div style="margin-bottom: 1rem;"><label for="article-content" style="display: block; margin-bottom: 0.5rem;">Content</label> <textarea id="article-content" rows="8" style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);">Article content here...</textarea></div> <!></form></div>'),se=l(`<div style="max-width: 500px; background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"><h3 style="margin-top: 0;">Delete Account</h3> <p style="color: var(--gray-600);">This action cannot be undone. This will permanently delete your account and all associated
			data.</p> <div style="margin: 1.5rem 0;"><label for="confirm-delete" style="display: flex; align-items: center; gap: 0.5rem;"><input id="confirm-delete" type="checkbox"/> <span>I understand this action is permanent</span></label></div> <!></div>`),de=l("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function P(R,V){O(V,!1),U();var y=de(),f=N(y);u(f,{name:"Default (Submit Only)",children:(r,b)=>{var e=j(),a=t(m(e),2);v(a,{}),i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
<FormActions />
</div>
 </undefined>`}}});var _=t(f,2);u(_,{name:"With Cancel Button",children:(r,b)=>{var e=q(),a=t(m(e),2);{let n=d(o);v(a,{get onCancel(){return s(n)}})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
<FormActions onCancel={fn()} />
</div>
 </undefined>`}}});var C=t(_,2);u(C,{name:"Custom Text",children:(r,b)=>{var e=Y(),a=t(m(e),2);{let n=d(o);v(a,{get onCancel(){return s(n)},cancelText:"Go Back",submitText:"Save Changes"})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
<FormActions onCancel={fn()} cancelText="Go Back" submitText="Save Changes" />
</div>
 </undefined>`}}});var h=t(C,2);u(h,{name:"Custom Variants",children:(r,b)=>{var e=H(),a=t(m(e),2);{let n=d(o);v(a,{get onCancel(){return s(n)},cancelVariant:"outline",submitVariant:"positive",submitText:"Save"})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
<FormActions
	onCancel={fn()}
	cancelVariant="outline"
	submitVariant="positive"
	submitText="Save"
/>
</div>
 </undefined>`}}});var $=t(h,2);u($,{name:"Danger Action",children:(r,b)=>{var e=J(),a=t(m(e),2);{let n=d(o);v(a,{get onCancel(){return s(n)},cancelText:"Keep",submitText:"Delete",submitVariant:"danger"})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Are you sure you want to delete this item?</p>
<FormActions onCancel={fn()} cancelText="Keep" submitText="Delete" submitVariant="danger" />
</div>
 </undefined>`}}});var x=t($,2);u(x,{name:"With Additional Buttons",children:(r,b)=>{var e=Q(),a=t(m(e),2);{let n=d(o),p=d(()=>[{text:"Save Draft",variant:"outline",onClick:o()},{text:"Preview",variant:"secondary",onClick:o()}]);v(a,{get onCancel(){return s(n)},submitText:"Publish",get additionalButtons(){return s(p)}})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Article editor...</p>
<FormActions
	onCancel={fn()}
	submitText="Publish"
	additionalButtons={[
		{ text: 'Save Draft', variant: 'outline', onClick: fn() },
		{ text: 'Preview', variant: 'secondary', onClick: fn() }
	]}
/>
</div>
 </undefined>`}}});var A=t(x,2);u(A,{name:"Disabled State",children:(r,b)=>{var e=X(),a=t(m(e),2);{let n=d(o);v(a,{get onCancel(){return s(n)},submitText:"Saving...",disabled:!0})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Form is being saved...</p>
<FormActions onCancel={fn()} submitText="Saving..." disabled />
</div>
 </undefined>`}}});var k=t(A,2);u(k,{name:"With Custom Content",children:(r,b)=>{var e=Z(),a=t(m(e),2);{let n=d(o);v(a,{get onCancel(){return s(n)},children:(p,g)=>{L(p,{label:"Select an item",items:[{label:"Item 1",value:"item1"},{label:"Item 2",value:"item2"}]})},$$slots:{default:!0}})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Form content goes here...</p>
<FormActions onCancel={fn()}>
	<ListBox
		label="Select an item"
		items={[
			{ label: 'Item 1', value: 'item1' },
			{ label: 'Item 2', value: 'item2' }
		]}
	/>
</FormActions>
</div>
 </undefined>`}}});var w=t(k,2);u(w,{name:"Multiple Additional Buttons",children:(r,b)=>{var e=ee(),a=t(m(e),2);{let n=d(o),p=d(()=>[{text:"Reset",variant:"outline",onClick:o()},{text:"Save Progress",variant:"secondary",onClick:o()},{text:"Validate",variant:"outline",onClick:o()}]);v(a,{get onCancel(){return s(n)},submitText:"Finish",get additionalButtons(){return s(p)}})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Complex form with multiple actions...</p>
<FormActions
	onCancel={fn()}
	submitText="Finish"
	additionalButtons={[
		{ text: 'Reset', variant: 'outline', onClick: fn() },
		{ text: 'Save Progress', variant: 'secondary', onClick: fn() },
		{ text: 'Validate', variant: 'outline', onClick: fn() }
	]}
></FormActions>
</div>
 </undefined>`}}});var T=t(w,2);u(T,{name:"No Cancel, With Additional",children:(r,b)=>{var e=te(),a=t(m(e),2);{let n=d(()=>[{text:"Previous",variant:"secondary",onClick:o()}]);v(a,{submitText:"Next",get additionalButtons(){return s(n)}})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Wizard step 2 of 3...</p>
<FormActions
	submitText="Next"
	additionalButtons={[{ text: 'Previous', variant: 'secondary', onClick: fn() }]}
/>
</div>
 </undefined>`}}});var F=t(T,2);u(F,{name:"Responsive Demo",children:(r,b)=>{var e=ae(),a=t(m(e),2);{let n=d(o),p=d(()=>[{text:"Reset",variant:"outline",onClick:o()}]);v(a,{get onCancel(){return s(n)},submitText:"Save",get additionalButtons(){return s(p)},children:(g,S)=>{var B=re();i(g,B)},$$slots:{default:!0}})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div style="background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);">
<p style="margin: 0 0 1rem 0;">Resize window to see responsive behavior (stacks on mobile)</p>
<FormActions
	onCancel={fn()}
	submitText="Save"
	additionalButtons={[{ text: 'Reset', variant: 'outline', onClick: fn() }]}
>
	<span style="color: var(--gray-500); font-size: var(--font-sm);"> Draft saved </span>
</FormActions>
</div>
 </undefined>`}}});var D=t(F,2);u(D,{name:"Real-World: Contact Form",children:(r,b)=>{var e=ne(),a=t(m(e),2),n=t(m(a),6);{let p=d(o);v(n,{get onCancel(){return s(p)},submitText:"Send Message",submitVariant:"primary"})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div
style="max-width: 600px; background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"
>
<h3 style="margin-top: 0;">Contact Us</h3>
<form>
	<div style="margin-bottom: 1rem;">
		<label for="contact-name" style="display: block; margin-bottom: 0.5rem;">Name</label>
		<input
			id="contact-name"
			type="text"
			style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
		/>
	</div>
	<div style="margin-bottom: 1rem;">
		<label for="contact-email" style="display: block; margin-bottom: 0.5rem;">Email</label>
		<input
			id="contact-email"
			type="email"
			style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
		/>
	</div>
	<div style="margin-bottom: 1rem;">
		<label for="contact-message" style="display: block; margin-bottom: 0.5rem;">Message</label>
		<textarea
			id="contact-message"
			rows="4"
			style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
		></textarea>
	</div>
	<FormActions onCancel={fn()} submitText="Send Message" submitVariant="primary" />
</form>
</div>
 </undefined>`}}});var W=t(D,2);u(W,{name:"Real-World: Article Editor",children:(r,b)=>{var e=ie(),a=t(m(e),2),n=t(m(a),4);{let p=d(o),g=d(()=>[{text:"Save Draft",variant:"outline",onClick:o()},{text:"Preview",variant:"secondary",onClick:o()}]);v(n,{get onCancel(){return s(p)},submitText:"Publish",submitVariant:"positive",get additionalButtons(){return s(g)},children:(S,B)=>{var E=oe();i(S,E)},$$slots:{default:!0}})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div
style="max-width: 800px; background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"
>
<h3 style="margin-top: 0;">Edit Article</h3>
<form>
	<div style="margin-bottom: 1rem;">
		<label for="article-title" style="display: block; margin-bottom: 0.5rem;">Title</label>
		<input
			id="article-title"
			type="text"
			value="My Article Title"
			style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
		/>
	</div>
	<div style="margin-bottom: 1rem;">
		<label for="article-content" style="display: block; margin-bottom: 0.5rem;">Content</label>
		<textarea
			id="article-content"
			rows="8"
			style="width: 100%; padding: 0.5rem; border: 1px solid var(--gray-400); border-radius: var(--radius-sm);"
			>Article content here...</textarea
		>
	</div>
	<FormActions
		onCancel={fn()}
		submitText="Publish"
		submitVariant="positive"
		additionalButtons={[
			{ text: 'Save Draft', variant: 'outline', onClick: fn() },
			{ text: 'Preview', variant: 'secondary', onClick: fn() }
		]}
	>
		<span style="color: var(--gray-500); font-size: var(--font-sm);">
			Auto-saved 30 seconds ago
		</span>
	</FormActions>
</form>
</div>
 </undefined>`}}});var M=t(W,2);u(M,{name:"Real-World: Destructive Action",children:(r,b)=>{var e=se(),a=t(m(e),6);{let n=d(o);v(a,{get onCancel(){return s(n)},cancelText:"Keep Account",submitText:"Delete My Account",submitVariant:"danger"})}i(r,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div
style="max-width: 500px; background: var(--body-bg); padding: 2rem; border-radius: var(--radius-md);"
>
<h3 style="margin-top: 0;">Delete Account</h3>
<p style="color: var(--gray-600);">
	This action cannot be undone. This will permanently delete your account and all associated
	data.
</p>
<div style="margin: 1.5rem 0;">
	<label for="confirm-delete" style="display: flex; align-items: center; gap: 0.5rem;">
		<input id="confirm-delete" type="checkbox" />
		<span>I understand this action is permanent</span>
	</label>
</div>
<FormActions
	onCancel={fn()}
	cancelText="Keep Account"
	submitText="Delete My Account"
	submitVariant="danger"
/>
</div>
 </undefined>`}}}),i(R,y),z()}P.__docgen={data:[],name:"form-actions.stories.svelte"};const c=I(P,G),ze=["DefaultSubmitOnly","WithCancelButton","CustomText","CustomVariants","DangerAction","WithAdditionalButtons","DisabledState","WithCustomContent","MultipleAdditionalButtons","NoCancelWithAdditional","ResponsiveDemo","RealWorldContactForm","RealWorldArticleEditor","RealWorldDestructiveAction"],Ie={...c.DefaultSubmitOnly,tags:["svelte-csf-v5"]},Ke={...c.WithCancelButton,tags:["svelte-csf-v5"]},Le={...c.CustomText,tags:["svelte-csf-v5"]},Ue={...c.CustomVariants,tags:["svelte-csf-v5"]},Ge={...c.DangerAction,tags:["svelte-csf-v5"]},je={...c.WithAdditionalButtons,tags:["svelte-csf-v5"]},qe={...c.DisabledState,tags:["svelte-csf-v5"]},Ye={...c.WithCustomContent,tags:["svelte-csf-v5"]},He={...c.MultipleAdditionalButtons,tags:["svelte-csf-v5"]},Je={...c.NoCancelWithAdditional,tags:["svelte-csf-v5"]},Qe={...c.ResponsiveDemo,tags:["svelte-csf-v5"]},Xe={...c.RealWorldContactForm,tags:["svelte-csf-v5"]},Ze={...c.RealWorldArticleEditor,tags:["svelte-csf-v5"]},et={...c.RealWorldDestructiveAction,tags:["svelte-csf-v5"]};export{Le as CustomText,Ue as CustomVariants,Ge as DangerAction,Ie as DefaultSubmitOnly,qe as DisabledState,He as MultipleAdditionalButtons,Je as NoCancelWithAdditional,Ze as RealWorldArticleEditor,Xe as RealWorldContactForm,et as RealWorldDestructiveAction,Qe as ResponsiveDemo,je as WithAdditionalButtons,Ke as WithCancelButton,Ye as WithCustomContent,ze as __namedExportsOrder,G as default};
