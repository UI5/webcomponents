import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

Enhance your table with virtualization capabilities by incorporating the **Virtualizer** feature.

For effective table virtualization, the `range-change` event with its `first` (inclusive) and `last` (exclusive) parameters determines which rows need to be rendered. To ensure proper virtualization, you must set the following attributes:

- `row-count` for the `TableVirtualizer`: This attribute specifies the total number of rows in the table. It helps the virtualizer determine the number of rows to manage.

- `estimated-row-height` for the `TableVirtualizer` (optional): Rows can have different heights. The heights are measured when the rows are rendered, and rows that have not been rendered yet are estimated. A good estimate makes the scrollbar accurate from the start.

- `position` for the `TableRow`: This attribute determines the position of each row within the table. Proper positioning ensures that rows are rendered in the correct location when the user scrolls. The rows must be rendered in ascending order. Row elements can be reused for other positions.

Rows whose data is still loading can be rendered as placeholders by setting the `loading` property of the `TableRow`. Keep the cells of loading rows (their content can be empty). The row has the estimated row height, and its height does not affect the estimation.

By setting these attributes and handling the `range-change` event properly, the `TableVirtualizer` can efficiently manage and render only the rows that are visible when the user scrolls.

<Editor html={html} js={js} react={react} />
