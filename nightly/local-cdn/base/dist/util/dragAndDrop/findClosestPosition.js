import MovePlacement from "../../types/MovePlacement.js";
import Orientation from "../../types/Orientation.js";
const closestPlacement = (point, beforePoint, centerPoint, afterPoint) => {
    const distToBeforePoint = Math.abs(point - beforePoint);
    const distToCenterPoint = Math.abs(point - centerPoint);
    const distToAfterPoint = Math.abs(point - afterPoint);
    const closestPoint = Math.min(distToBeforePoint, distToCenterPoint, distToAfterPoint);
    let placements = [];
    switch (closestPoint) {
        case distToBeforePoint:
            placements = [MovePlacement.Before];
            break;
        case distToCenterPoint:
            placements = [MovePlacement.On, distToBeforePoint < distToAfterPoint ? MovePlacement.Before : MovePlacement.After];
            break;
        case distToAfterPoint:
            placements = [MovePlacement.After];
            break;
    }
    return placements;
};
const findClosestPosition = (elements, point, layoutOrientation) => {
    let shortestDist = Number.POSITIVE_INFINITY;
    let closestElement = null;
    // determine which element is most closest to the point
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const { left, width, top, height, } = el.getBoundingClientRect();
        let elemCenter;
        if (layoutOrientation === Orientation.Vertical) {
            elemCenter = top + height / 2;
        }
        else { // Horizontal
            elemCenter = left + width / 2;
        }
        const distanceToCenter = Math.abs(point - elemCenter);
        if (distanceToCenter < shortestDist) {
            shortestDist = distanceToCenter;
            closestElement = el;
        }
    }
    if (!closestElement) {
        return null;
    }
    const { width, height, left, right, top, bottom, } = closestElement.getBoundingClientRect();
    let placements;
    if (layoutOrientation === Orientation.Vertical) {
        placements = closestPlacement(point, top, top + height / 2, bottom);
    }
    else { // Horizontal
        placements = closestPlacement(point, left, left + width / 2, right);
    }
    return {
        element: closestElement,
        placements,
    };
};
const _moveBackward = (elements, index) => {
    index--;
    if (index < 0) {
        return [];
    }
    return [{
            element: elements[index],
            placement: MovePlacement.Before,
        }];
};
const _moveForward = (elements, index) => {
    index++;
    if (index >= elements.length) {
        return [];
    }
    return [{
            element: elements[index],
            placement: MovePlacement.After,
        }];
};
const keyToPlacement = {
    ArrowLeft: _moveBackward,
    ArrowUp: _moveBackward,
    ArrowRight: _moveForward,
    ArrowDown: _moveForward,
    Home: (elements, index) => {
        return elements.slice(0, index).map(el => ({
            element: el,
            placement: MovePlacement.Before,
        }));
    },
    End: (elements, index) => {
        return elements.slice(index + 1, elements.length).reverse().map(el => ({
            element: el,
            placement: MovePlacement.After,
        }));
    },
};
const findClosestPositionsByKey = (elements, element, e) => {
    if (isMovingKey(e.key)) {
        return keyToPlacement[e.key](elements, elements.indexOf(element));
    }
    return [];
};
const isMovingKey = (key) => {
    return key in keyToPlacement;
};
export { findClosestPosition, findClosestPositionsByKey, isMovingKey, };
//# sourceMappingURL=findClosestPosition.js.map