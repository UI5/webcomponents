"use strict";const t=new Map,n=new Map,o=new Map,i=async e=>{t.get(e)||t.set(e,fetch(e));const s=await t.get(e);return s&&!o.get(e)&&o.set(e,s.text()),o.get(e)},c=async e=>{t.get(e)||t.set(e,fetch(e));const s=await t.get(e);return s&&!n.get(e)&&n.set(e,s.json()),n.get(e)};export{i as fetchTextOnce,c as fetchJsonOnce};
//# sourceMappingURL=FetchHelper.js.map
