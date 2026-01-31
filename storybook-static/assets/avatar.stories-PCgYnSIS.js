import{p as A,f as $,a as y,t as r,b as t,s as l,c as x}from"./iframe-D7RYvwF5.js";import{c as S}from"./create-runtime-stories-z04xijIr.js";import{d as w}from"./index-CU8YG541.js";import{A as z}from"./avatar-BVGfFP4s.js";import{i as C}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./attributes-AHszVgQG.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";const L={component:z,title:"Generic/Avatar",tags:["autodocs"],argTypes:{src:{control:"text",description:"Image source URL for the avatar",table:{type:{summary:"string | undefined"}}},alt:{control:"text",description:"Alt text for the avatar image",table:{type:{summary:"string"},defaultValue:{summary:"''"}}},name:{control:"text",description:"Name to generate initials from (takes first letter of each word, max 2)",table:{type:{summary:"string | undefined"}}},size:{control:"select",options:["sm","md","lg","xl","full"],description:"Size of the avatar",table:{type:{summary:"ComponentSize"},defaultValue:{summary:"'md'"}}}},parameters:{docs:{description:{component:`Avatar component for displaying user profile pictures or initials.

**Accessibility**: Images include proper \`alt\` attributes. When using initials,
ensure the name prop is provided for proper context.

**Usage**:
\`\`\`svelte
<Avatar src="/avatar.jpg" alt="User avatar" />
<Avatar name="John Doe" />
\`\`\``}}}},{Story:s}=w();var P=$("<!> <!> <!> <!> <!> <!> <!>",1);function f(_,h){A(h,!1),C();var i=P(),m=y(i);s(m,{name:"WithImage",args:{src:"/sveltacular.png",alt:"Avatar"},children:(a,n)=>{var e=r("Avatar displaying an image from a URL.");t(a,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Avatar {...args}>
  Avatar displaying an image from a URL.
</Avatar>`}}});var v=l(m,2);s(v,{name:"WithName",args:{name:"John Doe"},children:(a,n)=>{var e=r("Avatar displaying initials generated from a name (JD).");t(a,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Avatar {...args}>
  Avatar displaying initials generated from a name (JD).
</Avatar>`}}});var d=l(v,2);s(d,{name:"Placeholder",children:(a,n)=>{var e=r("Avatar placeholder when no image or name is provided.");t(a,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Avatar {...args}>
  Avatar placeholder when no image or name is provided.
</Avatar>`}}});var p=l(d,2);s(p,{name:"Small",args:{name:"JD",size:"sm"},children:(a,n)=>{var e=r("Small avatar size for compact spaces.");t(a,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Avatar {...args}>
  Small avatar size for compact spaces.
</Avatar>`}}});var c=l(p,2);s(c,{name:"Large",args:{name:"John Doe",size:"lg"},children:(a,n)=>{var e=r("Large avatar size for prominent display.");t(a,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Avatar {...args}>
  Large avatar size for prominent display.
</Avatar>`}}});var g=l(c,2);s(g,{name:"AllSizes",args:{name:"John Doe"},children:(a,n)=>{var e=r("All avatar sizes displayed together for comparison.");t(a,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Avatar {...args}>
  All avatar sizes displayed together for comparison.
</Avatar>`}}});var u=l(g,2);s(u,{name:"LongName",args:{name:"John Michael Smith"},children:(a,n)=>{var e=r("Avatar with a longer name (shows first two initials: JM).");t(a,e)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Avatar {...args}>
  Avatar with a longer name (shows first two initials: JM).
</Avatar>`}}}),t(_,i),x()}f.__docgen={data:[],name:"avatar.stories.svelte"};const o=S(f,L),V=["WithImage","WithName","Placeholder","Small","Large","AllSizes","LongName"],j={...o.WithImage,tags:["svelte-csf-v5"]},k={...o.WithName,tags:["svelte-csf-v5"]},E={...o.Placeholder,tags:["svelte-csf-v5"]},G={...o.Small,tags:["svelte-csf-v5"]},O={...o.Large,tags:["svelte-csf-v5"]},T={...o.AllSizes,tags:["svelte-csf-v5"]},q={...o.LongName,tags:["svelte-csf-v5"]};export{T as AllSizes,O as Large,q as LongName,E as Placeholder,G as Small,j as WithImage,k as WithName,V as __namedExportsOrder,L as default};
