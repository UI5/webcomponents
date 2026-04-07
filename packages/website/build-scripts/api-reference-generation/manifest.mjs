import fs from "fs"
import path from "path"

const _manifest = {
    modules: []
}
const processedDeclarations = new Map();

const getAutocompleteData = (_package) => {
    const result = {};
    _manifest.modules.forEach(module => {
        module.declarations.forEach(declaration => {
            if (declaration.kind === "class" && declaration.customElement) {
                result[declaration.tagName] = {attrs: {}};
                declaration.attributes?.forEach(attr => {
                    if (attr.type.text === "boolean") {
                        result[declaration.tagName].attrs[attr.name] = ["", attr.name];
                    } else if (attr.type.text === "string") {
                        result[declaration.tagName].attrs[attr.name] = "null";
                    } else if (attr.type.text.includes("|")) {
                        // enum
                        result[declaration.tagName].attrs[attr.name] = attr.type.text.split("|").map(x => x.trim().replaceAll('\"', ''));
                    } else {
                        result[declaration.tagName].attrs[attr.name] = "null";
                    }
                });
            };
        });
    });
    return result;
};

const findDeclaration = ({ package: packageName, name }) => {
    let declaration;

    for (let _module of _manifest.modules) {
        for (let _declaration of _module.declarations) {
            if (_declaration.name === name && _declaration._ui5package === packageName) {
                declaration = _declaration;
                break;
            }
        }
    }

    return declaration;
}

const findAllImplementations = (interfaceReference) => {
    let declarationNames = [];

    for (let _module of _manifest.modules) {
        for (let _declaration of _module.declarations) {
            if (_declaration?._ui5implements?.some(reference => reference.name === interfaceReference.name && reference.package === interfaceReference._ui5package)) {
                declarationNames.push(`${_declaration._ui5package}/${_declaration.name}`)
            }
        }
    }

    return declarationNames;
}

const flattenAPIsHierarchicalStructure = module => {
    if (!module) {
        return;
    }

    const declarations = module.declarations;

    declarations.forEach(declaration => {
        let superclassDeclaration = processedDeclarations.get(`${declaration.superclass?.package}/${declaration.superclass?.name}`);

        if (!superclassDeclaration) {
            const superclassModule = _manifest.modules.find(_m => _m.declarations.find(_d => _d.name === declaration.superclass?.name && _d._ui5package === declaration.superclass?.package));

            if (superclassModule) {
                flattenAPIsHierarchicalStructure(superclassModule);
            }

            superclassDeclaration = processedDeclarations.get(`${declaration.superclass?.package}/${declaration.superclass?.name}`);
        }

        if (superclassDeclaration && superclassDeclaration.name !== "UI5Element" && superclassDeclaration._ui5package !== realPackagesName("base")) {
            processedDeclarations.set(`${declaration._ui5package}/${declaration.name}`, mergeClassMembers(declaration, processedDeclarations.get(`${declaration.superclass?.package}/${declaration.superclass?.name}`)));
        } else {
            processedDeclarations.set(`${declaration._ui5package}/${declaration.name}`, declaration);
        }
    })
}

const mergeClassMembers = (declaration, superclassDeclaration) => {
    const props = ["members", "slots", "events", "cssParts"];

    props.forEach(prop => {
        if (declaration[prop]?.length) {
            declaration[prop] = (superclassDeclaration[prop] || []).reduce(mergeArraysWithoutDuplicates, declaration[prop])
        } else if (superclassDeclaration[prop]?.length) {
            declaration[prop] = superclassDeclaration[prop];
        }
    });

    if (declaration._ui5implements?.length) {
        declaration._ui5implements = [...new Set([...(superclassDeclaration._ui5implements || []), ...declaration._ui5implements])]
    } else if (superclassDeclaration._ui5implements?.length) {
        declaration._ui5implements = superclassDeclaration._ui5implements;
    }

    return declaration;
}

const mergeArraysWithoutDuplicates = (currentValues, newValue) => {
    const hasDuplicate = currentValues.find(currentValue => {
        return currentValue.name === newValue.name
    });

    if (!hasDuplicate) {
        currentValues.push(newValue);
    }

    return currentValues;
}

const parseTypeAsString = (typeObj) => {
    if (!typeObj || !typeObj.references) {
        return typeObj;
    }

    // Store enum references for linking in docs
    typeObj._enumReferences = [];

    typeObj.references.forEach(reference => {
        const foundReference = findDeclaration(reference);

        if (foundReference && foundReference.kind === "enum") {
            const enumFields = foundReference.members
                .filter(member => member.kind === "field" && member.static)
                .map(member => `"${member.name}"`)
                .join(" | ");

            const regexp = new RegExp(`\\b${foundReference.name}\\b`, "g");
            typeObj.text = typeObj.text.replaceAll(regexp, enumFields);

            // Preserve enum reference for doc generation
            typeObj._enumReferences.push({
                name: foundReference.name,
                package: foundReference._ui5package,
            });
        }
    })
}

const resolveTypes = declaration => {
    declaration.members
        ?.filter(member => member.kind === "field")
        .forEach(field => {
            parseTypeAsString(field.type);
        })

    declaration.members
        ?.filter(member => member.kind === "method")
        .forEach(method => {
            if (method.return) parseTypeAsString(method.type);
            if (method.parameters) method.parameters.forEach(param => parseTypeAsString(param.type))
        })

    declaration.events
        ?.forEach(event => {
            parseTypeAsString(event.type)
            if (event._ui5parameters) event._ui5parameters.forEach(param => parseTypeAsString(param.type))
        })

    declaration.slots
        ?.forEach(slot => {
            parseTypeAsString(slot._ui5type)
        })

}

// Load manifests for each package, merge child + parent classes to fulfill missing properties and transform enumaration values to strings.
const loadManifests = () => {
    getPackages().forEach(packageName => {
        const manifestPath = path.resolve(`./../${packageName}/dist/custom-elements-internal.json`);

        // Skip packages that don't have a manifest (e.g., base package)
        if (!fs.existsSync(manifestPath)) {
            return;
        }

        const currentLoadedManifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf-8" }))

        _manifest.modules = [
            ..._manifest.modules,
            ...currentLoadedManifest.modules.map(_module => {
                return {
                    ..._module,
                    declarations: [..._module.declarations.map(_declaration => {
                        _declaration._ui5package = realPackagesName(packageName)
                        return _declaration
                    })
                    ]
                }
            }).filter(_module => _module.declarations.length)
        ]
    })

    _manifest.modules?.forEach(_module => {
        flattenAPIsHierarchicalStructure(_module);
        _module.declarations?.forEach(resolveTypes);
    });
}

const getPackages = () => {
    return ["main", "fiori", "compat", "base", "ai"];
}

const realPackagesName = (key) => {
    const map = {
        "base": "@ui5/webcomponents-base",
        "main": "@ui5/webcomponents",
        "compat": "@ui5/webcomponents-compat",
        "fiori": "@ui5/webcomponents-fiori",
        "ai": "@ui5/webcomponents-ai",
    };

    return map[key];
}

const getEnums = packageName => {
    const enums = [];

    _manifest.modules.forEach(_module => {
        _module.declarations.forEach(_declaration => {
            if (_declaration.kind === "enum" && _declaration._ui5package === packageName) {
                enums.push(_declaration);
            }
        })
    })

    return enums
}

const getInterfaces = packageName => {
    const interfaces = [];

    _manifest.modules.forEach(_module => {
        _module.declarations.forEach(_declaration => {
            if (_declaration.kind === "interface" && _declaration._ui5package === packageName) {
                interfaces.push(_declaration);
            }
        })
    })

    return interfaces
}

export {
    loadManifests,
    findDeclaration,
    getPackages,
    findAllImplementations,
    realPackagesName,
    getEnums,
    getInterfaces,
    getAutocompleteData,
}