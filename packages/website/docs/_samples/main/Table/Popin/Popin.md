import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

The Popin mode is a responsive design feature tailored to adapt column layouts in UI grids or tables, particularly for smaller screens or constrained container widths.

When screen space becomes limited, Popin mode seamlessly reorganizes columns. Those that cannot fit within the available width are intelligently relocated to the "popin area", an allocated space designed specifically for accommodating additional columns.

You can influence the order of columns appearing in the pop-in area by defining the importance of each column.

You can hide specific columns in the popin by using the `popinHidden` property on the `ui5-table-header-cell`. 
**Note:** Hiding columns in the popin leads to accessibility issues as information is lost on smaller screens.

<Editor html={html} js={js} react={react} />
