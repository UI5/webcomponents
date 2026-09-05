type Range = Map<string, Array<number>>;
/**
 * Enumeration containing the names and settings of predefined screen width media query range sets.
 *
 * @public
 */
declare enum RANGESETS {
    /**
     * A 4-step range set (S-M-L-XL).
     *
     * The ranges of this set are:
     *
     * - `"S"`: For screens smaller than 600 pixels.
     * - `"M"`: For screens greater than or equal to 600 pixels and smaller than 1024 pixels.
     * - `"L"`: For screens greater than or equal to 1024 pixels and smaller than 1440 pixels.
     * - `"XL"`: For screens greater than or equal to 1440 pixels.
     *
     *
     * @public
     */
    RANGE_4STEPS = "4Step"
}
/**
 * API for screen width changes.
 */
declare const MediaRange: {
    RANGESETS: typeof RANGESETS;
    initRangeSet: (name: string, range: Range) => void;
    getCurrentRange: (name: string, width?: number) => string;
};
export default MediaRange;
