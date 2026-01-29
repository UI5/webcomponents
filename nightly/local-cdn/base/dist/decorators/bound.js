export default function bound(target, key, descriptor) {
    if (!(typeof target[key] === "function")) {
        throw new Error(`@bound decorator can only be applied to methods, received ${String(key)}: ${typeof target[key]}`);
    }
    let fn = descriptor.value;
    return {
        configurable: true,
        get() {
            if (!(this instanceof target.constructor)) {
                return fn;
            }
            // if the property is already defined on the instance, then this call is a super call
            if (Object.hasOwnProperty.call(this, key)) {
                return fn;
            }
            let boundFn = fn.bind(this);
            Object.defineProperty(this, key, {
                configurable: true,
                get() {
                    return boundFn;
                },
                set(value) {
                    // setting a value on the instance means they overwrite the default behaviour
                    boundFn = value;
                },
            });
            return boundFn;
        },
        set(value) {
            fn = value;
        },
    };
}
//# sourceMappingURL=bound.js.map