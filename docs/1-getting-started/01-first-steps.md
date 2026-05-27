# First Steps

*This section explains how to get started with UI5 Web Components.*

## Distribution Model

UI5 Web Components are distributed as **ES6 modules** across several **NPM packages**:

The most commonly used ones are:
 - `@ui5/webcomponents` - components library, containing bread-and-butter components (buttons, inputs, pickers, etc.);
 - `@ui5/webcomponents-fiori` - components library, containing semantic, higher-order components;
 - `@ui5/webcomponents-icons` - icons collection, containing general-purpose and business-oriented icons.

**Important: There is no CDN for UI5 Web Components**. Each application is expected to **import** and **bundle** only the components (and any other resources) it is going to use.

## Bundling UI5 Web Components

To build your UI5 Web Components project you can use any bundling tool that supports the following features:
 - `.json` imports;
 - dynamic ES6 imports.

This is true for all modern bundlers.  

UI5 Web Components are shipped as ES6 modules and published on NPM. If you are already using a framework that handles bundling of ES6 modules, skip forward to [Installation](#installation) or check the Tutorials section.

### Creating a Project

You can use any ES6 module-capable front-end tooling, but in case you don’t have a preference yet, you can start a new project using [Vite](https://vitejs.dev). The only prerequisite is to have [Node.js](https://nodejs.org/) installed.

```console
npm init vite
```

- Select a project name: `my-webcomponents-app`
- Select a framework: `vanilla`
- Select a variant: `JavaScript`

This command will create a project structure under `my-webcomponents-app`. Follow the instructions on the screen to install the initial dependencies and start a dev server.

```
cd my-webcomponents-app
npm install
npm run dev
```

You should see a message that a server is running on `Local: http://localhost:3000/`. Launch your favourite IDE and change some code, the browser page will be automatically refreshed.

### Installation

<a name="installation"></a>

Install ```@ui5/webcomponents```

```bash
npm install @ui5/webcomponents
```

This command downloads the published source code of the UI5 Web Components to the `node_modules` folder. Now, you can add them to your code to get them on the web page.

### Documentation

Take a look at the available UI5 Web Components documentation in the [playground](https://ui5.github.io/webcomponents/play).

### Usage

#### 1. Import the needed Web Component.

```js
// src/main.js
import "@ui5/webcomponents/dist/Button.js";
```

This line runs the code that registers the `<ui5-button>` tag with the browser. Now, when the browser sees such a tag, it knows how to render it.

#### 2. Instantiate the Web Component.

Next, change the application markup in the same file to display the button on the page:
```js
// src/main.js
...
document.querySelector('#app').innerHTML = `
  <ui5-button>Hello UI5 Web Components</ui5-button>
`
```

Check the browser to see the displayed button. You can now use UI5 Web Components just like normal HTML elements - set attributes on them, attach events, and more as described in the documentation.

#### 3. Run a production build.

If you want to deploy your project on a static hosting or in a Node.js project, run:

```console
npm run build
```

The output will show what files were created along with their sizes:

```console
vite v2.3.4 building for production...
✓ 99 modules transformed.
dist/assets/favicon.17e50649.svg 1.49kb
dist/index.html 0.51kb
dist/assets/index.ccce2ca3.css 0.16kb / brotli: 0.10kb
dist/assets/index.4116dceb.js 0.12kb / brotli: 0.09kb
dist/assets/vendor.c05c7785.js 114.92kb / brotli: 24.30kb
```

The content of the `dist` folder is ready to be deployed for productive usage. The hashes in the file names make them safe for caching and the produced bundle is optimized for production.

#### 4. Enjoy UI5 Web Components.

### Code Completion

#### Visual Studio Code (VS Code)

UI5 Web Components packages include a vscode.html-custom-data.json file that describes their custom elements. This enables advanced code completion features, such as “code hinting” or “IntelliSense,” in Visual Studio Code.

Steps to Enable Code Completion in VS Code:

1. Install UI5 Web Components locally
   Use your package manager to add the required UI5 Web Components packages to your project.

2. Create or update `.vscode/settings.json`:
   - Ensure a folder named `.vscode` exists at the root of your project.
   - Inside `.vscode`, create or update a file named `settings.json`.

3. Configure the Settings File:
   Add the following configuration to `settings.json`:

   ```json
   {
     "html.customData": [
       "./node_modules/@ui5/webcomponents/dist/vscode.html-custom-data.json"
       // Add entries for other installed @ui5/webcomponents packages as needed
     ]
   }
   ```

   If `settings.json` already exists, append the `html.customData` property to the root object.

4. Restart VS Code:
   Restart the editor to apply the changes.

#### JetBrains IDEs
For JetBrains IDEs, such as WebStorm or IntelliJ IDEA, no additional setup is required when using UI5 Web Components installed from your package manager. The IDE will automatically detect the `web-types.json` file provided by the packages, enabling code completion and displaying relevant component information without further configuration.
