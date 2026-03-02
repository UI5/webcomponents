/**
 * SandpackReactPreview - Interactive React code editor and preview using Sandpack.
 */
import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./SandpackReactPreview.module.css";

interface SandpackReactPreviewProps {
  /** The React sample code */
  code: string;
}

// The createReactComponent factory code to be included in Sandpack
const createReactComponentCode = `import React, { useRef, useEffect, forwardRef } from "react";

export function createReactComponent(ComponentClass) {
  const tagName = ComponentClass.getMetadata().getTag();

  const Component = forwardRef((props, ref) => {
    const { children, ...restProps } = props;
    const elementRef = useRef(null);

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(elementRef.current);
        } else {
          ref.current = elementRef.current;
        }
      }
    }, [ref]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const eventCleanups = [];

      Object.keys(restProps).forEach((propName) => {
        if (propName.startsWith("on") && typeof restProps[propName] === "function") {
          const eventName = propName
            .slice(2)
            .replace(/([A-Z])/g, (match, letter, index) =>
              index === 0 ? letter.toLowerCase() : \`-\${letter.toLowerCase()}\`
            );

          const handler = restProps[propName];
          element.addEventListener(eventName, handler);
          eventCleanups.push(() => element.removeEventListener(eventName, handler));
        }
      });

      return () => {
        eventCleanups.forEach((cleanup) => cleanup());
      };
    }, [restProps]);

    const domProps = {};
    Object.keys(restProps).forEach((propName) => {
      if (!propName.startsWith("on") || typeof restProps[propName] !== "function") {
        const attrName = propName.replace(/([A-Z])/g, "-$1").toLowerCase();
        domProps[attrName] = restProps[propName];
      }
    });

    return React.createElement(tagName, { ref: elementRef, ...domProps }, children);
  });

  Component.displayName = tagName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return Component;
}
`;

export default function SandpackReactPreview({ code }: SandpackReactPreviewProps) {
  const { colorMode } = useColorMode();
  const { siteConfig } = useDocusaurusContext();
  const ui5Version = siteConfig.customFields.ui5Version as string;

  // Transform import to use local createReactComponent file
  const appCode = code.trim().replace(
    /import\s*{\s*createReactComponent\s*}\s*from\s*["']@ui5\/webcomponents-base["'];?/,
    'import { createReactComponent } from "./createReactComponent";'
  );

  const files = {
    "/App.tsx": appCode,
    "/createReactComponent.ts": createReactComponentCode,
    "/index.tsx": `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
`,
    "/index.html": `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React Sample</title>
  <style>
    body {
      font-family: "72", Arial, sans-serif;
      padding: 1rem;
      margin: 0;
    }
  </style>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`,
    "/tsconfig.json": `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
`,
  };

  return (
    <div className={styles.container}>
      <SandpackProvider
        template="react-ts"
        theme={colorMode === "dark" ? "dark" : "light"}
        files={files}
        customSetup={{
          dependencies: {
            "@ui5/webcomponents": ui5Version || "latest",
            "@ui5/webcomponents-base": ui5Version || "latest",
            "@ui5/webcomponents-theming": ui5Version || "latest",
            "@ui5/webcomponents-localization": ui5Version || "latest",
            "@ui5/webcomponents-icons": ui5Version || "latest",
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
          },
          entry: "/index.tsx",
        }}
        options={{
          activeFile: "/App.tsx",
          visibleFiles: ["/App.tsx"],
          recompileMode: "delayed",
          recompileDelay: 500,
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            showLineNumbers
            showTabs={false}
            showInlineErrors
            style={{ height: "300px" }}
          />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={true}
            style={{ height: "300px" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
