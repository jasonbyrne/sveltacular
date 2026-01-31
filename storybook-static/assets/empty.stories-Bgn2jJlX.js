import{p as R,f as h,a as $,t as r,b as e,s as o,c as O,g as m,d as u}from"./iframe-D7RYvwF5.js";import{c as j}from"./create-runtime-stories-z04xijIr.js";import{d as G}from"./index-CU8YG541.js";import{E as V}from"./empty-C7UgyjBN.js";import{B as g}from"./button-BYNa-MSv.js";import{i as q}from"./lifecycle-CSFJvVh_.js";import"./preload-helper-ckwbz45p.js";import"./class-CSG4cUfb.js";import"./icon-v8TPefiR.js";import"./attributes-AHszVgQG.js";import"./style-OEUvFely.js";import"./spinner-Cpf7SZnL.js";const{fn:y}=__STORYBOOK_MODULE_TEST__,K={component:V,title:"Generic/Empty",tags:["autodocs"],argTypes:{title:{control:"text",description:"Primary heading/title",table:{type:{summary:"string"}}},message:{control:"text",description:"Main message text",table:{type:{summary:"string"},defaultValue:{summary:"'No data to display'"}}},description:{control:"text",description:"Optional secondary description",table:{type:{summary:"string"}}},icon:{control:"select",options:[void 0,"folder-open","envelope","home","check","upload","link","phone","mobile-phone"],description:"Built-in icon type from framework",table:{type:{summary:"IconType"}}},iconSize:{control:"select",options:["sm","md","lg","xl"],description:"Icon size",table:{type:{summary:"'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'xl'"}}},size:{control:"select",options:["sm","md","lg","xl"],description:"Component size (affects padding and text sizing)",table:{type:{summary:"'sm' | 'md' | 'lg' | 'xl'"},defaultValue:{summary:"'md'"}}}},parameters:{docs:{description:{component:`Empty state component for displaying messages when no data is available.
Use this component to provide clear feedback and actionable next steps to users
when there's no content to display (e.g., empty search results, no items yet, etc.).

**Key Features**:
- Built-in icon support
- Hierarchical messaging (title, message, description)
- Custom content via children snippet (buttons, links, etc.)
- Multiple size variants

**Accessibility**: Empty states provide clear messaging to users about why
content is missing. Use descriptive text to help users understand the context
and provide clear actions they can take.

**Usage**:
\`\`\`svelte
<Empty icon="folder-open" message="You haven't added any binders yet.">
  <Button variant="primary" onClick={handleCreate}>
    Create Your First Binder
  </Button>
</Empty>
\`\`\``}}}},{Story:c}=G();var H=h("<!> <!>",1),J=h("<!> <!> <!>",1),X=h("<!> <!>",1),Z=h("<!> <!>",1),Q=h("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function F(Y,U){R(U,!1),q();var C=Q(),E=$(C);c(E,{name:"Default",args:{},children:(s,a)=>{var t=r("Default empty state with standard message.");e(s,t)},$$slots:{default:!0},parameters:{docs:{description:{story:"Default Examples"}},__svelteCsf:{rawCode:`<Empty {...args}>
  Default empty state with standard message.
</Empty>`}}});var x=o(E,2);c(x,{name:"SimpleMessage",args:{message:"No results found"},children:(s,a)=>{var t=r("Empty state with custom message text.");e(s,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
  Empty state with custom message text.
</Empty>`}}});var k=o(x,2);c(k,{name:"WithIcon",args:{icon:"folder-open",message:"No items to display"},children:(s,a)=>{var t=r("Empty state with a built-in icon.");e(s,t)},$$slots:{default:!0},parameters:{docs:{description:{story:"With Icons"}},__svelteCsf:{rawCode:`<Empty {...args}>
  Empty state with a built-in icon.
</Empty>`}}});var S=o(k,2);c(S,{name:"SearchResults",args:{icon:"envelope",message:"No messages found",description:"Try adjusting your search filters or check back later."},children:(s,a)=>{var t=r("Empty state with icon and description.");e(s,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
  Empty state with icon and description.
</Empty>`}}});var w=o(S,2);c(w,{name:"WithTitle",args:{icon:"folder-open",title:"No Projects Yet",message:"Get started by creating your first project."},children:(s,a)=>{var t=r("Empty state with title, icon, and message.");e(s,t)},$$slots:{default:!0},parameters:{docs:{description:{story:"With Title"}},__svelteCsf:{rawCode:`<Empty {...args}>
  Empty state with title, icon, and message.
</Empty>`}}});var B=o(w,2);c(B,{name:"WithSingleAction",args:{icon:"folder-open",message:"You haven't added any binders yet."},children:a=>{{let t=u(y);g(a,{variant:"primary",get onClick(){return m(t)},children:(i,v)=>{var n=r("Create Your First Binder");e(i,n)},$$slots:{default:!0}})}},$$slots:{default:!0},parameters:{docs:{description:{story:"With Actions - Your Example!"}},__svelteCsf:{rawCode:`<Empty {...args}>
   {#snippet children()}
<Button variant="primary" onClick={fn()}>Create Your First Binder</Button>
{/snippet}
 </Empty>`}}});var b=o(B,2);c(b,{name:"WithPrimaryAndSecondary",args:{icon:"upload",title:"No Files Uploaded",message:"Upload your files to get started.",description:"Supported formats: PDF, DOC, DOCX, JPG, PNG"},children:a=>{var t=H(),i=$(t);{let n=u(y);g(i,{variant:"primary",get onClick(){return m(n)},children:(l,f)=>{var p=r("Upload Files");e(l,p)},$$slots:{default:!0}})}var v=o(i,2);{let n=u(y);g(v,{variant:"outline",get onClick(){return m(n)},children:(l,f)=>{var p=r("Learn More");e(l,p)},$$slots:{default:!0}})}e(a,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
   {#snippet children()}
<Button variant="primary" onClick={fn()}>Upload Files</Button>
<Button variant="outline" onClick={fn()}>Learn More</Button>
{/snippet}
 </Empty>`}}});var P=o(b,2);c(P,{name:"WithMultipleActions",args:{icon:"home",title:"Welcome to Your Dashboard",message:"Choose an option to get started."},children:a=>{var t=J(),i=$(t);{let l=u(y);g(i,{variant:"primary",get onClick(){return m(l)},children:(f,p)=>{var _=r("Create Project");e(f,_)},$$slots:{default:!0}})}var v=o(i,2);{let l=u(y);g(v,{variant:"secondary",get onClick(){return m(l)},children:(f,p)=>{var _=r("Import Data");e(f,_)},$$slots:{default:!0}})}var n=o(v,2);{let l=u(y);g(n,{variant:"outline",get onClick(){return m(l)},children:(f,p)=>{var _=r("View Tutorial");e(f,_)},$$slots:{default:!0}})}e(a,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
   {#snippet children()}
<Button variant="primary" onClick={fn()}>Create Project</Button>
<Button variant="secondary" onClick={fn()}>Import Data</Button>
<Button variant="outline" onClick={fn()}>View Tutorial</Button>
{/snippet}
 </Empty>`}}});var W=o(P,2);c(W,{name:"Small",args:{size:"sm",icon:"check",message:"All caught up!",description:"You have no pending items."},children:(s,a)=>{var t=r("Small empty state for compact spaces.");e(s,t)},$$slots:{default:!0},parameters:{docs:{description:{story:"Size Variants"}},__svelteCsf:{rawCode:`<Empty {...args}>
  Small empty state for compact spaces.
</Empty>`}}});var N=o(W,2);c(N,{name:"Medium",args:{size:"md",icon:"envelope",message:"No new messages",description:"Your inbox is empty."},children:(s,a)=>{var t=r("Medium empty state (default size).");e(s,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
  Medium empty state (default size).
</Empty>`}}});var T=o(N,2);c(T,{name:"Large",args:{size:"lg",icon:"folder-open",title:"No Documents",message:"You haven't created any documents yet."},children:a=>{{let t=u(y);g(a,{variant:"primary",get onClick(){return m(t)},children:(i,v)=>{var n=r("Create Document");e(i,n)},$$slots:{default:!0}})}},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
   {#snippet children()}
<Button variant="primary" onClick={fn()}>Create Document</Button>
{/snippet}
 </Empty>`}}});var A=o(T,2);c(A,{name:"ExtraLarge",args:{size:"xl",icon:"home",title:"Welcome!",message:"Your workspace is ready to go.",description:"Start by creating your first project or importing existing data."},children:a=>{var t=X(),i=$(t);{let n=u(y);g(i,{variant:"primary",get onClick(){return m(n)},children:(l,f)=>{var p=r("Get Started");e(l,p)},$$slots:{default:!0}})}var v=o(i,2);{let n=u(y);g(v,{variant:"secondary",get onClick(){return m(n)},children:(l,f)=>{var p=r("Import");e(l,p)},$$slots:{default:!0}})}e(a,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
   {#snippet children()}
<Button variant="primary" onClick={fn()}>Get Started</Button>
<Button variant="secondary" onClick={fn()}>Import</Button>
{/snippet}
 </Empty>`}}});var D=o(A,2);c(D,{name:"EmptyInbox",args:{icon:"envelope",title:"Inbox Zero!",message:"You've read all your messages.",description:"Great job staying on top of your inbox."},children:(s,a)=>{var t=r("Empty inbox success state.");e(s,t)},$$slots:{default:!0},parameters:{docs:{description:{story:"Real-world Examples"}},__svelteCsf:{rawCode:`<Empty {...args}>
  Empty inbox success state.
</Empty>`}}});var M=o(D,2);c(M,{name:"NoSearchResults",args:{icon:"envelope",message:'No results for "quantum physics"',description:"Try different keywords or check your spelling."},children:a=>{{let t=u(y);g(a,{variant:"secondary",get onClick(){return m(t)},children:(i,v)=>{var n=r("Clear Filters");e(i,n)},$$slots:{default:!0}})}},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
   {#snippet children()}
<Button variant="secondary" onClick={fn()}>Clear Filters</Button>
{/snippet}
 </Empty>`}}});var I=o(M,2);c(I,{name:"FirstTimeUser",args:{size:"lg",icon:"home",title:"Welcome to TaskFlow",message:"You're all set! Create your first task to get organized."},children:a=>{var t=Z(),i=$(t);{let n=u(y);g(i,{variant:"primary",get onClick(){return m(n)},children:(l,f)=>{var p=r("Create Task");e(l,p)},$$slots:{default:!0}})}var v=o(i,2);{let n=u(y);g(v,{variant:"outline",get onClick(){return m(n)},children:(l,f)=>{var p=r("Watch Tutorial");e(l,p)},$$slots:{default:!0}})}e(a,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
   {#snippet children()}
<Button variant="primary" onClick={fn()}>Create Task</Button>
<Button variant="outline" onClick={fn()}>Watch Tutorial</Button>
{/snippet}
 </Empty>`}}});var z=o(I,2);c(z,{name:"DeletedAll",args:{icon:"check",message:"All items deleted",description:"Your list is now empty."},children:a=>{{let t=u(y);g(a,{variant:"secondary",get onClick(){return m(t)},children:(i,v)=>{var n=r("Undo");e(i,n)},$$slots:{default:!0}})}},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
   {#snippet children()}
<Button variant="secondary" onClick={fn()}>Undo</Button>
{/snippet}
 </Empty>`}}});var L=o(z,2);c(L,{name:"NoNotifications",args:{size:"sm",icon:"check",message:"No new notifications"},children:(s,a)=>{var t=r("Small empty state for notifications.");e(s,t)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Empty {...args}>
  Small empty state for notifications.
</Empty>`}}}),e(Y,C),O()}F.__docgen={data:[],name:"empty.stories.svelte"};const d=j(F,K),mt=["Default","SimpleMessage","WithIcon","SearchResults","WithTitle","WithSingleAction","WithPrimaryAndSecondary","WithMultipleActions","Small","Medium","Large","ExtraLarge","EmptyInbox","NoSearchResults","FirstTimeUser","DeletedAll","NoNotifications"],ut={...d.Default,tags:["svelte-csf-v5"]},gt={...d.SimpleMessage,tags:["svelte-csf-v5"]},yt={...d.WithIcon,tags:["svelte-csf-v5"]},vt={...d.SearchResults,tags:["svelte-csf-v5"]},ft={...d.WithTitle,tags:["svelte-csf-v5"]},_t={...d.WithSingleAction,tags:["svelte-csf-v5"]},$t={...d.WithPrimaryAndSecondary,tags:["svelte-csf-v5"]},ht={...d.WithMultipleActions,tags:["svelte-csf-v5"]},Ct={...d.Small,tags:["svelte-csf-v5"]},Et={...d.Medium,tags:["svelte-csf-v5"]},xt={...d.Large,tags:["svelte-csf-v5"]},kt={...d.ExtraLarge,tags:["svelte-csf-v5"]},St={...d.EmptyInbox,tags:["svelte-csf-v5"]},wt={...d.NoSearchResults,tags:["svelte-csf-v5"]},Bt={...d.FirstTimeUser,tags:["svelte-csf-v5"]},bt={...d.DeletedAll,tags:["svelte-csf-v5"]},Pt={...d.NoNotifications,tags:["svelte-csf-v5"]};export{ut as Default,bt as DeletedAll,St as EmptyInbox,kt as ExtraLarge,Bt as FirstTimeUser,xt as Large,Et as Medium,Pt as NoNotifications,wt as NoSearchResults,vt as SearchResults,gt as SimpleMessage,Ct as Small,yt as WithIcon,ht as WithMultipleActions,$t as WithPrimaryAndSecondary,_t as WithSingleAction,ft as WithTitle,mt as __namedExportsOrder,K as default};
