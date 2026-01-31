import{p as D,f as a,a as u,t as y,b as r,s as n,e as m,c as $}from"./iframe-D7RYvwF5.js";import{c as S}from"./create-runtime-stories-z04xijIr.js";import{d as b}from"./index-CU8YG541.js";import{D as o}from"./divider-C9z6YG8R.js";import{i as x}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./class-CSG4cUfb.js";const w={component:o,title:"Generic/Divider",tags:["autodocs"],parameters:{docs:{description:{component:`Divider component for visually separating content sections.

**Accessibility**: Uses semantic \`<hr>\` element. Screen readers will announce
it as a separator, providing clear content boundaries.

**Usage**:
\`\`\`svelte
<div>Content above</div>
<Divider />
<div>Content below</div>
\`\`\``}}}},{Story:s}=b();var M=a('<div style="padding: 1rem;"><p>Content above the divider</p> <!> <p>Content below the divider</p></div>'),I=a('<div style="padding: 1rem;"><section><h3 style="margin: 0 0 0.5rem 0;">Section 1</h3> <p style="margin: 0;">Content for section 1</p></section> <!> <section><h3 style="margin: 0 0 0.5rem 0;">Section 2</h3> <p style="margin: 0;">Content for section 2</p></section> <!> <section><h3 style="margin: 0 0 0.5rem 0;">Section 3</h3> <p style="margin: 0;">Content for section 3</p></section></div>'),P=a("<!> <!> <!>",1);function f(g,_){D(_,!1),x();var v=P(),l=u(v);s(l,{name:"Standard",children:(t,p)=>{var e=y("Standard horizontal divider for separating content sections.");r(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Divider {...args}>
  Standard horizontal divider for separating content sections.
</Divider>`}}});var c=n(l,2);s(c,{name:"InContext",children:(t,p)=>{var e=M(),i=n(m(e),2);o(i,{}),r(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Divider {...args}>
   <div style="padding: 1rem;">
<p>Content above the divider</p>
<Divider />
<p>Content below the divider</p>
</div>
 </Divider>`}}});var h=n(c,2);s(h,{name:"MultipleDividers",children:(t,p)=>{var e=I(),i=n(m(e),2);o(i,{});var C=n(i,4);o(C,{}),r(t,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Divider {...args}>
   <div style="padding: 1rem;">
<section>
	<h3 style="margin: 0 0 0.5rem 0;">Section 1</h3>
	<p style="margin: 0;">Content for section 1</p>
</section>
<Divider />
<section>
	<h3 style="margin: 0 0 0.5rem 0;">Section 2</h3>
	<p style="margin: 0;">Content for section 2</p>
</section>
<Divider />
<section>
	<h3 style="margin: 0 0 0.5rem 0;">Section 3</h3>
	<p style="margin: 0;">Content for section 3</p>
</section>
</div>
 </Divider>`}}}),r(g,v),$()}f.__docgen={data:[],name:"divider.stories.svelte"};const d=S(f,w),j=["Standard","InContext","MultipleDividers"],k={...d.Standard,tags:["svelte-csf-v5"]},q={...d.InContext,tags:["svelte-csf-v5"]},B={...d.MultipleDividers,tags:["svelte-csf-v5"]};export{q as InContext,B as MultipleDividers,k as Standard,j as __namedExportsOrder,w as default};
