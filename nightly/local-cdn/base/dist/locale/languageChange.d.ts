type LanguageChangeCallback = (lang: string) => Promise<void | Array<void>>;
declare const attachLanguageChange: (listener: LanguageChangeCallback) => void;
declare const detachLanguageChange: (listener: LanguageChangeCallback) => void;
declare const fireLanguageChange: (lang: string) => Promise<(void | void[])[]>;
export { attachLanguageChange, detachLanguageChange, fireLanguageChange, };
