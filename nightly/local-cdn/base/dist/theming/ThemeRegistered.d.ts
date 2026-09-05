type ThemeRegisteredCallback = (theme: string) => void;
declare const attachThemeRegistered: (listener: ThemeRegisteredCallback) => void;
declare const fireThemeRegistered: (theme: string) => void[];
export { attachThemeRegistered, fireThemeRegistered, };
