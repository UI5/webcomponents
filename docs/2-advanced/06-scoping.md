---
title: Scoping
---

# Micro-Frontends and Custom Elements Scoping

## What does `scoping` mean?

The `scoping` feature lets you add an arbitrary suffix to the names of all UI5 Web Components' custom elements:

Example:

```js
// scoping-config.js
import { setCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
setCustomElementsScopingSuffix("demo");
```

** NOTE: ** Setting the scoping suffix should be done before importing any components, as they use the suffix at the top-level of the module - meaning when a component is imported, the suffix has to be known. For this to work, calling the method should be done in a separate module (`scoping-config.js` in the example above) and this module should be imported before any components are imported.

Then all names can only be used with the supplied suffix:

```html
<ui5-card-demo>
	<ui5-title-demo>This card is scoped</ui5-title-demo>
	<ui5-button-demo>Click me</ui5-button-demo>
</ui5-card-demo>
```

Trying to use them with the standard names will not work (the custom elements won't be upgraded), so for example the following:

```html
<ui5-button>Click me</ui5-button>
```

will not have any effect.

## When do I need to use the `scoping` feature?

The `scoping` feature is completely optional. It is not needed for application development, but it is strongly recommended when building **libraries** and **micro-frontends**.
It ensures that the custom elements that your code uses have not already been reserved by another library or an older version of UI5 Web Components.

If, for example, your code may be loaded on demand by unknown applications as a third-party service, there is always the risk that the app
or another third-party library, loaded by the app, may use an older version of UI5 Web Components which means that all custom elements will be
upgraded with this version, while your code may rely on newer features.

Imagine the following integration scenario of an app, using several third-party libraries, loaded on demand (and not bundled with the app):

 ```html
 <body>

 	<!-- Application code, using UI5 Web Components version 1.0.1 -->
 	<div id="application-container">
 		<ui5-title>This is the new app with many third-party extensions!</ui5-title>
 		<ui5-card>
 			<ui5-button>Hello</ui5-button>
 			<ui5-input></ui5-input>
 		</ui5-card>
 	</div>

 	<!-- Code inserted by "common help" library, using UI5 Web Components version 1.2.0 -->
 	<div id="common-help-container">
 		<ui5-button-chlp new-button-prop="1">Help Menu</ui5-button-chlp>
 		<ui5-input-chlp value="Type your question"></ui5-input-chlp>
 	</div>

 	<!-- Code inserted by "global footer" library, using UI5 Web Components version 1.3.0 -->
 	<footer id="global-footer-container">
 		<global-footer-main>
 			<ui5-button-glob-foot new-button-prop="2" even-newer-button-prop="3">Profile</ui5-button-glob-foot>
 			<ui5-link-glob-foot>Contacts</ui5-link-glob-foot>
 		</global-footer-main>
 	</footer>

 </body>
 ```

In the example above:
- The app itself is using an old version (`1.0.1`) of UI5 Web Components (which has already upgraded the `ui5-card`, `ui5-button` and `ui5-input` tags).
- The imaginary "common help" library, based on a newer version (`1.2.0`), uses the scoping suffix `chlp`.
- The imaginary "global footer" library, based on an even newer version (`1.3.0`), uses the scoping suffix `glob-foot`.

This allows the libraries to use new `ui5-button` properties such as `newButtonProp` and `evenNewerButtonProp` that are not found in older versions.

## How can I fine-tune the scoping feature?

```js
import { setCustomElementsScopingSuffix, setCustomElementsScopingRules } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
setCustomElementsScopingSuffix("demo");
setCustomElementsScopingRules({include: [/^ui5-/], exclude: [/^ui5-my-/, /-test-/]});
```

By default, all tags registered by the current runtime are scoped when you call `setCustomElementsScopingSuffix`.
You can use `setCustomElementsScopingRules` to control which tags are scoped and which are not. In the example above, only tags starting with `ui5-` are scoped, and among those, tags starting with `ui5-my-` and tags having the word `-test-` in their name are excluded.

Setting scoping rules is handy if, for example, your library uses both standard and custom UI5 Web Components and you don't want
to scope some of them (as no disambiguation will be necessary for them).
