# Cypress Component Testing for UI5 Web Components

This package provides configuration to test UI5 Web Components using TSX with Cypress.

## Adding to an Existing UI5 Web Components Project

### 1. Install Dependencies
To enable Cypress for component testing in your project, install the required dependencies:

```bash
npm install -D cypress @ui5/cypress-ct-ui5-webc
```

Once installed, run the following command to open Cypress:

```bash
npx cypress open
```

Select "Component Testing" from the UI, and "UI5 Web Components" should appear in the list of available frameworks.

### 2. Configure Cypress (If Not Automatically Configured)
If Cypress does not automatically detect the framework or it was not configured previously, update your cypress.config.{ts,js} file to include @ui5/cypress-ct-ui5-webc and set vite as the bundler. 

```ts
import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: '@ui5/cypress-ct-ui5-webc',
      bundler: 'vite',
    },
  },
});
```

**Note: Additionally, if a Vite configuration file does not exist at the root level of your project, you may need to provide it explicitly by importing and using it here, or specify its path in the configuration.**

#### TypeScript Compatibility
If you encounter a type error when setting the `framework` property, typecast it as `any`:

```ts
framework: '@ui5/cypress-ct-ui5-webc' as any,
```

### 3. Add Cypress Custom Commands (If Not Automatically Configured)
If Cypress does not automatically configure this, add the following lines to your `component.ts` file:

```ts
import { mount } from '@ui5/cypress-ct-ui5-webc';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mount a template/component in Cypress sandbox
       * @param template The component template
       * @param options Custom rendering options
       */
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);
```

### 4. Configure TypeScript for TSX Support in Cypress
Since Cypress test files can use TSX, update your TypeScript configuration to enable proper support.

Create a new `cypress/tsconfig.json` file with the following configuration:

```json
{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "nodenext",
    "jsx": "react-jsx",
    "jsxImportSource": "@ui5/webcomponents-base",
    "types": [
      "cypress"
    ]
  },
  "references": [
    {
      "path": "../"
    }
  ]
}
```

### 5. Update Root TypeScript Configuration
Since references are used to make components available in Cypress tests, update the root `tsconfig.json` file by adding the following settings:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "dist/.tsbuildinfo",
    "rootDir": "src",
    "composite": true
  }
}
```

This ensures TypeScript correctly resolves dependencies when running Cypress tests.
