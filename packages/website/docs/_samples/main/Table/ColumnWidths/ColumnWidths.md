import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

You are able to set the width of the columns by using the `width`, `minWidth` and `maxWidth` property.

By default, columns will take up the available space if no `width` is defined. The `ui5-table` additionally ensures that
the columns cannot become too small.

<Editor html={html} js={js} />
