import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

By default, the `ui5-table-row-action-navigation` component displays a dedicated navigation icon to indicate that a row is navigable. The icon appears on the right side of the row and is the last item to move into the overflow menu. Therefore, if you want to show additional row actions along with the `ui5-table-row-action-navigation`, the `row-action-count` property of the `ui5-table` must be set to at least `2`. This ensures that the `ui5-table-row-action-navigation` component never appears in the overflow menu.

If the `interactive` property is set to `true`, the navigation icon appears as a button, and clicking it triggers the table’s `row-action-click` event.

The `invisible` property allows you to hide specific navigation actions. This property is useful for ensuring a consistent layout by displaying the navigation column.

<Editor html={html} js={js} react={react} />
