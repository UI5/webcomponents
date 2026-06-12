# UI5 Web Components & Angular

In this tutorial, you will learn how to use `UI5 Web Components` in an Angular application. In the second part, we will introduce `UI5 Web Components for Angular` - wrapper library for UI5 Web Components, improving their integration with Angular.

**Note:** To get the best development experience, we recommend using the [UI5 Web Components for Angular](https://sap.github.io/fundamental-ngx/) wrappers, distributed as `@fundamental-ngx/ui5-webcomponents`. The library removes the need for `CUSTOM_ELEMENTS_SCHEMA` and `NO_ERRORS_SCHEMA` schemas, and supports all Angular-specific features (typed inputs, two-way bindings, template-driven and reactive forms) out-of-the-box.

## UI5 Web Components

### Step 1. Install Angular CLI.

```bash
npm install -g @angular/cli
```

### Step 2. Create a new Angular application.

Use the standard path to setup a new Angular app.

```bash
ng new ui5-web-components-application
cd ui5-web-components-application
```

### Step 3. Install UI5 Web Components.

```bash
npm install @ui5/webcomponents
```

### Step 4. Allow Custom Elements in Angular.

Before using UI5 Web Components, you have to allow the use of custom elements via the `CUSTOM_ELEMENTS_SCHEMA`. This allows an NgModule to contain Non-Angular elements named with dash.

-  Import `CUSTOM_ELEMENTS_SCHEMA` in `app.module.ts`:

```js
import { ..., CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```

- Add `CUSTOM_ELEMENTS_SCHEMA` to the schemas array:

```js
imports: [
    ...
],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
```

### Step 5. Import UI5 Web Components.

Import the components you are going to use.

Let's import the Button in `app.component.ts`:

```js
import { Component } from '@angular/core';

import '@ui5/webcomponents/dist/Button.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
}
```

### Step 6. Use UI5 Web Components.

Use the imported components in your application by their tag names - as any other HTML element.

Let's add the button into the `app.component.html` template:

```html
<ui5-button>Hello world!</ui5-button>
```

### Step 7. Launch the application.

```bash
ng serve -o
```

After the development server starts, the UI5 Web Components Button will be rendered in the test page. Now that you've seen how easy it is to use the UI5 Web Components, you can continue with adding more components in the same manner.


## UI5 Web Components For Angular

`UI5 Web Components for Angular` is a wrapper library for UI5 Web Components, distributed as the [`@fundamental-ngx/ui5-webcomponents`](https://www.npmjs.com/package/@fundamental-ngx/ui5-webcomponents) package and maintained as part of [Fundamental NGX](https://sap.github.io/fundamental-ngx/). For every UI5 Web Component, there is a corresponding Angular wrapper component available.

**For Example:**

- The native Button web component
```js
import '@ui5/webcomponents/dist/Button.js';
```

- The Angular Button wrapper component
```ts
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
```

The wrappers are standalone components and support all Angular-specific features out-of-the-box - typed inputs/outputs, two-way data binding with `NgModel`, and template-driven and reactive forms.

### Angular Form with `NgModel`

The following section demonstrates how to build a template-driven Angular form (following the official [Angular documentation](https://angular.io/guide/forms)) with UI5 Web Components For Angular. It illustrates the usage of two-way data binding to update the data model in the component as changes are made in the template and vice versa.

### Step 1. Setup Angular project

```bash
npm install -g @angular/cli
ng new ui5-web-components-ngx-application
cd ui5-web-components-ngx-application
```

### Step 2. Install UI5 Web Components for Angular.

```bash
npm install @fundamental-ngx/ui5-webcomponents
```

### Step 3. Build Angular form.

To build an Angular Form, we will include the required infrastructure such as `FormsModule`, track input validity and status using `ngModel`, and make use of some form components from `@fundamental-ngx/ui5-webcomponents`.

The wrappers are standalone components, so they can be imported directly into the component that uses them - no `NgModule` required.

```ts
// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

// UI5 Web Components For Angular
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

@Component({
  selector: 'app-root',
  imports: [FormsModule, JsonPipe, Label, Input, Button],
  template: `<h1>Form Works!</h1>

  <form #heroForm="ngForm">
    <div>
      <ui5-label for="inp1">First Name:</ui5-label>
      <ui5-input id="inp1" [(ngModel)]="model.firstName" name="firstName" [required]="true"></ui5-input>
    </div>

    <div>
      <ui5-label for="inp2">Last Name:</ui5-label>
      <ui5-input id="inp2" [(ngModel)]="model.lastName" name="lastName" [required]="true"></ui5-input>
    </div>

    <ui5-button [submits]="true">Submit</ui5-button>

    Form Value: {{heroForm.value | json}}
    Form Status: {{heroForm.status}}
  </form>`,
})
export class AppComponent {
  model = {
    firstName: "",
    lastName: ""
  };
}
```

> **Tip:** If you prefer `NgModule`-based applications, the same standalone components can be added to an `NgModule`'s `imports` array - no extra adapter modules are needed.

### Step 4. Launch the application.

```bash
ng serve -o
```

After the development server starts, a simple form will be rendered in the test page.

Initially, the model is empty and the form is invalid:

```js
// Form Value: { "firstName": "", "lastName": "" }
// Form Status: "INVALID"
```

Start typing in the input fields and you will notice how the form model and form status are updated.

Good job, the Form works!

## Summary

Angular provides good support for web components and `UI5 Web Components` work perfectly in the majority of use-cases. However, for an enhanced development experience and better support for both template-driven and reactive forms, the `UI5 Web Components for Angular` (`@fundamental-ngx/ui5-webcomponents`) wrappers are the recommended choice.