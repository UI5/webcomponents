import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./index.module.css";

const AI_TOOLS = [
  {
    name: "Claude",
    url: "https://claude.ai/new",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M4.709 15.955l4.486-2.236a.3.3 0 0 0 .166-.268V8.19a.3.3 0 0 0-.424-.273l-4.486 2.03a.3.3 0 0 0-.176.273v5.462a.3.3 0 0 0 .434.273zm8.372-9.442l-4.17 2.074a.3.3 0 0 0-.166.268v10.57a.3.3 0 0 0 .434.274l4.17-2.078a.3.3 0 0 0 .166-.268V6.787a.3.3 0 0 0-.434-.274zm6.206 1.39l-4.17 1.887a.3.3 0 0 0-.176.273v5.462a.3.3 0 0 0 .434.274l4.17-2.078a.3.3 0 0 0 .166-.268V8.177a.3.3 0 0 0-.424-.274z" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    url: "https://chatgpt.com",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "v0",
    url: "https://v0.dev/chat",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M13.365 21.305c-.09.21-.18.39-.3.54-.12.15-.27.27-.45.36s-.39.135-.66.135c-.24 0-.45-.045-.63-.135a1.155 1.155 0 0 1-.45-.36 2.4 2.4 0 0 1-.3-.54L3.645 5.4c-.09-.21-.15-.405-.18-.585A1.098 1.098 0 0 1 3.525 4.2c.06-.18.165-.33.315-.45.15-.12.36-.18.63-.18h.87c.27 0 .495.045.675.135.18.09.33.225.45.405.12.18.21.39.27.63l5.28 13.755 5.28-13.755c.06-.24.15-.45.27-.63.12-.18.27-.315.45-.405.18-.09.405-.135.675-.135h.87c.27 0 .48.06.63.18.15.12.255.27.315.45.06.18.06.39 0 .615-.03.18-.09.375-.18.585z" />
      </svg>
    ),
  },
  {
    name: "GitHub Copilot",
    url: "https://github.com/copilot",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M9.107 18.965c-.023.09-.089.157-.176.19a3.232 3.232 0 0 1-1.123.2c-.631 0-1.137-.247-1.516-.744-.378-.497-.567-1.146-.567-1.945v-.309c0-.069.04-.1.12-.1h.6c.084 0 .12.031.12.1v.345c0 .522.105.936.315 1.24.21.304.511.457.903.457.274 0 .508-.042.702-.126a.17.17 0 0 0 .1-.135l.523-2.02zM12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM8.4 16.366c0-.069.04-.1.12-.1h.6c.084 0 .12.031.12.1v.309c0 .798.189 1.447.567 1.945.378.497.884.744 1.516.744a3.36 3.36 0 0 0 .493-.037l.523 2.02a.17.17 0 0 1-.1.135 3.177 3.177 0 0 1-.916.162c-.631 0-1.138-.247-1.516-.744-.379-.497-.568-1.146-.568-1.945V16.68c0-.069.04-.1.12-.1h.6c.084 0 .12.031.12.1v.345c0 .522.105.936.315 1.24.21.304.511.457.903.457a2.09 2.09 0 0 0 .299-.022" />
      </svg>
    ),
  },
];

const SparkleIcon = () => (
  <svg
    className={styles.sparkle}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 1v3M8 12v3M3.05 3.05l2.12 2.12M10.83 10.83l2.12 2.12M1 8h3M12 8h3M3.05 12.95l2.12-2.12M10.83 5.17l2.12-2.12" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className={styles.externalIcon}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.5 3H2.25A1.25 1.25 0 0 0 1 4.25v5.5A1.25 1.25 0 0 0 2.25 11h5.5A1.25 1.25 0 0 0 9 9.75V8.5M7 1h4v4M4.5 7.5 11 1" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
    <path d="M10.5 5.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h2.5" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8.5l3.5 3.5 6.5-7" />
  </svg>
);

const SourceIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="5.5 4.5 2 8 5.5 11.5" />
    <polyline points="10.5 4.5 14 8 10.5 11.5" />
  </svg>
);

function buildPrompt(title, tagName, pageUrl) {
  if (tagName) {
    return `I'm working with UI5 Web Components. Here's the documentation for the <${tagName}> component:\n${pageUrl}\n\nHelp me understand how to use it, give examples, or help debug issues with it.`;
  }
  return `I'm working with UI5 Web Components. Here's the documentation page "${title}":\n${pageUrl}\n\nHelp me understand the concepts on this page or answer questions about it.`;
}

function getGitHubSourceUrl(tagName) {
  // Map tag prefixes to packages
  const tag = tagName.replace(/^ui5-/, "");

  // Known fiori components (by tag name without prefix)
  const fioriTags = [
    "bar", "barcode-scanner-dialog", "dynamic-side-content",
    "flexible-column-layout", "illustrated-message", "media-gallery",
    "notification-list", "page", "product-switch",
    "shell-bar", "side-navigation", "timeline", "upload-collection",
    "view-settings-dialog", "wizard",
  ];

  const aiTags = ["button", "prompt-input"];

  let pkg = "main";
  if (fioriTags.some((t) => tag.startsWith(t))) {
    pkg = "fiori";
  } else if (aiTags.some((t) => tag === t)) {
    // ai package components might conflict with main, so exact match
    // We can't reliably detect ai vs main from tag name alone
    // Default to main since most components are there
    pkg = "main";
  }

  // Convert tag-name to PascalCase component name
  const componentName = tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return `https://github.com/SAP/ui5-webcomponents/tree/main/packages/${pkg}/src/${componentName}.ts`;
}

export default function AskAI({ title, tagName }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        close();
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  const handleCopyMarkdown = async () => {
    const el = document.querySelector(".markdown");
    if (!el) return;

    try {
      await navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = el.innerText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const prompt = buildPrompt(title, tagName, pageUrl);
  const encodedPrompt = encodeURIComponent(prompt);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <SparkleIcon />
        Ask AI
        <span className={styles.chevron} />
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.sectionLabel}>Markdown</div>
          <button
            className={styles.item}
            role="menuitem"
            onClick={() => {
              handleCopyMarkdown();
              close();
            }}
          >
            <span className={styles.itemIcon}>
              {copied ? <CheckIcon /> : <CopyIcon />}
            </span>
            <span className={copied ? styles.copied : styles.itemLabel}>
              {copied ? "Copied!" : "Copy page content"}
            </span>
          </button>
          {tagName && (
            <a
              className={styles.item}
              role="menuitem"
              href={getGitHubSourceUrl(tagName)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              <span className={styles.itemIcon}>
                <SourceIcon />
              </span>
              <span className={styles.itemLabel}>View source</span>
              <ExternalLinkIcon />
            </a>
          )}

          <div className={styles.separator} />

          <div className={styles.sectionLabel}>Open in</div>
          {AI_TOOLS.map((tool) => (
            <a
              key={tool.name}
              className={styles.item}
              role="menuitem"
              href={`${tool.url}?q=${encodedPrompt}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              <span className={styles.itemIcon}>{tool.icon}</span>
              <span className={styles.itemLabel}>{tool.name}</span>
              <ExternalLinkIcon />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
