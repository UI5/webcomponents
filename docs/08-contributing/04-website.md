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

The website app is developed in its own package `packages/website`. Components features or states are demonstrated via samples meant for consumers.
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


## Create New Sample

A regular component sample consists of a folder + 3 files (`{sample_name}.md`, `main.js` and `sample.html`) that you need to create. Let's go trough every one of them:

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


**Note:** The `playground-fold` comments will fold this part of the code to highlight the important part - the components usage.

### The `{sample_name}.md` file

In the `.md` file we instantiate the `Editor` component (file editor + preview) that will display your sample and show the code behind it.

**For example:**
```md
import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

<Editor html={html} js={js} />
```


## Show the Sample

In the previous step we have created our sample. Now, it's time to show and document it.


- Open the `packages/website/docs/_components_pages` folder.

- Find your component's `.mdx` file.

**For example:** `packages/website/docs/_components_pages/main/Button.mdx`

- Import the newly created sample.

**For example:** 
```js
import MyNewSample from "../../_samples/main/Button/MyNewSample/MyNewSample.md";`
```

- Instantiate the sample and add title + description.

**For example:**

```.md
### My New Sample
The Button supports several designs to indicate the priority or the nature of the action.

<MyNewSample />

```

**Note:** Changes in the sample files (`.md`, `.html`, `.js`) are detected and the server reloads. However, changes in the `.mdx` file are not watched - restart of the server is needed.

## Conventions 

### Sample Name

- The sample name and the folder that includes the sample files should match the `.md` file name (`Button/IconOnly/IconOnly.md`). 

- Regarding the naming, it's best to consult with KM and use existing ones as reference.

### Sample Title and Description
The title ("My New Sample") and the description ("The Button..") will be displayed at the top of the sample itself. Adding title and description is recommended -  they help viewers better understand what they are looking at.


### Sample Order
Add new samples in the "More Samples" section where it best fits among the existing samples.


### The "Basic" Sample
All components have a sample called "Basic" used as the first sample displayed right-after the component's overview. Don't use "Basic" for other samples.
