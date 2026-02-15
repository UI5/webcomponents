const getEffectiveDir = (element) => {
    if (element.matches(":dir(rtl)")) {
        return "rtl";
    }
    return "ltr";
};
export default getEffectiveDir;
//# sourceMappingURL=getEffectiveDir.js.map