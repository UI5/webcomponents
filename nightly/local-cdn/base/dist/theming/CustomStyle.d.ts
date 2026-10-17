type CustomCSSChangeCallback = (tag: string) => void;
declare const attachCustomCSSChange: (listener: CustomCSSChangeCallback) => void;
declare const detachCustomCSSChange: (listener: CustomCSSChangeCallback) => void;
declare const addCustomCSS: (tag: string, css: string) => Promise<void>;
declare const getCustomCSS: (tag: string) => string;
export { addCustomCSS, getCustomCSS, attachCustomCSSChange, detachCustomCSSChange, };
