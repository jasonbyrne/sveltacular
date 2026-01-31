import{p as V,f as u,a as E,s as e,e as r,b as d,c as b}from"./iframe-D7RYvwF5.js";import{c as L}from"./create-runtime-stories-z04xijIr.js";import{d as w}from"./index-CU8YG541.js";import{P as s}from"./progress-DwQDvMts.js";import{i as M}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";const O={component:s,title:"Placeholders/Progress",tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1},description:"Progress value (0-100)"},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Size of the progress bar",table:{type:{summary:"ComponentSize"},defaultValue:{summary:"md"}}}}},{Story:m}=w();var R=u('<div style="display: flex; flex-direction: column; gap: 1.5rem;"><div><h4>Extra Small (xs)</h4> <!></div> <div><h4>Small (sm)</h4> <!></div> <div><h4>Medium (md)</h4> <!></div> <div><h4>Large (lg)</h4> <!></div> <div><h4>Extra Large (xl)</h4> <!></div></div>'),T=u('<div style="display: flex; flex-direction: column; gap: 1rem;"><!> <!> <!> <!> <!></div>'),j=u("<!> <!> <!>",1);function h(x,P){V(P,!1),M();var f=j(),_=E(f);m(_,{name:"Default",args:{value:50},parameters:{__svelteCsf:{rawCode:"<Progress {...args} />"}}});var p=e(_,2);m(p,{name:"Sizes",children:(n,y)=>{var a=R(),i=r(a),l=e(r(i),2);s(l,{value:65,size:"xs"});var o=e(i,2),t=e(r(o),2);s(t,{value:75,size:"sm"});var v=e(o,2),S=e(r(v),2);s(S,{value:50,size:"md"});var c=e(v,2),$=e(r(c),2);s($,{value:80,size:"lg"});var D=e(c,2),C=e(r(D),2);s(C,{value:90,size:"xl"}),d(n,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Progress {...args}>
   <div style="display: flex; flex-direction: column; gap: 1.5rem;">
<div>
	<h4>Extra Small (xs)</h4>
	<Progress value={65} size="xs" />
</div>
<div>
	<h4>Small (sm)</h4>
	<Progress value={75} size="sm" />
</div>
<div>
	<h4>Medium (md)</h4>
	<Progress value={50} size="md" />
</div>
<div>
	<h4>Large (lg)</h4>
	<Progress value={80} size="lg" />
</div>
<div>
	<h4>Extra Large (xl)</h4>
	<Progress value={90} size="xl" />
</div>
</div>
 </Progress>`}}});var z=e(p,2);m(z,{name:"Different Values",children:(n,y)=>{var a=T(),i=r(a);s(i,{value:10});var l=e(i,2);s(l,{value:30});var o=e(l,2);s(o,{value:50});var t=e(o,2);s(t,{value:75});var v=e(t,2);s(v,{value:100}),d(n,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Progress {...args}>
   <div style="display: flex; flex-direction: column; gap: 1rem;">
<Progress value={10} />
<Progress value={30} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />
</div>
 </Progress>`}}}),d(x,f),b()}h.__docgen={data:[],name:"progress.stories.svelte"};const g=L(h,O),J=["Default","Sizes","DifferentValues"],K={...g.Default,tags:["svelte-csf-v5"]},N={...g.Sizes,tags:["svelte-csf-v5"]},Q={...g.DifferentValues,tags:["svelte-csf-v5"]};export{K as Default,Q as DifferentValues,N as Sizes,J as __namedExportsOrder,O as default};
