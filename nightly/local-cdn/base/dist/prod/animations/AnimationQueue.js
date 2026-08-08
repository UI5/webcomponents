"use strict";const t=new WeakMap;class a{static get tasks(){return t}static enqueue(s,e){t.has(s)||t.set(s,[]),t.get(s).push(e)}static run(s,e){return t.has(s)||t.set(s,[]),e().then(()=>{const T=t.get(s);if(T.length>0)return a.run(s,T.shift());t.delete(s)})}static push(s,e){t.get(s)?a.enqueue(s,e):a.run(s,e)}}export default a;
//# sourceMappingURL=AnimationQueue.js.map
