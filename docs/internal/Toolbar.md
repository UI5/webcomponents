# Creating a web component toolbar item to be used inside Toolbar

*This section explains how to build toolbar items in order to be compatible with UI5 Toolbar.*
*It will guide you through the process of how we created `ui5-toolbar-button`, to be
compatible with `ui5-toolbar`. Currently developed items can be used without those efforts. They are:*
1. ui5-toolbar-button
2. ui5-toolbar-select
3. ui5-toolbar-separator
4. ui5-toolbar-spacer

## Toolbar Items
The `ui5-toolbar` is a composite web component, that slots different UI5 components, designing them as toolbar items. They can contain
properties, slots and events, and they can match the API of already existing component.
In order to be suitable for usage inside `ui5-toolbar`, each component should adhere to following guidelines:


1. The component needs to implement a class with component name of the following type:

```javascript
ToolbarButton.ts
```

2. The new component needs to implement template file with name of the following type:

```javascript
ToolbarButtonTemplate.tsx
```

3. It needs to implement **customElement** decorator, which is good to contain custom tag name, template and renderer:

```javascript
@customElement({
    tag: "ui5-toolbar-button",
	template: ToolbarButtonTemplate,
	renderer: jsxRenderer,
})
```

4. The class should extend **ToolbarItem** base class, which should also be added as a dependency.

```javascript
class ToolbarButton extends ToolbarItem
```

5. In the templates there should be mapping of the properties that need to be used in the component inside Toolbar.

Inside ToolbarButton.ts:
 
```typescript
@property()
text?: string;
 
@property({ type: Boolean })
disabled = false;
```
 
Inside ToolbarButtonTemplate.tsx:
 
```tsx
import type ToolbarButton from "./ToolbarButton.js";
import Button from "./Button.js";

export default function ToolbarButtonTemplate(this: ToolbarButton) {
	return (
		<div>
			<Button
				 class="ui5-tb-item"
				 disabled={this.disabled}
				 data-ui5-external-action-item-id={this._id}
				 data-ui5-stable={this.stableDomRef}
			>
			  {this.text}
			</Button>
		</div>
	);
}
```

6. The new class needs to be added to the bundle file in the corresponding library.

Inside bundle.common.js:
```javascript
import ToolbarButton from "./dist/ToolbarButton.js";
```
7. Use your newly created component inside the ui5-toolbar like this:

```html
<ui5-toolbar>
  <ui5-toolbar-button text="Button 1" disabled></ui5-toolbar-button>
  <ui5-toolbar-button text="Button 2"></ui5-toolbar-button>
</ui5-toolbar>
```