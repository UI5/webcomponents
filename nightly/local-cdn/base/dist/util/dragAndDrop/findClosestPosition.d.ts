import MovePlacement from "../../types/MovePlacement.js";
import Orientation from "../../types/Orientation.js";
declare const findClosestPosition: (elements: Array<HTMLElement>, point: number, layoutOrientation: Orientation) => {
    element: HTMLElement;
    placements: MovePlacement[];
} | null;
declare const findClosestPositionsByKey: (elements: Array<HTMLElement>, element: HTMLElement, e: KeyboardEvent) => {
    element: HTMLElement;
    placement: MovePlacement;
}[];
declare const isMovingKey: (key: string) => boolean;
export { findClosestPosition, findClosestPositionsByKey, isMovingKey, };
