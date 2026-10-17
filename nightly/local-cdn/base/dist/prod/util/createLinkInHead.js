"use strict";const d=(r,n)=>{const e=document.createElement("link");return e.type="text/css",e.rel="stylesheet",n&&Object.entries(n).forEach(t=>e.setAttribute(...t)),e.href=r,document.head.appendChild(e),new Promise(t=>{e.addEventListener("load",t),e.addEventListener("error",t)})};export default d;
//# sourceMappingURL=createLinkInHead.js.map
