type RuntimeData = VersionInfo & {
    alias: string;
    description: string;
};
/**
 * Registers the current runtime in the shared runtimes resource registry
 */
declare const registerCurrentRuntime: () => void;
/**
 * Returns the index of the current runtime's object in the shared runtimes resource registry
 * @returns {*}
 */
declare const getCurrentRuntimeIndex: () => number;
/**
 * Compares two runtimes and returns 1 if the first is of a bigger version, -1 if the second is of a bigger version, and 0 if equal
 * @param index1 The index of the first runtime to compare
 * @param index2 The index of the second runtime to compare
 * @returns {number}
 */
declare const compareRuntimes: (index1: number, index2: number) => number;
/**
 * Set an alias for the the current app/library/microfrontend which will appear in debug messages and console warnings
 * @param alias
 */
declare const setRuntimeAlias: (alias: string) => void;
declare const getAllRuntimes: () => RuntimeData[];
export { getCurrentRuntimeIndex, registerCurrentRuntime, compareRuntimes, setRuntimeAlias, getAllRuntimes, };
