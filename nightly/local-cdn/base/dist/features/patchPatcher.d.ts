type OpenUI5Patcher = {
    prototype: {
        _mAttributes: {
            [key: string]: string;
        };
        openEnd: () => OpenUI5Patcher;
    };
};
declare const patchPatcher: (Patcher: OpenUI5Patcher) => void;
export default patchPatcher;
export type { OpenUI5Patcher };
