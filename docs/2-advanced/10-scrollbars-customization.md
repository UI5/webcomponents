---
title: Styling Scrollbars
---

# Scrollbars Customization

By default, some of the components provide additional CSS styles, which are applied to their scrollbars in order to achieve their target design.

## Setting Default Scrollbar Styles to Components

To use native scrollbar styles, you have to add the CSS style class `.ui5-content-native-scrollbars` to the HTML element of your application.

**Note: Because of some browser restrictions, this setting takes effect if it is applied before the initial rendering of the components, which use it.**

Example:
```html
<html class="ui5-content-native-scrollbars">
    ...
</html>
```
