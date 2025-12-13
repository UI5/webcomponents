const willShowContent = (childNodes) => {
    return Array.from(childNodes).filter(node => {
        return node.nodeType !== Node.COMMENT_NODE && (node.nodeType !== Node.TEXT_NODE || (node.nodeValue || "").trim().length !== 0);
    }).length > 0;
};
export default willShowContent;
//# sourceMappingURL=willShowContent.js.map