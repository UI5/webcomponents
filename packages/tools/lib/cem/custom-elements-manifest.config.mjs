import { parse } from "comment-parser";
import processEvent from "./event.mjs";
import path from "path";
import fs from 'fs';
import {
	getDeprecatedStatus,
	getExperimentalStatus,
	getSinceStatus,
	getPrivacyStatus,
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
	logDocumentationError,
	displayDocumentationErrors,
	toKebabCase
} from "./utils.mjs";
import { generateCustomData } from "cem-plugin-vs-code-custom-data-generator";
import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";

const packageJSON = JSON.parse(fs.readFileSync("./package.json"));
let aliasMap = {};

const devMode = process.env.UI5_CEM_MODE === "dev";
try {
	aliasMap = JSON.parse(fs.readFileSync("./.ui5-cem-aliases.json"));
} catch (e) {
	if (devMode) {
		console.warn("No .ui5-cem-aliases.json file found. Continuing without aliases.");
	}
}


const extractClassNodeJSDoc = node => {
	const fileContent = node.getFullText();
	const allJSDocsRegExp = new RegExp(`\\/\\*\\*(.|\\n)+?\\s+\\*\\/`, "gm");
	let allJSDocs = [...fileContent.matchAll(allJSDocsRegExp)];
	allJSDocs = allJSDocs.map(match => match[0]); // all /** ..... */ comments

	// Find where the class is defined in the original file
	const tsClassDefinitionRegExp = new RegExp(`^\\s*(abstract\\s*)?class [\\w\\d_]+`, "gm");
	let tsClassDefinitionMatch = fileContent.match(tsClassDefinitionRegExp);
	if (!tsClassDefinitionMatch) {
		return; // no class defined in this .ts file
	}
	const tsClassDefinition = tsClassDefinitionMatch[0];
	const tsClassDefinitionIndex = fileContent.indexOf(tsClassDefinition);

	return allJSDocs.find(JSDoc => {
		return isClass(JSDoc) && (fileContent.indexOf(JSDoc) < tsClassDefinitionIndex)
	});
}

function processClass(ts, classNode, moduleDoc) {
	const className = classNode?.name?.text;
	const currClass = moduleDoc?.declarations?.find(declaration => declaration?.name === className);
	const currClassJSdoc = extractClassNodeJSDoc(classNode);

	if (!currClassJSdoc) return;

	const customElementDecorator = findDecorator(classNode, "customElement");
	const classParsedJsDoc = parse(currClassJSdoc, { spacing: 'preserve' })[0];

	validateJSDocComment("class", classParsedJsDoc, classNode.name?.text, moduleDoc);

	const decoratorArg = customElementDecorator?.expression?.arguments[0];
	currClass.tagName = decoratorArg?.text || (decoratorArg?.properties.find(property => property.name.text === "tag")?.initializer?.text);
	currClass.customElement = !!customElementDecorator || className === "UI5Element" || undefined;
	currClass.kind = "class";
	currClass.deprecated = getDeprecatedStatus(classParsedJsDoc);
	currClass._ui5experimental = getExperimentalStatus(classParsedJsDoc);
	currClass._ui5since = getSinceStatus(classParsedJsDoc);
	currClass._ui5privacy = getPrivacyStatus(classParsedJsDoc);
	currClass._ui5abstract = hasTag(classParsedJsDoc, "abstract") ? true : undefined;
	currClass.description = normalizeDescription(classParsedJsDoc.description || findTag(classParsedJsDoc, "class")?.description);
	currClass._ui5implements = findAllTags(classParsedJsDoc, "implements")
		.map(tag => {
			const correctInterfaceDescription = classNode?.heritageClauses?.some(heritageClause => {
				return heritageClause?.types?.some(type => type.expression?.text === normalizeTagType(tag.type));
			});

			if (!correctInterfaceDescription) {
				logDocumentationError(moduleDoc.path, `@interface {${tag.type}} tag is used, but the class doesn't implement the corresponding interface`)
			}

			return getReference(ts, normalizeTagType(tag.type), classNode, moduleDoc.path)
		})
		.filter(Boolean);


	if (hasTag(classParsedJsDoc, "extends")) {
		const superclassTag = findTag(classParsedJsDoc, "extends");
		currClass.superclass = getReference(ts, superclassTag.name, classNode, moduleDoc.path);

		if (classNode?.heritageClauses?.[0]?.types?.[0]?.expression?.text !== superclassTag.name) {
			logDocumentationError(moduleDoc.path, `@extends ${superclassTag.name} is used, but the class doesn't extend the corresponding superclass`)
		}

		if (currClass.superclass?.name === "UI5Element") {
			currClass.customElement = true;
		}
	}

	if (!currClass._ui5implements.length) delete currClass._ui5implements;

	// Slots

	// Slots without accessort (defined in class comment)
	if (hasTag(classParsedJsDoc, "slot") && currClass.slots) {
		const slotTags = findAllTags(classParsedJsDoc, "slot");

		currClass.slots.forEach(slot => {
			const tag = slotTags.find(tag => tag.name === slot.name);

			const typeRefs = (normalizeTagType(tag.type)
				?.replaceAll(/Array<|>|\[\]/g, "")
				?.split("|")
				?.map(e => getReference(ts, e.trim(), classNode, moduleDoc.path)).filter(Boolean));

			slot._ui5privacy = "public";
			slot._ui5type = { text: formatArrays(normalizeTagType(tag.type)) };
			slot.description = normalizeDescription(tag.description)

			if (typeRefs && typeRefs.length) {
				slot._ui5type.references = typeRefs;
			}

			delete slot.type
		})
	}

	// Events
	currClass.events = findAllDecorators(classNode, ["event", "eventStrict"])
		?.map(event => processEvent(ts, event, classNode, moduleDoc));

	const filename = classNode.getSourceFile().fileName;
	const sourceFile = typeProgram.getSourceFile(filename);
	const tsProgramClassNode = sourceFile.statements.find(statement => ts.isClassDeclaration(statement) && statement.name?.text === classNode.name?.text);

	// Slots (with accessor), methods and fields
	for (let i = 0; i < (currClass.members?.length || 0); i++) {
		const member = currClass.members[i];
		const classNodeMember = classNode.members?.find(nodeMember => nodeMember.name?.text === member?.name && nodeMember.jsDoc?.[0]);
		const classNodeMemberJSdoc = classNodeMember?.jsDoc?.[0];

		if (!classNodeMember || !classNodeMemberJSdoc) continue;

		const memberParsedJsDoc = parse(classNodeMemberJSdoc?.getText())[0];

		member._ui5since = getSinceStatus(memberParsedJsDoc);
		member.deprecated === "true" && (member.deprecated = true)

		// Slots with accessors are treated like fields by the tool, so we have to convert them into slots.
		if (member.kind === "field") {
			const slotDecorator = findDecorator(classNodeMember, "slot");
			validateJSDocComment(slotDecorator ? "slot" : (member.readonly ? "getter" : "field"), memberParsedJsDoc, classNodeMember.name?.text, moduleDoc);

			const typeRefs = (getTypeRefs(ts, classNodeMember, member)
				?.map(e => getReference(ts, e, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

			if (member.type?.text) {
				member.type.text = formatArrays(member.type.text);
			}

			if (member.type && typeRefs.length) {
				member.type.references = typeRefs;
			}

			if (slotDecorator) {
				if (!currClass.slots) currClass.slots = [];

				const slot = currClass.members.splice(i, 1)[0];
				const defaultProperty = slotDecorator.expression?.arguments?.[0]?.properties?.find(property => property.name.text === "default");

				// name of the default slot declared with decorator will be overriden so we to provide it's accessor name
				if (defaultProperty && defaultProperty.initializer?.kind === ts.SyntaxKind.TrueKeyword) {
					slot._ui5propertyName = slot.name;
					slot.name = "default";
				}

				// Slots don't have type, privacy and kind, so we have do convert them and to clean unused props
				member._ui5type = member.type;
				member._ui5privacy = member.privacy;
				delete member.type;
				delete member.privacy;
				delete slot.kind;

				currClass.slots.push(slot);
				i--;
			} else {
				const propertyDecorator = findDecorator(classNodeMember, "property");

				if (propertyDecorator) {
					member._ui5noAttribute = propertyDecorator?.expression?.arguments[0]?.properties?.find(property => property.name.text === "noAttribute")?.initializer?.kind === ts.SyntaxKind.TrueKeyword || undefined;
				}

				if (currClass.customElement && member.privacy === "public") {
					const tsProgramMember = tsProgramClassNode.members.find(m => ts.isPropertyDeclaration(m) && m.name?.text === member.name);
					const attributeValue = typeChecker.typeToString(typeChecker.getTypeAtLocation(tsProgramMember), tsProgramMember);

					if (attributeValue === "boolean" && member.default === "true") {
						logDocumentationError(moduleDoc.path, `Boolean properties must be initialzed to false. [${member.name}] property of class [${className}] is intialized to \`true\``)
					}

					if (!member.type) {
						logDocumentationError(moduleDoc.path, `Public properties must have type. The type of [${member.name}] property is not determinated automatically. Please check it.`)
					}

					currClass.attributes.push({
						description: member.description,
						name: toKebabCase(member.name),
						default: member.default,
						fieldName: member.name,
						type: { text: attributeValue },
						deprecated: member.deprecated
					})
				}

				if (hasTag(memberParsedJsDoc, "formProperty")) {
					member._ui5formProperty = true;
				}

				const formEventsTag = findTag(memberParsedJsDoc, "formEvents");
				if (formEventsTag) {
					const tagValue = formEventsTag.description ? `${formEventsTag.name} ${formEventsTag.description}` : formEventsTag.name;
					member._ui5formEvents = tagValue.trim().replaceAll(/\s+/g, ",");
				}

				const defaultTag = findTag(memberParsedJsDoc, "default");
				if (defaultTag) {
					const tagValue = defaultTag.source?.[0]?.tokens?.name || defaultTag.source?.[0]?.tokens?.description || defaultTag.source?.[0]?.tokens?.type || "";
					member.default = tagValue;
				}

				if (member.privacy === "public" && !member.default) {
					logDocumentationError(moduleDoc.path, `Missing default value for '${member.name}'.`)
				}

				// Getters are treated as fields so they should not have return, instead of return they should have default value defined with @default
				if (member.readonly) {
					if (member.privacy === "public" && !member.type) {
						logDocumentationError(moduleDoc.path, `Missing return type for read-only field '${member.name}'.`)
					}

					delete member.return;
				}
			}
		} else if (member.kind === "method") {
			validateJSDocComment("method", memberParsedJsDoc, classNodeMember.name?.text, moduleDoc);

			member.parameters?.forEach(param => {
				// Treat every parameter that has respective @param tag as public
				param._ui5privacy = findAllTags(memberParsedJsDoc, "param").some(tag => tag.name === param.name) ? "public" : "private";
				if (param._ui5privacy === "public") {
					const paramNode = classNodeMember.parameters?.find(parameter => parameter.name?.text === param.name);
					let type;

					if (param.optional) {
						const filename = classNode.getSourceFile().fileName;

						const sourceFile = typeProgram.getSourceFile(filename);
						const tsProgramClassNode = sourceFile.statements.find(statement => ts.isClassDeclaration(statement) && statement.name?.text === classNode.name?.text);
						const tsProgramMember = tsProgramClassNode.members.find(m => ts.isMethodDeclaration(m) && m.name?.text === member.name);
						const tsProgramParameter = tsProgramMember.parameters.find(p => ts.isParameter(p) && p.name?.text === param.name);

						if (tsProgramParameter) {
							const typeName = typeChecker.typeToString(typeChecker.getTypeAtLocation(tsProgramParameter), tsProgramParameter);

							if (!param.type) {
								param.type = {};
								param.type.text = typeName;
							}

							type = typeName.replaceAll(/Array<|>|\[\]/g, "")
								?.split("|");
						}
					}

					const typeRefs = ((type || getTypeRefs(ts, (type || paramNode), param))
						?.map(typeRef => getReference(ts, typeRef, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

					if (typeRefs.length) {
						param.type.references = typeRefs;
					}
				}
			});

			if (member.return) {
				const returnTag = findTag(memberParsedJsDoc, "returns");
				member.return.description = returnTag?.description ? `${returnTag.name} ${returnTag.description}` : returnTag?.name;
				member.return.type.text = formatArrays(classNodeMember?.type?.getFullText?.()?.trim());
				const typeRefs = (getTypeRefs(ts, classNodeMember, member.return)
					?.map(typeRef => getReference(ts, typeRef, classNodeMember, moduleDoc.path)).filter(Boolean)) || [];

				if (typeRefs.length) {
					member.return.type.references = typeRefs;
				}

				if (member.privacy === "public" && !member.return.type.text) {
					logDocumentationError(moduleDoc.path, `Missing return type for function '${member.name}'.`)
				}
			} else if (member.privacy === "public") {
				logDocumentationError(moduleDoc.path, `Missing return type for function '${member.name}'.`)
			}
		}
	}
}

function processInterface(ts, interfaceNode, moduleDoc) {
	const interfaceJSdoc = interfaceNode?.jsDoc?.[0];
	const interfaceName = interfaceNode?.name?.text;

	if (!interfaceJSdoc) return;

	const interfaceParsedJsDoc = parse(interfaceJSdoc?.getText(), { spacing: 'preserve' })[0];

	validateJSDocComment("interface", interfaceParsedJsDoc, interfaceNode.name?.text, moduleDoc);

	moduleDoc.declarations.push({
		kind: "interface",
		name: interfaceName,
		description: normalizeDescription(interfaceParsedJsDoc?.description),
		_ui5experimental: getExperimentalStatus(interfaceParsedJsDoc),
		_ui5privacy: getPrivacyStatus(interfaceParsedJsDoc),
		_ui5since: getSinceStatus(interfaceParsedJsDoc),
		deprecated: getDeprecatedStatus(interfaceParsedJsDoc),
	});
}

function processEnum(ts, enumNode, moduleDoc) {
	const enumJSdoc = enumNode?.jsDoc?.[0];
	const enumName = enumNode?.name?.text;

	if (!enumJSdoc) return;

	const enumParsedJsDoc = parse(enumJSdoc?.getText(), { spacing: 'preserve' })[0];

	validateJSDocComment("enum", enumParsedJsDoc, enumNode.name?.text, moduleDoc);

	const result = {
		kind: "enum",
		name: enumName,
		description: normalizeDescription(enumJSdoc?.comment),
		_ui5experimental: getExperimentalStatus(enumParsedJsDoc),
		_ui5privacy: getPrivacyStatus(enumParsedJsDoc),
		_ui5since: getSinceStatus(enumParsedJsDoc),
		deprecated: getDeprecatedStatus(enumParsedJsDoc) || undefined,
		members: (enumNode?.members || []).map(member => {
			const memberJSdoc = member?.jsDoc?.[0];

			if (!memberJSdoc) return;

			const memberParsedJsDoc = parse(memberJSdoc?.getText())[0];

			validateJSDocComment("enum", memberParsedJsDoc, member.name?.text, moduleDoc);

			return {
				kind: "field",
				static: true,
				privacy: getPrivacyStatus(memberParsedJsDoc),
				_ui5since: getSinceStatus(memberParsedJsDoc),
				description: memberJSdoc?.comment,
				default: member.initializer?.text,
				deprecated: getDeprecatedStatus(memberParsedJsDoc),
				name: member.name?.text,
				readonly: true,
			};
		}).filter(Boolean),
	};

	moduleDoc.declarations.push(result);
}

const processPublicAPI = object => {
	if (!object) {
		return true;
	}
	const keys = Object.keys(object);
	if (!keys.includes("privacy") && !keys.includes("_ui5privacy")) {
		return true;
	}
	for (const key of keys) {
		if ((key === "privacy" && object[key] !== "public") || (key === "_ui5privacy" && object[key] !== "public")) {
			if (keys.includes("kind") && object["kind"] === "class") {
				continue;
			}

			return true;
		} else if (typeof object[key] === "object") {
			if (key === "cssParts" || key === "attributes" || key === "_ui5implements") {
				continue;
			}

			if (Array.isArray(object[key])) {
				for (let i = 0; i < object[key].length; i++) {
					const shouldRemove = processPublicAPI(object[key][i]);
					if (shouldRemove) {
						object[key].splice(i, 1);
						i--;
					}
				}
				if (object[key].length === 0) {
					delete object[key];
				}
			}
		}
	}
	return false;
};

let typeChecker;
let typeProgram;

export default {
	globs: ["src/!(*generated)/*.ts", "src/!(*bundle)*.ts"],
	outdir: 'dist',
	overrideModuleCreation: ({ ts, globs }) => {
		typeProgram = ts.createProgram(globs, {
			noEmitOnError: false,
			allowJs: true,
			experimentalDecorators: true,
			target: 99,
			downlevelIteration: true,
			module: 99,
			strictNullChecks: true,
			moduleResolution: 2,
			esModuleInterop: true,
			noEmit: true,
			pretty: true,
			allowSyntheticDefaultImports: true,
			allowUnreachableCode: true,
			allowUnusedLabels: true,
			skipLibCheck: true,
		});
		typeChecker = typeProgram.getTypeChecker();

		return globs.map((glob) => {
			const fullPath = path.resolve(process.cwd(), glob);
			const source = fs.readFileSync(fullPath).toString();

			return ts.createSourceFile(glob, source, ts.ScriptTarget.ES2015, true);
		});
	},
	plugins: [
		{
			name: 'my-plugin',
			analyzePhase({ ts, node, moduleDoc }) {
				switch (true) {
					case ts.isClassDeclaration(node):
						processClass(ts, node, moduleDoc);
						break;
					case ts.isEnumDeclaration(node):
						processEnum(ts, node, moduleDoc);
						break;
					case ts.isInterfaceDeclaration(node):
						processInterface(ts, node, moduleDoc);
						break;
				}
			},
			moduleLinkPhase({ moduleDoc }) {
				moduleDoc.path = moduleDoc.path?.replace(/^src/, "dist").replace(/\.ts$/, ".js");

				moduleDoc.exports = moduleDoc.exports.
					filter(e => !(e.kind === "custom-element-definition" && !moduleDoc.declarations?.find(d => d.name === e.name)?.tagName))

				moduleDoc.exports.forEach(e => {
					const classNode = moduleDoc.declarations.find(c => c.name === e.declaration.name);

					if (e.declaration && e.declaration.module) {
						e.declaration.module = e.declaration.module.replace(/^src/, "dist").replace(/\.ts$/, ".js");
					}

					if (classNode?.customElement && classNode.tagName && e.kind !== "custom-element-definition") {
						moduleDoc.exports.push({
							kind: "custom-element-definition",
							name: classNode.tagName,
							declaration: {
								name: e.declaration.name,
								module: e.declaration.module
							}
						})
					}
				})
			},
			packageLinkPhase({ customElementsManifest }) {
				customElementsManifest.modules.forEach(moduleDoc => {
					for (let i = 0; i < moduleDoc.declarations.length; i++) {
						const shouldRemove = processPublicAPI(moduleDoc.declarations[i]) || ["function", "variable"].includes(moduleDoc.declarations[i].kind)
						if (shouldRemove) {
							moduleDoc.declarations.splice(i, 1);
							i--;
						}
					}

					moduleDoc.declarations.forEach(declaration => {
						if (declaration.superclass?.name && aliasMap[declaration.superclass.name]) {
							declaration.superclass.name = aliasMap[declaration.superclass.name];
						}
					})

					const typeReferences = new Set();
					const registerTypeReference = reference => typeReferences.add(JSON.stringify(reference))

					moduleDoc.declarations.forEach(declaration => {
						["events", "slots", "members"].forEach(memberType => {
							declaration[memberType]?.forEach(member => {
								if (member.type?.references) {
									member.type.references.forEach(registerTypeReference)
								} else if (member._ui5type?.references) {
									member._ui5type.references.forEach(registerTypeReference)
								} else if (member.kind === "method") {
									member.return?.type?.references?.forEach(registerTypeReference)

									member.parameters?.forEach(parameter => {
										parameter.type?.references?.forEach(registerTypeReference)
									})
								}
							})
						})
					});

					typeReferences.forEach(reference => {
						reference = JSON.parse(reference);
						if (reference.package === packageJSON?.name && reference.module === moduleDoc.path) {
							const hasExport = moduleDoc.exports.some(e => e.declaration?.name === reference.name && e.declaration?.module === reference.module)

							if (!hasExport) {
								logDocumentationError(moduleDoc.path?.replace(/^dist/, "src").replace(/\.js$/, ".ts"), `Type '${reference.name}' is used to describe a public API but is not exported.`,)
							}
						}
					})
				});

				if (devMode) {
					displayDocumentationErrors();
				}
			}
		},
		generateCustomData({ outdir: "dist", cssFileName: null, cssPropertiesDocs: false }),
		customElementJetBrainsPlugin({ outdir: "dist", cssFileName: null, cssPropertiesDocs: false })
	],
};
