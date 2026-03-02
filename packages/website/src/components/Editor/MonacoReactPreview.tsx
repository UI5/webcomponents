/**
 * MonacoReactPreview - Interactive React code editor with full TypeScript support using Monaco Editor.
 */
import React, { useRef, useState, useEffect, useCallback } from "react";
import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./MonacoReactPreview.module.css";

interface MonacoReactPreviewProps {
  code: string;
  editorVisible?: boolean;
  theme?: string;
  contentDensity?: string;
  textDirection?: string;
}

// Type definitions for TypeScript intellisense
const typeDefs = `
declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

type ReactNode = string | number | boolean | null | undefined | ReactElement | ReactNode[];
interface ReactElement<P = any> { type: any; props: P; key: string | null; }
type FC<P = {}> = (props: P & { children?: ReactNode }) => ReactElement | null;

/**
 * Button design types
 * - "Default": Standard button style
 * - "Emphasized": Primary action button (highlighted)
 * - "Positive": Success/accept action (green)
 * - "Negative": Error/reject action (red)
 * - "Transparent": Transparent background
 * - "Attention": Warning action (yellow)
 */
type ButtonDesign = "Default" | "Emphasized" | "Positive" | "Negative" | "Transparent" | "Attention";

/**
 * Button component props
 */
interface ButtonProps {
  /** The text content of the button */
  children?: ReactNode;
  /**
   * Defines the visual design of the button
   * @default "Default"
   */
  design?: ButtonDesign;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Icon to display before the text (e.g., "edit" or "sap-icon://edit") */
  icon?: string;
  /** Icon to display after the text */
  endIcon?: string;
  /** Whether to show loading indicator */
  loading?: boolean;
  /** Tooltip text shown on hover */
  tooltip?: string;
  /** Accessible name for screen readers */
  accessibleName?: string;
  /** Click event handler */
  onClick?: (event: CustomEvent) => void;
}

declare function createReactComponent<T>(ComponentClass: T): FC<ButtonProps>;

declare module "@ui5/webcomponents-base" {
  export { createReactComponent };
}

declare module "@ui5/webcomponents/dist/Button.js" {
  const ButtonClass: any;
  export default ButtonClass;
}

declare module "@ui5/webcomponents-icons/dist/*.js" {
  const icon: any;
  export default icon;
}

/** UI5 Button component wrapped for React */
declare const Button: FC<ButtonProps>;
`;

export default function MonacoReactPreview({
  code,
  editorVisible = false,
  theme = "sap_horizon",
  contentDensity = "Cozy",
  textDirection = "LTR"
}: MonacoReactPreviewProps) {
  const { colorMode } = useColorMode();
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = useBaseUrl("/");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [editorCode, setEditorCode] = useState(code.trim());

  // Generate a unique path based on code content to avoid Monaco model caching issues
  const editorPath = useRef(`file:///App-${Date.now()}.tsx`);

  // Reset editor content when the code prop changes (e.g., navigating to different sample)
  useEffect(() => {
    const newCode = code.trim();
    setEditorCode(newCode);
    // Update the path to force a new model
    editorPath.current = `file:///App-${Date.now()}.tsx`;
  }, [code]);

  // Calculate import map URLs (same logic as index.js)
  const getHostBaseUrl = useCallback(() => {
    let origin = siteConfig.url;
    if (process.env.NODE_ENV === "development") {
      origin = location.origin;
    }
    return new URL(baseUrl, origin).toString();
  }, [siteConfig.url, baseUrl]);

  const calcImports = useCallback(() => {
    const deployment = siteConfig.customFields?.ui5DeploymentType;
    const isNetlifyPreview = deployment === "netlify_preview";
    const isPreview = deployment === "preview";
    const isNightly = deployment === "nightly";
    const useLocalCDN = process.env.NODE_ENV === "development" || isNightly || isPreview || isNetlifyPreview;

    if (useLocalCDN) {
      const hostBase = getHostBaseUrl();
      return {
        "@ui5/webcomponents/": `${hostBase}local-cdn/main/`,
        "@ui5/webcomponents-ai/": `${hostBase}local-cdn/ai/`,
        "@ui5/webcomponents-fiori/": `${hostBase}local-cdn/fiori/`,
        "@ui5/webcomponents-compat/": `${hostBase}local-cdn/compat/`,
        "@ui5/webcomponents-base/jsx-runtime": `${hostBase}local-cdn/base/dist/jsx-runtime.js`,
        "@ui5/webcomponents-base/": `${hostBase}local-cdn/base/`,
        "@ui5/webcomponents-icons/": `${hostBase}local-cdn/icons/`,
        "@ui5/webcomponents-localization/": `${hostBase}local-cdn/localization/`,
        "@ui5/webcomponents-theming/": `${hostBase}local-cdn/theming/`,
        "lit-html": `${hostBase}local-cdn/lit-html/lit-html.js`,
        "lit-html/": `${hostBase}local-cdn/lit-html/`,
        "@zxing/library/": `${hostBase}local-cdn/zxing/`,
      };
    } else {
      const version = siteConfig.customFields?.ui5Version || "2";
      return {
        "@ui5/webcomponents/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents@${version}/`,
        "@ui5/webcomponents-ai/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-ai@${version}/`,
        "@ui5/webcomponents-fiori/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-fiori@${version}/`,
        "@ui5/webcomponents-compat/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-compat@${version}/`,
        "@ui5/webcomponents-base/jsx-runtime": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-base@${version}/dist/jsx-runtime.js`,
        "@ui5/webcomponents-base/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-base@${version}/`,
        "@ui5/webcomponents-icons/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-icons@${version}/`,
        "@ui5/webcomponents-localization/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-localization@${version}/`,
        "@ui5/webcomponents-theming/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-theming@${version}/`,
        "lit-html": `https://cdn.jsdelivr.net/npm/lit-html@2`,
        "lit-html/": `https://cdn.jsdelivr.net/npm/lit-html@2/`,
        "@zxing/library/": `https://cdn.jsdelivr.net/npm/@zxing/library@0/`,
      };
    }
  }, [siteConfig, getHostBaseUrl]);

  const handleEditorWillMount: BeforeMount = (monaco) => {
    // Configure TypeScript compiler options for JSX/TSX
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      allowNonTsExtensions: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      strict: false,
      skipLibCheck: true,
      noEmit: true,
      noImplicitAny: false,
    });

    // Add type definitions
    monaco.languages.typescript.typescriptDefaults.addExtraLib(typeDefs, "file:///global.d.ts");

    // Enable diagnostics (errors, warnings)
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    // Enable suggestions
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
  };

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setEditorCode(value);
    }
  }, []);

  const updatePreview = useCallback((sourceCode: string) => {
    if (!iframeRef.current) return;

    // Collect icon imports
    const iconImports: string[] = [];
    const iconRegex = /@ui5\/webcomponents-icons\/dist\/([\w-]+)\.js/g;
    let match;
    while ((match = iconRegex.exec(sourceCode)) !== null) {
      iconImports.push(match[1]);
    }

    // Extract JSX content from the return statement
    const returnMatch = sourceCode.match(/return\s*\(\s*([\s\S]*?)\s*\);/);
    if (!returnMatch) {
      console.error("Could not find return statement in:", sourceCode);
      return;
    }

    let jsx = returnMatch[1];

    // Transform JSX to HTML
    jsx = jsx
      .replace(/<>/g, "")
      .replace(/<\/>/g, "")
      .replace(/<Button([^>]*?)\/>/g, "<ui5-button$1></ui5-button>")
      .replace(/<Button([^>]*)>([\s\S]*?)<\/Button>/g, "<ui5-button$1>$2</ui5-button>")
      .replace(/endIcon=/g, "end-icon=")
      .replace(/accessibleName=/g, "accessible-name=")
      .replace(/=\{["']([^"']+)["']\}/g, '="$1"')
      .trim();

    // Build import statements for the module script
    const iconImportStatements = iconImports
      .map(icon => `import "@ui5/webcomponents-icons/dist/${icon}.js";`)
      .join("\n    ");

    const importMap = calcImports();
    const isCompact = contentDensity === "Compact";
    const dir = textDirection === "RTL" ? "rtl" : "ltr";

    const html = `<!DOCTYPE html>
<html dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <script type="importmap">
    {
      "imports": ${JSON.stringify(importMap)}
    }
  </script>
  <style>
    *:not(:defined) {
      display: none;
    }
    html {
      forced-color-adjust: none;
    }
    body {
      font-family: "72", Arial, sans-serif;
      padding: 1rem;
      margin: 0;
      background-color: var(--sapBackgroundColor);
    }
    ui5-button {
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  </style>
</head>
<body class="${isCompact ? 'ui5-content-density-compact' : ''}">
  ${jsx}
  <script type="module">
    import "@ui5/webcomponents/dist/Button.js";
    ${iconImportStatements}

    // Theme support
    import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
    setTheme("${theme}");
  </script>
</body>
</html>`;

    // Use srcdoc for simpler loading
    iframeRef.current.srcdoc = html;
  }, [calcImports, theme, contentDensity, textDirection]);

  const handleEditorMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
    updatePreview(editorCode);
  }, [updatePreview, editorCode]);

  useEffect(() => {
    const timer = setTimeout(() => updatePreview(editorCode), 500);
    return () => clearTimeout(timer);
  }, [editorCode, updatePreview]);

  const reloadPreview = useCallback(() => {
    updatePreview(editorCode);
  }, [updatePreview, editorCode]);

  return (
    <div className={styles.container}>
      {/* Preview pane on top */}
      <div className={styles.previewPane}>
        {/* Reload bar at top */}
        <div className={styles.reloadBar}>
          <button
            className={styles.reloadButton}
            onClick={reloadPreview}
            type="button"
            title="Reload preview"
          >
            ↻
          </button>
        </div>
        <iframe
          ref={iframeRef}
          className={styles.iframe}
          sandbox="allow-scripts allow-same-origin"
          title="Preview"
        />
      </div>

      {/* Editor below, controlled by parent - only render when visible to avoid React root conflicts */}
      {editorVisible && (
        <div className={styles.editorPane}>
          <Editor
            key={editorPath.current}
            height="300px"
            defaultLanguage="typescript"
            defaultValue={editorCode}
            theme={colorMode === "dark" ? "vs-dark" : "light"}
            onChange={handleEditorChange}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              quickSuggestions: {
                other: true,
                comments: false,
                strings: true,
              },
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnCommitCharacter: true,
              wordBasedSuggestions: "off",
              parameterHints: { enabled: true },
              suggest: {
                showKeywords: true,
                showSnippets: true,
                showClasses: true,
                showFunctions: true,
                showVariables: true,
                showValues: true,
                insertMode: "replace",
              },
            }}
            path={editorPath.current}
          />
        </div>
      )}
    </div>
  );
}
