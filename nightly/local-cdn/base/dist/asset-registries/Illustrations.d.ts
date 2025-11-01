import type { I18nText } from "../i18nBundle.js";
type IllustrationLoader = (illustrationName: string) => Promise<IllustrationData>;
type IllustrationProperties = {
    dialogSvg: string;
    sceneSvg: string;
    spotSvg: string;
    dotSvg: string;
    title: I18nText;
    subtitle: I18nText;
};
type IllustrationData = IllustrationProperties & {
    set: string;
    collection: string;
};
declare const registerIllustration: (name: string, data: IllustrationData) => void;
declare const registerIllustrationLoader: (illustrationName: string, loader: IllustrationLoader) => void;
declare const getIllustrationDataSync: (illustrationName: string) => IllustrationProperties | undefined;
declare const getIllustrationData: (illustrationName: string) => Promise<IllustrationProperties | undefined>;
export { getIllustrationDataSync, registerIllustration, registerIllustrationLoader, getIllustrationData, };
