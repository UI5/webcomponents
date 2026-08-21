import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

If your table is located inside of a scrollable container, you have other sticky content and your table is in `Scroll` mode,
provide a height for the table for the sticky header to work as expected.

<Editor html={html} js={js} react={react} />
