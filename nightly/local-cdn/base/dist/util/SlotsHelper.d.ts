/**
 * Determines the slot to which a node should be assigned
 * @param node Text node or HTML element
 * @returns {string}
 */
declare const getSlotName: (node: Node) => string;
declare const getSlottedNodes: (node: Node) => Node[];
declare const getSlottedNodesList: (nodeList: Array<Node>) => Node[];
export { getSlotName, getSlottedNodes, getSlottedNodesList, };
