type ThemeDescriptor = {
    themeName: string;
    baseThemeName?: string;
};
declare const getThemeDesignerTheme: () => ThemeDescriptor | undefined;
export default getThemeDesignerTheme;
export type { ThemeDescriptor };
