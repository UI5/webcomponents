// eslint-disable-next-line import/extensions
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "./thirdparty/preact/jsxRuntime.module.js";
import { options } from "./thirdparty/preact/preact.module.js";
import { isUI5ElementClass, preprocess } from "./jsx-utils.js";
import { kebabToCamelCase } from "./util/StringHelper.js";
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
// eslint-disable-next-line @typescript-eslint/ban-types
function isBoundOrArrow(func) {
    // TODO improve => detection after func params
    return func.name.startsWith("bound ") || func.toString().includes("=>");
}
function checkAttributeUsage(type, props) {
    if (!isUI5ElementClass(type)) {
        return;
    }
    const tag = type.getMetadata().getTag();
    const componentAttributes = type.getMetadata().getAttributesList();
    Object.keys(props).forEach(prop => {
        if (prop.includes("-") && componentAttributes.includes(prop)) {
            // eslint-disable-next-line no-console
            console.warn(`Avoid attribute usage in favour of properties ['${prop}' --> '${kebabToCamelCase(prop)}'] for tag [${tag}]. Check stack trace to find out which template causes this. Attributes are not type-checked and boolean conversion is manual and error-prone.`);
        }
    });
}
export function Fragment(props, context) {
    return _Fragment(props, context);
}
export function jsxDEV(type, props, key) {
    const tag = preprocess(type, props, key);
    checkAttributeUsage(type, props);
    return _jsxDEV(tag, props, key);
}
//# sourceMappingURL=jsx-dev-runtime.js.map