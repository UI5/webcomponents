const ComponentTemplate = (componentName) => {
	return `import type ${componentName} from "./${componentName}.js";

export default function ${componentName}Template(this: ${componentName}) {
	return (
		<div>Hello World!</div>
	);
}
`;
};

export default ComponentTemplate;
