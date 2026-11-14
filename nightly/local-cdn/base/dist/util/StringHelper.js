const kebabToCamelMap = new Map();
const camelToKebabMap = new Map();
const kebabToPascalMap = new Map();
const kebabToCamelCase = (string) => {
    if (!kebabToCamelMap.has(string)) {
        const result = toCamelCase(string.split("-"));
        kebabToCamelMap.set(string, result);
    }
    return kebabToCamelMap.get(string);
};
const camelToKebabCase = (string) => {
    if (!camelToKebabMap.has(string)) {
        const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        camelToKebabMap.set(string, result);
    }
    return camelToKebabMap.get(string);
};
const pascalToKebabCase = (pascalString) => {
    return camelToKebabCase(pascalString);
};
const toCamelCase = (parts) => {
    return parts.map((string, index) => {
        return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }).join("");
};
const kebabToPascalCase = (src) => {
    const cachedName = kebabToPascalMap.get(src);
    if (cachedName) {
        return cachedName;
    }
    const camelStr = kebabToCamelCase(src);
    const result = camelStr.charAt(0).toUpperCase() + camelStr.slice(1);
    kebabToPascalMap.set(src, result);
    return result;
};
export { kebabToCamelCase, camelToKebabCase, pascalToKebabCase, kebabToPascalCase, };
//# sourceMappingURL=StringHelper.js.map