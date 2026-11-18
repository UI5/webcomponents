# Running the Website

The UI5 Web Components Website app is the entry point of the UI5 Web Components project. 
The app includes documentation, API reference and samples for all the available web components.

The website can be run locally to test your changes and samples.
In order to do so, you have to follow the steps below:

In your terminal, run the following commands:

```bash
yarn
yarn start:website
```

This will build all the necessary assets and will start local server on your machine
and finally open the website in your browser.


# Creating Website Samples

The website app is developed in its own package `packages/website`. Component features or states are demonstrated via samples meant for consumers.
The samples are placed in the `/packages/website/docs/_samples` folder.

**For example:** 
The Button samples can be found in the `/packages/website/docs/_samples/main/Button` folder.


## Run the Website

Runs project build + website start.

```bash
yarn start:website
```

However, in most cases you have the project built, so it would be faster
to just start the website:

```bash
cd packages/website
yarn start
```

**Note:** In case of issues with the second flow, most likely you need `yarn build` in the root.


## How Component Pages Are Generated

Component pages are **automatically generated** from two sources:

1. **The Custom Elements Manifest (CEM)** — the API reference (properties, events, slots, methods) comes from JSDoc comments in the component's TypeScript source. Run `node ../tools/bin/dev.js generateAPI` in the package directory to regenerate the CEM after changing JSDoc.

2. **`samples.json`** — controls which samples appear on a component's page and in what order. Each package has one file at `docs/components/<package>/samples.json`.

The generator runs automatically as part of `yarn start` and `yarn build`.

> **Note:** The old `docs/_components_pages/` directory is obsolete. Component pages are no longer hand-authored there. Any file left in that directory will **block the build** with an error telling you how to migrate.


## Create New Sample

A regular component sample consists of a folder + 3 files (`{sample_name}.md`, `main.js` and `sample.html`) that you need to create. Let's go through every one of them:

### The `main.js` file

In the `main.js` file, we import the components and assets (icons, illustration) required by the sample.

**For example:**
```ts
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/account.js";
```

### The `sample.html` file

In the `sample.html` file, we use the web components as in regular HTML page.

**For example:**

```html
<!-- playground-fold -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample</title>
</head>

<body style="background-color: var(--sapBackgroundColor)">
    <!-- playground-fold-end -->

    <ui5-button icon="sap-icon://edit" design="Default" tooltip="Edit Button"></ui5-button>
    <ui5-button icon="sap-icon://account" design="Transparent" tooltip="Account Button"></ui5-button>
    <!-- playground-fold -->
    <script type="module" src="main.js"></script>
</body>

</html>
<!-- playground-fold-end -->

```

**Note:** The `playground-fold` comments will fold this part of the code to highlight the important part — the component usage.

### The `{sample_name}.md` file

In the `.md` file we instantiate the `Editor` component (file editor + preview) that will display your sample and show the code behind it.

**For example:**
```md
import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

<Editor html={html} js={js} />
```


## Show the Sample

After creating the sample files, register the sample in `docs/components/<package>/samples.json`.

**For example**, to add a new sample `MyFeature` to `Button` in the `main` package, open `docs/components/main/samples.json` and add an entry:

```json
"Button": {
  "samples": [
    { "name": "Basic" },
    { "name": "MyFeature", "title": "My Feature", "description": "The Button supports my new feature." }
  ]
}
```

The key fields are:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | yes | Matches the sample folder name and `.md` file name |
| `title` | no | Display title shown above the sample (defaults to `name`) |
| `description` | no | Short description shown between the title and the sample |

Then restart the website (`yarn start`) or run `yarn generate-api-reference` to regenerate the pages.

**Note:** Changes in sample files (`.md`, `.html`, `.js`) are detected and the server reloads. Changes to `samples.json` require a server restart.


## Conventions 

### Sample Name

- The sample name and the folder that includes the sample files should match the `.md` file name (`Button/IconOnly/IconOnly.md`). 

- Regarding the naming, it's best to consult with KM and use existing ones as reference.

### Sample Title and Description
The title and description will be displayed at the top of the sample itself. Adding both is recommended — they help viewers better understand what they are looking at.


### Sample Order
Add new samples in the "More Samples" section where it best fits among the existing samples.


### The "Basic" Sample
All components have a sample called "Basic". The **first entry** in the `samples` array is treated as the Basic sample — it appears before the API reference. All subsequent entries appear in the "More Samples" section. Don't name other samples "Basic".
