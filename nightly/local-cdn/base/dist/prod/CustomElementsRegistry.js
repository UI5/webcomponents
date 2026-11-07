"use strict";import p from"./getSharedResource.js";import{getCurrentRuntimeIndex as u,compareRuntimes as f,getAllRuntimes as b}from"./Runtimes.js";const g=p("Tags",new Map),d=new Set;let i=new Map,c;const m=-1,h=e=>{d.add(e),g.set(e,u())},w=e=>d.has(e),R=()=>d.size>0,T=()=>[...d.values()],$=e=>{let n=g.get(e);n===void 0&&(n=m),i.has(n)||i.set(n,new Set),i.get(n).add(e),c||(c=setTimeout(()=>{y(),i=new Map,c=void 0},1e3))},y=()=>{const e=b(),n=u(),l=e[n];let t="Multiple UI5 Web Components instances detected.";e.length>1&&(t=`${t}
Loading order (versions before 1.1.0 not listed): ${e.map(s=>`
${s.description}`).join("")}`),[...i.keys()].forEach(s=>{let o,r;s===m?(o=1,r={description:"Older unknown runtime"}):(o=f(n,s),r=e[s]);let a;o>0?a="an older":o<0?a="a newer":a="the same",t=`${t}

"${l.description}" failed to define ${i.get(s).size} tag(s) as they were defined by a runtime of ${a} version "${r.description}": ${[...i.get(s)].sort().join(", ")}.`,o>0?t=`${t}
WARNING! If your code uses features of the above web components, unavailable in ${r.description}, it might not work as expected!`:t=`${t}
Since the above web components were defined by the same or newer version runtime, they should be compatible with your code.`}),t=`${t}

To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/UI5/webcomponents/blob/main/docs/2-advanced/06-scoping.md.`,console.warn(t)};export{h as registerTag,w as isTagRegistered,R as hasRegisteredTags,T as getAllRegisteredTags,$ as recordTagRegistrationFailure};
//# sourceMappingURL=CustomElementsRegistry.js.map
