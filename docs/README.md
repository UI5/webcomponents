# Introduction

The UI5 Web Components project offers a rich set of enterprise-grade, reusable UI elements built on top of the [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) standards.
With UI5 Web Components, developers can leverage a powerful, flexible, and future-proof toolkit to create anything from **static web sites** to **complex web applications**.


## Key Features of UI5 Web Components

- Enterprise-Grade: A comprehensive collection of reusable UI elements that adhere to enterprise standards - accessibility, themeability, i18n and more.

- Framework Agnostic: Fully compatible with any current or future web development frameworks such as React, Angular, and Vue, allowing seamless integration into any tech stack.

- Elegant: Being custom HTML elements, they hide implementation complexity behind a single HTML tag, making them easily usable with the standard DOM APIs.

- Consistent User Experience: Implementing the [SAP Fiori design](https://experience.sap.com/fiori-design/) and adhering to the [SAP Fiori Design Guidelines](https://experience.sap.com/fiori-design-web/) ensures a consistent and intuitive user experience across all applications.

- Open Source: UI5 Web Components is an open-source project available to the general public, inviting developers from all backgrounds to contribute and benefit.

- SAP Backing: Developed and maintained by [SAP](https://sap.com) as part of the [UI5](https://openui5.org/) product family, guaranteeing ongoing support and integration with SAP's ecosystem.


## Ecosystem

UI5 Web Components are complemented by a range of related projects that enhance the development experience even further. These projects build on top of the core UI5 Web Components, providing additional functionalities and integrations tailored to specific frameworks and use cases.

### UI5 Web Components for React

[UI5 Web Components for React](https://github.com/UI5/webcomponents-react) is a wrapper implementation around UI5 Web Components which makes using them in React even more comfortable. The current version of React (`react 18`) has some shortcomings when it comes to handling Custom Elements, namely the binding of `boolean` attributes as well as adding event listeners to custom event names like `selection-change`. With the help of UI5 Web Components for React, you can use the UI5 Web Components in React as if they were native React components. In addition to that, this library is also offering some complex layout components built on top of UI5 Web Components as well as Charting Components.

**Note:** [React 19](https://react.dev/blog/2024/04/25/react-19) promises to fill all gaps in the web coponents support - the binding of `boolean` attributes and subscribing to custom events.

### UI5 Web Components for Angular

[UI5 Web Components for Angular](https://github.com/SAP/ui5-webcomponents-ngx) is a wrapper implementation around UI5 Web Components which to make it work with Angular without needing to use the `CUSTOM_ELEMENTS_SCHEMA` or `NO_ERRORS_SCHEMA` schemas.
Moreover, all Angular-specific features, such as two-way data binding and Angular Form support, work out of the box.


**Continue reading to start using UI5 Web Components right away!**
