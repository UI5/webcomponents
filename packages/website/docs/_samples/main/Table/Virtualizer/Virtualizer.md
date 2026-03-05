import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

Enhance your table with virtualization capabilities by incorporating the **Virtualizer** feature.

For effective table virtualization, the `range-change` event with its `first` and `last` parameters determines which rows are currently visible and need to be rendered. To ensure proper virtualization, you must set the following attributes:

- `row-count` for the `Table`: This attribute specifies the total number of rows in the table. It helps the virtualizer determine the number of rows to manage.

- `row-height` for the `Table`: This attribute defines the height of each row in the table. Consistent row height allows the virtualizer to calculate which rows are currently visible and need to be rendered.

- `position` for the `TableRow`: This attribute determines the position of each row within the table. Proper positioning ensures that rows are rendered in the correct location when the user scrolls.

By setting these attributes and handling the `range-change` event properly, the `TableVirtualizer` can efficiently manage and render only the rows that are visible when the user scrolls.

<Editor html={html} js={js} react={react} />
