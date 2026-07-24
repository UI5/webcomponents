declare class Locale {
    sLocaleId: string;
    sLanguage: string;
    sScript: string;
    sRegion: string;
    sVariant: string | null;
    sExtension: string | null;
    sPrivateUse: string | null;
    constructor(sLocaleId: string);
    getLanguage(): string;
    getScript(): string;
    getRegion(): string;
    getVariant(): string | null;
    getVariantSubtags(): string[];
    getExtension(): string | null;
    getExtensionSubtags(): string[];
    getPrivateUse(): string | null;
    getPrivateUseSubtags(): string[];
    hasPrivateUseSubtag(sSubtag: string): boolean;
    toString(): string;
}
export default Locale;
