import{p as E,f as s,a as y,b as e,e as c,s as l,c as M}from"./iframe-D7RYvwF5.js";import{c as O}from"./create-runtime-stories-z04xijIr.js";import{d as V}from"./index-CU8YG541.js";import{F as r}from"./flex-row-DqBsqYfl.js";import{F as P}from"./flex-col-DvP6OZHd.js";import{F as w}from"./flex-item-vFOmLPoH.js";import{i as q}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./class-CSG4cUfb.js";import"./style-OEUvFely.js";const K={component:r,title:"Layout/Flex",tags:["autodocs"],argTypes:{gap:{control:"select",options:["xs","sm","md","base","lg","xl","2xl"],description:"Gap between items using standard spacing tokens"},justify:{control:"select",options:["flex-start","flex-end","center","space-between","space-around","space-evenly"],description:"Justify content along the main axis"},align:{control:"select",options:["flex-start","flex-end","center","stretch","baseline"],description:"Align items along the cross axis"},wrap:{control:"boolean",description:"Whether to wrap items to next line"},fullWidth:{control:"boolean",description:"Whether to take full width"}},parameters:{docs:{description:{component:`Flexbox layout components for creating flexible, responsive layouts.

**Components**:
- \`FlexRow\` - Horizontal flex container (row direction)
- \`FlexCol\` - Vertical flex container (column direction)
- \`FlexItem\` - Individual flex item with growth and alignment controls

**Usage**:
\`\`\`svelte
<FlexRow gap="md" justify="space-between">
  <FlexItem grow>
    <div>Content that grows</div>
  </FlexItem>
  <FlexItem>
    <Button>Action</Button>
  </FlexItem>
</FlexRow>
\`\`\``}}}},{Story:F}=V();var Q=s('<div class="demo-box small svelte-a4z13y">Item 1</div> <div class="demo-box small svelte-a4z13y">Item 2</div> <div class="demo-box small svelte-a4z13y">Item 3</div>',1),X=s('<div class="container svelte-a4z13y"><!></div> Basic horizontal layout with medium gap spacing.',1),Y=s('<div class="demo-box medium svelte-a4z13y">Item 1</div> <div class="demo-box medium svelte-a4z13y">Item 2</div> <div class="demo-box medium svelte-a4z13y">Item 3</div>',1),Z=s('<div class="container svelte-a4z13y"><!></div> Basic vertical layout with medium gap spacing.',1),ee=s('<div class="demo-box small svelte-a4z13y">xs</div> <div class="demo-box small svelte-a4z13y">gap</div>',1),se=s('<div class="demo-box small svelte-a4z13y">sm</div> <div class="demo-box small svelte-a4z13y">gap</div>',1),le=s('<div class="demo-box small svelte-a4z13y">md</div> <div class="demo-box small svelte-a4z13y">gap</div>',1),ae=s('<div class="demo-box small svelte-a4z13y">base</div> <div class="demo-box small svelte-a4z13y">gap</div>',1),te=s('<div class="demo-box small svelte-a4z13y">lg</div> <div class="demo-box small svelte-a4z13y">gap</div>',1),oe=s('<div class="demo-box small svelte-a4z13y">xl</div> <div class="demo-box small svelte-a4z13y">gap</div>',1),de=s('<div class="container svelte-a4z13y"><!></div> <div class="container svelte-a4z13y"><!></div> <div class="container svelte-a4z13y"><!></div> <div class="container svelte-a4z13y"><!></div> <div class="container svelte-a4z13y"><!></div> <div class="container svelte-a4z13y"><!></div> Different gap sizes using standard spacing tokens (xs, sm, md, base, lg, xl, 2xl).',1),ie=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box small svelte-a4z13y">2</div>',1),ne=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box small svelte-a4z13y">2</div>',1),re=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box small svelte-a4z13y">2</div>',1),ve=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box small svelte-a4z13y">2</div>',1),me=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box small svelte-a4z13y">2</div>',1),ce=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box small svelte-a4z13y">2</div>',1),xe=s('<div class="container svelte-a4z13y"><strong>flex-start (default):</strong> <!></div> <div class="container svelte-a4z13y"><strong>center:</strong> <!></div> <div class="container svelte-a4z13y"><strong>flex-end:</strong> <!></div> <div class="container svelte-a4z13y"><strong>space-between:</strong> <!></div> <div class="container svelte-a4z13y"><strong>space-around:</strong> <!></div> <div class="container svelte-a4z13y"><strong>space-evenly:</strong> <!></div> Different justify-content options for aligning items along the main axis.',1),ge=s('<div class="demo-box small svelte-a4z13y" style="height: auto;">1</div> <div class="demo-box medium svelte-a4z13y" style="height: auto;">2</div> <div class="demo-box small svelte-a4z13y" style="height: auto;">3</div>',1),pe=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box medium svelte-a4z13y">2</div> <div class="demo-box small svelte-a4z13y">3</div>',1),ue=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box medium svelte-a4z13y">2</div> <div class="demo-box small svelte-a4z13y">3</div>',1),fe=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box medium svelte-a4z13y">2</div> <div class="demo-box small svelte-a4z13y">3</div>',1),_e=s('<div class="container svelte-a4z13y" style="height: 150px;"><strong>stretch (default):</strong> <!></div> <div class="container svelte-a4z13y" style="height: 150px;"><strong>flex-start:</strong> <!></div> <div class="container svelte-a4z13y" style="height: 150px;"><strong>center:</strong> <!></div> <div class="container svelte-a4z13y" style="height: 150px;"><strong>flex-end:</strong> <!></div> Different align-items options for aligning items along the cross axis.',1),$e=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box small svelte-a4z13y">2</div> <div class="demo-box small svelte-a4z13y">3</div> <div class="demo-box small svelte-a4z13y">4</div> <div class="demo-box small svelte-a4z13y">5</div> <div class="demo-box small svelte-a4z13y">6</div> <div class="demo-box small svelte-a4z13y">7</div>',1),ye=s(`<div class="container svelte-a4z13y"><!></div> Items wrap to the next line when there's not enough space.`,1),he=s('<div class="demo-box small svelte-a4z13y">Fixed</div>'),be=s('<div class="demo-box medium svelte-a4z13y" style="width: 100%;">Grows</div>'),we=s('<div class="demo-box small svelte-a4z13y">Fixed</div>'),Fe=s("<!> <!> <!>",1),ze=s('<div class="container svelte-a4z13y"><!></div> Use FlexItem with grow prop to make items expand to fill available space.',1),Re=s('<div class="demo-box small svelte-a4z13y">Top</div>'),Ie=s('<div class="demo-box small svelte-a4z13y">Center</div>'),Pe=s('<div class="demo-box small svelte-a4z13y">Bottom</div>'),Ce=s('<div class="demo-box medium svelte-a4z13y" style="height: auto;">Stretch</div>'),We=s("<!> <!> <!> <!>",1),je=s(`<div class="container svelte-a4z13y" style="height: 150px;"><!></div> Individual items can override the container's alignment using FlexItem's align prop.`,1),Be=s('<div class="demo-box medium svelte-a4z13y" style="width: 100%;">Header</div> <div class="demo-box large svelte-a4z13y" style="width: 100%;">Content</div> <div class="demo-box medium svelte-a4z13y" style="width: 100%;">Footer</div>',1),Ae=s('<div class="demo-box tall svelte-a4z13y">Side</div> <div class="demo-box tall svelte-a4z13y">Bar</div>',1),Se=s("<!> <!>",1),Ge=s('<div class="container svelte-a4z13y"><!></div> Nested flex layouts: FlexRow containing FlexCol with FlexItem for complex layouts.',1),Le=s('<div class="demo-box medium svelte-a4z13y" style="width: 100%;">Name Input</div>'),Ne=s('<div class="demo-box small svelte-a4z13y" style="width: 100px;">Age Input</div>'),ke=s("<!> <!>",1),De=s('<div class="demo-box large svelte-a4z13y" style="width: 100%;">Address Input</div>'),Je=s('<div class="demo-box small svelte-a4z13y" style="width: 100px;">Cancel</div>'),Te=s('<div class="demo-box small svelte-a4z13y" style="width: 100px;">Submit</div>'),He=s("<!> <!>",1),Ue=s("<!> <!> <!>",1),Ee=s('<div class="container svelte-a4z13y"><!></div> Common form layout pattern using flex components.',1),Me=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box small svelte-a4z13y">2</div> <div class="demo-box small svelte-a4z13y">3</div>',1),Oe=s('<div class="demo-box small svelte-a4z13y">1</div> <div class="demo-box small svelte-a4z13y">2</div> <div class="demo-box small svelte-a4z13y">3</div>',1),Ve=s(`<div class="container svelte-a4z13y"><!></div> <div class="container svelte-a4z13y"><!></div> Toggle fullWidth to control whether the container takes full width. First row: fullWidth=true (default),
	Second row: fullWidth=false (auto width).`,1),qe=s("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function J(T,H){E(H,!1),q();var C=qe(),W=y(C);F(W,{name:"BasicRow",children:(p,R)=>{var a=X(),v=y(a),u=c(v);r(u,{gap:"md",children:(x,b)=>{var o=Q();e(x,o)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container">
<FlexRow gap="md">
	<div class="demo-box small">Item 1</div>
	<div class="demo-box small">Item 2</div>
	<div class="demo-box small">Item 3</div>
</FlexRow>
</div>
Basic horizontal layout with medium gap spacing.
 </FlexRow>`}}});var j=l(W,2);F(j,{name:"BasicColumn",children:(p,R)=>{var a=Z(),v=y(a),u=c(v);P(u,{gap:"md",children:(x,b)=>{var o=Y();e(x,o)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container">
<FlexCol gap="md">
	<div class="demo-box medium">Item 1</div>
	<div class="demo-box medium">Item 2</div>
	<div class="demo-box medium">Item 3</div>
</FlexCol>
</div>
Basic vertical layout with medium gap spacing.
 </FlexRow>`}}});var B=l(j,2);F(B,{name:"GapSizes",children:(p,R)=>{var a=de(),v=y(a),u=c(v);r(u,{gap:"xs",children:(i,$)=>{var n=ee();e(i,n)},$$slots:{default:!0}});var x=l(v,2),b=c(x);r(b,{gap:"sm",children:(i,$)=>{var n=se();e(i,n)},$$slots:{default:!0}});var o=l(x,2),_=c(o);r(_,{gap:"md",children:(i,$)=>{var n=le();e(i,n)},$$slots:{default:!0}});var g=l(o,2),h=c(g);r(h,{gap:"base",children:(i,$)=>{var n=ae();e(i,n)},$$slots:{default:!0}});var d=l(g,2),m=c(d);r(m,{gap:"lg",children:(i,$)=>{var n=te();e(i,n)},$$slots:{default:!0}});var t=l(d,2),f=c(t);r(f,{gap:"xl",children:(i,$)=>{var n=oe();e(i,n)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container">
<FlexRow gap="xs">
	<div class="demo-box small">xs</div>
	<div class="demo-box small">gap</div>
</FlexRow>
</div>
<div class="container">
<FlexRow gap="sm">
	<div class="demo-box small">sm</div>
	<div class="demo-box small">gap</div>
</FlexRow>
</div>
<div class="container">
<FlexRow gap="md">
	<div class="demo-box small">md</div>
	<div class="demo-box small">gap</div>
</FlexRow>
</div>
<div class="container">
<FlexRow gap="base">
	<div class="demo-box small">base</div>
	<div class="demo-box small">gap</div>
</FlexRow>
</div>
<div class="container">
<FlexRow gap="lg">
	<div class="demo-box small">lg</div>
	<div class="demo-box small">gap</div>
</FlexRow>
</div>
<div class="container">
<FlexRow gap="xl">
	<div class="demo-box small">xl</div>
	<div class="demo-box small">gap</div>
</FlexRow>
</div>
Different gap sizes using standard spacing tokens (xs, sm, md, base, lg, xl, 2xl).
 </FlexRow>`}}});var A=l(B,2);F(A,{name:"JustifyContent",children:(p,R)=>{var a=xe(),v=y(a),u=l(c(v),2);r(u,{justify:"flex-start",gap:"md",children:(i,$)=>{var n=ie();e(i,n)},$$slots:{default:!0}});var x=l(v,2),b=l(c(x),2);r(b,{justify:"center",gap:"md",children:(i,$)=>{var n=ne();e(i,n)},$$slots:{default:!0}});var o=l(x,2),_=l(c(o),2);r(_,{justify:"flex-end",gap:"md",children:(i,$)=>{var n=re();e(i,n)},$$slots:{default:!0}});var g=l(o,2),h=l(c(g),2);r(h,{justify:"space-between",gap:"md",children:(i,$)=>{var n=ve();e(i,n)},$$slots:{default:!0}});var d=l(g,2),m=l(c(d),2);r(m,{justify:"space-around",gap:"md",children:(i,$)=>{var n=me();e(i,n)},$$slots:{default:!0}});var t=l(d,2),f=l(c(t),2);r(f,{justify:"space-evenly",gap:"md",children:(i,$)=>{var n=ce();e(i,n)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container">
<strong>flex-start (default):</strong>
<FlexRow justify="flex-start" gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box small">2</div>
</FlexRow>
</div>
<div class="container">
<strong>center:</strong>
<FlexRow justify="center" gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box small">2</div>
</FlexRow>
</div>
<div class="container">
<strong>flex-end:</strong>
<FlexRow justify="flex-end" gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box small">2</div>
</FlexRow>
</div>
<div class="container">
<strong>space-between:</strong>
<FlexRow justify="space-between" gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box small">2</div>
</FlexRow>
</div>
<div class="container">
<strong>space-around:</strong>
<FlexRow justify="space-around" gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box small">2</div>
</FlexRow>
</div>
<div class="container">
<strong>space-evenly:</strong>
<FlexRow justify="space-evenly" gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box small">2</div>
</FlexRow>
</div>
Different justify-content options for aligning items along the main axis.
 </FlexRow>`}}});var S=l(A,2);F(S,{name:"AlignItems",children:(p,R)=>{var a=_e(),v=y(a),u=l(c(v),2);r(u,{align:"stretch",gap:"md",children:(d,m)=>{var t=ge();e(d,t)},$$slots:{default:!0}});var x=l(v,2),b=l(c(x),2);r(b,{align:"flex-start",gap:"md",children:(d,m)=>{var t=pe();e(d,t)},$$slots:{default:!0}});var o=l(x,2),_=l(c(o),2);r(_,{align:"center",gap:"md",children:(d,m)=>{var t=ue();e(d,t)},$$slots:{default:!0}});var g=l(o,2),h=l(c(g),2);r(h,{align:"flex-end",gap:"md",children:(d,m)=>{var t=fe();e(d,t)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container" style="height: 150px;">
<strong>stretch (default):</strong>
<FlexRow align="stretch" gap="md">
	<div class="demo-box small" style="height: auto;">1</div>
	<div class="demo-box medium" style="height: auto;">2</div>
	<div class="demo-box small" style="height: auto;">3</div>
</FlexRow>
</div>
<div class="container" style="height: 150px;">
<strong>flex-start:</strong>
<FlexRow align="flex-start" gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box medium">2</div>
	<div class="demo-box small">3</div>
</FlexRow>
</div>
<div class="container" style="height: 150px;">
<strong>center:</strong>
<FlexRow align="center" gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box medium">2</div>
	<div class="demo-box small">3</div>
</FlexRow>
</div>
<div class="container" style="height: 150px;">
<strong>flex-end:</strong>
<FlexRow align="flex-end" gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box medium">2</div>
	<div class="demo-box small">3</div>
</FlexRow>
</div>
Different align-items options for aligning items along the cross axis.
 </FlexRow>`}}});var G=l(S,2);F(G,{name:"Wrap",children:(p,R)=>{var a=ye(),v=y(a),u=c(v);r(u,{wrap:!0,gap:"md",children:(x,b)=>{var o=$e();e(x,o)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container">
<FlexRow wrap gap="md">
	<div class="demo-box small">1</div>
	<div class="demo-box small">2</div>
	<div class="demo-box small">3</div>
	<div class="demo-box small">4</div>
	<div class="demo-box small">5</div>
	<div class="demo-box small">6</div>
	<div class="demo-box small">7</div>
</FlexRow>
</div>
Items wrap to the next line when there's not enough space.
 </FlexRow>`}}});var L=l(G,2);F(L,{name:"FlexItemGrow",children:(p,R)=>{var a=ze(),v=y(a),u=c(v);r(u,{gap:"md",children:(x,b)=>{var o=Fe(),_=y(o);w(_,{children:(d,m)=>{var t=he();e(d,t)},$$slots:{default:!0}});var g=l(_,2);w(g,{grow:!0,children:(d,m)=>{var t=be();e(d,t)},$$slots:{default:!0}});var h=l(g,2);w(h,{children:(d,m)=>{var t=we();e(d,t)},$$slots:{default:!0}}),e(x,o)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container">
<FlexRow gap="md">
	<FlexItem>
		<div class="demo-box small">Fixed</div>
	</FlexItem>
	<FlexItem grow>
		<div class="demo-box medium" style="width: 100%;">Grows</div>
	</FlexItem>
	<FlexItem>
		<div class="demo-box small">Fixed</div>
	</FlexItem>
</FlexRow>
</div>
Use FlexItem with grow prop to make items expand to fill available space.
 </FlexRow>`}}});var N=l(L,2);F(N,{name:"FlexItemAlign",children:(p,R)=>{var a=je(),v=y(a),u=c(v);r(u,{align:"stretch",gap:"md",children:(x,b)=>{var o=We(),_=y(o);w(_,{align:"flex-start",children:(m,t)=>{var f=Re();e(m,f)},$$slots:{default:!0}});var g=l(_,2);w(g,{align:"center",children:(m,t)=>{var f=Ie();e(m,f)},$$slots:{default:!0}});var h=l(g,2);w(h,{align:"flex-end",children:(m,t)=>{var f=Pe();e(m,f)},$$slots:{default:!0}});var d=l(h,2);w(d,{children:(m,t)=>{var f=Ce();e(m,f)},$$slots:{default:!0}}),e(x,o)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container" style="height: 150px;">
<FlexRow align="stretch" gap="md">
	<FlexItem align="flex-start">
		<div class="demo-box small">Top</div>
	</FlexItem>
	<FlexItem align="center">
		<div class="demo-box small">Center</div>
	</FlexItem>
	<FlexItem align="flex-end">
		<div class="demo-box small">Bottom</div>
	</FlexItem>
	<FlexItem>
		<div class="demo-box medium" style="height: auto;">Stretch</div>
	</FlexItem>
</FlexRow>
</div>
Individual items can override the container's alignment using FlexItem's align prop.
 </FlexRow>`}}});var k=l(N,2);F(k,{name:"NestedLayout",children:(p,R)=>{var a=Ge(),v=y(a),u=c(v);r(u,{gap:"lg",justify:"space-between",children:(x,b)=>{var o=Se(),_=y(o);w(_,{grow:!0,children:(h,d)=>{P(h,{gap:"sm",children:(m,t)=>{var f=Be();e(m,f)},$$slots:{default:!0}})},$$slots:{default:!0}});var g=l(_,2);w(g,{children:(h,d)=>{P(h,{gap:"sm",children:(m,t)=>{var f=Ae();e(m,f)},$$slots:{default:!0}})},$$slots:{default:!0}}),e(x,o)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container">
<FlexRow gap="lg" justify="space-between">
	<FlexItem grow>
		<FlexCol gap="sm">
			<div class="demo-box medium" style="width: 100%;">Header</div>
			<div class="demo-box large" style="width: 100%;">Content</div>
			<div class="demo-box medium" style="width: 100%;">Footer</div>
		</FlexCol>
	</FlexItem>
	<FlexItem>
		<FlexCol gap="sm">
			<div class="demo-box tall">Side</div>
			<div class="demo-box tall">Bar</div>
		</FlexCol>
	</FlexItem>
</FlexRow>
</div>
Nested flex layouts: FlexRow containing FlexCol with FlexItem for complex layouts.
 </FlexRow>`}}});var D=l(k,2);F(D,{name:"FormLayout",args:{gap:"md"},children:(p,R)=>{var a=Ee(),v=y(a),u=c(v);P(u,{gap:"md",children:(x,b)=>{var o=Ue(),_=y(o);r(_,{gap:"md",justify:"space-between",children:(d,m)=>{var t=ke(),f=y(t);w(f,{grow:!0,children:($,n)=>{var I=Le();e($,I)},$$slots:{default:!0}});var i=l(f,2);w(i,{children:($,n)=>{var I=Ne();e($,I)},$$slots:{default:!0}}),e(d,t)},$$slots:{default:!0}});var g=l(_,2);r(g,{gap:"md",children:(d,m)=>{var t=De();e(d,t)},$$slots:{default:!0}});var h=l(g,2);r(h,{gap:"md",justify:"flex-end",children:(d,m)=>{var t=He(),f=y(t);w(f,{children:($,n)=>{var I=Je();e($,I)},$$slots:{default:!0}});var i=l(f,2);w(i,{children:($,n)=>{var I=Te();e($,I)},$$slots:{default:!0}}),e(d,t)},$$slots:{default:!0}}),e(x,o)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container">
<FlexCol gap="md">
	<FlexRow gap="md" justify="space-between">
		<FlexItem grow>
			<div class="demo-box medium" style="width: 100%;">Name Input</div>
		</FlexItem>
		<FlexItem>
			<div class="demo-box small" style="width: 100px;">Age Input</div>
		</FlexItem>
	</FlexRow>
	<FlexRow gap="md">
		<div class="demo-box large" style="width: 100%;">Address Input</div>
	</FlexRow>
	<FlexRow gap="md" justify="flex-end">
		<FlexItem>
			<div class="demo-box small" style="width: 100px;">Cancel</div>
		</FlexItem>
		<FlexItem>
			<div class="demo-box small" style="width: 100px;">Submit</div>
		</FlexItem>
	</FlexRow>
</FlexCol>
</div>
Common form layout pattern using flex components.
 </FlexRow>`}}});var U=l(D,2);F(U,{name:"FullWidth",children:(p,R)=>{var a=Ve(),v=y(a),u=c(v);r(u,{gap:"md",fullWidth:!0,children:(o,_)=>{var g=Me();e(o,g)},$$slots:{default:!0}});var x=l(v,2),b=c(x);r(b,{gap:"md",fullWidth:!1,children:(o,_)=>{var g=Oe();e(o,g)},$$slots:{default:!0}}),e(p,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FlexRow {...args}>
   <div class="container">
<FlexRow gap="md" fullWidth>
	<div class="demo-box small">1</div>
	<div class="demo-box small">2</div>
	<div class="demo-box small">3</div>
</FlexRow>
</div>
<div class="container">
<FlexRow gap="md" fullWidth={false}>
	<div class="demo-box small">1</div>
	<div class="demo-box small">2</div>
	<div class="demo-box small">3</div>
</FlexRow>
</div>
Toggle fullWidth to control whether the container takes full width. First row: fullWidth=true (default),
Second row: fullWidth=false (auto width).
 </FlexRow>`}}}),e(T,C),M()}J.__docgen={data:[],name:"flex.stories.svelte"};const z=O(J,K),os=["BasicRow","BasicColumn","GapSizes","JustifyContent","AlignItems","Wrap","FlexItemGrow","FlexItemAlign","NestedLayout","FormLayout","FullWidth"],ds={...z.BasicRow,tags:["svelte-csf-v5"]},is={...z.BasicColumn,tags:["svelte-csf-v5"]},ns={...z.GapSizes,tags:["svelte-csf-v5"]},rs={...z.JustifyContent,tags:["svelte-csf-v5"]},vs={...z.AlignItems,tags:["svelte-csf-v5"]},ms={...z.Wrap,tags:["svelte-csf-v5"]},cs={...z.FlexItemGrow,tags:["svelte-csf-v5"]},xs={...z.FlexItemAlign,tags:["svelte-csf-v5"]},gs={...z.NestedLayout,tags:["svelte-csf-v5"]},ps={...z.FormLayout,tags:["svelte-csf-v5"]},us={...z.FullWidth,tags:["svelte-csf-v5"]};export{vs as AlignItems,is as BasicColumn,ds as BasicRow,xs as FlexItemAlign,cs as FlexItemGrow,ps as FormLayout,us as FullWidth,ns as GapSizes,rs as JustifyContent,gs as NestedLayout,ms as Wrap,os as __namedExportsOrder,K as default};
