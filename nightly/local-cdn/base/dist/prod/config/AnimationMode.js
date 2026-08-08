"use strict";import{getAnimationMode as i}from"../InitialConfiguration.js";import t from"../types/AnimationMode.js";import{attachConfigurationReset as e}from"./ConfigurationReset.js";let n;e(()=>{n=void 0});const d=()=>(n===void 0&&(n=i()),n),m=o=>{Object.values(t).includes(o)&&(n=o)};export{d as getAnimationMode,m as setAnimationMode};
//# sourceMappingURL=AnimationMode.js.map
