import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

By setting the type to `Scroll`, the table will fire the `load-more` event, once you've reached the end of the table.

If the table is not scrollable, a growing button is rendered instead. The button will disappear once the table is
scrollable.

<Editor html={html} js={js} react={react} />
