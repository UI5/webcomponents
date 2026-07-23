import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

import html2 from '!!raw-loader!./sample2.html';
import js2 from '!!raw-loader!./main2.js';
import react2 from '!!raw-loader!./sample2.tsx';

import html3 from '!!raw-loader!./sample3.html';
import js3 from '!!raw-loader!./main3.js';
import react3 from '!!raw-loader!./sample3.tsx';

#### Load on open, cancel and re-query on type

Items are loaded when the picker opens (arrow down) and re-queried from the "server" as you type. Every keystroke fires a new `load-items` event and the application aborts the previous request via its own `AbortController`, so an in-flight fetch is cancelled in favor of a fresh, server-side filtered one.

<Editor html={html} js={js} react={react} />

#### Load all on open, filter on the client

Items are fetched once, when the picker opens with no items or when user starts typing. The request is not aborted, so typing while it is in flight does not cancel it - the default filter narrows the loaded list on the client once the data arrives.

<Editor html={html2} js={js2} react={react2} />

#### Search as you type

There is no preloading - each character you type triggers a server-side search. Outdated requests are aborted via the application's `AbortController`, so only the latest query resolves into items.

<Editor html={html3} js={js3} react={react3} />
