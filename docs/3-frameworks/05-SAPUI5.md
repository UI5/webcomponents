# UI5 Web Components & SAPUI5

UI5 Web Components are first-class citizens in SAPUI5 (and OpenUI5). A UI5 Web Component can be required and used like a regular SAPUI5 control — its properties map to SAPUI5 properties, its slots to aggregations, and its events to SAPUI5 events. This means you can drop a Web Component into an XML view or a controller and use it side-by-side with the SAPUI5 controls you already know.

New or selected UI elements, over time, will be delivered as UI5 Web Components to avoid duplication.

## How to Integrate

The full, up-to-date instructions live in the SAPUI5 documentation: [Using Web Components](https://ui5.sap.com/#/topic/1c80793df5bb424091954697fc0b2828). A working sample project is also available in the [UI5 ecosystem showcase (`ui5-tsapp-webc`)](https://github.com/ui5-community/ui5-ecosystem-showcase/tree/main/showcases/ui5-tsapp-webc). Here is a short summary.

### Step 1. Create a SAPUI5 app

If you don't already have one, scaffold a SAPUI5 app with the community [Easy UI5 generator](https://github.com/ui5-community/generator-easy-ui5), a [Yeoman](https://yeoman.io/)-based generator:

```bash
npm install --global yo generator-easy-ui5
yo easy-ui5 project
```

Answer the prompts (project name, namespace, framework, etc.). To run it without a global install, you can also use `npx -p yo -p generator-easy-ui5 yo easy-ui5 project`. For more scaffolding options and details, see the [Easy UI5 generator](https://github.com/ui5-community/generator-easy-ui5) and the [UI5 CLI Getting Started guide](https://ui5.github.io/cli/stable/pages/GettingStarted/).

### Step 2. Install the UI5 tooling extension

The [`ui5-tooling-modules`](https://www.npmjs.com/package/ui5-tooling-modules) CLI extension resolves and bundles Web Components modules during development and build.

```bash
npm install ui5-tooling-modules --save-dev --ignore-scripts=false -rte=ui5.yaml,ui5-local.yaml,ui5-deploy.yaml
```

The `-rte` (register-tooling-extension) flag registers the custom task and middleware in your `ui5*.yaml` files automatically. Any listed file that doesn't exist is simply skipped, so the command above is safe even if your project only has `ui5.yaml` — you can also pass `-rte` without a value to target just that file.

### Step 3. Install the Web Components packages you need

```bash
npm install @ui5/webcomponents
npm install @ui5/webcomponents-fiori
npm install @ui5/webcomponents-ai
# ...
```

Add them as **dependencies** (not `devDependencies`) so `ui5-tooling-modules` can resolve them at build time.

### Step 4. Use the components in XML views

Declare a namespace for the package and use the Web Component's class name as an XML node:

```xml
<mvc:View xmlns:mvc="sap.ui.core.mvc"
    xmlns:core="sap.ui.core"
    xmlns:webc="@ui5/webcomponents"
    xmlns:ai="@ui5/webcomponents-ai"
    core:require="{ allIcons: '@ui5/webcomponents-icons/AllIcons' }"
>
    <webc:List headerText="My Sample List" items="{/items}">
        <webc:ListItemStandard text="{name}" description="{id}" />
    </webc:List>

    <ai:Button text="Generate" click=".onGenerate">
        <ai:ButtonState name="generate" icon="sap-icon://ai" />
        <ai:ButtonState name="generating" icon="sap-icon://stop" />
    </ai:Button>
</mvc:View>
```

Data binding, formatters, and event handlers work exactly like they do for any other SAPUI5 control.

### Step 5. Use the components in controllers

Require the Web Component classes just like SAPUI5 modules. Don't forget to include the `Assets` module of each `@ui5/webcomponents-*` package you use — it registers the theme styles and translations at runtime.

```js
sap.ui.define([
    "@ui5/webcomponents/Panel",
    "@ui5/webcomponents-ai/Button",
    "@ui5/webcomponents-ai/ButtonState",
    "@ui5/webcomponents-icons/ai",
    "@ui5/webcomponents/dist/Assets",
    "@ui5/webcomponents-ai/dist/Assets",
    "@ui5/webcomponents-fiori/dist/Assets"
], (Panel, AIButton, AIButtonState) => {
    "use strict";
    // ...
});
```

## When to Use

SAPUI5 already ships a large library of controls, so we don't recommend replacing them one-by-one with the equivalent UI5 Web Component. Our guidance is:

- **Recommended** — use UI5 Web Components in SAPUI5 for components that don't exist there, not as a wholesale replacement for the SAPUI5 control library — for example, the AI-related components in `@ui5/webcomponents-ai` (`Button`, `PromptInput`, …).
- **Not recommended** — using a UI5 Web Component to replace a basic SAPUI5 control that already exists (e.g. a plain button, input, or list). Mixing two implementations of the same primitive adds complexity without benefit.

## API Mapping

For quick reference, this is how UI5 Web Components APIs surface in SAPUI5:

| UI5 Web Components | SAPUI5        | Notes                                                                                     |
|--------------------|---------------|-------------------------------------------------------------------------------------------|
| properties         | properties    | Standard UI5 getters/setters, e.g. `Button#getText()`, `Button#setText()`                 |
| readonly properties| getters       | Camel-cased getter, e.g. `AvatarGroup#getColorScheme()` — no setter                       |
| slots              | aggregations  | Standard UI5 aggregations with `add*`, `get*`, `remove*` accessors                        |
| events             | events        | Standard UI5 events; dashed names become camelCase (e.g. `selected-item` → `selectedItem`)|
| methods            | methods       | Any Web Component API is available, e.g. `Tree#walk()`                                    |
| —                  | associations  | SAPUI5-only concept; any Web Component property that takes an element `id` is exposed as an association |

A few additional naming differences:

- The DOM `disabled` attribute is exposed as the SAPUI5 property `enabled`.
- The default slot is exposed as the `content` aggregation.
- Web Components that allow native text content expose a bindable `text` property.

For all details, edge cases, and the most current guidance, refer to the [SAPUI5 documentation topic on Using Web Components](https://ui5.sap.com/#/topic/1c80793df5bb424091954697fc0b2828).
