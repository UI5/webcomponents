# Styling

The article describes general patterns to style the UI5 Web Components.

One of the core principles of Web Components is the encapsulation. The HTML and styles are encapsulated in the Shadow DOM. This avoids clashes with any CSS brought by the rest of the application, but also makes customization harder. However, there are quite some options to apply custom styling.


## Styles on Tag Level

We designed some components such as Title, Label, Tag, Button, Input, and a few more in such a way that it is possible to set styles/classes on the custom elements that will take effect.

<b>For example:</b>
```css
  ui5-input {
    width: 150px;
    color: yellow;
    background: purple;
  }
```
You can try this yourself using the Input [sample](https://ui5.github.io/webcomponents/components/Input/#custom-styling/). 

Unfortunately, this can't be done for all components because it depends on the complexity of the DOM structure.

**Note:** It’s strongly recommended to apply styles directly at the tag level for basic sizing properties (e.g., margin, padding, width, height) to avoid design inconsistencies across the page. For other style changes, consider using the **UI Theme Designer** to ensure consistency. For details, see the [UI Theme Designer](./12-theming.md) article.

## Usage of CSS Shadow Parts

For more complex components, the styling on the tag level is not possible, therefore we introduced shadow parts on specific elements in the components’ Shadow DOM that the user can restyle, using [standard CSS syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) for shadow parts.

<b>For example:</b> You can change the appearance of the CardHeader status with the CSS shadow parts syntax:

```html
<ui5-card>
	<ui5-card-header
		title-text="Quick Links"
		status="4 of 10"
		slot="header">
	</ui5-card-header>
</ui5-card>
```

```css
ui5-card-header::part(status) {
  color: red;
}
```

<b>Note:</b> All available shadow parts are described in the API reference as part of the "Overview" section of each component.

## Changing CSS Variables

The UI5 WebComponents leverage CSS variables, so if you inspect the elements inside the Shadow DOM, you will probably find which variable you need to change. Check the list of all [Global CSS Variables](https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css) that we use in the component. Altering them will change the component appearance.

<b>For example:</b> You can change the button text color by overriding the `--sapButton_TextColor` CSS variable as follows.

```html
<ui5-button>Press</ui5-button>
```

```css
ui5-button {
  --sapButton_TextColor: purple;
}
```

**Note:** Whenever possible, override CSS variables through the **UI Theme Designer**. This ensures consistent updates across all components where the variable is used, helping maintain a cohesive design. For details, see the [UI Theme Designer](./12-theming.md) article.

## Custom Theme Schema

To change the entire colour scheme, users can create a custom theme.
For more information, see the next article.
