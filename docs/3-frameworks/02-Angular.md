# UI5 Web Components & Angular

In this tutorial, you will learn how to use `UI5 Web Components` in an Angular application. In the second part, we will introduce `UI5 Web Components for Angular` - wrapper library for UI5 Web Components, improving their integration with Angular.

**Note:** To get the best development experience, we recommend using the [UI5 Web Components for Angular](https://sap.github.io/fundamental-ngx/). The library removes the need for `CUSTOM_ELEMENTS_SCHEMA` and `NO_ERRORS_SCHEMA` schemas, and supports all Angular-specific features out-of-the-box.

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

UI5 Web Components for Angular is a wrapper library for UI5 Web Components. This means that for every UI5 Web Component, there is a corresponding Angular wrapper component available.

**For Example:**

- The native Button web component 
```js
import '@ui5/webcomponents/dist/Button.js';
```

- The "ngx" Button wrapper component
```js
import { ButtonComponent } from '@ui5/webcomponents-ngx/main/button';
```

These wrappers supports all Angular-specific features out-of-the-box, f.e. two-way data binding with `NgModel`, as they are native to Angular.

### Angular Form with `NgModel`

The following section demonstrates how to build template-driven Angular form (following the oficial [Angular documentation](https://angular.io/guide/forms)) with UI5 Web Components For Angular. It illustrates the usage of two-way data binding to update the data model in the component as changes are made in the template and vice versa.

### Step 1. Setup Angular project

```bash
npm install -g @angular/cli
ng new ui5-web-components-ngx-application
cd ui5-web-components-ngx-application
```

### Step 2. Install UI5 Web Components for Angular.


```bash
npm install @ui5/webcomponents-ngx
```

### Step 3. Build Angular form.

To build an Angular Form, we will include the required infrastructure such as the `FormsModule`, track input validity and status using `ngModel` and make use of some form components from `@ui5/webcomponents-ngx`.


- Import `FormsModule` in `app.module.ts` and add it to the imports array.

```js
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

- Import `Label`, `Input` and `Button` components from `@ui5/webcomponents-ngx` in `app.module.ts` and add them to the imports array.

```js
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// UI5 Web Components For Angular
import { LabelComponent } from '@ui5/webcomponents-ngx/main/label';
import { ButtonComponent } from '@ui5/webcomponents-ngx/main/button';
import { InputComponent } from '@ui5/webcomponents-ngx/main/input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LabelComponent,
    InputComponent,
    ButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### Step 4. Define a Data Model.

- Add the following object, that will serve as a data model, to the `AppComponent`:

```js
// app.component.ts
import { Component } from '@angular/core';

export class AppComponent {
  model = {
    firstName: "",
    lastName: ""
  };
}
```

### Step 5. Create the Form UI.

- Add the following inline template to the `AppComponent`.
- Bind form components to data properties using the `ngModel` directive and two-way data-binding syntax.
- Name form controls (e.g. add `name` attribute) to make them accessible to `ngModel`.

```js
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>Form Works!</h1>

  <form #heroForm="ngForm">
    <div>
      <ui5-label for="inp1">First Name:</ui5-label>
      <ui5-input id="inp1" [(ngModel)]="model.firstName" name="firstName" [required]="true"></ui5-input>
    </div>

    <div>
      <ui5-label for="inp2">Last Name:</ui5-label>
      <input id="inp2" type="text" [(ngModel)]="model.lastName" name="lastName" required/>
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

### Step 5. Launch the application.

```bash
ng serve -o
```

After the development server starts, a simple form will be rendered in the test page.

Initially, the model is empty and the form is invalid:

```js
// Form Value: { "firstName": "", "lastName": "" }
// Form Status: "Invalid"
```

Start typing in the input fields and you will notice how the form model and form status are updated.

Good job, the Form works!

## Summary

Angular provides good support of web components and `UI5 Web Components` are working perfectly in the majority of use-cases. However, for an enhanced development experience and better support for both template-driven and Reactive forms,  the `UI5 Web Components for Angular` is the recommended choice.