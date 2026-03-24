import React from "react";
import clsx from "clsx";
import { useRef, useEffect, useState, useId, useContext } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import playgroundSupport from "./playground-support.js";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { ThemeContext, ContentDensityContext, TextDirectionContext } from "@site/src/theme/Root";
import { encodeURL, decodeURL } from "./encodeURL.js";
import downloadSample from "./download.js";

// UI5 Web Components resources
import "@ui5/webcomponents/dist/Popover.js";
import GitHubGist from "./GitHubGist.js";
import ShareIcon from "@ui5/webcomponents-icons/dist/v5/share-2.svg";
import DownloadIcon from "@ui5/webcomponents-icons/dist/v5/download-from-cloud.svg";
import CopyIcon from "@ui5/webcomponents-icons/dist/v5/copy.js";
import EditIcon from "@ui5/webcomponents-icons/dist/v5/edit.svg";
import ActionIcon from "@ui5/webcomponents-icons/dist/v5/action.svg";
import HideIcon from "@ui5/webcomponents-icons/dist/v5/hide.svg";

// Custom icons for HTML/React toggle
const HtmlIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "0.25rem" }}>
    <path d="M12 17.56L16.07 16.43L16.62 10.33H9.38L9.2 8.3H16.8L17 6.31H7L7.56 12.32H14.45L14.22 14.9L12 15.5L9.78 14.9L9.64 13.24H7.64L7.93 16.43L12 17.56M4.07 3H19.93L18.5 19.2L12 21L5.5 19.2L4.07 3Z"/>
  </svg>
);

const ReactIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "0.25rem" }}>
    <path d="M12 10.11C13.03 10.11 13.87 10.95 13.87 12C13.87 13 13.03 13.85 12 13.85C10.97 13.85 10.13 13 10.13 12C10.13 10.95 10.97 10.11 12 10.11M7.37 20C8 20.38 9.38 19.8 10.97 18.3C10.45 17.71 9.94 17.07 9.46 16.4C8.64 16.32 7.83 16.2 7.06 16.04C6.55 18.18 6.74 19.65 7.37 20M8.08 14.26L7.79 13.75C7.68 14.04 7.57 14.33 7.5 14.61C7.77 14.67 8.07 14.72 8.38 14.77C8.28 14.6 8.18 14.43 8.08 14.26M14.62 13.5L15.43 12L14.62 10.5C14.32 9.97 14 9.5 13.71 9.03C13.17 9 12.6 9 12 9C11.4 9 10.83 9 10.29 9.03C10 9.5 9.68 9.97 9.38 10.5L8.57 12L9.38 13.5C9.68 14.03 10 14.5 10.29 14.97C10.83 15 11.4 15 12 15C12.6 15 13.17 15 13.71 14.97C14 14.5 14.32 14.03 14.62 13.5M12 6.78C11.81 7 11.61 7.23 11.41 7.5C11.61 7.5 11.8 7.5 12 7.5C12.2 7.5 12.39 7.5 12.59 7.5C12.39 7.23 12.19 7 12 6.78M12 17.22C12.19 17 12.39 16.77 12.59 16.5C12.39 16.5 12.2 16.5 12 16.5C11.8 16.5 11.61 16.5 11.41 16.5C11.61 16.77 11.81 17 12 17.22M16.62 4C16 3.62 14.62 4.2 13.03 5.7C13.55 6.29 14.06 6.93 14.54 7.6C15.36 7.68 16.17 7.8 16.94 7.96C17.45 5.82 17.26 4.35 16.62 4M15.92 9.74L16.21 10.25C16.32 9.96 16.43 9.67 16.5 9.39C16.23 9.33 15.93 9.28 15.62 9.23C15.72 9.4 15.82 9.57 15.92 9.74M17.37 2.69C18.84 3.53 19 5.74 18.38 8.32C20.92 9.07 22.75 10.31 22.75 12C22.75 13.69 20.92 14.93 18.38 15.68C19 18.26 18.84 20.47 17.37 21.31C15.91 22.15 13.92 21.19 12 19.36C10.08 21.19 8.09 22.15 6.62 21.31C5.16 20.47 5 18.26 5.62 15.68C3.08 14.93 1.25 13.69 1.25 12C1.25 10.31 3.08 9.07 5.62 8.32C5 5.74 5.16 3.53 6.62 2.69C8.09 1.85 10.08 2.81 12 4.64C13.92 2.81 15.91 1.85 17.37 2.69M17.08 12C17.42 12.75 17.72 13.5 17.97 14.26C20.07 13.63 21.25 12.73 21.25 12C21.25 11.27 20.07 10.37 17.97 9.74C17.72 10.5 17.42 11.25 17.08 12M6.92 12C6.58 11.25 6.28 10.5 6.03 9.74C3.93 10.37 2.75 11.27 2.75 12C2.75 12.73 3.93 13.63 6.03 14.26C6.28 13.5 6.58 12.75 6.92 12M15.92 14.26C15.82 14.43 15.72 14.6 15.62 14.77C15.93 14.72 16.23 14.67 16.5 14.61C16.43 14.33 16.32 14.04 16.21 13.75L15.92 14.26M13.03 18.3C14.62 19.8 16 20.38 16.62 20C17.26 19.65 17.45 18.18 16.94 16.04C16.17 16.2 15.36 16.32 14.54 16.4C14.06 17.07 13.55 17.71 13.03 18.3M8.08 9.74C8.18 9.57 8.28 9.4 8.38 9.23C8.07 9.28 7.77 9.33 7.5 9.39C7.57 9.67 7.68 9.96 7.79 10.25L8.08 9.74M10.97 5.7C9.38 4.2 8 3.62 7.37 4C6.74 4.35 6.55 5.82 7.06 7.96C7.83 7.8 8.64 7.68 9.46 7.6C9.94 6.93 10.45 6.29 10.97 5.7Z"/>
  </svg>
);

import Splitter from "./Splitter.js";
import ExamplesMenu from "../ExamplesMenu/index.tsx";
import hellowWorldHTML from "./examples/hello-world/html";
import hellowWorldTS from "./examples/hello-world/main";
import counterHTML from "./examples/counter/html";
import counterTS from "./examples/counter/main";

import { auth, saveAuthToStorage, validateStoredAuth, clearAuthFromStorage } from "./githubAuth.js";
import { createGist, loadGist } from "./githubAPI.js";
import { getGistIdFromURL, copyToClipboard } from "./githubUtils.js";

if (ExecutionEnvironment.canUseDOM) {
  require("playground-elements");
  require("./html-autocomplete.js");
}

const projectPool = [];

// get a project element from the pool or create a new one
const getProjectFromPool = () => {
  if (projectPool.length) {
    return projectPool.pop();
  } else {
    const plProject = document.createElement("playground-project");
    if (process.env.NODE_ENV === "development") {
      plProject.sandboxBaseUrl = window.location.origin + "/";
    }
    return plProject;
  }
}

// return a project element to the pool for reuse
const returnProjectToPool = (project) => {
  projectPool.push(project);
}

export default function Editor({ html, js, css, react, mainFile = "main.js", canShare = false, standalone = false, mainFileSelected = false }) {
  const projectContainerRef = useRef(null);
  const projectRef = useRef(null);
  const previewRef = useRef(null);
  const tabBarRef = useRef(null);
  const popoverRef = useRef(null);
  const fileEditorRef = useRef(null);

  const [firstRender, setFirstRender] = useState(true);
  // name is set on iframe so it can be passed back in resize message to identify which iframe is resized
  const iframeId = useId();
  const [editorVisible, setEditorVisible] = useState(false);
  // View mode for HTML/React toggle
  const [viewMode, setViewMode] = useState("html");
  const [reactEditorVisible, setReactEditorVisible] = useState(false);
  // Dynamically loaded ReactPlayground component
  const [ReactPlayground, setReactPlayground] = useState(null);
  const { siteConfig, siteMetadata } = useDocusaurusContext();
  const { theme, setTheme } = useContext(ThemeContext);
  const { contentDensity, setContentDensity } = useContext(ContentDensityContext);
  const { textDirection, setTextDirection } = useContext(TextDirectionContext);
  const [copied, setCopied] = useState(false);
  const [activeExample, setActiveExample] = useState("");
  const [longURL, setLongURL] = useState("");
  const [shareBtnToggled, setShareBtnToggled] = useState(false);
  const reactCodeRef = useRef(react || "");
  const [reactCopied, setReactCopied] = useState(false);

  const [githubToken, setGithubToken] = useState("");
  const [githubUser, setGithubUser] = useState(null);
  const [gistUrl, setGistUrl] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isCreatingGist, setIsCreatingGist] = useState(false);

  const signInWithGitHub = async () => {
    setIsAuthenticating(true);

    try {
      const { token, user } = await auth();

      // store authentication data
      setGithubToken(token);
      setGithubUser(user);
      saveAuthToStorage(token, user);

    } catch (error) {
      console.error("github authentication failed:", error.message);
      setGithubToken("");
      setGithubUser(null);

    } finally {
      setIsAuthenticating(false);
    }
  };

  const signOutFromGitHub = () => {
    setGithubToken("");
    setGithubUser(null);
    setGistUrl("");
    clearAuthFromStorage();
    console.log("signed out from github");
  };

  const createGitHubGist = async () => {
    if (!githubToken) {
      console.error("no github token available");
      return;
    }

    setIsCreatingGist(true);

    try {
      const files = getSampleFiles();
      const gist = await createGist(githubToken, files);

      // create playground url with gist id
      const playgroundUrl = `${window.location.origin}${playUrl}/#gist=${gist.id}`;
      setGistUrl(playgroundUrl);

      await copyToClipboard(playgroundUrl);
      setCopied(true);

      console.log("gist created successfully:", playgroundUrl);
    } catch (error) {
      console.error("failed to create gist:", error.message);
      setGistUrl("");
    } finally {
      setIsCreatingGist(false);
    }
  };

  function calcImports() {
    const deployment = siteConfig.customFields.ui5DeploymentType;
    // temporary keep "preview" (GitHub Pages) and "netlify_preview" (Netlify) - later only "preview" which will deploy on Netlify
    const isNetlifyPreview = deployment === "netlify_preview";
    const isPreview = deployment === "preview";
    const isNightly = deployment === "nightly";
    // use local CDN for development, nightly, preview and netlify_preview - all others (release, beta) use jsdelivr
    const useLocalCDN = process.env.NODE_ENV === "development" || isNightly || isPreview || isNetlifyPreview;

    if (useLocalCDN) {
      return {
        "@ui5/webcomponents/": `${getHostBaseUrl()}local-cdn/main/`,
        "@ui5/webcomponents-ai/": `${getHostBaseUrl()}local-cdn/ai/`,
        "@ui5/webcomponents-fiori/": `${getHostBaseUrl()}local-cdn/fiori/`,
        "@ui5/webcomponents-compat/": `${getHostBaseUrl()}local-cdn/compat/`,
        "@ui5/webcomponents-base/jsx-runtime": `${getHostBaseUrl()}local-cdn/base/dist/jsx-runtime.js`,
        "@ui5/webcomponents-base/": `${getHostBaseUrl()}local-cdn/base/`,
        "@ui5/webcomponents-icons/": `${getHostBaseUrl()}local-cdn/icons/`,
        "@ui5/webcomponents-localization/": `${getHostBaseUrl()}local-cdn/localization/`,
        "@ui5/webcomponents-theming/": `${getHostBaseUrl()}local-cdn/theming/`,
        "lit-html": `${getHostBaseUrl()}local-cdn/lit-html/lit-html.js`,
        "lit-html/": `${getHostBaseUrl()}local-cdn/lit-html/`,
        "@zxing/library/": `${getHostBaseUrl()}local-cdn/zxing/`,
      };
    } else {
      return {
        "@ui5/webcomponents/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents@${siteConfig.customFields.ui5Version}/`,
        "@ui5/webcomponents-ai/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-ai@${siteConfig.customFields.ui5Version}/`,
        "@ui5/webcomponents-fiori/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-fiori@${siteConfig.customFields.ui5Version}/`,
        "@ui5/webcomponents-compat/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-compat@${siteConfig.customFields.ui5Version}/`,
        "@ui5/webcomponents-base/jsx-runtime": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-base@${siteConfig.customFields.ui5Version}/dist/jsx-runtime.js`,
        "@ui5/webcomponents-base/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-base@${siteConfig.customFields.ui5Version}/`,
        "@ui5/webcomponents-icons/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-icons@${siteConfig.customFields.ui5Version}/`,
        "@ui5/webcomponents-localization/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-localization@${siteConfig.customFields.ui5Version}/`,
        "@ui5/webcomponents-theming/": `https://cdn.jsdelivr.net/npm/@ui5/webcomponents-theming@${siteConfig.customFields.ui5Version}/`,
        "lit-html": `https://cdn.jsdelivr.net/npm/lit-html@2`,
        "lit-html/": `https://cdn.jsdelivr.net/npm/lit-html@2/`,
        "@zxing/library/": `https://cdn.jsdelivr.net/npm/@zxing/library@0/`,
      };
    }
  }

  function addHeadContent(html) {
    return html.replace("<head>", `
<head>
    <script type="importmap">
      {
        "imports": ${JSON.stringify(calcImports())}
      }
    </script>
    <style>
      *:not(:defined) {
        display: none;
      }

    html {
      forced-color-adjust: none;
    }
    </style>
`)
  }

  function getHostBaseUrl() {
    let origin = siteConfig.url;
    if (process.env.NODE_ENV === "development") {
      origin = location.origin;
    }
    return new URL(baseUrl, origin).toString();
  }

  function getActiveExampleContent() {
    if (activeExample === "hello-world") {
      return { html: hellowWorldHTML, js: hellowWorldTS }
    }

    if (activeExample === "counter") {
      return { html: counterHTML, js: counterTS }
    }

    return {}
  }

  // samples should use the pattern "../assets/..." for their assets
  // and it will be converted to the aboslute url of the documentation site
  // and served from /static
  function fixAssetPaths(html) {
    let origin = siteConfig.url;
    if (process.env.NODE_ENV === "development") {
      origin = location.origin;
    }
    return html.replaceAll("../assets/", getHostBaseUrl())
  }

  function toggleEditor() {
    setEditorVisible(!editorVisible);
  }

  const getSampleFiles = () => {
    const files = {};

    // convert file format
    projectRef.current.files.forEach(f => {
      files[f.name] = {
        name: f.name,
        content: f.content
      };
    });

    // remove import map from index.html
    const htmlContent = files["index.html"].content;
    const startIdx = htmlContent.indexOf(`<script type="importmap">`);
    const endIdx = htmlContent.indexOf(`</script>`) + `</script>`.length;
    files["index.html"].content = htmlContent.substring(0, startIdx) + htmlContent.substring(endIdx)

    // remove playground support
    delete files["playground-support.js"];

    return files;
  }

  const download = () => {
    const files = getSampleFiles();
    downloadSample(files);
  }

  const share = async () => {
    const files = getSampleFiles();
    const hash = encodeURL(JSON.stringify(files));
    const longURL = new URL(`#${hash}`, window.location.href).href;

    setShareBtnToggled(!shareBtnToggled);
    setLongURL(longURL);
  }

  const saveProject = () => {
    const files = getSampleFiles();
    localStorage.setItem("project", JSON.stringify(files));
  }

  const resetProject = () => {
    localStorage.removeItem("project");
    localStorage.removeItem("github_token");
    localStorage.removeItem("activeExample");
    localStorage.removeItem("github_oauth_state");
    localStorage.removeItem("github_user");
    setGistUrl("");
    location.hash = "";
  }

  const resetExampleMenuSelection = () => {
    localStorage.clear("activeExample");
  }

  const baseUrl = useBaseUrl("/");
  const playUrl = useBaseUrl("/play");

  const openInNewTab = () => {
    const files = getSampleFiles();

    // encode and put in url
    const hash = encodeURL(JSON.stringify(files));
    const url = new URL(`${playUrl}#${hash}`, location.origin);
    window.open(url, "_blank");
    resetExampleMenuSelection();
  }

  const loadHelloWorld = () => {
    resetProject();
    setActiveExample("hello-world");
    localStorage.setItem("activeExample", "hello-world");
  }

  const loadCounter = () => {
    resetProject();
    setActiveExample("counter");
    localStorage.setItem("activeExample", "counter");
  }

  const createGistProjectConfig = (gistFiles) => {
    const gistConfig = {
      files: {},
      importMap: {
        "imports": calcImports(),
      }
    };

    // process each gist file
    Object.keys(gistFiles).forEach(filename => {
      const gistFile = gistFiles[filename];

      if (filename === "index.html") {
        //  add required head content to html file
        gistConfig.files[filename] = {
          ...gistFile,
          content: addHeadContent(fixAssetPaths(gistFile.content))
        };
      } else {
        //  keep other files as-is but fix asset paths
        gistConfig.files[filename] = {
          ...gistFile,
          content: fixAssetPaths(gistFile.content)
        };
      }
    });

    //  ensure playground support exists
    if (!gistConfig.files["playground-support.js"]) {
      gistConfig.files["playground-support.js"] = {
        name: "playground-support.js",
        content: playgroundSupport({ theme, textDirection, contentDensity, iframeId, cldrBaseUrl: calcImports()["@ui5/webcomponents-localization/"] + "dist/generated/assets/cldr/" }),
        hidden: true
      };
    } else {
      //  update existing playground support with current settings
      gistConfig.files["playground-support.js"] = {
        ...gistConfig.files["playground-support.js"],
        content: playgroundSupport({ theme, textDirection, contentDensity, iframeId, cldrBaseUrl: calcImports()["@ui5/webcomponents-localization/"] + "dist/generated/assets/cldr/" }),
        hidden: true
      };
    }

    return gistConfig;
  };

  const loadGistProject = (projectRef, projectContainerRef, gistId) => {
    loadGist(gistId)
      .then(gistFiles => {
        if (!gistFiles || Object.keys(gistFiles).length === 0) {
          console.error("No files found in gist.");
          return;
        }

        const gistConfig = createGistProjectConfig(gistFiles);
        projectRef.current.config = gistConfig;

        if (!projectContainerRef.current.contains(projectRef.current)) {
          projectContainerRef.current.appendChild(projectRef.current);
        }
      })
      .catch(error => {
        console.log(`Failed fetching gist by id: ${error}. Falling back to default config.`);
        projectRef.current.config = newConfig;

        if (!projectContainerRef.current.contains(projectRef.current)) {
          projectContainerRef.current.appendChild(projectRef.current);
        }
      });
  }

  useEffect(() => {
    projectRef.current = getProjectFromPool();

    const activeExample = getActiveExampleContent();
    let _html = activeExample.html || html;
    let _js = activeExample.js || js;

    let newConfig = {
      files: {
        "index.html": {
          content: addHeadContent(fixAssetPaths(_html)),
        },
        "playground-support.js": {
          content: playgroundSupport({ theme, textDirection, contentDensity, iframeId, cldrBaseUrl: calcImports()["@ui5/webcomponents-localization/"] + "dist/generated/assets/cldr/" }),
          hidden: true,
        },
        [mainFile]: {
          content: `/* playground-hide */
import "./playground-support.js";
/* playground-hide-end */
${fixAssetPaths(_js)}`,
          selected: mainFileSelected,
        },
        "main.css": {
          content: css,
          hidden: !css,
        },
      },
      importMap: {
        "imports": calcImports(),
      }
    }
    if (newConfig.files["main.css"].hidden) {
      delete newConfig.files["main.css"];
    }

    const gistId = getGistIdFromURL();

    if (gistId) {
      loadGistProject(projectRef, projectContainerRef, gistId);
    } else {
      // restore project if saved
      if (location.pathname.endsWith("/play") || location.pathname.endsWith("/play/")) {
        const savedProject = localStorage.getItem("project");
        if (savedProject) {
          try {
            const savedConfig = JSON.parse(savedProject);
            savedConfig["index.html"].content = addHeadContent(fixAssetPaths(savedConfig["index.html"].content));
            const oldMainFile = savedConfig["main.js"] || savedConfig["main.ts"];
            if (oldMainFile && newConfig.files["main.tsx"]) {
              // if the saved project has a main from an old default, and the default project has a main.tsx file, restore the saved one
              delete newConfig.files["main.tsx"];
            }
            newConfig.files = { ...newConfig.files, ...savedConfig };
          } catch (e) {
            console.log(e);
          }
        }
      }

      // shared content - should be after restore from localstorage
      if (!gistId && location.pathname.includes("/play") && location.hash) {
        try {
          const sharedConfig = JSON.parse(decodeURL(location.hash.replace("#", "")));
          sharedConfig["index.html"].content = addHeadContent(fixAssetPaths(sharedConfig["index.html"].content));
          const oldMainFile = sharedConfig["main.js"] || sharedConfig["main.ts"];
          if (oldMainFile && newConfig.files["main.tsx"]) {
            // if the shared project has a main from an old default, and the default project has a main.tsx file, restore the saved one
            delete newConfig.files["main.tsx"];
          }
          newConfig.files = { ...newConfig.files, ...sharedConfig };
        } catch (e) {
          console.log(e);
        }
      }

      projectRef.current.config = newConfig;
      projectContainerRef.current.appendChild(projectRef.current)
    }

    const messageHandler = async (event) => {
      if (event.data.height && event.data.iframeId === iframeId) {
        previewRef.current.iframe.style.height = `${event.data.height}px`;
      }
    }
    if (!standalone) {
      window.addEventListener("message", messageHandler);
    }

    tabBarRef.current.project = projectRef.current;
    fileEditorRef.current.project = projectRef.current;
    previewRef.current.project = projectRef.current;

    // algolia search opens the search on key `/` because this custom element is the event target but has no `isContentEditable`
    Object.defineProperty(fileEditorRef.current, "isContentEditable", {
      configurable: true,
      get() {
        return true;
      },
    });

    tabBarRef.current.editor = fileEditorRef.current;

    // setup localstorage saving
    if (standalone) {
      projectRef.current.addEventListener("compileStart", saveProject);
    }

    popoverRef.current?.addEventListener("close", () => {
      setShareBtnToggled(false);
    })

    return function () {
      if (!standalone) {
        // component cleanup
        window.removeEventListener("message", messageHandler);
      }
      projectRef.current.removeEventListener("compileStart", saveProject);
      returnProjectToPool(projectRef.current);
    }
  }, [activeExample]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    // setting has changed but exising project config is there
    // update the playground-support.js only with the new settings so refresh works correctly
    const newConfig = JSON.parse(JSON.stringify(projectRef.current.config));
    newConfig.files["playground-support.js"].content = playgroundSupport({ theme, textDirection, contentDensity, iframeId, cldrBaseUrl: calcImports()["@ui5/webcomponents-localization/"] + "dist/generated/assets/cldr/" });
    projectRef.current.config = newConfig;
  }, [theme, contentDensity, textDirection]);

  useEffect(() => {
    let timeoutId;
    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [copied]);

  useEffect(() => {
    let timeoutId;
    if (reactCopied) {
      timeoutId = setTimeout(() => {
        setReactCopied(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [reactCopied]);

  // automatic sign-out on token expiration
  useEffect(() => {
    const checkTokenValidity = () => {
      if (githubToken) {
        const authData = validateStoredAuth();
        if (!authData) {
          setGithubToken("");
          setGithubUser(null);
          setGistUrl("");
          console.log("github token expired, signed out automatically");
        }
      }
    };

    // check immediately and then every 10 minutes
    checkTokenValidity();
    const intervalId = setInterval(checkTokenValidity, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [githubToken]);

  useEffect(() => {
    const authData = validateStoredAuth();

    if (authData) {
      setGithubToken(authData.token);
      setGithubUser(authData.user);
      console.log("restored github authentication from storage");
    }
  }, []);

  function optionalSplitter(editor, preview) {
    return (
      <>
        {standalone
          ?
          <div>
            <Splitter preview={preview} editor={editor}></Splitter>
          </div>
          :
          <div>
            {editor}
            {preview}
          </div>
        }
      </>
    )
  }

  function preview() {
    return (
      <>
        <playground-preview class={clsx(styles.previewResultHidden, {
          [styles["preview-standalone"]]: standalone,
          [styles["preview-sample"]]: !standalone,
        })}
          style={standalone ? undefined : { height: "unset", minHeight: "7rem" }} ref={previewRef}
        ></playground-preview>
      </>
    )
  }

  function editor() {
    return (
      <>
        <div
          className={clsx({
            [styles["editor-standalone"]]: standalone,
            [styles["editor-sample"]]: !standalone,
          })}
          style={{ display: editorVisible | standalone ? "block" : "none" }}>
          <playground-tab-bar editable-file-system ref={tabBarRef}></playground-tab-bar>
          <playground-file-editor line-numbers ref={fileEditorRef}></playground-file-editor>
        </div>
      </>
    )
  }

  function getExampleMenuInitialState() {
    if (ExecutionEnvironment.canUseDOM) {
      if (location.hash) {
        return null;
      }

      const savedActiveSample = localStorage.getItem("activeExample");
      if (savedActiveSample) {
        return savedActiveSample;
      }

      if (localStorage.getItem("project")) {
        return null;
      }

      return "hello-world";
    }

    return "hello-world";
  }

  return (
    <>
      <div ref={projectContainerRef}></div>

      {canShare
        ?
        <>
          <div className={`${styles.editor__toolbar}`}>
            <ExamplesMenu loadHelloWorld={loadHelloWorld} loadCounter={loadCounter} initialActiveState={getExampleMenuInitialState()} />
            <div>
              <button
                className={`button button--secondary ${styles.previewResult__download}`}
                onClick={download}
              >
                <DownloadIcon className={`${styles.btn__icon}`} />
                Download
              </button>

              <button
                id="btnSharePopupOpen"
                className={`button button--secondary ${styles.previewResult__share}`}
                onClick={share}
              >
                <ShareIcon className={`${styles.btn__icon}`} />
                Share
              </button>

              <ui5-popover
                  header-text="Share Sample"
                  open={shareBtnToggled ? true : undefined}
                  opener="btnSharePopupOpen"
                  placement="Bottom"
                  ref={popoverRef}
                >
                <section>
                    { copied ? <span className={styles["copy-status"]}>&#x2714; Link copied</span> : <></> }

                    {/*  Long URL  */}
                    <ui5-label>Long URL</ui5-label>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <ui5-input readonly value={longURL}></ui5-input>
                      <ui5-button
                        icon={CopyIcon}
                        design="Transparent"
                        onClick={() => {
                          navigator.clipboard.writeText(longURL);
                          setCopied(true);
                      }}></ui5-button>
                    </div>

                    {/*  github gist section  */}
                    <GitHubGist
                      githubUser={githubUser}
                      isAuthenticating={isAuthenticating}
                      isCreatingGist={isCreatingGist}
                      gistUrl={gistUrl}
                      onSignIn={signInWithGitHub}
                      onSignOut={signOutFromGitHub}
                      onCreateGist={createGitHubGist}
                      onCopyGistUrl={copyToClipboard}
                      setCopied={setCopied}
                    />
                </section>
              </ui5-popover>
            </div>
          </div>
        </>
        :
        <></>
      }

      <div
        className={clsx({
          [styles["container-standalone"]]: standalone,
          [styles["container-sample"]]: !standalone,
        })}
        style={{ border: "1px solid hsla(203, 50%, 30%, 0.15)", boxShadow: "var(--ifm-color-secondary) 0 0 3px 0", borderRadius: "0.5rem", overflow: "hidden" }}
      >
        {/* View Mode Toggle - only show when react prop is provided */}
        {react && !standalone && (
          <div className={styles.viewModeToggle}>
            <button
              className={`button button--sm ${viewMode === "html" ? "button--primary" : "button--secondary"}`}
              onClick={() => setViewMode("html")}
            >
              <HtmlIcon />
              HTML
            </button>
            <button
              className={`button button--sm ${viewMode === "react" ? "button--primary" : "button--secondary"}`}
              onClick={() => {
                setViewMode("react");
                // Dynamically import ReactPlayground only when needed
                if (!ReactPlayground) {
                  import("./ReactPlayground.tsx").then(module => {
                    setReactPlayground(() => module.default);
                  });
                }
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              <ReactIcon />
              React
            </button>
          </div>
        )}

        {/* HTML View */}
        <div style={{ display: viewMode === "html" ? "block" : "none" }}>
          {optionalSplitter(preview(), editor())}
        </div>

        {/* React View */}
        {react && viewMode === "react" && (
          ReactPlayground ? (
            <ReactPlayground
              code={react}
              editorVisible={reactEditorVisible}
              onCodeChange={(code) => { reactCodeRef.current = code; }}
            />
          ) : (
            <div style={{ padding: "1rem" }}>Loading React playground...</div>
          )
        )}

        <div className={`${styles.previewResult__actions}  ${(canShare ? styles.previewResult__hasShare : "")} `}>
          {standalone
            ?
            <></>
            :
            <>
              {viewMode === "html" && (
                <>
                  <button
                    className={`button button--secondary ${styles.previewResult__downloadSample}`}
                    onClick={download}
                  >
                    <DownloadIcon className={`${styles["btn__icon--edit"]} `} />
                    Download
                  </button>

                  <button
                    className={`button button--secondary ${styles.previewResult__downloadSample}`}
                    onClick={openInNewTab}
                  >
                    <ActionIcon className={`${styles["btn__icon--edit"]} `} />
                    Open in Playground
                  </button>
                </>
              )}

              {viewMode === "react" && react && reactEditorVisible && (
                <button
                  className={`button button--secondary ${styles.previewResult__downloadSample}`}
                  onClick={() => {
                    navigator.clipboard.writeText(reactCodeRef.current);
                    setReactCopied(true);
                  }}
                >
                  {reactCopied
                    ? <>&#x2714; Copied</>
                    : <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`${styles["btn__icon--edit"]}`}>
                          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25z" />
                          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25z" />
                        </svg>
                        Copy
                      </>
                  }
                </button>
              )}

              <button
                className={`button button--secondary ${styles.previewResult__toggleCodeEditor} ${(canShare ? styles.previewResult__hasShare : "")}`}
                onClick={viewMode === "react" && react ? () => setReactEditorVisible(!reactEditorVisible) : toggleEditor}
              >
                {(viewMode === "react" && react ? reactEditorVisible : editorVisible)
                  ? <HideIcon className={`${styles["btn__icon--edit"]} `} />
                  : <EditIcon className={`${styles["btn__icon--edit"]}`} />}
                {(viewMode === "react" && react ? reactEditorVisible : editorVisible) ? "Hide code" : "Edit"}
              </button>
            </>
          }
        </div>

      </div>
    </>
  );
}
