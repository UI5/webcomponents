/**
 * ReactCodeView - A read-only code viewer for React samples.
 *
 * Uses prism-react-renderer for syntax highlighting with line numbers.
 * Styled to match the existing Editor component aesthetics.
 */
import React from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./ReactCodeView.module.css";

interface ReactCodeViewProps {
  /** The React code to display */
  code: string;
  /** Language for syntax highlighting (default: tsx) */
  language?: Language;
}

export default function ReactCodeView({ code, language = "tsx" }: ReactCodeViewProps) {
  const { colorMode } = useColorMode();
  const theme = colorMode === "dark" ? themes.dracula : themes.github;

  // Trim trailing whitespace and normalize the code
  const normalizedCode = code.trim();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Read-only</span>
        <span className={styles.filename}>sample.tsx</span>
      </div>
      <div className={styles.codeWrapper}>
        <Highlight theme={theme} code={normalizedCode} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} ${styles.pre}`} style={style}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <div key={i} {...lineProps} className={`${lineProps.className || ""} ${styles.line}`}>
                    <span className={styles.lineNumber}>{i + 1}</span>
                    <span className={styles.lineContent}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
