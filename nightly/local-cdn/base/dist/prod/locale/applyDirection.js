"use strict";import{reRenderAllUI5Elements as r}from"../Render.js";import{fireDirectionChange as t}from"./directionChange.js";const i=async()=>{const e=t();await Promise.all(e),await r({rtlAware:!0})};export default i;
//# sourceMappingURL=applyDirection.js.map
