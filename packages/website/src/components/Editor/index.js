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
    return document.createElement("playground-project");
  }
}

// return a project element to the pool for reuse
const returnProjectToPool = (project) => {
  projectPool.push(project);
}

export default function Editor({ html, js, css, mainFile = "main.js", canShare = false, standalone = false, mainFileSelected = false }) {
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
  const { siteConfig, siteMetadata } = useDocusaurusContext();
  const { theme, setTheme } = useContext(ThemeContext);
  const { contentDensity, setContentDensity } = useContext(ContentDensityContext);
  const { textDirection, setTextDirection } = useContext(TextDirectionContext);
  const [copied, setCopied] = useState(false);
  const [activeExample, setActiveExample] = useState("");
  const [longURL, setLongURL] = useState("");
  const [shareBtnToggled, setShareBtnToggled] = useState(false);

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
        content: playgroundSupport({ theme, textDirection, contentDensity, iframeId }),
        hidden: true
      };
    } else {
      //  update existing playground support with current settings
      gistConfig.files["playground-support.js"] = {
        ...gistConfig.files["playground-support.js"],
        content: playgroundSupport({ theme, textDirection, contentDensity, iframeId }),
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
          content: playgroundSupport({ theme, textDirection, contentDensity, iframeId }),
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
    newConfig.files["playground-support.js"].content = playgroundSupport({ theme, textDirection, contentDensity, iframeId });
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
        {optionalSplitter(preview(), editor())}
        <div className={`${styles.previewResult__actions}  ${(canShare ? styles.previewResult__hasShare : "")} `}>
          {standalone
            ?
            <></>
            :
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

              <button
                className={`button ${(editorVisible ? "button--secondary" : "button--secondary")} ${styles.previewResult__toggleCodeEditor} ${(canShare ? styles.previewResult__hasShare : "")}`}
                onClick={toggleEditor}
              >
                {editorVisible ? <HideIcon className={`${styles["btn__icon--edit"]} `} /> : <EditIcon className={`${styles["btn__icon--edit"]}`} />}
                {editorVisible ? "Hide code" : "Edit"}
              </button>
            </>
          }
        </div>

      </div>
    </>
  );
}
