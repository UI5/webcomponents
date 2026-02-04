const parseDeclarationDescription = (description) => {
    if (!description) {
        return "";
    }
    return description.replaceAll(/#{1,} Overview/g, "");
};

const processDescription = (description) => {
    if (!description) {
        return " - "
    }

    return description
        // lists inside description
        .replaceAll(/\n\s*-/g, "<br />-")
        // breaklines
        .replaceAll(/(\n\s*\n){1,}/g, "<br />")
        .replaceAll(/\n/g, " ");
}

const packageToFolder = {
    "@ui5/webcomponents": "main",
    "@ui5/webcomponents-fiori": "fiori",
    "@ui5/webcomponents-compat": "compat",
    "@ui5/webcomponents-ai": "ai",
    "@ui5/webcomponents-base": "base",
};

const getEnumLink = (enumRef) => {
    const folder = packageToFolder[enumRef.package];
    if (!folder) {
        return null;
    }
    // Use absolute paths from docs root to avoid issues with varying component slug depths
    // Main package enums are at /components/enums/ (not /components/main/enums/)
    // Other packages keep their folder in the path
    if (folder === "main") {
        return `[${enumRef.name}](/components/enums/${enumRef.name})`;
    }
    return `[${enumRef.name}](/components/${folder}/enums/${enumRef.name})`;
}

const processType = (type) => {
    if (!type || !type.text) {
        return " - "
    }

    const typeText = `\`${type?.text?.replaceAll("|", "\\|")}\``;

    // Add links to enum types if available
    if (type._enumReferences?.length) {
        const enumLinks = type._enumReferences
            .map(getEnumLink)
            .filter(Boolean)
            .join(", ");

        if (enumLinks) {
            return `${typeText} (${enumLinks})`;
        }
    }

    return typeText;
}

const getPropsTables = (declaration) => {
    let result = `## Properties`
    const properties = declaration.members?.filter(member => member.kind === "field") || [];

    if (!properties.length) {
        return `${result}
No properties available for this component.`
    }

    result += "\n" + properties.map(property => {
        let propertyResult = `### ${property.name}
|             |   |
|-------------|---|
| Description | ${processDescription(property.description)} |
| Type        | ${processType(property.type)}               |
| Default     | ${property.default.replace("{}", "\\{\\}")}                         |`


        if (property.readonly) {
            propertyResult += `\n| Readonly | true |`
        }

        if (property._ui5since) {
            propertyResult += `\n| Since | ${property._ui5since} |`
        }

        if (property.deprecated) {
            propertyResult += `\n| **Deprecated** | ${processDescription(typeof property.deprecated === "boolean" ? "true" : property.deprecated)} |`
        }

        return propertyResult
    }).join("\n")

    return result;
}

const getMethodsTables = (declaration) => {
    let result = `## Methods`
    const methods = declaration.members?.filter(member => member.kind === "method") || [];

    if (!methods.length) {
        return `${result}
No methods available for this component.`
    }

    result += "\n" + methods.map(method => {
        let methodResult = `### ${method.name}
|             |   |
|-------------|---|
| Description | ${processDescription(method.description)} |
| Return type | ${processType(method.return?.type)} |`

        if (method.parameters) {
            const paramsText = method.parameters.map(param => {
                let text = `**${param.name}**: ${processType(param.type)}`;

                if (param.description) {
                    text += `<br />${processDescription(param.description)}`
                }

                if (param._ui5since) {
                    text += `<br />Since:${param._ui5since}`
                }

                if (param.deprecated) {
                    text += `<br />Deprecated: ${processDescription(typeof param.deprecated === "boolean" ? "true" : param.deprecated)}`
                }

                return text;
            }).join("\n\n");

            methodResult += `\n| Parameters | ${processDescription(paramsText)} |`
        }

        if (method._ui5since) {
            methodResult += `\n| Since | ${method._ui5since} |`
        }

        if (method.deprecated) {
            methodResult += `\n| Deprecated | ${processDescription(typeof method.deprecated === "boolean" ? "true" : method.deprecated)} |`
        }

        return methodResult
    }).join("\n")

    return result;
}

const getEventsTables = (declaration) => {
    let result = `## Events`
    const events = declaration.events || [];

    if (!events.length) {
        return `${result}
No events available for this component.`
    }

    result += "\n" + events.map(event => {
        let eventResult = `### ${event.name}
|             |   |
|-------------|---|
| Description | ${processDescription(event.description)} |
| Type | ${processType(event.type)} |`

        if (event._ui5parameters) {
            const paramsText = event._ui5parameters.map(param => {
                let text = `**${param.name}**: ${processType(param.type)}`;

                if (param.description) {
                    text += `<br />${processDescription(param.description)}`
                }

                if (param._ui5since) {
                    text += `<br />Since:${param._ui5since}`
                }

                if (param.deprecated) {
                    text += `<br />Deprecated: ${processDescription(typeof param.deprecated === "boolean" ? "true" : param.deprecated)}`
                }

                return text;
            }).join("\n\n");

            eventResult += `\n| Parameters | ${processDescription(paramsText)} |`
        }

        if (event._ui5since) {
            eventResult += `\n| Since | ${event._ui5since} |`
        }

        eventResult += `\n| Bubbles | ${event._ui5Bubbles ? "Yes" : "No"} |`

        eventResult += `\n| Cancelable | ${event._ui5Cancelable ? "Yes - via <code>preventDefault()</code>" : "No"} |`

        if (event.deprecated) {
            eventResult += `\n| Deprecated | ${processDescription(typeof event.deprecated === "boolean" ? "true" : event.deprecated)} |`
        }

        return eventResult
    }).join("\n")

    return result;
}

const getSlotsTables = (declaration) => {
    let result = `## Slots`
    const slots = declaration.slots || [];

    if (!slots.length) {
        return `${result}
No slots available for this component.`
    }

    result += "\n" + slots.map(slot => {
        let slotResult = `### ${slot.name}
|             |   |
|-------------|---|
| Description | ${processDescription(slot.description)} |
| Type        | ${processType(slot._ui5type)} |`

        if (slot._ui5since) {
            slotResult += `\n| Since | ${slot._ui5since} |`
        }

        if (slot.deprecated) {
            slotResult += `\n| Deprecated | ${processDescription(typeof slot.deprecated === "boolean" ? "true" : slot.deprecated)} |`
        }

        return slotResult
    }).join("\n")

    return result;
}

const getCssPartsTable = (declaration) => {
    let result = `## CSS Parts`
    const cssParts = declaration.cssParts || [];

    if (!cssParts.length) {
        return `${result}
No CSS parts available for this component.`
    }

    result = `${result}
| Name | Description |
|------|-------------|
${cssParts.map(cssPart => `| ${cssPart.name} | ${processDescription(cssPart.description)} |`).join("\n")}`

    return result;
}



const getEnumFieldsTables = (declaration) => {
    let result = `## Enum fields`
    const enumFields = declaration.members?.filter(member => member.kind === "field") || [];

    if (!enumFields.length) {
        return `${result}
No enum fields available for this enum.`
    }

    result = `${result}
| Name | Description |
|------|-------------|
${enumFields.map(field => `| ${field.name} ${field.deprecated ? `<br /> <span className="badge badge--primary">Deprecated</span>` : ""} | ${processDescription(field.description)} ${field.deprecated ? `<br /> <small style={{fontStyle: "italic"}}>${deprecatedText(field)}</small>` : ""} |`).join("\n")}`

    return result;
}

const getTable = (kind, declaration) => {
    switch (kind) {
        case "field":
            return getPropsTables(declaration);
        case "method":
            return getMethodsTables(declaration);
        case "event":
            return getEventsTables(declaration);
        case "cssPart":
            return getCssPartsTable(declaration);
        case "slot":
            return getSlotsTables(declaration);
        case "enum":
            return getEnumFieldsTables(declaration);
        default:
            return "";
    }
}


const parseDeclaration = (declaration, packageName) => {
    if (!declaration) {
        return "";
    }

    let sections = [];

    if (declaration.deprecated) {
        sections.push(`:::warning
${deprecatedText(declaration)}
:::`)
    } else if (declaration._ui5experimental) {
        sections.push(`:::info
${experimentalText(declaration)}
:::`)
    }

    sections.push(parseDeclarationDescription(declaration.description))

    if (packageName === "main") {
        sections.unshift(`---
slug: ../../${declaration.kind}s/${declaration.name}
---`)
    }

    if (declaration.kind === "enum") {
        sections.push(getTable("enum", declaration));
    } else if (declaration.kind === "interface") {
        if (!declaration._implementations || !declaration._implementations.length) {
            sections.push(`## Implementations
Interfaces doesn't have direct implementations.
`)
        } else {
            sections.push(`## Implementations
| Name | Module |
|------|--------|
${declaration._implementations.map(_implementation => `| ${_implementation.split("/").pop()} | \`${_implementation}\` |`).join("\n")}
`)
        }

    }

    let fileContent = sections.join("\n\n");


    if (declaration.deprecated) {
        fileContent = addDeprecatedClassName(fileContent, declaration);
    } else if (declaration._ui5experimental) {
        fileContent = addExperimentalClassName(fileContent, declaration);
    }


    return fileContent;
}

const experimentalText = declaration => {
    return typeof declaration._ui5experimental === "boolean" ?
        "The following entity is available under an experimental flag and its API and behavior are subject to change."
        : declaration._ui5experimental;
}

const deprecatedText = declaration => {
    return typeof declaration.deprecated === "boolean" ?
        "The following entity is deprecated and will be removed in the next major version."
        : declaration.deprecated;
}


const parseComponentDeclaration = (declaration, fileContent) => {
    if (!declaration || !fileContent) {
        return "";
    }

    if (declaration.customElement) {
        fileContent = enhanceFrontMatter(fileContent, "ui5_tag_name", declaration.tagName)
    }

    if (declaration._ui5since) {
        fileContent = enhanceFrontMatter(fileContent, "ui5_since", `${declaration._ui5since}`)
    }

    if (declaration.deprecated) {
        fileContent = addDeprecatedClassName(fileContent, declaration);

        fileContent = fileContent.replace("<%COMPONENT_OVERVIEW%>", `:::warning
${deprecatedText(declaration)}
:::

${parseDeclarationDescription(declaration.description)}`)
    } else if (declaration._ui5experimental) {
        fileContent = addExperimentalClassName(fileContent, declaration);

        fileContent = fileContent.replace("<%COMPONENT_OVERVIEW%>", `:::info
${experimentalText(declaration)}
:::

${parseDeclarationDescription(declaration.description)}`)
    } else {
        fileContent = fileContent.replace("<%COMPONENT_OVERVIEW%>", parseDeclarationDescription(declaration.description))
    }

    const metadataSections = [
        "field",
        "slot",
        "event",
        "method",
        "cssPart"
    ].map(fieldType => getTable(fieldType, declaration))

    fileContent = fileContent.replace("<%COMPONENT_METADATA%>", metadataSections.join("\n\n"));

    return fileContent
}

const experimentalCssClass = "expComponentBadge";
const deprecatedCssClass = "deprComponentBadge";

const addDeprecatedClassName = (fileContent, declaration) => {
    if (!declaration.deprecated) {
        return fileContent;
    }

    const frontMatter = fileContent.match(/^---\n(?:.+\n)*---/);

    if (!frontMatter) {
        return `---
sidebar_class_name: ${deprecatedCssClass}
---

${fileContent}`
    }

    return enhanceFrontMatter(fileContent, "sidebar_class_name", deprecatedCssClass)
}

const addExperimentalClassName = (fileContent, declaration) => {
    if (!declaration._ui5experimental) {
        return fileContent;
    }

    const frontMatter = fileContent.match(/^---\n(?:.+\n)*---/);

    if (!frontMatter) {
        return `---
sidebar_class_name: ${experimentalCssClass}
---

${fileContent}`
    }

    return enhanceFrontMatter(fileContent, "sidebar_class_name", experimentalCssClass)
}

const enhanceFrontMatter = (fileContent, front_matter_name, value) => {
    const frontMatter = fileContent.match(/^---\n(?:.+\n)*---/);

    if (!frontMatter) {
        return `---
${front_matter_name}: ${value}
---

${fileContent}`
    }

    const frontMatterLines = frontMatter[0].split("\n");
    const classLineIndex = frontMatterLines.findIndex(line => line.startsWith(front_matter_name))
    const classLine = classLineIndex !== -1 ? frontMatterLines[classLineIndex] : undefined;
    const hasExperimentalClass = classLine?.includes(value);

    if (classLine && !hasExperimentalClass) {
        frontMatterLines[classLineIndex] = `${classLine} ${value}`;
    } else if (!classLine) {
        frontMatterLines.splice(frontMatterLines.length - 1, 0, `${front_matter_name}: ${value}`);
    }

    return fileContent.replace(frontMatter[0], frontMatterLines.join("\n"));
}

export {
    parseDeclaration,
    parseComponentDeclaration,
}