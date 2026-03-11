import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { GithubSvg } from './GithubSvg';
import packageJson from "../../../package.json";

const ADDON_ID = 'github-button';

const GithubLink = () => (
    <div style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        gap: "5px",
    }}>
        <a style={{
            width: "20px",
            height: "20px",
        }} href="https://github.com/UI5/webcomponents" target="_blank"
            rel="noreferrer">
            <GithubSvg />
        </a>
        <a style={{
            textDecoration: "none",
            color: "inherit"
        }}
            href={`https://github.com/UI5/webcomponents/tree/v${packageJson.version}`}
            target="_blank" rel="noreferrer"
        >
            v{packageJson.version}
        </a >
    </div >
)


addons.register(ADDON_ID, (api) => {
    addons.add(ADDON_ID, {
        title: "Github",
        type: types.TOOLEXTRA,
        match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
        render: GithubLink
    });
});