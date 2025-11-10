import fs from "fs";
import path from "path";

let documentationErrors = new Map();

const packageRegex = /^((@([a-z0-9._-]+)\/)?([a-z0-9._-]+))/;

const getDeprecatedStatus = (jsdocComment) => {
    const deprecatedTag = findTag(jsdocComment, "deprecated");
    return deprecatedTag?.name
        ? deprecatedTag.description
            ? `${deprecatedTag.name} ${deprecatedTag.description}`
            : deprecatedTag.name
        : deprecatedTag
            ? true
            : undefined;
};

const getExperimentalStatus = (jsdocComment) => {
    const experimentalTag = findTag(jsdocComment, "experimental");
    return experimentalTag?.name
        ? experimentalTag.description
            ? `${experimentalTag.name} ${experimentalTag.description}`
            : experimentalTag.name
        : experimentalTag
            ? true
            : undefined;
};

const toKebabCase = str => {
    return str.replaceAll(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
}

const normalizeDescription = (description) => {
    return typeof description === 'string' ? description.replaceAll(/^-\s+|^(\n)+|(\n)+$/g, "") : description;
}

const getTypeRefs = (ts, node, member) => {
    const extractTypeRefs = (type) => {
        if (type?.kind === ts.SyntaxKind.TypeReference) {
            return type.typeArguments?.length
                ? type.typeArguments.map((typeRef) => typeRef.typeName?.text)
                : [type.typeName?.text];
        } else if (type?.kind === ts.SyntaxKind.ArrayType) {
            return [type.elementType?.typeName?.text];
        } else if (type?.kind === ts.SyntaxKind.UnionType) {
            return type.types
                .map((type) => extractTypeRefs(type))
                .flat(1);
        } else if (type?.kind === ts.SyntaxKind.TemplateLiteralType) {
            if (member?.type) {
                member.type.text = member.type.text.replaceAll?.(/`|\${|}/g, "");
            }

            return type.templateSpans?.length
                ? type.templateSpans.map((typeRef) => typeRef.type?.typeName?.text)
                : [type.typeName?.text];
        }
    };

    let typeRefs = extractTypeRefs(node.type) || node?.typeArguments?.map(n => extractTypeRefs(n)).flat(2);

    if (typeRefs) {
        typeRefs = typeRefs.filter((e) => !!e);
    }

    return typeRefs?.length ? typeRefs : undefined;
};

const getSinceStatus = (jsdocComment) => {
    const sinceTag = findTag(jsdocComment, "since");
    return sinceTag
        ? sinceTag.description
            ? `${sinceTag.name} ${sinceTag.description}`
            : sinceTag.name
        : undefined;
};

const getPrivacyStatus = (jsdocComment) => {
    const privacyTag = findTag(jsdocComment, ["public", "private", "protected"]);
    return privacyTag?.tag || "private";
};

const findPackageName = (ts, sourceFile, typeName) => {
    const localStatements = [
        ts.SyntaxKind.EnumDeclaration,
        ts.SyntaxKind.InterfaceDeclaration,
        ts.SyntaxKind.ClassDeclaration,
        ts.SyntaxKind.TypeAliasDeclaration,
    ];

    const isLocalDeclared = sourceFile.statements.some(
        (statement) =>
            localStatements.includes(statement.kind) && statement?.name?.text === typeName
    );

    if (isLocalDeclared) {
        return packageJSON?.name;
    } else {
        const importStatements = sourceFile.statements?.filter(
            (statement) => statement.kind === ts.SyntaxKind.ImportDeclaration
        );
        const currentModuleSpecifier = importStatements.find((statement) => {
            if (statement.importClause?.name?.text === typeName) {
                return true;
            }

            return statement.importClause?.namedBindings?.elements?.some(
                (element) => element.name?.text === typeName
            );
        })?.moduleSpecifier;

        if (currentModuleSpecifier?.text?.startsWith(".")) {
            return packageJSON?.name;
        } else {
            // my-package/test
            // my-package
            // @scope/my-package
            // my.package
            // _mypackage
            // mypackage-
            // scope/my-package/test
            // @scope/my-package/test
            const match = currentModuleSpecifier?.text.match(packageRegex);
            let packageName;

            if (match) {
                packageName = match[1];
            }

            return packageName || undefined;
        }
    }
};

const findImportPath = (ts, sourceFile, typeName, modulePath) => {
    const localStatements = [
        ts.SyntaxKind.EnumDeclaration,
        ts.SyntaxKind.InterfaceDeclaration,
        ts.SyntaxKind.ClassDeclaration,
        ts.SyntaxKind.TypeAliasDeclaration,
    ];

    const isLocalDeclared = sourceFile.statements.some(
        (statement) =>
            localStatements.includes(statement.kind) && statement?.name?.text === typeName
    );

    if (isLocalDeclared) {
        return (
            modulePath?.replace("src", "dist")?.replace(".ts", ".js") || undefined
        );
    } else {
        const importStatements = sourceFile.statements?.filter(
            (statement) => statement.kind === ts.SyntaxKind.ImportDeclaration
        );
        const currentModuleSpecifier = importStatements.find((statement) => {
            if (statement.importClause?.name?.text === typeName) {
                return true;
            }

            return statement.importClause?.namedBindings?.elements?.some(
                (element) => element.name?.text === typeName
            );
        })?.moduleSpecifier;

        if (currentModuleSpecifier?.text?.startsWith(".")) {
            return (
                path.join(path.dirname(modulePath), currentModuleSpecifier.text)
                    ?.replace("src", "dist")?.replace(".ts", ".js") || undefined
            );
        } else {
            let packageName = currentModuleSpecifier?.text?.replace(packageRegex, "") || undefined;

            if (packageName?.startsWith("/")) {
                packageName = packageName.replace("/", "");
            }

            return packageName;
        }
    }
};


const isClass = text => {
    return text.includes("@abstract") || text.includes("@class") || text.includes("@constructor");
};

const normalizeTagType = (type) => {
    return type?.trim();
}

const packageJSON = JSON.parse(fs.readFileSync("./package.json"));

const findImportName = (ts, sourceFile, typeName) => {
    const localStatements = [
        ts.SyntaxKind.EnumDeclaration,
        ts.SyntaxKind.InterfaceDeclaration,
        ts.SyntaxKind.ClassDeclaration,
        ts.SyntaxKind.TypeAliasDeclaration,
    ];

    const isLocalDeclared = sourceFile.statements.some(
        (statement) =>
            localStatements.includes(statement.kind) && statement?.name?.text === typeName
    );

    if (isLocalDeclared) {
        return typeName
    } else {
        const importStatements = sourceFile.statements?.filter(
            (statement) => statement.kind === ts.SyntaxKind.ImportDeclaration
        );

        const importDelcaration = importStatements.find((statement) => {
            if (statement.importClause?.name?.text === typeName) {
                return true;
            }

            return statement.importClause?.namedBindings?.elements?.find(
                (element) => element.name?.text === typeName
            );
        });

        if (importDelcaration?.importClause?.name?.text === typeName) {
            return "default";
        }

        const importSpecifier = importDelcaration?.importClause?.namedBindings?.elements?.find(
            (element) => element.name?.text === typeName
        );

        if (importSpecifier) {
            return importSpecifier.propertyName === "default" ? "default" : importSpecifier.propertyName?.text || importSpecifier.name?.text;
        }
    }
};

const getReference = (ts, type, classNode, modulePath) => {
    let sourceFile = classNode.parent;

    while (sourceFile && sourceFile.kind !== ts.SyntaxKind.SourceFile) {
        sourceFile = sourceFile.parent;
    }

    const typeName =
        typeof type === "string"
            ? normalizeTagType(type)
            : type.class?.expression?.text ||
            type.typeExpression?.type?.getText() ||
            type.typeExpression?.type?.elementType?.typeName?.text;
    const packageName = findPackageName(ts, sourceFile, typeName);
    const importPath = findImportPath(
        ts,
        sourceFile,
        typeName,
        modulePath
    )?.replace(`${packageName}/`, "");

    return packageName && {
        name: findImportName(ts, sourceFile, typeName, modulePath),
        package: packageName,
        module: importPath,
    };
};

const getType = (type) => {
    const typeName = typeof type === "string" ? normalizeTagType(type) : type?.type;

    const multiple =
        typeName?.endsWith("[]") || typeName?.startsWith("Array<");
    const name = multiple
        ? typeName?.replace("[]", "")?.replace("Array<", "")?.replace(">", "")
        : typeName;

    return typeName ? { typeName: multiple ? `Array<${name}>` : typeName, name, multiple } : undefined;
};

const commonTags = ["public", "protected", "private", "since", "deprecated"];

const allowedTags = {
    field: [...commonTags, "formEvents", "formProperty", "default"],
    slot: [...commonTags, "default"],
    event: [...commonTags, "param", "native", "allowPreventDefault"],
    eventParam: [...commonTags],
    method: [...commonTags, "param", "returns", "override"],
    class: [...commonTags, "constructor", "class", "abstract", "experimental", "implements", "extends", "slot", "csspart"],
    enum: [...commonTags, "experimental",],
    enumMember: [...commonTags, "experimental",],
    interface: [...commonTags, "experimental",],
};
allowedTags.getter = [...allowedTags.field, "override"]

const tagMatchCallback = (tag, tagName) => {
    const currentTagName = tag.tag;

    return typeof tagName === "string"
        ? currentTagName === tagName
        : tagName.includes(currentTagName);
};

const findDecorator = (node, decoratorName) => {
    return (node?.modifiers || node?.decorators)?.find(
        (decorator) =>
            decorator?.expression?.expression?.text === decoratorName
    );
};

const findAllDecorators = (node, decoratorName) => {
    if (typeof decoratorName === "string") {
        return (node?.modifiers || node?.decorators)?.filter(decorator => decorator?.expression?.expression?.text === decoratorName) || [];
    }

    if (Array.isArray(decoratorName)) {
        return (node?.modifiers || node?.decorators)?.filter(decorator => {
            if (decorator?.expression?.expression?.text) {
                return decoratorName.includes(decorator.expression.expression.text);
            }

            return false;
        }
        ) || [];
    }

    return [];
};

const hasTag = (jsDoc, tagName) => {
    if (!jsDoc) {
        return;
    }

    return jsDoc?.tags?.some((tag) => tagMatchCallback(tag, tagName));
};

const findTag = (jsDoc, tagName) => {
    if (!jsDoc) {
        return;
    }

    return jsDoc?.tags?.find((tag) => tagMatchCallback(tag, tagName));
};

const findAllTags = (jsDoc, tagName) => {
    if (!jsDoc) {
        return [];
    }

    const foundTags = jsDoc?.tags?.filter((tag) => tagMatchCallback(tag, tagName));

    return foundTags || [];
};

const validateJSDocTag = (tag) => {
    const booleanTags = ["private", "protected", "public", "abstract", "native", "allowPreventDefault", "formProperty", "constructor", "override"];
    let tagName = tag.tag;

    if (booleanTags.includes(tag.tag)) {
        tagName = "boolean";
    }

    switch (tagName) {
        case "boolean":
            return !tag.name && !tag.type && !tag.description;
        case "deprecated":
            return !tag.type;
        case "experimental":
            return !tag.type;
        case "extends":
            return !tag.type && tag.name && !tag.description;
        case "implements":
            return tag.type && !tag.name && !tag.description;
        case "slot":
            return tag.type && tag.name && tag.description;
        case "csspart":
            return !tag.type && tag.name && tag.description;
        case "since":
            return !tag.type && tag.name;
        case "returns":
            return !tag.type && tag.name;
        case "default":
            return !tag.type && !tag.description;
        case "class":
            return !tag.type;
        case "param":
            return !tag.type && tag.name;
        case "eventparam":
            return tag.type && tag.name;
        case "formEvents":
            return !tag.type && tag.name;
        default:
            return false;
    }
};

const validateJSDocComment = (fieldType, jsdocComment, node, moduleDoc) => {
    return !!jsdocComment?.tags?.every((tag) => {
        let isValid = false

        if (fieldType === "event" && tag?.tag === "param") {
            isValid = allowedTags[fieldType]?.includes(tag.tag) && validateJSDocTag({ ...tag, tag: "eventparam" });
        } else {
            isValid = allowedTags[fieldType]?.includes(tag.tag) && validateJSDocTag(tag);
        }

        if (!isValid) {
            logDocumentationError(moduleDoc.path, `Incorrect use of @${tag.tag}. Ensure it is part of ${fieldType} JSDoc tags.`)
        }

        return !!isValid;
    });
};

const logDocumentationError = (modulePath, message) => {
    let moduleErrors = documentationErrors.get(modulePath);

    if (!moduleErrors) {
        documentationErrors.set(modulePath, []);
        moduleErrors = documentationErrors.get(modulePath);
    }

    moduleErrors.push(message);
}

const displayDocumentationErrors = () => {
    let errorsCount = 0;
    [...documentationErrors.keys()].forEach(modulePath => {
        const moduleErrors = documentationErrors.get(modulePath);

        console.log(`=== ERROR: ${moduleErrors.length > 1 ? `${moduleErrors.length} problems` : "Problem"} found in file: ${modulePath}:`)
        moduleErrors.forEach(moduleError => {
            errorsCount++;
            console.log(`\t- ${moduleError}`)
        })
    })

    if (errorsCount) {
        throw new Error(`Found ${errorsCount} errors in the description of the public API.`);
    }
}

const formatArrays = (typeText) => {
    return typeText?.replaceAll(/(\S+)\[\]/g, "Array<$1>")
}

export {
    getPrivacyStatus,
    getSinceStatus,
    getDeprecatedStatus,
    getExperimentalStatus,
    getType,
    getReference,
    validateJSDocComment,
    findDecorator,
    findAllDecorators,
    hasTag,
    findTag,
    findAllTags,
    getTypeRefs,
    normalizeDescription,
    formatArrays,
    isClass,
    normalizeTagType,
    displayDocumentationErrors,
    logDocumentationError,
    toKebabCase
};
