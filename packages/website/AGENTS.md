# AGENTS.md - Website Samples

Component samples for the documentation website follow this structure:

```
packages/website/docs/_samples/
├── main/           # For @ui5/webcomponents
│   └── Button/
│       └── Basic/
│           ├── sample.html   # HTML with component usage
│           ├── main.js       # JS imports
│           ├── sample.tsx    # React version of the sample
│           ├── main.css      # Optional CSS
│           └── Basic.md      # Markdown wrapper
└── fiori/          # For @ui5/webcomponents-fiori
    └── ShellBar/
        └── Basic/
            └── ...
```

## Sample Files

**`sample.html`** - Component usage wrapped in HTML boilerplate:
```html
<!-- playground-fold -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample</title>
</head>
<body style="background-color: var(--sapBackgroundColor)">
<!-- playground-fold-end -->

    <ui5-button>Press</ui5-button>
    <ui5-button icon="sap-icon://edit">Edit</ui5-button>

<!-- playground-fold -->
    <script type="module" src="main.js"></script>
</body>
</html>
<!-- playground-fold-end -->
```

**`main.js`** - Required imports for the sample:
```javascript
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";
```

**`sample.tsx`** - The same sample in React, shown in the playground's React tab:
```tsx
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";

const Button = createReactComponent(ButtonClass);

function App() {
  return (
    <>
      <Button>Press</Button>
      <Button icon="edit">Edit</Button>
    </>
  );
}

export default App;
```

**`<SampleName>.md`** - Wrapper that loads the sample into the Editor:
```markdown
import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import react from '!!raw-loader!./sample.tsx';

<Editor html={html} js={js} react={react} />
```

If the sample has CSS, include it:
```markdown
import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import css from '!!raw-loader!./main.css';
import react from '!!raw-loader!./sample.tsx';

<Editor html={html} js={js} css={css} react={react} />
```

## Playground Fold Comments

Use `<!-- playground-fold -->` and `<!-- playground-fold-end -->` to hide boilerplate code in the interactive playground. Only the component usage (between fold comments) is shown to users.
