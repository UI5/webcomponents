import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

By setting the `mode` to `Button`, a dedicated growing button will be rendered.
You can customize the text via `text` and `subText`.

<Editor html={html} js={js} react={react} />
