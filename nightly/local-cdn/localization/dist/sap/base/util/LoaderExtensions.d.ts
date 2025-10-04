declare const LoaderExtensions: {
    loadResource: (moduleName: string) => import("@ui5/webcomponents-base/dist/asset-registries/LocaleData.js").CLDRData;
};
export default LoaderExtensions;
