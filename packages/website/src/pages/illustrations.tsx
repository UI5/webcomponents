import React, { useState, useEffect } from 'react';
import clsx from "clsx";
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import "./illustrations.css";
import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css";

// Import generated components and data
import SAPIllustrations, { illustrationsData as sapData } from "../../illustrations/index.js";
import SAPTNTIllustrations, { illustrationsData as tntData } from "../../illustrations-tnt/index.js";

// IllustratedMessage preview component
function IllustrationPreview({ name, displayName, collection }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Dynamically import UI5 components (SSR-safe)
    if (typeof window !== 'undefined') {
      import("@ui5/webcomponents-fiori/dist/IllustratedMessage.js");
      import("@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js");
    }
  }, []);

  const illustrationPath = collection === "SAP"
    ? `@ui5/webcomponents-fiori/dist/illustrations/${name}.js`
    : `@ui5/webcomponents-fiori/dist/illustrations/tnt/${name}.js`;

  const handleCopyImport = () => {
    navigator.clipboard.writeText(`import "${illustrationPath}";`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="illustration__preview-panel">
      <div className="illustration__preview-header">
        <h2>{displayName}</h2>
        <button
          className={clsx("button", copied ? "button--success" : "button--primary")}
          onClick={handleCopyImport}
        >
          {copied ? "Copied!" : "Copy Import"}
        </button>
      </div>

      <div className="illustration__preview-sizes">
        <div className="illustration__preview-size">
          <h3>Extra Small (Dot)</h3>
          <ui5-illustrated-message
            name={name}
            design="Dot"
          />
        </div>

        <div className="illustration__preview-size">
          <h3>Small (Spot)</h3>
          <ui5-illustrated-message
            name={name}
            design="Spot"
          />
        </div>

        <div className="illustration__preview-size">
          <h3>Medium (Dialog)</h3>
          <ui5-illustrated-message
            name={name}
            design="Dialog"
          />
        </div>

        <div className="illustration__preview-size">
          <h3>Large (Scene)</h3>
          <ui5-illustrated-message
            name={name}
            design="Scene"
          />
        </div>
      </div>
    </div>
  );
}

// Welcome message shown when no illustration is selected
function WelcomeMessage() {
  return (
    <div className="illustration__welcome">
      <div className="illustration__welcome-content">
        <h2>Welcome to UI5 Illustrations</h2>
        <p>
          Browse and explore SAP Fiori and TNT illustrations for your UI5 applications.
        </p>
        <ul>
          <li>Select an illustration from the grid to preview all size variants</li>
          <li>Use the search box to filter illustrations by name</li>
          <li>Toggle between SAP and TNT illustration collections</li>
          <li>Copy the import statement to use in your project</li>
        </ul>
      </div>
    </div>
  );
}

// Main illustrations page component
function IllustrationsContent() {
  const [collection, setCollection] = useState("SAP");
  const [selectedIllustration, setSelectedIllustration] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load UI5 components and handle URL hash on INITIAL MOUNT only (auto-switch collection)
  useEffect(() => {
    // Load UI5 components
    if (typeof window !== 'undefined') {
      import("@ui5/webcomponents-fiori/dist/IllustratedMessage.js");
      import("@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js");
    }

    // Check URL hash for pre-selected illustration (auto-switch collection)
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1); // Remove '#' prefix
      if (hash) {
        // Search BOTH collections to find the illustration
        let illustration = sapData.find(item => item.displayName === hash);
        let targetCollection = "SAP";

        if (!illustration) {
          illustration = tntData.find(item => item.displayName === hash);
          targetCollection = "TNT";
        }

        if (illustration) {
          // Auto-switch collection if needed
          if (targetCollection !== "SAP") {
            setCollection(targetCollection);
          }
          setSelectedIllustration(illustration);
        } else {
          // Hash doesn't exist in any collection, clear selection
          setSelectedIllustration(null);
        }
      } else {
        // No hash, clear selection
        setSelectedIllustration(null);
      }
    }
  }, []); // Empty dependency array - run only on mount

  // Handle manual tab switching - check if current hash belongs to new collection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const currentData = collection === "SAP" ? sapData : tntData;
        const illustration = currentData.find(item => item.displayName === hash);
        if (illustration) {
          // Hash exists in the new collection, select it
          setSelectedIllustration(illustration);
        } else {
          // Hash doesn't exist in the new collection, clear selection
          setSelectedIllustration(null);
        }
      } else {
        setSelectedIllustration(null);
      }
    }
  }, [collection]); // Run when collection changes (manual tab switch)

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window === 'undefined') return;

      const hash = window.location.hash.slice(1);
      if (hash) {
        // Search BOTH collections to find the illustration
        let illustration = sapData.find(item => item.displayName === hash);
        let targetCollection = "SAP";

        if (!illustration) {
          illustration = tntData.find(item => item.displayName === hash);
          targetCollection = "TNT";
        }

        if (illustration) {
          // Auto-switch collection if needed
          if (collection !== targetCollection) {
            setCollection(targetCollection);
          }
          setSelectedIllustration(illustration);
        }
      } else {
        setSelectedIllustration(null);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, [collection]);

  // Wrapper function that updates URL hash when illustration is selected
  const handleIllustrationSelect = (illustration) => {
    setSelectedIllustration(illustration);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${illustration.displayName}`);
    }
  };

  const currentData = collection === "SAP" ? sapData : tntData;

  return (
    <div className="illustrations__container">
      {/* Header with collection switcher and search */}
      <div className="illustrations__header">
        <div className="segmented__button">
          <div
            onClick={() => setCollection("SAP")}
            className={clsx("segmented__button__item", {
              'segmented__button__item--active': collection === "SAP"
            })}
          >SAP Illustrations</div>
          <div
            onClick={() => setCollection("TNT")}
            className={clsx("segmented__button__item", {
              'segmented__button__item--active': collection === "TNT"
            })}
          >SAP TNT Illustrations</div>
        </div>

        <input
          className="illustrations__search"
          type="search"
          placeholder="Filter illustrations..."
          aria-label="Filter illustrations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Split pane layout */}
      <div className="illustrations__split-pane">
        {/* Left pane: Grid of thumbnails */}
        <div className="illustrations__left-pane">
          {collection === "SAP" ? (
            <SAPIllustrations
              onIllustrationSelect={handleIllustrationSelect}
              selectedIllustration={selectedIllustration}
              searchQuery={searchQuery}
            />
          ) : (
            <SAPTNTIllustrations
              onIllustrationSelect={handleIllustrationSelect}
              selectedIllustration={selectedIllustration}
              searchQuery={searchQuery}
            />
          )}
        </div>

        {/* Right pane: IllustratedMessage preview or welcome message */}
        <div className="illustrations__right-pane">
          {selectedIllustration ? (
            <BrowserOnly>
              {() => (
                <IllustrationPreview
                  name={selectedIllustration.name}
                  displayName={selectedIllustration.displayName}
                  collection={collection}
                />
              )}
            </BrowserOnly>
          ) : (
            <WelcomeMessage />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Illustrations() {
  return (
    <Layout title="Illustrations" description="UI5 Web Components Illustrations">
      <IllustrationsContent />
    </Layout>
  );
}
