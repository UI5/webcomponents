type ThemeData = string;
type ThemeLoader = (themeName: string) => Promise<string>;
declare const registerThemePropertiesLoader: (packageName: string, themeName: string, loader: ThemeLoader) => void;
declare const registerCustomThemePropertiesLoader: (packageName: string, themeName: string, loader: ThemeLoader) => void;
declare const getThemeProperties: (packageName: string, themeName: string, externalThemeName?: string) => Promise<string | undefined>;
declare const getRegisteredPackages: () => Set<string>;
declare const isThemeRegistered: (theme: string) => boolean;
export { registerThemePropertiesLoader, registerCustomThemePropertiesLoader, getThemeProperties, getRegisteredPackages, isThemeRegistered, };
export type { ThemeData, ThemeLoader, };
