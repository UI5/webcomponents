"use strict";/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */import{noChange as o}from"lit-html";import{directive as l,Directive as n,PartType as u}from"lit-html/directive.js";class p extends n{constructor(r){var t;if(super(r),r.type!==u.ATTRIBUTE||r.name!=="style"||((t=r.strings)===null||t===void 0?void 0:t.length)>2)throw new Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return""}update(r,[t]){const{style:i}=r.element;if(this._previousStyleProperties===void 0){this._previousStyleProperties=new Set;for(const e in t)this._previousStyleProperties.add(e)}this._previousStyleProperties.forEach(e=>{t[e]==null&&(this._previousStyleProperties.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")});for(const e in t){const s=t[e];s!=null&&(this._previousStyleProperties.add(e),e.includes("-")?i.setProperty(e,s):i[e]=s)}return o}}export const styleMap=l(p);
//# sourceMappingURL=style-map.js.map
