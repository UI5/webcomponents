import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

The `ui5-table-row-action` component lets you incorporate interactive elements into table rows, enabling users to take actions directly related to each row.

The `row-action-count` property of the `ui5-table` component determines the width of the row action column. A maximum value of `3` is recommended, as exceeding this limit may take up too much space on smaller screens. If the number of row actions exceeds the `row-action-count`, an overflow button will appear, providing access to the additional actions.

The `invisible` property of row actions allows you to hide specific row actions while preserving their space. This can be useful for consistent alignment of row actions across several rows.

<Editor html={html} js={js} react={react} />
