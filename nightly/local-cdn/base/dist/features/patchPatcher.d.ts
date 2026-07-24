type PatcherTarget = {
    _mAttributes: {
        [key: string]: string;
    };
    openEnd: () => OpenUI5Patcher;
};
type OpenUI5Patcher = {
    prototype: PatcherTarget;
} | PatcherTarget;
declare const patchPatcher: (Patcher: OpenUI5Patcher) => void;
export default patchPatcher;
export type { OpenUI5Patcher };
