import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

Enable multi-selection in your table by adding the `<ui5-table-selection-multi>` feature.

The selection features of the table is key-based, therefore each row requires a `row-key` attribute to be uniquely identified.

<Editor html={html} js={js} react={react} />
