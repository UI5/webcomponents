type LocaleDataLoader = (locale: string) => Promise<CLDRData>;
type CLDRData = Record<string, object | boolean | string>;
declare const getLocaleData: (localeId: string) => CLDRData;
declare const fetchCldr: (language: string, region: string, script: string) => Promise<void>;
declare const registerLocaleDataLoader: (localeId: string, loader: LocaleDataLoader) => void;
export { registerLocaleDataLoader, fetchCldr, getLocaleData, };
export type { CLDRData, };
