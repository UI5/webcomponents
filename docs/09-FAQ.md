---
sidebar_label: FAQ
---

# Frequently Asked Questions

**Q: How can I play with UI5 Web Components easily?**

**A:** Use this [Stackblitz](https://stackblitz.com/edit/js-vsrpnb?file=index.js,index.html).


**Q: Where is the documentation?**

**A:** There are several resources:
- [Web Components APIs](https://ui5.github.io/webcomponents/play/)
- [How to get started?](https://blogs.sap.com/2019/04/01/the-fastest-way-to-get-started-with-ui5-web-components/)

**Q: Is there a CDN to load UI5 Web Components from?**

**A:** No. The best practice is to build your own bundle. See [this article](https://blogs.sap.com/2021/05/28/getting-started-with-ui5-web-components-in-2021/) for details.


**Q: Are UI5 Web Components APIs stable?**

**A:** Mostly yes since the project is in Release Candidate state, but minor changes may still be expected until the official release.


**Q: Can I create my own UI5 Web Components?**

**A:** Yes, for more information see [Creating a Custom UI5 Web Components Package](4-development/01-package.md)


**Q: How can I customize UI5 Web Components' styles?**

**A:** Read the [Styling UI5 Web Components](2-advanced/11-styles.md) article.


**Q: How big is the runtime?**

**A:** Currently on main, a simple working Web Component (```ui5-label```) and its dependencies equals to around 22K gzipped. 
Two simple web components (```ui5-label``` and ```ui5-icon```) and their dependencies equal to around 25K gzipped.

**Note:** The quoted numbers include only a ```<ui5-label>``` (respectively ```ui5-label``` and ```ui5-icon```) working on Chrome/FF/Safari with the default settings (theme/language).
Additional features, settings and old browser support will increase bundle size accordingly.


**Q: What is the difference between UI5 Web Components and OpenUI5?**

**A:** See the project's [readme.md](https://github.com/UI5/webcomponents) for more on this.


**Q: Can I use UI5 Web Components in an OpenUI5 application?**

**A:** This is not necessary as OpenUI5 already provides equivalents in the form of UI5 Controls. 


**Q: How can I hide not yet upgraded Web Components so that users don't see them until styled?**

**A:** You can place a CSS rule such as:

```CSS
*:not(:defined) {
	display: none;
}
``` 

or: 

```CSS
*:not(:defined) {
	visibility: hidden;
}
``` 

in your application, depending on your preference.

The selector `*:not(:defined)` will match all web components that haven't been defined yet. 

Alternatively, you could only apply this rule for selected web components:

```CSS
ui5-button:not(:defined), ui5-label:not(:defined) {
	display: none;
}
``` 

Please note that the `:defined` CSS pseudo-selector is not supported by the Edge and Internet Explorer 11 browsers.

**Q: How can opt out of forced colors mode. How to avoid Web Components from being adjusted by the user agent forced colors mode?**

**A:** You can use the following CSS rule, based on the `forced-color-adjust` CSS prop:

```CSS
html {
    forced-color-adjust: none;
}
``` 

or to be more precise, you can apply the CSS rule when `forced-colors` mode is `active`:

```CSS
@media (forced-colors: active) {
  .html {
    forced-color-adjust: none;
  }
}
``` 

By setting `forced-color-adjust` to `none`, the element's colors will not be automatically adjusted by the user agent in forced colors mode.