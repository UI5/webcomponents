type ThemeLoadedCallback = (theme: string) => void;
declare const attachThemeLoaded: (listener: ThemeLoadedCallback) => void;
declare const detachThemeLoaded: (listener: ThemeLoadedCallback) => void;
declare const fireThemeLoaded: (theme: string) => void[];
export { attachThemeLoaded, detachThemeLoaded, fireThemeLoaded, };
