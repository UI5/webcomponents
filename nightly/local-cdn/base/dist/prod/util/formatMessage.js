"use strict";const g=/('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g,i=(n,t)=>(t=t||[],n.replace(g,(p,s,e,r,o)=>{if(s)return"'";if(e)return e.replace(/''/g,"'");if(r){const a=typeof r=="string"?parseInt(r):r;return String(t[a])}throw new Error(`[i18n]: pattern syntax error at pos ${o}`)}));export default i;
//# sourceMappingURL=formatMessage.js.map
