import React, { createContext, useState, useEffect } from 'react';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const ThemeContext = createContext(null);
const ContentDensityContext = createContext(null);
const TextDirectionContext = createContext(null);

export { ThemeContext, ContentDensityContext, TextDirectionContext };

// Default implementation, that you can customize
export default function Root({children}) {
    const [theme, setTheme] = useState(() => {
        // getting stored value
        let initialValue;
        if (ExecutionEnvironment.canUseDOM) {
            initialValue = localStorage.getItem("ui5-theme");
        }
        return initialValue || "sap_horizon";
    });

    const [contentDensity, setContentDensity] = useState(() => {
        // getting stored value
        let initialValue;
        if (ExecutionEnvironment.canUseDOM) {
            initialValue = localStorage.getItem("ui5-content-density");
        }
        return initialValue || "Compact";
    });

    const [textDirection, setTextDirection] = useState(() => {
        // getting stored value
        let initialValue;
        if (ExecutionEnvironment.canUseDOM) {
            initialValue = localStorage.getItem("ui5-text-direction");
        }
        return initialValue || "LTR";
    });

    useEffect(() => {
        if (!ExecutionEnvironment.canUseDOM) {
            return;
        }
        Promise.all([
            import("@ui5/webcomponents/dist/Assets.js"),
            import("@ui5/webcomponents-fiori/dist/Assets.js"),
            import("@ui5/webcomponents-base/dist/config/Theme.js"),
        ]).then(([, , { setTheme: ui5SetTheme }]) => {
            ui5SetTheme(theme);
        });
    }, [theme]);

    const themeValue = { theme, setTheme };
    const contentDensityValue = { contentDensity, setContentDensity };
    const textDirectionValue = { textDirection, setTextDirection };

    return <>
        <ThemeContext.Provider value={themeValue}>
            <ContentDensityContext.Provider value={contentDensityValue}>
                <TextDirectionContext.Provider value={textDirectionValue}>
                    {children}
                </TextDirectionContext.Provider>
            </ContentDensityContext.Provider>
        </ThemeContext.Provider>
    </>;
}