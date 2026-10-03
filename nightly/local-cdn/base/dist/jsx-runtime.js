// eslint-disable-next-line import/extensions
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "./thirdparty/preact/jsxRuntime.module.js";
import { options } from "./thirdparty/preact/preact.module.js";
import { preprocess } from "./jsx-utils.js";
// eslint-disable-next-line @typescript-eslint/unbound-method
const old = options.vnode;
options.vnode = vnode => {
    const props = vnode.props;
    if (props !== null && typeof props === "object") {
        if (props.class && typeof props.class === "object") {
            // props.class = classObjToStr(props.class as Record<string, boolean>);
        }
    }
    old && old(vnode);
};
export function Fragment(props, context) {
    return _Fragment(props, context);
}
export function jsx(type, props, key) {
    const tag = preprocess(type, props, key);
    return _jsx(tag, props, key);
}
export function jsxs(type, props, key) {
    const tag = preprocess(type, props, key);
    return _jsxs(tag, props, key);
}
//# sourceMappingURL=jsx-runtime.js.map