# Creating Storybook Samples

The UI5 Web Components Storybook app is a playground for testing and documenting the UI5 Web Components library.
It allows developers to create stories for each UI component, capturing its rendered state in various scenarios,
and to document all the potential states that a component can display.

## Running the Storybook App Locally

To run the [UI5 Web Components Storybook app](https://ui5.github.io/webcomponents/) locally and test your changes and samples, follow the steps below:

### 1. In the root folder of the project, run the following command:

```bash
yarn
yarn start:storybook
```

<b>Note:</b> This are required only for running the Storybook app locally and not for general development.

## What's a Story
A story is a documentation of a UI component that captures its rendered state in various scenarios. Stories are useful for documenting all the potential states that a component can display, and they allow developers to test UI components in isolation.

UI components can be rendered in various scenarios, such as with different props or state, or in different layouts or contexts. Stories capture these scenarios and provide documentation of the component's behavior in each scenario.

## Where to write stories
Stories are written in the `_stories` folder of the playground package. For example, the stories for the `ui5-button` component are located in the `packages/playground/_stories/Button.stories.ts` file.

## How to write stories
The storybook app uses the [Storybook framework](https://storybook.js.org/docs/basics/introduction/) to render the stories. The stories are written in the [Component Story Format (CSF)](https://storybook.js.org/docs/web-components/api/csf) format.

The args object is used to define the properties of the component, which can be edited in the playground by users. Decorators and parameters can be used to enhance the documentation of stories.

Here is an example of a story for the ui5-button component:

```ts
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export default {
  title: "main/Button",
  component: "ui5-button",
};

export const Default = (args) => html`
  <ui5-button ?disabled="${ifDefined(args.disabled)}">${unsafeHTML(args.default)}</ui5-button>
`;

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  default: "Disabled",
};

Disabled.decorators = [ ... ];
Disabled.parameters = { ... };
Disabled.storyName = 'So simple!'; // e.g. to rename the story in the sidebar, if not set the name of the const export is used
```

Every property defined in the `args` object of the named export will end up as input control in the playground that users can edit.

### Story Decorators
[Decorators](https://storybook.js.org/docs/web-components/writing-stories/decorators) are used to wrap stories with extra markup or context. This is useful if you want to include additional script.

```ts
export const Template = (args) => html`
  <ui5-dialog id="myDialog">
	${unsafeHTML(args.default)}
  </ui5-dialog>
`;

BasicDialog.decorators = [
  (story) => html`
	<ui5-button id="dialogOpener">Open Dialog</ui5-button>
	${story()}
	<script>
		document.getElementById("dialogOpener").addEventListener("click", () => {
			document.getElementById("myDialog").open();
		});
	</script>
  `,
];
```

### Story parameters
[Parameters](https://storybook.js.org/docs/web-components/writing-stories/parameters) are static, metadata about a story, used to control the behavior of Storybook features and addons. 

They can be used both on the default export (Component parameters), applicable to all stories of the component:

```ts
export default {
  title: "main/CheckBox",
  component: "ui5-checkbox",
  parameters: {
	  controls: { include: ["indeterminate", "checked"] }
  }
};
```

Or per every named export (Story Parameters), applicable to a specific story:

```ts
BasicCheckBox.parameters = {
    controls: {
        include: ["indeterminate", "checked"],
    },
};
```

Or globally in the `.storybook/preview.ts` file.

The above example includes only the `indeterminate`, `checked` properties in the playground for users to edit.


## Documentation
The documentation for each component is automatically produced using the `custom-elements.json` file. Additionally, there is an `argTypes.ts` file located beside each `.stories.ts` file. It is generated during build time and contains extra properties that enhance the documentation beyond what is available in the `custom-elements.json` file. This file should not be edited directly, as it can only be modified by the `packages/playground/build-scripts-storybook/samples-prepare.ts` script.

### Docs page
Every story has a `docs` page in the storybook's sidebar. Usually, this page is generated automatically by storybook but it can be customized by adding a `docs` property to the story parameters. 

```ts
export default {
    title: "Main/Button",
    component,
    argTypes,
} as Meta<Button>;
```

## Configuration
Storybook configuration is located in the `.storybook` folder. 

The `preview.ts` file is the main configuration file. It is used to configure the storybook app in terms of UI features, global parameters and decorators. 

The `main.js` file is used to configure the storybook app in terms of the stories that should be loaded, as well as the addons that should be used. Build time configuration is also done here.

The Manager configured in `manager.tsx` file is the UI responsible for rendering the search, the toolbar, registering custom addons, as well as theming the UI.

### Build scripts
Several build scripts are used to generate the stories documentation. They are located in the `packages/playground/build-scripts-storybook` folder. Ran before every build of the storybook, they are responsible for generating the `argTypes.ts` file, to merge the `custom-elements.json` files and parse the content of the `docs` folder to `mdx` format.

## Troubleshooting
If you encounter an error when running yarn storybook, try the following:

- Storybook parses the documentation from the `docs` folder. Files are transformed from `.md` to `.mdx` format. If you encounter an error, check if it is mdx related, locate the errored file and use the [MDX Playground](https://mdxjs.com/playground/) to fix it. 