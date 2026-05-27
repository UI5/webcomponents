# UI5 Web Components & React

In this tutorial, you will learn how to add UI5 Web Components to your application. You can add UI5 Web Components both to new React applications and to already existing ones.

**Important:** To get the best development experience, we recommend using the [UI5 Web Components for React](https://github.com/UI5/webcomponents-react) and follow the [UI5 Web Components for React Тutorial](https://developers.sap.com/mission.react-spa.html). UI5 Web Components for React library is a React implementation of UI5 Web Components which overcomes several limitations of React in handling web components in general, explained in the "Additional Info" section below.

Here are the steps to use pure UI5 Web Components in React:

## Step 1. Create a new application. For example, with `create-react-app`.

```bash
npx create-react-app ui5-web-components-application
cd ui5-web-components-application
```

## Step 2. Add UI5 Web Components.

```bash
npm install @ui5/webcomponents --save
```

## Step 3. Import the components that you are going to use.

```js
import "@ui5/webcomponents/dist/Button.js";
```

## Step 4. Use the imported elements in your application.

```html
<ui5-button>Hello world!</ui5-button>
```

## Step 5. Launch the application.

```bash
yarn start
```

## Additional Info

When developing with React, there are two slight React limitations you should know about. These are not related to UI5 Web Components per se, but with using custom elements in React in general.

### Event Binding

In order to use the events provided by UI5 Web Components, currently you need to get a `ref` to the component because React doesn't support custom events. Here is an example of what you need to do in order to use the events provided by UI5 Web Components:

```js
class Home extends Component {

    constructor (props) {
        super(props);
        this.switch = React.createRef();
    }

    componentDidMount() {
        this.switch.addEventListener('change', event => {
            console.log('switch is toggled');
        })
    }

    render(){
        return(
            <ui5-switch ref={this.switch}></ui5-switch>
        );
    }
}
```

### Boolean Properties Binding

For boolean properties like ```collapsed```  in ```ui5-panel```, instead of setting true or false, you have to take care of the presence of the property. Here is an example:

```html
<ui5-panel header-text="Achievements" collapsed={!this.state.achievements.length || undefined}>
    <!-- Content of ui5-panel -->
</ui5-panel>
```

### Using UI5 Web Components in TSX

When using UI5 Web Components like `<ui5-input>` in a `.tsx` file, you may encounter the following TypeScript error:

```ts
Property 'ui5-input' does not exist on type 'JSX.IntrinsicElements'. ts(2339)
```

This happens because **TypeScript’s `JSX.IntrinsicElements` only includes standard HTML tags by default** (`<div>`, `<span>`, etc.).
Custom elements, such as those from UI5, are not recognized unless you explicitly declare them.

To make TypeScript aware of your UI5 Web Components, you need to **extend the `JSX.IntrinsicElements` interface** with the custom tags you plan to use.

```ts
declare namespace JSX {
  interface IntrinsicElements {
    'ui5-input': any; // Replace `any` with a proper type
    // Add more UI5 web components here...
  }
}
```

Please refer to the [UI5 Web Components React sample](https://github.com/SAP-samples/ui5-webcomponents-sample-react/) for a complete example of using web components in React.


### UI5 Web Components for React

As mentioned above, for a better development experience (and to elegantly work around these 2 React limitations), check out UI5 Web Components for React, [UI5 Web Components for React](https://github.com/UI5/webcomponents-react) and [this tutorial](https://developers.sap.com/mission.react-spa.html).
