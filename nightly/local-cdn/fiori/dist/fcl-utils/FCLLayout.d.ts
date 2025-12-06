import type { MEDIA } from "../FlexibleColumnLayout.js";
import type FCLLayout from "../types/FCLLayout.js";
type DefaultLayoutConfiguration = {
    [device in MEDIA]: {
        [layoutName in FCLLayout]: {
            layout: Array<string>;
            separators: Array<{
                visible: boolean;
                gripVisible?: boolean;
                arrowVisible?: boolean;
                arrowDirection?: "forward" | "backward";
            }>;
        };
    };
};
declare const getDefaultLayoutsByMedia: () => DefaultLayoutConfiguration;
declare const getNextLayoutByArrowPress: () => {
    ThreeColumnsMidExpanded: string;
    ThreeColumnsEndExpanded: string;
    ThreeColumnsStartHiddenMidExpanded: string;
    ThreeColumnsStartHiddenEndExpanded: string;
};
export { getDefaultLayoutsByMedia, getNextLayoutByArrowPress, };
export type { FCLLayout, };
