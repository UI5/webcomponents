import React, { useState, useEffect } from 'react';
import clsx from "clsx";
import SAPIcons from "../../icons/index.js";
import SAPTNTIcons from "../../icons-tnt/index.js";
import SAPBSIcons from "../../icons-business-suite/index.js";
import Layout from '@theme/Layout';
import "./shared.css";
import "./icons.css";

// Collection metadata
const COLLECTION_METADATA = {
  "SAP Icons": {
    title: "SAP Icons",
    package: "@ui5/webcomponents-icons",
    packageUrl: "https://www.npmjs.com/package/@ui5/webcomponents-icons"
  },
  "SAP TNT Icons": {
    title: "SAP TNT Icons",
    package: "@ui5/webcomponents-icons-tnt",
    packageUrl: "https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt"
  },
  "SAP BSuite Icons": {
    title: "SAP BSuite Icons",
    package: "@ui5/webcomponents-icons-business-suite",
    packageUrl: "https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite"
  }
};

const Select = ({ updateState }) => {
  const [collection, setCollection] = useState("SAP Icons");

  return <div className="segmented__button">
    <div
      onClick={() => {
        setCollection("SAP Icons")
        updateState("SAP Icons");
      }}
      className={clsx("segmented__button__item", { 'segmented__button__item--active': collection === "SAP Icons" })}
    >SAP Icons</div>
    <div
      onClick={() => {
        setCollection("SAP TNT Icons");
        updateState("SAP TNT Icons");
      }}
      className={clsx("segmented__button__item", { 'segmented__button__item--active': collection === "SAP TNT Icons" })}
    >SAP TNT Icons</div>

    <div
      onClick={() => {
        setCollection("SAP BSuite Icons");
        updateState("SAP BSuite Icons");
      }}
      className={clsx("segmented__button__item", { 'segmented__button__item--active': collection === "SAP BSuite Icons" })}
    >SAP BSuite Icons</div>
  </div>;
};


const Collection = ({ currCollection }) => {
  // if (currCollection === "SAP TNT Icons") {
  //     return <SAPTNTIcons />
  // } else if (currCollection === "SAP BSuite Icons") {
  //     return <SAPBSIcons />
  // }

  return <SAPIcons />
};

export default function Icons() {
  const [collection, setCollection] = useState("SAP Icons");
  const [searchQuery, setSearchQuery] = useState("");

  // Client-side search filtering using DOM manipulation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const iconWrappers = document.querySelectorAll('.icon__wrapper');
    const notFoundElement = document.querySelector('.icon__not__found');
    let visibleCount = 0;

    iconWrappers.forEach(wrapper => {
      const iconName = wrapper.getAttribute('data-icon-name') || '';
      const matches = iconName.toLowerCase().includes(searchQuery.toLowerCase());

      if (matches) {
        wrapper.classList.remove('hidden');
        visibleCount++;
      } else {
        wrapper.classList.add('hidden');
      }
    });

    // Show/hide "not found" message
    if (visibleCount === 0 && searchQuery) {
      notFoundElement?.classList.remove('hidden');
    } else {
      notFoundElement?.classList.add('hidden');
    }
  }, [searchQuery, collection]); // Re-run when search or collection changes

  return (
    <Layout title="UI5 Web Components Icons" description="UI5 Web Components Icons">
      <div className="icons__container">
        {/* Header with collection switcher, title, and search */}
        <div className="icons__header">
          <div className="icons__header__metadata">
            <h2 className="icons__header__title">
              {COLLECTION_METADATA[collection].title}
            </h2>
            <a
              href={COLLECTION_METADATA[collection].packageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="icons__header__package"
            >
              {COLLECTION_METADATA[collection].package}
            </a>
          </div>

          <Select updateState={setCollection} />

          <div className='icons__header__separator'></div>

          <input
            className="page__search"
            type="search"
            placeholder="Filter icons..."
            aria-label="Filter icons"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Icons grid */}
        <Collection currCollection={collection} />
      </div>
    </Layout>
  );
};
