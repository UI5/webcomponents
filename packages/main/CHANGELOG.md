# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.20.0-rc.0](https://github.com/UI5/webcomponents/compare/v2.19.0...v2.20.0-rc.0) (2026-02-12)


### Bug Fixes

* **ui5-avatar-group:** use getSlottedNodes for transitive slot support ([#13049](https://github.com/UI5/webcomponents/issues/13049)) ([1d17d50](https://github.com/UI5/webcomponents/commit/1d17d50b71a504c9f35b22105339964c1d13dab6))
* **ui5-bar:** allow hiding slots ([#13051](https://github.com/UI5/webcomponents/issues/13051)) ([f9fe667](https://github.com/UI5/webcomponents/commit/f9fe6671afc873123ffc2512df50055d1c736328)), closes [#13036](https://github.com/UI5/webcomponents/issues/13036)
* **ui5-date-picker:** move cancel button to footer ([#13053](https://github.com/UI5/webcomponents/issues/13053)) ([90d24f0](https://github.com/UI5/webcomponents/commit/90d24f06523802259199159df4251fff32631654))
* **ui5-multi-input:** include 'select-all' icon in the template ([#13024](https://github.com/UI5/webcomponents/issues/13024)) ([a46ae2f](https://github.com/UI5/webcomponents/commit/a46ae2f40bf7018107f3f7ed129fe736db141e0d)), closes [#13022](https://github.com/UI5/webcomponents/issues/13022)
* **ui5-step-input, ui5-switch:** support label 'for' attribute in aria-label ([#13057](https://github.com/UI5/webcomponents/issues/13057)) ([1ea6d5e](https://github.com/UI5/webcomponents/commit/1ea6d5e1c71e95b1329f1195daae108cdede4ac5)), closes [#10710](https://github.com/UI5/webcomponents/issues/10710)


### Features

* **ui5-color-palette*:** resolve landmark uniqueness and missing dialog label ([#12967](https://github.com/UI5/webcomponents/issues/12967)) ([34df574](https://github.com/UI5/webcomponents/commit/34df574b97bb034da2903e4fd41e8ff46310b602))
* **ui5-color-picker:** add `accessibleName` property for unique landmarks ([#12968](https://github.com/UI5/webcomponents/issues/12968)) ([3e10f22](https://github.com/UI5/webcomponents/commit/3e10f2251889a5b738fce97f962d9d01816a09ee))
* **ui5-li-custom:** improve accessibility announcements ([#12696](https://github.com/UI5/webcomponents/issues/12696)) ([f6e6981](https://github.com/UI5/webcomponents/commit/f6e698175d28052616b4f711151d49acb1b91907))
* **ui5-rating-indicator:** custom rating icon implemantation ([#12985](https://github.com/UI5/webcomponents/issues/12985)) ([874db06](https://github.com/UI5/webcomponents/commit/874db06aa9dbbfe2fd96f6fb3d9fc754fbfef12b))
* **ui5-tokenizer:** align mobile popover title with spec ([#12979](https://github.com/UI5/webcomponents/issues/12979)) ([e305108](https://github.com/UI5/webcomponents/commit/e30510884f6a689a3cae669b963328b5197775d3))





# [2.19.0](https://github.com/UI5/webcomponents/compare/v2.19.0-rc.3...v2.19.0) (2026-02-05)

**Note:** Version bump only for package @ui5/webcomponents





# [2.19.0-rc.3](https://github.com/UI5/webcomponents/compare/v2.19.0-rc.2...v2.19.0-rc.3) (2026-02-05)


### Bug Fixes

* **input like:** correct form submission behaviour ([#12959](https://github.com/UI5/webcomponents/issues/12959)) ([cd02ead](https://github.com/UI5/webcomponents/commit/cd02ead56026bb69acc4661442d30b24ed81ff6c))
* **ui5-button, ui5-toggle-button, ui5-segmented-button, ui5-switch:** аction is canceled using the shift key ([f2d95f8](https://github.com/UI5/webcomponents/commit/f2d95f8dbb85a7a56387b54dd959e3499b56727b)), closes [#12334](https://github.com/UI5/webcomponents/issues/12334)
* **ui5-calendar:** add visible text content to week number column header ([#12975](https://github.com/UI5/webcomponents/issues/12975)) ([8f6dbea](https://github.com/UI5/webcomponents/commit/8f6dbea0f261ae1b7d942345e6c11173f1a9e947))
* **ui5-carousel:** navigateTo method no longer moves the focus ([#12920](https://github.com/UI5/webcomponents/issues/12920)) ([b082fcf](https://github.com/UI5/webcomponents/commit/b082fcfdeacfbddde73eb808f3b6bc1c3c24bc56))
* **ui5-combobox:** focus the only item on Arrow Down ([#13007](https://github.com/UI5/webcomponents/issues/13007)) ([740aee5](https://github.com/UI5/webcomponents/commit/740aee53df199d966c21d6a5d468cced550ed4ca)), closes [#12937](https://github.com/UI5/webcomponents/issues/12937)
* **ui5-date-range:** remove commented code ([#12978](https://github.com/UI5/webcomponents/issues/12978)) ([050b2a3](https://github.com/UI5/webcomponents/commit/050b2a3c215ddb4f4700083363560b896e099cf6))
* **ui5-date*:** remove `aria-pressed` from time selection clocks ([#12964](https://github.com/UI5/webcomponents/issues/12964)) ([50fc153](https://github.com/UI5/webcomponents/commit/50fc1539ef5ffe0f624d33bce7f22c95c04217b8))
* **ui5-dialog:** attach events only when the dialog is open ([#12929](https://github.com/UI5/webcomponents/issues/12929)) ([7bdeff7](https://github.com/UI5/webcomponents/commit/7bdeff714f8bf70c12e3009dd96050081dff1b80))
* **ui5-dynamic-date-range:** add `accessibleName` to the ResponsivePopover ([#12965](https://github.com/UI5/webcomponents/issues/12965)) ([a674966](https://github.com/UI5/webcomponents/commit/a674966877bc1cd29a74f3404afa3b8ac84893bd))
* **ui5-file-uploader:** fix value help icon as per specification ([#12952](https://github.com/UI5/webcomponents/issues/12952)) ([4927815](https://github.com/UI5/webcomponents/commit/492781539c15d431e08f861f3599604aae8ea4ed)), closes [#12947](https://github.com/UI5/webcomponents/issues/12947)
* **ui5-list:** prevent empty `aria-description` attribute ([#12966](https://github.com/UI5/webcomponents/issues/12966)) ([d0076ce](https://github.com/UI5/webcomponents/commit/d0076ced39b7efde8b39960a3c70c0e6024334ca))
* **ui5-multi-combobox:** correct filtering when input doesn't match typeahead ([#12981](https://github.com/UI5/webcomponents/issues/12981)) ([212a3d1](https://github.com/UI5/webcomponents/commit/212a3d1995ebea7c34b26db84fcb55f0428cec5f))
* **ui5-multi-combobox:** stabilize tests ([#12986](https://github.com/UI5/webcomponents/issues/12986)) ([68aa607](https://github.com/UI5/webcomponents/commit/68aa60777db0f3b62c74b94865002fac40285cc8))
* **ui5-slider:** align slider to the spec ([#12802](https://github.com/UI5/webcomponents/issues/12802)) ([e3b27c2](https://github.com/UI5/webcomponents/commit/e3b27c2fd8f5cbc0a81bd25e1439833fbfcde3bc))
* **ui5-split-button:** resolve nested interactive elements and invalid aria references ([#12977](https://github.com/UI5/webcomponents/issues/12977)) ([fcb8453](https://github.com/UI5/webcomponents/commit/fcb8453baf8886f00b1a2ee402397692e6ad5c57))
* **ui5-step-input:** format value with new locale symbols when language is changed ([3e4c9f2](https://github.com/UI5/webcomponents/commit/3e4c9f2eebb8bd1488c726ab8eac99effec55efc)), closes [#12334](https://github.com/UI5/webcomponents/issues/12334)
* **ui5-table:** fix table on Horizon HCW ([#12997](https://github.com/UI5/webcomponents/issues/12997)) ([f417247](https://github.com/UI5/webcomponents/commit/f4172475a962cce00e3c74b24ca5ffe391e8982b)), closes [#12933](https://github.com/UI5/webcomponents/issues/12933)
* **ui5-token:** remove hover state styles on readonly token ([#12953](https://github.com/UI5/webcomponents/issues/12953)) ([b5b895a](https://github.com/UI5/webcomponents/commit/b5b895a0068abf55008bb77b3b756f6353c2acbe))
* **ui5-toolbar:** handle non-ToolbarItem children in width calculation ([#12923](https://github.com/UI5/webcomponents/issues/12923)) ([cac2825](https://github.com/UI5/webcomponents/commit/cac2825561dbc01378e92823c638e75fd33ca80d)), closes [#12855](https://github.com/UI5/webcomponents/issues/12855)


### Features

* **framework:** move CSS variables to host element ([#12984](https://github.com/UI5/webcomponents/issues/12984)) ([3bd2b4a](https://github.com/UI5/webcomponents/commit/3bd2b4a78e1520c35029d001719186f3a0e3801d))
* **ui5-avatar-badge:** add new AvatarBadge component ([#12938](https://github.com/UI5/webcomponents/issues/12938)) ([0b96d25](https://github.com/UI5/webcomponents/commit/0b96d25bd3d5c71552ab33e90a11b8c7dab8964a)), closes [#12396](https://github.com/UI5/webcomponents/issues/12396)
* **ui5-color-palette-popover:** add placement property ([#12993](https://github.com/UI5/webcomponents/issues/12993)) ([a8581d9](https://github.com/UI5/webcomponents/commit/a8581d94392f6245e1d38bb6d80f2291140bf826))
* **ui5-multi-combobox:** introduce loading property ([#12974](https://github.com/UI5/webcomponents/issues/12974)) ([e53cbd6](https://github.com/UI5/webcomponents/commit/e53cbd64db9e85cc021d88e6e3dd4e9bc00be103))





# [2.19.0-rc.2](https://github.com/UI5/webcomponents/compare/v2.19.0-rc.1...v2.19.0-rc.2) (2026-01-22)


### Bug Fixes

* **ui5-menu:** center busy state animation ([#12906](https://github.com/UI5/webcomponents/issues/12906)) ([26e3de7](https://github.com/UI5/webcomponents/commit/26e3de71370615e0acdab06ad556b6c78bfda992)), closes [#12887](https://github.com/UI5/webcomponents/issues/12887)
* **ui5-multi-input:** selected item is announced correctly ([#12321](https://github.com/UI5/webcomponents/issues/12321)) ([fc2c651](https://github.com/UI5/webcomponents/commit/fc2c651080460cd5dfe9979f15253efd7f1797df))
* **ui5-segmented-button-item:** title on disabled items is shown ([96c7b5e](https://github.com/UI5/webcomponents/commit/96c7b5e4bc609b211abb2b65e3c2577cd18b7887))
* **ui5-table:** improve horizontal alignment handling ([#12901](https://github.com/UI5/webcomponents/issues/12901)) ([63750d4](https://github.com/UI5/webcomponents/commit/63750d42426d71e30a86358ff3e41c51514c2b56)), closes [#11858](https://github.com/UI5/webcomponents/issues/11858) [#12155](https://github.com/UI5/webcomponents/issues/12155) [#12854](https://github.com/UI5/webcomponents/issues/12854)
* **ui5-timeline, ui5-view-settings-dialog:** correct parameters definition ([#12915](https://github.com/UI5/webcomponents/issues/12915)) ([f06d066](https://github.com/UI5/webcomponents/commit/f06d0668f8c81fbb12dee76d6931fa084cd863b7))
* **ui5-tree-item:** increase toggle icon target size ([#12916](https://github.com/UI5/webcomponents/issues/12916)) ([45cbae1](https://github.com/UI5/webcomponents/commit/45cbae18ed9e2d7e96dfcbb8c4e07304fb3c5bf6)), closes [#12850](https://github.com/UI5/webcomponents/issues/12850)


### Features

* **ui5-input/ui5-multi-input:** provide built-in filtering ([#12836](https://github.com/UI5/webcomponents/issues/12836)) ([39c019b](https://github.com/UI5/webcomponents/commit/39c019b38584a2218e3c1e3a3e186b5be07ad888))
* **ui5-multi-combobox:** introduce value-state-change event ([#12926](https://github.com/UI5/webcomponents/issues/12926)) ([0bd7751](https://github.com/UI5/webcomponents/commit/0bd7751b4995c5a7a216d1c8af7a92858fc6779a))
* **ui5-step-input:** add thousands separator & scrolling ([6143dfc](https://github.com/UI5/webcomponents/commit/6143dfc968cb2d0509db1e8a41775bc70837afd8))





# [2.19.0-rc.1](https://github.com/UI5/webcomponents/compare/v2.19.0-rc.0...v2.19.0-rc.1) (2026-01-15)


### Bug Fixes

* **ui5-button:** align end icon padding ([#12908](https://github.com/UI5/webcomponents/issues/12908))v ([1ce986e](https://github.com/UI5/webcomponents/commit/1ce986ecd926d20a0b3ee53944f97ecfb0664d8c)), closes [#12803](https://github.com/UI5/webcomponents/issues/12803)
* **ui5-calendar:** use timestamp as initially focused date ([#12894](https://github.com/UI5/webcomponents/issues/12894)) ([d9e10a3](https://github.com/UI5/webcomponents/commit/d9e10a35ead82e86983c71fee2fc9b1a31102cec)), closes [#12837](https://github.com/UI5/webcomponents/issues/12837)
* **ui5-datetime-picker:** use value-format for building the hours part ([#12899](https://github.com/UI5/webcomponents/issues/12899)) ([ec7b72e](https://github.com/UI5/webcomponents/commit/ec7b72e50bf36bdc1bf078c4d315fda147d9979b)), closes [#12832](https://github.com/UI5/webcomponents/issues/12832)
* **ui5-form:** group elements ordering ([#12890](https://github.com/UI5/webcomponents/issues/12890)) ([b50425a](https://github.com/UI5/webcomponents/commit/b50425a22cf2dc4f4d80a85908e5eb7dfead41d9))
* **ui5-link:** remove length check from tabindex calculation ([#12870](https://github.com/UI5/webcomponents/issues/12870)) ([e2f530c](https://github.com/UI5/webcomponents/commit/e2f530c039d53cf897238f9e82d20a3be81ba840))
* **ui5-menu-item:** use correct font size ([#12896](https://github.com/UI5/webcomponents/issues/12896)) ([9b3c752](https://github.com/UI5/webcomponents/commit/9b3c7523e216d75940e6b919ba5cd31ce0455b03)), closes [#12403](https://github.com/UI5/webcomponents/issues/12403)
* **ui5-menu:** adapt mobile menu to latest visual design ([#12879](https://github.com/UI5/webcomponents/issues/12879)) ([d3d85f6](https://github.com/UI5/webcomponents/commit/d3d85f6a5273940a569bed3f2bfee55cda66738e))


### Features

* **framework:** detect dynamically loaded OpenUI5 ([#12235](https://github.com/UI5/webcomponents/issues/12235)) ([2292ffd](https://github.com/UI5/webcomponents/commit/2292ffd404da8a59229abdc24b1edb4bf428f7cf))
* **ui5-popover:** implement resizable popover ([#12623](https://github.com/UI5/webcomponents/issues/12623)) ([50f11ec](https://github.com/UI5/webcomponents/commit/50f11ec98a67b4dcbba8a6412f76d3d096c7ec9d))
* **ui5-search:** add suggestion group header text wrapping ([#12866](https://github.com/UI5/webcomponents/issues/12866)) ([6298688](https://github.com/UI5/webcomponents/commit/629868855f4abcc30138bc1a687284a009d964a4))





# [2.19.0-rc.0](https://github.com/UI5/webcomponents/compare/v2.18.0...v2.19.0-rc.0) (2026-01-08)


### Bug Fixes

* **OpenUI5Support:** stabilize tests ([#12867](https://github.com/UI5/webcomponents/issues/12867)) ([0431b5b](https://github.com/UI5/webcomponents/commit/0431b5bed5aa1f7b039e2e8d42b329d29fbf2fec))
* **ui5-multi-input:** show suggestions instead of tokens on desktop ([#12827](https://github.com/UI5/webcomponents/issues/12827)) ([2dd4ad5](https://github.com/UI5/webcomponents/commit/2dd4ad5944c22565691b09deb1ab7eeba36bcb42))
* **ui5-range-slider:** correct property description ([#12838](https://github.com/UI5/webcomponents/issues/12838)) ([e85b3f4](https://github.com/UI5/webcomponents/commit/e85b3f436bc3f1bdd47a554bbb635cca58910b2c))


### Features

* **ui5-color-picker:** add screenreader announcement on color mode change ([#12841](https://github.com/UI5/webcomponents/issues/12841)) ([e71bac3](https://github.com/UI5/webcomponents/commit/e71bac38ccbbd1070445f17a1444986e29fb04e8))
* **ui5-icon:** implement accessibilityInfo getter ([#12604](https://github.com/UI5/webcomponents/issues/12604)) ([f974edb](https://github.com/UI5/webcomponents/commit/f974edba57a324af9bb20f76495a2308b885f999))
* **ui5-list:** add sticky header property ([#12782](https://github.com/UI5/webcomponents/issues/12782)) ([2f9e76d](https://github.com/UI5/webcomponents/commit/2f9e76d13a16a9fa62dc6c5572af57811855b73e))





# [2.18.0](https://github.com/UI5/webcomponents/compare/v2.18.0-rc.3...v2.18.0) (2026-01-05)

**Note:** Version bump only for package @ui5/webcomponents





# [2.18.0-rc.3](https://github.com/UI5/webcomponents/compare/v2.18.0-rc.2...v2.18.0-rc.3) (2026-01-01)


### Bug Fixes

* **ui5-multi-combo-box:** unskip test ([#12829](https://github.com/UI5/webcomponents/issues/12829)) ([b62c313](https://github.com/UI5/webcomponents/commit/b62c313d4ba1f2baa1feb048066eb90c5c4f7571))





# [2.18.0-rc.2](https://github.com/UI5/webcomponents/compare/v2.18.0-rc.1...v2.18.0-rc.2) (2025-12-25)


### Bug Fixes

* **OpenUI5Support:** stabilize popups tests ([#12830](https://github.com/UI5/webcomponents/issues/12830)) ([6bf7b05](https://github.com/UI5/webcomponents/commit/6bf7b053682d140bdaf1db45cf476e0d1e0c94aa))


### Features

* **ui5-calendar:** improve header and day picker accessibility and focus behavior ([5111ce7](https://github.com/UI5/webcomponents/commit/5111ce7d4bd6436efacd0167b811623f6b8b304f))
* **ui5-multi-combobox:** filtering selection enhancement ([#12799](https://github.com/UI5/webcomponents/issues/12799)) ([9eb128d](https://github.com/UI5/webcomponents/commit/9eb128d72fd963869c8dde3b7f48824df4ed8fd7))
* **ui5-token:** change readonly select state visual ([#12822](https://github.com/UI5/webcomponents/issues/12822)) ([dee55cf](https://github.com/UI5/webcomponents/commit/dee55cf1147759cbfad20a72c8315664c8e95ae9))





# [2.18.0-rc.1](https://github.com/UI5/webcomponents/compare/v2.18.0-rc.0...v2.18.0-rc.1) (2025-12-18)


### Bug Fixes

* **ui5-*:** improve `vertical alignment` of inline web comps ([#12718](https://github.com/UI5/webcomponents/issues/12718)) ([dda0591](https://github.com/UI5/webcomponents/commit/dda0591df7864354a45794546dc139df4f595fac))
* **ui5-breadcrumbs:** remove role='link' from current page element ([#12797](https://github.com/UI5/webcomponents/issues/12797)) ([878d8a3](https://github.com/UI5/webcomponents/commit/878d8a39b5c6a5cf0ce9a5b3363655e68c7ecd3e)), closes [#12780](https://github.com/UI5/webcomponents/issues/12780)
* **ui5-panel:** toggle on ENTER keydown ([#12794](https://github.com/UI5/webcomponents/issues/12794)) ([ce1bd8f](https://github.com/UI5/webcomponents/commit/ce1bd8fdf2b0a49a8a7c099888d471c5f9008fb4))
* **ui5-slider:** rework tooltips states ([#12725](https://github.com/UI5/webcomponents/issues/12725)) ([7f94de3](https://github.com/UI5/webcomponents/commit/7f94de386a896e75f8b13115009912cb6bb0b676)), closes [#12553](https://github.com/UI5/webcomponents/issues/12553)
* **ui5-toolbar-select:** sync programmatic selection ([#12790](https://github.com/UI5/webcomponents/issues/12790)) ([fc063f0](https://github.com/UI5/webcomponents/commit/fc063f02accbdc1929337a8d64ec5d5ec3dbcec1)), closes [#12619](https://github.com/UI5/webcomponents/issues/12619)


### Features

* **ui5-avatar:** implement accessibilityInfo getter ([#12613](https://github.com/UI5/webcomponents/issues/12613)) ([a6bc028](https://github.com/UI5/webcomponents/commit/a6bc0281965924f09570491dcb493734b70cef0e))





# [2.18.0-rc.0](https://github.com/UI5/webcomponents/compare/v2.17.0...v2.18.0-rc.0) (2025-12-11)


### Bug Fixes

* **ui5-button:** fix end-icon margin ([#12777](https://github.com/UI5/webcomponents/issues/12777)) ([4a52be6](https://github.com/UI5/webcomponents/commit/4a52be6b82adfd4e8fe91616e995a3ead15c6919)), closes [#12710](https://github.com/UI5/webcomponents/issues/12710)
* **ui5-button:** set "type" property in accessibilityInfo with correct value. ([#12759](https://github.com/UI5/webcomponents/issues/12759)) ([337d97b](https://github.com/UI5/webcomponents/commit/337d97b485bfd9c6ea2fc3fd294e2d1e93370ea8)), closes [#12750](https://github.com/UI5/webcomponents/issues/12750)
* **ui5-date-time-picker:** correct initial focus on small screens ([#12752](https://github.com/UI5/webcomponents/issues/12752)) ([1884137](https://github.com/UI5/webcomponents/commit/1884137632a0563f3a4eae45011216c8eb3c5435))
* **ui5-datetime-picker:** show header on mobile mode ([#12746](https://github.com/UI5/webcomponents/issues/12746)) ([7bdad89](https://github.com/UI5/webcomponents/commit/7bdad891f1196aebb4a227b7bee1f6135cf5ce2d)), closes [#12724](https://github.com/UI5/webcomponents/issues/12724)
* **ui5-popover:** render block layers in the correct order ([#12659](https://github.com/UI5/webcomponents/issues/12659)) ([43e545a](https://github.com/UI5/webcomponents/commit/43e545a4a5e486f19fb52ae18fe7c162680cf56e))
* **ui5-step-input:** prevent false validation error with valuePrecision ([#12778](https://github.com/UI5/webcomponents/issues/12778)) ([08f8e35](https://github.com/UI5/webcomponents/commit/08f8e353a3e2f0ede3aa8239e3ef89dce7c5e70e))
* **ui5-time-picker:** show header on mobile ([#12768](https://github.com/UI5/webcomponents/issues/12768)) ([8447e0d](https://github.com/UI5/webcomponents/commit/8447e0d052a5a380ff2e9e49fd3537678dd60da7)), closes [#12695](https://github.com/UI5/webcomponents/issues/12695)


### Features

* **ui5-li-custom:** enhance arrow key navigation ([#12700](https://github.com/UI5/webcomponents/issues/12700)) ([f672e13](https://github.com/UI5/webcomponents/commit/f672e130aff2db2bdea62ed05de52ebaeacc7ae8)), closes [#11987](https://github.com/UI5/webcomponents/issues/11987)
* **ui5-link:** add default text slot ([#12781](https://github.com/UI5/webcomponents/issues/12781)) ([6bc4f0a](https://github.com/UI5/webcomponents/commit/6bc4f0a41de164f4aa504fff99719c361f953d80))





# [2.17.0](https://github.com/UI5/webcomponents/compare/v2.17.0-rc.5...v2.17.0) (2025-12-05)


### Reverts

* Revert "feat(framework): scope theming css variables with component packages (#12491)" (#12775) ([3385623](https://github.com/UI5/webcomponents/commit/33856235e357a3d4d0b9391eab2a83a5b3010556)), closes [#12491](https://github.com/UI5/webcomponents/issues/12491) [#12775](https://github.com/UI5/webcomponents/issues/12775)
* Revert "feat(framework): introduce loadBaseThemingCSSVariables configuration (#12699)" (#12767) ([db375d3](https://github.com/UI5/webcomponents/commit/db375d30b9f4a7e07961fabbdcefdcdc78a93f46)), closes [#12699](https://github.com/UI5/webcomponents/issues/12699) [#12767](https://github.com/UI5/webcomponents/issues/12767)





# [2.17.0-rc.5](https://github.com/UI5/webcomponents/compare/v2.17.0-rc.4...v2.17.0-rc.5) (2025-12-04)


### Bug Fixes

* **tools:** dependencies usage ([#12716](https://github.com/UI5/webcomponents/issues/12716)) ([89bb0dd](https://github.com/UI5/webcomponents/commit/89bb0dd62322598bd1ea7ce984eaf0618546a6f2))
* **ui5-checkbox:** fix accessibilityInfo ([#12686](https://github.com/UI5/webcomponents/issues/12686)) ([4c63fdc](https://github.com/UI5/webcomponents/commit/4c63fdcc19951f325841907d8dccfc13d2ff1202))
* **ui5-input:** prevent double opening of VSM ([#12715](https://github.com/UI5/webcomponents/issues/12715)) ([ff6d49b](https://github.com/UI5/webcomponents/commit/ff6d49b821d3a6c4b52fdb79bd2f47e7ced82c67))
* **ui5-tab-container:** allow selection indicator on text-only tabs to overlap bottom border ([#12584](https://github.com/UI5/webcomponents/issues/12584)) ([ddec84c](https://github.com/UI5/webcomponents/commit/ddec84c021d092e737003c93a508f881dbcbdff0))
* **ui5-toolbar-select:** add invalidateOnChildChange ([#12676](https://github.com/UI5/webcomponents/issues/12676)) ([23a2df8](https://github.com/UI5/webcomponents/commit/23a2df8567456bc613917c0a4b4d3ece62973ed3)), closes [#12619](https://github.com/UI5/webcomponents/issues/12619)


### Features

* **framework:** introduce loadBaseThemingCSSVariables configuration ([#12699](https://github.com/UI5/webcomponents/issues/12699)) ([f01b2eb](https://github.com/UI5/webcomponents/commit/f01b2eb6256f2032bd802d0a60c4625b0d1af5fe))
* **ui5-calendar:** add disabled dates functionality ([cc7c174](https://github.com/UI5/webcomponents/commit/cc7c1741f29d1d747a8b9a19df4b8d8c53c5d8ca))
* **ui5-multiinput:** implement selected token indicator in filter dialog ([#12698](https://github.com/UI5/webcomponents/issues/12698)) ([d046cb3](https://github.com/UI5/webcomponents/commit/d046cb37a795e04ddf4cde6befcac006dc8812f8))
* **ui5-select:** implement accessibilityInfo getter ([#12614](https://github.com/UI5/webcomponents/issues/12614)) ([3afc0e8](https://github.com/UI5/webcomponents/commit/3afc0e8bbc6bdcb4bea900fd74703db0d99524c8))





# [2.17.0-rc.4](https://github.com/UI5/webcomponents/compare/v2.17.0-rc.3...v2.17.0-rc.4) (2025-11-27)


### Bug Fixes

* **ui5-calendar:** use global configuration for first day of week ([#12665](https://github.com/UI5/webcomponents/issues/12665)) ([4e18756](https://github.com/UI5/webcomponents/commit/4e187560b35dd45198d640ee7c17b0a0523ef5c8)), closes [#12426](https://github.com/UI5/webcomponents/issues/12426)
* **ui5-table:** accessibility improvements implemented ([#12684](https://github.com/UI5/webcomponents/issues/12684)) ([94bae79](https://github.com/UI5/webcomponents/commit/94bae79f85b1207b44d69f028fd6876f7df4963c)), closes [#12630](https://github.com/UI5/webcomponents/issues/12630) [#12657](https://github.com/UI5/webcomponents/issues/12657) [#11946](https://github.com/UI5/webcomponents/issues/11946) [#12630](https://github.com/UI5/webcomponents/issues/12630) [#12657](https://github.com/UI5/webcomponents/issues/12657) [#11946](https://github.com/UI5/webcomponents/issues/11946)
* **ui5-time-picker:** add tooltip to icon in input ([#12671](https://github.com/UI5/webcomponents/issues/12671)) ([538deb0](https://github.com/UI5/webcomponents/commit/538deb023b1cb61c33edf900172223efaec5738d)), closes [#12616](https://github.com/UI5/webcomponents/issues/12616)


### Features

* **ui5-button:** add  `accessibilityInfo` getter ([#12704](https://github.com/UI5/webcomponents/issues/12704)) ([bb0670b](https://github.com/UI5/webcomponents/commit/bb0670bdb4054071cd5a1abc7c693d47a0e746cf))
* **ui5-input,ui5-multi-input:** dynamic suggestions triggering ([#12597](https://github.com/UI5/webcomponents/issues/12597)) ([d006cd6](https://github.com/UI5/webcomponents/commit/d006cd6ee89a796e56c99713dd6e3ae9726e6be5))
* **ui5-multi-combobox:** adjust validation behavior ([#12707](https://github.com/UI5/webcomponents/issues/12707)) ([7a4a7e1](https://github.com/UI5/webcomponents/commit/7a4a7e105f3e9f066427c420961f5130d8642778))
* **ui5-tokenizer:** add getFocusDomRef ([#12713](https://github.com/UI5/webcomponents/issues/12713)) ([bbda5a3](https://github.com/UI5/webcomponents/commit/bbda5a3fadc93c3997271e31e0bded6b2a496539))





# [2.17.0-rc.3](https://github.com/UI5/webcomponents/compare/v2.17.0-rc.2...v2.17.0-rc.3) (2025-11-20)


### Bug Fixes

* **ui5-color-palette-popover:** skip test ([#12690](https://github.com/UI5/webcomponents/issues/12690)) ([5347f7d](https://github.com/UI5/webcomponents/commit/5347f7dcc3289d939d227e1d499e0ae776c01237))
* **ui5-color-palette-popover:** skip test ([#12693](https://github.com/UI5/webcomponents/issues/12693)) ([3582597](https://github.com/UI5/webcomponents/commit/35825977d54fd099a01ffe96a16ac5947bfb99c2))
* **ui5-date-picker:** add correct tooltip when picker is opened ([#12669](https://github.com/UI5/webcomponents/issues/12669)) ([6598cdc](https://github.com/UI5/webcomponents/commit/6598cdcc0501f085f6ef3c0ebcefb2172be584b0)), closes [#12616](https://github.com/UI5/webcomponents/issues/12616)
* **ui5-date-picker:** add input CSS part for styling ([#12559](https://github.com/UI5/webcomponents/issues/12559)) ([cacdba0](https://github.com/UI5/webcomponents/commit/cacdba0c340eaecdcf2bc5964ddbbc42f942003c))
* **ui5-input:** align input margin to spec ([#12660](https://github.com/UI5/webcomponents/issues/12660)) ([e912c0b](https://github.com/UI5/webcomponents/commit/e912c0bb9be789a2280060952b4a4b1213cd1e9f))


### Features

* **framework:** scope theming css variables with component packages ([#12491](https://github.com/UI5/webcomponents/issues/12491)) ([43ff5de](https://github.com/UI5/webcomponents/commit/43ff5defaf6e08bac848df3d2d34943de15bee83))
* **ui5-color-picker:** update accessibility ([#12556](https://github.com/UI5/webcomponents/issues/12556)) ([56cd503](https://github.com/UI5/webcomponents/commit/56cd503e2570594a62914a51591b9c6277eae7f0))





# [2.17.0-rc.2](https://github.com/UI5/webcomponents/compare/v2.17.0-rc.1...v2.17.0-rc.2) (2025-11-13)


### Bug Fixes

* **ui5-popover:** fix horizontal placement (Start and End) in rtl mode ([#12606](https://github.com/UI5/webcomponents/issues/12606)) ([8135904](https://github.com/UI5/webcomponents/commit/813590444b04dda4fa089499720d6e2fc4a1f63e))
* **ui5-slider/ui5-range-slider:** add border to progress indicator ([#12653](https://github.com/UI5/webcomponents/issues/12653)) ([e9fa794](https://github.com/UI5/webcomponents/commit/e9fa7948cfbc44f7d5396274e00d2e0d8b4e459b))


### Features

* **ui5-bar:** introduce `accessibleName` and `accessibleNameRef` properties ([#12626](https://github.com/UI5/webcomponents/issues/12626)) ([984f829](https://github.com/UI5/webcomponents/commit/984f829d615140b1f80139afe67dc8bb559a4ccf)), closes [#12591](https://github.com/UI5/webcomponents/issues/12591)
* **ui5-toolbar-button:** add showOverflowText property for conditional text display ([#12542](https://github.com/UI5/webcomponents/issues/12542)) ([7e2a07d](https://github.com/UI5/webcomponents/commit/7e2a07d928e68d95421844eb2d9d9042d3aaa8fc)), closes [#12381](https://github.com/UI5/webcomponents/issues/12381)





# [2.17.0-rc.1](https://github.com/UI5/webcomponents/compare/v2.17.0-rc.0...v2.17.0-rc.1) (2025-11-07)


### Bug Fixes

* **ui5-multi-combobox:** skip unstable tests temporarily ([#12641](https://github.com/UI5/webcomponents/issues/12641)) ([78cc5e7](https://github.com/UI5/webcomponents/commit/78cc5e7b308dbe680344f5e56159776c39eec8ec)), closes [#12534](https://github.com/UI5/webcomponents/issues/12534) [#12607](https://github.com/UI5/webcomponents/issues/12607)





# [2.17.0-rc.0](https://github.com/UI5/webcomponents/compare/v2.16.1-rc.0...v2.17.0-rc.0) (2025-11-06)

**Note:** Version bump only for package @ui5/webcomponents





## [2.16.1-rc.0](https://github.com/UI5/webcomponents/compare/v2.16.0...v2.16.1-rc.0) (2025-11-06)

**Note:** Version bump only for package @ui5/webcomponents





# [2.16.0](https://github.com/UI5/webcomponents/compare/v2.16.0-rc.3...v2.16.0) (2025-11-05)


### Bug Fixes

* **ui5-button:** remove reference to last clicked button ([#12370](https://github.com/UI5/webcomponents/issues/12370)) ([d9bbac7](https://github.com/UI5/webcomponents/commit/d9bbac7a0e02ef760dcdce4b5d1c0e39d192aaf0)), closes [#11865](https://github.com/UI5/webcomponents/issues/11865)
* **ui5-carousel:** add aria-label to the list element ([#12587](https://github.com/UI5/webcomponents/issues/12587)) ([fa59293](https://github.com/UI5/webcomponents/commit/fa5929388c8c3bfe6346af0f190a33cb44cf8e86))
* **ui5-color-palette-item:** remove inline styles ([#12558](https://github.com/UI5/webcomponents/issues/12558)) ([6aed82d](https://github.com/UI5/webcomponents/commit/6aed82d255ca4ee539b74cf8d54853eaad9e5110)), closes [#12550](https://github.com/UI5/webcomponents/issues/12550)
* **ui5-color-palette:** enhance HOME/END navigation from any row position ([#12504](https://github.com/UI5/webcomponents/issues/12504)) ([9f8d565](https://github.com/UI5/webcomponents/commit/9f8d565843a4f0f490d6e8c5b1b452fa305d7447))
* **ui5-date-picker:** apply value format in event detail ([#12615](https://github.com/UI5/webcomponents/issues/12615)) ([74aa404](https://github.com/UI5/webcomponents/commit/74aa404ef2733e7752ffbf2f0977bcb0cb97e6fb)), closes [#12580](https://github.com/UI5/webcomponents/issues/12580)
* **ui5-dynamic-date-range:** skip test ([#12602](https://github.com/UI5/webcomponents/issues/12602)) ([0d36c6a](https://github.com/UI5/webcomponents/commit/0d36c6a54fc0a0ec6050d283879c4c34c099ce0e)), closes [#12601](https://github.com/UI5/webcomponents/issues/12601)
* **ui5-popover:** header shadow is restored in high contrast themes ([#12566](https://github.com/UI5/webcomponents/issues/12566)) ([341b467](https://github.com/UI5/webcomponents/commit/341b4673e62fc2e16d1d9481caf6633c6d80241f)), closes [#12530](https://github.com/UI5/webcomponents/issues/12530)
* **ui5-segmented-button:** correct active/down state background ([#12497](https://github.com/UI5/webcomponents/issues/12497)) ([6faee2d](https://github.com/UI5/webcomponents/commit/6faee2df0d5b3f1b4876e83c0b27be9a30345ffd))
* **ui5-switch:** prevent toggle when Space is pressed with Shift or Escape ([e50d4c7](https://github.com/UI5/webcomponents/commit/e50d4c72d08287d106d95bca5da437fab60afeb3))
* **ui5-toggle-button:** align active state styling with hover state when pressed ([#12486](https://github.com/UI5/webcomponents/issues/12486)) ([ca81343](https://github.com/UI5/webcomponents/commit/ca8134391ead238923979f4de2212d544d7ffa86))


### Features

* **ui5-ai-input:** introduce new component ([#12407](https://github.com/UI5/webcomponents/issues/12407)) ([6344333](https://github.com/UI5/webcomponents/commit/6344333eb7259c180c309ab18a3a21b6272e5a10))
* **ui5-checkbox:** implement accessibilityInfo getter ([#12527](https://github.com/UI5/webcomponents/issues/12527)) ([d9b42bc](https://github.com/UI5/webcomponents/commit/d9b42bc7fc2bdcc2a29fbe0f7d6729d445227003))
* **ui5-form, ui5-form-group:** add accessibleNameRef ([#12595](https://github.com/UI5/webcomponents/issues/12595)) ([dbfe7c5](https://github.com/UI5/webcomponents/commit/dbfe7c5b0f68ddb662ff9947038b5ef115a66139))
* **ui5-form:** enhance a11y using description list ([#12365](https://github.com/UI5/webcomponents/issues/12365)) ([28994f1](https://github.com/UI5/webcomponents/commit/28994f1ba69e211580fc280c73bd2f47e3827dff))
* **ui5-segmented-button:** replace the enum property contentMode with boolean one ([0a71381](https://github.com/UI5/webcomponents/commit/0a7138118f2b1556450dcd99a7e2586064fcd251))
* **ui5-select:** adds new prop textSeparator ([086a92a](https://github.com/UI5/webcomponents/commit/086a92a49d05a9b25a2b645d06a5b597ecbd143e))





# [2.16.0-rc.3](https://github.com/UI5/webcomponents/compare/v2.16.0-rc.2...v2.16.0-rc.3) (2025-10-30)


### Bug Fixes

* **ui5-button, ui5-split-button:** align menu button items on the left ([8cd3208](https://github.com/UI5/webcomponents/commit/8cd320870ae1eef0ada828fe05cb1fb1ffa79c63))
* **ui5-carousel:** exclude hidden items from rendering and navigation ([#12498](https://github.com/UI5/webcomponents/issues/12498)) ([8ddfab2](https://github.com/UI5/webcomponents/commit/8ddfab215e0aa24b02fa69ad361247fb35fce1fa))
* **ui5-multi-combobox:** handle composition with validation ([#12501](https://github.com/UI5/webcomponents/issues/12501)) ([20838ab](https://github.com/UI5/webcomponents/commit/20838ab7b5bfa9635ca6a87a58b12a530ed8ef76))


### Features

* **ui5-ai-textarea:** add samples and docs ([#12561](https://github.com/UI5/webcomponents/issues/12561)) ([00e89ff](https://github.com/UI5/webcomponents/commit/00e89ff7976bd2b0357afaeed960207bacd42c11))
* **ui5-menu:** add placement api ([#12554](https://github.com/UI5/webcomponents/issues/12554)) ([bf7ed56](https://github.com/UI5/webcomponents/commit/bf7ed569cb5aa44d28dec4babe1922b87a4cc81f))





# [2.16.0-rc.2](https://github.com/UI5/webcomponents/compare/v2.16.0-rc.1...v2.16.0-rc.2) (2025-10-23)


### Bug Fixes

* **ui5-button:** move button type text from aria-label to aria-description ([#12474](https://github.com/UI5/webcomponents/issues/12474)) ([b444706](https://github.com/UI5/webcomponents/commit/b444706ecfa60e4400b2cf6a8fd78a2416738e07)), closes [#12413](https://github.com/UI5/webcomponents/issues/12413)
* **ui5-calendar:** remove auto-focus logic from onAfterRendering() hook ([#12465](https://github.com/UI5/webcomponents/issues/12465)) ([12f391f](https://github.com/UI5/webcomponents/commit/12f391fc3ca28c8be54cbdd65eaf5dc52a7b1d5a))
* **ui5-calendar:** skip failing test ([#12522](https://github.com/UI5/webcomponents/issues/12522)) ([185ea04](https://github.com/UI5/webcomponents/commit/185ea0436e064c9cc9d6c3c0d588ed9784962c96))
* **ui5-combobox:** announce ComboBox selected item properly ([#12300](https://github.com/UI5/webcomponents/issues/12300)) ([2e77d3f](https://github.com/UI5/webcomponents/commit/2e77d3f70a3fe340bc380dc1f52c97f84b091245))
* **ui5-multi-combobox:** fix long token deletion ([#12514](https://github.com/UI5/webcomponents/issues/12514)) ([38a5049](https://github.com/UI5/webcomponents/commit/38a5049b82351cabc5e1a0801fe3e58766c1a24b)), closes [#12423](https://github.com/UI5/webcomponents/issues/12423)
* **ui5-multi-input:** fire change event on enter ([#12516](https://github.com/UI5/webcomponents/issues/12516)) ([8664743](https://github.com/UI5/webcomponents/commit/86647437f7db53b60dd200188c4570ba4369edc1))
* **ui5-step-input:** make popover specs fit content ([#12520](https://github.com/UI5/webcomponents/issues/12520)) ([9910739](https://github.com/UI5/webcomponents/commit/99107390ccb3a63175b26d6aa72a0034de586acc)), closes [#10246](https://github.com/UI5/webcomponents/issues/10246)
* **ui5-time-picker:** Add interactive mode for the icon on mobile devices ([#12500](https://github.com/UI5/webcomponents/issues/12500)) ([a52e4c1](https://github.com/UI5/webcomponents/commit/a52e4c1b73811925b12fe8b35ea453367eafb652))


### Features

* **ui5-dynamic-date-range:** implement date time  from to options ([#12312](https://github.com/UI5/webcomponents/issues/12312)) ([f0bdc9a](https://github.com/UI5/webcomponents/commit/f0bdc9a7dc96cf8ae24a8107eb8bc0d1b7e5fdc5))
* **ui5-dynamic-date-range:** introduce From/To (Date & Time) option  ([#12341](https://github.com/UI5/webcomponents/issues/12341)) ([fd0d36f](https://github.com/UI5/webcomponents/commit/fd0d36f929f64ab5ab1b567b9408b62447429e86)), closes [#12182](https://github.com/UI5/webcomponents/issues/12182)
* **ui5-form-group:** introduce accessibleName property ([#12496](https://github.com/UI5/webcomponents/issues/12496)) ([3bbfe93](https://github.com/UI5/webcomponents/commit/3bbfe93206278485cda37431d7ba43e0f7da4dd7))
* **ui5-table:** alternateRowColors property added ([#12468](https://github.com/UI5/webcomponents/issues/12468)) ([588fbbf](https://github.com/UI5/webcomponents/commit/588fbbf3df8648402e8a8d588ce90fe1de0a330f)), closes [#11597](https://github.com/UI5/webcomponents/issues/11597) [#11143](https://github.com/UI5/webcomponents/issues/11143) [#11597](https://github.com/UI5/webcomponents/issues/11597) [#11143](https://github.com/UI5/webcomponents/issues/11143)





# [2.16.0-rc.1](https://github.com/UI5/webcomponents/compare/v2.16.0-rc.0...v2.16.0-rc.1) (2025-10-16)


### Bug Fixes

* apply @custom-elements-manifest/analyzer patch ([#12441](https://github.com/UI5/webcomponents/issues/12441)) ([a9ec6e2](https://github.com/UI5/webcomponents/commit/a9ec6e217bb59dbffb0db79c6008cecf77bc0649))
* **ui5-bar:** truncate long content in startContent slot ([8482891](https://github.com/UI5/webcomponents/commit/8482891934c8148470815129ca4494a5a9ba4dc3))
* **ui5-button:** prioritize accessibleName over button text in aria-label ([#12473](https://github.com/UI5/webcomponents/issues/12473)) ([68e6a3e](https://github.com/UI5/webcomponents/commit/68e6a3e43eaad261414a68d18ab8dfac37a2124b)), closes [#12398](https://github.com/UI5/webcomponents/issues/12398)
* **ui5-date-picker:** adjust value state message text ([#12245](https://github.com/UI5/webcomponents/issues/12245)) ([8d32312](https://github.com/UI5/webcomponents/commit/8d3231276a36a32b5055c247ec0b989b30f4f11a)), closes [#11803](https://github.com/UI5/webcomponents/issues/11803)
* **ui5-date-picker:** open picker on correct view based on valueFormat/formatPattern ([#12436](https://github.com/UI5/webcomponents/issues/12436)) ([b55b301](https://github.com/UI5/webcomponents/commit/b55b30141e99b759877354bebbb18e89366e9539))
* **ui5-datetime-picker:** restore last valid value ([#12202](https://github.com/UI5/webcomponents/issues/12202)) ([2e2f882](https://github.com/UI5/webcomponents/commit/2e2f88255326b9f59074fa000c71bb38bf363f05))
* **ui5-dynamic-date-range:** focus last selected option, upon navigate back ([#12233](https://github.com/UI5/webcomponents/issues/12233)) ([e99d266](https://github.com/UI5/webcomponents/commit/e99d266a5ea81eb5ca256aa7190f4aa33edebdd9))
* **ui5-input:** prevent change firing when canceling on mobile ([#12420](https://github.com/UI5/webcomponents/issues/12420)) ([d9470dc](https://github.com/UI5/webcomponents/commit/d9470dc4f6758712c9f16d8b319cd18cf6609315)), closes [#9453](https://github.com/UI5/webcomponents/issues/9453)
* **ui5-list:** add missing accessible description for growing button ([#12463](https://github.com/UI5/webcomponents/issues/12463)) ([8cfdbf9](https://github.com/UI5/webcomponents/commit/8cfdbf954daac3c50276da08500e3c983baa79d8)), closes [#12443](https://github.com/UI5/webcomponents/issues/12443)
* **ui5-raiting-indicator:** visual spec alignment ([#12488](https://github.com/UI5/webcomponents/issues/12488)) ([9256d97](https://github.com/UI5/webcomponents/commit/9256d9707da53dd000f9764c88799ed39dd5bae4))
* **ui5-shellbar:** adjust sizes-parameters for shellbar ([#12462](https://github.com/UI5/webcomponents/issues/12462)) ([79adbee](https://github.com/UI5/webcomponents/commit/79adbeeea1cf72559d88318e5d763c350ae9a9d1))
* **ui5-side-navigation:** add parent item to submenu and enhance ACC ([#12457](https://github.com/UI5/webcomponents/issues/12457)) ([69a2413](https://github.com/UI5/webcomponents/commit/69a24138a0220fe724db0e4ac0e02e9814a93867))
* **ui5-split-button:** handle space on keyup properly ([e338e1c](https://github.com/UI5/webcomponents/commit/e338e1c2e6bbbf9812daa80a13e53331559a0f27))
* **ui5-tab-container:** improve overflow behavior test ([#12422](https://github.com/UI5/webcomponents/issues/12422)) ([cfef814](https://github.com/UI5/webcomponents/commit/cfef814ab1737a851fbd953565e95c7b9f7704c3)), closes [#12344](https://github.com/UI5/webcomponents/issues/12344)


### Features

* **ui5-carousel:** improve keyboard handling and update accessibility attributes ([#12256](https://github.com/UI5/webcomponents/issues/12256)) ([a4ec76e](https://github.com/UI5/webcomponents/commit/a4ec76e5993eb8d7b76f08c6b6d15909b8517db3)), closes [#11429](https://github.com/UI5/webcomponents/issues/11429) [#11515](https://github.com/UI5/webcomponents/issues/11515) [#11634](https://github.com/UI5/webcomponents/issues/11634) [#11873](https://github.com/UI5/webcomponents/issues/11873) [#11429](https://github.com/UI5/webcomponents/issues/11429)
* **ui5-segmented-button:** add api which controls items width behavior ([616c716](https://github.com/UI5/webcomponents/commit/616c716657289182ba0b679b7e6884f4785c8035))
* **ui5-textarea:** support accessible description and description ref ([#12470](https://github.com/UI5/webcomponents/issues/12470)) ([c6c23d1](https://github.com/UI5/webcomponents/commit/c6c23d19f9e7565b12bf095c169f6a069a427037)), closes [#12004](https://github.com/UI5/webcomponents/issues/12004)





# [2.16.0-rc.0](https://github.com/UI5/webcomponents/compare/v2.15.0...v2.16.0-rc.0) (2025-10-09)


### Bug Fixes

* **OpenUI5Support:** fix closing popups with escape key ([#12278](https://github.com/UI5/webcomponents/issues/12278)) ([f54e8af](https://github.com/UI5/webcomponents/commit/f54e8afe3339a98bbf214523aba17158d7eb505b))
* **ui5-list-item:** change highlight state color variables ([#12427](https://github.com/UI5/webcomponents/issues/12427)) ([485aab5](https://github.com/UI5/webcomponents/commit/485aab51242876f2a10580da2ed23783408df00b)), closes [#12332](https://github.com/UI5/webcomponents/issues/12332)
* **ui5-slider, ui5-range-slider:** persist tooltip visible on hover ([#12383](https://github.com/UI5/webcomponents/issues/12383)) ([0eb6258](https://github.com/UI5/webcomponents/commit/0eb62586bc708253eb4c711aecdde8407d2f44a0)), closes [#12329](https://github.com/UI5/webcomponents/issues/12329)
* **ui5-table:** invalidate header row when rows count changes ([#12439](https://github.com/UI5/webcomponents/issues/12439)) ([65b5507](https://github.com/UI5/webcomponents/commit/65b5507232d7853e98bc55ee9a08ef9b46f8bca5)), closes [#12161](https://github.com/UI5/webcomponents/issues/12161) [#11996](https://github.com/UI5/webcomponents/issues/11996)


### Features

* **ui5-date-picker:** normalize display value only on change ([#12425](https://github.com/UI5/webcomponents/issues/12425)) ([3e8357e](https://github.com/UI5/webcomponents/commit/3e8357ed04a4165bd04f86e5ee5b58cff3c73699))
* **ui5-select:** visible second column value and tooltip ([#12390](https://github.com/UI5/webcomponents/issues/12390)) ([54452e7](https://github.com/UI5/webcomponents/commit/54452e70e96b2cfd6e0b9cf663a54b0fed797f02))





# [2.15.0](https://github.com/UI5/webcomponents/compare/v2.15.0-rc.3...v2.15.0) (2025-10-03)


### Bug Fixes

* **ui5-datetime-picker:** render picker in playground samples ([#12393](https://github.com/UI5/webcomponents/issues/12393)) ([e486ea6](https://github.com/UI5/webcomponents/commit/e486ea6c6ff937c732714d233eae14dea50fc915))
* **ui5-table:** custom row announcements are set ([#12117](https://github.com/UI5/webcomponents/issues/12117)) ([dcf014e](https://github.com/UI5/webcomponents/commit/dcf014e9d95bfe36644f300674cec726f3ec5029))





# [2.15.0-rc.3](https://github.com/UI5/webcomponents/compare/v2.15.0-rc.2...v2.15.0-rc.3) (2025-10-02)


### Bug Fixes

* **ui5-combobox:** fire 'selection-change' event only after user inte… ([#12316](https://github.com/UI5/webcomponents/issues/12316)) ([f509612](https://github.com/UI5/webcomponents/commit/f50961264df4071a84214ca35d873037438aa706))
* **ui5-input, ui5-combobox, ui5-multi-combobox:** adjust cancel button position ([#12375](https://github.com/UI5/webcomponents/issues/12375)) ([a50f10c](https://github.com/UI5/webcomponents/commit/a50f10cb9b8d3a2da3e27449854c42e777a8c220)), closes [#12356](https://github.com/UI5/webcomponents/issues/12356)
* **ui5-tabcontainer:** Improve drag-and-drop to handle fast keyboard moves ([#12183](https://github.com/UI5/webcomponents/issues/12183)) ([ecf6298](https://github.com/UI5/webcomponents/commit/ecf6298ec3df124b83b21c181764eb3a0bf96b63))





# [2.15.0-rc.2](https://github.com/UI5/webcomponents/compare/v2.15.0-rc.1...v2.15.0-rc.2) (2025-09-25)

**Note:** Version bump only for package @ui5/webcomponents





# [2.15.0-rc.1](https://github.com/UI5/webcomponents/compare/v2.15.0-rc.0...v2.15.0-rc.1) (2025-09-25)


### Bug Fixes

* **ui5-card:** standardize border-radius variable usage and remove redundant definitions in sap_horizon themes ([#12323](https://github.com/UI5/webcomponents/issues/12323)) ([bc25e9f](https://github.com/UI5/webcomponents/commit/bc25e9f01ad7570a01365449fbda50946ecc28eb))
* **ui5-date-picker:** use variable for popover width in compact density mode ([#12305](https://github.com/UI5/webcomponents/issues/12305)) ([c410c3f](https://github.com/UI5/webcomponents/commit/c410c3f8694e2c2975e902aa059206a1ef8e01c4)), closes [#12277](https://github.com/UI5/webcomponents/issues/12277)
* **ui5-dialog:** fix dialog resizing in RTL mode when max-width is set ([#12304](https://github.com/UI5/webcomponents/issues/12304)) ([e7a538a](https://github.com/UI5/webcomponents/commit/e7a538a1a181e45be8a1ff17cc74326693325e56))
* **ui5-dialog:** fix RTL Dialog resizing to keep right edge anchored ([#12313](https://github.com/UI5/webcomponents/issues/12313)) ([e50d0b8](https://github.com/UI5/webcomponents/commit/e50d0b83f6ef4d0f3570e6559b6b834e32023d62)), closes [#12310](https://github.com/UI5/webcomponents/issues/12310)
* **ui5-dialog:** overstyling of the header is now possible ([#12252](https://github.com/UI5/webcomponents/issues/12252)) ([fbf1584](https://github.com/UI5/webcomponents/commit/fbf158464e5b658354f6de68958e54d8a6bab561)), closes [#12024](https://github.com/UI5/webcomponents/issues/12024)
* **ui5-segmented-button:** correct aria-multiselectable and aria-orientation="horizontal" ([#12270](https://github.com/UI5/webcomponents/issues/12270)) ([9864285](https://github.com/UI5/webcomponents/commit/98642857668624b5184ff6e725e0e7f7c47c3934)), closes [#12263](https://github.com/UI5/webcomponents/issues/12263)
* **ui5-select:** allow popover to extend beyond select width ([#12291](https://github.com/UI5/webcomponents/issues/12291)) ([4ad9725](https://github.com/UI5/webcomponents/commit/4ad9725d5227003770dcc6d3ce9b7032d9e7eb60))
* **ui5-select:** announce header text on mobile ([#11849](https://github.com/UI5/webcomponents/issues/11849)) ([972e6db](https://github.com/UI5/webcomponents/commit/972e6dba29d0966bcf3f4136be67114571a69745))
* **ui5-shellbar:** ensure avatar click event is triggered correctly ([#12055](https://github.com/UI5/webcomponents/issues/12055)) ([5bbb264](https://github.com/UI5/webcomponents/commit/5bbb2645a79df9b75cf2407cc2a1d47d2e4489d4)), closes [#11920](https://github.com/UI5/webcomponents/issues/11920)
* **ui5-tokenizer:** scroll to end when adding tokens from suggestions ([#12242](https://github.com/UI5/webcomponents/issues/12242)) ([f2cd8c4](https://github.com/UI5/webcomponents/commit/f2cd8c45d1aad7dc23f52c36f88a1d106a66f722))
* **ui5-toolbar:** fix async toolbar tests ([#12330](https://github.com/UI5/webcomponents/issues/12330)) ([ddd6cbd](https://github.com/UI5/webcomponents/commit/ddd6cbd7b68d8fc95b1f13d174c87c9071ea923d))
* **ui5-toolbar:** prevent flickering ([#12285](https://github.com/UI5/webcomponents/issues/12285)) ([f7f98d6](https://github.com/UI5/webcomponents/commit/f7f98d652f8e14c5eab4879416e199ca87592679))
* **ui5-toolbar:** prevent flickering on item state changes ([#12222](https://github.com/UI5/webcomponents/issues/12222)) ([669262b](https://github.com/UI5/webcomponents/commit/669262b14bb522dc3699d5b49c771aa6862528a0)), closes [#12209](https://github.com/UI5/webcomponents/issues/12209)


### Features

* **ui5-button, ui5-ai-button:** extend accessibility ([f6a0504](https://github.com/UI5/webcomponents/commit/f6a05045b7b07afca69b9dec7049649607f488f3))
* **ui5-input,ui5-multi-input,ui5-combobox,ui5-multi-combobox:** comp… ([#12292](https://github.com/UI5/webcomponents/issues/12292)) ([4a9f238](https://github.com/UI5/webcomponents/commit/4a9f23898799feab90beeb5decdf90779ac532e4))
* **ui5-tokenizer:** enable tokenizer in forms ([#12248](https://github.com/UI5/webcomponents/issues/12248)) ([c16ca9e](https://github.com/UI5/webcomponents/commit/c16ca9e44730e3d21204f0308c7c2da63b597b81))





# [2.15.0-rc.0](https://github.com/UI5/webcomponents/compare/v2.14.0...v2.15.0-rc.0) (2025-09-11)


### Bug Fixes

* **f6navigation:** backward navigation in N level nesting ([#12279](https://github.com/UI5/webcomponents/issues/12279)) ([2fb71a7](https://github.com/UI5/webcomponents/commit/2fb71a779cce8b6671637c4ecfaeac4c15a7be88)), closes [#12268](https://github.com/UI5/webcomponents/issues/12268)
* **ui5-calendar:** improve accessibility announcements ([#12262](https://github.com/UI5/webcomponents/issues/12262)) ([700c34e](https://github.com/UI5/webcomponents/commit/700c34eafb2003d1f88fc46f8ec7890d454ec335))
* **ui5-list:** growing with scroll improved ([#12087](https://github.com/UI5/webcomponents/issues/12087)) ([8edc111](https://github.com/UI5/webcomponents/commit/8edc1114c1a08005483a18dd04f23cdf9e050b5c)), closes [#1](https://github.com/UI5/webcomponents/issues/1) [#2](https://github.com/UI5/webcomponents/issues/2)
* **ui5-multi-input:** prevent form submission on enter ([#12273](https://github.com/UI5/webcomponents/issues/12273)) ([31bdcd8](https://github.com/UI5/webcomponents/commit/31bdcd8847268388bf555a1d7ab281b1ec0981d1)), closes [#12167](https://github.com/UI5/webcomponents/issues/12167)
* **ui5-tabcontainer:** correct focus handling in overflow modes ([#12259](https://github.com/UI5/webcomponents/issues/12259)) ([da27ed5](https://github.com/UI5/webcomponents/commit/da27ed5fae25f8ced0ec24dd5d925b1abc5c69a5)), closes [#12027](https://github.com/UI5/webcomponents/issues/12027)
* **ui5-textarea:** adjust width in high contrast themes ([#12267](https://github.com/UI5/webcomponents/issues/12267)) ([89e86ce](https://github.com/UI5/webcomponents/commit/89e86cead5d6aaa49f1dba1193e4235b694c0040)), closes [#12229](https://github.com/UI5/webcomponents/issues/12229)





# [2.14.0](https://github.com/SAP/ui5-webcomponents/compare/v2.14.0-rc.7...v2.14.0) (2025-09-04)


### Bug Fixes

* **ui5-breadcrumbs:** enable current location text truncation ([#12220](https://github.com/SAP/ui5-webcomponents/issues/12220)) ([1014b34](https://github.com/SAP/ui5-webcomponents/commit/1014b344578b3aeda3264c6affccc192df28bcc0)), closes [#12219](https://github.com/SAP/ui5-webcomponents/issues/12219) [#12219](https://github.com/SAP/ui5-webcomponents/issues/12219)





# [2.14.0-rc.7](https://github.com/SAP/ui5-webcomponents/compare/v2.14.0-rc.6...v2.14.0-rc.7) (2025-09-04)


### Bug Fixes

* **OpenUI5Support:** improve focus handling for OpenUI5 and Web Component popups ([#12230](https://github.com/SAP/ui5-webcomponents/issues/12230)) ([6937756](https://github.com/SAP/ui5-webcomponents/commit/6937756e40b3dc5c8fd6ed0db8c2920328e2b6b2))
* **popups:** remove popover focus styling after keyboard interaction ([#12239](https://github.com/SAP/ui5-webcomponents/issues/12239)) ([2df7138](https://github.com/SAP/ui5-webcomponents/commit/2df7138cffdc16b83971dca7ff96b72f9dc2a355)), closes [#12231](https://github.com/SAP/ui5-webcomponents/issues/12231)
* **ScrollbarStyles:** introduce centralized scrollbar styling ([#12207](https://github.com/SAP/ui5-webcomponents/issues/12207)) ([5481bb3](https://github.com/SAP/ui5-webcomponents/commit/5481bb3f1e3f78dc3a0cb13a16c97d19f176ed37))
* **ui5-color-palette:** adjust keyboard navigation ([#12107](https://github.com/SAP/ui5-webcomponents/issues/12107)) ([53b1f26](https://github.com/SAP/ui5-webcomponents/commit/53b1f26573e49ba24b6aae5586265acd910a65fd)), closes [#8744](https://github.com/SAP/ui5-webcomponents/issues/8744) [#11439](https://github.com/SAP/ui5-webcomponents/issues/11439)
* **ui5-combobox:** prevent whitespace below value state when no items are present ([#12218](https://github.com/SAP/ui5-webcomponents/issues/12218)) ([546f0fb](https://github.com/SAP/ui5-webcomponents/commit/546f0fb11f8d69be173df0de188326eb8b24a24d))
* **ui5-file-uploader:** adjust tokenizer collapse behaviour ([#12250](https://github.com/SAP/ui5-webcomponents/issues/12250)) ([4bc8ba7](https://github.com/SAP/ui5-webcomponents/commit/4bc8ba706c457c3dae7cfd444bf72d3d0dae598c))
* **ui5-form-item:** update host element display ([#12208](https://github.com/SAP/ui5-webcomponents/issues/12208)) ([bd9299e](https://github.com/SAP/ui5-webcomponents/commit/bd9299e884215375b52badca943aae68d1e77d6a)), closes [#12201](https://github.com/SAP/ui5-webcomponents/issues/12201)
* **ui5-input:** emit change when suggestion is clicked ([#12206](https://github.com/SAP/ui5-webcomponents/issues/12206)) ([50bb5e6](https://github.com/SAP/ui5-webcomponents/commit/50bb5e670a6b47be68ecd818bb07adcfe845c638))
* **ui5-input:** fire submit only if single input in a form ([#12244](https://github.com/SAP/ui5-webcomponents/issues/12244)) ([0944107](https://github.com/SAP/ui5-webcomponents/commit/094410778394c9423c547f9270da5ecebad68b3e)), closes [#12221](https://github.com/SAP/ui5-webcomponents/issues/12221)
* **ui5-responsive-popover:** fix open/close state, when initially open ([#12236](https://github.com/SAP/ui5-webcomponents/issues/12236)) ([5b269ed](https://github.com/SAP/ui5-webcomponents/commit/5b269edfadecac413c5dfbb3c3f6fe0c27eab1f5)), closes [#12225](https://github.com/SAP/ui5-webcomponents/issues/12225)
* **ui5-segmented-button:** fix hover+active segmented button item background ([#12234](https://github.com/SAP/ui5-webcomponents/issues/12234)) ([abf5555](https://github.com/SAP/ui5-webcomponents/commit/abf555530c951618996c539c8dc4eee8433fe668))
* **ui5-segmented-button:** hidden items do not take space ([#12210](https://github.com/SAP/ui5-webcomponents/issues/12210)) ([e5fff1c](https://github.com/SAP/ui5-webcomponents/commit/e5fff1cea51c84a650f756e01bf7260e2c5d9227))





# [2.14.0-rc.6](https://github.com/SAP/ui5-webcomponents/compare/v2.14.0-rc.5...v2.14.0-rc.6) (2025-08-29)


### Bug Fixes

* **ui5-color-picker:** sanitize input by removing '#' from hex value ([#12185](https://github.com/SAP/ui5-webcomponents/issues/12185)) ([ea60f3a](https://github.com/SAP/ui5-webcomponents/commit/ea60f3aa436157763bdea35ffabbdc6892ef2f5f)), closes [#11417](https://github.com/SAP/ui5-webcomponents/issues/11417)
* **ui5-segmented-button:** fix action cancellation with Shift or Esc ([#12176](https://github.com/SAP/ui5-webcomponents/issues/12176)) ([5521ab6](https://github.com/SAP/ui5-webcomponents/commit/5521ab644a31e5aa944b465473acb7db9c8076f9))
* **ui5-slider:** fire uphandler when mouse leaves the window ([#12192](https://github.com/SAP/ui5-webcomponents/issues/12192)) ([ba2b7d0](https://github.com/SAP/ui5-webcomponents/commit/ba2b7d00a40eedfa58911d4ff6cdf3d3b323bf35)), closes [#11460](https://github.com/SAP/ui5-webcomponents/issues/11460)


### Features

* **ui5-segmented-button:** improve component accessibility ([#12198](https://github.com/SAP/ui5-webcomponents/issues/12198)) ([bf232e9](https://github.com/SAP/ui5-webcomponents/commit/bf232e94c64fa933c868262e412ea31791567bc0))





# [2.14.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v2.14.0-rc.4...v2.14.0-rc.5) (2025-08-28)


### Bug Fixes

* **ui5-tabcontainer:** update tabs in strip properly ([#12190](https://github.com/SAP/ui5-webcomponents/issues/12190)) ([7a966ef](https://github.com/SAP/ui5-webcomponents/commit/7a966ef7df6980c90f7390c79ba9e36b6851caca)), closes [#11087](https://github.com/SAP/ui5-webcomponents/issues/11087)


### Features

* **ui5-date-picker:** provide accessible description API ([#11831](https://github.com/SAP/ui5-webcomponents/issues/11831)) ([df8804a](https://github.com/SAP/ui5-webcomponents/commit/df8804a347ec30fc2d6faa2b4c1a5ba229273f6c)), closes [#12004](https://github.com/SAP/ui5-webcomponents/issues/12004)





# [2.14.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v2.14.0-rc.3...v2.14.0-rc.4) (2025-08-25)


### Bug Fixes

* **DnD:** fix drag and drop in Shadow DOM ([#11975](https://github.com/SAP/ui5-webcomponents/issues/11975)) ([fb561aa](https://github.com/SAP/ui5-webcomponents/commit/fb561aa92fdc2d9dddfab9d5ec15bf90ff3a979c))
* **ui5-dialog:** initial dimensions are now calculated at once ([#12108](https://github.com/SAP/ui5-webcomponents/issues/12108)) ([2c97806](https://github.com/SAP/ui5-webcomponents/commit/2c97806e85c0ec5b130df14cab7981c10dd35f19))





# [2.14.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.14.0-rc.2...v2.14.0-rc.3) (2025-08-22)


### Bug Fixes

* **f6navigation:** skip non-element nodes when resolving groups ([#12174](https://github.com/SAP/ui5-webcomponents/issues/12174)) ([060af95](https://github.com/SAP/ui5-webcomponents/commit/060af95baf3273a8dc09460122e3dc76bf5f5a1c))
* **framework:** improve CSS variables from OpenUI5 detection ([#12177](https://github.com/SAP/ui5-webcomponents/issues/12177)) ([9199825](https://github.com/SAP/ui5-webcomponents/commit/9199825e6aecb9c407f6e67d8768025233e10f16))
* **ui5-select-popover:** align title in header on phone ([#12085](https://github.com/SAP/ui5-webcomponents/issues/12085)) ([843152e](https://github.com/SAP/ui5-webcomponents/commit/843152e410d2deee9b8b39786602b7340d3884db)), closes [#11956](https://github.com/SAP/ui5-webcomponents/issues/11956)
* **ui5-toast:** fix toast spacing in safari ([79a784b](https://github.com/SAP/ui5-webcomponents/commit/79a784b21da0681899711c7140f1cc3ae346d665))





# [2.14.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.14.0-rc.1...v2.14.0-rc.2) (2025-08-21)


### Bug Fixes

* **ui5-checkbox:** fix focus spacing ([#12100](https://github.com/SAP/ui5-webcomponents/issues/12100)) ([a8e8dd1](https://github.com/SAP/ui5-webcomponents/commit/a8e8dd1bf9b21448a3e2fa991704522d1a3bc6c1))
* **ui5-message-strip:** align message strip announcements with latest figma ([#12135](https://github.com/SAP/ui5-webcomponents/issues/12135)) ([176a02a](https://github.com/SAP/ui5-webcomponents/commit/176a02afe5164dcf1b64303114b4f01df7a960fa))
* **ui5-search:** improve arrow navigation with grouping  ([#12083](https://github.com/SAP/ui5-webcomponents/issues/12083)) ([c428f77](https://github.com/SAP/ui5-webcomponents/commit/c428f77f65967813baa607a379175836c35040a4))
* **ui5-select:** prevent crash on ArrowUp/Down when value matches no option ([#12094](https://github.com/SAP/ui5-webcomponents/issues/12094)) ([c15bcc9](https://github.com/SAP/ui5-webcomponents/commit/c15bcc9f475db9297fa0c450f54164eee7d6549e)), closes [#12093](https://github.com/SAP/ui5-webcomponents/issues/12093)
* **ui5-textarea:** correct row behavior in MS Edge ([#12136](https://github.com/SAP/ui5-webcomponents/issues/12136)) ([b3abf2d](https://github.com/SAP/ui5-webcomponents/commit/b3abf2db3f565ff4bf373d2402677eba83f84ba3))
* **ui5-textarea:** escape interaction can now be prevented ([#12122](https://github.com/SAP/ui5-webcomponents/issues/12122)) ([e548778](https://github.com/SAP/ui5-webcomponents/commit/e548778eee78165a492557dff34575dd9d3d8840))


### Features

* **framework:** adds `unsafeRegisterIcon` base method for custom SVG icons ([#12145](https://github.com/SAP/ui5-webcomponents/issues/12145)) ([3b67132](https://github.com/SAP/ui5-webcomponents/commit/3b67132f6293a76b3bbc10f5fb3080d75fba10e5)), closes [#clip0_2221_23716](https://github.com/SAP/ui5-webcomponents/issues/clip0_2221_23716)
* **ui5-calendar:** expose shadow parts for YearRangePicker and CalendarHeader arrows ([#12114](https://github.com/SAP/ui5-webcomponents/issues/12114)) ([ada0d1a](https://github.com/SAP/ui5-webcomponents/commit/ada0d1abddc4cce6fb2f45855475b8811dcd380c)), closes [#0070f2](https://github.com/SAP/ui5-webcomponents/issues/0070f2) [#0070f2](https://github.com/SAP/ui5-webcomponents/issues/0070f2) [#e5e5e5](https://github.com/SAP/ui5-webcomponents/issues/e5e5e5)
* **ui5-select:** add accessibleDescription and accessibleDescriptionRef ([#12081](https://github.com/SAP/ui5-webcomponents/issues/12081)) ([7152726](https://github.com/SAP/ui5-webcomponents/commit/71527260db9abf8b0f9737421672b96aa737c3e9)), closes [#12004](https://github.com/SAP/ui5-webcomponents/issues/12004)





# [2.14.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.14.0-rc.0...v2.14.0-rc.1) (2025-08-14)


### Bug Fixes

* **ui5-button:** announce the text node properly ([#12077](https://github.com/SAP/ui5-webcomponents/issues/12077)) ([684f1fc](https://github.com/SAP/ui5-webcomponents/commit/684f1fc60e20ae5a33784399f91fc1533f14afba))
* **ui5-list-item:** adjust line height for byline ([#12063](https://github.com/SAP/ui5-webcomponents/issues/12063)) ([191b700](https://github.com/SAP/ui5-webcomponents/commit/191b700cbe707b0155b97cead1bb7dd7e930c1ee))
* **ui5-select:** aria-controls attr added ([#12050](https://github.com/SAP/ui5-webcomponents/issues/12050)) ([39f8e66](https://github.com/SAP/ui5-webcomponents/commit/39f8e664d6a02a4675ff79ff44ca7c231c998cce)), closes [#12018](https://github.com/SAP/ui5-webcomponents/issues/12018)


### Features

* **ui5-dynamic-date-range:** introduce last/next X options ([#11621](https://github.com/SAP/ui5-webcomponents/issues/11621)) ([50fd58d](https://github.com/SAP/ui5-webcomponents/commit/50fd58d734a2bfda646d79eb099172121a3635d7))
* **ui5-product-switch-item:** added image slot ([#11965](https://github.com/SAP/ui5-webcomponents/issues/11965)) ([79903f4](https://github.com/SAP/ui5-webcomponents/commit/79903f4fbc83a9a67ee851b175c04b9eaf533cdb))





# [2.14.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.13.0...v2.14.0-rc.0) (2025-08-07)


### Bug Fixes

* **ui5-search:** visual issues ([#12061](https://github.com/SAP/ui5-webcomponents/issues/12061)) ([6aab670](https://github.com/SAP/ui5-webcomponents/commit/6aab670027a9ea08b01f42b2a8467499966990d2)), closes [#11982](https://github.com/SAP/ui5-webcomponents/issues/11982) [#11964](https://github.com/SAP/ui5-webcomponents/issues/11964) [#11981](https://github.com/SAP/ui5-webcomponents/issues/11981) [#11999](https://github.com/SAP/ui5-webcomponents/issues/11999) [#12042](https://github.com/SAP/ui5-webcomponents/issues/12042) [#11955](https://github.com/SAP/ui5-webcomponents/issues/11955)
* **ui5-shellbar:** separator height is fixed ([#12056](https://github.com/SAP/ui5-webcomponents/issues/12056)) ([0995652](https://github.com/SAP/ui5-webcomponents/commit/0995652783f2abd8afad99610213866d2881b261))


### Features

* **ui5-date-picker:** add valueFormat and displayFormat ([#11751](https://github.com/SAP/ui5-webcomponents/issues/11751)) ([2acdbcc](https://github.com/SAP/ui5-webcomponents/commit/2acdbcc4f6e59b01987c7a9456d455bccecf3a8e)), closes [#1957](https://github.com/SAP/ui5-webcomponents/issues/1957)





# [2.13.0](https://github.com/SAP/ui5-webcomponents/compare/v2.13.0-rc.3...v2.13.0) (2025-08-04)


### Bug Fixes

* **ui5-color-picker:** ensure RGB and HSL values are within limits ([#11915](https://github.com/SAP/ui5-webcomponents/issues/11915)) ([0cee9f7](https://github.com/SAP/ui5-webcomponents/commit/0cee9f71d154dcc699b45d9a5755d7fc17644785))


### Features

* **ui5-icon:** display custom SVG, defined as JSX template ([#11966](https://github.com/SAP/ui5-webcomponents/issues/11966)) ([1e7e2a6](https://github.com/SAP/ui5-webcomponents/commit/1e7e2a6a155bb36e0cd50ebea6ac6e30e47f8da6))
* **ui5-input:** align value state message to spec ([#12017](https://github.com/SAP/ui5-webcomponents/issues/12017)) ([793038b](https://github.com/SAP/ui5-webcomponents/commit/793038b16b8f9a2de06325602e41b316c6267ab0))
* **ui5-li-group:** introduced wrappingType prop ([#12022](https://github.com/SAP/ui5-webcomponents/issues/12022)) ([4c1a506](https://github.com/SAP/ui5-webcomponents/commit/4c1a50661fdc349682ff4c8fc1bb28d9eb43f5b2))
* **ui5-popover:** support setting "null" for opener ([#11995](https://github.com/SAP/ui5-webcomponents/issues/11995)) ([7d012aa](https://github.com/SAP/ui5-webcomponents/commit/7d012aa5667143f4bbdbb9310771dc296de12cbe))





# [2.13.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.13.0-rc.2...v2.13.0-rc.3) (2025-07-31)


### Bug Fixes

* **ui5-combobox:** fire selection-change event on item selection ([#12036](https://github.com/SAP/ui5-webcomponents/issues/12036)) ([a1e763d](https://github.com/SAP/ui5-webcomponents/commit/a1e763d4d6fa6fb1571d72dd77de5e3f21478054)), closes [#12003](https://github.com/SAP/ui5-webcomponents/issues/12003) [#10239](https://github.com/SAP/ui5-webcomponents/issues/10239)
* **ui5-combobox:** handle scrolling to selected item on popover open ([#11938](https://github.com/SAP/ui5-webcomponents/issues/11938)) ([fecbc81](https://github.com/SAP/ui5-webcomponents/commit/fecbc81af1278292948396f6eab5575af7dc9ddb))
* **ui5-file-uploader:** adjust tokenizer expand/collapse behaviour ([#11985](https://github.com/SAP/ui5-webcomponents/issues/11985)) ([5e2c0fd](https://github.com/SAP/ui5-webcomponents/commit/5e2c0fd1809919bfce9bba078b58b78f43710e24))
* **ui5-file-uploader:** react on focus out only when needed ([#11989](https://github.com/SAP/ui5-webcomponents/issues/11989)) ([4fe4f5a](https://github.com/SAP/ui5-webcomponents/commit/4fe4f5a7ecb2d7e5bee806ec4a06b1ff2166ef07))
* **ui5-popover:** allow f6 navigation ([#12001](https://github.com/SAP/ui5-webcomponents/issues/12001)) ([1cc86a5](https://github.com/SAP/ui5-webcomponents/commit/1cc86a5543ceec058264f6ce9c624dfa3217ce4c))
* **ui5-tabconatiner:** removed wrong font-weight ([#12002](https://github.com/SAP/ui5-webcomponents/issues/12002)) ([c4a416b](https://github.com/SAP/ui5-webcomponents/commit/c4a416bd5c18d637c1a3356fde2c3b69aa202bc1))
* **ui5-table:** aria relevant attributes are set ([#12013](https://github.com/SAP/ui5-webcomponents/issues/12013)) ([1695eee](https://github.com/SAP/ui5-webcomponents/commit/1695eee972c607c9caa81637dfbab3283536f8a6)), closes [#11639](https://github.com/SAP/ui5-webcomponents/issues/11639)
* **ui5-toolbar:** disable click events on disabled buttons ([#11847](https://github.com/SAP/ui5-webcomponents/issues/11847)) ([6c716bc](https://github.com/SAP/ui5-webcomponents/commit/6c716bc45b9e265c50cfae76374d7c4b90950d8d))
* **ui5-toolbar:** fix console warning in Toolbar ([#11692](https://github.com/SAP/ui5-webcomponents/issues/11692)) ([fec01bd](https://github.com/SAP/ui5-webcomponents/commit/fec01bde2e30ba01b2b33dc2f8965dd5d0b55ecb))


### Features

* **DragRegistry:** support for multiple drag ([#11780](https://github.com/SAP/ui5-webcomponents/issues/11780)) ([0c7025f](https://github.com/SAP/ui5-webcomponents/commit/0c7025f232e35b3d87837694e233d2f1d44341a8))
* **ui5-ai-button:** add customizable accessibility attributes to AI Button and SplitButton ([#11929](https://github.com/SAP/ui5-webcomponents/issues/11929)) ([30777dc](https://github.com/SAP/ui5-webcomponents/commit/30777dc9b0548260c2d88094e924efdbed6642c1))
* **ui5-button:** Add BusyIndicator ([acd6b6e](https://github.com/SAP/ui5-webcomponents/commit/acd6b6efb66f50e70f7a5ae363e9e26bdd1f7bc6))
* **ui5-menu, ui5-timeline, ui5-calendar-legend, ui5-color-palette:** add getFocusDomRef ([#11997](https://github.com/SAP/ui5-webcomponents/issues/11997)) ([a9b3c69](https://github.com/SAP/ui5-webcomponents/commit/a9b3c6980647a8c84dd32c2500743285e789b3a0)), closes [#11490](https://github.com/SAP/ui5-webcomponents/issues/11490)
* **ui5-shellbar-search:** auto-open property introduced ([#11961](https://github.com/SAP/ui5-webcomponents/issues/11961)) ([702150b](https://github.com/SAP/ui5-webcomponents/commit/702150bc30fabf579800a2526b4385d365667bee))





# [2.13.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.13.0-rc.1...v2.13.0-rc.2) (2025-07-24)


### Bug Fixes

* **OpenUI5Support:** fix sap.m.Select inside a ui5-dialog ([#11939](https://github.com/SAP/ui5-webcomponents/issues/11939)) ([a02011f](https://github.com/SAP/ui5-webcomponents/commit/a02011f8e2f09820ae0141526f9546a07ed089bd))
* **ui5-avatar-group:** disable pointer events on overflow button in Group Mode ([#11935](https://github.com/SAP/ui5-webcomponents/issues/11935)) ([1c3c4f4](https://github.com/SAP/ui5-webcomponents/commit/1c3c4f45e214e6e3fa46ee16a87ee44d4aa2f383)), closes [#11866](https://github.com/SAP/ui5-webcomponents/issues/11866)
* **ui5-checkbox:** make acc configurable ([#11773](https://github.com/SAP/ui5-webcomponents/issues/11773)) ([30fdb8e](https://github.com/SAP/ui5-webcomponents/commit/30fdb8e1850ad92ecbbd34e7d49528e631fd14f0))
* **ui5-file-uploader:** adjust high contrast themes styles ([#11927](https://github.com/SAP/ui5-webcomponents/issues/11927)) ([7c0942b](https://github.com/SAP/ui5-webcomponents/commit/7c0942b7aaa8494198eea35f56deb92abcfac011))
* **ui5-input:** update typedInValue upon clear ([#11882](https://github.com/SAP/ui5-webcomponents/issues/11882)) ([8bcf85f](https://github.com/SAP/ui5-webcomponents/commit/8bcf85f3c10b630bb4d22ada1fe151d43b451a73)), closes [#11836](https://github.com/SAP/ui5-webcomponents/issues/11836)
* **ui5-table:** register capture individually for selection ([#11899](https://github.com/SAP/ui5-webcomponents/issues/11899)) ([534e64c](https://github.com/SAP/ui5-webcomponents/commit/534e64c9de6a98e82f9b006e68dd97e16fa23e02))
* **ui5-table:** remove the fill-availble style ([#11963](https://github.com/SAP/ui5-webcomponents/issues/11963)) ([d32842c](https://github.com/SAP/ui5-webcomponents/commit/d32842c4533cd5cc6c80dc02c5410de1f1c64045)), closes [#11960](https://github.com/SAP/ui5-webcomponents/issues/11960) [#11205](https://github.com/SAP/ui5-webcomponents/issues/11205) [#11412](https://github.com/SAP/ui5-webcomponents/issues/11412)
* **ui5-token:** align delete icon tooltip with latest spec ([#11887](https://github.com/SAP/ui5-webcomponents/issues/11887)) ([4e1b019](https://github.com/SAP/ui5-webcomponents/commit/4e1b01973e5e981b643f30b5477ea8523e7637e5)), closes [#11588](https://github.com/SAP/ui5-webcomponents/issues/11588)
* **ui5-toolbar-button:** add css for ui5-toolbar-button for left alignment ([#11913](https://github.com/SAP/ui5-webcomponents/issues/11913)) ([#11914](https://github.com/SAP/ui5-webcomponents/issues/11914)) ([da7615a](https://github.com/SAP/ui5-webcomponents/commit/da7615a93058df54e58cfef0e9affb20eb6d361d))
* **ui5-toolbar:** fix overflow layout processing in dialogs ([#11894](https://github.com/SAP/ui5-webcomponents/issues/11894)) ([e249cf6](https://github.com/SAP/ui5-webcomponents/commit/e249cf63978af3b1e0d48df604ce4c399b2a45cf)), closes [#11771](https://github.com/SAP/ui5-webcomponents/issues/11771)


### Features

* **icons-tnt:** update to v3.8 and 2.13 ([#11977](https://github.com/SAP/ui5-webcomponents/issues/11977)) ([2ab58df](https://github.com/SAP/ui5-webcomponents/commit/2ab58dfe2b63dba6a1925dd5ba6ba4f9842f4292))
* **ui5-checkbox:** support associated labels with 'for' attribute ([#11925](https://github.com/SAP/ui5-webcomponents/issues/11925)) ([7a8e541](https://github.com/SAP/ui5-webcomponents/commit/7a8e541e9ed114b70c4a6ad571687ee329ac7e95)), closes [#10710](https://github.com/SAP/ui5-webcomponents/issues/10710)
* **ui5-list:** add growing-button-accessible-name for More button ([#11603](https://github.com/SAP/ui5-webcomponents/issues/11603)) ([1101b09](https://github.com/SAP/ui5-webcomponents/commit/1101b090f3044f6c33c361decb8248ac105bda10)), closes [#10671](https://github.com/SAP/ui5-webcomponents/issues/10671) [#10907](https://github.com/SAP/ui5-webcomponents/issues/10907)
* **ui5-menu:** improve accessibility ([#11846](https://github.com/SAP/ui5-webcomponents/issues/11846)) ([88b6eac](https://github.com/SAP/ui5-webcomponents/commit/88b6eac7237ca846334532364d5d73451f1dc6ec)), closes [#11594](https://github.com/SAP/ui5-webcomponents/issues/11594)
* **ui5-select:** support associated labels with 'for' attribute ([#11926](https://github.com/SAP/ui5-webcomponents/issues/11926)) ([ef0441e](https://github.com/SAP/ui5-webcomponents/commit/ef0441e9292a7798f7a65f25ba89cb31775a6c22)), closes [#10710](https://github.com/SAP/ui5-webcomponents/issues/10710)





# [2.13.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.13.0-rc.0...v2.13.0-rc.1) (2025-07-17)


### Bug Fixes

* **ui5-button:** adjust button badge z-index ([#11930](https://github.com/SAP/ui5-webcomponents/issues/11930)) ([9b6b625](https://github.com/SAP/ui5-webcomponents/commit/9b6b625d243ae13bd113cb2e8a6f0ca6c59229e3))
* **ui5-dynamic-date-range:** skip test ([#11924](https://github.com/SAP/ui5-webcomponents/issues/11924)) ([71f5ab3](https://github.com/SAP/ui5-webcomponents/commit/71f5ab31be69da70f3ec10b1f240008be1d56796)), closes [#11923](https://github.com/SAP/ui5-webcomponents/issues/11923)
* **ui5-li:** move default slot documentation from class to property level ([#11898](https://github.com/SAP/ui5-webcomponents/issues/11898)) ([95e00fd](https://github.com/SAP/ui5-webcomponents/commit/95e00fdd299004bf5cb5e5cbd6fd95f130a94795)), closes [#11825](https://github.com/SAP/ui5-webcomponents/issues/11825)
* **ui5-multi-combobox:** fix failing cypress test-fix ([#11916](https://github.com/SAP/ui5-webcomponents/issues/11916)) ([64c0f1b](https://github.com/SAP/ui5-webcomponents/commit/64c0f1be6777c1df4b2f4ace51259f1c99f40688))
* **ui5-multi-combobox:** stabilize cypress tests ([#11901](https://github.com/SAP/ui5-webcomponents/issues/11901)) ([b284112](https://github.com/SAP/ui5-webcomponents/commit/b284112ab3adc1c37c4cc0e83e2291f3169d4c49))
* **ui5-split-button:** adjust labelledby reference ([#11867](https://github.com/SAP/ui5-webcomponents/issues/11867)) ([2b95c0c](https://github.com/SAP/ui5-webcomponents/commit/2b95c0c9ce51e10b1315faba86ff744bddba7374)), closes [#11893](https://github.com/SAP/ui5-webcomponents/issues/11893)
* **ui5-tokenizer:** sync popover list items with token text changes ([#11854](https://github.com/SAP/ui5-webcomponents/issues/11854)) ([1c38b60](https://github.com/SAP/ui5-webcomponents/commit/1c38b603987bb48e511eadbaa095574bc2b17fe3))


### Features

* **ui5-combobox, ui5-multi-combo-box, ui5-input, ui5-multi-input:** link navigation in value state ([#11575](https://github.com/SAP/ui5-webcomponents/issues/11575)) ([3f80faa](https://github.com/SAP/ui5-webcomponents/commit/3f80faa4c3fbacf129b6f3fe3bebb92e3b65759f))
* **ui5-file-uploader:** apply new design concept ([#11589](https://github.com/SAP/ui5-webcomponents/issues/11589)) ([6f61cad](https://github.com/SAP/ui5-webcomponents/commit/6f61cad96d03be2edeb8c61f587e050a1dd3c10e)), closes [#11578](https://github.com/SAP/ui5-webcomponents/issues/11578) [#11604](https://github.com/SAP/ui5-webcomponents/issues/11604) [#10549](https://github.com/SAP/ui5-webcomponents/issues/10549) [#11611](https://github.com/SAP/ui5-webcomponents/issues/11611) [#5893](https://github.com/SAP/ui5-webcomponents/issues/5893) [#10909](https://github.com/SAP/ui5-webcomponents/issues/10909) [#8395](https://github.com/SAP/ui5-webcomponents/issues/8395)





# [2.13.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.12.0...v2.13.0-rc.0) (2025-07-10)


### Bug Fixes

* **ui5-date-picker, ui5-calendar:** use correct year format ([#11712](https://github.com/SAP/ui5-webcomponents/issues/11712)) ([aa99f55](https://github.com/SAP/ui5-webcomponents/commit/aa99f55f68159823c574a6562b9b638805b9d88c))
* **ui5-datetime-picker:** show time picker after date selection ([#11548](https://github.com/SAP/ui5-webcomponents/issues/11548)) ([b80b469](https://github.com/SAP/ui5-webcomponents/commit/b80b46914093c5cd6c202efb4b7e0e3727ca60c0)), closes [#11378](https://github.com/SAP/ui5-webcomponents/issues/11378)
* **ui5-list:** prevent toggle event bubbling from non-list items ([#11843](https://github.com/SAP/ui5-webcomponents/issues/11843)) ([7c77980](https://github.com/SAP/ui5-webcomponents/commit/7c77980184a8814f5e9ad19be8925c7b993228a6)), closes [#11812](https://github.com/SAP/ui5-webcomponents/issues/11812)
* **ui5-multi-combobox:** fix RTL arrow navigation to and from the tokens ([#11857](https://github.com/SAP/ui5-webcomponents/issues/11857)) ([a38752a](https://github.com/SAP/ui5-webcomponents/commit/a38752a093a6173b5797345579feb0ff05d3be9a)), closes [#11826](https://github.com/SAP/ui5-webcomponents/issues/11826)
* **ui5-slider:** improve labels structure and placement ([#11848](https://github.com/SAP/ui5-webcomponents/issues/11848)) ([69627b4](https://github.com/SAP/ui5-webcomponents/commit/69627b429da26c276a8124b3aa9f15e9ec1ee874))


### Features

* **ui5-breadcrumbs, ui5-meadia-gallery:** getFocusDomRef added ([#11869](https://github.com/SAP/ui5-webcomponents/issues/11869)) ([130e9c5](https://github.com/SAP/ui5-webcomponents/commit/130e9c5c60505c3c627620e377efdf80e1745d6d)), closes [#11483](https://github.com/SAP/ui5-webcomponents/issues/11483)





# [2.12.0](https://github.com/SAP/ui5-webcomponents/compare/v2.12.0-rc.3...v2.12.0) (2025-07-04)


### Bug Fixes

* **ui5-avatar:** remove redundant placeholder variables from horizon themes ([#11765](https://github.com/SAP/ui5-webcomponents/issues/11765)) ([9e8c35a](https://github.com/SAP/ui5-webcomponents/commit/9e8c35a092260820a460bd63091b4c8e46cd2c51)), closes [#11750](https://github.com/SAP/ui5-webcomponents/issues/11750)
* **ui5-date-picker, ui5-time-picker:** adjust styles ([#11704](https://github.com/SAP/ui5-webcomponents/issues/11704)) ([eb18c32](https://github.com/SAP/ui5-webcomponents/commit/eb18c327dd4b1cdd04d16377721cfa2c8f422795)), closes [#11605](https://github.com/SAP/ui5-webcomponents/issues/11605) [#11609](https://github.com/SAP/ui5-webcomponents/issues/11609)


### Features

* **ui5-date/time*:** introduce translatable fallback placeholder ([#11739](https://github.com/SAP/ui5-webcomponents/issues/11739)) ([02dfbcc](https://github.com/SAP/ui5-webcomponents/commit/02dfbccf73d2cd13464858e38eaf2fb733df3dc8))





# [2.12.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.12.0-rc.2...v2.12.0-rc.3) (2025-07-03)


### Bug Fixes

* **framework:** avoid unnecessary renderings ([#11782](https://github.com/SAP/ui5-webcomponents/issues/11782)) ([e6daa12](https://github.com/SAP/ui5-webcomponents/commit/e6daa1223f745ed6d0080f9cb3c65a245e537aa8))
* **ui5-link:** stop default behaviour on enter key down ([#11799](https://github.com/SAP/ui5-webcomponents/issues/11799)) ([0d471d7](https://github.com/SAP/ui5-webcomponents/commit/0d471d73c8de25e8abaa9bd35e6901d6dd9bed85)), closes [#11772](https://github.com/SAP/ui5-webcomponents/issues/11772)
* **ui5-select:** handle empty string value correctly ([#11764](https://github.com/SAP/ui5-webcomponents/issues/11764)) ([381e9af](https://github.com/SAP/ui5-webcomponents/commit/381e9af6aab9f1b63917bc16b36dbd2fcbe85417))


### Features

* **ui5-avatar-group, ui5-product-switch:** getFocusDomRef added ([#11762](https://github.com/SAP/ui5-webcomponents/issues/11762)) ([0954f33](https://github.com/SAP/ui5-webcomponents/commit/0954f331ee36eeea785347bfbede98f186fb04b0)), closes [#11483](https://github.com/SAP/ui5-webcomponents/issues/11483)
* **ui5-checkbox:** add value property ([#11775](https://github.com/SAP/ui5-webcomponents/issues/11775)) ([cc00019](https://github.com/SAP/ui5-webcomponents/commit/cc00019023a8ae90b2c45f4dc9e533ad536e8c4f))





# [2.12.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.12.0-rc.1...v2.12.0-rc.2) (2025-06-26)


### Bug Fixes

* **popups:** fix finding initial focus when Tokenizer is placed ([#11761](https://github.com/SAP/ui5-webcomponents/issues/11761)) ([26de583](https://github.com/SAP/ui5-webcomponents/commit/26de583eae0533d7ecd16a0a0aa4b583ec7df6f6))
* **ui5-button-badge:** fix vertical align ([#11763](https://github.com/SAP/ui5-webcomponents/issues/11763)) ([b89c557](https://github.com/SAP/ui5-webcomponents/commit/b89c557146c9f0ec55946b4945226238fd487273)), closes [#11616](https://github.com/SAP/ui5-webcomponents/issues/11616)
* **ui5-cb-item:** adjust height in compact ([#11569](https://github.com/SAP/ui5-webcomponents/issues/11569)) ([beab734](https://github.com/SAP/ui5-webcomponents/commit/beab73466ce3cfaebc1508c621be95753687f996)), closes [#10349](https://github.com/SAP/ui5-webcomponents/issues/10349)


### Features

* **ui5-menu:** menu item groups with checkable menu items ([#10028](https://github.com/SAP/ui5-webcomponents/issues/10028)) ([161af0f](https://github.com/SAP/ui5-webcomponents/commit/161af0fe9912145ddd4fe19f4d71c8aa23db2e15))
* **ui5-menu:** аdd aria-expanded attribute to menuItem with submenu ([#11754](https://github.com/SAP/ui5-webcomponents/issues/11754)) ([1fdce6a](https://github.com/SAP/ui5-webcomponents/commit/1fdce6a01f204a5fecf6e68a98f8352a2cfc67ba))
* **ui5-switch:** add value for form ([#11753](https://github.com/SAP/ui5-webcomponents/issues/11753)) ([53b004f](https://github.com/SAP/ui5-webcomponents/commit/53b004f1f93b3c555e6ec2f8ba1decbe7b17bafa)), closes [#11608](https://github.com/SAP/ui5-webcomponents/issues/11608)
* **ui5-table-selection-multi:** headerSelector property added ([#11711](https://github.com/SAP/ui5-webcomponents/issues/11711)) ([6082798](https://github.com/SAP/ui5-webcomponents/commit/608279803c57e385af1d0d96fd031755e4d098c4)), closes [#5873](https://github.com/SAP/ui5-webcomponents/issues/5873) [#5873](https://github.com/SAP/ui5-webcomponents/issues/5873) [#5873](https://github.com/SAP/ui5-webcomponents/issues/5873) [#5873](https://github.com/SAP/ui5-webcomponents/issues/5873)





# [2.12.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.12.0-rc.0...v2.12.0-rc.1) (2025-06-19)


### Bug Fixes

* **framework:** wait cldr to be loaded ([#11643](https://github.com/SAP/ui5-webcomponents/issues/11643)) ([f8e9cbd](https://github.com/SAP/ui5-webcomponents/commit/f8e9cbdff4e376666aa7589d1dcff1c543711290))
* **popups:** fix finding correct focusable element ([#11700](https://github.com/SAP/ui5-webcomponents/issues/11700)) ([972fddf](https://github.com/SAP/ui5-webcomponents/commit/972fddf32ff168aef8af0772d6bc4cc5ae4a7044))
* **ui5-popover:** improve placement logic for limited space scenarios ([#11638](https://github.com/SAP/ui5-webcomponents/issues/11638)) ([5f4816e](https://github.com/SAP/ui5-webcomponents/commit/5f4816e97ee33c02dcd360dffb2690ffcffbd362))


### Features

* **ui5-avatar-group:** add accessibleName and accessibleNameRef ([#11699](https://github.com/SAP/ui5-webcomponents/issues/11699)) ([04e94de](https://github.com/SAP/ui5-webcomponents/commit/04e94deec75dde0356f33c3047fba9d3e46df39c))
* **ui5-calendar:** expose shadow parts for month-picker and year-picker ([#11698](https://github.com/SAP/ui5-webcomponents/issues/11698)) ([b084a1f](https://github.com/SAP/ui5-webcomponents/commit/b084a1feee7dabc35a6be3913269c814caf4a64f))





# [2.12.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.11.0...v2.12.0-rc.0) (2025-06-12)


### Bug Fixes

* **ui5-avatar:** add dynamic image error handling with fallback logic ([#11642](https://github.com/SAP/ui5-webcomponents/issues/11642)) ([cbf0dfe](https://github.com/SAP/ui5-webcomponents/commit/cbf0dfecf3f4e48de3a8a4b5b818b384dc42a73d)), closes [#11140](https://github.com/SAP/ui5-webcomponents/issues/11140)
* **ui5-busy-indicator:** make text and circles determine indicator dimensions when there is no content ([#11223](https://github.com/SAP/ui5-webcomponents/issues/11223)) ([10c0cfd](https://github.com/SAP/ui5-webcomponents/commit/10c0cfddf56ceea2c4481e0c971b30a2a26f602c))
* **ui5-button, ui5-toggle-button:** fire event with correct type ([#11563](https://github.com/SAP/ui5-webcomponents/issues/11563)) ([4414126](https://github.com/SAP/ui5-webcomponents/commit/4414126ab58c53e10a0130eb146d019d164b7ec9))
* **ui5-button:** prevents native behavior when click prevented ([#11678](https://github.com/SAP/ui5-webcomponents/issues/11678)) ([b8ac221](https://github.com/SAP/ui5-webcomponents/commit/b8ac221d240b53a7ad85e450b3da4fcb82b4675b))
* **ui5-checkbox:** correct spacing between checkbox and label in compact ([#11671](https://github.com/SAP/ui5-webcomponents/issues/11671)) ([a879720](https://github.com/SAP/ui5-webcomponents/commit/a879720a8aee881f783c537068b44aa184f5d2ce)), closes [#11664](https://github.com/SAP/ui5-webcomponents/issues/11664)
* **ui5-checkbox:** correct the height of the checkbox in compact ([#11681](https://github.com/SAP/ui5-webcomponents/issues/11681)) ([e9a1fa2](https://github.com/SAP/ui5-webcomponents/commit/e9a1fa232d7f69a6e349dfa633dc501b8059b63e)), closes [#11674](https://github.com/SAP/ui5-webcomponents/issues/11674)
* **ui5-responsive-popover:** use parameter for inner input font-style ([#11640](https://github.com/SAP/ui5-webcomponents/issues/11640)) ([f32bf1d](https://github.com/SAP/ui5-webcomponents/commit/f32bf1d4f80fc782b77bb139b69ddf1c27e31570)), closes [#11628](https://github.com/SAP/ui5-webcomponents/issues/11628)
* **ui5-select:** fix icon vertical alignment ([#11672](https://github.com/SAP/ui5-webcomponents/issues/11672)) ([5327814](https://github.com/SAP/ui5-webcomponents/commit/53278149b2858c6d5debd6bae4fa21865ccf5554)), closes [#11584](https://github.com/SAP/ui5-webcomponents/issues/11584)
* **ui5-slider:** implement tooltips with Popover API ([#10994](https://github.com/SAP/ui5-webcomponents/issues/10994)) ([5d8b44e](https://github.com/SAP/ui5-webcomponents/commit/5d8b44ed81a4fb3b38e2b789b9634d62d051148b))
* **ui5-tokenizer:** fix token selection on mobile ([#11667](https://github.com/SAP/ui5-webcomponents/issues/11667)) ([55efab8](https://github.com/SAP/ui5-webcomponents/commit/55efab8a5651d771d92422f503a875673393f8a3))


### Features

* **popups:** provide accessibleDescription/accessibleDescriptionRef for Dialog, Resp/Popover ([#11624](https://github.com/SAP/ui5-webcomponents/issues/11624)) ([70c0ea9](https://github.com/SAP/ui5-webcomponents/commit/70c0ea960202f78b487ede4dc162795ca8614d15))





# [2.11.0](https://github.com/SAP/ui5-webcomponents/compare/v2.11.0-rc.4...v2.11.0) (2025-06-05)

**Note:** Version bump only for package @ui5/webcomponents





# [2.11.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v2.11.0-rc.3...v2.11.0-rc.4) (2025-06-05)


### Bug Fixes

* **ui5-avatar-group:** focus outline visible in overflow:hidden ([#11535](https://github.com/SAP/ui5-webcomponents/issues/11535)) ([95e81ab](https://github.com/SAP/ui5-webcomponents/commit/95e81ab9cfe1de07972e5e13679d3e1f42a21aaa)), closes [#10551](https://github.com/SAP/ui5-webcomponents/issues/10551)
* **ui5-combobox/tokenizer/wizard/input:** extract button texts to vars ([#11549](https://github.com/SAP/ui5-webcomponents/issues/11549)) ([c8daa25](https://github.com/SAP/ui5-webcomponents/commit/c8daa25854c5b9c737b2995df43b562230ee3c88))
* **ui5-date-picker:** align width to vd specs ([#11602](https://github.com/SAP/ui5-webcomponents/issues/11602)) ([e497d6f](https://github.com/SAP/ui5-webcomponents/commit/e497d6f369e13ad151b670e66a967b2745e6d1ff)), closes [#11561](https://github.com/SAP/ui5-webcomponents/issues/11561)
* **ui5-dynamic-date-range:** remove redundant property ([#11620](https://github.com/SAP/ui5-webcomponents/issues/11620)) ([6aff749](https://github.com/SAP/ui5-webcomponents/commit/6aff74906b31a913fa6c7eef17ba88010b0d55f0))
* **ui5-popover:** don't close popover when click on opener iframe ([#11517](https://github.com/SAP/ui5-webcomponents/issues/11517)) ([ce89e8e](https://github.com/SAP/ui5-webcomponents/commit/ce89e8efda220f9f95d91c9a22c9a847951decc8))


### Features

* **ui5-avatar, ui5-icon:** make click events public ([#11591](https://github.com/SAP/ui5-webcomponents/issues/11591)) ([b82eac9](https://github.com/SAP/ui5-webcomponents/commit/b82eac9a8cfdaffa9e706c33b38b9246faad61e9))
* **ui5-calendar:** introduce Year Range Picker ([#11167](https://github.com/SAP/ui5-webcomponents/issues/11167)) ([d9a40d2](https://github.com/SAP/ui5-webcomponents/commit/d9a40d2be2ef0ecb95e161f92ff3f98a843a5dd1)), closes [#3200](https://github.com/SAP/ui5-webcomponents/issues/3200) [#10867](https://github.com/SAP/ui5-webcomponents/issues/10867)
* **ui5-dynamic-date-range:** work in progress ([#10895](https://github.com/SAP/ui5-webcomponents/issues/10895)) ([7c8ece9](https://github.com/SAP/ui5-webcomponents/commit/7c8ece95d740e1d43468b99184a56b9a9ae9b2a1))
* **ui5-illustrated-message:** added new illustration types ([#11560](https://github.com/SAP/ui5-webcomponents/issues/11560)) ([5517e2c](https://github.com/SAP/ui5-webcomponents/commit/5517e2c84add4d88077e8dda7c82641eb672d7ee))





# [2.11.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.11.0-rc.2...v2.11.0-rc.3) (2025-05-29)


### Bug Fixes

* **ui5-avatar:** apply optional border for avatars with image ([#11568](https://github.com/SAP/ui5-webcomponents/issues/11568)) ([12cf1f6](https://github.com/SAP/ui5-webcomponents/commit/12cf1f67f4f348bfce524a6fddf5bf13408812af)), closes [#11437](https://github.com/SAP/ui5-webcomponents/issues/11437)
* **ui5-breadcrumbs:** aligned with acc spec ([#11572](https://github.com/SAP/ui5-webcomponents/issues/11572)) ([2a20f70](https://github.com/SAP/ui5-webcomponents/commit/2a20f70d7e894d89affc33767276aabaf2cabeac)), closes [#11541](https://github.com/SAP/ui5-webcomponents/issues/11541)
* **ui5-checkbox:** fixed required asterisk alignment ([#11576](https://github.com/SAP/ui5-webcomponents/issues/11576)) ([03ecc0b](https://github.com/SAP/ui5-webcomponents/commit/03ecc0bb34f508d9e7492b7c64d70617a4f06694)), closes [#11547](https://github.com/SAP/ui5-webcomponents/issues/11547)
* **ui5-tabcontainer:** Handle tab not having a parent element ([#11544](https://github.com/SAP/ui5-webcomponents/issues/11544)) ([d7e69bb](https://github.com/SAP/ui5-webcomponents/commit/d7e69bb6b15fa73d0b5c4669ded976efb15b256b)), closes [#11543](https://github.com/SAP/ui5-webcomponents/issues/11543)
* **ui5-toolbar:** close overflow in noConflict mode ([#11524](https://github.com/SAP/ui5-webcomponents/issues/11524)) ([47bed95](https://github.com/SAP/ui5-webcomponents/commit/47bed95606c2663a35a95c3bed4e8fad2c76df22))


### Features

* add `Assets-node` module for node/ssr env ([#11522](https://github.com/SAP/ui5-webcomponents/issues/11522)) ([4a874cc](https://github.com/SAP/ui5-webcomponents/commit/4a874cc1f88e440f8bce4f9f0757df1af2a04314))
* **ui5-shellbar:** replace custom badges with ButtonBadge ([#11284](https://github.com/SAP/ui5-webcomponents/issues/11284)) ([4574d87](https://github.com/SAP/ui5-webcomponents/commit/4574d87917f08ee0658eb8dbd0425ff2ff68590d))
* **ui5-table:** behavior property added for selections ([#11520](https://github.com/SAP/ui5-webcomponents/issues/11520)) ([56b113b](https://github.com/SAP/ui5-webcomponents/commit/56b113bee378db91e8df69cbf6b4dd0bb903dad5)), closes [#10893](https://github.com/SAP/ui5-webcomponents/issues/10893) [#10893](https://github.com/SAP/ui5-webcomponents/issues/10893)





# [2.11.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.11.0-rc.1...v2.11.0-rc.2) (2025-05-22)


### Bug Fixes

* **popups:** fix header styles according to the specification ([#11513](https://github.com/SAP/ui5-webcomponents/issues/11513)) ([6fbd0e2](https://github.com/SAP/ui5-webcomponents/commit/6fbd0e2341e322331745f7a9dc80992ac07fac46))
* **ui5-avatar:** disable click on disabled interactive ([#11527](https://github.com/SAP/ui5-webcomponents/issues/11527)) ([de188c2](https://github.com/SAP/ui5-webcomponents/commit/de188c290f71f871b05292c1e2270a21b1dd19a3))
* **ui5-color-palette:** show tooltip on focused hovered items ([#11519](https://github.com/SAP/ui5-webcomponents/issues/11519)) ([d6ee5ea](https://github.com/SAP/ui5-webcomponents/commit/d6ee5ea8848a2b7387dc30fc794fa78505d706fa))
* **ui5-li-custom:** correct padding for ListItemCustom ([#11487](https://github.com/SAP/ui5-webcomponents/issues/11487)) ([93066c6](https://github.com/SAP/ui5-webcomponents/commit/93066c6036360c0c28262586bce138ff9ceb5bc5))
* **ui5-list:** adjust observer to handle sticky headers ([#11526](https://github.com/SAP/ui5-webcomponents/issues/11526)) ([e46b867](https://github.com/SAP/ui5-webcomponents/commit/e46b867f77412ff2a4b57a025dda13799bc9ac16)), closes [#11242](https://github.com/SAP/ui5-webcomponents/issues/11242) [#11461](https://github.com/SAP/ui5-webcomponents/issues/11461)
* **ui5-split-button:** fire click event when focused with shift + tab ([#11197](https://github.com/SAP/ui5-webcomponents/issues/11197)) ([aac7449](https://github.com/SAP/ui5-webcomponents/commit/aac744979ccad4829a9b6b51ac24f937dde739fb))





# [2.11.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.11.0-rc.0...v2.11.0-rc.1) (2025-05-15)


### Bug Fixes

* **f6navigation:** delegate fast navigation to openui5 ([#11505](https://github.com/SAP/ui5-webcomponents/issues/11505)) ([b23ee41](https://github.com/SAP/ui5-webcomponents/commit/b23ee41258835e0561e175150a099e0d9669a977)), closes [#10462](https://github.com/SAP/ui5-webcomponents/issues/10462)
* **ui5-button:** announce accessible name ([#11396](https://github.com/SAP/ui5-webcomponents/issues/11396)) ([8c30f2a](https://github.com/SAP/ui5-webcomponents/commit/8c30f2a15d6b630e9651b609a6fc84d4596b42d5)), closes [#11350](https://github.com/SAP/ui5-webcomponents/issues/11350)
* **ui5-slider, ui5-range-slider:** correct f2 announcement ([#11476](https://github.com/SAP/ui5-webcomponents/issues/11476)) ([850fa42](https://github.com/SAP/ui5-webcomponents/commit/850fa4294b60c6b771573da1b0bd9172359f91a8))
* **ui5-textarea:** remove symbols encoding when growing ([#11305](https://github.com/SAP/ui5-webcomponents/issues/11305)) ([642101e](https://github.com/SAP/ui5-webcomponents/commit/642101ea7ee3b96e76e8001ed89f3041bf780f3c)), closes [#9868](https://github.com/SAP/ui5-webcomponents/issues/9868)
* **ui5-textarea:** remove z-index from focused textarea wrapper ([#11408](https://github.com/SAP/ui5-webcomponents/issues/11408)) ([606abbe](https://github.com/SAP/ui5-webcomponents/commit/606abbed8b5df22fca3a0f5b22c714dea7392d80))


### Features

* **f6navigation:** add option to bypass groups ([#11494](https://github.com/SAP/ui5-webcomponents/issues/11494)) ([7039c24](https://github.com/SAP/ui5-webcomponents/commit/7039c24d260406d8b69883fe843de1b5c3cdc819))
* **ui5-bar:** allow role change ([#11134](https://github.com/SAP/ui5-webcomponents/issues/11134)) ([db49d09](https://github.com/SAP/ui5-webcomponents/commit/db49d099e9f3a882d0fee403bf96a022b3223484)), closes [#10990](https://github.com/SAP/ui5-webcomponents/issues/10990)
* **ui5-color-palette-item:** add aria-pressed when being selected ([#11472](https://github.com/SAP/ui5-webcomponents/issues/11472)) ([cb1de2b](https://github.com/SAP/ui5-webcomponents/commit/cb1de2b56c40906510ac05953c6e59ab20d9cfea))
* **ui5-list:** focus() now focuses item ([#11486](https://github.com/SAP/ui5-webcomponents/issues/11486)) ([025ec46](https://github.com/SAP/ui5-webcomponents/commit/025ec4659b5bd20bb5b008bf1b323b7cdce15679))
* **ui5-slider/ui5-range-slider:** enable for attribute support ([#11469](https://github.com/SAP/ui5-webcomponents/issues/11469)) ([2b219f3](https://github.com/SAP/ui5-webcomponents/commit/2b219f3d001cd37e8f556e634e693f777fd47cde))





# [2.11.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.10.0...v2.11.0-rc.0) (2025-05-08)


### Bug Fixes

* **ui5-calendar:** add style to secondary type ([#11478](https://github.com/SAP/ui5-webcomponents/issues/11478)) ([30d78b8](https://github.com/SAP/ui5-webcomponents/commit/30d78b83ee82b647db79abe3d2b40f83c04ec5fb)), closes [#11011](https://github.com/SAP/ui5-webcomponents/issues/11011)
* **ui5-calendar:** show year range text in year view ([#11468](https://github.com/SAP/ui5-webcomponents/issues/11468)) ([3a56fd3](https://github.com/SAP/ui5-webcomponents/commit/3a56fd35371614c947d570ca762432df40c30382)), closes [#11011](https://github.com/SAP/ui5-webcomponents/issues/11011)
* **ui5-side-navigation:** correct divider line position in RTL ([#11441](https://github.com/SAP/ui5-webcomponents/issues/11441)) ([5281a66](https://github.com/SAP/ui5-webcomponents/commit/5281a6623ef4681a520e2afe12d2d745ba700c91))


### Features

* **ui5-combobox/ui5-multi-combobox:** enable for attribute support ([#11453](https://github.com/SAP/ui5-webcomponents/issues/11453)) ([6df8a30](https://github.com/SAP/ui5-webcomponents/commit/6df8a3021b9a58e19de3d561e910afafa99d9fb3))





# [2.10.0](https://github.com/SAP/ui5-webcomponents/compare/v2.10.0-rc.3...v2.10.0) (2025-05-07)


### Bug Fixes

* **ui5-bar:** prevent midContent from overlapping start and endContent on overflow ([#11294](https://github.com/SAP/ui5-webcomponents/issues/11294)) ([68b18d3](https://github.com/SAP/ui5-webcomponents/commit/68b18d3bbba3ca30872b59be6f0897f6a2a2dd7d)), closes [#11028](https://github.com/SAP/ui5-webcomponents/issues/11028)
* **ui5-button:** update parameters according to VD ([#11414](https://github.com/SAP/ui5-webcomponents/issues/11414)) ([72354bb](https://github.com/SAP/ui5-webcomponents/commit/72354bbf15acc929422aaa820ed1fdd6e0071972))


### Features

* **ui5-form, ui5-form-group:** add `headerLevel` property ([#11372](https://github.com/SAP/ui5-webcomponents/issues/11372)) ([e70ffa6](https://github.com/SAP/ui5-webcomponents/commit/e70ffa6a36d0cc1ea5ab064003d8a19b65b0aec9)), closes [#11371](https://github.com/SAP/ui5-webcomponents/issues/11371)





# [2.10.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.10.0-rc.2...v2.10.0-rc.3) (2025-05-01)


### Bug Fixes

* **ui5-calendar-legend:** align selected item representation to new VD spec ([#11391](https://github.com/SAP/ui5-webcomponents/issues/11391)) ([5594420](https://github.com/SAP/ui5-webcomponents/commit/5594420e6fc0eead394cdb1a3f646afae88e3b1f))
* **ui5-checkbox:** improved required state placement and asterisks behaviour ([#11326](https://github.com/SAP/ui5-webcomponents/issues/11326)) ([a35c2b6](https://github.com/SAP/ui5-webcomponents/commit/a35c2b6fa89220ee2701a6ef60e09631ee8875de)), closes [#10864](https://github.com/SAP/ui5-webcomponents/issues/10864)
* **ui5-menu-item:** remove redundant screen reader  announcements ([#11415](https://github.com/SAP/ui5-webcomponents/issues/11415)) ([2c21662](https://github.com/SAP/ui5-webcomponents/commit/2c2166238ae62a5316350f55a0c4d221a654146f)), closes [#11380](https://github.com/SAP/ui5-webcomponents/issues/11380) [#11405](https://github.com/SAP/ui5-webcomponents/issues/11405)
* **ui5-panel:** adjust header button width to the new specifications ([#11410](https://github.com/SAP/ui5-webcomponents/issues/11410)) ([43553df](https://github.com/SAP/ui5-webcomponents/commit/43553dfb7906c93e23f68556e853e0a1e14c901c))


### Features

* **ui5-button:** make click button preventable ([#11318](https://github.com/SAP/ui5-webcomponents/issues/11318)) ([1f4aa92](https://github.com/SAP/ui5-webcomponents/commit/1f4aa927d2841e0c51f665ab2bdb851b1d030c35))





# [2.10.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.10.0-rc.1...v2.10.0-rc.2) (2025-04-24)


### Bug Fixes

* **ui5-breadcrumbs:** dropdown arrow focused color fixed ([#11362](https://github.com/SAP/ui5-webcomponents/issues/11362)) ([d07b089](https://github.com/SAP/ui5-webcomponents/commit/d07b0891ef3f3e6c60354e07c9c12433ce1f14d5))
* **ui5-button:** adjust tooltips display ([#11268](https://github.com/SAP/ui5-webcomponents/issues/11268)) ([9f0d907](https://github.com/SAP/ui5-webcomponents/commit/9f0d907e74a528ffcc6704a99b4d6cead1cb4adf)), closes [#10824](https://github.com/SAP/ui5-webcomponents/issues/10824)
* **ui5-button:** announce aria description ([#11264](https://github.com/SAP/ui5-webcomponents/issues/11264)) ([f8e77cb](https://github.com/SAP/ui5-webcomponents/commit/f8e77cbf322e3ee75c5db481b2b7fbb17e81a5ea)), closes [#10899](https://github.com/SAP/ui5-webcomponents/issues/10899)
* **ui5-input:** correct failing test ([#11388](https://github.com/SAP/ui5-webcomponents/issues/11388)) ([ba4da91](https://github.com/SAP/ui5-webcomponents/commit/ba4da91839452e896c4492af7ff61b491d91c73b))
* **ui5-popover:** fix arrow positioning ([#11275](https://github.com/SAP/ui5-webcomponents/issues/11275)) ([858a870](https://github.com/SAP/ui5-webcomponents/commit/858a8706b065e667a26d7ae9849bd72dd5c04b93))
* **ui5-table-growing:** prevent focus while scroll to grow ([#11358](https://github.com/SAP/ui5-webcomponents/issues/11358)) ([002f64f](https://github.com/SAP/ui5-webcomponents/commit/002f64f2f61a632428a712bd19a3825e78a16d45))
* **ui5-table-growing:** remember correct last row with Enter ([#11361](https://github.com/SAP/ui5-webcomponents/issues/11361)) ([297da60](https://github.com/SAP/ui5-webcomponents/commit/297da604132d0e2a39f05c415343b04b8dbcb812))
* **ui5-table:** fixes noData slot issue ([#11397](https://github.com/SAP/ui5-webcomponents/issues/11397)) ([1dda953](https://github.com/SAP/ui5-webcomponents/commit/1dda953a79a0d404b71e0fba88b6de8478520b03))
* **ui5-tree:** add event validation to selection handler ([#11364](https://github.com/SAP/ui5-webcomponents/issues/11364)) ([551ef30](https://github.com/SAP/ui5-webcomponents/commit/551ef30de06fb7741533057664c423c658ec4229)), closes [#11352](https://github.com/SAP/ui5-webcomponents/issues/11352)





# [2.10.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.10.0-rc.0...v2.10.0-rc.1) (2025-04-17)


### Bug Fixes

* **ui5-busy-indicator:** update busy area opacity ([#11237](https://github.com/SAP/ui5-webcomponents/issues/11237)) ([637cdd0](https://github.com/SAP/ui5-webcomponents/commit/637cdd011402f72a730b1cb7e9ce806a26eb2f2f)), closes [#11224](https://github.com/SAP/ui5-webcomponents/issues/11224)
* **ui5-form:** propagate `itemSpacing` properly ([#11312](https://github.com/SAP/ui5-webcomponents/issues/11312)) ([32b4fb2](https://github.com/SAP/ui5-webcomponents/commit/32b4fb23ff3baab75978b29ae8eb8da6f90c0652)), closes [#11307](https://github.com/SAP/ui5-webcomponents/issues/11307)
* **ui5-input:** selection-change is now fired when item is reselected ([#11301](https://github.com/SAP/ui5-webcomponents/issues/11301)) ([1d11709](https://github.com/SAP/ui5-webcomponents/commit/1d11709da4daf133ef8547417fdaec5304e0257b))
* **ui5-table:** stops the propagation of overflow button ([#11270](https://github.com/SAP/ui5-webcomponents/issues/11270)) ([f43b8dc](https://github.com/SAP/ui5-webcomponents/commit/f43b8dc3c53cc4897a0f35667147002b29f66d80)), closes [#11159](https://github.com/SAP/ui5-webcomponents/issues/11159)


### Features

* **ui5-li:** add text wrapping support ([#11108](https://github.com/SAP/ui5-webcomponents/issues/11108)) ([22d7d2f](https://github.com/SAP/ui5-webcomponents/commit/22d7d2f8264bcf908279b1feaff0e114f99d350f))
* **ui5-menu:** introduce HorizontalAlign property ([#11313](https://github.com/SAP/ui5-webcomponents/issues/11313)) ([7a287a1](https://github.com/SAP/ui5-webcomponents/commit/7a287a1098c080c93f409e6685ebfd9f8017ab1e)), closes [#10765](https://github.com/SAP/ui5-webcomponents/issues/10765)
* **ui5-table:** improve default column widths ([#11078](https://github.com/SAP/ui5-webcomponents/issues/11078)) ([1ec0be6](https://github.com/SAP/ui5-webcomponents/commit/1ec0be669633b2667222385674e6e602e08f580c))





# [2.10.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.9.1-rc.0...v2.10.0-rc.0) (2025-04-14)


### Features

* **ui5-tree-item:** image slot added ([#11106](https://github.com/SAP/ui5-webcomponents/issues/11106)) ([4d972c8](https://github.com/SAP/ui5-webcomponents/commit/4d972c8578395f2ebe4a2188397dd57cb581294d)), closes [#7481](https://github.com/SAP/ui5-webcomponents/issues/7481)





## [2.9.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.9.0...v2.9.1-rc.0) (2025-04-10)


### Bug Fixes

* change event is only called once for range selection ([#11192](https://github.com/SAP/ui5-webcomponents/issues/11192)) ([e913485](https://github.com/SAP/ui5-webcomponents/commit/e9134855822284c6bb6f1a178e0368b7d76d81f7))
* **ui5-form:** fix dangling aria-labelledby ([#11273](https://github.com/SAP/ui5-webcomponents/issues/11273)) ([d455af8](https://github.com/SAP/ui5-webcomponents/commit/d455af898f8a6235e2398321594e7a46366104f1)), closes [#11262](https://github.com/SAP/ui5-webcomponents/issues/11262)
* **ui5-message-strip:** adjust accessibility ([#11267](https://github.com/SAP/ui5-webcomponents/issues/11267)) ([3311b17](https://github.com/SAP/ui5-webcomponents/commit/3311b1773dfe323a42f9c40ba503f8fbf461ca6e))
* **ui5-table-growing:** add rootMargin to observer ([#11242](https://github.com/SAP/ui5-webcomponents/issues/11242)) ([da527cb](https://github.com/SAP/ui5-webcomponents/commit/da527cb42166c68c4f19742d54d7ee7d910d13dd))





# [2.9.0](https://github.com/SAP/ui5-webcomponents/compare/v2.9.0-rc.3...v2.9.0) (2025-04-04)


### Bug Fixes

* **ui5-multi-input:** announce value help ([#11221](https://github.com/SAP/ui5-webcomponents/issues/11221)) ([bdc746a](https://github.com/SAP/ui5-webcomponents/commit/bdc746a043489077daa5dd1a700067c028e4c489))
* **ui5-select:** align option font size with field ([#11255](https://github.com/SAP/ui5-webcomponents/issues/11255)) ([dc8ff89](https://github.com/SAP/ui5-webcomponents/commit/dc8ff89263a72cd6c59d8011a6be410f884a1344)), closes [#11163](https://github.com/SAP/ui5-webcomponents/issues/11163)





# [2.9.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.9.0-rc.2...v2.9.0-rc.3) (2025-04-03)


### Bug Fixes

* **framework:** fix fetching "id" (indonesian) language ([#11251](https://github.com/SAP/ui5-webcomponents/issues/11251)) ([9a36df5](https://github.com/SAP/ui5-webcomponents/commit/9a36df5dc2191758abd665d6fb1014d645e322f7)), closes [#11233](https://github.com/SAP/ui5-webcomponents/issues/11233)
* **ui5-avatar-group:** correct automatic colorScheme ([#11181](https://github.com/SAP/ui5-webcomponents/issues/11181)) ([be8925d](https://github.com/SAP/ui5-webcomponents/commit/be8925de1674aae140d9f81591ce5e50420f7ff7)), closes [#11113](https://github.com/SAP/ui5-webcomponents/issues/11113)
* **ui5-calendar:** fix month timestamp calculations ([#11226](https://github.com/SAP/ui5-webcomponents/issues/11226)) ([99ce641](https://github.com/SAP/ui5-webcomponents/commit/99ce6417e9bd8f66ddbb1b88c5c42fcd813e0abb)), closes [#11222](https://github.com/SAP/ui5-webcomponents/issues/11222)
* **ui5-calendar:** remove auto focus of current day on initial render ([#11213](https://github.com/SAP/ui5-webcomponents/issues/11213)) ([e57ab28](https://github.com/SAP/ui5-webcomponents/commit/e57ab2884890220b1179cde77d4dcf76f630cfbc)), closes [#10728](https://github.com/SAP/ui5-webcomponents/issues/10728)
* **ui5-date-picker:** display value state message in the value help ([#10919](https://github.com/SAP/ui5-webcomponents/issues/10919)) ([87eaa35](https://github.com/SAP/ui5-webcomponents/commit/87eaa359d2a643868f0e4a6f399376601ea32e94))
* **ui5-input:** change event firing after clear icon click ([#11147](https://github.com/SAP/ui5-webcomponents/issues/11147)) ([a02d941](https://github.com/SAP/ui5-webcomponents/commit/a02d941d4a97b1810d6bbb88ee74a29acd2e781d))
* **ui5-select:** add listbox role to meet ARIA parent-child requirements ([#11156](https://github.com/SAP/ui5-webcomponents/issues/11156)) ([dcb4edc](https://github.com/SAP/ui5-webcomponents/commit/dcb4edcf972376f343046dd651e3cd82a78307ed)), closes [#11151](https://github.com/SAP/ui5-webcomponents/issues/11151) [#11152](https://github.com/SAP/ui5-webcomponents/issues/11152)


### Features

* **ui5-select:** enhance `value` property ([#10904](https://github.com/SAP/ui5-webcomponents/issues/10904)) ([23707c5](https://github.com/SAP/ui5-webcomponents/commit/23707c57dee10e6d206b1ac04f5907f775dc20d7))





# [2.9.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.9.0-rc.1...v2.9.0-rc.2) (2025-03-27)


### Bug Fixes

* **framework:** .d.ts errors that require skipLibCheck ([#11189](https://github.com/SAP/ui5-webcomponents/issues/11189)) ([92f0e68](https://github.com/SAP/ui5-webcomponents/commit/92f0e68c3b3b71ff27f707621b8b3da2248a2719))
* **ui5-bar:** remove responsive paddings ([#11105](https://github.com/SAP/ui5-webcomponents/issues/11105)) ([e2024b1](https://github.com/SAP/ui5-webcomponents/commit/e2024b1bb7caaf12452a7e20b863eb569405706f)), closes [#10012](https://github.com/SAP/ui5-webcomponents/issues/10012)
* **ui5-breadcrumbs:** show all items in popover on mobile ([#11138](https://github.com/SAP/ui5-webcomponents/issues/11138)) ([4d75b7d](https://github.com/SAP/ui5-webcomponents/commit/4d75b7db79ede9beee7611dde03de818ba48ad61)), closes [#9697](https://github.com/SAP/ui5-webcomponents/issues/9697)
* **ui5-date-*:** make tests stable ([#11191](https://github.com/SAP/ui5-webcomponents/issues/11191)) ([b1d9311](https://github.com/SAP/ui5-webcomponents/commit/b1d931167bf29b600797974b29b788fbc3405b1f)), closes [#11188](https://github.com/SAP/ui5-webcomponents/issues/11188)
* **ui5-input:** remove additional icon in Edge ([#11114](https://github.com/SAP/ui5-webcomponents/issues/11114)) ([9d2dfb1](https://github.com/SAP/ui5-webcomponents/commit/9d2dfb1293194fce19c99157892ac2db6ceff62f))
* **ui5-popover:** fix popover flickering ([#10955](https://github.com/SAP/ui5-webcomponents/issues/10955)) ([712aae4](https://github.com/SAP/ui5-webcomponents/commit/712aae458b0a9279646ea079cb734674ae3e7b4f))
* **ui5-tree:** noDataText is now properly rendered ([#11095](https://github.com/SAP/ui5-webcomponents/issues/11095)) ([e1c152c](https://github.com/SAP/ui5-webcomponents/commit/e1c152cbec16a47dd42e9813c68c0052828d6cdf)), closes [#11073](https://github.com/SAP/ui5-webcomponents/issues/11073)





# [2.9.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.9.0-rc.0...v2.9.0-rc.1) (2025-03-20)


### Bug Fixes

* **ui5-carousel:** fix typo mistake ([#11107](https://github.com/SAP/ui5-webcomponents/issues/11107)) ([e23f746](https://github.com/SAP/ui5-webcomponents/commit/e23f746bca7b858b92b15d1d4903432d65289422)), closes [#11032](https://github.com/SAP/ui5-webcomponents/issues/11032)
* **ui5-combobox:** properly navigate with arrow down keys ([#11097](https://github.com/SAP/ui5-webcomponents/issues/11097)) ([967ef56](https://github.com/SAP/ui5-webcomponents/commit/967ef56962aa9f341305ed00a09177d62405a785)), closes [#11029](https://github.com/SAP/ui5-webcomponents/issues/11029)
* **ui5-input:** fire input event on escape key ([#11079](https://github.com/SAP/ui5-webcomponents/issues/11079)) ([8b85288](https://github.com/SAP/ui5-webcomponents/commit/8b852881dd9364216f5051b587f2e7e5102b4945)), closes [#11021](https://github.com/SAP/ui5-webcomponents/issues/11021)
* **ui5-li:** announce active state ([#11064](https://github.com/SAP/ui5-webcomponents/issues/11064)) ([b6b70a9](https://github.com/SAP/ui5-webcomponents/commit/b6b70a9f8ab2a78bceb0a8bca8ed2c12c63ea13d))
* **ui5-list-item-group-header:** typo fixed ([#11100](https://github.com/SAP/ui5-webcomponents/issues/11100)) ([e8af105](https://github.com/SAP/ui5-webcomponents/commit/e8af1059d118fc77dcaef0b7dd7012ad406fde7a))
* **ui5-menu-item:** remove dot from class ([#11119](https://github.com/SAP/ui5-webcomponents/issues/11119)) ([66bedb4](https://github.com/SAP/ui5-webcomponents/commit/66bedb421036af054cfc45a512953342f9917cdb)), closes [#11043](https://github.com/SAP/ui5-webcomponents/issues/11043)
* **ui5-menu:** fix menu item type fix ([#11129](https://github.com/SAP/ui5-webcomponents/issues/11129)) ([3e68c57](https://github.com/SAP/ui5-webcomponents/commit/3e68c576fb9a577e51acf99e0608691b15b213fb)), closes [#10933](https://github.com/SAP/ui5-webcomponents/issues/10933)
* **ui5-multi-combobox:** fix deletion of long tokens ([#11080](https://github.com/SAP/ui5-webcomponents/issues/11080)) ([5c6d746](https://github.com/SAP/ui5-webcomponents/commit/5c6d746b2354acc09172a53b0a1507ab3ff4458e)), closes [#10977](https://github.com/SAP/ui5-webcomponents/issues/10977)
* **ui5-multiinput:** correct failing test ([#11111](https://github.com/SAP/ui5-webcomponents/issues/11111)) ([b30330d](https://github.com/SAP/ui5-webcomponents/commit/b30330d38ae574f628611f21b9078ee98df7b592))
* **ui5-tag:** fix click event ([#11102](https://github.com/SAP/ui5-webcomponents/issues/11102)) ([3eec3bb](https://github.com/SAP/ui5-webcomponents/commit/3eec3bbbfc2fcaf6a5b4c6e70c7fcb7cd7e1bcec)), closes [#11096](https://github.com/SAP/ui5-webcomponents/issues/11096)


### Features

* **ui5-input:** support accessible description ([#10821](https://github.com/SAP/ui5-webcomponents/issues/10821)) ([410f4d2](https://github.com/SAP/ui5-webcomponents/commit/410f4d2fbc2f62742e419e437824a435c79fc6ef)), closes [#10131](https://github.com/SAP/ui5-webcomponents/issues/10131)
* **ui5-search:** introduce experimental component ([#11125](https://github.com/SAP/ui5-webcomponents/issues/11125)) ([48f16fb](https://github.com/SAP/ui5-webcomponents/commit/48f16fb1d05957b3779aeb4868f3cebe5cac5bc2))
* **ui5-select:** "icon" property introduced ([#11060](https://github.com/SAP/ui5-webcomponents/issues/11060)) ([0b242e3](https://github.com/SAP/ui5-webcomponents/commit/0b242e3e0e6d7c03dcbebd4fc798338627ebeb09)), closes [#10859](https://github.com/SAP/ui5-webcomponents/issues/10859)
* **ui5-side-navigation:** enable the web component in popover placement ([#10701](https://github.com/SAP/ui5-webcomponents/issues/10701)) ([a4565fe](https://github.com/SAP/ui5-webcomponents/commit/a4565fe3a3ecb5a3d150942ed72faabbbc770b4a))





# [2.9.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.8.1-rc.0...v2.9.0-rc.0) (2025-03-13)


### Bug Fixes

* **ui5-avatar-group:** fixed focus outline ([#11023](https://github.com/SAP/ui5-webcomponents/issues/11023)) ([138a3db](https://github.com/SAP/ui5-webcomponents/commit/138a3db72f218bbec5ee3fbb3a2cf54c239d83d2)), closes [#10963](https://github.com/SAP/ui5-webcomponents/issues/10963)
* **ui5-carousel:** update roles to match ACC specification ([#11032](https://github.com/SAP/ui5-webcomponents/issues/11032)) ([1594186](https://github.com/SAP/ui5-webcomponents/commit/1594186d1c44521f5ea590983c41afcecfe46b4e)), closes [#10198](https://github.com/SAP/ui5-webcomponents/issues/10198) [#8624](https://github.com/SAP/ui5-webcomponents/issues/8624)
* **ui5-combobox:** prevent 'change' event from being fired if the value is set programmatically ([#11048](https://github.com/SAP/ui5-webcomponents/issues/11048)) ([8643afe](https://github.com/SAP/ui5-webcomponents/commit/8643afee8476991e1fe6dcd910a5259f90fb35b6)), closes [#10959](https://github.com/SAP/ui5-webcomponents/issues/10959)
* **ui5-icon:** revert default mode to decorative ([#10969](https://github.com/SAP/ui5-webcomponents/issues/10969)) ([0662fc2](https://github.com/SAP/ui5-webcomponents/commit/0662fc2c87df0a92f14a2cfe463d6bae1ae3f598)), closes [#10835](https://github.com/SAP/ui5-webcomponents/issues/10835)
* **ui5-input:** add tabindex for icon slot ([#10975](https://github.com/SAP/ui5-webcomponents/issues/10975)) ([427307a](https://github.com/SAP/ui5-webcomponents/commit/427307a34c5fb84412b71bd6499b7feeccb21ce2))
* **ui5-list:** ensure no data text wraps instead of truncating ([#10934](https://github.com/SAP/ui5-webcomponents/issues/10934)) ([6c2324e](https://github.com/SAP/ui5-webcomponents/commit/6c2324ec19df041601c3039e81d297679b8adf32)), closes [#10346](https://github.com/SAP/ui5-webcomponents/issues/10346)
* **ui5-list:** prevent load-more event fire without scroll ([#10973](https://github.com/SAP/ui5-webcomponents/issues/10973)) ([65cc905](https://github.com/SAP/ui5-webcomponents/commit/65cc905da2236cbaf80cb2b24e67f8dab40c3cd0))
* **ui5-slider:** fire 'change' event on keyup ([#10803](https://github.com/SAP/ui5-webcomponents/issues/10803)) ([078d44c](https://github.com/SAP/ui5-webcomponents/commit/078d44c92d32c10756ddf848907386ccecd3d354)), closes [#10770](https://github.com/SAP/ui5-webcomponents/issues/10770)
* **ui5-switch:** remove delegate focus of switch ([#10798](https://github.com/SAP/ui5-webcomponents/issues/10798)) ([6202cbd](https://github.com/SAP/ui5-webcomponents/commit/6202cbd9d96f8b9aa061f5feac8050460d6be39b)), closes [#10588](https://github.com/SAP/ui5-webcomponents/issues/10588)
* **ui5-tabcontainer:** allow browser refresh shortcut to work ([#11035](https://github.com/SAP/ui5-webcomponents/issues/11035)) ([a4a0f02](https://github.com/SAP/ui5-webcomponents/commit/a4a0f028f44a60fd6caea0f4ecdac49b0289270d))
* **ui5-toolbar-button:** add hidden property ([#10915](https://github.com/SAP/ui5-webcomponents/issues/10915)) ([8ad378d](https://github.com/SAP/ui5-webcomponents/commit/8ad378d64e075068cf85f5e6ef6184cdafd9fc0f)), closes [#10585](https://github.com/SAP/ui5-webcomponents/issues/10585)


### Features

* **ui5-multi-combobox/ui5-combobox:** introduce open property ([#11044](https://github.com/SAP/ui5-webcomponents/issues/11044)) ([951e726](https://github.com/SAP/ui5-webcomponents/commit/951e7261ccc32c8f92e2538b356469556b0ab2b2))





## [2.8.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.8.0...v2.8.1-rc.0) (2025-03-06)


### Bug Fixes

* align input with icons to latest VD spec ([#10861](https://github.com/SAP/ui5-webcomponents/issues/10861)) ([feaff1d](https://github.com/SAP/ui5-webcomponents/commit/feaff1d587636d5a6d0dc1909c174b3de4acebec)), closes [#10597](https://github.com/SAP/ui5-webcomponents/issues/10597)
* **ui5-busy-indicator:** focus-redirect element has correct role="none" ([#11007](https://github.com/SAP/ui5-webcomponents/issues/11007)) ([467313a](https://github.com/SAP/ui5-webcomponents/commit/467313aee5e6b0e39e145cfd2fc6865d9396a045)), closes [#10846](https://github.com/SAP/ui5-webcomponents/issues/10846)
* **ui5-li:** safari issue duo to nested css selectors ([#11006](https://github.com/SAP/ui5-webcomponents/issues/11006)) ([46fe25b](https://github.com/SAP/ui5-webcomponents/commit/46fe25b299a342ad48b9da838e7baeeecb022190)), closes [#10872](https://github.com/SAP/ui5-webcomponents/issues/10872)





# [2.8.0](https://github.com/SAP/ui5-webcomponents/compare/v2.8.0-rc.3...v2.8.0) (2025-03-04)


### Bug Fixes

* **ui5-avatar-group:** fixed unnecessary rendering of overflow button ([#10979](https://github.com/SAP/ui5-webcomponents/issues/10979)) ([97ccd05](https://github.com/SAP/ui5-webcomponents/commit/97ccd0581de4ed2ae62648628598e20c47391f46)), closes [#10948](https://github.com/SAP/ui5-webcomponents/issues/10948)
* **ui5-popover:** ensure that popover is closed when mousedown propagation is stopped ([#10953](https://github.com/SAP/ui5-webcomponents/issues/10953)) ([dbd3ab7](https://github.com/SAP/ui5-webcomponents/commit/dbd3ab7ca3110bd5a90698514b5e032f4f6902f5))
* **ui5-switch:** reduce touch area according to VD spec ([#10954](https://github.com/SAP/ui5-webcomponents/issues/10954)) ([8cba1cf](https://github.com/SAP/ui5-webcomponents/commit/8cba1cfa1606edb7a595931481c182c97fd804a1))
* **ui5-token:** align selected token height with non selected ([#10868](https://github.com/SAP/ui5-webcomponents/issues/10868)) ([16af941](https://github.com/SAP/ui5-webcomponents/commit/16af941257c42d91d8dd098ccd9404d952d47d4d)), closes [#10444](https://github.com/SAP/ui5-webcomponents/issues/10444)
* **ui5-toolbar:** prevent default dialog announcement ([#10971](https://github.com/SAP/ui5-webcomponents/issues/10971)) ([edd54da](https://github.com/SAP/ui5-webcomponents/commit/edd54da0493022d0367e17b30de7abe702806390)), closes [#10324](https://github.com/SAP/ui5-webcomponents/issues/10324)


### Features

* **framework:** add `.currentTarget` to the type of event handler in TSX and UI5CustomEvent ([#10957](https://github.com/SAP/ui5-webcomponents/issues/10957)) ([f56753c](https://github.com/SAP/ui5-webcomponents/commit/f56753c5142d6e817b05d7e33bd160f09c2d5205))
* **ui5-tabcontainer:** add `noAutoSelection` property ([#10877](https://github.com/SAP/ui5-webcomponents/issues/10877)) ([581a626](https://github.com/SAP/ui5-webcomponents/commit/581a626f37fd8d05195555fae2e1d1b2a7a41498))





# [2.8.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.8.0-rc.2...v2.8.0-rc.3) (2025-02-27)


### Bug Fixes

* **ui5-input:** call change before submit event ([#10613](https://github.com/SAP/ui5-webcomponents/issues/10613)) ([3c3d641](https://github.com/SAP/ui5-webcomponents/commit/3c3d6410da70eec6f979c134539a0e2227be997b)), closes [#10534](https://github.com/SAP/ui5-webcomponents/issues/10534)
* **ui5-list:** improved acc description when groups are available ([#10561](https://github.com/SAP/ui5-webcomponents/issues/10561)) ([a7a981c](https://github.com/SAP/ui5-webcomponents/commit/a7a981c9095737941baa3c4052c4718cc9088713))
* **ui5-menu:** prevent global line-height inheritance ([#10916](https://github.com/SAP/ui5-webcomponents/issues/10916)) ([f6682b2](https://github.com/SAP/ui5-webcomponents/commit/f6682b2d076df747e74058b0b156b3cf0627952d))
* **ui5-notification-list:** improve keyboard accessibility for the "More" button ([#10822](https://github.com/SAP/ui5-webcomponents/issues/10822)) ([b659fe2](https://github.com/SAP/ui5-webcomponents/commit/b659fe2faeb42eb052dafcc0c16215a3bf1f1926))
* **ui5-popover, ui5-dialog:** fix finding keyboard focusable scroll containers ([#10891](https://github.com/SAP/ui5-webcomponents/issues/10891)) ([ed26b90](https://github.com/SAP/ui5-webcomponents/commit/ed26b9051ef02772d748de463b9b3084de12ebe8))
* **ui5-popover, ui5-dialog:** fix preventDefault for before-open and before-close events ([#10883](https://github.com/SAP/ui5-webcomponents/issues/10883)) ([e32e7ba](https://github.com/SAP/ui5-webcomponents/commit/e32e7ba83e4a950a7ad4745c302cc34b57c4cb8e))
* **ui5-text:** provide more optimal truncation for single line text ([#10794](https://github.com/SAP/ui5-webcomponents/issues/10794)) ([7e7b8ad](https://github.com/SAP/ui5-webcomponents/commit/7e7b8ad2dfa6bace21310697fac8c87f96689574))
* **ui5-tokenizer:** fix overflow mechanism ([#10901](https://github.com/SAP/ui5-webcomponents/issues/10901)) ([febd3f9](https://github.com/SAP/ui5-webcomponents/commit/febd3f9f3dbc60e4776f19ee4003c4ec072c28b9))


### Features

* **ui5-search-field:** introduce base component ([#10922](https://github.com/SAP/ui5-webcomponents/issues/10922)) ([f4489c0](https://github.com/SAP/ui5-webcomponents/commit/f4489c0cecd8c0f2f7916b39e2183193f171f725))
* **ui5-select:** introduced tooltip property ([#10944](https://github.com/SAP/ui5-webcomponents/issues/10944)) ([c365aa3](https://github.com/SAP/ui5-webcomponents/commit/c365aa30b5abab1fda5fc109d74ab27a676badae)), closes [#10855](https://github.com/SAP/ui5-webcomponents/issues/10855)
* **ui5-table:** single and multi selection components added ([#10897](https://github.com/SAP/ui5-webcomponents/issues/10897)) ([f3b069c](https://github.com/SAP/ui5-webcomponents/commit/f3b069ce6931567f54e6671fb133c9a59318500b))
* update sap/icons to v5.11 & 4.23 ([#10930](https://github.com/SAP/ui5-webcomponents/issues/10930)) ([47b5942](https://github.com/SAP/ui5-webcomponents/commit/47b59428abf9e9dbcfd6556143efe1e1046b4c3d))





# [2.8.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.8.0-rc.1...v2.8.0-rc.2) (2025-02-20)


### Bug Fixes

* **ui5-avatar:** fix acc-name announcement ([#10854](https://github.com/SAP/ui5-webcomponents/issues/10854)) ([cb37653](https://github.com/SAP/ui5-webcomponents/commit/cb37653ae80a82ba0a588d127490798f787705af)), closes [#10461](https://github.com/SAP/ui5-webcomponents/issues/10461)
* **ui5-checkbox:** ensure consistent focus behavior ([#10639](https://github.com/SAP/ui5-webcomponents/issues/10639)) ([a73c8d8](https://github.com/SAP/ui5-webcomponents/commit/a73c8d814e7769d81ba43d2239f51269a6fe0859))
* **ui5-list:** add correct focus style and accessibility roles for no-data item ([#10503](https://github.com/SAP/ui5-webcomponents/issues/10503)) ([9a0bc7c](https://github.com/SAP/ui5-webcomponents/commit/9a0bc7c33f3ff104c50e84f7ffecf69f7dfe116a)), closes [#10436](https://github.com/SAP/ui5-webcomponents/issues/10436)
* **ui5-popover:** don't close the popover if the opener is clicked ([#10780](https://github.com/SAP/ui5-webcomponents/issues/10780)) ([bc9eb08](https://github.com/SAP/ui5-webcomponents/commit/bc9eb0841074918d5c26ee7a37b51f8284ce87ae))
* **ui5-popover:** popover is opened from header slot ([#10856](https://github.com/SAP/ui5-webcomponents/issues/10856)) ([c224672](https://github.com/SAP/ui5-webcomponents/commit/c22467261d7598fdc080fde214bf737142715865)), closes [#10544](https://github.com/SAP/ui5-webcomponents/issues/10544)
* **ui5-tag:** fix tag alignment ([#10852](https://github.com/SAP/ui5-webcomponents/issues/10852)) ([ae629dc](https://github.com/SAP/ui5-webcomponents/commit/ae629dce61baa751819e7b968cb4fa779309f4e1)), closes [#10810](https://github.com/SAP/ui5-webcomponents/issues/10810)


### Features

* **ui5-table-header-cell:** add popinHidden property ([#10834](https://github.com/SAP/ui5-webcomponents/issues/10834)) ([12e7dcd](https://github.com/SAP/ui5-webcomponents/commit/12e7dcd187f9f94150643bab7cbdc8ad7590337c))





# [2.8.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.8.0-rc.0...v2.8.0-rc.1) (2025-02-13)


### Bug Fixes

* **ui5-button:** remove tap highlight on safari ([#10786](https://github.com/SAP/ui5-webcomponents/issues/10786)) ([ac83d60](https://github.com/SAP/ui5-webcomponents/commit/ac83d60ab0feb0681535a59f500f213c1b262c16))
* **ui5-table:** update select all checkbox ([#10833](https://github.com/SAP/ui5-webcomponents/issues/10833)) ([819edcd](https://github.com/SAP/ui5-webcomponents/commit/819edcd51b04d60634fa8faa8f5c6b256eac99f5)), closes [#10658](https://github.com/SAP/ui5-webcomponents/issues/10658) [#10574](https://github.com/SAP/ui5-webcomponents/issues/10574) [#10804](https://github.com/SAP/ui5-webcomponents/issues/10804)
* **ui5-time-picker:** display value state message in popover's header correctly on mobile ([#10795](https://github.com/SAP/ui5-webcomponents/issues/10795)) ([accc3d6](https://github.com/SAP/ui5-webcomponents/commit/accc3d69fba53bb98eca0dc924f388212bc14566))


### Features

* **ui5-link:** introduce reactive area size property ([#10762](https://github.com/SAP/ui5-webcomponents/issues/10762)) ([6ff54ce](https://github.com/SAP/ui5-webcomponents/commit/6ff54ce57ce2bb84f0adcccc209b740f6749d27e))
* **ui5-table:** action header cell is added ([#10698](https://github.com/SAP/ui5-webcomponents/issues/10698)) ([ff6d77d](https://github.com/SAP/ui5-webcomponents/commit/ff6d77d46a6c4fde07935fed5914ce8807f90032))





# [2.8.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.7.0...v2.8.0-rc.0) (2025-02-06)


### Bug Fixes

* **ui5-avatar:** announce initials ([#10755](https://github.com/SAP/ui5-webcomponents/issues/10755)) ([a14325b](https://github.com/SAP/ui5-webcomponents/commit/a14325ba15d58ec155814edb07f1cab4c8cdf4bf))
* **ui5-button-badge:** remove text when in attention dot mode ([#10768](https://github.com/SAP/ui5-webcomponents/issues/10768)) ([641fac8](https://github.com/SAP/ui5-webcomponents/commit/641fac8c3590da3e796164219520a75e10da5407))


### Features

* **ui5-input:** visual selection on type-ahead ([#10675](https://github.com/SAP/ui5-webcomponents/issues/10675)) ([1b2cd71](https://github.com/SAP/ui5-webcomponents/commit/1b2cd71de2a71b8296bcc2a19f152d3670c00c7b))





# [2.7.0](https://github.com/SAP/ui5-webcomponents/compare/v2.7.0-rc.2...v2.7.0) (2025-02-03)


### Bug Fixes

* **ui5-calendar:** add tooltips to special dates ([#10335](https://github.com/SAP/ui5-webcomponents/issues/10335)) ([b5b5a73](https://github.com/SAP/ui5-webcomponents/commit/b5b5a7397dae69e653713a361a8c9c716b92cc0a))
* **ui5-calendar:** using the correct parameter for UTC when formatting a date ([#10713](https://github.com/SAP/ui5-webcomponents/issues/10713)) ([9ae1f63](https://github.com/SAP/ui5-webcomponents/commit/9ae1f639990a5cffe2307be303c03410a7d8f08d))
* **ui5-file-uploder:** match focus correctly with screen readers ([#10700](https://github.com/SAP/ui5-webcomponents/issues/10700)) ([a10b91d](https://github.com/SAP/ui5-webcomponents/commit/a10b91dfc78b5c292f0248241fac538b9d81e360))
* **ui5-menu-item:** align arrow indication color ([#10695](https://github.com/SAP/ui5-webcomponents/issues/10695)) ([bd898c0](https://github.com/SAP/ui5-webcomponents/commit/bd898c0e2199b53856d2dc648fce32944aa188a9))
* **ui5-message-strip:** close event bubbling ([#10690](https://github.com/SAP/ui5-webcomponents/issues/10690)) ([6bbc4c5](https://github.com/SAP/ui5-webcomponents/commit/6bbc4c58462c24671ff632ed8a4d1569a419ac74))
* **ui5-select:** improved custom value state click behavior ([#10738](https://github.com/SAP/ui5-webcomponents/issues/10738)) ([f314e4f](https://github.com/SAP/ui5-webcomponents/commit/f314e4fcb5c491da189f156bfa68b70d3c3efbd6)), closes [#10661](https://github.com/SAP/ui5-webcomponents/issues/10661)
* **ui5-side-navigation:** apply aria-haspopup to items in overflow ([#10686](https://github.com/SAP/ui5-webcomponents/issues/10686)) ([9550875](https://github.com/SAP/ui5-webcomponents/commit/9550875d65dda77118f7644e081ebf34eedf4d2a))
* **ui5-tokenizer:** fix token-delete event details ([#10630](https://github.com/SAP/ui5-webcomponents/issues/10630)) ([c1206ae](https://github.com/SAP/ui5-webcomponents/commit/c1206aea539f4286cc8ea428aa66988095af292b)), closes [#10612](https://github.com/SAP/ui5-webcomponents/issues/10612)





# [2.7.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.7.0-rc.1...v2.7.0-rc.2) (2025-01-30)


### Bug Fixes

* **f6navigation:** fast navigation in certain container only ([#10485](https://github.com/SAP/ui5-webcomponents/issues/10485)) ([4b2ab63](https://github.com/SAP/ui5-webcomponents/commit/4b2ab63cae9b175f07d266e4150a587756cd7f6c))
* **ui5-button-badge:** align template ([#10705](https://github.com/SAP/ui5-webcomponents/issues/10705)) ([cacdf54](https://github.com/SAP/ui5-webcomponents/commit/cacdf542c594e8e6e168c77c7622647041e27cd2))
* **ui5-multi-combobox:** fix valueState background set while typing ([#10586](https://github.com/SAP/ui5-webcomponents/issues/10586)) ([06243e4](https://github.com/SAP/ui5-webcomponents/commit/06243e494715e01230d6efab79b1b3f1212c9ac5)), closes [#10454](https://github.com/SAP/ui5-webcomponents/issues/10454)
* **ui5-rating-indicator:** allow tab next/prev when readonly ([#10584](https://github.com/SAP/ui5-webcomponents/issues/10584)) ([ad01c1a](https://github.com/SAP/ui5-webcomponents/commit/ad01c1a384f3788c3a14c1ed77de41e4072cd7b9)), closes [#10580](https://github.com/SAP/ui5-webcomponents/issues/10580)
* **ui5-select:** custom value state message is now visible ([#10647](https://github.com/SAP/ui5-webcomponents/issues/10647)) ([f5d1a8f](https://github.com/SAP/ui5-webcomponents/commit/f5d1a8f89c2b14cc6e753f6e12e1f805e859ac7f)), closes [#10323](https://github.com/SAP/ui5-webcomponents/issues/10323)
* **ui5-switch:** apply focus only on root element click ([#10588](https://github.com/SAP/ui5-webcomponents/issues/10588)) ([6ff93c5](https://github.com/SAP/ui5-webcomponents/commit/6ff93c5afc4f4320eca0449f91e7a29ba306d05a))
* **ui5-table:** fix selector column width ([#10640](https://github.com/SAP/ui5-webcomponents/issues/10640)) ([cdcb599](https://github.com/SAP/ui5-webcomponents/commit/cdcb599775c01f562965dcf2343242c8a5fb4aca))
* **ui5-timepicker:** adapt new private component with internal logic ([#10684](https://github.com/SAP/ui5-webcomponents/issues/10684)) ([d0a45ab](https://github.com/SAP/ui5-webcomponents/commit/d0a45abb899811d549c08cfe1ad40b8f66b7a728))


### Features

* **ui5-button:** add badge to ui5-button ([#10642](https://github.com/SAP/ui5-webcomponents/issues/10642)) ([1e693fd](https://github.com/SAP/ui5-webcomponents/commit/1e693fd5b1fc80a5eb7b82a43cf34bd33eccb9fb))
* **ui5-button:** introduce CSS Shadow parts ([#10628](https://github.com/SAP/ui5-webcomponents/issues/10628)) ([cda7d8b](https://github.com/SAP/ui5-webcomponents/commit/cda7d8b30abf013ea98932ed20848123b025aeaa)), closes [#10611](https://github.com/SAP/ui5-webcomponents/issues/10611)
* **ui5-colorpicker:** adjust visual design ([#10495](https://github.com/SAP/ui5-webcomponents/issues/10495)) ([600ab25](https://github.com/SAP/ui5-webcomponents/commit/600ab25a0ccf2e69d97bc40f44ac94f4a7e740eb))
* **ui5-menu:** Enhance keyboard navigation ([#10243](https://github.com/SAP/ui5-webcomponents/issues/10243)) ([34d604d](https://github.com/SAP/ui5-webcomponents/commit/34d604d3e63a4d2a15cdc0a1222c568f379ed333))
* **ui5-split-button, etc:** introduce new parameters ([#10680](https://github.com/SAP/ui5-webcomponents/issues/10680)) ([af32326](https://github.com/SAP/ui5-webcomponents/commit/af32326a551d5be858e470e374e1c0f6e07c75d1))
* **ui5-time-picker:** Improve component based on user testing ([#10577](https://github.com/SAP/ui5-webcomponents/issues/10577)) ([e687547](https://github.com/SAP/ui5-webcomponents/commit/e687547045d2d58b91a165f4ef27bcc0c74dbf47))
* update sap/icons to v5.11.1 & 4.23 ([#10692](https://github.com/SAP/ui5-webcomponents/issues/10692)) ([4545ef7](https://github.com/SAP/ui5-webcomponents/commit/4545ef7998bbd52782d476486957debd633ec1af))





# [2.7.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.7.0-rc.0...v2.7.0-rc.1) (2025-01-23)


### Bug Fixes

* **popup:** applying focus twice ([#10556](https://github.com/SAP/ui5-webcomponents/issues/10556)) ([27721a9](https://github.com/SAP/ui5-webcomponents/commit/27721a9518ac03efc0d2fb764442334bb07c6daf))
* **ui5-card:** fix accessibiity role position ([#10437](https://github.com/SAP/ui5-webcomponents/issues/10437)) ([c9d7f3f](https://github.com/SAP/ui5-webcomponents/commit/c9d7f3ffec9ce02d465de03a5a946144ba31f0d5))
* **ui5-tab:** semantic icon is properly aligned in high contrast themes ([#10467](https://github.com/SAP/ui5-webcomponents/issues/10467)) ([e263974](https://github.com/SAP/ui5-webcomponents/commit/e2639745f6aa1ae669dce7f3205a531a672ed711)), closes [#10455](https://github.com/SAP/ui5-webcomponents/issues/10455)
* **ui5-time-picker:** display value state message in popover headers ([#10582](https://github.com/SAP/ui5-webcomponents/issues/10582)) ([df57f06](https://github.com/SAP/ui5-webcomponents/commit/df57f06a5e10f44ac784b33bc79b1e705f106476))
* **ui5-toolbar:** correct event handlers attachment ([#10546](https://github.com/SAP/ui5-webcomponents/issues/10546)) ([f6d6c67](https://github.com/SAP/ui5-webcomponents/commit/f6d6c6703a02785fc790ef0794c972aeee115c60))
* **ui5-tree:** improve keydown handling in content slot ([#10520](https://github.com/SAP/ui5-webcomponents/issues/10520)) ([1e01523](https://github.com/SAP/ui5-webcomponents/commit/1e01523569701da558d0ee3470c6936358dea457)), closes [#10474](https://github.com/SAP/ui5-webcomponents/issues/10474)


### Features

* **ui5-color-picker:** add HSL color selection ([#10157](https://github.com/SAP/ui5-webcomponents/issues/10157)) ([8d0e5a4](https://github.com/SAP/ui5-webcomponents/commit/8d0e5a492c9705499571ef223524f051454e766c)), closes [#10275](https://github.com/SAP/ui5-webcomponents/issues/10275)
* update business-suite/icons to v2.087 & 1.087 ([#10605](https://github.com/SAP/ui5-webcomponents/issues/10605)) ([6b7dbf0](https://github.com/SAP/ui5-webcomponents/commit/6b7dbf09dd253de3e399d257441a386dc000c5ff))
* update tnt/icons to v3.5 & 2.11 ([#10600](https://github.com/SAP/ui5-webcomponents/issues/10600)) ([5d4e3ba](https://github.com/SAP/ui5-webcomponents/commit/5d4e3ba1a74b2f4bea2321371656cbdbebc27975))





# [2.7.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.6.2...v2.7.0-rc.0) (2025-01-16)


### Bug Fixes

* ai button and color palette bring their own items ([#10517](https://github.com/SAP/ui5-webcomponents/issues/10517)) ([11b9356](https://github.com/SAP/ui5-webcomponents/commit/11b9356a13d01ece1ebcf4185b61259b9ad6d364))
* **ui5-form:** prevent content overflow ([#10552](https://github.com/SAP/ui5-webcomponents/issues/10552)) ([819a453](https://github.com/SAP/ui5-webcomponents/commit/819a453c1a9dd8c55a89c6c32c34e73f9e127e86))
* **ui5-label:** adjust asterisk size ([#10533](https://github.com/SAP/ui5-webcomponents/issues/10533)) ([44a245d](https://github.com/SAP/ui5-webcomponents/commit/44a245d685c0ace10f93af21652c6c89eb421498)), closes [#10494](https://github.com/SAP/ui5-webcomponents/issues/10494)
* **ui5-popover:** fix opener reference ([#10507](https://github.com/SAP/ui5-webcomponents/issues/10507)) ([a38a28e](https://github.com/SAP/ui5-webcomponents/commit/a38a28e11245e0121bd0a2d6b9d1f5b294952a42))
* **ui5-toast:** fix template and remove additional text ([#10559](https://github.com/SAP/ui5-webcomponents/issues/10559)) ([ad8f08f](https://github.com/SAP/ui5-webcomponents/commit/ad8f08f1a1b8d2e02b3a929afa46a38ae708feb3))
* **ui5-toolbar:** correct display of overflow button in hidden container ([#10529](https://github.com/SAP/ui5-webcomponents/issues/10529)) ([3a2f8e3](https://github.com/SAP/ui5-webcomponents/commit/3a2f8e365a2319176e70e4e8cc8e575f58511c6f))
* **ui5-toolbar:** overflow behaviour ([#10547](https://github.com/SAP/ui5-webcomponents/issues/10547)) ([8df4eb2](https://github.com/SAP/ui5-webcomponents/commit/8df4eb215a15e37df225bbd98836719b584f3065))


### Features

* **ui5-side-navigation:** update existing design for Horizon theme ([#10337](https://github.com/SAP/ui5-webcomponents/issues/10337)) ([d5eff51](https://github.com/SAP/ui5-webcomponents/commit/d5eff51f56042d5fbf94e87d6bd94cdbe2d55982))
* **ui5-table:** popin-text property added ([#10514](https://github.com/SAP/ui5-webcomponents/issues/10514)) ([a01a303](https://github.com/SAP/ui5-webcomponents/commit/a01a3036526cd02eaac1a973ac5054a7c9c8a194))
* **ui5-table:** table row actions feature added ([#10460](https://github.com/SAP/ui5-webcomponents/issues/10460)) ([dfe09ae](https://github.com/SAP/ui5-webcomponents/commit/dfe09ae51987ef6237fccfbf0bcb76abb8251dee))





## [2.6.2](https://github.com/SAP/ui5-webcomponents/compare/v2.6.2-rc.0...v2.6.2) (2025-01-09)


### Bug Fixes

* **build:** fix incorrect module ref in custom-elements-manifest ([#10497](https://github.com/SAP/ui5-webcomponents/issues/10497)) ([ea8cdea](https://github.com/SAP/ui5-webcomponents/commit/ea8cdea0b43f31c11479aa2997387be0ef71c6cb))





## [2.6.2-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.6.1...v2.6.2-rc.0) (2025-01-09)


### Bug Fixes

* **ui5-avatar:** tooltip is now visible on badge ([#10498](https://github.com/SAP/ui5-webcomponents/issues/10498)) ([12000d6](https://github.com/SAP/ui5-webcomponents/commit/12000d6f117e2ce51bc44a8c6f52a71aa1268b1a))





## [2.6.1](https://github.com/SAP/ui5-webcomponents/compare/v2.6.0...v2.6.1) (2025-01-08)

**Note:** Version bump only for package @ui5/webcomponents





# [2.6.0](https://github.com/SAP/ui5-webcomponents/compare/v2.6.0-rc.5...v2.6.0) (2025-01-07)

**Note:** Version bump only for package @ui5/webcomponents





# [2.6.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v2.6.0-rc.4...v2.6.0-rc.5) (2025-01-07)


### Bug Fixes

* **f6navigation:** skip hidden elements ([#10325](https://github.com/SAP/ui5-webcomponents/issues/10325)) ([374d4d8](https://github.com/SAP/ui5-webcomponents/commit/374d4d82239f1309231c8516c20be8c160e81e40)), closes [#10236](https://github.com/SAP/ui5-webcomponents/issues/10236)
* **framework:** getComponentFeature can return undefined ([#10456](https://github.com/SAP/ui5-webcomponents/issues/10456)) ([7da765c](https://github.com/SAP/ui5-webcomponents/commit/7da765c8c7f3831e25bffa557dd059e819be30ba))
* remove dependencies for TSX components and fix features ([#10449](https://github.com/SAP/ui5-webcomponents/issues/10449)) ([a2b5f6f](https://github.com/SAP/ui5-webcomponents/commit/a2b5f6fb768499a8b757a9b7abad5f19033a33a7))
* **ui5-tab-container:** remove text shadow ([#10452](https://github.com/SAP/ui5-webcomponents/issues/10452)) ([ef59e50](https://github.com/SAP/ui5-webcomponents/commit/ef59e50bc7423af783c722d32d10d596009ff331)), closes [#10262](https://github.com/SAP/ui5-webcomponents/issues/10262)





# [2.6.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v2.6.0-rc.3...v2.6.0-rc.4) (2025-01-02)

**Note:** Version bump only for package @ui5/webcomponents





# [2.6.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.6.0-rc.2...v2.6.0-rc.3) (2024-12-26)


### Bug Fixes

* **ui5-popover:** allow setting `opener` to an abstract element DOM reference ([#10419](https://github.com/SAP/ui5-webcomponents/issues/10419)) ([1dd8c2e](https://github.com/SAP/ui5-webcomponents/commit/1dd8c2e4d1d8f5d1fcc57f0d5d53c8639e271cb5))
* **ui5-popover:** fix finding opener ([#10414](https://github.com/SAP/ui5-webcomponents/issues/10414)) ([36f1565](https://github.com/SAP/ui5-webcomponents/commit/36f1565a0880af8a24a82d9ae5c57f25cff2f53b))


### Features

* **ui5-ai-button:** implement split button functionality ([#10242](https://github.com/SAP/ui5-webcomponents/issues/10242)) ([55c9e4d](https://github.com/SAP/ui5-webcomponents/commit/55c9e4d67800d82a0d357eda8859b78d69dc25ab))
* **ui5-rating-indicator:** provide the possibility to set size of the icons ([#10406](https://github.com/SAP/ui5-webcomponents/issues/10406)) ([a01eccb](https://github.com/SAP/ui5-webcomponents/commit/a01eccb150e631cb5609ccef1579b52f2399975e))





# [2.6.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.6.0-rc.1...v2.6.0-rc.2) (2024-12-19)


### Bug Fixes

* **ui5-carousel:** hideNavigationArrows property works on touch devices ([#10397](https://github.com/SAP/ui5-webcomponents/issues/10397)) ([e655644](https://github.com/SAP/ui5-webcomponents/commit/e6556440aae4a1200902776a2450f9e1b9997633))
* **ui5-cb/mcb-item:** handle setting malicious text ([#10382](https://github.com/SAP/ui5-webcomponents/issues/10382)) ([9b4cd2b](https://github.com/SAP/ui5-webcomponents/commit/9b4cd2b7c6c083694814f0e96ccaf6b3cd275805))
* **ui5-file-uploader:** use optional chain in onclick check ([#10408](https://github.com/SAP/ui5-webcomponents/issues/10408)) ([8e100d4](https://github.com/SAP/ui5-webcomponents/commit/8e100d45d1591f4683a2b7ea80c30e67dc58016c))
* **ui5-multi-input:** one token added on enter press ([#10385](https://github.com/SAP/ui5-webcomponents/issues/10385)) ([54ee836](https://github.com/SAP/ui5-webcomponents/commit/54ee836eeb8ceb6a648145b35be221004e35a06d))
* **ui5-table:** apply focus over whole row ([#10407](https://github.com/SAP/ui5-webcomponents/issues/10407)) ([bbe7d57](https://github.com/SAP/ui5-webcomponents/commit/bbe7d57b41738c333c8042b6d086c5aaf8ffe153)), closes [#10286](https://github.com/SAP/ui5-webcomponents/issues/10286)
* **ui5-toolbar:** hide overflow button when content fits ([#10405](https://github.com/SAP/ui5-webcomponents/issues/10405)) ([4ac9428](https://github.com/SAP/ui5-webcomponents/commit/4ac9428ad3b2a91549f683b45badb716f3a7b594)), closes [#10376](https://github.com/SAP/ui5-webcomponents/issues/10376)


### Features

* **ui5-color-palette:** set selected color to inner color picker ([#10276](https://github.com/SAP/ui5-webcomponents/issues/10276)) ([7a152a1](https://github.com/SAP/ui5-webcomponents/commit/7a152a1dc0defcb031d859012f4310ca5c52bee4)), closes [#8772](https://github.com/SAP/ui5-webcomponents/issues/8772)





# [2.6.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.6.0-rc.0...v2.6.0-rc.1) (2024-12-16)


### Bug Fixes

* **ui5-list:** focus list on non-focusable child click ([#10124](https://github.com/SAP/ui5-webcomponents/issues/10124)) ([6f98645](https://github.com/SAP/ui5-webcomponents/commit/6f9864593f4c4e54162ba203d10734d308c14e4f)), closes [#10096](https://github.com/SAP/ui5-webcomponents/issues/10096)
* **ui5-list:** stop tab index change propagation ([#10354](https://github.com/SAP/ui5-webcomponents/issues/10354)) ([d130b8f](https://github.com/SAP/ui5-webcomponents/commit/d130b8f1d28b8fac3c78fb786dc0d57c5841043e)), closes [#10120](https://github.com/SAP/ui5-webcomponents/issues/10120)
* **ui5-popover:** fix finding opener ([#10360](https://github.com/SAP/ui5-webcomponents/issues/10360)) ([941c6eb](https://github.com/SAP/ui5-webcomponents/commit/941c6eb215daf664d79448e7fe10d2e3ca7289e2))





# [2.6.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.5.0...v2.6.0-rc.0) (2024-12-12)


### Bug Fixes

* **ui5-breadcrumbs:** accessible name of popover ([#10319](https://github.com/SAP/ui5-webcomponents/issues/10319)) ([e53bd79](https://github.com/SAP/ui5-webcomponents/commit/e53bd79ea06c62ed5155f34d435245ba5a1e17fe)), closes [#10176](https://github.com/SAP/ui5-webcomponents/issues/10176)
* **ui5-calendar-legend:** add accessibility semantics ([#10333](https://github.com/SAP/ui5-webcomponents/issues/10333)) ([26af039](https://github.com/SAP/ui5-webcomponents/commit/26af0390b712b39cbc254fb96ef4e62c3e53d095)), closes [#10298](https://github.com/SAP/ui5-webcomponents/issues/10298)
* **ui5-color-picker:** add tooltip to sliders ([#10270](https://github.com/SAP/ui5-webcomponents/issues/10270)) ([06a5fdb](https://github.com/SAP/ui5-webcomponents/commit/06a5fdb2d67f82e529d8d402e2282677ba7fa81a)), closes [#10203](https://github.com/SAP/ui5-webcomponents/issues/10203)
* **ui5-combobox:** add gap between text and additional-text ([#10341](https://github.com/SAP/ui5-webcomponents/issues/10341)) ([373ecbc](https://github.com/SAP/ui5-webcomponents/commit/373ecbc7cb2e4e90c7232f0b11f47ea84365fd6e)), closes [#9450](https://github.com/SAP/ui5-webcomponents/issues/9450)
* **ui5-input:** remove initial tabindex 0 from suggestions ([#10304](https://github.com/SAP/ui5-webcomponents/issues/10304)) ([5871352](https://github.com/SAP/ui5-webcomponents/commit/58713522daf2a20051826708ab1c1d9552425fec)), closes [#9340](https://github.com/SAP/ui5-webcomponents/issues/9340)
* **ui5-menu-item:** adjust cursor style ([#10353](https://github.com/SAP/ui5-webcomponents/issues/10353)) ([410ba45](https://github.com/SAP/ui5-webcomponents/commit/410ba45fd3e2134a4ddd89b84e53ad6b1acbe8a2)), closes [#10331](https://github.com/SAP/ui5-webcomponents/issues/10331) [#10342](https://github.com/SAP/ui5-webcomponents/issues/10342)
* **ui5-popover:** fix finding opener when popover is not in the DOM ([#10338](https://github.com/SAP/ui5-webcomponents/issues/10338)) ([7c78317](https://github.com/SAP/ui5-webcomponents/commit/7c78317de761a32da529235357475b1e301b6173))
* **ui5-table-row:** add left and right borders ([#10285](https://github.com/SAP/ui5-webcomponents/issues/10285)) ([1bf8ba6](https://github.com/SAP/ui5-webcomponents/commit/1bf8ba64180c56e0fe896ebc490255b596986105)), closes [#10188](https://github.com/SAP/ui5-webcomponents/issues/10188)
* **ui5-table:** check for undefined in table type guard ([#10343](https://github.com/SAP/ui5-webcomponents/issues/10343)) ([e41370f](https://github.com/SAP/ui5-webcomponents/commit/e41370f4869fdc7e37f9dc293a2b7519c10bb6ee)), closes [#10340](https://github.com/SAP/ui5-webcomponents/issues/10340)
* **ui5-toast:** implement popover api to ensure toast is top level element ([#10178](https://github.com/SAP/ui5-webcomponents/issues/10178)) ([fb599d4](https://github.com/SAP/ui5-webcomponents/commit/fb599d4657e271dfbf4ff8151c36ef400f04d3f6))


### Features

* **framework:** add JSX template support with TypeScript ([#10046](https://github.com/SAP/ui5-webcomponents/issues/10046)) ([f42e7c1](https://github.com/SAP/ui5-webcomponents/commit/f42e7c18c846f923df4fec6ae02f1b4c20c006fa))
* **ui5-expandable-text:** add ExpandableText component ([#10220](https://github.com/SAP/ui5-webcomponents/issues/10220)) ([7667585](https://github.com/SAP/ui5-webcomponents/commit/766758567b13a78a4dceb3dcc5a070d2621432e2))
* **ui5-message-strip:** close button ACC enhancement ([#10283](https://github.com/SAP/ui5-webcomponents/issues/10283)) ([dfaa45f](https://github.com/SAP/ui5-webcomponents/commit/dfaa45f5926595d0f4179f0c0b6a57b3c87f5081)), closes [#9874](https://github.com/SAP/ui5-webcomponents/issues/9874)
* **ui5-step-input:** add input event ([#10294](https://github.com/SAP/ui5-webcomponents/issues/10294)) ([84cf7b2](https://github.com/SAP/ui5-webcomponents/commit/84cf7b2bbdc7eff3c969dff27ff7c4be8ad359a3)), closes [#5177](https://github.com/SAP/ui5-webcomponents/issues/5177)
* **ui5-table:** implement drag and drop ([#9955](https://github.com/SAP/ui5-webcomponents/issues/9955)) ([9f27a51](https://github.com/SAP/ui5-webcomponents/commit/9f27a512255f6e168d783cfed8b60d578030b581)), closes [#7240](https://github.com/SAP/ui5-webcomponents/issues/7240)





# [2.5.0](https://github.com/SAP/ui5-webcomponents/compare/v2.5.0-rc.3...v2.5.0) (2024-12-05)

**Note:** Version bump only for package @ui5/webcomponents





# [2.5.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.5.0-rc.2...v2.5.0-rc.3) (2024-12-05)


### Bug Fixes

* **ui5-li:** address additional text contrast issue ([#10269](https://github.com/SAP/ui5-webcomponents/issues/10269)) ([6cf15d9](https://github.com/SAP/ui5-webcomponents/commit/6cf15d922276898614b758532923af98557a929d)), closes [#9869](https://github.com/SAP/ui5-webcomponents/issues/9869)
* **ui5-list:** enable focusin event bubbling ([#10156](https://github.com/SAP/ui5-webcomponents/issues/10156)) ([3b6cc84](https://github.com/SAP/ui5-webcomponents/commit/3b6cc8457ab47c1651a34f04b9401ee3112bd8c5)), closes [#9787](https://github.com/SAP/ui5-webcomponents/issues/9787)
* **ui5-menu:** provide a way to focus items on fetch ([#10210](https://github.com/SAP/ui5-webcomponents/issues/10210)) ([073f0f6](https://github.com/SAP/ui5-webcomponents/commit/073f0f6fa11e34d5a831a401c711449ef44a2995)), closes [#7237](https://github.com/SAP/ui5-webcomponents/issues/7237)
* **ui5-popover:** search for the opener in the correct root ([#10284](https://github.com/SAP/ui5-webcomponents/issues/10284)) ([ee08efa](https://github.com/SAP/ui5-webcomponents/commit/ee08efa855dd502fba09fcfa7bf8d6853f44a612))
* **ui5-rating-indicator:** correct half icon appearance ([#10263](https://github.com/SAP/ui5-webcomponents/issues/10263)) ([3032393](https://github.com/SAP/ui5-webcomponents/commit/30323935ba1ef56665b0b3c82d1f7e5f6a5d26bd)), closes [#10155](https://github.com/SAP/ui5-webcomponents/issues/10155)
* **ui5-rating-indicator:** outline border is visible when focus ([#10205](https://github.com/SAP/ui5-webcomponents/issues/10205)) ([eaa6f04](https://github.com/SAP/ui5-webcomponents/commit/eaa6f0411f877c9448bc5da4d15589f67614e7a1))
* **ui5-tag:** correct hover background color for Set 2 Color Scheme 9 ([#10229](https://github.com/SAP/ui5-webcomponents/issues/10229)) ([1b2eaed](https://github.com/SAP/ui5-webcomponents/commit/1b2eaedf6a9effdf728d3e41b9cf56e0c2aa1c96)), closes [#10164](https://github.com/SAP/ui5-webcomponents/issues/10164)


### Features

* **framework:** add strict event type checking ([#10235](https://github.com/SAP/ui5-webcomponents/issues/10235)) ([4ff8ab7](https://github.com/SAP/ui5-webcomponents/commit/4ff8ab7c34db5058b92511767be1b96c69a91cb5))
* **table:** table virtualization ([#10182](https://github.com/SAP/ui5-webcomponents/issues/10182)) ([bf4c859](https://github.com/SAP/ui5-webcomponents/commit/bf4c8596611bf61435809b1bf42766db83aea002))
* **ui5-bar:** add shadow parts ([#10271](https://github.com/SAP/ui5-webcomponents/issues/10271)) ([9114a82](https://github.com/SAP/ui5-webcomponents/commit/9114a82ecc14ae3dbf118bd8ad835a6a16949298)), closes [#10101](https://github.com/SAP/ui5-webcomponents/issues/10101)
* **ui5-button, ui5-link:** support accessibile description ([#10212](https://github.com/SAP/ui5-webcomponents/issues/10212)) ([51139c2](https://github.com/SAP/ui5-webcomponents/commit/51139c2df3daf2a892b924b51d260f561b867e5b)), closes [#5310](https://github.com/SAP/ui5-webcomponents/issues/5310) [#3993](https://github.com/SAP/ui5-webcomponents/issues/3993)
* **ui5-list:** handle arrow up and down navigation for load more button ([#10251](https://github.com/SAP/ui5-webcomponents/issues/10251)) ([3150793](https://github.com/SAP/ui5-webcomponents/commit/31507939da6051750bcae0a900f6bc1cfce2f926))





# [2.5.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.5.0-rc.1...v2.5.0-rc.2) (2024-11-28)


### Bug Fixes

* **ui5-input:** set value after preventDefault of input event ([#10196](https://github.com/SAP/ui5-webcomponents/issues/10196)) ([e2a6c94](https://github.com/SAP/ui5-webcomponents/commit/e2a6c94d6b4d88db61d85313f2776a092152478d)), closes [#9988](https://github.com/SAP/ui5-webcomponents/issues/9988)
* **ui5-radio-button:** fix aria-disabled and focus of the read-only radio buttons ([#10111](https://github.com/SAP/ui5-webcomponents/issues/10111)) ([3bcfd1d](https://github.com/SAP/ui5-webcomponents/commit/3bcfd1d26b8520b73be336558f590e1b89c4d0c3)), closes [#10025](https://github.com/SAP/ui5-webcomponents/issues/10025)
* **ui5-tokenizer:** adjust touch area for cozy and compact ([#10215](https://github.com/SAP/ui5-webcomponents/issues/10215)) ([ee90aea](https://github.com/SAP/ui5-webcomponents/commit/ee90aeaae00a3a888a8dafae73cb7dba1bf8e51f))


### Features

* **ui5-combobox:** adjust arrow-down behavior ([#10166](https://github.com/SAP/ui5-webcomponents/issues/10166)) ([74616dc](https://github.com/SAP/ui5-webcomponents/commit/74616dc7ea533ecbd18265878c90339e10eb9d1b))
* **ui5-form:** add new `emptySpan` property ([#10194](https://github.com/SAP/ui5-webcomponents/issues/10194)) ([48b0cc8](https://github.com/SAP/ui5-webcomponents/commit/48b0cc89b36dd859dd07c17021eedf7a99375150)), closes [#9963](https://github.com/SAP/ui5-webcomponents/issues/9963)
* **ui5-list:** add Home and End key handling for Load More button ([#10206](https://github.com/SAP/ui5-webcomponents/issues/10206)) ([7059e09](https://github.com/SAP/ui5-webcomponents/commit/7059e0987960f62cd5b8740594b907fa98e1f11c))





# [2.5.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.5.0-rc.0...v2.5.0-rc.1) (2024-11-21)


### Bug Fixes

* **ui5-dialog:** width on mobile is not bigger than the phone width ([#10199](https://github.com/SAP/ui5-webcomponents/issues/10199)) ([77af592](https://github.com/SAP/ui5-webcomponents/commit/77af592c238ad53502c09f142d33f7c66c6b0715)), closes [#10000](https://github.com/SAP/ui5-webcomponents/issues/10000)


### Features

* **ui5-form:** enable vertical alignment of form items ([#10165](https://github.com/SAP/ui5-webcomponents/issues/10165)) ([13b571b](https://github.com/SAP/ui5-webcomponents/commit/13b571baf0b225dfabc4739be64dd64a34cc5506))
* **ui5-toolbar:** fixed spacer behavior ([#10177](https://github.com/SAP/ui5-webcomponents/issues/10177)) ([b3625ac](https://github.com/SAP/ui5-webcomponents/commit/b3625ac7426aa592b80f50e15147c18ccc7d2abd)), closes [#10104](https://github.com/SAP/ui5-webcomponents/issues/10104)





# [2.5.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.4.1-rc.0...v2.5.0-rc.0) (2024-11-14)


### Bug Fixes

* **ui5-card-header:** update interactive property documentation ([#10143](https://github.com/SAP/ui5-webcomponents/issues/10143)) ([23289d4](https://github.com/SAP/ui5-webcomponents/commit/23289d4d1696d0441823d98f71b5e21b617777c3))
* **ui5-table-growing:** button is shown despite scroll type ([#10142](https://github.com/SAP/ui5-webcomponents/issues/10142)) ([950441b](https://github.com/SAP/ui5-webcomponents/commit/950441b7d272e8cd20499461f4cfa05ad3ac7510)), closes [#10045](https://github.com/SAP/ui5-webcomponents/issues/10045)


### Features

* **ui5-color-picker:** add simplified display mode ([#10153](https://github.com/SAP/ui5-webcomponents/issues/10153)) ([bf9c0d6](https://github.com/SAP/ui5-webcomponents/commit/bf9c0d653be5af5473a7b616f2c91803db46beb3)), closes [#9979](https://github.com/SAP/ui5-webcomponents/issues/9979)
* **ui5-combobox/multi-combobox:** physical items ([#10051](https://github.com/SAP/ui5-webcomponents/issues/10051)) ([73f82ab](https://github.com/SAP/ui5-webcomponents/commit/73f82abe5e9a61d88919f4c45df9435be850eb2f))
* **ui5-form:** update to latest accessibility spec ([#10152](https://github.com/SAP/ui5-webcomponents/issues/10152)) ([4382d4e](https://github.com/SAP/ui5-webcomponents/commit/4382d4e280ffcf01a924163b9b719887c17f529a)), closes [#9952](https://github.com/SAP/ui5-webcomponents/issues/9952)
* **ui5-list, ui5-tree:** support accessible description ([#10131](https://github.com/SAP/ui5-webcomponents/issues/10131)) ([45f0ffe](https://github.com/SAP/ui5-webcomponents/commit/45f0ffeafb2da0ffcaf425649c7440b604e359a3)), closes [#6445](https://github.com/SAP/ui5-webcomponents/issues/6445)
* **ui5-tokenizer:** enable multiline mode ([#9964](https://github.com/SAP/ui5-webcomponents/issues/9964)) ([1071746](https://github.com/SAP/ui5-webcomponents/commit/107174616b5b3b96c174160488eba18b9cdb9cae))





## [2.4.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.4.0...v2.4.1-rc.0) (2024-11-07)


### Bug Fixes

* **ui5-menu:** make close event non-bubbling ([#10133](https://github.com/SAP/ui5-webcomponents/issues/10133)) ([e7ccce9](https://github.com/SAP/ui5-webcomponents/commit/e7ccce968cab25a07837c41f36d94603c31e007e)), closes [#10041](https://github.com/SAP/ui5-webcomponents/issues/10041)
* **ui5-select:** add support for Vue.js v-model ([#10149](https://github.com/SAP/ui5-webcomponents/issues/10149)) ([14947a7](https://github.com/SAP/ui5-webcomponents/commit/14947a7bbcf3272f56888bb466696784095b574f)), closes [#9971](https://github.com/SAP/ui5-webcomponents/issues/9971)





# [2.4.0](https://github.com/SAP/ui5-webcomponents/compare/v2.4.0-rc.4...v2.4.0) (2024-11-03)


### Bug Fixes

* **ui5-toolbar-*:** ensure getDomRef() returns the actual DOM reference ([#10009](https://github.com/SAP/ui5-webcomponents/issues/10009)) ([747244d](https://github.com/SAP/ui5-webcomponents/commit/747244d93fee5ee0d1ac54863de5e3573f4d6248))


### Features

* **ui5-date-picker:** introduce open and close events ([#10118](https://github.com/SAP/ui5-webcomponents/issues/10118)) ([819730a](https://github.com/SAP/ui5-webcomponents/commit/819730afbec336ad04e1207b8fee24bcd69f7c2d))





# [2.4.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v2.4.0-rc.3...v2.4.0-rc.4) (2024-10-31)


### Bug Fixes

* **ui5-button:** adjust focus outline ([#10068](https://github.com/SAP/ui5-webcomponents/issues/10068)) ([2d2703e](https://github.com/SAP/ui5-webcomponents/commit/2d2703e6bb9e7dda56f455e5f0ebd01f20ef1eed)), closes [#9894](https://github.com/SAP/ui5-webcomponents/issues/9894)
* **ui5-slider:** up and down arrow behavior in RTL mode ([#10037](https://github.com/SAP/ui5-webcomponents/issues/10037)) ([aebce92](https://github.com/SAP/ui5-webcomponents/commit/aebce924ab829f003cc1b4873a165e205f2914aa)), closes [#9967](https://github.com/SAP/ui5-webcomponents/issues/9967)





# [2.4.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.4.0-rc.2...v2.4.0-rc.3) (2024-10-28)


### Features

* **ui5-tabcontainer:** style adjustments for transparent header ([#10064](https://github.com/SAP/ui5-webcomponents/issues/10064)) ([b5e596e](https://github.com/SAP/ui5-webcomponents/commit/b5e596e542a4fbd3f0643b15d2f4023be2079f5a))





# [2.4.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.4.0-rc.1...v2.4.0-rc.2) (2024-10-24)


### Bug Fixes

* **ui5-list:** growing button loading layout fixed ([#10043](https://github.com/SAP/ui5-webcomponents/issues/10043)) ([efd7e6a](https://github.com/SAP/ui5-webcomponents/commit/efd7e6ad4f27befb5fb1316e8163456c6b77726f)), closes [#9977](https://github.com/SAP/ui5-webcomponents/issues/9977) [#10047](https://github.com/SAP/ui5-webcomponents/issues/10047)
* **ui5-slider, ui5-range-slider:** adjust aria-attributes ([#10039](https://github.com/SAP/ui5-webcomponents/issues/10039)) ([ed3abfc](https://github.com/SAP/ui5-webcomponents/commit/ed3abfcf2eec5469bd18ac5becf29e34e427a2f1)), closes [#9547](https://github.com/SAP/ui5-webcomponents/issues/9547)
* **ui5-split-button:** adjust focus outline on keydown ([#10001](https://github.com/SAP/ui5-webcomponents/issues/10001)) ([898db40](https://github.com/SAP/ui5-webcomponents/commit/898db4031d5710b890a0a9d76c34216cf35a969b))
* **ui5-table:** wrong horiz. alignm. behavior and wrong texts ([#10040](https://github.com/SAP/ui5-webcomponents/issues/10040)) ([f3da992](https://github.com/SAP/ui5-webcomponents/commit/f3da99295b4255e8f22b58f4ed72561fa0bbe215)), closes [#9639](https://github.com/SAP/ui5-webcomponents/issues/9639) [#10017](https://github.com/SAP/ui5-webcomponents/issues/10017)





# [2.4.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.4.0-rc.0...v2.4.0-rc.1) (2024-10-17)


### Bug Fixes

* **localization:** legacy date customization ([#10026](https://github.com/SAP/ui5-webcomponents/issues/10026)) ([273c015](https://github.com/SAP/ui5-webcomponents/commit/273c01597ae483fdfe1996dad733d32e4c9a13a9))
* scoping issues and document how scoping is used correctly ([#10023](https://github.com/SAP/ui5-webcomponents/issues/10023)) ([ee808c3](https://github.com/SAP/ui5-webcomponents/commit/ee808c309f316fe145b05d292c92328396c655ab))
* **tools:** revert tsconfig moduleResolution to node ([#10014](https://github.com/SAP/ui5-webcomponents/issues/10014)) ([0724b92](https://github.com/SAP/ui5-webcomponents/commit/0724b9289ad04f88972d4978ed37e76f13abca13))
* **ui5-popup:** add role attribute to focus helper element ([#10004](https://github.com/SAP/ui5-webcomponents/issues/10004)) ([82a95ce](https://github.com/SAP/ui5-webcomponents/commit/82a95cebfc93fb4be696b76110f2089be1593db8)), closes [#9982](https://github.com/SAP/ui5-webcomponents/issues/9982)
* **ui5-range-slider:** right click on the slider handle does not throw ([#10015](https://github.com/SAP/ui5-webcomponents/issues/10015)) ([e92caf9](https://github.com/SAP/ui5-webcomponents/commit/e92caf96d9ab4548090820e6bbf7217c43d99fd4))
* **ui5-slider, ui5-range-slider:** adjust styles according to Fiori specs ([#9973](https://github.com/SAP/ui5-webcomponents/issues/9973)) ([e1182a9](https://github.com/SAP/ui5-webcomponents/commit/e1182a9ee44c6975b93208c16ef584cf0d0104d6)), closes [#9614](https://github.com/SAP/ui5-webcomponents/issues/9614)


### Features

* **ui5-slider, ui5-range-slider:** add input as a tooltip ([#9547](https://github.com/SAP/ui5-webcomponents/issues/9547)) ([6a4dedf](https://github.com/SAP/ui5-webcomponents/commit/6a4dedf47431d7f7dda7c19f54170bc877c2a33d))





# [2.4.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.3.1-rc.0...v2.4.0-rc.0) (2024-10-10)


### Bug Fixes

* **ui5-daypicker:** announce selected state change ([#9934](https://github.com/SAP/ui5-webcomponents/issues/9934)) ([cd7e202](https://github.com/SAP/ui5-webcomponents/commit/cd7e202f0f9c6d363db17d39ff56171bc69555a8)), closes [#9860](https://github.com/SAP/ui5-webcomponents/issues/9860)
* **ui5-input:** remove the width from the inner input ([#9960](https://github.com/SAP/ui5-webcomponents/issues/9960)) ([283e8e7](https://github.com/SAP/ui5-webcomponents/commit/283e8e7249e9936be3478bcdbd06309845f9d987))
* **ui5-list:** growing button loading aligned with visual spec ([#9977](https://github.com/SAP/ui5-webcomponents/issues/9977)) ([f7ae10e](https://github.com/SAP/ui5-webcomponents/commit/f7ae10e105c2eb36c4dfc153e96fd688e3d76f38))
* **ui5-list:** handle spacebar in inputs and textareas to avoid list activation ([#9775](https://github.com/SAP/ui5-webcomponents/issues/9775)) ([7e0eda8](https://github.com/SAP/ui5-webcomponents/commit/7e0eda8b5c06d46a7cf36bab49921438313e3ec4))


### Features

* enhance `[@event](https://github.com/event)` decorator ([#9944](https://github.com/SAP/ui5-webcomponents/issues/9944)) ([fe1d816](https://github.com/SAP/ui5-webcomponents/commit/fe1d816f512400b839fd4ce1b9af1506d0cb4c9a))
* **ui5-color-palette*:** add mobile focus for external input devices ([#9770](https://github.com/SAP/ui5-webcomponents/issues/9770)) ([4c481e6](https://github.com/SAP/ui5-webcomponents/commit/4c481e65337518fea571ec66e50cf5eee715ce7f))
* **ui5-link, ui5-switch, ...:** add focus support for mobile ([#9718](https://github.com/SAP/ui5-webcomponents/issues/9718)) ([610de0f](https://github.com/SAP/ui5-webcomponents/commit/610de0ffc569cde06ef04ea736af787753755c0d)), closes [#8414](https://github.com/SAP/ui5-webcomponents/issues/8414) [#8322](https://github.com/SAP/ui5-webcomponents/issues/8322)





## [2.3.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.3.0...v2.3.1-rc.0) (2024-10-03)

**Note:** Version bump only for package @ui5/webcomponents





# [2.3.0](https://github.com/SAP/ui5-webcomponents/compare/v2.3.0-rc.3...v2.3.0) (2024-10-02)


### Bug Fixes

* **ui5-bar:** provide responsive paddings support ([#9820](https://github.com/SAP/ui5-webcomponents/issues/9820)) ([7d9cb85](https://github.com/SAP/ui5-webcomponents/commit/7d9cb85b4d6e492f12ef36fdeece9ef472700de5)), closes [#7359](https://github.com/SAP/ui5-webcomponents/issues/7359)
* **ui5-popover:** popover arrow is aligned to the middle of the opener ([#9938](https://github.com/SAP/ui5-webcomponents/issues/9938)) ([31c125d](https://github.com/SAP/ui5-webcomponents/commit/31c125dc6f794535f693bf6c153d16c4277041ea))


### Features

* **framework:** introduce the `i18n` decorator and the `cldr` option ([#9897](https://github.com/SAP/ui5-webcomponents/issues/9897)) ([1f29d23](https://github.com/SAP/ui5-webcomponents/commit/1f29d231fe892a850871e7f73afca93c730ecffd))
* **ui5-carousel:** on touch devices navigation arrows are always visible ([#9939](https://github.com/SAP/ui5-webcomponents/issues/9939)) ([8072baf](https://github.com/SAP/ui5-webcomponents/commit/8072baff08f6a4cc67988aecaaf115f968fcc4de))
* **ui5-input:** enable preventing input event ([#9930](https://github.com/SAP/ui5-webcomponents/issues/9930)) ([2d19119](https://github.com/SAP/ui5-webcomponents/commit/2d191199e31fdb0c3e6ed0c74f55dafeaf634d9e)), closes [#9884](https://github.com/SAP/ui5-webcomponents/issues/9884)
* **ui5-table:** adding horizontal column alignment ([#9639](https://github.com/SAP/ui5-webcomponents/issues/9639)) ([65f75eb](https://github.com/SAP/ui5-webcomponents/commit/65f75ebd2cb88d65dffde4b6654bbc9bdd06eb61))





# [2.3.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.3.0-rc.2...v2.3.0-rc.3) (2024-09-26)


### Bug Fixes

* **ui5-file-uploader:** remove the cloning of the value state message ([#9915](https://github.com/SAP/ui5-webcomponents/issues/9915)) ([a73dd60](https://github.com/SAP/ui5-webcomponents/commit/a73dd60ee9449656272895057ded3b8afee9ab8c))
* **ui5-input:** arrow up scrolls the suggestion items when item is behind value state header ([#9893](https://github.com/SAP/ui5-webcomponents/issues/9893)) ([5cb56c5](https://github.com/SAP/ui5-webcomponents/commit/5cb56c54acbe3e57da91aafd45b52f619ce0600e)), closes [#9674](https://github.com/SAP/ui5-webcomponents/issues/9674)
* **ui5-multi-combobox:** fix aria-describedby token count ([#9888](https://github.com/SAP/ui5-webcomponents/issues/9888)) ([d8fff1a](https://github.com/SAP/ui5-webcomponents/commit/d8fff1a36555ac2ab8789f160c19e2d4dfb5f0d2))
* **ui5-multi-input:** tokens are not deletable when multi-input is readonly ([#9905](https://github.com/SAP/ui5-webcomponents/issues/9905)) ([2178b12](https://github.com/SAP/ui5-webcomponents/commit/2178b12bfeada2899cb3d831d02a5d6a8d482413)), closes [#9862](https://github.com/SAP/ui5-webcomponents/issues/9862)
* **ui5-page:** fix double footer and adjust animation timing ([#9885](https://github.com/SAP/ui5-webcomponents/issues/9885)) ([e8beb76](https://github.com/SAP/ui5-webcomponents/commit/e8beb76ea28f76eb39af40df9c0cc5c603a365d2)), closes [#9755](https://github.com/SAP/ui5-webcomponents/issues/9755) [#9756](https://github.com/SAP/ui5-webcomponents/issues/9756)
* **ui5-select:** improve selection change handling ([#9865](https://github.com/SAP/ui5-webcomponents/issues/9865)) ([d11054b](https://github.com/SAP/ui5-webcomponents/commit/d11054b0e354b5e0f19bb258eee097ab5d2e692b))
* **ui5-slider:** correct icon name ([#9924](https://github.com/SAP/ui5-webcomponents/issues/9924)) ([bd809a5](https://github.com/SAP/ui5-webcomponents/commit/bd809a5dc30aa1bc8df027b9aff61d90e7960aed))





# [2.3.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.3.0-rc.1...v2.3.0-rc.2) (2024-09-19)


### Bug Fixes

* **ui5-multi-combobox:** fix aria-describedby token count ([#9792](https://github.com/SAP/ui5-webcomponents/issues/9792)) ([2e0aa03](https://github.com/SAP/ui5-webcomponents/commit/2e0aa039e652534c8d7b667f431306cde1321fab))
* **ui5-popover:** correct opacity ([#9839](https://github.com/SAP/ui5-webcomponents/issues/9839)) ([371c547](https://github.com/SAP/ui5-webcomponents/commit/371c547676ed71582dc6ff64a2a1b1181dd9bf9d)), closes [#9823](https://github.com/SAP/ui5-webcomponents/issues/9823)


### Features

* **selectionAssistant:** introduce SelectionAssistant ([#9797](https://github.com/SAP/ui5-webcomponents/issues/9797)) ([de59eac](https://github.com/SAP/ui5-webcomponents/commit/de59eac1df149caa7541a3bbd3ddad5ae2c298a6))





# [2.3.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.3.0-rc.0...v2.3.0-rc.1) (2024-09-12)


### Bug Fixes

* **ui5-list:** adjust growing button padding ([#9747](https://github.com/SAP/ui5-webcomponents/issues/9747)) ([0373527](https://github.com/SAP/ui5-webcomponents/commit/03735275752df1263a58af456f11e206935c6e9b))
* **ui5-multi-combobox:** restore focus to input after value state header is removed ([#9827](https://github.com/SAP/ui5-webcomponents/issues/9827)) ([712d94e](https://github.com/SAP/ui5-webcomponents/commit/712d94e3c27c96cb1ab44f57d0e0fd10f7288a4b)), closes [#9709](https://github.com/SAP/ui5-webcomponents/issues/9709)
* **ui5-popover:** fix arrow placement ([#9844](https://github.com/SAP/ui5-webcomponents/issues/9844)) ([6109040](https://github.com/SAP/ui5-webcomponents/commit/6109040822898aea2276925cba951d4a5a766304))
* **ui5-tabcontainer:** fix drag and drop issue with home key and fixеd tabs ([#9812](https://github.com/SAP/ui5-webcomponents/issues/9812)) ([485fd0d](https://github.com/SAP/ui5-webcomponents/commit/485fd0dd1205543e50e7db011d6c5a7bedbe5c68))
* **ui5-tabcontainer:** prevent page scrolling when reordering tabs with home and end keys ([#9848](https://github.com/SAP/ui5-webcomponents/issues/9848)) ([03daa72](https://github.com/SAP/ui5-webcomponents/commit/03daa728429491b9284d898d819b0e7cd892b644))


### Features

* **ui5-li-notification-group:** add new features - growing and sticky header ([#9783](https://github.com/SAP/ui5-webcomponents/issues/9783)) ([a40a451](https://github.com/SAP/ui5-webcomponents/commit/a40a45160d4efe1e1ebb8c43ee3216a2f758558c))





# [2.3.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.2.0...v2.3.0-rc.0) (2024-09-05)


### Bug Fixes

* **ui5-date-picker:** uncomment failing test ([#9794](https://github.com/SAP/ui5-webcomponents/issues/9794)) ([602f799](https://github.com/SAP/ui5-webcomponents/commit/602f799b304244def26de78b364fdfbecda57518)), closes [#5203](https://github.com/SAP/ui5-webcomponents/issues/5203)
* **ui5-form:** fix layout issues by importing base params in all themes ([#9800](https://github.com/SAP/ui5-webcomponents/issues/9800)) ([b568930](https://github.com/SAP/ui5-webcomponents/commit/b5689304c79c801af52ce5a6e844b8379dcb3c38)), closes [#9788](https://github.com/SAP/ui5-webcomponents/issues/9788)
* **ui5-popover:** adjust heigh when vertical-align=stretch ([#9798](https://github.com/SAP/ui5-webcomponents/issues/9798)) ([e717086](https://github.com/SAP/ui5-webcomponents/commit/e7170869a06f90dae2aebd3e65311835f80962b2))
* **ui5-textarea:** focus outline and border overlapping in readonly textarea ([#9817](https://github.com/SAP/ui5-webcomponents/issues/9817)) ([ea8f751](https://github.com/SAP/ui5-webcomponents/commit/ea8f751d0eb5096e322f0cac5b1035d69c1f1bef)), closes [#9741](https://github.com/SAP/ui5-webcomponents/issues/9741)


### Features

* **ui5-tabcontainer:** implement tabs reordering with the keyboard ([#9585](https://github.com/SAP/ui5-webcomponents/issues/9585)) ([936f2fc](https://github.com/SAP/ui5-webcomponents/commit/936f2fc9145217ae5cd4e790c64e3fe75afbfdee))





# [2.2.0](https://github.com/SAP/ui5-webcomponents/compare/v2.2.0-rc.3...v2.2.0) (2024-09-03)


### Bug Fixes

* **ui5-*:** make ui5-content-native-scrollbar to take effect ([#9751](https://github.com/SAP/ui5-webcomponents/issues/9751)) ([a4b4028](https://github.com/SAP/ui5-webcomponents/commit/a4b4028e344fb9546687cec0efbed065dde47b29)), closes [#9720](https://github.com/SAP/ui5-webcomponents/issues/9720) [#9695](https://github.com/SAP/ui5-webcomponents/issues/9695)
* **ui5-color-picker:** adjust hue slider update ([#9735](https://github.com/SAP/ui5-webcomponents/issues/9735)) ([e046755](https://github.com/SAP/ui5-webcomponents/commit/e046755de48881edf77d8868974d79443af3e562)), closes [#9693](https://github.com/SAP/ui5-webcomponents/issues/9693)
* **ui5-menu-item:** add hover and active styles ([#9774](https://github.com/SAP/ui5-webcomponents/issues/9774)) ([55a4179](https://github.com/SAP/ui5-webcomponents/commit/55a41793467a8594401103bff35a3ae46445deb6))





# [2.2.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.2.0-rc.2...v2.2.0-rc.3) (2024-08-29)


### Bug Fixes

* **ui5-breadcrumbs:** current link aria-current ([#9668](https://github.com/SAP/ui5-webcomponents/issues/9668)) ([87732a1](https://github.com/SAP/ui5-webcomponents/commit/87732a151562d6e387dcf85baefca23b265774ac))
* **ui5-calendar:** adjust aria-disabled attribute ([#9732](https://github.com/SAP/ui5-webcomponents/issues/9732)) ([29a30f9](https://github.com/SAP/ui5-webcomponents/commit/29a30f9b21f5a978e2b1163d0484de2df859d907)), closes [#9719](https://github.com/SAP/ui5-webcomponents/issues/9719)
* **ui5-color-palette-popover:** set opener attribute ([#9746](https://github.com/SAP/ui5-webcomponents/issues/9746)) ([6d20dcd](https://github.com/SAP/ui5-webcomponents/commit/6d20dcd186d04d52783cf4083b4d8f014cd07a1e)), closes [#9708](https://github.com/SAP/ui5-webcomponents/issues/9708)
* **ui5-multi-combobox:** correct submit event ([#9731](https://github.com/SAP/ui5-webcomponents/issues/9731)) ([0405c2b](https://github.com/SAP/ui5-webcomponents/commit/0405c2b4e0273649a2c110471b55d480d37c2db2))
* **ui5-multi-combobox:** remove VS header after setting VH to None ([#9744](https://github.com/SAP/ui5-webcomponents/issues/9744)) ([287d3a6](https://github.com/SAP/ui5-webcomponents/commit/287d3a65054ef9e081ed9f627420af03007ea7e9)), closes [#9736](https://github.com/SAP/ui5-webcomponents/issues/9736)


### Features

* **ui5-calendar:** implement calendar week numbering ([#9694](https://github.com/SAP/ui5-webcomponents/issues/9694)) ([efc8053](https://github.com/SAP/ui5-webcomponents/commit/efc8053e756156cca5e239f1886469c6b92c2cf7))
* **ui5-daterange-picker:** implement month and year range selection ([#9680](https://github.com/SAP/ui5-webcomponents/issues/9680)) ([0a150dd](https://github.com/SAP/ui5-webcomponents/commit/0a150dd6808dbd7ec7e4e599eab2ff4abf9396f0)), closes [#8177](https://github.com/SAP/ui5-webcomponents/issues/8177) [#8187](https://github.com/SAP/ui5-webcomponents/issues/8187)





# [2.2.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.2.0-rc.1...v2.2.0-rc.2) (2024-08-22)


### Bug Fixes

* **framework:** attach element internals only once ([#9714](https://github.com/SAP/ui5-webcomponents/issues/9714)) ([fce5d11](https://github.com/SAP/ui5-webcomponents/commit/fce5d117639e8ea7a042713a712452c451b4cb9b)), closes [#9713](https://github.com/SAP/ui5-webcomponents/issues/9713)
* **ui5-color-palette:** adjust recent color focus behavior ([#9492](https://github.com/SAP/ui5-webcomponents/issues/9492)) ([7ed8a88](https://github.com/SAP/ui5-webcomponents/commit/7ed8a88c49d5208c8fc6e0048214849e991489c1)), closes [#9470](https://github.com/SAP/ui5-webcomponents/issues/9470)
* **ui5-dialog:** fix block layer of initially opened dialog  ([#9715](https://github.com/SAP/ui5-webcomponents/issues/9715)) ([96544ef](https://github.com/SAP/ui5-webcomponents/commit/96544efc188185dd6f072733049a3cb64b8144e1))
* **ui5-dialog:** set the correct block layer color ([#9662](https://github.com/SAP/ui5-webcomponents/issues/9662)) ([8095518](https://github.com/SAP/ui5-webcomponents/commit/809551841308bc3a06bee213cf05e90b62a3f168)), closes [#9658](https://github.com/SAP/ui5-webcomponents/issues/9658)
* **ui5-table:** range selection should stop when releasing shift ([#9710](https://github.com/SAP/ui5-webcomponents/issues/9710)) ([7894823](https://github.com/SAP/ui5-webcomponents/commit/7894823d5aba86098f2661977627be8cac3df97c))
* **ui5-timepicker:** allow inputs popover on tablet ([#9701](https://github.com/SAP/ui5-webcomponents/issues/9701)) ([20fd09c](https://github.com/SAP/ui5-webcomponents/commit/20fd09cb642ef4035febab5f8aaf149cc7457e75)), closes [#9705](https://github.com/SAP/ui5-webcomponents/issues/9705)


### Features

* **ui5-file-uploader:** add maxFileSize property ([#9622](https://github.com/SAP/ui5-webcomponents/issues/9622)) ([4624f87](https://github.com/SAP/ui5-webcomponents/commit/4624f87fd776bcb92cebd0506d79d0e74fafdb1c)), closes [#9187](https://github.com/SAP/ui5-webcomponents/issues/9187)





# [2.2.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.2.0-rc.0...v2.2.0-rc.1) (2024-08-15)


### Bug Fixes

* **ui5-breadcrumbs:** redundant import removed ([#9666](https://github.com/SAP/ui5-webcomponents/issues/9666)) ([4a1823f](https://github.com/SAP/ui5-webcomponents/commit/4a1823f919e4079bb5dfdd4eb55fb0786b4b144c))
* **ui5-date-picker:** adjust unstable test ([#9663](https://github.com/SAP/ui5-webcomponents/issues/9663)) ([6cf5b18](https://github.com/SAP/ui5-webcomponents/commit/6cf5b187341e1cad734978f3c3d553c0dc2392c4)), closes [#9034](https://github.com/SAP/ui5-webcomponents/issues/9034)
* **ui5-input:** properly change numeric input value using the arrow keys ([#9616](https://github.com/SAP/ui5-webcomponents/issues/9616)) ([a95ef11](https://github.com/SAP/ui5-webcomponents/commit/a95ef11885b8c4ac592a55c15c27ad55328f77c6)), closes [#9588](https://github.com/SAP/ui5-webcomponents/issues/9588)
* **ui5-input:** reset value on when set to null ([#9657](https://github.com/SAP/ui5-webcomponents/issues/9657)) ([a5c3f1f](https://github.com/SAP/ui5-webcomponents/commit/a5c3f1f5aa4bce3e81a31bbafe7ad9712840bf50)), closes [#2616](https://github.com/SAP/ui5-webcomponents/issues/2616)
* **ui5-list:** no data item now can be focused ([#9665](https://github.com/SAP/ui5-webcomponents/issues/9665)) ([ec5d614](https://github.com/SAP/ui5-webcomponents/commit/ec5d61465f248c6355ee796e83b5dfaecd7ea35b)), closes [#9617](https://github.com/SAP/ui5-webcomponents/issues/9617)
* **ui5-special-date:** add visual representation for Working/NonWorking types ([#9524](https://github.com/SAP/ui5-webcomponents/issues/9524)) ([296373d](https://github.com/SAP/ui5-webcomponents/commit/296373d7fdbaf4f7c948b26d4642b22010f0af20))
* **ui5-split-button:** adjust arrow part width ([#9660](https://github.com/SAP/ui5-webcomponents/issues/9660)) ([c6efdd2](https://github.com/SAP/ui5-webcomponents/commit/c6efdd28eb0892a32f5257fa382a039206b1e1ff)), closes [#7642](https://github.com/SAP/ui5-webcomponents/issues/7642)
* **ui5-table:** rendering empty table leads to no exception ([#9685](https://github.com/SAP/ui5-webcomponents/issues/9685)) ([70ad506](https://github.com/SAP/ui5-webcomponents/commit/70ad5069ff19941b899f2f1ed16412a0a47e8b12)), closes [#9636](https://github.com/SAP/ui5-webcomponents/issues/9636)
* **ui5-time-picker:** adjust height in compact mode ([#9681](https://github.com/SAP/ui5-webcomponents/issues/9681)) ([c07e149](https://github.com/SAP/ui5-webcomponents/commit/c07e149b3e742bfcc52d58e06dc51821898542c9)), closes [#9669](https://github.com/SAP/ui5-webcomponents/issues/9669)


### Features

* **ui5-input:** add parts to support css customisation ([#9590](https://github.com/SAP/ui5-webcomponents/issues/9590)) ([8260c47](https://github.com/SAP/ui5-webcomponents/commit/8260c476b05caf0ddb5a4a17759179bc2b4d5d1a))





# [2.2.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.1.1...v2.2.0-rc.0) (2024-08-08)


### Bug Fixes

* stop attribute change calling property setter when coming from a setter ([#9592](https://github.com/SAP/ui5-webcomponents/issues/9592)) ([95e61dd](https://github.com/SAP/ui5-webcomponents/commit/95e61ddc097658c49509889c8454901a8a8ef0b4))
* **ui5-combobox:** correct scrolling behavior ([#9632](https://github.com/SAP/ui5-webcomponents/issues/9632)) ([aa5f9e9](https://github.com/SAP/ui5-webcomponents/commit/aa5f9e94adc887e2d7fd9f10f044fa870eeeea39))
* **ui5-menu:** provide accessible name to the popover ([#9574](https://github.com/SAP/ui5-webcomponents/issues/9574)) ([a14f6a1](https://github.com/SAP/ui5-webcomponents/commit/a14f6a13a572d6f196a9b902f988f5b259aece36))
* **ui5-multi-comboBox:** delete token from mcb with grouping ([#9623](https://github.com/SAP/ui5-webcomponents/issues/9623)) ([b3c38f8](https://github.com/SAP/ui5-webcomponents/commit/b3c38f8d3bf7c3af59f239bc702170030f678c2a)), closes [#9544](https://github.com/SAP/ui5-webcomponents/issues/9544)
* **ui5-select:** remove the cloning of the value state message ([#9654](https://github.com/SAP/ui5-webcomponents/issues/9654)) ([1466076](https://github.com/SAP/ui5-webcomponents/commit/146607618c245d236c19797c308e83da0395336d)), closes [#9347](https://github.com/SAP/ui5-webcomponents/issues/9347)
* **ui5-split-button:** provide aria attributes for the arrow button ([#9598](https://github.com/SAP/ui5-webcomponents/issues/9598)) ([2af2cf2](https://github.com/SAP/ui5-webcomponents/commit/2af2cf25161b028be677c9ab594d0d5c3351267f)), closes [#9295](https://github.com/SAP/ui5-webcomponents/issues/9295)


### Features

* add `enableDefaultTooltips ` config option ([#9559](https://github.com/SAP/ui5-webcomponents/issues/9559)) ([a672788](https://github.com/SAP/ui5-webcomponents/commit/a6727880e9fc648a8999643a2d2dac4eaff5c58c)), closes [#9494](https://github.com/SAP/ui5-webcomponents/issues/9494)
* **core:** add asset files with fetch URLs ([#9591](https://github.com/SAP/ui5-webcomponents/issues/9591)) ([f039cf6](https://github.com/SAP/ui5-webcomponents/commit/f039cf6e96e43fbc45e55e53871c91c9ee8e4179))
* **ui5-dialog:** increase resize handle size ([#9628](https://github.com/SAP/ui5-webcomponents/issues/9628)) ([ec8904b](https://github.com/SAP/ui5-webcomponents/commit/ec8904bc03862cf91fac772185d665650027f3f0))
* **ui5-text:** add "emptyIndicatorMode" property and update samples ([#9578](https://github.com/SAP/ui5-webcomponents/issues/9578)) ([cb218f0](https://github.com/SAP/ui5-webcomponents/commit/cb218f02be50b378f3ebffd91fb36061c5c4c3a9))





## [2.1.1](https://github.com/SAP/ui5-webcomponents/compare/v2.1.0...v2.1.1) (2024-08-02)

**Note:** Version bump only for package @ui5/webcomponents





# [2.1.0](https://github.com/SAP/ui5-webcomponents/compare/v2.1.0-rc.3...v2.1.0) (2024-08-02)


### Bug Fixes

* **ui5-avatar-group:** prevent console error when no items are present ([#9587](https://github.com/SAP/ui5-webcomponents/issues/9587)) ([4f832bd](https://github.com/SAP/ui5-webcomponents/commit/4f832bdf3cac6c2d26b53d785081c71b77a46d1d)), closes [#9581](https://github.com/SAP/ui5-webcomponents/issues/9581)
* **ui5-radio-button:** fix selection issue ([#9565](https://github.com/SAP/ui5-webcomponents/issues/9565)) ([5b74c67](https://github.com/SAP/ui5-webcomponents/commit/5b74c67a37b28eb9b15d1c13f265c74f6f341758))
* **ui5-responsive-popover:** fix header text alignment ([#9501](https://github.com/SAP/ui5-webcomponents/issues/9501)) ([85424ef](https://github.com/SAP/ui5-webcomponents/commit/85424efc6630c9892fb4ee8c596cd8da0eff50c2))
* **ui5-step-input:** apply overstyling correctly ([#9610](https://github.com/SAP/ui5-webcomponents/issues/9610)) ([1a12e52](https://github.com/SAP/ui5-webcomponents/commit/1a12e52aee2e21739b44ac30fe52196c42cd6255)), closes [#9365](https://github.com/SAP/ui5-webcomponents/issues/9365)
* **ui5-timepicker:** align input with timepicker styles ([#9612](https://github.com/SAP/ui5-webcomponents/issues/9612)) ([df445eb](https://github.com/SAP/ui5-webcomponents/commit/df445ebfeafa085e3f3d9dff6ad1d08834c4ab24)), closes [#9366](https://github.com/SAP/ui5-webcomponents/issues/9366)
* **ui5-toolbar:** update ToolbarRegistry to use metadata tag instead of class name ([#9607](https://github.com/SAP/ui5-webcomponents/issues/9607)) ([c2e2c29](https://github.com/SAP/ui5-webcomponents/commit/c2e2c2930ef8618a07c9d6e7df44de20abc30a8e))


### Features

* **core:** fire PascalCase events for easier react usage ([#9608](https://github.com/SAP/ui5-webcomponents/issues/9608)) ([43e28fa](https://github.com/SAP/ui5-webcomponents/commit/43e28fa5da370bde06cc23d78a3508321673ca54))
* **ui5-timeline-group-item:** introduce new component ([#9407](https://github.com/SAP/ui5-webcomponents/issues/9407)) ([aea62ef](https://github.com/SAP/ui5-webcomponents/commit/aea62ef38b55107f7dfd63c468bc1936d426ae42))





# [2.1.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.1.0-rc.2...v2.1.0-rc.3) (2024-08-01)


### Bug Fixes

* **ui5-date-picker:** adjust timestamp ([#9355](https://github.com/SAP/ui5-webcomponents/issues/9355)) ([b72ed21](https://github.com/SAP/ui5-webcomponents/commit/b72ed21b6386aeeb76ebf33a72a3a322a3495c88)), closes [#9217](https://github.com/SAP/ui5-webcomponents/issues/9217)
* **ui5-list:** improved loading state ([#9520](https://github.com/SAP/ui5-webcomponents/issues/9520)) ([b32adf5](https://github.com/SAP/ui5-webcomponents/commit/b32adf50e6398f8677edcbcd9f7d80dafb55ae43)), closes [#9476](https://github.com/SAP/ui5-webcomponents/issues/9476)
* **ui5-multi-combobox:** add background color to select all ([9bdb1d5](https://github.com/SAP/ui5-webcomponents/commit/9bdb1d53aa3c10c38ab4bed77760e129e31c7f21)), closes [#9495](https://github.com/SAP/ui5-webcomponents/issues/9495)
* **ui5-multi-combobox:** hide value state message popup when popover is open ([#9511](https://github.com/SAP/ui5-webcomponents/issues/9511)) ([f887689](https://github.com/SAP/ui5-webcomponents/commit/f887689b4db678a7a8342d5bec803557fdfa8fd2)), closes [#9451](https://github.com/SAP/ui5-webcomponents/issues/9451)
* **ui5-select:** infinite attribute update in value property setter ([#9500](https://github.com/SAP/ui5-webcomponents/issues/9500)) ([079ee04](https://github.com/SAP/ui5-webcomponents/commit/079ee042b69f5819d9acc74a02bed20242ce05f0))
* **ui5-textarea:** fix negative textarea growing ([#8883](https://github.com/SAP/ui5-webcomponents/issues/8883)) ([db67090](https://github.com/SAP/ui5-webcomponents/commit/db67090489bef9570abd768f661f2d35d7475db8)), closes [#8767](https://github.com/SAP/ui5-webcomponents/issues/8767)
* **ui5-timepicker:** fix error thrown upon selection from the clock ([#9541](https://github.com/SAP/ui5-webcomponents/issues/9541)) ([7b4cf30](https://github.com/SAP/ui5-webcomponents/commit/7b4cf309aad55171cbf231b4b9a29e5dc9f37401))


### Features

* enhance feature initialization ([#9479](https://github.com/SAP/ui5-webcomponents/issues/9479)) ([d55eba8](https://github.com/SAP/ui5-webcomponents/commit/d55eba85ff4860bacaff1988c5e1aa56eaa4a225)), closes [#8175](https://github.com/SAP/ui5-webcomponents/issues/8175)
* **ui5-card:** add properties loading and loadingDelay ([#9558](https://github.com/SAP/ui5-webcomponents/issues/9558)) ([47da4a1](https://github.com/SAP/ui5-webcomponents/commit/47da4a16f138132121694ecc25c87d67781d3a8e)), closes [#9437](https://github.com/SAP/ui5-webcomponents/issues/9437)
* **ui5-token:** adjust token icon size according to the new accessibility standard ([#9496](https://github.com/SAP/ui5-webcomponents/issues/9496)) ([f928f06](https://github.com/SAP/ui5-webcomponents/commit/f928f0690dfe566c474ef6bcdf8657a384733090))
* update @ui5/webcomponents-icons to 5.9 & 4.21 ([#9563](https://github.com/SAP/ui5-webcomponents/issues/9563)) ([10b697d](https://github.com/SAP/ui5-webcomponents/commit/10b697d2ed08dc0d0bd0c97dbc50ebe23d848a60))





# [2.1.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.1.0-rc.1...v2.1.0-rc.2) (2024-07-25)


### Bug Fixes

* **ui5-busy-indicator:** let focus border radius be set from the host element ([#9508](https://github.com/SAP/ui5-webcomponents/issues/9508)) ([01af2a6](https://github.com/SAP/ui5-webcomponents/commit/01af2a6c23ea253e57d71b5d7d8e31dc2469bcb4))
* **ui5-input, ui5-multi-input:** fix issues in inputs test pages ([#9506](https://github.com/SAP/ui5-webcomponents/issues/9506)) ([b9de887](https://github.com/SAP/ui5-webcomponents/commit/b9de8878969f185f340ee22805721b08c7be9a27)), closes [#9446](https://github.com/SAP/ui5-webcomponents/issues/9446)
* **ui5-input:** fire change event properly when suggestions ([#9429](https://github.com/SAP/ui5-webcomponents/issues/9429)) ([a77cd4b](https://github.com/SAP/ui5-webcomponents/commit/a77cd4b2dd23da73f3429a537b90ba734c33a8ad)), closes [#8912](https://github.com/SAP/ui5-webcomponents/issues/8912)
* **ui5-multi-combobox, ui5-combobox, ui5-input:** improve popup announcement ([#9513](https://github.com/SAP/ui5-webcomponents/issues/9513)) ([8dc5e51](https://github.com/SAP/ui5-webcomponents/commit/8dc5e5192d273663116eb8e00541ebe952ceb685))
* **ui5-multi-combobox:** correct readonly functionality ([#9525](https://github.com/SAP/ui5-webcomponents/issues/9525)) ([4a4d2d6](https://github.com/SAP/ui5-webcomponents/commit/4a4d2d6d9fcfa854831fd27a2436a8420a15eb1e))
* **ui5-tabcontainer:** fix overflow button focus border radius ([#9507](https://github.com/SAP/ui5-webcomponents/issues/9507)) ([04b8f47](https://github.com/SAP/ui5-webcomponents/commit/04b8f474f87083720d3fb5f0d4d0f0c2d8339d28))
* **ui5-table:** adds the missing TableHeaderRow dependency ([#9490](https://github.com/SAP/ui5-webcomponents/issues/9490)) ([0b836b3](https://github.com/SAP/ui5-webcomponents/commit/0b836b395d12ab7137688af1cd6f2b4795563dfc))
* **ui5-toolbar:** failing test fixed ([#9518](https://github.com/SAP/ui5-webcomponents/issues/9518)) ([4adcb2d](https://github.com/SAP/ui5-webcomponents/commit/4adcb2d62e1aca690bf01d7b95b912bb27fc8955))


### Features

* **ui5-calendar:** allow overstyling ([#9383](https://github.com/SAP/ui5-webcomponents/issues/9383)) ([ba7d213](https://github.com/SAP/ui5-webcomponents/commit/ba7d213ada0e6ecece7d4070003919cd0ac4973f))
* **ui5-input:** expose select event ([#9530](https://github.com/SAP/ui5-webcomponents/issues/9530)) ([b7bfadc](https://github.com/SAP/ui5-webcomponents/commit/b7bfadc4d4120a7470f4e148c078f1066451b65b))
* **ui5-table:** improve horizontal scrolling ([#9293](https://github.com/SAP/ui5-webcomponents/issues/9293)) ([4b36593](https://github.com/SAP/ui5-webcomponents/commit/4b365938eb07b4e7894efc80db4d10d9ec87f8a5))





# [2.1.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.1.0-rc.0...v2.1.0-rc.1) (2024-07-18)


### Bug Fixes

* **ui5-combobox:** correct valueStateMessage documentation ([#9458](https://github.com/SAP/ui5-webcomponents/issues/9458)) ([62cbfb4](https://github.com/SAP/ui5-webcomponents/commit/62cbfb4a6a1174658337024487351c858cff41fb))
* **ui5-combobox:** remove the cloning of the value state message ([#9384](https://github.com/SAP/ui5-webcomponents/issues/9384)) ([a24c6b7](https://github.com/SAP/ui5-webcomponents/commit/a24c6b79fb9215cba288873691fdfcd26cdc5c11)), closes [#9347](https://github.com/SAP/ui5-webcomponents/issues/9347)
* **ui5-dialog, ui5-popover:** add missing ui5-title dependency ([#9480](https://github.com/SAP/ui5-webcomponents/issues/9480)) ([57b3d37](https://github.com/SAP/ui5-webcomponents/commit/57b3d37a2404d6f4ec4da8579fef188149dd2387))
* **ui5-dialog:** fix draggable dialog header focusing with mouse ([#9420](https://github.com/SAP/ui5-webcomponents/issues/9420)) ([654306a](https://github.com/SAP/ui5-webcomponents/commit/654306a6e78af70a118afefd24fc4ec4ab15c6e5))
* **ui5-option:** correct tooltip property forwarding ([#9502](https://github.com/SAP/ui5-webcomponents/issues/9502)) ([dde34fc](https://github.com/SAP/ui5-webcomponents/commit/dde34fc2d700ec337b787c2839b9026e16c26bfe)), closes [#9015](https://github.com/SAP/ui5-webcomponents/issues/9015)
* **ui5-popover:** immediate open by dynamically created UI5Element no longer throws error ([#9486](https://github.com/SAP/ui5-webcomponents/issues/9486)) ([a4bc8e0](https://github.com/SAP/ui5-webcomponents/commit/a4bc8e088fcd241367538ad38bc1bd7a31935bbd))
* **ui5-select:** prevent unnecessary change event ([#9489](https://github.com/SAP/ui5-webcomponents/issues/9489)) ([02059bc](https://github.com/SAP/ui5-webcomponents/commit/02059bc4a01536fa27e37a578ab6eb1499a016ee))
* **ui5-select:** prevent unnecessary live-change event ([#9499](https://github.com/SAP/ui5-webcomponents/issues/9499)) ([1efb84b](https://github.com/SAP/ui5-webcomponents/commit/1efb84bf828d4426087981cdecb70adf9fd4a899))
* **ui5-tabcontainer:** fix selected sub items screen readers announcement ([#9426](https://github.com/SAP/ui5-webcomponents/issues/9426)) ([fae1a3a](https://github.com/SAP/ui5-webcomponents/commit/fae1a3a0427593299d177ca486e15719065f43a1))
* **ui5-tag:** fix wrapped text styles ([#9320](https://github.com/SAP/ui5-webcomponents/issues/9320)) ([2388edd](https://github.com/SAP/ui5-webcomponents/commit/2388eddd9692b9c5db5efbb95e81cbd6696f87af))
* **ui5-toolbar:** prevent child events bubble ([#9464](https://github.com/SAP/ui5-webcomponents/issues/9464)) ([3361725](https://github.com/SAP/ui5-webcomponents/commit/33617258ca771b218406e10cab3343b4a3a6714d))


### Features

* **ui5-li-group:** drag and drop enabled ([#9415](https://github.com/SAP/ui5-webcomponents/issues/9415)) ([963e0c2](https://github.com/SAP/ui5-webcomponents/commit/963e0c2dba281958f66e8df3dc8d297d575b0154))
* **ui5-prompt-input:** implement suggestions ([#9390](https://github.com/SAP/ui5-webcomponents/issues/9390)) ([a261cfb](https://github.com/SAP/ui5-webcomponents/commit/a261cfbfa06328e1f496a8a2acd1e4b22e78243d))
* **ui5-title:** add new "size" property ([#9327](https://github.com/SAP/ui5-webcomponents/issues/9327)) ([8e430e2](https://github.com/SAP/ui5-webcomponents/commit/8e430e2692e94dffd806f80de40dcd85ce76bb44))





# [2.1.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v2.0.1...v2.1.0-rc.0) (2024-07-11)


### Bug Fixes

* **ui5-menu:** include icon ([#9413](https://github.com/SAP/ui5-webcomponents/issues/9413)) ([d5508a7](https://github.com/SAP/ui5-webcomponents/commit/d5508a7c6a4c902d53eafd1ff21a27d1f42bce53))
* **ui5-multi-combobox:** remove the cloning of the value state message ([#9391](https://github.com/SAP/ui5-webcomponents/issues/9391)) ([68ea4af](https://github.com/SAP/ui5-webcomponents/commit/68ea4afdce3016e7f02d4cf4e5077793314bf6ab)), closes [#9347](https://github.com/SAP/ui5-webcomponents/issues/9347)
* **ui5-notification-list-item:** focus is no longer trapped in loading item ([#8969](https://github.com/SAP/ui5-webcomponents/issues/8969)) ([fa37d92](https://github.com/SAP/ui5-webcomponents/commit/fa37d92f30931a1ac38d6efadf4439ba3d3d555e)), closes [#8768](https://github.com/SAP/ui5-webcomponents/issues/8768)
* **ui5-textarea:** remove the cloning of the value state message ([#9401](https://github.com/SAP/ui5-webcomponents/issues/9401)) ([185d598](https://github.com/SAP/ui5-webcomponents/commit/185d59820bfce23eb7362511d003478f82cea9d8)), closes [#9347](https://github.com/SAP/ui5-webcomponents/issues/9347)


### Features

* **ui5-menu-item:** add accessibility attributes ([#9333](https://github.com/SAP/ui5-webcomponents/issues/9333)) ([74782e6](https://github.com/SAP/ui5-webcomponents/commit/74782e63e36ee71483617a5d5e204cb30cd589bc))
* **ui5-time-picker:** add required, accessibleName & accessibleNameRef ([#9352](https://github.com/SAP/ui5-webcomponents/issues/9352)) ([08988c4](https://github.com/SAP/ui5-webcomponents/commit/08988c4189a1669e70286b2bd014b0bdd97a2c4a)), closes [#5895](https://github.com/SAP/ui5-webcomponents/issues/5895)





## [2.0.1](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0...v2.0.1) (2024-07-05)


### Bug Fixes

* **ui5-menu:** restore focus to the opener ([#9041](https://github.com/SAP/ui5-webcomponents/issues/9041)) ([0ada944](https://github.com/SAP/ui5-webcomponents/commit/0ada944132c5f38125cb3929ecc0890197cdff7c)), closes [#9317](https://github.com/SAP/ui5-webcomponents/issues/9317)





# [2.0.0](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.6...v2.0.0) (2024-07-03)


### Bug Fixes

* fix DateRangePicker test ([7f7f663](https://github.com/SAP/ui5-webcomponents/commit/7f7f663f9ffe17ada380f6f417e00222b88c349d))
* **Popup:** correct "open" event ([#9298](https://github.com/SAP/ui5-webcomponents/issues/9298)) ([e84c2e5](https://github.com/SAP/ui5-webcomponents/commit/e84c2e574a2b910ed2961154c349a2ee08d2db6f))
* **ui5-calendar:** add icon dependency ([#9289](https://github.com/SAP/ui5-webcomponents/issues/9289)) ([165d7bc](https://github.com/SAP/ui5-webcomponents/commit/165d7bc3cef55bdd5d9cc514ff603919afa856a1))
* **ui5-calendar:** year button accessibility ([#9255](https://github.com/SAP/ui5-webcomponents/issues/9255)) ([fc18c6d](https://github.com/SAP/ui5-webcomponents/commit/fc18c6da7eef9fe1f921c9c3e5e2d7201bfff99f)), closes [#9107](https://github.com/SAP/ui5-webcomponents/issues/9107)
* **ui5-checkbox:** adjust focus outline in wrapped mode ([#9335](https://github.com/SAP/ui5-webcomponents/issues/9335)) ([13f87f5](https://github.com/SAP/ui5-webcomponents/commit/13f87f5da12a2ebf39ba59328b3f05e867ab824a)), closes [#9254](https://github.com/SAP/ui5-webcomponents/issues/9254)
* **ui5-color-palette-popover:** enable navigation over the swatches ([#9336](https://github.com/SAP/ui5-webcomponents/issues/9336)) ([0660ae5](https://github.com/SAP/ui5-webcomponents/commit/0660ae5fec7f427149f73b6142acc7fbdcc0298f))
* **ui5-daterange-picker:** adjust selected range accessibility semantics ([#9251](https://github.com/SAP/ui5-webcomponents/issues/9251)) ([88b3ba7](https://github.com/SAP/ui5-webcomponents/commit/88b3ba788550c533038886fc1947af7609dca211)), closes [#9241](https://github.com/SAP/ui5-webcomponents/issues/9241)
* **ui5-link:** remove the space between `end-icon` and text in long links ([#9325](https://github.com/SAP/ui5-webcomponents/issues/9325)) ([b559431](https://github.com/SAP/ui5-webcomponents/commit/b559431b1fd79c56247f0167c60b2a046843435e))
* **ui5-list:** improved items initial rendering ([#9283](https://github.com/SAP/ui5-webcomponents/issues/9283)) ([2623882](https://github.com/SAP/ui5-webcomponents/commit/2623882a0af096e2d54c2b61d1bb50a2ea060ce6)), closes [#9266](https://github.com/SAP/ui5-webcomponents/issues/9266)
* **ui5-message-strip:** Remove icon when design changes to a color set ([#9229](https://github.com/SAP/ui5-webcomponents/issues/9229)) ([4f110d2](https://github.com/SAP/ui5-webcomponents/commit/4f110d20e47e3a5c7557c0de355620d80a0d30af)), closes [#9181](https://github.com/SAP/ui5-webcomponents/issues/9181)
* **ui5-multi-combobox:** collapse the tokenizer on mobile devices picker close ([#9291](https://github.com/SAP/ui5-webcomponents/issues/9291)) ([74e3c50](https://github.com/SAP/ui5-webcomponents/commit/74e3c50a53d3f73acb752d590101cb2d23b34f55)), closes [#9176](https://github.com/SAP/ui5-webcomponents/issues/9176)
* **ui5-multi-combobox:** collapse tokenizer on n-more collapse ([#9367](https://github.com/SAP/ui5-webcomponents/issues/9367)) ([1ad4b42](https://github.com/SAP/ui5-webcomponents/commit/1ad4b42af7dff0a200813e59bc765ea2d8ec3201)), closes [#8493](https://github.com/SAP/ui5-webcomponents/issues/8493)
* **ui5-rating-indicator:** fix test page - remove duplicates ([#9364](https://github.com/SAP/ui5-webcomponents/issues/9364)) ([d98fc5c](https://github.com/SAP/ui5-webcomponents/commit/d98fc5c6aa4354050f6b091a8a4038e1d2973670))
* **ui5-rating-indicator:** make rating indicator ACC WCAG 2.2 compliant ([#9222](https://github.com/SAP/ui5-webcomponents/issues/9222)) ([6503675](https://github.com/SAP/ui5-webcomponents/commit/65036757dd3897c4f7f5749673388d4f650dd835))
* **ui5-segmented-button-item:** prevent focus of disabled items ([#9239](https://github.com/SAP/ui5-webcomponents/issues/9239)) ([ca0509a](https://github.com/SAP/ui5-webcomponents/commit/ca0509a77c6dc5d11f94dbed3b815ffd53273b92)), closes [#9236](https://github.com/SAP/ui5-webcomponents/issues/9236)
* **ui5-tab-container:** change display ([#9274](https://github.com/SAP/ui5-webcomponents/issues/9274)) ([f2d94e9](https://github.com/SAP/ui5-webcomponents/commit/f2d94e9d1660b656ad0d689def2f1cc1d22048e8)), closes [#9248](https://github.com/SAP/ui5-webcomponents/issues/9248)
* **ui5-table:** adjust unstable loading test ([#9267](https://github.com/SAP/ui5-webcomponents/issues/9267)) ([3c483a1](https://github.com/SAP/ui5-webcomponents/commit/3c483a1b676a18d4c727b2ad7e4b86b079a688df))
* **ui5-table:** lint issue is fixed ([#9294](https://github.com/SAP/ui5-webcomponents/issues/9294)) ([71ea07c](https://github.com/SAP/ui5-webcomponents/commit/71ea07c3e908beffcee8b127fcc97993e6affff3))
* **ui5-table:** remove circular dependency from table and row ([#9261](https://github.com/SAP/ui5-webcomponents/issues/9261)) ([9932adf](https://github.com/SAP/ui5-webcomponents/commit/9932adff6260e366c2b8c2282357267097b884a5))
* **ui5-tag:** fix styling issues ([#9305](https://github.com/SAP/ui5-webcomponents/issues/9305)) ([24dd42b](https://github.com/SAP/ui5-webcomponents/commit/24dd42b16f6889f9ea54402f4b664c84fdf92bfa))


### Code Refactoring

* rename `ListSeparators` enum to `ListSeparator` ([#9308](https://github.com/SAP/ui5-webcomponents/issues/9308)) ([26bb513](https://github.com/SAP/ui5-webcomponents/commit/26bb5130b93328ad515d5f268bcf189b6e138ed7))
* **ui5-combobox, ui5-multi-combobox:** prepare for physical list items ([#9307](https://github.com/SAP/ui5-webcomponents/issues/9307)) ([3e66cc6](https://github.com/SAP/ui5-webcomponents/commit/3e66cc6fd78acc83b7ca6db050925fbad47ef404)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-input:** suggestions refactoring ([#9092](https://github.com/SAP/ui5-webcomponents/issues/9092)) ([36c9c8f](https://github.com/SAP/ui5-webcomponents/commit/36c9c8f1e2cf438d9173649a82a90af8db0cc282)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#7890](https://github.com/SAP/ui5-webcomponents/issues/7890)
* **ui5-li:** replace the usage of image property with image slot ([#9089](https://github.com/SAP/ui5-webcomponents/issues/9089)) ([391ffaa](https://github.com/SAP/ui5-webcomponents/commit/391ffaa0d650d773f3e7cbd62accc27d3ae8cd94))


### Features

* add property initializers ([#8846](https://github.com/SAP/ui5-webcomponents/issues/8846)) ([eef0cc9](https://github.com/SAP/ui5-webcomponents/commit/eef0cc9b663fda6268b98e516ed46439435fa2b0))
* **ui5-menu-separator:** add new component ([#8871](https://github.com/SAP/ui5-webcomponents/issues/8871)) ([f7fea29](https://github.com/SAP/ui5-webcomponents/commit/f7fea290c4bb2e5f235222cba7e48b09c5b3b39b)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-table:** add range selection to selection feature ([#9205](https://github.com/SAP/ui5-webcomponents/issues/9205)) ([55d99d2](https://github.com/SAP/ui5-webcomponents/commit/55d99d25324f64c202339c4947f2b3bcf35e25c8))
* **ui5-table:** navigated property for rows ([#9292](https://github.com/SAP/ui5-webcomponents/issues/9292)) ([6a51172](https://github.com/SAP/ui5-webcomponents/commit/6a511727e6b6be7aa1c7fe3c208734b4e38f4dc6))
* **ui5-table:** table loading indicator ([#9214](https://github.com/SAP/ui5-webcomponents/issues/9214)) ([fabc911](https://github.com/SAP/ui5-webcomponents/commit/fabc911e6138cd2f7b01d22443d559114595e3a1))


### BREAKING CHANGES

* **ui5-li:** The `image` property of the `ui5-li` is removed and the `imageContent` slot is renamed to `image`.
If you have previously used the `image` property:
```html
<ui5-li image="./img/HT-1022.jpg">Standard List Item</ui5-li>
```
or the `imageContent` slot:
```html
<ui5-li> Avatar inside imageContent slot
	<ui5-avatar slot="imageContent" shape="Square" initials="ABC" color-scheme="Accent2"></ui5-avatar>
</ui5-li>
```

Now use `image`  slot instead:
```html
<ui5-li> Avatar inside image slot
	<ui5-avatar slot="image" shape="Square" initials="ABC" color-scheme="Accent2"></ui5-avatar>
</ui5-li>

```


Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887, https://github.com/SAP/ui5-webcomponents/issues/9200
* **ui5-combobox, ui5-multi-combobox:** The ui5-cb-item-group & ui5-mcb-item-group text property is renamed to header-text.
If you previously used the text property:

<ui5-cb-item-group text="A">
   <ui5-cb-item text="Algeria"></ui5-cb-item>
</ui5-cb-item-group>
<ui5-mcb-item-group text="A">
   <ui5-mcb-item text="Afghanistan"></ui5-mcb-item>
</ui5-mcb-item-group>
Now you must rename it to header-text:

<ui5-cb-item-group header-text="A">
   <ui5-cb-item text="Algeria"></ui5-cb-item>
</ui5-cb-item-group>
<ui5-mcb-item-group header-text="A">
   <ui5-mcb-item text="Afghanistan"></ui5-mcb-item>
</ui5-mcb-item-group>
* The `ListSeparators` (plural form) enum has been renamed to `ListSeparator` (singular form).
If you previously imported the `ListSeparators`:
```ts
import ListSeparators from "@ui5/webcomponents/dist/types/ListSeparators.js";
import type ListSeparators from "@ui5/webcomponents/dist/types/ListSeparators.js";
```

Now, you must import the `ListSeparator` enumeration as follows:

```ts
import ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
import type ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-input:** remove `type`, `description`, `icon`, `iconEnd`, `image` from `ui5-suggestion-item` and introduce `ui5-suggestion-item-custom`

`ui5-suggestion-item`:
- `type` property is removed, use `ui5-suggestion-item-custom` instead.
- `description` property is removed, use `ui5-suggestion-item-custom` instead.
- `icon` property is removed, use `ui5-suggestion-item-custom` instead.
- `iconEnd` property is removed, use `ui5-suggestion-item-custom` instead.
- `image` property is removed, use `ui5-suggestion-item-custom` instead.

`ui5-suggestion-group-item`:
- renamed to `ui5-suggestion-item-group`
- `text` is removed, use `headerText` instead

`ui5-suggestion-item-custom`:
- custom suggestion item with open content similar to `ui5-li-custom`
- to be used for custom scenarios
- to highlight custom items use `@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js`

All suggestion items are now physical items and can be overstyled.
Grouping now works with via nesting: e.g.

```js
<ui5-input show-suggestions>
  <ui5-suggestion-item-group header-text="Group 1">
    <ui5-suggestion-item text="Group Item 1"></ui5-suggestion-item>
  </ui5-suggestion-item-group>
</ui5-input>
```
* @property decorator must be adapted according to new type parameter
* **ui5-menu-separator:** `startsSection` property removed from MenuItems

Before:

<ui5-menu>
    <ui5-menu-item text="Item A"></ui5-menu-item>
    <ui5-menu-item text="Item B" starts-section></ui5-menu-item>
</ui5-menu>

Now:

<ui5-menu>
    <ui5-menu-item text="Item A"></ui5-menu-item>
    <ui5-menu-separator></ui5-menu-separator>
    <ui5-menu-item text="Item B"></ui5-menu-item>
</ui5-menu>





# [2.0.0-rc.6](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.5...v2.0.0-rc.6) (2024-06-17)


### Bug Fixes

* **framework:** set dataTransfer.effectAllowed only for UI5 elements ([#9136](https://github.com/SAP/ui5-webcomponents/issues/9136)) ([28f6a2d](https://github.com/SAP/ui5-webcomponents/commit/28f6a2d25c2d0c49ace86a0be4fdfb9026f94be2))
* **ui5-busy-indicator:** add block layer ([#9208](https://github.com/SAP/ui5-webcomponents/issues/9208)) ([ba4ddb3](https://github.com/SAP/ui5-webcomponents/commit/ba4ddb3a2b95625b65157a0e1d85763f784fe310)), closes [#9079](https://github.com/SAP/ui5-webcomponents/issues/9079)
* **ui5-button:** fix tab chaining in lists ([#9148](https://github.com/SAP/ui5-webcomponents/issues/9148)) ([9fdf617](https://github.com/SAP/ui5-webcomponents/commit/9fdf61710a19613e8f7fa3ea74066eb3efff1241))
* **ui5-carousel:** selected state  is added to item ([#9184](https://github.com/SAP/ui5-webcomponents/issues/9184)) ([ced0f35](https://github.com/SAP/ui5-webcomponents/commit/ced0f35ccf70b58ec3853ddf18021b0c9f11ff77))
* **ui5-date-picker:** adjust unstable tests ([#9223](https://github.com/SAP/ui5-webcomponents/issues/9223)) ([3b049c8](https://github.com/SAP/ui5-webcomponents/commit/3b049c89ae494f77e9392ddd0c279e7595cd8744)), closes [#9033](https://github.com/SAP/ui5-webcomponents/issues/9033)
* **ui5-date-picker:** provide accessible name to the popover ([#8693](https://github.com/SAP/ui5-webcomponents/issues/8693)) ([26dee35](https://github.com/SAP/ui5-webcomponents/commit/26dee35ceb6f07c8e760768a493c2d2377ff17f5)), closes [#8598](https://github.com/SAP/ui5-webcomponents/issues/8598)
* **ui5-dialog:** fix focusing when dialog is open from OpenUI5 dialog ([#9183](https://github.com/SAP/ui5-webcomponents/issues/9183)) ([d067e13](https://github.com/SAP/ui5-webcomponents/commit/d067e139d8674413369a3e8b078ce6ca67415e90))
* **ui5-file-uploader:** apply focus properly from inside of a popover ([#9162](https://github.com/SAP/ui5-webcomponents/issues/9162)) ([2283e9e](https://github.com/SAP/ui5-webcomponents/commit/2283e9ea8d952413380ee5106ff94246a51d6a83)), closes [#9090](https://github.com/SAP/ui5-webcomponents/issues/9090)
* **ui5-list-item:** move styles back from shadow DOM element to :host ([#9155](https://github.com/SAP/ui5-webcomponents/issues/9155)) ([68cdd20](https://github.com/SAP/ui5-webcomponents/commit/68cdd20e8a047531c116f7d487bbfedb9af8ad58))
* **ui5-list:** adjust failing test ([#9191](https://github.com/SAP/ui5-webcomponents/issues/9191)) ([55e477c](https://github.com/SAP/ui5-webcomponents/commit/55e477ca342f9adbb3f75ceec68670e05911bbdb)), closes [#9173](https://github.com/SAP/ui5-webcomponents/issues/9173)
* **ui5-multi-combobox:** correct lint error ([#9157](https://github.com/SAP/ui5-webcomponents/issues/9157)) ([55cd3aa](https://github.com/SAP/ui5-webcomponents/commit/55cd3aa1f1c8dc69838206b6f94a796ef5c4bc32))
* **ui5-segmented-button-item:** add padding to icon when item is not in icon-only mode ([#9180](https://github.com/SAP/ui5-webcomponents/issues/9180)) ([a3fd241](https://github.com/SAP/ui5-webcomponents/commit/a3fd2414b26497b010accd18a0805c2aec163338)), closes [#9172](https://github.com/SAP/ui5-webcomponents/issues/9172)
* **ui5-special-date:** respect format-pattern ([#9086](https://github.com/SAP/ui5-webcomponents/issues/9086)) ([105c311](https://github.com/SAP/ui5-webcomponents/commit/105c311c24917c44c905cfd6fe17c7c37953d9de))
* **ui5-step-input:** check for inner input before using value ([#9212](https://github.com/SAP/ui5-webcomponents/issues/9212)) ([1b9fb61](https://github.com/SAP/ui5-webcomponents/commit/1b9fb61241d31cb47045797cc86c6d698dfca127))
* **ui5-tree-item:** ensure correct cursor style ([#9152](https://github.com/SAP/ui5-webcomponents/issues/9152)) ([d196583](https://github.com/SAP/ui5-webcomponents/commit/d196583d40c59e062cd219064ec98d3f5c82d4a9)), closes [#9146](https://github.com/SAP/ui5-webcomponents/issues/9146)


### Code Refactoring

* **ui5-checkbox:** wrap text by default ([#9165](https://github.com/SAP/ui5-webcomponents/issues/9165)) ([ba1c583](https://github.com/SAP/ui5-webcomponents/commit/ba1c583f01c38f11fd815c2d26ea4ef5c0024ea1))
* **ui5-li, ui5-li-custom:** rename classes ([#9158](https://github.com/SAP/ui5-webcomponents/issues/9158)) ([8f5b679](https://github.com/SAP/ui5-webcomponents/commit/8f5b67901a429196252f52980c10a04f7d43fe0b))
* **ui5-tag:** wrap text by default ([#9126](https://github.com/SAP/ui5-webcomponents/issues/9126)) ([96704b8](https://github.com/SAP/ui5-webcomponents/commit/96704b8e893a777206c00efbc57282e56429d687))


### Features

* **ui5-grid:** implementing new grid component ([#8362](https://github.com/SAP/ui5-webcomponents/issues/8362)) ([04d291d](https://github.com/SAP/ui5-webcomponents/commit/04d291dc368b884d9001e875441c54cf56e21d1a))
* **ui5-link:** introduce `icon` and `endIcon` properties ([#9036](https://github.com/SAP/ui5-webcomponents/issues/9036)) ([06318cb](https://github.com/SAP/ui5-webcomponents/commit/06318cbcf39736dbf64c99e0cca21ddd27eed459))
* **ui5-toolbar:** design property added ([#9147](https://github.com/SAP/ui5-webcomponents/issues/9147)) ([dc3dfe0](https://github.com/SAP/ui5-webcomponents/commit/dc3dfe0f8d968e91dda57bece5f82e6429db521c))


### BREAKING CHANGES

* **ui5-checkbox:** `wrapping-type` property default value has changed from `None` to `Normal`.
Before: 
```html
<ui5-checkbox text=Some very very very very long text"></ui5-checkbox><!-- would truncate the text if there is not enough space -->
```

Now:
```html
<ui5-checkbox text=Some very very very very long text"></ui5-checkbox> <!-- would let the text wrap if there is not enough space -->
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-tag:** `wrapping-type` property default value has changed from `None` to `Normal`. Before:
```html
<ui5-tag>In Process</ui5-tag><!-- would truncate the text if there is not enough space -->
```

Now:
```html
<ui5-tag>In Process</ui5-tag><!-- would let the text wrap if there is not enough space -->
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461

* refactor(ui5-tag): fix test texsts

* refactor(ui5-tag): fix height of the tags to be the same

No matter if the tag is with wrapping-type="None" or wrapping-type="Normal"
the height when there is only one line of text should be the same.

* refactor(ui5-tag): merge adjustments and code review comments

* refactor(ui5-tag): fix height
* **ui5-li, ui5-li-custom:** `StandardListItem` has been renamed to `ListItemStandard`, and `CustomListItem` has been renamed to `ListItemCustom`.
If you previously imported the classes as follows:
```ts
import StandardListItem from "@ui5/webcomponents/StandardListItem.js";
import CustomListItem from "@ui5/webcomponents/CustomListItem.js";
```
now you must change imports to:
```ts
import ListItemStandard from "@ui5/webcomponents/ListItemStandard.js";
import ListItemCustom from "@ui5/webcomponents/ListItemCustom.js";
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461





# [2.0.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2024-06-06)


### Bug Fixes

* **ui5-button:** adjust screen reader announcement order ([#8997](https://github.com/SAP/ui5-webcomponents/issues/8997)) ([2d9a16b](https://github.com/SAP/ui5-webcomponents/commit/2d9a16b403d9457382eeb5d0d913b463e4c52c6a))
* **ui5-calendar:** adjust accessibility semantics ([#9102](https://github.com/SAP/ui5-webcomponents/issues/9102)) ([06891a1](https://github.com/SAP/ui5-webcomponents/commit/06891a1369bf3b92e144953e8ddec58b10ef17d8)), closes [#9068](https://github.com/SAP/ui5-webcomponents/issues/9068) [#9069](https://github.com/SAP/ui5-webcomponents/issues/9069)
* **ui5-date:** remove circular dependency ([#9137](https://github.com/SAP/ui5-webcomponents/issues/9137)) ([9c8d12e](https://github.com/SAP/ui5-webcomponents/commit/9c8d12e79860d2203e1719248b4222101a8d0410))
* **ui5-input, ui5-combobox, ui5-multi-combobox:** prevent native input autocomplete ([#9130](https://github.com/SAP/ui5-webcomponents/issues/9130)) ([5d8dbbd](https://github.com/SAP/ui5-webcomponents/commit/5d8dbbdf0129165a11d6f9e44e4458f1c54b8fb7))
* **ui5-option-custom:** show focus outline ([#9101](https://github.com/SAP/ui5-webcomponents/issues/9101)) ([bf8366e](https://github.com/SAP/ui5-webcomponents/commit/bf8366eb6c8f52e15de249f32cfb8213e016370c))
* **ui5-popup:** initialFocus won't work if 'autofocus' is set ([#8956](https://github.com/SAP/ui5-webcomponents/issues/8956)) ([2c9f775](https://github.com/SAP/ui5-webcomponents/commit/2c9f7757c9378732c1231651bdc8a39004a22a60))
* **ui5-popup:** remove popup from the tab chain ([#8955](https://github.com/SAP/ui5-webcomponents/issues/8955)) ([aedcdb9](https://github.com/SAP/ui5-webcomponents/commit/aedcdb934358cebef3d0544c44e6a8a9d437531d)), closes [#9094](https://github.com/SAP/ui5-webcomponents/issues/9094)


### Code Refactoring

* **ui5-link:** wrap text by default ([#9006](https://github.com/SAP/ui5-webcomponents/issues/9006)) ([1924b54](https://github.com/SAP/ui5-webcomponents/commit/1924b5457f22c428527f8be3fbdd46d9d5d7ffed))
* **ui5-radio-button:** wrap text by default ([#9117](https://github.com/SAP/ui5-webcomponents/issues/9117)) ([b8d7bac](https://github.com/SAP/ui5-webcomponents/commit/b8d7bac56c783825cf9354e020730e0d6a87a2b4))


### Features

* **ui5-menu-item:** add endContent slot ([dc3cfde](https://github.com/SAP/ui5-webcomponents/commit/dc3cfde6483e9d4200ed9b4c1772872836233842)), closes [#6350](https://github.com/SAP/ui5-webcomponents/issues/6350)
* **ui5-select:** introduced 'popover' part ([#9120](https://github.com/SAP/ui5-webcomponents/issues/9120)) ([3c03e17](https://github.com/SAP/ui5-webcomponents/commit/3c03e17288b58d8a5a5771085ff20a20cbfae783)), closes [#4503](https://github.com/SAP/ui5-webcomponents/issues/4503)
* **ui5-time-picker:** introduce `open` and `close` events ([#9093](https://github.com/SAP/ui5-webcomponents/issues/9093)) ([bf2d0aa](https://github.com/SAP/ui5-webcomponents/commit/bf2d0aaaf3856c61b3a658e57dd581a904c82cbf))


### BREAKING CHANGES

* **ui5-radio-button:** `wrapping-type` property default value has changed from `None` to `Normal`.
Before:
```html
<ui5-radio-button text="Option A with long long text"></ui5-radio-button>
<!-- would truncate the text if there is not enough space -->
```

Now:
```html
<ui5-radio-button text="Option A with long long text"></ui5-radio-button>
<!-- would let the text wrap if there is not enough space -->
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-link:** `wrapping-type` property default value has changed from `None` to `Normal`.
Before: 
```html
<ui5-link>some very very very long link</ui5-link> <!-- would truncate the text if there is not enough space -->
```

Now:
```html
<ui5-link>some very very very long link</ui5-link> <!-- would let the text wrap if there is not enough space -->
```





# [2.0.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2024-05-29)


### Bug Fixes

* **ui5-button:** add keyboard shortcut to cancel the button's action ([c2d9c85](https://github.com/SAP/ui5-webcomponents/commit/c2d9c8563ab35dba4a6a062704336df846d7e948)), closes [#6782](https://github.com/SAP/ui5-webcomponents/issues/6782)
* **ui5-button:** adjust ui5-button menu button samples to use open/opener ([974ff8c](https://github.com/SAP/ui5-webcomponents/commit/974ff8c4e3582f6a18621100a9fb6ae8b2f47dbd))
* **ui5-button:** remove tabindex from disabled button ([#8957](https://github.com/SAP/ui5-webcomponents/issues/8957)) ([041f573](https://github.com/SAP/ui5-webcomponents/commit/041f57323fcaeaa6fc5aec7299e673ead6aece0e)), closes [#8852](https://github.com/SAP/ui5-webcomponents/issues/8852)
* **ui5-calendar-legend:** align visual design to meet WCAG 2.2 requirements ([0860a3e](https://github.com/SAP/ui5-webcomponents/commit/0860a3e53547d9aa9158611b4c6164cd7ded4324))
* **ui5-calendar:** change the show month/year private event names ([#8960](https://github.com/SAP/ui5-webcomponents/issues/8960)) ([c981459](https://github.com/SAP/ui5-webcomponents/commit/c981459612298ca49eaf1faa688329c04d7462a1)), closes [#8893](https://github.com/SAP/ui5-webcomponents/issues/8893)
* **ui5-calendar:** respect component level calendarType in week calculation ([#8971](https://github.com/SAP/ui5-webcomponents/issues/8971)) ([69b8003](https://github.com/SAP/ui5-webcomponents/commit/69b8003c93ab724e722a841e1a25bb2236c44110))
* **ui5-calendar:** switch to two column layout on Islamic or Persian secondary calendar type ([#8453](https://github.com/SAP/ui5-webcomponents/issues/8453)) ([1b172eb](https://github.com/SAP/ui5-webcomponents/commit/1b172eb3f6bd6f9aa541cce87e1c21036f58ec16))
* **ui5-date-picker:** adjust failing tests ([#9039](https://github.com/SAP/ui5-webcomponents/issues/9039)) ([7232039](https://github.com/SAP/ui5-webcomponents/commit/72320391a69fa92a27d0b83d1abbd7dfd57d1cde)), closes [#9033](https://github.com/SAP/ui5-webcomponents/issues/9033) [#9034](https://github.com/SAP/ui5-webcomponents/issues/9034)
* **ui5-date-picker:** display initial view properly ([#8910](https://github.com/SAP/ui5-webcomponents/issues/8910)) ([e570031](https://github.com/SAP/ui5-webcomponents/commit/e570031c7986b4f9005c8628fdd87cac0c7fcd94)), closes [#8893](https://github.com/SAP/ui5-webcomponents/issues/8893)
* **ui5-datetime-picker:** change dateformat to datetime instance ([#9024](https://github.com/SAP/ui5-webcomponents/issues/9024)) ([e5051ea](https://github.com/SAP/ui5-webcomponents/commit/e5051ea70af8c470f53788a7b13a2fb3f8c3f123))
* **ui5-multi-input:** delete selected value on BACKSPACE ([#8982](https://github.com/SAP/ui5-webcomponents/issues/8982)) ([d773532](https://github.com/SAP/ui5-webcomponents/commit/d773532f5826e98f217768206e1d7bbcd57e7c27))
* **ui5-multiinput:** restore and adjust unit tests ([#8933](https://github.com/SAP/ui5-webcomponents/issues/8933)) ([70dc2a6](https://github.com/SAP/ui5-webcomponents/commit/70dc2a628c8cf49291d3d19054bda03b3a4f1caf))
* **ui5-notification-list:** fix keyboard issues ([#9040](https://github.com/SAP/ui5-webcomponents/issues/9040)) ([f1c0635](https://github.com/SAP/ui5-webcomponents/commit/f1c0635d6d2b94e94b7ecc311bb49480db1fae6d))
* **ui5-panel:** fix failing tests ([#9044](https://github.com/SAP/ui5-webcomponents/issues/9044)) ([aeb7d42](https://github.com/SAP/ui5-webcomponents/commit/aeb7d42d668245332a30242747361cd25af0107c))
* **ui5-popover:** correct placement in RTL direction ([#9009](https://github.com/SAP/ui5-webcomponents/issues/9009)) ([36fa85e](https://github.com/SAP/ui5-webcomponents/commit/36fa85eb3a33861062aa6b8cfe548c593a7dc6d8))
* **ui5-popover:** fix auto close when click on iframe inside a shadow root ([#8961](https://github.com/SAP/ui5-webcomponents/issues/8961)) ([5c2f5f6](https://github.com/SAP/ui5-webcomponents/commit/5c2f5f694b70df68dc512d2e58d2fac49dd552e6))
* **ui5-popover:** fix infinite open/show loop ([#9055](https://github.com/SAP/ui5-webcomponents/issues/9055)) ([a142caf](https://github.com/SAP/ui5-webcomponents/commit/a142caf730011443e5c3ca7000d5cd8a19e6253e)), closes [#9031](https://github.com/SAP/ui5-webcomponents/issues/9031)
* **ui5-popover:** prevent runtime error when opener is outside the viewport ([#9017](https://github.com/SAP/ui5-webcomponents/issues/9017)) ([9212aa8](https://github.com/SAP/ui5-webcomponents/commit/9212aa85f38be1282a90d937c05746f2558c02e7))
* **ui5-responsive-popover:** fix initially focused input going out of the viewport on iPhone ([#8945](https://github.com/SAP/ui5-webcomponents/issues/8945)) ([7ff177c](https://github.com/SAP/ui5-webcomponents/commit/7ff177cd233bfdc6707499622200702c17043782))
* **ui5-segmented-button-item:** align sizes to spec ([#8972](https://github.com/SAP/ui5-webcomponents/issues/8972)) ([0eefe5f](https://github.com/SAP/ui5-webcomponents/commit/0eefe5f5d83f0c318445eebf1ea4fff5a8370a63)), closes [#7357](https://github.com/SAP/ui5-webcomponents/issues/7357)
* **ui5-select:** popover scrolls to typed item ([#9053](https://github.com/SAP/ui5-webcomponents/issues/9053)) ([70bbd7f](https://github.com/SAP/ui5-webcomponents/commit/70bbd7f118c8c1a1c331605aa77b231bc2c80901)), closes [#8987](https://github.com/SAP/ui5-webcomponents/issues/8987)
* **ui5-side-navigation:** menu in collapsed mode width is not longer stretched unnecessary ([#8940](https://github.com/SAP/ui5-webcomponents/issues/8940)) ([30c0530](https://github.com/SAP/ui5-webcomponents/commit/30c053046d1bfbbcb880a5dd10f3f177fdbfbec7))
* **ui5-side-navigation:** overflow menu items are now displayed ([#8948](https://github.com/SAP/ui5-webcomponents/issues/8948)) ([bcb3008](https://github.com/SAP/ui5-webcomponents/commit/bcb3008187fb0e66d7ddeb6bb048857382d414a2))
* **ui5-tag:** add colors for Quartz high contrast themes for Set 2 ([#8952](https://github.com/SAP/ui5-webcomponents/issues/8952)) ([92b3cf8](https://github.com/SAP/ui5-webcomponents/commit/92b3cf820754cb45053430de5b172e34fa698106))
* **ui5-time-picker:** remove box shadow ([#8951](https://github.com/SAP/ui5-webcomponents/issues/8951)) ([7c7170d](https://github.com/SAP/ui5-webcomponents/commit/7c7170d4a7d5f7b1f76aa9670baac498b954a425)), closes [#8932](https://github.com/SAP/ui5-webcomponents/issues/8932)


### Code Refactoring

* **ui5-input:** replace openPicker method with public property open ([#8950](https://github.com/SAP/ui5-webcomponents/issues/8950)) ([3e2b32e](https://github.com/SAP/ui5-webcomponents/commit/3e2b32e9e34812e1258ec8dbcf3b23260b803bb6))
* **ui5-list:** refactored HighlightTypes ([#9061](https://github.com/SAP/ui5-webcomponents/issues/9061)) ([2510224](https://github.com/SAP/ui5-webcomponents/commit/251022448cc7b74a8cdf0c5bb3e822ddc180faf8)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-option:** make options physical elements ([#8903](https://github.com/SAP/ui5-webcomponents/issues/8903)) ([8d6fac7](https://github.com/SAP/ui5-webcomponents/commit/8d6fac75151fd3f42f58ec29cc8f27d0383114d2)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#7887](https://github.com/SAP/ui5-webcomponents/issues/7887)
* **ui5-popover:** remove hideBackdrop property ([#8947](https://github.com/SAP/ui5-webcomponents/issues/8947)) ([f628fbc](https://github.com/SAP/ui5-webcomponents/commit/f628fbc8df403344629f4b608512fda38d6ee674)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-popup:** rename after-open and after-close events to 'open' and 'close' ([#8946](https://github.com/SAP/ui5-webcomponents/issues/8946)) ([912167d](https://github.com/SAP/ui5-webcomponents/commit/912167d18cd5e365a03513defc570da5bf372715)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-toast:** rename event `after-close` to `close` ([#8967](https://github.com/SAP/ui5-webcomponents/issues/8967)) ([d05839d](https://github.com/SAP/ui5-webcomponents/commit/d05839d9efa1102c11d5790d8049caeb96a9696c))


### Features

* **ui5-*:** integrate element internals in input components ([#8685](https://github.com/SAP/ui5-webcomponents/issues/8685)) ([c8e68d5](https://github.com/SAP/ui5-webcomponents/commit/c8e68d59e51c6ab56328062ac8bce7889b30062d)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-button:** add second (end) icon ([2e97c03](https://github.com/SAP/ui5-webcomponents/commit/2e97c03fc8f9d00c7d9bdd8c1ceb63bac13b7e32))
* **ui5-color-palette-item:** introduce selected state ([#8554](https://github.com/SAP/ui5-webcomponents/issues/8554)) ([b0f8a30](https://github.com/SAP/ui5-webcomponents/commit/b0f8a30dac10f4b1931cf3a7105f7998f2fb4dc7))
* **ui5-combobox:** introduce nested grouping of items ([#8926](https://github.com/SAP/ui5-webcomponents/issues/8926)) ([92fe765](https://github.com/SAP/ui5-webcomponents/commit/92fe765f87039d210c6fe0ba5d6d3cc3884ba871))
* **ui5-date-range:** introduce new calendar date type ([#8804](https://github.com/SAP/ui5-webcomponents/issues/8804)) ([ffe14a5](https://github.com/SAP/ui5-webcomponents/commit/ffe14a534ee7a50a58e033c6bbbad5213fe7e14f)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-dynamic-page:** introduce new component ([#7899](https://github.com/SAP/ui5-webcomponents/issues/7899)) ([3752ce7](https://github.com/SAP/ui5-webcomponents/commit/3752ce701fe915fa0b02ba2b114c40bf3b7d9123))
* **ui5-form:** introduce Form web component ([#8281](https://github.com/SAP/ui5-webcomponents/issues/8281)) ([8d72042](https://github.com/SAP/ui5-webcomponents/commit/8d720429d9ad416f73f42c08ab9aa0e892e24ddb)), closes [#7854](https://github.com/SAP/ui5-webcomponents/issues/7854)
* **ui5-input:** add input type search ([#8980](https://github.com/SAP/ui5-webcomponents/issues/8980)) ([410ba3f](https://github.com/SAP/ui5-webcomponents/commit/410ba3ff7c49eaa46a8e0c4d756897c42a11aadc)), closes [#7641](https://github.com/SAP/ui5-webcomponents/issues/7641)
* **ui5-input:** allow custom icon styling ([#8881](https://github.com/SAP/ui5-webcomponents/issues/8881)) ([cf9f1c2](https://github.com/SAP/ui5-webcomponents/commit/cf9f1c28c93b9fa6c8663ce24d3c5e6d1ff4cc4e)), closes [#8182](https://github.com/SAP/ui5-webcomponents/issues/8182) [#6132](https://github.com/SAP/ui5-webcomponents/issues/6132)
* **ui5-li-notification:** implement new design ([#8426](https://github.com/SAP/ui5-webcomponents/issues/8426)) ([e451cdc](https://github.com/SAP/ui5-webcomponents/commit/e451cdc3709553dcb780f637463dc1b29e8f2971))
* **ui5-list,ui5-tree:** make drag&drop feature public ([#8904](https://github.com/SAP/ui5-webcomponents/issues/8904)) ([60b8038](https://github.com/SAP/ui5-webcomponents/commit/60b8038b0731bbf5a3222bc757fcc710d213b7d2))
* **ui5-time-picker:** introduce `open` property ([#9001](https://github.com/SAP/ui5-webcomponents/issues/9001)) ([1c1cea6](https://github.com/SAP/ui5-webcomponents/commit/1c1cea6afd6cca85516dd42a70de12be7554b05e))
* **ui5-toolbar-button:** add second (end) icon ([#9048](https://github.com/SAP/ui5-webcomponents/issues/9048)) ([6688814](https://github.com/SAP/ui5-webcomponents/commit/6688814c0bea49fe1522deea79a2b754ce8f6f60))


### BREAKING CHANGES

* **ui5-input:** Remove openPicker method and replace it with public property open

Before the ui5-input suggestions popover could be opened by calling `openPicker()` :
```js
const input = document.getElementById("exampleID");
input.openPicker();
```

Now the suggestions popover is opened by setting the `open` property to true:
```js
const input = document.getElementById("exampleID");
input.open = true;
```

* refactor(ui5-input): fix spacing in input.mobile.spec.js
* **ui5-combobox:** The ui5-cb-group-item component is removed. Groups can now be created with the ui5-cb-item-group.
* **ui5-list:** `Highlight` enum should be imported differently.
Before: 
```js
import HighlightTypes from "@ui5/webcomponents-base/dist/types/HighlightTypes.js";
```

Now:
```js
import Highlight from "@ui5/webcomponents-base/dist/types/Highlight.js";
```
* **ui5-toolbar-button:** iconEnd property is changed from boolean to string type and now can accept name for second/end icon.

Before:

`<ui5-toolbar-button icon="home" icon-end>Button</ui5-toolbar-button>`

Now:

`<ui5-toolbar-button end-icon="home">Button</ui5-toolbar-button>`

or 

`<ui5-toolbar-button icon="employee" end-icon="home">Button</ui5-toolbar-button>`
* **ui5-option:** The ui5-select-menu and ui5-select-menu-option components are removed. Custom options can now be created using the ui5-option-custom, directly placed inside the default slot of the ui5-select

SelectMenu & SelectMenuOption
Changed item	Old	New
SelectMenu	ui5-select-menu	removed
SelectMenuOption	ui5-select-menu-option	ui5-option-custom
If you have previously used the ui5-select-menu and ui5-select-menu-option:

<ui5-select menu="selectMenu"></ui5-select>

<ui5-select-menu id="selectMenu">
    <ui5-select-menu-option>
        <div class="optionContent">custom</div>
    </ui5-select-menu-option>
</ui5-select-menu>
Now use just ui5-select and ui5-option-custom instead:

<ui5-select>
    <ui5-option-custom>
        <div class="optionContent">custom</div>
    </ui5-option-custom>
</ui5-select>
Select
Changed item	Old	New
property	menu	removed
The menu property of the ui5-select is removed.
* **ui5-button:** iconEnd property is changed from boolean to string type and now can accept name for second/end icon.

Before:

`<ui5-button icon="home" icon-end>Button</ui5-button>`

Now:

`<ui5-button end-icon="home">Button</ui5-button>`

or 

`<ui5-button icon="employee" end-icon="home">Button</ui5-button>`
* **ui5-toast:** The `after-close`  event has been renamed to `close`. If you previously used it like:
```ts
toast.addEventListener("after-close", (event) => {
});
```
Now you have to use it like:
```ts
toast.addEventListener("close", (event) => {
});
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-*:** The `features/InputElementsFormSupport.js` feature has been deleted and now, form elements works natively in form elements.
* **ui5-date-range:** dates slot in a calendar now works with a ui5-date-range when selection-mode="Range"

Previously date ranges were declared as follows:

<ui5-calendar selection-mode="Range">
        <ui5-date value="Jan 20, 2021"></ui5-date>
        <ui5-date value="Jan 30, 2021"></ui5-date>
</ui5-calendar>

Now they are declared using a ui5-date-range:

<ui5-calendar selection-mode="Range">
	<ui5-date-range start-value="Jan 20, 2021" end-value="Jan 30, 2021"></ui5-date-range>
</ui5-calendar>
* **ui5-popup:** Event names `after-close` and `after-open` are now named `close` and `open`.
Previously the application developers could subscribe to the events as follows:
```ts
popup.addEventListener("after-open", function() {
	//...
});
popup.addEventListener("after-close", function() {
	//...
});
```

Now the application developers should include the ui5-bar as follows:
```ts
popup.addEventListener("open", function() {
	//...
});

popup.addEventListener("close", function() {
	//...
});

```
* **ui5-popover:** Property `hideBackdrop` is removed.

Previously the application developers could define a modal popover without visible backdrop as follows:

```
<ui5-popover modal hide-backdrop>
```
Now the application developers can use the standard [`::backdrop` CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop)


```

<style>
.transparentBackdrop::backdrop {
  background: transparent;
}
</style>

...

<ui5-popover modal class="transparentBackdrop">
```





# [2.0.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2024-05-10)


### Bug Fixes

* **ui5-cb-item:** return the DOM reference of the list item ([#8872](https://github.com/SAP/ui5-webcomponents/issues/8872)) ([2553213](https://github.com/SAP/ui5-webcomponents/commit/2553213c156d482989f21018f14a903a18256c65)), closes [#8841](https://github.com/SAP/ui5-webcomponents/issues/8841)
* **ui5-dialog:** state icon no longer shrinks when title is too long ([#8839](https://github.com/SAP/ui5-webcomponents/issues/8839)) ([9b7fa49](https://github.com/SAP/ui5-webcomponents/commit/9b7fa4986e3fe62f069f08dd4d6fe8068c0d3456))
* **ui5-file-uploader:** adjust drop area ([56bcab5](https://github.com/SAP/ui5-webcomponents/commit/56bcab505ca057c613dd688d05e0b381451ffe06)), closes [#8572](https://github.com/SAP/ui5-webcomponents/issues/8572)
* **ui5-link:** remove unnecessary transparent border ([aa27032](https://github.com/SAP/ui5-webcomponents/commit/aa27032530f8c31d9566ea3ec3b1f7e2d32ed7d4)), closes [#8512](https://github.com/SAP/ui5-webcomponents/issues/8512)
* **ui5-multi-combobox:** correct unstable tests ([#8867](https://github.com/SAP/ui5-webcomponents/issues/8867)) ([b2d004b](https://github.com/SAP/ui5-webcomponents/commit/b2d004b855336043cd32628418beccc28d04d04a))
* **ui5-multi-combobox:** remove value state header on validation reset ([#8832](https://github.com/SAP/ui5-webcomponents/issues/8832)) ([5cad77b](https://github.com/SAP/ui5-webcomponents/commit/5cad77bd0557f25420e459c7a2a4d09618027fb6)), closes [#8674](https://github.com/SAP/ui5-webcomponents/issues/8674)
* **ui5-multi-input:** focus tokens on BACKSPACE for inputs of type 'Number' and 'Email' ([#8866](https://github.com/SAP/ui5-webcomponents/issues/8866)) ([7b5645d](https://github.com/SAP/ui5-webcomponents/commit/7b5645d8668e053d0e3c419148626eb2f3041ce0)), closes [#8712](https://github.com/SAP/ui5-webcomponents/issues/8712)
* **ui5-progress-indicator:** removed redundant z-index ([#8797](https://github.com/SAP/ui5-webcomponents/issues/8797)) ([4763637](https://github.com/SAP/ui5-webcomponents/commit/4763637497dea45beb96c2d5beee20960a078e47)), closes [#8303](https://github.com/SAP/ui5-webcomponents/issues/8303)
* **ui5-split-button:** restrict height manipulation from outside wrapper ([#8780](https://github.com/SAP/ui5-webcomponents/issues/8780)) ([691c68e](https://github.com/SAP/ui5-webcomponents/commit/691c68e8caa09669d9a4c47a46e804737fe1a7b8))
* **ui5-step-input:** remove value rounding, apply value-state ([#8293](https://github.com/SAP/ui5-webcomponents/issues/8293)) ([0c0aa1d](https://github.com/SAP/ui5-webcomponents/commit/0c0aa1d39214d29786088e132243b609ac917b0f))
* **ui5-tabcontainer:** avoid multiple selected tabs when there is no explicit selection ([#8808](https://github.com/SAP/ui5-webcomponents/issues/8808)) ([ae8d969](https://github.com/SAP/ui5-webcomponents/commit/ae8d9694880b6e0253c409028f5b29e25a50da1b))
* **ui5-tab:** focus() now works if tab is currently displayed in the overflow ([#8796](https://github.com/SAP/ui5-webcomponents/issues/8796)) ([52c3ea8](https://github.com/SAP/ui5-webcomponents/commit/52c3ea81c9db33b273fe1f9f1068578267b080e5))
* **ui5-time-picker:** fix buttons announcements in value help dialog ([#8848](https://github.com/SAP/ui5-webcomponents/issues/8848)) ([d5f25fb](https://github.com/SAP/ui5-webcomponents/commit/d5f25fb6dfd52419c626c0c95db5346af1a98535))
* **ui5-toolbar:** prevent closing of overflow on interaction ([#8924](https://github.com/SAP/ui5-webcomponents/issues/8924)) ([9fb21bf](https://github.com/SAP/ui5-webcomponents/commit/9fb21bf455d82ecd3e6757c31fdc546f0c3b1bac))


### chore

* **Icons:** make pathData async ([#8785](https://github.com/SAP/ui5-webcomponents/issues/8785)) ([0549dc9](https://github.com/SAP/ui5-webcomponents/commit/0549dc95edae139f7a4f9efbbc7170922b3ab6cb))


### Code Refactoring

* rename ValueState values ([#8864](https://github.com/SAP/ui5-webcomponents/issues/8864)) ([ef9304d](https://github.com/SAP/ui5-webcomponents/commit/ef9304da4b1446178b1b2bfa737d9867461cc4bc))
* **theming:** remove Belize theme ([#8519](https://github.com/SAP/ui5-webcomponents/issues/8519)) ([990313f](https://github.com/SAP/ui5-webcomponents/commit/990313fc8e429a491f4d6e67306d3df2703e54fe)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-*:** use unified API to define a11y attributes via `accessibilityAttributes` ([#8810](https://github.com/SAP/ui5-webcomponents/issues/8810)) ([49d587c](https://github.com/SAP/ui5-webcomponents/commit/49d587c73120a5511a34e61be949018605f49acd))
* **ui5-badge:** change default values of properties ([#8601](https://github.com/SAP/ui5-webcomponents/issues/8601)) ([6d1df02](https://github.com/SAP/ui5-webcomponents/commit/6d1df02a126443fc13febccd4b036e387b8d0190))
* **ui5-badge:** rename Badge `ui5-badge` to Tag `ui5-tag` ([#8884](https://github.com/SAP/ui5-webcomponents/issues/8884)) ([4b8c1ee](https://github.com/SAP/ui5-webcomponents/commit/4b8c1eee72a6baea79a58983e8cc021addca9480))
* **ui5-carousel:** replace items-per-page-s, items-per-page-m, items-per-page-l properties ([#8635](https://github.com/SAP/ui5-webcomponents/issues/8635)) ([fc8d15a](https://github.com/SAP/ui5-webcomponents/commit/fc8d15a212778072e8cead5febcae3492ae0a8e1)), closes [#8494](https://github.com/SAP/ui5-webcomponents/issues/8494) [#8496](https://github.com/SAP/ui5-webcomponents/issues/8496) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8497](https://github.com/SAP/ui5-webcomponents/issues/8497) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8504](https://github.com/SAP/ui5-webcomponents/issues/8504) [#8509](https://github.com/SAP/ui5-webcomponents/issues/8509) [#8507](https://github.com/SAP/ui5-webcomponents/issues/8507) [#8511](https://github.com/SAP/ui5-webcomponents/issues/8511) [#8501](https://github.com/SAP/ui5-webcomponents/issues/8501) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8503](https://github.com/SAP/ui5-webcomponents/issues/8503) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8506](https://github.com/SAP/ui5-webcomponents/issues/8506) [#8502](https://github.com/SAP/ui5-webcomponents/issues/8502) [#8524](https://github.com/SAP/ui5-webcomponents/issues/8524) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8525](https://github.com/SAP/ui5-webcomponents/issues/8525) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8518](https://github.com/SAP/ui5-webcomponents/issues/8518) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8526](https://github.com/SAP/ui5-webcomponents/issues/8526) [#8529](https://github.com/SAP/ui5-webcomponents/issues/8529) [#8528](https://github.com/SAP/ui5-webcomponents/issues/8528) [#8531](https://github.com/SAP/ui5-webcomponents/issues/8531) [#8532](https://github.com/SAP/ui5-webcomponents/issues/8532) [#8534](https://github.com/SAP/ui5-webcomponents/issues/8534) [#8163](https://github.com/SAP/ui5-webcomponents/issues/8163) [#8527](https://github.com/SAP/ui5-webcomponents/issues/8527) [#8538](https://github.com/SAP/ui5-webcomponents/issues/8538) [#8521](https://github.com/SAP/ui5-webcomponents/issues/8521) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8542](https://github.com/SAP/ui5-webcomponents/issues/8542) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8548](https://github.com/SAP/ui5-webcomponents/issues/8548) [#8555](https://github.com/SAP/ui5-webcomponents/issues/8555) [#8559](https://github.com/SAP/ui5-webcomponents/issues/8559) [#8565](https://github.com/SAP/ui5-webcomponents/issues/8565) [#8570](https://github.com/SAP/ui5-webcomponents/issues/8570) [#8558](https://github.com/SAP/ui5-webcomponents/issues/8558) [#8568](https://github.com/SAP/ui5-webcomponents/issues/8568) [#8596](https://github.com/SAP/ui5-webcomponents/issues/8596) [#8192](https://github.com/SAP/ui5-webcomponents/issues/8192) [#8606](https://github.com/SAP/ui5-webcomponents/issues/8606) [#8605](https://github.com/SAP/ui5-webcomponents/issues/8605) [#8600](https://github.com/SAP/ui5-webcomponents/issues/8600) [#8602](https://github.com/SAP/ui5-webcomponents/issues/8602)
* **ui5-icon:** add mode property ([#8834](https://github.com/SAP/ui5-webcomponents/issues/8834)) ([446483d](https://github.com/SAP/ui5-webcomponents/commit/446483d548bce20d36ffa0536a56bfab1cb00cfe))
* **ui5-input:** events changes ([#8769](https://github.com/SAP/ui5-webcomponents/issues/8769)) ([9f5c8a4](https://github.com/SAP/ui5-webcomponents/commit/9f5c8a4f3145a8f56abec178188e53b387a627b6))
* **ui5-li, ui5-list:** changes accessibleRole type ([#8825](https://github.com/SAP/ui5-webcomponents/issues/8825)) ([8235159](https://github.com/SAP/ui5-webcomponents/commit/8235159460d446d0f4df095868f81d86857ec510))
* **ui5-list:** enable hierarchical groups ([#8632](https://github.com/SAP/ui5-webcomponents/issues/8632)) ([193ed52](https://github.com/SAP/ui5-webcomponents/commit/193ed52f2085bef380005337001dc4f2f131a971)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-menu:** rename the busy and busy delay properties ([#8778](https://github.com/SAP/ui5-webcomponents/issues/8778)) ([3a4be3a](https://github.com/SAP/ui5-webcomponents/commit/3a4be3a195243d78a46310b0abf3c16ecf21c1ff)), closes [#8764](https://github.com/SAP/ui5-webcomponents/issues/8764)
* **ui5-page:** rename disableScrolling and floatingFooter properties ([#8816](https://github.com/SAP/ui5-webcomponents/issues/8816)) ([2f6fe6c](https://github.com/SAP/ui5-webcomponents/commit/2f6fe6c1e598ebb807ade1b1bfabe93c76f1b6fb))
* **ui5-segmented-button-item:** implement segmented button item independently from button ([#8669](https://github.com/SAP/ui5-webcomponents/issues/8669)) ([7b5f751](https://github.com/SAP/ui5-webcomponents/commit/7b5f7513bf91bcc20553dfefa4f40215c10e567b))
* **ui5-segmented-button:** rename `mode` to `selectionMode` ([#8761](https://github.com/SAP/ui5-webcomponents/issues/8761)) ([4be1540](https://github.com/SAP/ui5-webcomponents/commit/4be15407d7932599294a85a7297460d733b901b2))
* **ui5-split-button:** remove `activeIcon` property ([#8803](https://github.com/SAP/ui5-webcomponents/issues/8803)) ([f2bcfc1](https://github.com/SAP/ui5-webcomponents/commit/f2bcfc155d6baca2cddccd621ed81845b5244cb9)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-table:** move Table to `@ui5/webcomponents-compat` ([#8849](https://github.com/SAP/ui5-webcomponents/issues/8849)) ([779bcdc](https://github.com/SAP/ui5-webcomponents/commit/779bcdcaff6693252d0a8b69b886bf7b939c7887))
* **ui5-title:** wrap text by default ([#8916](https://github.com/SAP/ui5-webcomponents/issues/8916)) ([f267f50](https://github.com/SAP/ui5-webcomponents/commit/f267f504a93d45a65c4cdf2acff8c65182ba1df2))
* **ui5-toast:** replace `show` method with `open` property ([#8855](https://github.com/SAP/ui5-webcomponents/issues/8855)) ([372d27d](https://github.com/SAP/ui5-webcomponents/commit/372d27d9db9afd40ffaf85cbfab61f10284063c3)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)


### Features

* **ui5-badge:** new property added ([#8714](https://github.com/SAP/ui5-webcomponents/issues/8714)) ([a60c5ee](https://github.com/SAP/ui5-webcomponents/commit/a60c5ee50d18498db6af21e9c5d87b20699793c7))
* **ui5-date-picker:** Replace `openPicker` method with `open` property ([#8749](https://github.com/SAP/ui5-webcomponents/issues/8749)) ([d283984](https://github.com/SAP/ui5-webcomponents/commit/d2839842bf78c4d2f50bd477511619cbd9518904))


### BREAKING CHANGES

* **ui5-title:** wrapping-type property default value has changed from `None` to `Normal`.
Previously long texts would truncate if there is not enough space. Now, long texts would wrap.

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-input:** Remove suggestion-item-select event.
Rename and modify suggestion-item-preview event.
Remove openPicker method and replace it with public property "open".

* refactor(ui5-input): events changes

* refactor(ui5-input): property open tests

* refactor(ui5-input): events change

* refactor(ui5-input): events change

* refactor(ui5-input): events changes

* refactor(ui5-input): events changes

* refactor(ui5-input): events changes
* **ui5-date-picker:** removed `openPicker()`, `closePicker()` and `isOpen()` methods. If you previously used `openPicker()` and `closePicker()`:
```ts
const datePicker = document.getElementById("exampleID");
datePicker.openPicker();
datePicker.closePicker();
```
Now use the `open` property respectively: 
```ts
const datePicker = document.getElementById("exampleID");
datePicker.open = true;
datePicker.open = false;
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-*:** FlexibleLayout's `accessibilityTexts` and `accessibilityRoles` properties are removed. If you have previously used the `accessibilityTexts` or `accessibilityRoles` properties:
```js
fcl.accessibilityTexts = {
    startColumnAccessibleName: "Products list",
    midColumnAccessibleName: "Product information",
    endColumnAccessibleName: "Product detailed information",
    startArrowLeftText: "Collapse products list",
    startArrowRightText: "Expand products list",
    endArrowLeftText: "Expand product detailed information",
    endArrowRightText: "Collapse product detailed information",
    startArrowContainerAccessibleName: "Start Arrow Container",
    endArrowContainerAccessibleName: "End Arrow Container",
}

fcl.accessibilityRoles = {
    startColumnRole: "complementary",
    startArrowContainerRole: "navigation",
    midColumnRole: "main",
    endArrowContainerRole: "navigation",
    endColumnRole: "complementary".
}
```
Now use `accessibilityAttributes` instead:
```js
fcl.accessibilityAttributes = {
    startColumn: {
      role: "complementary",
      name: "Products list",
    },
    midColumn: {
      role: "main",
      name: "Product information",
    },
    endColumn: {
      role: "complementary",
      name: "Product detailed information",
    },
    startArrowLeft:  {
      name: "Collapse products list",
    },
    startArrowRight: {
      name: "Expand products list",
    },
    endArrowLeft: {
      name: "Expand product detailed information",
    },
    endArrowRight:  {
      name: "Collapse product detailed information",
    },
    startArrowContainer: {
      role: "navigation",
      name: "Start Arrow Container",
    },
    endArrowContainer: {
      role: "navigation",
      name: "End Arrow Container",
    },
};
```

ShellBar's `accessibilityTexts` and `accessibilityRoles` properties are removed. If you have previously used the `accessibilityTexts` or `accessibilityRoles` properties:
```js
shellbar.accessibilityTexts = {
    profileButtonTitle: "John Dow",
    logoTitle: "Custom logo title",
}

shellbar.accessibilityRoles = {
    logoRole: "link"
};
```
Now use `accessibilityAttributes` instead:
```js
shellbar.accessibilityAttributes = {
  profile: {
    name:  "John Dow",
  },
  logo: {
    role: "link"
    name: "Custom logo title"
  },
};
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461

				
* **ui5-badge:** Badge web component has been renamed to Tag. If you have previously used the `ui5-badge`:
```html
<ui5-badge></ui5-badge>
```
Now use `ui5-tag` instead:
```html
<ui5-tag></ui5-tag>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-icon:** The properties `ariaHidden` , `interactive` and `accessibleRole` , previously available in the `ui5-icon` component, have been removed. They are replaced by a new property named `mode` that specifies the component's mode. 
Alongside this update, a new enumeration `IconMode`, has been introduced to outline the available options for this property:

`Image`: This is the default setting. It configures the component to internally render `role="img"`.
`Interactive`: Configures the component to internally render `role="button"`. This mode also supports focus and press handling to enhance interactivity.
`Decorative`: In this mode, the component internally renders `role="presentation"` and `aria-hidden="true"`, making it purely decorative without semantic content or interactivity.

Now, you can set the mode of the `ui5-icon` as it follows:
```html
<ui5-icon id="imageIcon" mode="Image" name="add-equipment"></ui5-icon>
<ui5-icon id="myInteractiveIcon" mode="Interactive" name="add-equipment"></ui5-icon>
<ui5-icon id="decorativeIcon" mode="Decorative" name="add-equipment"></ui5-icon>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-li, ui5-list:** The `accessibleRole` property for both `ui5-li` and `ui5-list` has been updated from a string type to an enum type. 
Additionally, the new enums `ListItemAccessibleRole` and `ListAccessibleRole` have been introduced for these properties respectively.
The available options for the `ui5-li`:
	`ListItem`- Represents the ARIA role "listitem". (by default)
	`MenuItem`  -  Represents the ARIA role "menuitem".
	`TreeItem ` -  Represents the ARIA role "treeitem".
	`Option ` -  Represents the ARIA role "option".
	`None` - Represents the ARIA role "none".

The available options for the `ui5-list`:
	`List`- Represents the ARIA role "list".  (by default)
	`Menu`  -  Represents the ARIA role "menu".
	`Tree` -  Represents the ARIA role "tree".
	`ListBox` - Represents the ARIA role "listbox".
If you have previously used:
```html
<ui5-li accessible-role="menuitem"> List Item</ui5-li>
<ui5-list accessible-role="tree"> List </ui5-list>
```
Now use:
```html
<ui5-li accessible-role="MenuItem"> List Item</ui5-li>
<ui5-list accessible-role="Tree"> List </ui5-list>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-table:** If you previously used the Table from `@ui5/webcomponents`, you need to import it from @ui5/webcomponents-compat:
```ts
import "@ui5/webcomponents-compat/dist/Table.js"; // ui5-table
import "@ui5/webcomponents-compat/dist/TableColumn.js"; // ui5-table-column
import "@ui5/webcomponents-compat/dist/TableRow.js"; // ui5-table-row`
import "@ui5/webcomponents-compat/dist/TableGroupRow.js";` // ui5-table-group-row
import "@ui5/webcomponents-compat/dist/TableCell.js"; // ui5-table-cell
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* If you previously used ValueState.Warning, ValueState.Error or ValueState.Success, start using ValueState.Critical, ValueState.Negative and ValueState.Positive respectively. 
All components with valueState property are also affected. For example:
```html
<ui5-input value-state="Success"></ui5-input>
<ui5-input value-state="Warning"></ui5-input>
<ui5-input value-state="Error"></ui5-input>
```
```html
<ui5-input value-state="Positive"></ui5-input>
<ui5-input value-state="Critical"></ui5-input>
<ui5-input value-state="Negative"></ui5-input>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-toast:** The Toast#show method has been replaced by  `open` property. If you previously used  `toast.show()` to show the toast, you must now se `toast.open=true`.
* **ui5-segmented-button-item:** The `ui5-segmentedbutton-item` `pressed` property is called `selected` now.

Previously the application developers could use the ui5-segmentedbutton-item as follows:
```html
<ui5-segmented-button>
  <ui5-segmented-button-item pressed> Option 1</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 2</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 3</ui5-segmented-button-item>
</ui5-segmented-button>
```

Now the application developers should use the ui5-segmentedbutton-item as follows:
```html
<ui5-segmented-button>
  <ui5-segmented-button-item selected> Option 1</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 2</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 3</ui5-segmented-button-item>
</ui5-segmented-button>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **theming:** Remove SAP Belize theme
* **ui5-segmented-button:** The mode property is changed to `SelectionMode` and the values it take from `SingleSelect` and `MultiSelect` to `Single` and `Multiple`. Also deleted deprecated getter - `selectedItem` and deprecated event detail `selectedItem` and now can be used with the `selectedItems` getter and `selectedItems` event detail.

Previously the application developers could set the selection mode as follows:
```ts
<ui5-segmented-button id="segButtonMulti" mode="MultiSelect">
  <ui5-segmented-button-item>Item</ui5-segmented-button-item>
  <ui5-segmented-button-item>Item</ui5-segmented-button-item>
  <ui5-segmented-button-item>Click</ui5-segmented-button-item>
  <ui5-segmented-button-item>SegmentedButtonItem</ui5-segmented-button-item>
</ui5-segmented-button>
```
Now the application developers could set the selection mode as follows:
```ts
<ui5-segmented-button id="segButtonMulti" selection-mode="Multiple">
  <ui5-segmented-button-item>Item</ui5-segmented-button-item>
  <ui5-segmented-button-item>Item</ui5-segmented-button-item>
  <ui5-segmented-button-item>Click</ui5-segmented-button-item>
  <ui5-segmented-button-item>SegmentedButtonItem</ui5-segmented-button-item>
</ui5-segmented-button>
```
Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-page:** `disableScrolling` has been renamed, `floatingFooter` property has been removed and `fixedFooter` property has been added instead.

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-split-button:** The `activeIcon` property ha been remove, as the interaction is considered obsolete by the UX design team. if you previously used `active-icon`:
```html
<ui5-split-button id="sbTextActiveIcon" active-icon="accept">Active Icon</ui5-split-button>
```
it's wont take effect anymore even if set.
* **ui5-menu:** The busy and busyDelay and properties of the ui5-menu and ui5-menu-item are renamed.
If you have previously used the busy, busyDelay properties:

<ui5-menu header-text="My ui5-menu" busy busy-delay="100"><ui5-menu>
<ui5-menu-item text="Open" icon="open-folder" busy busy-delay="100"><ui5-menu-item>
now you should use loading and loadingDelay properties:

<ui5-menu header-text="My ui5-menu" loading loading-delay="100"><ui5-menu>
<ui5-menu-item text="Open" icon="open-folder" loading loading-delay="100"><ui5-menu-item>
* **ui5-carousel:** "Device#isIE" method has been removed and no longer available

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** Removed the `CSP.js` module and the creation of `<style>` and `<link>` tags, as all browsers now support adoptedStyleSheets. The following APIs are not available any more and should not be used:
```ts
import { setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js"
```
* **ui5-carousel:** Removed the `ICardHeader` interface. If you previously used the interface
```ts
import type { ICardHeader } from "@ui5/webcomponents-base/dist/Card.js"
```
Use the CardHeader type instead:
```ts
import type CardHeader from "@ui5/webcomponents-base/dist/CardHeader.js"
```
* **ui5-carousel:** Removed the `IUploadCollectionItem` interface. If you previously used the interface:
```js
import type { IUploadCollectionItem} from "@ui5/webcomponents-fiori/dist/UploadCollection.js"
```
Use the `UploadCollectionItem` type instead:
```js
import type UploadCollectionItem from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js"
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The `size` property now accepts different values. If you previously used it like:
```html
<ui5-busy-indicator size="Small"></ui5-busy-indicator>
```
Now use the new values instead:
```html
<ui5-busy-indicator size="S"></ui5-busy-indicator>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The `status` property and its shadow part have been renamed. If you previously used them:
```html
<style>
    .cardHeader::part(status) { ... }
</style>
<ui5-card-header status="3 of 10"></ui5-popover>
```
Now use `additionalText` instead:
```html
<style>
       .cardHeader::part(additional-text) { ... }
</style>
<ui5-card-header class="cardHeader" additional-text="3 of 10"></ui5-card-header>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The `pageIndicatorStyle` no longer exists. If you previously used it like:
```html
<ui5-carousel page-indicator-style="Numeric"></ui5-carousel>
```
Now you should use `pageIndicatorType` instead:
```html
<ui5-carousel page-indicator-type="Numeric"></ui5-carousel>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** Removed `UI5Element#render` method in favour of `UI5Element#renderer`. If you previously used "render"
```js
class MyClass extends UI5Element {
    static get render() {
        return litRenderer;
    }
}
```
start using "renderer"
```ts
class MyClass extends UI5Element {
    static get renderer() {
        return litRenderer;
    }
}
```
* **ui5-carousel:** Remove  JavaScript template option from @ui5/create-webcomponents-package
Previously `npm init @ui5/webcomponents-package` used to create JS-based project, however now it will be TypeScript-based project.
If you previously used `npm init @ui5/webcomponents-package --enable-typescript` to create  TypeScript-based project, now it's by default, e.g `npm init @ui5/webcomponents-package` and `--enable-typescript` is removed.
* **ui5-carousel:** The `Left` and `Right` options option have been renamed. If you previously used them to set the placement or the alignment of the popover:
```html
<ui5-popover horizontal-align="Left" placement-type="Left"></ui5-popover>
```
Now use `Start` or `End` instead:
```html
<ui5-popover horizontal-align="Start" placement-type="Start"></ui5-popover>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461

* docs: deploy v2 preview
* **ui5-carousel:** Remove `soccor` icon. Use `soccer` instead.
* **ui5-carousel:** Remove `add-polygone` icon. Use `add-polygon` instead.
* **ui5-carousel:** The JSDoc plugin has been removed, and the generation of api.json has stopped. If you previously relied on the `ui5-package/dist/api.json file`, you can now use `ui5-package/dist/custom-elements.json`
* **ui5-carousel:** All Assets-static.js modules are removed. If you previously imported any Assets-static.js module from any package:
```ts
import "@ui5/webcomponents/dist/Assets-static.js";
import "@ui5/webcomponents-icons/dist/Assets-static.js"
```
use the dynamic equivalent of it:
```ts
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js"
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The event `selected-dates-change ` is renamed to `selection-change`. In addition the event details
`values` and `dates` are renamed to `selectedValues` and `selectedDateValues`. If you previously used the Calendar event as follows:
```ts
myCalendar.addEventListener("selected-dates-change", () => {
    const values = e.detail.values;
    const dates = e.detail.dates;
})
```
Now you have to use the new event name and details:
```ts
myCalendar.addEventListener("selection-change", () => {
   const values = event.detail.selectedValues;
   const dates = event.detail.selectedDateValues;
})
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The property `color`  is renamed to `value`. If you previously used the change event of the ColorPicker as follows:
```html
<ui5-color-picker color="red"></ui5-color-picker>
```
Now you have to use it like this:
```html
<ui5-color-picker value="red"></ui5-color-picker>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** JavaScript projects may not function properly with the tools package.
* **ui5-carousel:** The `openPopover` and `showAt` methods are removed in favor of `open`  and `opener` properties. If you previously used the imperative API:
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.showAt(this);
});
```
Now the declarative API should be used instead:
```html
<ui5-button id="opener">Open</ui5-button>
<ui5-color-palette-popover opener="opener">
```
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.open = !colorPalettePopover.open;
});
```
* **ui5-carousel:** The `ui5-bar` component is now in `main` library. If you previously imported  the `ui5-bar` from `fiori`:
```ts
import "@ui5/webcomponents-fiori/dist/Bar.js;
```
Now, import the `ui5-bar` from `main`:
```ts 
import "@ui5/webcomponents/dist/Bar.js";
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** If you have previously used:
```html
<ui5-tab id="nestedTab" slot="subTabs"></ui5-tab>
```
Now use:
```html
<ui5-tab id="nestedTab" slot="items"></ui5-tab>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** If you have previously used: 
```html
<ui5-tabcontainer tabs-overflow-mode="StartAndEnd"></ui5-tabcontainer>
```
Now use:
```html
<ui5-tabcontainer overflow-mode="StartAndEnd"></ui5-tabcontainer>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** If you previously imported `TabContainerBackgroundDesign`, use `BackgroundDesign` instead.

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The showOverflow property is removed. If previously you have used: 
```html
<ui5-tabcontainer show-overflow></ui5-tabcontainer>
```
now use the overflowButton slot:
```html
<ui5-tabcontainer>
	<ui5-button slot="startOverflowButton" id="startOverflowButton">Start</ui5-button>
	<ui5-button slot="overflowButton" id="endOverflowButton">End</ui5-button>
</ui5-tabcontainer>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The `placementType` property and the `PopoverPlacementType` enum have been renamed.
If you have previously used the `placementType` property and the `PopoverPlacementType` 
```html
<ui5-popover placement-type="Bottom"></ui5-popover>
```
```js
import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacementType.js";
```
Now use `placement` instead:
```html
<ui5-placement="Bottom"></ui5-popover>
```
```js
import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-carousel:** The `size` property of the `ui5--illustrated-message` is renamed to `design`.
If you have previously used the `size` property:
```html
<ui5-illustrated-message size="Dialog">
```
Now use `design` instead:
```html
<ui5-illustrated-message design="Dialog">

```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-carousel:** The `separator-style` property is renamed to  `separators` and the `BreadcrumbsSeparatorStyle` enum is renamed to `BreadcrumbsSeparator`.
If you have previously used the `separator-style` property:
```html
<ui5-breadcrumbs separator-style="Slash">
```
Now use  `separators`  instead:
```html
<ui5-breadcrumbs separators="Slash">
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-carousel:** The `disabled` property of the `ui5-option` is removed.
If you have previously used the `disabled` property:
```html
<ui5-option disabled>Option</ui5-option>
```
it will no longer work for the component.

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887

* refactor(ui5-upload-collection): introduce items-per-page property

The items-per-page-s, items-per-page-m, items-per-page-l properties
are replaced by a single property items-per-page
with value in the following format "S1 M2 L3"

* refactor(ui5-carousel): replace items-per-page-s, items-per-page-m, items-per-page-l properties

Add XL size and refactor

* chore: tests added

* fix: xl test

* refactor(ui5-carousel): replace items-per-page-s, items-per-page-m, items-per-page-l properties

Address code review coments

* refactor(ui5-carousel): replace items-per-page-s, items-per-page-m, items-per-page-l properties

Address code review comments

* refactor(ui5-carousel): replace items-per-page-s, items-per-page-m, items-per-page-l properties

Updates documentation
* **Icons:** UI5 Web Components Icons now export `getPathData` (function) instead of `pathData` (string)

If you used icons like this:

```js
import "@ui5/webcomponents-icons/dist/accept.js";
```

or like this:

```js
import accept from "@ui5/webcomponents-icons/dist/accept.js";
```

**there is no change and no adaptations are required**.

In the rare case you imported `pathData` from icons, for example:

```js
import { pathData, ltr, accData } from "@ui5/webcomponents-icons/dist/accept.js";
console.log(pathData); // String containing the SVG path
```

you must change your code to, for example:

```js
import { getPathData, ltr, accData } from "@ui5/webcomponents-icons/dist/accept.js";
getPathData().then(pathData => {
  console.log(pathData); // String containing the SVG path
});
```
* **ui5-list:** The ui5-li-groupheader component is removed. Groups can now be created with the ui5-li-group. Instead of using ui5-li-groupheader as separator in a flat structure:

<ui5-list>
  <ui5-li-groupheader>Actions</ui5-li-groupheader>
  <ui5-li>Delete Product</ui5-li>
  <ui5-li>Audit Log Settings</ui5-li>
  <ui5-li-groupheader>Products</ui5-li-groupheader>
  <ui5-li>Product 1</ui5-li>
</ui5-list>
The API supports nesting of ui5-li components inside an ui5-li-group with the header-text property:

<ui5-list>
  <ui5-li-group header-text="Actions">
    <ui5-li>Delete Product</ui5-li>
    <ui5-li>Audit Log Settings</ui5-li>
  </ui5-li-group>
</ui5-list>
or with the header slot:

<ui5-list>
  <ui5-li-group>
    <div slot="header" style="width: '100%'; display: flex; justify-content:space-between; align-items:center;">
        <span>Back End Developers</span>
        <ui5-icon name="navigation-right-arrow"></ui5-icon>
    </div>
    <ui5-li>Delete Product</ui5-li>
    <ui5-li>Audit Log Settings</ui5-li>
  </ui5-li-group>
</ui5-list>
In addition, the the List's items slot getter, will now return ui5-li-group instances as well. There is a new readonly getter listItems will return an array flat structure containing listitems and group header items.
* **ui5-badge:** The `design` property has new default value `Neutral`  instead of `Set3`.
If you have previously used ```html <ui5-badge></ui5-badge>``` without attributes, to have the same look and feel now you have to set the design property to “Set3”: ```html <ui5-badge design="Set3"></ui5-badge>```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461





# [2.0.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2024-04-18)


### Bug Fixes

* **u5-dialog:** soft keyboard is correctly opened on iOS devices ([#8583](https://github.com/SAP/ui5-webcomponents/issues/8583)) ([6cf1d74](https://github.com/SAP/ui5-webcomponents/commit/6cf1d746e59352430d0d086cf0814dc7ce7fdb9c))
* **ui5-calendar, ui5-daterange-picker:** align range selection styling with vd specification ([#8585](https://github.com/SAP/ui5-webcomponents/issues/8585)) ([d4f0e0e](https://github.com/SAP/ui5-webcomponents/commit/d4f0e0e93bc9dcd9c4261b2c3eed37cf4f85435f))
* **ui5-menu-item:** apply scoping to internal `Icon` ([#8751](https://github.com/SAP/ui5-webcomponents/issues/8751)) ([ce55755](https://github.com/SAP/ui5-webcomponents/commit/ce55755c05a5588759d751da9749dbde0bbba722))
* **ui5-progress-indicator:** hidden value design ([#8545](https://github.com/SAP/ui5-webcomponents/issues/8545)) ([bf094d3](https://github.com/SAP/ui5-webcomponents/commit/bf094d3df92311d7d051b10aff8167b832e84d26))
* **ui5-responsive-popover:** fix dialog initial focus ([#8774](https://github.com/SAP/ui5-webcomponents/issues/8774)) ([27b522f](https://github.com/SAP/ui5-webcomponents/commit/27b522f145d21be814cc5f02ee74674c8e3db745))
* **ui5-split-button:** add correct opacity when disabled ([#8738](https://github.com/SAP/ui5-webcomponents/issues/8738)) ([399144e](https://github.com/SAP/ui5-webcomponents/commit/399144e8b186dd61d2eb23ed42e5050335e5ecd7)), closes [#8615](https://github.com/SAP/ui5-webcomponents/issues/8615)
* **ui5-tabcontainer:** prevent endless resizing when moving after last overflow item ([#8725](https://github.com/SAP/ui5-webcomponents/issues/8725)) ([c33ba40](https://github.com/SAP/ui5-webcomponents/commit/c33ba404c559109a2dfe2166722f03f2c5c6b691))
* **ui5-tabcontainer:** replace default slot union type with interface ([#8734](https://github.com/SAP/ui5-webcomponents/issues/8734)) ([ac6b44f](https://github.com/SAP/ui5-webcomponents/commit/ac6b44f9eaeb1604f1bbd4ae6f37e6dec817c1ef))


### Code Refactoring

* **ui5-multi-combobox:** rename property allowCustomValues to noValidation ([#8765](https://github.com/SAP/ui5-webcomponents/issues/8765)) ([bb27acb](https://github.com/SAP/ui5-webcomponents/commit/bb27acbc2f8321219d99c7732d8536a00ae38272))
* **ui5-textarea:** rename property growingMaxLines to growingMaxRows ([#8756](https://github.com/SAP/ui5-webcomponents/issues/8756)) ([3fd33ab](https://github.com/SAP/ui5-webcomponents/commit/3fd33aba0164e0a5c06bd44d057157a1dd54b522)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)


### Features

* **ui5-avatar-group:** update focus handling ([#8550](https://github.com/SAP/ui5-webcomponents/issues/8550)) ([0bb5c9d](https://github.com/SAP/ui5-webcomponents/commit/0bb5c9d8632092d875fa6333d817475aa73f1e71)), closes [#8320](https://github.com/SAP/ui5-webcomponents/issues/8320)
* **ui5-date-*:** adapt date and time controls to timezone feature ([#8610](https://github.com/SAP/ui5-webcomponents/issues/8610)) ([1acae01](https://github.com/SAP/ui5-webcomponents/commit/1acae010eb81f4d50368587b66c8840bdf886d04)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)
* **ui5-li:** add support for F2 key ([#8619](https://github.com/SAP/ui5-webcomponents/issues/8619)) ([24c3807](https://github.com/SAP/ui5-webcomponents/commit/24c380758f88b3f66dce46e2f57297634b42a85a)), closes [#7736](https://github.com/SAP/ui5-webcomponents/issues/7736)
* **ui5-link:** introduce `tooltip` property ([#8670](https://github.com/SAP/ui5-webcomponents/issues/8670)) ([ef64000](https://github.com/SAP/ui5-webcomponents/commit/ef640006e466a9a3e01bb9d241c3a3fc2962d8d0))
* **ui5-message-strip:** introduce custom colors ([#8757](https://github.com/SAP/ui5-webcomponents/issues/8757)) ([d30f424](https://github.com/SAP/ui5-webcomponents/commit/d30f4240df5922888854d027dfcff732b5316ccc))


### BREAKING CHANGES

* **ui5-multi-combobox:** The `allowCustomValues` property have been renamed to `noValidation`.
If you have previously used the `allowCustomValues` property
`<ui5-multi-combobox allow-custom-values></ui5-multi-combobox>`
Now use noValidation instead:
`<ui5-multi-combobox no-validation></ui5-multi-combobox>`

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* **ui5-textarea:** The `growingMaxLines` property have been renamed to `growingMaxRows`.





# [2.0.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2024-04-11)


### Bug Fixes

* **Popup:** prevent a rare runtime error ([#8707](https://github.com/SAP/ui5-webcomponents/issues/8707)) ([02eb1c7](https://github.com/SAP/ui5-webcomponents/commit/02eb1c766e46f1e9fe4697612492103e50bf2d45))
* **ui5-menu:** adjust active menu item text color ([#8699](https://github.com/SAP/ui5-webcomponents/issues/8699)) ([1a7331d](https://github.com/SAP/ui5-webcomponents/commit/1a7331dbc1ad44138ae966c310043bdce3e29cc3)), closes [#8681](https://github.com/SAP/ui5-webcomponents/issues/8681)
* **ui5-popup:** fix scrolling and visualization on iphone ([#8716](https://github.com/SAP/ui5-webcomponents/issues/8716)) ([d9ef14b](https://github.com/SAP/ui5-webcomponents/commit/d9ef14b3d44defd7f8886f4f8e6df285eda575a9))
* **ui5-step-input:** align the input vertically ([#8696](https://github.com/SAP/ui5-webcomponents/issues/8696)) ([70322fc](https://github.com/SAP/ui5-webcomponents/commit/70322fc58c0855e3d17dd63f0e120762d9fa5cc3)), closes [#8667](https://github.com/SAP/ui5-webcomponents/issues/8667)
* **ui5-tabcontainer:** don't allow parent item to be moved among its children ([#8665](https://github.com/SAP/ui5-webcomponents/issues/8665)) ([e265375](https://github.com/SAP/ui5-webcomponents/commit/e265375cf6f6531779ac73a7a9014ef7fbea4184))
* **ui5-tree-item-custom:** improved key handling ([#8637](https://github.com/SAP/ui5-webcomponents/issues/8637)) ([eeb76fe](https://github.com/SAP/ui5-webcomponents/commit/eeb76fe39505cc44c38618c29ac47889a725e8d3)), closes [#7566](https://github.com/SAP/ui5-webcomponents/issues/7566)


### Features

* add shadowRootOptions for [@custom](https://github.com/custom)Element decorator ([#8703](https://github.com/SAP/ui5-webcomponents/issues/8703)) ([7168dc2](https://github.com/SAP/ui5-webcomponents/commit/7168dc297f411d9b5d64127a47e2361f17442439))
* **ui5-button:** provide focus support for mobile ([#8414](https://github.com/SAP/ui5-webcomponents/issues/8414)) ([4d9e32f](https://github.com/SAP/ui5-webcomponents/commit/4d9e32fff1a594f774f9f36d549619c0389c1e07)), closes [#8178](https://github.com/SAP/ui5-webcomponents/issues/8178) [#8322](https://github.com/SAP/ui5-webcomponents/issues/8322)
* **ui5-text:** introduce Text web component ([#8299](https://github.com/SAP/ui5-webcomponents/issues/8299)) ([91acaf5](https://github.com/SAP/ui5-webcomponents/commit/91acaf5edadc63b19172a6f3a882023c31779878)), closes [#6788](https://github.com/SAP/ui5-webcomponents/issues/6788)
* **ui5-tree:** enable drag and drop ([#8477](https://github.com/SAP/ui5-webcomponents/issues/8477)) ([4514f57](https://github.com/SAP/ui5-webcomponents/commit/4514f57b513d74b108800576c5a893083e8f594d)), closes [#7562](https://github.com/SAP/ui5-webcomponents/issues/7562)





# [2.0.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0...v2.0.0-rc.0) (2024-04-09)


### Bug Fixes

* **ui5-multi-input:** fix failing popover test ([#8662](https://github.com/SAP/ui5-webcomponents/issues/8662)) ([3234747](https://github.com/SAP/ui5-webcomponents/commit/3234747ed30ebdae63994b37de12dba5f2917dab))
* **ui5-multi-input:** prevent double value state message on nMore open ([#8638](https://github.com/SAP/ui5-webcomponents/issues/8638)) ([ed7b3ba](https://github.com/SAP/ui5-webcomponents/commit/ed7b3ba8e7ae100a4cbff81a5d2f95e74527674b)), closes [#8586](https://github.com/SAP/ui5-webcomponents/issues/8586)
* **ui5-multi-input:** prevent double value state message on nMore open ([#8666](https://github.com/SAP/ui5-webcomponents/issues/8666)) ([fdbf442](https://github.com/SAP/ui5-webcomponents/commit/fdbf44212ebc2b70624cf83498c11aa2f4fa3e18)), closes [#8638](https://github.com/SAP/ui5-webcomponents/issues/8638) [#8586](https://github.com/SAP/ui5-webcomponents/issues/8586)


### chore

* bring release-2.0 to main ([#8651](https://github.com/SAP/ui5-webcomponents/issues/8651)) ([69271c9](https://github.com/SAP/ui5-webcomponents/commit/69271c9468c7dd54f90710fc4613ae0a79f85cef)), closes [#8494](https://github.com/SAP/ui5-webcomponents/issues/8494) [#8496](https://github.com/SAP/ui5-webcomponents/issues/8496) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8497](https://github.com/SAP/ui5-webcomponents/issues/8497) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8504](https://github.com/SAP/ui5-webcomponents/issues/8504) [#8509](https://github.com/SAP/ui5-webcomponents/issues/8509) [#8507](https://github.com/SAP/ui5-webcomponents/issues/8507) [#8511](https://github.com/SAP/ui5-webcomponents/issues/8511) [#8501](https://github.com/SAP/ui5-webcomponents/issues/8501) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8503](https://github.com/SAP/ui5-webcomponents/issues/8503) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8506](https://github.com/SAP/ui5-webcomponents/issues/8506) [#8502](https://github.com/SAP/ui5-webcomponents/issues/8502) [#8524](https://github.com/SAP/ui5-webcomponents/issues/8524) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8525](https://github.com/SAP/ui5-webcomponents/issues/8525) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8518](https://github.com/SAP/ui5-webcomponents/issues/8518) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8526](https://github.com/SAP/ui5-webcomponents/issues/8526) [#8529](https://github.com/SAP/ui5-webcomponents/issues/8529) [#8528](https://github.com/SAP/ui5-webcomponents/issues/8528) [#8531](https://github.com/SAP/ui5-webcomponents/issues/8531) [#8532](https://github.com/SAP/ui5-webcomponents/issues/8532) [#8534](https://github.com/SAP/ui5-webcomponents/issues/8534) [#8163](https://github.com/SAP/ui5-webcomponents/issues/8163) [#8527](https://github.com/SAP/ui5-webcomponents/issues/8527) [#8538](https://github.com/SAP/ui5-webcomponents/issues/8538) [#8521](https://github.com/SAP/ui5-webcomponents/issues/8521) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8542](https://github.com/SAP/ui5-webcomponents/issues/8542) [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#8548](https://github.com/SAP/ui5-webcomponents/issues/8548) [#8555](https://github.com/SAP/ui5-webcomponents/issues/8555) [#8559](https://github.com/SAP/ui5-webcomponents/issues/8559) [#8565](https://github.com/SAP/ui5-webcomponents/issues/8565) [#8570](https://github.com/SAP/ui5-webcomponents/issues/8570) [#8558](https://github.com/SAP/ui5-webcomponents/issues/8558) [#8568](https://github.com/SAP/ui5-webcomponents/issues/8568) [#8596](https://github.com/SAP/ui5-webcomponents/issues/8596) [#8192](https://github.com/SAP/ui5-webcomponents/issues/8192) [#8606](https://github.com/SAP/ui5-webcomponents/issues/8606) [#8605](https://github.com/SAP/ui5-webcomponents/issues/8605) [#8600](https://github.com/SAP/ui5-webcomponents/issues/8600) [#8602](https://github.com/SAP/ui5-webcomponents/issues/8602) [#8593](https://github.com/SAP/ui5-webcomponents/issues/8593)


### Code Refactoring

* **ui5-list, ui5-tree, ui5-upload-collection:** rename mode to selectionMode ([#8657](https://github.com/SAP/ui5-webcomponents/issues/8657)) ([d53b3b2](https://github.com/SAP/ui5-webcomponents/commit/d53b3b2e231b6bf3aa5b317634d3f304240f9d76))
* **ui5-list:** renamed busy, busyDelay to loading, loadingDelay ([#8686](https://github.com/SAP/ui5-webcomponents/issues/8686)) ([38e4df4](https://github.com/SAP/ui5-webcomponents/commit/38e4df4d1dc37a483bbd06f03df8306fb88c3fe3)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461) [#7887](https://github.com/SAP/ui5-webcomponents/issues/7887)
* **ui5-progress-indicator:** remove disabled property ([#8683](https://github.com/SAP/ui5-webcomponents/issues/8683)) ([5e5c40a](https://github.com/SAP/ui5-webcomponents/commit/5e5c40a51628a23d9ffa5cd7a850a9977710ec38))
* **ui5-tab, ui5-tab-separator:** rename getTabInStripDomRef to getDomRefInStrip ([#8653](https://github.com/SAP/ui5-webcomponents/issues/8653)) ([773237f](https://github.com/SAP/ui5-webcomponents/commit/773237f46e36f17094302e2f6bbcff22334ffc4a))
* **ui5-tabcontainer:** remove fixed property ([#8676](https://github.com/SAP/ui5-webcomponents/issues/8676)) ([98052e1](https://github.com/SAP/ui5-webcomponents/commit/98052e1857845314cc41e1cfff80436bd1096436)), closes [#8461](https://github.com/SAP/ui5-webcomponents/issues/8461)


### Features

* **focus:** new focus handling ([#8590](https://github.com/SAP/ui5-webcomponents/issues/8590)) ([b6a33e0](https://github.com/SAP/ui5-webcomponents/commit/b6a33e04210de2d0eb972755dbce804d479e14a9))
* **ui5-checkbox:** update focus handling ([#8553](https://github.com/SAP/ui5-webcomponents/issues/8553)) ([ce28296](https://github.com/SAP/ui5-webcomponents/commit/ce2829619eceb1dca26ca17b2b6d0ab253caf076)), closes [#8320](https://github.com/SAP/ui5-webcomponents/issues/8320)


### BREAKING CHANGES

* **ui5-list:** The `busy` property of the `ui5-list` is renamed.
If you have previously used the `busy`, `busyDelay` properties:
```html
<ui5-list busy busy-delay="500"></ui5-list>
```
now you must use  `loading` and `loadingDelay` properties:
```html
<ui5-list loading loading-delay="500"></ui5-list>
```
* **ui5-progress-indicator:** The `disabled` property of the `ui5-progress-indicator` is removed.
If you have previously used the `disabled` property, it won't take effect:
```html
<ui5-progress-indicator disabled value="60"></ui5-progress-indicator>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-tabcontainer:** Property "fixed" is removed and there is no alternative provided. The TabContainer is no longer expandable/collapsible via use interaction. You can still show the TabContainer collapsed via the "collapsed" property.
* **ui5-list, ui5-tree, ui5-upload-collection:** The `mode` property and the `ListMode` enum have been renamed.
If you have previously used the `mode` property and the `ListMode` values:
```html
<ui5-list class="list" mode="SingleSelect">
<ui5-list class="list" mode="MultiSelect">
<ui5-upload-collection mode="SingleSelectBegin">
<ui5-upload-collection mode="SingleSelectEnd">
<ui5-tree mode="SingleSelectAuto" >
<ui5-tree mode="None" >
```
Now use `selectionMode`  and `Single`, `Multiple` instead:
```html
<ui5-list class="list" selection-mode="Single">
<ui5-list class="list" selection-mode="Multiple">
<ui5-upload-collection selection-mode="SingleStart">
<ui5-upload-collection selection-mode="SingleEnd">
<ui5-tree selection-mode="SingleAuto">
<ui5-tree selection-mode="None">

```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* **ui5-tab, ui5-tab-separator:** If previously you have used:
```js
someTab.getTabInsStripDomRef();
someTabSeparator.getTabInsStripDomRef();
```
Now use:
```js
someTab.getDomRefInStrip();
someTabSeparator.getDomRefInStrip();
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* "Device#isIE" method has been removed and no longer available

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* Removed the `CSP.js` module and the creation of `<style>` and `<link>` tags, as all browsers now support adoptedStyleSheets. The following APIs are not available any more and should not be used:
```ts
import { setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js"
```
* Removed the `ICardHeader` interface. If you previously used the interface
```ts
import type { ICardHeader } from "@ui5/webcomponents-base/dist/Card.js"
```
Use the CardHeader type instead:
```ts
import type CardHeader from "@ui5/webcomponents-base/dist/CardHeader.js"
```
* Removed the `IUploadCollectionItem` interface. If you previously used the interface:
```js
import type { IUploadCollectionItem} from "@ui5/webcomponents-fiori/dist/UploadCollection.js"
```
Use the `UploadCollectionItem` type instead:
```js
import type UploadCollectionItem from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js"
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `size` property now accepts different values. If you previously used it like:
```html
<ui5-busy-indicator size="Small"></ui5-busy-indicator>
```
Now use the new values instead:
```html
<ui5-busy-indicator size="S"></ui5-busy-indicator>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `status` property and its shadow part have been renamed. If you previously used them:
```html
<style>
    .cardHeader::part(status) { ... }
</style>
<ui5-card-header status="3 of 10"></ui5-popover>
```
Now use `additionalText` instead:
```html
<style>
       .cardHeader::part(additional-text) { ... }
</style>
<ui5-card-header class="cardHeader" additional-text="3 of 10"></ui5-card-header>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `pageIndicatorStyle` no longer exists. If you previously used it like:
```html
<ui5-carousel page-indicator-style="Numeric"></ui5-carousel>
```
Now you should use `pageIndicatorType` instead:
```html
<ui5-carousel page-indicator-type="Numeric"></ui5-carousel>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* Removed `UI5Element#render` method in favour of `UI5Element#renderer`. If you previously used "render"
```js
class MyClass extends UI5Element {
    static get render() {
        return litRenderer;
    }
}
```
start using "renderer"
```ts
class MyClass extends UI5Element {
    static get renderer() {
        return litRenderer;
    }
}
```
* Remove  JavaScript template option from @ui5/create-webcomponents-package
Previously `npm init @ui5/webcomponents-package` used to create JS-based project, however now it will be TypeScript-based project.
If you previously used `npm init @ui5/webcomponents-package --enable-typescript` to create  TypeScript-based project, now it's by default, e.g `npm init @ui5/webcomponents-package` and `--enable-typescript` is removed.
* The `Left` and `Right` options option have been renamed. If you previously used them to set the placement or the alignment of the popover:
```html
<ui5-popover horizontal-align="Left" placement-type="Left"></ui5-popover>
```
Now use `Start` or `End` instead:
```html
<ui5-popover horizontal-align="Start" placement-type="Start"></ui5-popover>
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461

* docs: deploy v2 preview
* Remove `soccor` icon. Use `soccer` instead.
* Remove `add-polygone` icon. Use `add-polygon` instead.
* The JSDoc plugin has been removed, and the generation of api.json has stopped. If you previously relied on the `ui5-package/dist/api.json file`, you can now use `ui5-package/dist/custom-elements.json`
* All Assets-static.js modules are removed. If you previously imported any Assets-static.js module from any package:
```ts
import "@ui5/webcomponents/dist/Assets-static.js";
import "@ui5/webcomponents-icons/dist/Assets-static.js"
```
use the dynamic equivalent of it:
```ts
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js"
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* The event `selected-dates-change ` is renamed to `selection-change`. In addition the event details
`values` and `dates` are renamed to `selectedValues` and `selectedDateValues`. If you previously used the Calendar event as follows:
```ts
myCalendar.addEventListener("selected-dates-change", () => {
    const values = e.detail.values;
    const dates = e.detail.dates;
})
```
Now you have to use the new event name and details:
```ts
myCalendar.addEventListener("selection-change", () => {
   const values = event.detail.selectedValues;
   const dates = event.detail.selectedDateValues;
})
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* The property `color`  is renamed to `value`. If you previously used the change event of the ColorPicker as follows:
```html
<ui5-color-picker color="red"></ui5-color-picker>
```
Now you have to use it like this:
```html
<ui5-color-picker value="red"></ui5-color-picker>
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* JavaScript projects may not function properly with the tools package.
* The `openPopover` and `showAt` methods are removed in favor of `open`  and `opener` properties. If you previously used the imperative API:
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.showAt(this);
});
```
Now the declarative API should be used instead:
```html
<ui5-button id="opener">Open</ui5-button>
<ui5-color-palette-popover opener="opener">
```
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.open = !colorPalettePopover.open;
});
```
* The `ui5-bar` component is now in `main` library. If you previously imported  the `ui5-bar` from `fiori`:
```ts
import "@ui5/webcomponents-fiori/dist/Bar.js;
```
Now, import the `ui5-bar` from `main`:
```ts 
import "@ui5/webcomponents/dist/Bar.js";
```

Related to: https://github.com/SAP/ui5-webcomponents/issues/8461
* If you have previously used:
```html
<ui5-tab id="nestedTab" slot="subTabs"></ui5-tab>
```
Now use:
```html
<ui5-tab id="nestedTab" slot="items"></ui5-tab>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* If you have previously used: 
```html
<ui5-tabcontainer tabs-overflow-mode="StartAndEnd"></ui5-tabcontainer>
```
Now use:
```html
<ui5-tabcontainer overflow-mode="StartAndEnd"></ui5-tabcontainer>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* If you previously imported `TabContainerBackgroundDesign`, use `BackgroundDesign` instead.

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* The showOverflow property is removed. If previously you have used: 
```html
<ui5-tabcontainer show-overflow></ui5-tabcontainer>
```
now use the overflowButton slot:
```html
<ui5-tabcontainer>
	<ui5-button slot="startOverflowButton" id="startOverflowButton">Start</ui5-button>
	<ui5-button slot="overflowButton" id="endOverflowButton">End</ui5-button>
</ui5-tabcontainer>
```

Relates to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `placementType` property and the `PopoverPlacementType` enum have been renamed.
If you have previously used the `placementType` property and the `PopoverPlacementType` 
```html
<ui5-popover placement-type="Bottom"></ui5-popover>
```
```js
import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacementType.js";
```
Now use `placement` instead:
```html
<ui5-placement="Bottom"></ui5-popover>
```
```js
import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461
* The `size` property of the `ui5--illustrated-message` is renamed to `design`.
If you have previously used the `size` property:
```html
<ui5-illustrated-message size="Dialog">
```
Now use `design` instead:
```html
<ui5-illustrated-message design="Dialog">

```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* The `separator-style` property is renamed to  `separators` and the `BreadcrumbsSeparatorStyle` enum is renamed to `BreadcrumbsSeparator`.
If you have previously used the `separator-style` property:
```html
<ui5-breadcrumbs separator-style="Slash">
```
Now use  `separators`  instead:
```html
<ui5-breadcrumbs separators="Slash">
```

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* The `disabled` property of the `ui5-option` is removed.
If you have previously used the `disabled` property:
```html
<ui5-option disabled>Option</ui5-option>
```
it will no longer work for the component.

Related to https://github.com/SAP/ui5-webcomponents/issues/8461, https://github.com/SAP/ui5-webcomponents/issues/7887
* You can no longer import and implement the `ITab` interface. TabContainer is designed to work only with Tab and TabSeparator classes, so the interface was obsolete.





# [1.24.0](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.4...v1.24.0) (2024-04-04)


### Features

* **ui5-carousel:** add accessibleName and accessibleNameRef ([#8631](https://github.com/SAP/ui5-webcomponents/issues/8631)) ([0d0d765](https://github.com/SAP/ui5-webcomponents/commit/0d0d765b3025c71cc13cd1dcc6f066d079f74396))





# [1.24.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.3...v1.24.0-rc.4) (2024-04-04)


### Bug Fixes

* **ui5-avatar:** correct badge style ([#8564](https://github.com/SAP/ui5-webcomponents/issues/8564)) ([e3a373d](https://github.com/SAP/ui5-webcomponents/commit/e3a373d38ae1c4e724f789a60bd004327f995593)), closes [#7564](https://github.com/SAP/ui5-webcomponents/issues/7564) [#8491](https://github.com/SAP/ui5-webcomponents/issues/8491)
* **ui5-day-picker:** improve  day name length check ([#8578](https://github.com/SAP/ui5-webcomponents/issues/8578)) ([38012fe](https://github.com/SAP/ui5-webcomponents/commit/38012fe1f34f1535bb547c2ea14e1262f354b8c3))
* **ui5-input, ui5-combobox:** improve samples with value state message ([#8595](https://github.com/SAP/ui5-webcomponents/issues/8595)) ([63de7ee](https://github.com/SAP/ui5-webcomponents/commit/63de7eebd07e4061e1d4fb93f8e3c1cb0aaa789b)), closes [#8581](https://github.com/SAP/ui5-webcomponents/issues/8581) [#8581](https://github.com/SAP/ui5-webcomponents/issues/8581) [#8581](https://github.com/SAP/ui5-webcomponents/issues/8581)
* **ui5-input:** prevent scroll on value state focus ([#8603](https://github.com/SAP/ui5-webcomponents/issues/8603)) ([964afb6](https://github.com/SAP/ui5-webcomponents/commit/964afb64330aeb000ddd77a7519083feefcb57f5)), closes [#8582](https://github.com/SAP/ui5-webcomponents/issues/8582)
* **ui5-multi-input:** create token from pasted text on change ([#8592](https://github.com/SAP/ui5-webcomponents/issues/8592)) ([2072b2e](https://github.com/SAP/ui5-webcomponents/commit/2072b2ee35357f5623570fa9b9725a83aa6e9d97))


### Features

* **ui5-progress-indicator:** introduce "bar" CSS part ([#8599](https://github.com/SAP/ui5-webcomponents/issues/8599)) ([831fad3](https://github.com/SAP/ui5-webcomponents/commit/831fad3c537c457b7bb08552561d6245fe193f8d)), closes [#6140](https://github.com/SAP/ui5-webcomponents/issues/6140)





# [1.24.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.2...v1.24.0-rc.3) (2024-03-28)


### Bug Fixes

* **ui5-avatar:** revise active state styles ([#8474](https://github.com/SAP/ui5-webcomponents/issues/8474)) ([3f9430c](https://github.com/SAP/ui5-webcomponents/commit/3f9430c64cfd349319b5f17ebc753ce0639a4ab8)), closes [#8309](https://github.com/SAP/ui5-webcomponents/issues/8309)
* **ui5-button:** fix focus in belize ([#8498](https://github.com/SAP/ui5-webcomponents/issues/8498)) ([483d942](https://github.com/SAP/ui5-webcomponents/commit/483d942c3ba6227bd56dead070fba2313c2d97c2))
* **ui5-carousel:** Fixed paging indicator numbers in right-to-left (RTL) mode ([#8543](https://github.com/SAP/ui5-webcomponents/issues/8543)) ([c032c0c](https://github.com/SAP/ui5-webcomponents/commit/c032c0cadbe4f9fc2e3b642d0155830ffb52325a))
* **ui5-file-uploader:** adjust mouse cursor style ([#8485](https://github.com/SAP/ui5-webcomponents/issues/8485)) ([37a2e0d](https://github.com/SAP/ui5-webcomponents/commit/37a2e0df5643b643915284d5b36084803104bd6e)), closes [#7794](https://github.com/SAP/ui5-webcomponents/issues/7794)
* **ui5-tabcontainer:** fix tab selection ([#8547](https://github.com/SAP/ui5-webcomponents/issues/8547)) ([5eaa835](https://github.com/SAP/ui5-webcomponents/commit/5eaa83574e98a251043b38efc34fc4477f79777c))





# [1.24.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.1...v1.24.0-rc.2) (2024-03-21)


### Bug Fixes

* **ui5-tab:** focus() now works if dom ref in strip is not rendered yet  ([#8425](https://github.com/SAP/ui5-webcomponents/issues/8425)) ([d827e0e](https://github.com/SAP/ui5-webcomponents/commit/d827e0e2b1bad6f569e65cdb644e7b87d7d71f8f))


### Features

* **ui5-avatar:** update focus handling ([#8420](https://github.com/SAP/ui5-webcomponents/issues/8420)) ([c66ddd5](https://github.com/SAP/ui5-webcomponents/commit/c66ddd506c4836be5ee7e5550b1d5928fb354b12))
* **ui5-busy-indicator:** added property text-placement ([#8471](https://github.com/SAP/ui5-webcomponents/issues/8471)) ([a494473](https://github.com/SAP/ui5-webcomponents/commit/a49447373cddcb91233fcb3ddd7c89b02d435044))
* **ui5-tabcontainer, ui5-list:** automatically focus dropped element ([#8455](https://github.com/SAP/ui5-webcomponents/issues/8455)) ([93b074d](https://github.com/SAP/ui5-webcomponents/commit/93b074da62f11b51e6288271e574b721e8061d55))





# [1.24.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.24.0-rc.0...v1.24.0-rc.1) (2024-03-15)


### Bug Fixes

* **ui5-multi-combobox:** pasting content should not be prevented ([#8413](https://github.com/SAP/ui5-webcomponents/issues/8413)) ([db0b63c](https://github.com/SAP/ui5-webcomponents/commit/db0b63c8e745db23fb44816fcbfe999257071353)), closes [#8275](https://github.com/SAP/ui5-webcomponents/issues/8275)


### Features

* **ui5-li:** highlight property added ([#8421](https://github.com/SAP/ui5-webcomponents/issues/8421)) ([1a3fa61](https://github.com/SAP/ui5-webcomponents/commit/1a3fa617199e5599b5beeebc503121ca3112f0a0)), closes [#8317](https://github.com/SAP/ui5-webcomponents/issues/8317)
* **ui5-side-navigation:** add navigation groups ([#8261](https://github.com/SAP/ui5-webcomponents/issues/8261)) ([8678dc0](https://github.com/SAP/ui5-webcomponents/commit/8678dc0ec8f017a41ac5bdcd7720bc055d28891c))
* **ui5-tabcontainer, ui5-list:** add events for reordering items by mouse ([#8265](https://github.com/SAP/ui5-webcomponents/issues/8265)) ([c4383ea](https://github.com/SAP/ui5-webcomponents/commit/c4383eaaa3b5588658f13a9c468d778e9c6abf57))





# [1.24.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.23.1...v1.24.0-rc.0) (2024-03-14)


### Bug Fixes

* **ui5-avatar:** fix default size appearance and font-family ([#8415](https://github.com/SAP/ui5-webcomponents/issues/8415)) ([22826f0](https://github.com/SAP/ui5-webcomponents/commit/22826f05c11f8be6b4ce037d6488e78fec634f99))
* **ui5-button:** remove bold font of emphasized button in safari and chrome ([#8422](https://github.com/SAP/ui5-webcomponents/issues/8422)) ([19ca981](https://github.com/SAP/ui5-webcomponents/commit/19ca981b9a18f938416083659043f49d7b57aeda))
* **ui5-date/time-picker, ui5-step-input:** prevent text selection ([#8397](https://github.com/SAP/ui5-webcomponents/issues/8397)) ([220eac4](https://github.com/SAP/ui5-webcomponents/commit/220eac4000ef995703f4fe32ac1b7faadc7539f7))
* **ui5-message-strip:** remove aria-live ([#8398](https://github.com/SAP/ui5-webcomponents/issues/8398)) ([9dc902e](https://github.com/SAP/ui5-webcomponents/commit/9dc902ecfc24c8e23feb87370e74851c277e657d)), closes [#8394](https://github.com/SAP/ui5-webcomponents/issues/8394)
* **ui5-multi-combobox:** rename togglePopover method ([#8418](https://github.com/SAP/ui5-webcomponents/issues/8418)) ([d1d6f7e](https://github.com/SAP/ui5-webcomponents/commit/d1d6f7ee71534251fc7d9f98b10adc8c736b607a))
* **ui5-panel:** prevent border cut on horizon themes ([#8400](https://github.com/SAP/ui5-webcomponents/issues/8400)) ([fc2421f](https://github.com/SAP/ui5-webcomponents/commit/fc2421feb2de3c8301293f6e303738b8c0e20269)), closes [#8369](https://github.com/SAP/ui5-webcomponents/issues/8369)


### Features

* **ui5-checkbox:** csspart icon added ([#8423](https://github.com/SAP/ui5-webcomponents/issues/8423)) ([ab97c02](https://github.com/SAP/ui5-webcomponents/commit/ab97c02cdcfe2d9f9b823eb007d67bd22fe8faf5)), closes [#8326](https://github.com/SAP/ui5-webcomponents/issues/8326)
* **ui5-list:** growintButtonText property added ([#8349](https://github.com/SAP/ui5-webcomponents/issues/8349)) ([3ad5a90](https://github.com/SAP/ui5-webcomponents/commit/3ad5a908d5cb64143102ceda03ea60e2238b791b)), closes [#7028](https://github.com/SAP/ui5-webcomponents/issues/7028)





## [1.23.1](https://github.com/SAP/ui5-webcomponents/compare/v1.23.1-rc.0...v1.23.1) (2024-03-08)


### Bug Fixes

* **ui5-icon:** default icon color aligned with specification ([#8376](https://github.com/SAP/ui5-webcomponents/issues/8376)) ([7915a8c](https://github.com/SAP/ui5-webcomponents/commit/7915a8cf7416da70244bf5e8e959a5cee8e25624)), closes [#8375](https://github.com/SAP/ui5-webcomponents/issues/8375)
* **ui5-progress-indicator:** visual fix ([#8333](https://github.com/SAP/ui5-webcomponents/issues/8333)) ([012fc4d](https://github.com/SAP/ui5-webcomponents/commit/012fc4d070daab7c6851bbf3abb5bc0d718c7465)), closes [#8306](https://github.com/SAP/ui5-webcomponents/issues/8306)





## [1.23.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0...v1.23.1-rc.0) (2024-03-07)

**Note:** Version bump only for package @ui5/webcomponents





# [1.23.0](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.5...v1.23.0) (2024-03-06)


### Bug Fixes

* **ui5-breadcrumbs:** fixed not working separators ([#8383](https://github.com/SAP/ui5-webcomponents/issues/8383)) ([ca733c1](https://github.com/SAP/ui5-webcomponents/commit/ca733c1c7034b03edcc51bbaf3153385e1b70d22))
* **ui5-combobox:** show all items upon arrow click ([#8373](https://github.com/SAP/ui5-webcomponents/issues/8373)) ([c9dab87](https://github.com/SAP/ui5-webcomponents/commit/c9dab87ebfad72a784c7115dd8ef983e35c022b1)), closes [#8267](https://github.com/SAP/ui5-webcomponents/issues/8267)
* **ui5-date-picker:** open correct picker ([#8371](https://github.com/SAP/ui5-webcomponents/issues/8371)) ([78b98a5](https://github.com/SAP/ui5-webcomponents/commit/78b98a546cdff7569ff716f63b4daf434678837a)), closes [#8218](https://github.com/SAP/ui5-webcomponents/issues/8218)
* **ui5-side-navigation:** fix private types ([#8158](https://github.com/SAP/ui5-webcomponents/issues/8158)) ([a03921c](https://github.com/SAP/ui5-webcomponents/commit/a03921cc4ad90418d3ca9dd2241a3cafe24e4fff))
* **ui5-switch:** align icon on iOS devices ([#8356](https://github.com/SAP/ui5-webcomponents/issues/8356)) ([f373305](https://github.com/SAP/ui5-webcomponents/commit/f373305cbb5ace38afd002c34e134d5a40b02efe))
* **ui5-table:** highlight popined selected rows ([#8372](https://github.com/SAP/ui5-webcomponents/issues/8372)) ([5c6af14](https://github.com/SAP/ui5-webcomponents/commit/5c6af14feff211b9bb9c66056e45f51cbc13da06))


### Features

* **ui5-textarea:** select and scroll events ([#8340](https://github.com/SAP/ui5-webcomponents/issues/8340)) ([5565a53](https://github.com/SAP/ui5-webcomponents/commit/5565a53460b5acbc379e09322b91d8b06b538b85))





# [1.23.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.4...v1.23.0-rc.5) (2024-02-29)


### Bug Fixes

* **ui5-avatar:** resolve initial flickering during fallback to icon ([#8351](https://github.com/SAP/ui5-webcomponents/issues/8351)) ([845b6f7](https://github.com/SAP/ui5-webcomponents/commit/845b6f75e93c25d475ba5a43aaae5c109f9b27f2))
* **ui5-button:** correct focus outline colors in active/focus state ([#8325](https://github.com/SAP/ui5-webcomponents/issues/8325)) ([32385a7](https://github.com/SAP/ui5-webcomponents/commit/32385a7eada38aa248d1339ea52313491f1e5206))
* **ui5-menu:** improve focus handling ([#8348](https://github.com/SAP/ui5-webcomponents/issues/8348)) ([bd33dc5](https://github.com/SAP/ui5-webcomponents/commit/bd33dc527ed2d96224f5dbef03d87506defa227f))
* **ui5-time-picker:** remove redundant aria attributes ([#8350](https://github.com/SAP/ui5-webcomponents/issues/8350)) ([0d0a592](https://github.com/SAP/ui5-webcomponents/commit/0d0a5920617fd1532ef1260b24c80bf7fbc103e0)), closes [#6931](https://github.com/SAP/ui5-webcomponents/issues/6931)


### Features

* **ui5-button:** add accessible-role api ([#8366](https://github.com/SAP/ui5-webcomponents/issues/8366)) ([18a5370](https://github.com/SAP/ui5-webcomponents/commit/18a5370eee92a2874398fee5d4852f4072d08283)), closes [#7612](https://github.com/SAP/ui5-webcomponents/issues/7612)





# [1.23.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.3...v1.23.0-rc.4) (2024-02-26)


### Bug Fixes

* **ui5-popup:** move popup registry to shared resource ([#8338](https://github.com/SAP/ui5-webcomponents/issues/8338)) ([8c53a18](https://github.com/SAP/ui5-webcomponents/commit/8c53a180fd1945847cbc59439a5ed31e3b7f12e4))
* **ui5-tab-container:** correct inline mode visualization ([#8335](https://github.com/SAP/ui5-webcomponents/issues/8335)) ([60b5b2c](https://github.com/SAP/ui5-webcomponents/commit/60b5b2cd08ce4e72508d25e69a50e4184c865d9e)), closes [#8274](https://github.com/SAP/ui5-webcomponents/issues/8274)


### Features

* **ui5-radio-button:** expose new Css shadow parts ([#8347](https://github.com/SAP/ui5-webcomponents/issues/8347)) ([eca19da](https://github.com/SAP/ui5-webcomponents/commit/eca19dac3d22d4a6667dde1019e6ff5bf1c13410)), closes [#8105](https://github.com/SAP/ui5-webcomponents/issues/8105)





# [1.23.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.2...v1.23.0-rc.3) (2024-02-22)


### Features

* **ui5-color-palette:** implement mobile view ([#8315](https://github.com/SAP/ui5-webcomponents/issues/8315)) ([eea8317](https://github.com/SAP/ui5-webcomponents/commit/eea8317b0b8342f0ecb23ecb2a880cf3071c2c92))
* **ui5-menu:** enable navigation over disabled items ([#8312](https://github.com/SAP/ui5-webcomponents/issues/8312)) ([fe9d1dc](https://github.com/SAP/ui5-webcomponents/commit/fe9d1dce999a9ab0c0c4413882bba246cc283126)), closes [#7096](https://github.com/SAP/ui5-webcomponents/issues/7096) [#8214](https://github.com/SAP/ui5-webcomponents/issues/8214)





# [1.23.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.1...v1.23.0-rc.2) (2024-02-20)


### Features

* **ui5-li:** add tooltip support to list items ([#8301](https://github.com/SAP/ui5-webcomponents/issues/8301)) ([1bbf381](https://github.com/SAP/ui5-webcomponents/commit/1bbf38134dde26257bf95847ca9ab416ba7ab7ee)), closes [#7372](https://github.com/SAP/ui5-webcomponents/issues/7372)





# [1.23.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.23.0-rc.0...v1.23.0-rc.1) (2024-02-19)

**Note:** Version bump only for package @ui5/webcomponents





# [1.23.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.22.1-rc.0...v1.23.0-rc.0) (2024-02-15)


### Bug Fixes

* **ui5-card-header:** truncate long single-word description ([#8247](https://github.com/SAP/ui5-webcomponents/issues/8247)) ([b79aef7](https://github.com/SAP/ui5-webcomponents/commit/b79aef7751bc4e562fd38ebc006c74bd93c1b33e)), closes [#8245](https://github.com/SAP/ui5-webcomponents/issues/8245)
* **ui5-tree-item:** fix background color on hover ([#8278](https://github.com/SAP/ui5-webcomponents/issues/8278)) ([1a28393](https://github.com/SAP/ui5-webcomponents/commit/1a2839351d0af3badc4331409b13f4ef67ebba50))


### Features

* **ui5-calendar-legend:** introduce ui5-calendar-legend component ([#7706](https://github.com/SAP/ui5-webcomponents/issues/7706)) ([909a602](https://github.com/SAP/ui5-webcomponents/commit/909a6028362b55e26fdb5ca7a1ed68c8c6197a6b))
* **ui5-rating-indicator:** introduced "remaining-bar" CSS part ([#8276](https://github.com/SAP/ui5-webcomponents/issues/8276)) ([7f46b0b](https://github.com/SAP/ui5-webcomponents/commit/7f46b0b9a6f91b52f466b0c617d6ece9a541e950)), closes [#8213](https://github.com/SAP/ui5-webcomponents/issues/8213)
* **ui5-side-navigation:** add external link icon ([#8199](https://github.com/SAP/ui5-webcomponents/issues/8199)) ([47e28c5](https://github.com/SAP/ui5-webcomponents/commit/47e28c5c50c824dfb743b79998c4d98f56be4beb))
* **ui5-step-input:** add value-state-change event ([#8225](https://github.com/SAP/ui5-webcomponents/issues/8225)) ([8ab3ad1](https://github.com/SAP/ui5-webcomponents/commit/8ab3ad160d27bec5f9a77a41f534f480ec6481d0)), closes [#4791](https://github.com/SAP/ui5-webcomponents/issues/4791) [#5130](https://github.com/SAP/ui5-webcomponents/issues/5130)





## [1.22.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0...v1.22.1-rc.0) (2024-02-08)


### Bug Fixes

* cast ariaHasPopup acc attribute to lowercase ([#8239](https://github.com/SAP/ui5-webcomponents/issues/8239)) ([6692284](https://github.com/SAP/ui5-webcomponents/commit/66922847d6cbc545c500c661d18facac7c2f609c))
* **ui5-table:** prevent load-more event on initial load ([#8240](https://github.com/SAP/ui5-webcomponents/issues/8240)) ([3ea5c66](https://github.com/SAP/ui5-webcomponents/commit/3ea5c664aaf20908ab04a933a7587c35206aebf6))
* **ui5-tree-item:** fix double announcement ([#8139](https://github.com/SAP/ui5-webcomponents/issues/8139)) ([5af60a2](https://github.com/SAP/ui5-webcomponents/commit/5af60a2d4e5196b94a842f1adadfb4aa2d6672a7)), closes [#6878](https://github.com/SAP/ui5-webcomponents/issues/6878)





# [1.22.0](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0-rc.3...v1.22.0) (2024-02-05)


### Bug Fixes

* **ui5-checkbox:** improved key down behavior for readonly state ([#8226](https://github.com/SAP/ui5-webcomponents/issues/8226)) ([faec0ef](https://github.com/SAP/ui5-webcomponents/commit/faec0ef3bb09a05008bbfd091c289a575819858c)), closes [#7807](https://github.com/SAP/ui5-webcomponents/issues/7807)
* **ui5-list:** correct load-more marker visibility ([#8224](https://github.com/SAP/ui5-webcomponents/issues/8224)) ([3d04140](https://github.com/SAP/ui5-webcomponents/commit/3d041401977f036c74d308eb37eeb3caeb900457))





# [1.22.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0-rc.2...v1.22.0-rc.3) (2024-02-01)


### Bug Fixes

* build ([#8191](https://github.com/SAP/ui5-webcomponents/issues/8191)) ([5af9560](https://github.com/SAP/ui5-webcomponents/commit/5af956088195cd4de81f9c1ec82f1b937b3498aa))
* release build ([#8222](https://github.com/SAP/ui5-webcomponents/issues/8222)) ([27042ac](https://github.com/SAP/ui5-webcomponents/commit/27042ac90443dea8d5900d1c5bfa5bc93d365da0))
* **ui5-breadcrumbs:** render current location as link ([#8206](https://github.com/SAP/ui5-webcomponents/issues/8206)) ([01f5542](https://github.com/SAP/ui5-webcomponents/commit/01f5542b8aa1b8c309076ec45b547ce45320d95a))
* **ui5-combobox:** fix failing test ([#8220](https://github.com/SAP/ui5-webcomponents/issues/8220)) ([888bcd0](https://github.com/SAP/ui5-webcomponents/commit/888bcd02ed1d08872fffe29ec7964734538fe93d))
* **ui5-dialog:** include the opacity in the background color ([#8181](https://github.com/SAP/ui5-webcomponents/issues/8181)) ([3666e56](https://github.com/SAP/ui5-webcomponents/commit/3666e566287deb28c1eaa5554394303e93867e97))
* **ui5-popover:** arrow is now centered on close to the edge opener ([#8205](https://github.com/SAP/ui5-webcomponents/issues/8205)) ([d17a4bc](https://github.com/SAP/ui5-webcomponents/commit/d17a4bc05062328317e9a09662b22ee21a7a4b31))
* **ui5-popover:** correct position of the footer ([#8180](https://github.com/SAP/ui5-webcomponents/issues/8180)) ([a5a2f8b](https://github.com/SAP/ui5-webcomponents/commit/a5a2f8bbe5138a713f1ec369ab5dd3d31c2b3be1)), closes [#8009](https://github.com/SAP/ui5-webcomponents/issues/8009)
* **ui5-split-button:** use correct params ([#8140](https://github.com/SAP/ui5-webcomponents/issues/8140)) ([ddc5fe3](https://github.com/SAP/ui5-webcomponents/commit/ddc5fe31b2cd8bb8c18d8025bdb2036a93fe8bdb))
* **ui5-tab-container:** correct two-click area separator height ([#8168](https://github.com/SAP/ui5-webcomponents/issues/8168)) ([19c4df1](https://github.com/SAP/ui5-webcomponents/commit/19c4df1205b061913c3762fa27c58b48abba7db8))
* **ui5-toast:** check whether the event key property exists ([#8209](https://github.com/SAP/ui5-webcomponents/issues/8209)) ([43d32f0](https://github.com/SAP/ui5-webcomponents/commit/43d32f0ec5f122d7cf4ffbfde15c1a26b174065b))
* **ui5-toolbar-select:** options added to bundle ([#8183](https://github.com/SAP/ui5-webcomponents/issues/8183)) ([a2c37e4](https://github.com/SAP/ui5-webcomponents/commit/a2c37e4fdcc084a19ac325a61636a0d1dd555974))
* **ui5-toolbar:** fire noConflict events correctly ([#8169](https://github.com/SAP/ui5-webcomponents/issues/8169)) ([6890d94](https://github.com/SAP/ui5-webcomponents/commit/6890d94bf51a2cba4c900f854321f3b32c895ee7))


### Features

* add dom shim so importing components in SSR works ([#8184](https://github.com/SAP/ui5-webcomponents/issues/8184)) ([ca49674](https://github.com/SAP/ui5-webcomponents/commit/ca49674e046bd74842100245db2cea61d53e2df0))
* **ui5-date-picker:** introduce value-state-change event ([#8133](https://github.com/SAP/ui5-webcomponents/issues/8133)) ([69143b0](https://github.com/SAP/ui5-webcomponents/commit/69143b047f98f93f5a9debdf88a6e35b02cb674a)), closes [#8005](https://github.com/SAP/ui5-webcomponents/issues/8005)
* **ui5-datetime-picker:** replace time part wheelsliders with clocks ([#8129](https://github.com/SAP/ui5-webcomponents/issues/8129)) ([9041e16](https://github.com/SAP/ui5-webcomponents/commit/9041e16f70c28406c1cab6b568f371d0d7e82fc7))
* **ui5-toast:** enable overstyling ([#8170](https://github.com/SAP/ui5-webcomponents/issues/8170)) ([3bfdb85](https://github.com/SAP/ui5-webcomponents/commit/3bfdb8509f4ad598a977dd11ed6d273b039c2d2f)), closes [#7596](https://github.com/SAP/ui5-webcomponents/issues/7596)





# [1.22.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0-rc.1...v1.22.0-rc.2) (2024-01-25)


### Bug Fixes

* add [@allow](https://github.com/allow)PreventDefault where needed ([#8148](https://github.com/SAP/ui5-webcomponents/issues/8148)) ([5d6eb44](https://github.com/SAP/ui5-webcomponents/commit/5d6eb442dc433bdc2000a5845b8087915c8e1097))
* **ui5-badge:** correct text-shadow for Quartz dark and Quartz high contrast themes ([#8142](https://github.com/SAP/ui5-webcomponents/issues/8142)) ([e1f4e82](https://github.com/SAP/ui5-webcomponents/commit/e1f4e82be6bc244e3a1fcbdbb4bf133603e4565b)), closes [#8126](https://github.com/SAP/ui5-webcomponents/issues/8126)
* **ui5-color-palette:** add i18n text for default color button's text ([#8157](https://github.com/SAP/ui5-webcomponents/issues/8157)) ([7b4dac3](https://github.com/SAP/ui5-webcomponents/commit/7b4dac34928b70adf1f67481854329fff3838e46))
* **ui5-date-time-picker:** align calculations with density change ([#8090](https://github.com/SAP/ui5-webcomponents/issues/8090)) ([bc035bb](https://github.com/SAP/ui5-webcomponents/commit/bc035bbc10b2ca2055d5c8698cc3054da12bf794)), closes [#7992](https://github.com/SAP/ui5-webcomponents/issues/7992)
* **ui5-list:** load-more event fired correctly ([#8143](https://github.com/SAP/ui5-webcomponents/issues/8143)) ([c483a28](https://github.com/SAP/ui5-webcomponents/commit/c483a2889e749e1b464b386ba8dc098633ff3c3c))
* **ui5-multi-combobox:** select all implementation ([#8066](https://github.com/SAP/ui5-webcomponents/issues/8066)) ([7e8a355](https://github.com/SAP/ui5-webcomponents/commit/7e8a3552c047f71d8e08a4dfaaa15dd4af7343c4))
* **ui5-multi-input:** fix multiple token addition ([#8144](https://github.com/SAP/ui5-webcomponents/issues/8144)) ([94590e1](https://github.com/SAP/ui5-webcomponents/commit/94590e127cb58e4f29a4d93955a984aad89873c0)), closes [#8049](https://github.com/SAP/ui5-webcomponents/issues/8049)
* **ui5-textarea:** prevent page height from growing on large input ([#8118](https://github.com/SAP/ui5-webcomponents/issues/8118)) ([7a819c8](https://github.com/SAP/ui5-webcomponents/commit/7a819c88b17ce0ad5ed349381a779f3964da61c9)), closes [#8082](https://github.com/SAP/ui5-webcomponents/issues/8082)


### Features

* **ui5-combobox, ui5-multi-combobox:** clear icon implementation ([#8038](https://github.com/SAP/ui5-webcomponents/issues/8038)) ([d3ad83b](https://github.com/SAP/ui5-webcomponents/commit/d3ad83b0c255f1f41bb5260feeb27306cf5f1f44))





# [1.22.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.22.0-rc.0...v1.22.0-rc.1) (2024-01-18)


### Bug Fixes

* **ui5-breadcrumbs:** remove char separators from accessibility announcement ([#8099](https://github.com/SAP/ui5-webcomponents/issues/8099)) ([ec1fd10](https://github.com/SAP/ui5-webcomponents/commit/ec1fd1068baa740e635cdf3d8607d9a101033ef9))
* **ui5-list:** removed _level property ([#8089](https://github.com/SAP/ui5-webcomponents/issues/8089)) ([d0bc9eb](https://github.com/SAP/ui5-webcomponents/commit/d0bc9eb01a9387175d39531f5e44b7cfa6ce24c7)), closes [#8047](https://github.com/SAP/ui5-webcomponents/issues/8047)
* **ui5-multi-combobox:** enhance accessibility on mobile ([#8096](https://github.com/SAP/ui5-webcomponents/issues/8096)) ([14b5421](https://github.com/SAP/ui5-webcomponents/commit/14b54218a96ddf6f9bf9972404c181cbfc6f8ef7))
* **ui5-split-button:** fix split button when in wrapper ([#8037](https://github.com/SAP/ui5-webcomponents/issues/8037)) ([38861c8](https://github.com/SAP/ui5-webcomponents/commit/38861c872e211af637ff90441f1ca52aa06fc0f9))


### Features

* **ui5-checkbox:** add displayOnly mode ([#8111](https://github.com/SAP/ui5-webcomponents/issues/8111)) ([c99d0ec](https://github.com/SAP/ui5-webcomponents/commit/c99d0ecb10c903fb19fd06b3d6de2b5f80b4650e))
* update tnt/icons to v3.5 ([#8098](https://github.com/SAP/ui5-webcomponents/issues/8098)) ([745a9fa](https://github.com/SAP/ui5-webcomponents/commit/745a9faadcd484b49ace8bf24df47d0c892e43ec))





# [1.22.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0...v1.22.0-rc.0) (2024-01-11)


### Bug Fixes

* **ui5-busy-indicator:** correct appearance in Belize theme ([#8054](https://github.com/SAP/ui5-webcomponents/issues/8054)) ([f41d505](https://github.com/SAP/ui5-webcomponents/commit/f41d5056590f63ac956a5ad9624993d835765e9d)), closes [#7901](https://github.com/SAP/ui5-webcomponents/issues/7901)


### Features

* **ui5-badge:** add different design types ([#7564](https://github.com/SAP/ui5-webcomponents/issues/7564)) ([e5895f7](https://github.com/SAP/ui5-webcomponents/commit/e5895f7d5076406769b516967137ba58f3567935))
* **ui5-side-navigation:** Add new overflow behaviour to collapsed mode ([#8019](https://github.com/SAP/ui5-webcomponents/issues/8019)) ([e5f8edd](https://github.com/SAP/ui5-webcomponents/commit/e5f8eddcdc9f1139d002585cdb014b47a0687b62))





# [1.21.0](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.5...v1.21.0) (2024-01-05)


### Bug Fixes

* **ui5-combobox:** scroll to item upon keyboard navigation ([#8044](https://github.com/SAP/ui5-webcomponents/issues/8044)) ([8dc384e](https://github.com/SAP/ui5-webcomponents/commit/8dc384e6381283fdcc1097b132c2f98d49ea6102)), closes [#3994](https://github.com/SAP/ui5-webcomponents/issues/3994)





# [1.21.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.4...v1.21.0-rc.5) (2024-01-04)


### Bug Fixes

* **ui5-combobox:** keep picker open on group selection ([#8039](https://github.com/SAP/ui5-webcomponents/issues/8039)) ([c72433e](https://github.com/SAP/ui5-webcomponents/commit/c72433e94b5e2302b5cba7028c80450e556be83f))
* **ui5-tree:** correct item indentation ([#8051](https://github.com/SAP/ui5-webcomponents/issues/8051)) ([5e3662f](https://github.com/SAP/ui5-webcomponents/commit/5e3662ff57e3a932fa7b32b276b25f5552913f75))


### Features

* **ui5-checkbox:** add css shadow part to the label ([#8046](https://github.com/SAP/ui5-webcomponents/issues/8046)) ([0ea504e](https://github.com/SAP/ui5-webcomponents/commit/0ea504ed6bf2bcce8df4789829be859e1745b3e4))





# [1.21.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.3...v1.21.0-rc.4) (2023-12-28)


### Bug Fixes

* **ui5-table:** correct alignment of popin in multiselect mode ([#8034](https://github.com/SAP/ui5-webcomponents/issues/8034)) ([9a0eab0](https://github.com/SAP/ui5-webcomponents/commit/9a0eab05d0f6b3940ce8cc87af3c9ddd9465965b))





# [1.21.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.2...v1.21.0-rc.3) (2023-12-21)


### Bug Fixes

* **ui5-menu:** fix runtime js error on `getElementById` call ([#8021](https://github.com/SAP/ui5-webcomponents/issues/8021)) ([65a73d7](https://github.com/SAP/ui5-webcomponents/commit/65a73d71fcd44766431f8eb1e83ffbc8857681e5)), closes [#8017](https://github.com/SAP/ui5-webcomponents/issues/8017)
* **ui5-toolbar:** remove unnecessary styles ([#7762](https://github.com/SAP/ui5-webcomponents/issues/7762)) ([db379bc](https://github.com/SAP/ui5-webcomponents/commit/db379bc9e449d63de23d74cf7cbda24ad7a89050))
* value state message styles in input and combobox components ([#7876](https://github.com/SAP/ui5-webcomponents/issues/7876)) ([2443b8e](https://github.com/SAP/ui5-webcomponents/commit/2443b8e35464809c87047347e05edfe30479bca9))


### Features

* **tools:** Optimize build by switching css processing to esbuild ([#8008](https://github.com/SAP/ui5-webcomponents/issues/8008)) ([b4d411f](https://github.com/SAP/ui5-webcomponents/commit/b4d411f00f8d74ccecb2d02254126243faf53dfd))
* **ui5-color-palette-popover:** introduce `open` and `opener` properties ([#7988](https://github.com/SAP/ui5-webcomponents/issues/7988)) ([d3bda7e](https://github.com/SAP/ui5-webcomponents/commit/d3bda7ea454c10a8724323aae0958757c03e24ca))
* **ui5-select:** introduce `readonly` state ([#7950](https://github.com/SAP/ui5-webcomponents/issues/7950)) ([02ea9a4](https://github.com/SAP/ui5-webcomponents/commit/02ea9a451635b9b0d75833889e7cdf3c022cd137)), closes [#7727](https://github.com/SAP/ui5-webcomponents/issues/7727)





# [1.21.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.1...v1.21.0-rc.2) (2023-12-14)


### Bug Fixes

* **ui5-date-time-picker:** load initial value correctly ([#7967](https://github.com/SAP/ui5-webcomponents/issues/7967)) ([e1d5969](https://github.com/SAP/ui5-webcomponents/commit/e1d5969fa506c48bbc5e71f31e36a96cd9996470)), closes [#7786](https://github.com/SAP/ui5-webcomponents/issues/7786)
* **ui5-menu:** menu item text doesn't overflow submenu arrow ([#7991](https://github.com/SAP/ui5-webcomponents/issues/7991)) ([353ac1a](https://github.com/SAP/ui5-webcomponents/commit/353ac1a56ad56a6f7001e0d55c8bd0daf1000f8f))
* **ui5-multi-combobox:** improve interaction when having invalid input ([#7893](https://github.com/SAP/ui5-webcomponents/issues/7893)) ([d63981a](https://github.com/SAP/ui5-webcomponents/commit/d63981ab2480688ec1d5e32308a69302c568db84)), closes [#7349](https://github.com/SAP/ui5-webcomponents/issues/7349) [#6968](https://github.com/SAP/ui5-webcomponents/issues/6968)


### Features

* **ui5-input:** prevent suggestion-item-select event per suggestion item ([#7940](https://github.com/SAP/ui5-webcomponents/issues/7940)) ([a265a65](https://github.com/SAP/ui5-webcomponents/commit/a265a65d8b48b4fcef84931a3ca0b7ad4278283e))
* **ui5-tabcontainer:** add `tabstrip` Shadow Part ([#7989](https://github.com/SAP/ui5-webcomponents/issues/7989)) ([0cbbd16](https://github.com/SAP/ui5-webcomponents/commit/0cbbd160ba5b578795259e59aa187359385dc4b2)), closes [#6035](https://github.com/SAP/ui5-webcomponents/issues/6035)





# [1.21.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.21.0-rc.0...v1.21.0-rc.1) (2023-12-08)


### Bug Fixes

* base usage from test pages ([#7975](https://github.com/SAP/ui5-webcomponents/issues/7975)) ([b4c8769](https://github.com/SAP/ui5-webcomponents/commit/b4c87697d61a48f2f0c90b1d92393c34cae27663))
* **infra:** release commands ([#7978](https://github.com/SAP/ui5-webcomponents/issues/7978)) ([b0e653c](https://github.com/SAP/ui5-webcomponents/commit/b0e653cf911cc0ffe5fb5dcbd50a7c238f20f33d))
* **ui5-combobox:** update picker items while open ([#7937](https://github.com/SAP/ui5-webcomponents/issues/7937)) ([8f99f8d](https://github.com/SAP/ui5-webcomponents/commit/8f99f8d0d473e6e573c8c6366563a9545ab04874)), closes [#7011](https://github.com/SAP/ui5-webcomponents/issues/7011)





# [1.21.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0...v1.21.0-rc.0) (2023-12-07)


### Bug Fixes

* **ui5-table-row:** fix runtime exception in test env execution ([#7953](https://github.com/SAP/ui5-webcomponents/issues/7953)) ([e24f294](https://github.com/SAP/ui5-webcomponents/commit/e24f294501b1b1bb3d1f1f30f902fc165fefcf57)), closes [#7787](https://github.com/SAP/ui5-webcomponents/issues/7787)


### Features

* **ui5-split-button:** expose active state property for arrow button ([#7683](https://github.com/SAP/ui5-webcomponents/issues/7683)) ([d6d3705](https://github.com/SAP/ui5-webcomponents/commit/d6d3705a585af32ff440d1b7ae57faf46ef0913f))





# [1.20.0](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0-rc.3...v1.20.0) (2023-12-04)


### Bug Fixes

* **framework:** fix font72 for special characters ([#7949](https://github.com/SAP/ui5-webcomponents/issues/7949)) ([55665b0](https://github.com/SAP/ui5-webcomponents/commit/55665b0ac02cd9060de1368fb427bb338338c5aa)), closes [#7948](https://github.com/SAP/ui5-webcomponents/issues/7948)
* **ui5-multi-combobox:** adjust open property handling ([#7763](https://github.com/SAP/ui5-webcomponents/issues/7763)) ([bb2ecfc](https://github.com/SAP/ui5-webcomponents/commit/bb2ecfc87dc95e67aea7acfce92de296899db074))


### Features

* **ui5-select:** introduce `value` property ([#7865](https://github.com/SAP/ui5-webcomponents/issues/7865)) ([8c62d34](https://github.com/SAP/ui5-webcomponents/commit/8c62d34c353f07d338a52ba7fd9f87141fa62b5a))





# [1.20.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0-rc.2...v1.20.0-rc.3) (2023-11-30)


### Bug Fixes

* **framework:** enable `72Blackfull` font-family ([#7918](https://github.com/SAP/ui5-webcomponents/issues/7918)) ([214780f](https://github.com/SAP/ui5-webcomponents/commit/214780ffde6c99a395472e5714370788668ed71e)), closes [#7800](https://github.com/SAP/ui5-webcomponents/issues/7800)
* **ui5-panel:** improve header visualization ([#7906](https://github.com/SAP/ui5-webcomponents/issues/7906)) ([3c1fe39](https://github.com/SAP/ui5-webcomponents/commit/3c1fe39e93546a9c067f6b04cf593a7de48f7f0a))
* **ui5-table:** popin-change is now fired on pop out ([#7837](https://github.com/SAP/ui5-webcomponents/issues/7837)) ([4ca3898](https://github.com/SAP/ui5-webcomponents/commit/4ca3898e0d0c22c0cea2d439af33455fcec9cce2))
* **ui5-table:** show busy indicator above sticky column headers ([#7886](https://github.com/SAP/ui5-webcomponents/issues/7886)) ([bce4b93](https://github.com/SAP/ui5-webcomponents/commit/bce4b933ab28e0de33d57f11bb1878953302c8b6)), closes [#7848](https://github.com/SAP/ui5-webcomponents/issues/7848)
* **ui5-textarea:** adjust scroll positioning ([#7920](https://github.com/SAP/ui5-webcomponents/issues/7920)) ([944b260](https://github.com/SAP/ui5-webcomponents/commit/944b260d81df8940c0f3061046a1137c32c5b3a7))


### Features

* cloned property to the slot decorator ([#7882](https://github.com/SAP/ui5-webcomponents/issues/7882)) ([2f3742b](https://github.com/SAP/ui5-webcomponents/commit/2f3742bae6a73796ccb0f59b48d35d0f794fba63)), closes [#7681](https://github.com/SAP/ui5-webcomponents/issues/7681)
* register custom theme properties ([#7750](https://github.com/SAP/ui5-webcomponents/issues/7750)) ([c6c04c6](https://github.com/SAP/ui5-webcomponents/commit/c6c04c609d82a7442bdf79ef5bba46a406859a27))





# [1.20.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0-rc.1...v1.20.0-rc.2) (2023-11-23)


### Bug Fixes

* **ui5-calendar:** render the correct length of day names ([#7866](https://github.com/SAP/ui5-webcomponents/issues/7866)) ([2a31e8d](https://github.com/SAP/ui5-webcomponents/commit/2a31e8d1587a2461099810239364913421708afa)), closes [#7831](https://github.com/SAP/ui5-webcomponents/issues/7831)
* **ui5-switch:** align 'off' text in RTL, add compact mode params ([#7603](https://github.com/SAP/ui5-webcomponents/issues/7603)) ([007e755](https://github.com/SAP/ui5-webcomponents/commit/007e755f301e6112bf98afef1b47676b422eb268)), closes [#7522](https://github.com/SAP/ui5-webcomponents/issues/7522) [#7806](https://github.com/SAP/ui5-webcomponents/issues/7806)





# [1.20.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.20.0-rc.0...v1.20.0-rc.1) (2023-11-16)


### Bug Fixes

* **ui5-list:** shift+tab navigation in List ([#7728](https://github.com/SAP/ui5-webcomponents/issues/7728)) ([399b941](https://github.com/SAP/ui5-webcomponents/commit/399b941ebeae7b44f6dba9cd4e8ec7ebb6f283c6))





# [1.20.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0...v1.20.0-rc.0) (2023-11-09)


### Bug Fixes

* **ui5-segmented-button:** check for items before applying settings ([#7792](https://github.com/SAP/ui5-webcomponents/issues/7792)) ([7f11274](https://github.com/SAP/ui5-webcomponents/commit/7f112746d50381474ec86da5e428df79c17c6499)), closes [#7788](https://github.com/SAP/ui5-webcomponents/issues/7788)
* **ui5-time-picker:** check value before formatting ([#7793](https://github.com/SAP/ui5-webcomponents/issues/7793)) ([70deda8](https://github.com/SAP/ui5-webcomponents/commit/70deda85293d5e62e99530c9dc0747071d9ee59c)), closes [#7790](https://github.com/SAP/ui5-webcomponents/issues/7790)





# [1.19.0](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0-rc.3...v1.19.0) (2023-11-02)

**Note:** Version bump only for package @ui5/webcomponents





# [1.19.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0-rc.2...v1.19.0-rc.3) (2023-11-02)


### Bug Fixes

* **FormSupport:** submit linebreaks in ui5-textarea ([#7757](https://github.com/SAP/ui5-webcomponents/issues/7757)) ([425e97b](https://github.com/SAP/ui5-webcomponents/commit/425e97bd5fa030155502f3b9c7022e0e1a3d3202)), closes [#7467](https://github.com/SAP/ui5-webcomponents/issues/7467)
* **ui5-button:** align styles to specification ([#7784](https://github.com/SAP/ui5-webcomponents/issues/7784)) ([0cf1201](https://github.com/SAP/ui5-webcomponents/commit/0cf1201c132c993f71b14f0cd06c00300d742b0c)), closes [#7352](https://github.com/SAP/ui5-webcomponents/issues/7352)
* **ui5-calendar:** focus date set in slot ([#7735](https://github.com/SAP/ui5-webcomponents/issues/7735)) ([842f047](https://github.com/SAP/ui5-webcomponents/commit/842f047844ac7f06716813c2fa0ebcb3ae64c9a7)), closes [#7693](https://github.com/SAP/ui5-webcomponents/issues/7693)
* **ui5-combobox:** announce value state header on focus ([#7751](https://github.com/SAP/ui5-webcomponents/issues/7751)) ([1941854](https://github.com/SAP/ui5-webcomponents/commit/194185400bb70a778359a721928ad3a99bd5f3a6))
* **ui5-list:** removed unnecessary accessibility reading ([#7758](https://github.com/SAP/ui5-webcomponents/issues/7758)) ([2f6780f](https://github.com/SAP/ui5-webcomponents/commit/2f6780f45ee2b6c60ead36c54ae634276d959b2e)), closes [#7601](https://github.com/SAP/ui5-webcomponents/issues/7601)
* **ui5-popup:** add check for initial focused element id ([#7746](https://github.com/SAP/ui5-webcomponents/issues/7746)) ([ec80fae](https://github.com/SAP/ui5-webcomponents/commit/ec80faee410d07fa53756a8972fed29bc969c40f)), closes [#7711](https://github.com/SAP/ui5-webcomponents/issues/7711)
* **ui5-slider:** update labels on min and max change ([#7764](https://github.com/SAP/ui5-webcomponents/issues/7764)) ([14fd642](https://github.com/SAP/ui5-webcomponents/commit/14fd6423ce0ecd6d34074e81c53ff5e6bdfdf7c8))
* **ui5-tabcontainer:** add margins for the Overflow buttons (start and end) ([#7745](https://github.com/SAP/ui5-webcomponents/issues/7745)) ([612f503](https://github.com/SAP/ui5-webcomponents/commit/612f50351afcf407a8f86457532f7da0e856d4b5)), closes [#7291](https://github.com/SAP/ui5-webcomponents/issues/7291)
* **ui5-textarea:** remove white space from value state message ([#7755](https://github.com/SAP/ui5-webcomponents/issues/7755)) ([3df7d03](https://github.com/SAP/ui5-webcomponents/commit/3df7d038e5c16d3c885bc186d0df3d37f34b2f61))
* **ui5-textarea:** select exceeded text ([#7741](https://github.com/SAP/ui5-webcomponents/issues/7741)) ([5a510cf](https://github.com/SAP/ui5-webcomponents/commit/5a510cff52a1e8d19f38f33b4582f9555aa28527))


### Features

* **framework:** switch default theme from Quartz Light to Morning Ho… ([#7749](https://github.com/SAP/ui5-webcomponents/issues/7749)) ([10dadd7](https://github.com/SAP/ui5-webcomponents/commit/10dadd79e3a93daf29baaed3a5bcebd8c66a0940))


### Reverts

* **ui5-color-palette-item:** revert selected state feature ([#7782](https://github.com/SAP/ui5-webcomponents/issues/7782)) ([f24ff90](https://github.com/SAP/ui5-webcomponents/commit/f24ff9019287f1b0a83d543b6486e5eb4d34ed35))





# [1.19.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0-rc.1...v1.19.0-rc.2) (2023-10-26)


### Bug Fixes

* **ui5-calendar:** adjust selected border color ([#7730](https://github.com/SAP/ui5-webcomponents/issues/7730)) ([45b11f9](https://github.com/SAP/ui5-webcomponents/commit/45b11f9e47be92d71058960bf7c0c5254cf8ca6a))
* **ui5-color-picker:** fix hsl to rgb color conversion ([#7723](https://github.com/SAP/ui5-webcomponents/issues/7723)) ([4e95272](https://github.com/SAP/ui5-webcomponents/commit/4e9527225be27c957ea71f17a4cacb3bc065d6b7)), closes [#7660](https://github.com/SAP/ui5-webcomponents/issues/7660)
* **ui5-combobox:** exclude group from suggestions count ([#7713](https://github.com/SAP/ui5-webcomponents/issues/7713)) ([40ffa20](https://github.com/SAP/ui5-webcomponents/commit/40ffa2073410f655e4931bfbe7df0c1977f821fa))
* **ui5-input:** add additional text to the item's announcement ([#7715](https://github.com/SAP/ui5-webcomponents/issues/7715)) ([6bcb970](https://github.com/SAP/ui5-webcomponents/commit/6bcb97039d6975f8e61f404dc8f6d2c72a249e6d))
* **ui5-input:** update clear icon accessible name ([#7744](https://github.com/SAP/ui5-webcomponents/issues/7744)) ([5da1fbe](https://github.com/SAP/ui5-webcomponents/commit/5da1fbee98e7571056c52299324f185a51699f0e))
* **ui5-popup:** apply responsive paddings as early as possible ([#7710](https://github.com/SAP/ui5-webcomponents/issues/7710)) ([f6e9ac4](https://github.com/SAP/ui5-webcomponents/commit/f6e9ac4d832f66aa3fca697a1b16200cf971b3d1)), closes [#7644](https://github.com/SAP/ui5-webcomponents/issues/7644)
* **ui5-tree-item-custom:** text wrapper allows proper alignment of flex content ([#7733](https://github.com/SAP/ui5-webcomponents/issues/7733)) ([46e89e7](https://github.com/SAP/ui5-webcomponents/commit/46e89e757a4a01875d3cd020eb6491f9677b9b77)), closes [#7483](https://github.com/SAP/ui5-webcomponents/issues/7483)





# [1.19.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.19.0-rc.0...v1.19.0-rc.1) (2023-10-19)


### Bug Fixes

* **ui5-date-picker:** align value state colors with the spec ([#7676](https://github.com/SAP/ui5-webcomponents/issues/7676)) ([17a5b12](https://github.com/SAP/ui5-webcomponents/commit/17a5b122926720c3c2b07fc322cb480e867eb63a))
* **ui5-step-input:** fix z-index of increase/decrease buttons and focus ([#7709](https://github.com/SAP/ui5-webcomponents/issues/7709)) ([8bb9c4c](https://github.com/SAP/ui5-webcomponents/commit/8bb9c4c51a726b350d427de31cbf99c2d8fc6b31))
* **ui5-tabcontainer:** update according to latest SAP Horizon design ([#7668](https://github.com/SAP/ui5-webcomponents/issues/7668)) ([57ff771](https://github.com/SAP/ui5-webcomponents/commit/57ff771c82de51515a998ce09f3b3430ffd69c18))


### Features

* **ui5-combobox:** add attribute `no-typeahead` ([#7692](https://github.com/SAP/ui5-webcomponents/issues/7692)) ([4714835](https://github.com/SAP/ui5-webcomponents/commit/4714835990da6858f47462534b46978a9b0c65fc))
* **ui5-panel:** enable custom styling of title ([#7688](https://github.com/SAP/ui5-webcomponents/issues/7688)) ([9d5a3d1](https://github.com/SAP/ui5-webcomponents/commit/9d5a3d1e95c7d163a91beb068169f2e7df39d4d5))
* **ui5-rating-indicator:** introduce tooltip property ([#7687](https://github.com/SAP/ui5-webcomponents/issues/7687)) ([f2668b6](https://github.com/SAP/ui5-webcomponents/commit/f2668b6889259c7295b06fe47f846b434510f671))
* update @ui5/webcomponents-icons to 5.07 & 4.19 ([#7708](https://github.com/SAP/ui5-webcomponents/issues/7708)) ([1732304](https://github.com/SAP/ui5-webcomponents/commit/173230467f93b227c37b54b666dcfcfec07bcab1))





# [1.19.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.18.1-rc.0...v1.19.0-rc.0) (2023-10-12)


### Bug Fixes

* **ui5-avatar:** a11y fixed ([#7636](https://github.com/SAP/ui5-webcomponents/issues/7636)) ([15a84f8](https://github.com/SAP/ui5-webcomponents/commit/15a84f87fcdba3d7e60364205d2dbf7bf9bca0a9))
* **ui5-avatar:** prevent hover effect on non-interactive avatars ([#7611](https://github.com/SAP/ui5-webcomponents/issues/7611)) ([8a782f1](https://github.com/SAP/ui5-webcomponents/commit/8a782f1a2f7cff5b26bd3338f4cf61186953539e))
* **ui5-checkbox:** fix horizon hcb and hcw ([#7686](https://github.com/SAP/ui5-webcomponents/issues/7686)) ([cef8881](https://github.com/SAP/ui5-webcomponents/commit/cef88813e01a8117dc0c824dec17b7cf6e1a71e3))
* **ui5-label,ui5-input,ui5-list,ui5-tabcontainer,ui5-table,ui5-wheelslider:** special character support for id ([#7634](https://github.com/SAP/ui5-webcomponents/issues/7634)) ([993f2b7](https://github.com/SAP/ui5-webcomponents/commit/993f2b73196827f6558322a82f2e22e0f1bb1d84)), closes [#7633](https://github.com/SAP/ui5-webcomponents/issues/7633)
* **ui5-menu:** prevent bubbling in events ([#7653](https://github.com/SAP/ui5-webcomponents/issues/7653)) ([6f5caf4](https://github.com/SAP/ui5-webcomponents/commit/6f5caf49def230e716b7534f83f27249caade7d7)), closes [#7637](https://github.com/SAP/ui5-webcomponents/issues/7637)
* **ui5-step-input:** align decrement icon ([#7654](https://github.com/SAP/ui5-webcomponents/issues/7654)) ([ce81085](https://github.com/SAP/ui5-webcomponents/commit/ce810853e707f682127ceb134011bb629859377a))


### Features

* **ui5-color-palette-item:** add selected state ([#7598](https://github.com/SAP/ui5-webcomponents/issues/7598)) ([6983f71](https://github.com/SAP/ui5-webcomponents/commit/6983f71acdaf3f94215d0fb86d9558db5b0b2887))





## [1.18.1-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.18.0...v1.18.1-rc.0) (2023-10-05)


### Bug Fixes

* **ui5-calendar:** hide secondary type when same as primary ([#7650](https://github.com/SAP/ui5-webcomponents/issues/7650)) ([6ce7c33](https://github.com/SAP/ui5-webcomponents/commit/6ce7c3315c022c83d35b1121a50ef6fc4bb57dd7))
* **ui5-label:** use correct i18n bundle & make component language aware ([#7652](https://github.com/SAP/ui5-webcomponents/issues/7652)) ([7b43587](https://github.com/SAP/ui5-webcomponents/commit/7b43587253e4873e49211a02a4a3923bc4a819f6))





# [1.18.0](https://github.com/SAP/ui5-webcomponents/compare/v1.18.0-rc.2...v1.18.0) (2023-10-02)

**Note:** Version bump only for package @ui5/webcomponents





# [1.18.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.18.0-rc.1...v1.18.0-rc.2) (2023-09-28)


### Bug Fixes

* **ui5-button:** update font params ([#7625](https://github.com/SAP/ui5-webcomponents/issues/7625)) ([b2ea9aa](https://github.com/SAP/ui5-webcomponents/commit/b2ea9aac43d296b777d1fcf8c1611fe75fdfb46d))
* **ui5-list:** update horizon theme parameters ([#7614](https://github.com/SAP/ui5-webcomponents/issues/7614)) ([b0b8359](https://github.com/SAP/ui5-webcomponents/commit/b0b83597596248732f4bc92f968391aa67bb0355))
* **ui5-message-strip:** remove button's custom width ([#7606](https://github.com/SAP/ui5-webcomponents/issues/7606)) ([bb8241a](https://github.com/SAP/ui5-webcomponents/commit/bb8241a94b4af5588c4583663da0f88490778cf7))
* **ui5-multi-combobox:** correct usage of css var ([#7616](https://github.com/SAP/ui5-webcomponents/issues/7616)) ([c59c3bc](https://github.com/SAP/ui5-webcomponents/commit/c59c3bc1ccd130d36d1835450d8c7aaff8418e9c))
* **ui5-slider:** adjust Horizon themes ([#7615](https://github.com/SAP/ui5-webcomponents/issues/7615)) ([4540766](https://github.com/SAP/ui5-webcomponents/commit/4540766a76595751323e2d2704f9fde69b80c36d))
* **ui5-table:** improve Horizon styles ([#7609](https://github.com/SAP/ui5-webcomponents/issues/7609)) ([092537e](https://github.com/SAP/ui5-webcomponents/commit/092537e5616e23b88c46b93dc237593096c5c882))


### Features

* **ui5-time-picker:** mobile input and code optimization ([#7549](https://github.com/SAP/ui5-webcomponents/issues/7549)) ([50499ac](https://github.com/SAP/ui5-webcomponents/commit/50499ac1378deb18c18c649090591c0c36d44567))





# [1.18.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.18.0-rc.0...v1.18.0-rc.1) (2023-09-21)


### Bug Fixes

* **ui5-breadcrumbs:** infinite rerendering fixed ([#7589](https://github.com/SAP/ui5-webcomponents/issues/7589)) ([af8015b](https://github.com/SAP/ui5-webcomponents/commit/af8015b68a3a90cfec999863230d0f7b5298e206))
* **ui5-button:** remove box shadows ([#7590](https://github.com/SAP/ui5-webcomponents/issues/7590)) ([555303a](https://github.com/SAP/ui5-webcomponents/commit/555303ab273fbe361c19de4ff5cf8dddddfd5e55))
* **ui5-dialog:** fix background and shadow of slotted ui5-bar ([#7421](https://github.com/SAP/ui5-webcomponents/issues/7421)) ([2746460](https://github.com/SAP/ui5-webcomponents/commit/2746460ebd0d6517e8eedadde30b74e424c17a85)), closes [#7418](https://github.com/SAP/ui5-webcomponents/issues/7418)
* **ui5-input,ui5-textarea:** adjust disabled readonly visualisation ([#7568](https://github.com/SAP/ui5-webcomponents/issues/7568)) ([e97e35f](https://github.com/SAP/ui5-webcomponents/commit/e97e35f4570125965788a2c134022d7e289e4f81))
* **ui5-input:** adjust button's size ([#7597](https://github.com/SAP/ui5-webcomponents/issues/7597)) ([b32dba1](https://github.com/SAP/ui5-webcomponents/commit/b32dba1dd5ca2874c4735bda8879b6ee82f149a9))
* **ui5-input:** improve item announcement ([#7585](https://github.com/SAP/ui5-webcomponents/issues/7585)) ([292d15a](https://github.com/SAP/ui5-webcomponents/commit/292d15a0a7fcf468ecdfbff3048083b7014bf7c7))
* **ui5-popover:** improve positioning when scrolling ([#7593](https://github.com/SAP/ui5-webcomponents/issues/7593)) ([a1b3bf6](https://github.com/SAP/ui5-webcomponents/commit/a1b3bf63875c04870e01ff715f603293a233444f)), closes [#7173](https://github.com/SAP/ui5-webcomponents/issues/7173)
* **ui5-segmented-button:** visual misalignments ([#7528](https://github.com/SAP/ui5-webcomponents/issues/7528)) ([d459fc2](https://github.com/SAP/ui5-webcomponents/commit/d459fc217bf6c63c1070743ea7d4447b08bdf2bc))
* **ui5-switch:** fix text alignment in all themes ([#7416](https://github.com/SAP/ui5-webcomponents/issues/7416)) ([b4dea67](https://github.com/SAP/ui5-webcomponents/commit/b4dea675f5793c28ee9f0123d0e8bf6bd38c0b83))


### Features

* add `secondaryCalendarType` global config ([#7547](https://github.com/SAP/ui5-webcomponents/issues/7547)) ([c9111a3](https://github.com/SAP/ui5-webcomponents/commit/c9111a38fc2a6cc54bb696dbdcec66100e304906))
* **ui5-checkbox:** update horizon theme paramaters ([#7576](https://github.com/SAP/ui5-webcomponents/issues/7576)) ([4d144dd](https://github.com/SAP/ui5-webcomponents/commit/4d144dd76001cd2eed284629b12de9d99b64f383))
* **ui5-combobox, ui5-multi-combo-box, ui5-input, ui5-multi-input:** add wrapping in suggestions and n-more ([#7509](https://github.com/SAP/ui5-webcomponents/issues/7509)) ([21528a0](https://github.com/SAP/ui5-webcomponents/commit/21528a0ae5f3cec84d30362eba79bb6fa08a75d4))
* **ui5-split-button:** adapt visual design with new parameters ([#7584](https://github.com/SAP/ui5-webcomponents/issues/7584)) ([28997c8](https://github.com/SAP/ui5-webcomponents/commit/28997c8468acf8e5b33a8c174cf9368c31310eb0))





# [1.18.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.17.0...v1.18.0-rc.0) (2023-09-07)


### Bug Fixes

* **ui5-busy-indicator:** fix spacing between dots ([#7523](https://github.com/SAP/ui5-webcomponents/issues/7523)) ([12f5419](https://github.com/SAP/ui5-webcomponents/commit/12f541994e51048326893a80635b8f4014013760))
* **ui5-dialog:** adjust resize handle position for Horizon ([#7550](https://github.com/SAP/ui5-webcomponents/issues/7550)) ([4c1b7dd](https://github.com/SAP/ui5-webcomponents/commit/4c1b7dde33e7f86918e51565a8e408c37dded6f3))
* **ui5-link:** add title to inner link ([#7537](https://github.com/SAP/ui5-webcomponents/issues/7537)) ([ebf6bdf](https://github.com/SAP/ui5-webcomponents/commit/ebf6bdf5a66d603553b925c9b74866f598972700)), closes [#7518](https://github.com/SAP/ui5-webcomponents/issues/7518)
* **ui5-radio-button:** SAP Horizon theme updates ([#7482](https://github.com/SAP/ui5-webcomponents/issues/7482)) ([b20ee4d](https://github.com/SAP/ui5-webcomponents/commit/b20ee4d82f23423532e7692e88968a6967dcf9fc))
* **ui5-shellbar:** align notification counter ([#7490](https://github.com/SAP/ui5-webcomponents/issues/7490)) ([f8975a6](https://github.com/SAP/ui5-webcomponents/commit/f8975a67f81b62d90db1e508a85c3c894e995e95)), closes [#7208](https://github.com/SAP/ui5-webcomponents/issues/7208)
* **ui5-tree:** indentation correction ([#7541](https://github.com/SAP/ui5-webcomponents/issues/7541)) ([5e85b3a](https://github.com/SAP/ui5-webcomponents/commit/5e85b3ac3303ed01323e4f2b88cc745e02c90a1a))
* **ui5-tree:** list item active state implemented ([#7527](https://github.com/SAP/ui5-webcomponents/issues/7527)) ([bbdde51](https://github.com/SAP/ui5-webcomponents/commit/bbdde5154bbe8af3029366aea6464b4a534157ac)), closes [#7121](https://github.com/SAP/ui5-webcomponents/issues/7121)


### Features

* **ui5-toast:** enable permanent visibility with KBH ([#7548](https://github.com/SAP/ui5-webcomponents/issues/7548)) ([5f8def0](https://github.com/SAP/ui5-webcomponents/commit/5f8def0f3e7a836f4ff7d68291ad94b0285b685d))





# [1.17.0](https://github.com/SAP/ui5-webcomponents/compare/v1.17.0-rc.2...v1.17.0) (2023-09-01)


### Bug Fixes

* **ui5-busy-indicator:** fixed text center alignment and wrapping ([f7bda6d](https://github.com/SAP/ui5-webcomponents/commit/f7bda6dc4ece2e8fd9c8682c5ffbb513b6c311cc)), closes [#7470](https://github.com/SAP/ui5-webcomponents/issues/7470)
* **ui5-carousel:** remove outer outline of the arrow on "down" state ([#7511](https://github.com/SAP/ui5-webcomponents/issues/7511)) ([4774bc6](https://github.com/SAP/ui5-webcomponents/commit/4774bc6d684f08c670ae65bc73d3f3ee641c288f))
* **ui5-combobox:** enhance storybook samples ([#7469](https://github.com/SAP/ui5-webcomponents/issues/7469)) ([0f54160](https://github.com/SAP/ui5-webcomponents/commit/0f54160423ef193a591ef748601e1738cc0ce030))
* **ui5-input:** enhance storybook samples ([#7532](https://github.com/SAP/ui5-webcomponents/issues/7532)) ([e48da75](https://github.com/SAP/ui5-webcomponents/commit/e48da755758dc7cc26b0da4a4999d79ed98753ac))
* **ui5-radio-button:** avoid nesting elements with tab-index within each other ([#7488](https://github.com/SAP/ui5-webcomponents/issues/7488)) ([5def83b](https://github.com/SAP/ui5-webcomponents/commit/5def83bb75b520cb57dbdd4c1bf4eb8a54d5990a)), closes [#7419](https://github.com/SAP/ui5-webcomponents/issues/7419)
* **ui5-select:** scroll item into view on keyboard navigation ([#7370](https://github.com/SAP/ui5-webcomponents/issues/7370)) ([8ecd118](https://github.com/SAP/ui5-webcomponents/commit/8ecd1183c2a8b041f444cc8d0814f096e8b2dbd5)), closes [#7164](https://github.com/SAP/ui5-webcomponents/issues/7164)
* **ui5-tabcontainer:** restore indentation in overflow ([#7506](https://github.com/SAP/ui5-webcomponents/issues/7506)) ([039d57e](https://github.com/SAP/ui5-webcomponents/commit/039d57e7f79df561fffdb94209169817cab83d20)), closes [#7505](https://github.com/SAP/ui5-webcomponents/issues/7505)
* **ui5-tabcontainer:** thicken selection border in Horizon HCB/HCW ([#7477](https://github.com/SAP/ui5-webcomponents/issues/7477)) ([ad36491](https://github.com/SAP/ui5-webcomponents/commit/ad36491d6620a666e834812cc78580f4fabda404))
* **ui5-table:** enhance storybook samples ([#7517](https://github.com/SAP/ui5-webcomponents/issues/7517)) ([4e6a56b](https://github.com/SAP/ui5-webcomponents/commit/4e6a56bfaa22fa7ce780f53c37e5e867e30b5507))
* **ui5-textarea:** enhance storybook samples ([#7443](https://github.com/SAP/ui5-webcomponents/issues/7443)) ([e10575d](https://github.com/SAP/ui5-webcomponents/commit/e10575d2d500eb749464bc555e26da6530db73fb))
* **ui5-textarea:** prevent console error on focus out ([#7504](https://github.com/SAP/ui5-webcomponents/issues/7504)) ([31a3608](https://github.com/SAP/ui5-webcomponents/commit/31a3608562ae457f66bb51f7310566664a76a39c))


### Features

* introduce SelectMenu(Option) components ([#7447](https://github.com/SAP/ui5-webcomponents/issues/7447)) ([b21db20](https://github.com/SAP/ui5-webcomponents/commit/b21db20cdedacd97de5d4372add6171f16f00316))
* **ui5-avatar:** functionality for setting custom fallback icon ([#7463](https://github.com/SAP/ui5-webcomponents/issues/7463)) ([0368aab](https://github.com/SAP/ui5-webcomponents/commit/0368aab515f77ab52ede44c6bccaa5f7f80101c9))
* **ui5-badge:** update visual design ([#7501](https://github.com/SAP/ui5-webcomponents/issues/7501)) ([208d992](https://github.com/SAP/ui5-webcomponents/commit/208d992b5707ba5f00de3c1311fcc2425916c2c4))
* **ui5-toolbar:** web component introduced ([#7024](https://github.com/SAP/ui5-webcomponents/issues/7024)) ([2f329fe](https://github.com/SAP/ui5-webcomponents/commit/2f329fe2d237d24f05ed140658e39752d6d9d8ae))





# [1.17.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.17.0-rc.1...v1.17.0-rc.2) (2023-08-24)


### Bug Fixes

* **ui5-input:** apply correct button's box-shadow on hover ([#7439](https://github.com/SAP/ui5-webcomponents/issues/7439)) ([b77db6b](https://github.com/SAP/ui5-webcomponents/commit/b77db6b04579cfa479fe0802406da691edca0b04))
* **ui5-message-strip:** enhance storybook samples ([#7464](https://github.com/SAP/ui5-webcomponents/issues/7464)) ([0283e28](https://github.com/SAP/ui5-webcomponents/commit/0283e28b8993a37b98fc0acfb2e15d6fc6bc77f8))
* **ui5-multi-combobox:** adjust storybook sample ([#7441](https://github.com/SAP/ui5-webcomponents/issues/7441)) ([52562ec](https://github.com/SAP/ui5-webcomponents/commit/52562ecb5f6c91a447210827c0ff27c9f726cf9b))
* **ui5-toast:** enhance storybook samples ([#7451](https://github.com/SAP/ui5-webcomponents/issues/7451)) ([9298747](https://github.com/SAP/ui5-webcomponents/commit/92987476d2238f512bae871aa1b8559a31b0a450))





# [1.17.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.17.0-rc.0...v1.17.0-rc.1) (2023-08-17)


### Bug Fixes

* **ui5-date-picker:** align value state to react binding ([#7396](https://github.com/SAP/ui5-webcomponents/issues/7396)) ([c6e6a7b](https://github.com/SAP/ui5-webcomponents/commit/c6e6a7b5674e4934e590e66d391b731c29101e4a)), closes [#6993](https://github.com/SAP/ui5-webcomponents/issues/6993)
* **ui5-multi-combobox:** adjust 'paste' handling ([#7440](https://github.com/SAP/ui5-webcomponents/issues/7440)) ([dd658c5](https://github.com/SAP/ui5-webcomponents/commit/dd658c561bfcf56a4634355d3ac1b0f0113f9b05)), closes [#7330](https://github.com/SAP/ui5-webcomponents/issues/7330)
* **ui5-select:** fix header on phone & update items on options change ([#7455](https://github.com/SAP/ui5-webcomponents/issues/7455)) ([116594c](https://github.com/SAP/ui5-webcomponents/commit/116594c40fd9ba2800b325f15ab2de9fe10222c8))
* **ui5-split-button:** add css variables for active state ([#7450](https://github.com/SAP/ui5-webcomponents/issues/7450)) ([2885a4d](https://github.com/SAP/ui5-webcomponents/commit/2885a4d276bce1420c4e1589bd1fdc7e98933d05))


### Features

* **framework:** scope css variables per runtime and version ([#7449](https://github.com/SAP/ui5-webcomponents/issues/7449)) ([d3f6c2e](https://github.com/SAP/ui5-webcomponents/commit/d3f6c2efba9cfda389ea4d700a375f75b3e2996b))
* **ui5-menu:** make the item click event cancellable ([#7360](https://github.com/SAP/ui5-webcomponents/issues/7360)) ([18b21bf](https://github.com/SAP/ui5-webcomponents/commit/18b21bfdb90ba2672aeb055d9443f1875cf381c7)), closes [#5600](https://github.com/SAP/ui5-webcomponents/issues/5600)
* **ui5-multi-input, ui5-multi-combobox:** implement popover keyboard handling ([#7368](https://github.com/SAP/ui5-webcomponents/issues/7368)) ([3c047b4](https://github.com/SAP/ui5-webcomponents/commit/3c047b464fb6e6ece4c043531db239f991befd36))





# [1.17.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0...v1.17.0-rc.0) (2023-08-10)


### Features

* **ui5-menu:** add delay between opening and closing submenu and sub menu items ([#7246](https://github.com/SAP/ui5-webcomponents/issues/7246)) ([b46eda5](https://github.com/SAP/ui5-webcomponents/commit/b46eda5a6dccc9b783d40fc33353c6e08b4652e7))





# [1.16.0](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.4...v1.16.0) (2023-08-03)

**Note:** Version bump only for package @ui5/webcomponents





# [1.16.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.3...v1.16.0-rc.4) (2023-08-03)


### Bug Fixes

* **ui5-avatar:** new interaction behavior ([#7374](https://github.com/SAP/ui5-webcomponents/issues/7374)) ([e9011fc](https://github.com/SAP/ui5-webcomponents/commit/e9011fc3b21ffb86cf7d43e57b93b1aa1ebc77d4))
* **ui5-popup:** fix header background and border for Belize theme ([#7384](https://github.com/SAP/ui5-webcomponents/issues/7384)) ([130848b](https://github.com/SAP/ui5-webcomponents/commit/130848be056d0434eee6dab7255b7fdfb67ced5c)), closes [#7353](https://github.com/SAP/ui5-webcomponents/issues/7353)


### Features

* **framework:** support theme dependent custom icon collections ([#7341](https://github.com/SAP/ui5-webcomponents/issues/7341)) ([33967dd](https://github.com/SAP/ui5-webcomponents/commit/33967dd12e31e17828986c7b40a5471c2936f0b7))





# [1.16.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.2...v1.16.0-rc.3) (2023-07-27)


### Bug Fixes

* **ui5-checkbox:** prevent text selection on checkbox ([#7364](https://github.com/SAP/ui5-webcomponents/issues/7364)) ([d6aeb0f](https://github.com/SAP/ui5-webcomponents/commit/d6aeb0fd6871555a1737b02fa18d996b7148751a)), closes [#7236](https://github.com/SAP/ui5-webcomponents/issues/7236)
* **ui5-checkbox:** trigger form validation when required ([#7363](https://github.com/SAP/ui5-webcomponents/issues/7363)) ([0f90a53](https://github.com/SAP/ui5-webcomponents/commit/0f90a53e2d1e353dc0a6cc66f4bc6afb3e4b86b5)), closes [#7319](https://github.com/SAP/ui5-webcomponents/issues/7319)
* **ui5-slider:** remove tag name from base class ([#7373](https://github.com/SAP/ui5-webcomponents/issues/7373)) ([7e47744](https://github.com/SAP/ui5-webcomponents/commit/7e47744806ada5be4e724abd3464f659e26c6193))
* **ui5-switch:** align text/icon properly in switch handle ([#7350](https://github.com/SAP/ui5-webcomponents/issues/7350)) ([5a7f41f](https://github.com/SAP/ui5-webcomponents/commit/5a7f41f3593563ca3ecef5b8006a7a5cef9b63de))
* **ui5-time-picker:** support relative value "now" ([#7325](https://github.com/SAP/ui5-webcomponents/issues/7325)) ([0b2ef4f](https://github.com/SAP/ui5-webcomponents/commit/0b2ef4fe623090f5034b67e5236b485da87c814a))


### Features

* **ui5-avatar:** add disabled property ([#7335](https://github.com/SAP/ui5-webcomponents/issues/7335)) ([d84fc61](https://github.com/SAP/ui5-webcomponents/commit/d84fc61c7f41c6099c242dfdaad44cb3ebc9e1fa))
* **ui5-panel:** panel sticky header implementation ([#7313](https://github.com/SAP/ui5-webcomponents/issues/7313)) ([18c0e4f](https://github.com/SAP/ui5-webcomponents/commit/18c0e4fcbf68acb42357f4f3e2941fffb7911a5d))
* **ui5-switch:** add required property ([#7324](https://github.com/SAP/ui5-webcomponents/issues/7324)) ([0a01918](https://github.com/SAP/ui5-webcomponents/commit/0a019187bfeb52c4a2eacb5385d069034c68d34c))
* **ui5-tokenizer:** change indicator's text when there are no visible tokens ([#7327](https://github.com/SAP/ui5-webcomponents/issues/7327)) ([27f690e](https://github.com/SAP/ui5-webcomponents/commit/27f690ec159c631c4b58023ed0c1cfd080439fb1))





# [1.16.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.1...v1.16.0-rc.2) (2023-07-20)


### Bug Fixes

* **ui5-multi-input:** prevent exception when single token is added ([#7305](https://github.com/SAP/ui5-webcomponents/issues/7305)) ([0d1cc28](https://github.com/SAP/ui5-webcomponents/commit/0d1cc28843f0887c78403cf0c074f1d23e7c4076)), closes [#7304](https://github.com/SAP/ui5-webcomponents/issues/7304)
* **ui5-table:** fix unstable tests ([#7337](https://github.com/SAP/ui5-webcomponents/issues/7337)) ([7a72308](https://github.com/SAP/ui5-webcomponents/commit/7a723081f946b8a1068ecf5d7f20ace6145ef5bf))
* **ui5-time-picker:** add explicit dep to SegmentedBtnItem ([#7347](https://github.com/SAP/ui5-webcomponents/issues/7347)) ([71f96cd](https://github.com/SAP/ui5-webcomponents/commit/71f96cdfd18ae24bbf4186073d42f892e7bd6d92))
* **ui5:** change "focus-visible" pseudo selector to "focus" ([#7338](https://github.com/SAP/ui5-webcomponents/issues/7338)) ([37505c3](https://github.com/SAP/ui5-webcomponents/commit/37505c3f4e5dfe1c23fba7b5ee675312752f7ef5))


### Features

* **ui5-multicombobox:** selection-change event is now preventable ([#7309](https://github.com/SAP/ui5-webcomponents/issues/7309)) ([23c683f](https://github.com/SAP/ui5-webcomponents/commit/23c683fc12e538c230cc14a46a41781245a7a033))
* update @ui5/webcomponents-icons to 5.05 & 4.17 ([#7315](https://github.com/SAP/ui5-webcomponents/issues/7315)) ([2c9730b](https://github.com/SAP/ui5-webcomponents/commit/2c9730b6d4d4a8445671b2b7e41c364d3abf32e2)), closes [#7210](https://github.com/SAP/ui5-webcomponents/issues/7210)





# [1.16.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.16.0-rc.0...v1.16.0-rc.1) (2023-07-13)


### Bug Fixes

* **ui5-li:** remove additional text width restriction ([#7274](https://github.com/SAP/ui5-webcomponents/issues/7274)) ([d80dbac](https://github.com/SAP/ui5-webcomponents/commit/d80dbac326af54e9f70635c35a1593bc1d3b55c7)), closes [#6937](https://github.com/SAP/ui5-webcomponents/issues/6937)
* **ui5-list:** avoid close event conflicts ([#7272](https://github.com/SAP/ui5-webcomponents/issues/7272)) ([0b7617e](https://github.com/SAP/ui5-webcomponents/commit/0b7617e65783a5788b4754001e5842778b7d8670))
* **ui5-tabcontainer:** remove extra padding from overflow menu ([#7316](https://github.com/SAP/ui5-webcomponents/issues/7316)) ([1705972](https://github.com/SAP/ui5-webcomponents/commit/1705972af8960bed7561142443a2428b44dd7528))
* **ui5-token:** adjust Horizon themes according to the specification ([#7266](https://github.com/SAP/ui5-webcomponents/issues/7266)) ([133ce18](https://github.com/SAP/ui5-webcomponents/commit/133ce189cfddd4d548fa21ecf31b65b30e8fdee1))


### Features

* **ui5-tabcontainer:** implement latest SAP Horizon design ([#7257](https://github.com/SAP/ui5-webcomponents/issues/7257)) ([9ee9ec4](https://github.com/SAP/ui5-webcomponents/commit/9ee9ec4f9e3c45b07e90d28b0f1253b5d1091623))





# [1.16.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.15.1...v1.16.0-rc.0) (2023-07-06)


### Features

* **ui5-progress-indicator:** accessibleName property added ([#7231](https://github.com/SAP/ui5-webcomponents/issues/7231)) ([ca66fd7](https://github.com/SAP/ui5-webcomponents/commit/ca66fd74dd88f0749f51fc94a52b10ab26e0985d))





# [1.15.0](https://github.com/SAP/ui5-webcomponents/compare/v1.15.0-rc.2...v1.15.0) (2023-06-30)


### Bug Fixes

* **ui5-button:** prevent event throw on mobile when disabled ([#7254](https://github.com/SAP/ui5-webcomponents/issues/7254)) ([337a5fa](https://github.com/SAP/ui5-webcomponents/commit/337a5fa14a6b42af5e20bbb4499ad8ffac04760d)), closes [#7249](https://github.com/SAP/ui5-webcomponents/issues/7249)
* **ui5-link:** change width to max-width ([#7233](https://github.com/SAP/ui5-webcomponents/issues/7233)) ([3be7358](https://github.com/SAP/ui5-webcomponents/commit/3be7358c6870e4305527e96f63bcaf1abb139861))
* **ui5-range-slider:** adjust hover state visualization ([#7232](https://github.com/SAP/ui5-webcomponents/issues/7232)) ([0ee7b8e](https://github.com/SAP/ui5-webcomponents/commit/0ee7b8e56e8a112922af39335f66124c636ab618))
* **ui5-segmented-button:** support custom width configuration ([#6969](https://github.com/SAP/ui5-webcomponents/issues/6969)) ([f448af4](https://github.com/SAP/ui5-webcomponents/commit/f448af41d12776360a5235544f7a43e9b548dec4))
* **ui5-shellbar:** align notification counter badge ([#7208](https://github.com/SAP/ui5-webcomponents/issues/7208)) ([1ee67f5](https://github.com/SAP/ui5-webcomponents/commit/1ee67f570ac722983859690fb602c5b62498d6d5))
* **ui5-tabcontainer:** fix height in compact ([#7280](https://github.com/SAP/ui5-webcomponents/issues/7280)) ([3c4a806](https://github.com/SAP/ui5-webcomponents/commit/3c4a8067e7763e282edfc5ea5179122b683aed21))


### Features

* **ui5-rating-indicator:** add required and accessibleNameRef properties ([#7185](https://github.com/SAP/ui5-webcomponents/issues/7185)) ([3cb09c6](https://github.com/SAP/ui5-webcomponents/commit/3cb09c690d22d2c12eba8c6aa23bc60f70b6b890))
* **ui5-tokenizer:** truncate when having 1 token with long text ([e9a7580](https://github.com/SAP/ui5-webcomponents/commit/e9a75802205f52437380611487f456486f75705b)), closes [#5229](https://github.com/SAP/ui5-webcomponents/issues/5229)





# [1.15.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.15.0-rc.1...v1.15.0-rc.2) (2023-06-22)


### Bug Fixes

* **framework:** support older OpenUI5 getThemeRoot API ([#7202](https://github.com/SAP/ui5-webcomponents/issues/7202)) ([54e615c](https://github.com/SAP/ui5-webcomponents/commit/54e615cffc047b8e1e72861a5be7d50bfcc2d6bf)), closes [#7199](https://github.com/SAP/ui5-webcomponents/issues/7199)
* **ui5-combobox:** prevent selection of multiple items ([#7223](https://github.com/SAP/ui5-webcomponents/issues/7223)) ([bb41f78](https://github.com/SAP/ui5-webcomponents/commit/bb41f78e838b6c1f601b9c06bd057c1629fc0540))
* **ui5-combobox:** remove position announcement for group header items ([#7214](https://github.com/SAP/ui5-webcomponents/issues/7214)) ([2cc9d18](https://github.com/SAP/ui5-webcomponents/commit/2cc9d18852bd44037a7f22df9311ab34b3b8e9bd))
* **ui5-multi-combobox:** delete value after OK button is pressed ([#7221](https://github.com/SAP/ui5-webcomponents/issues/7221)) ([26f0f79](https://github.com/SAP/ui5-webcomponents/commit/26f0f79d636facf8787f5b85b1c19467af9fa82c))
* **ui5-multicombobox:** improve paste functionality ([#7190](https://github.com/SAP/ui5-webcomponents/issues/7190)) ([dd438be](https://github.com/SAP/ui5-webcomponents/commit/dd438becc76e925b1f90062fb063ed579c3358be))
* **ui5-side-navigation:** cursor is pointer for selected items ([#7229](https://github.com/SAP/ui5-webcomponents/issues/7229)) ([9292c6e](https://github.com/SAP/ui5-webcomponents/commit/9292c6e51fc49b6bc0abe6e525074173ae80e253)), closes [#7156](https://github.com/SAP/ui5-webcomponents/issues/7156)


### Features

* **ui5-radio-button:** update visual design to latest Horizon spec ([#7148](https://github.com/SAP/ui5-webcomponents/issues/7148)) ([7768cec](https://github.com/SAP/ui5-webcomponents/commit/7768cecba2b09ccf85e5519d72f5b7fa186e3da0)), closes [#7001](https://github.com/SAP/ui5-webcomponents/issues/7001)
* **ui5-side-navigation:** update Horizon theme design ([#7186](https://github.com/SAP/ui5-webcomponents/issues/7186)) ([819d153](https://github.com/SAP/ui5-webcomponents/commit/819d153ba5d82c0e48a642d2ee21ccc0fb61e253)), closes [#7160](https://github.com/SAP/ui5-webcomponents/issues/7160)





# [1.15.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.15.0-rc.0...v1.15.0-rc.1) (2023-06-15)


### Bug Fixes

* **framework:** prioritize external fonts over locally installed ([#7184](https://github.com/SAP/ui5-webcomponents/issues/7184)) ([c527c70](https://github.com/SAP/ui5-webcomponents/commit/c527c70e47be84b663b6c40107737c25f91c9034)), closes [/github.com/SAP/openui5/blob/master/src/themelib_sap_horizon/src/sap/ui/core/themes/sap_horizon/shared.less#L259](https://github.com//github.com/SAP/openui5/blob/master/src/themelib_sap_horizon/src/sap/ui/core/themes/sap_horizon/shared.less/issues/L259) [#7177](https://github.com/SAP/ui5-webcomponents/issues/7177)
* **ui5-progress-indicator:** align icon value with VD ([#7167](https://github.com/SAP/ui5-webcomponents/issues/7167)) ([7101f27](https://github.com/SAP/ui5-webcomponents/commit/7101f2790e79945a4801de9678a74e8d08c051b6))
* **ui5-table:** correct width in case of no-data ([#7163](https://github.com/SAP/ui5-webcomponents/issues/7163)) ([f5838a8](https://github.com/SAP/ui5-webcomponents/commit/f5838a8d8fb9e6f00237244c18c036de0e9244e9))
* **ui5-textarea, ui5-select:** collision of 'popover' property with Google Chrome  ([#7162](https://github.com/SAP/ui5-webcomponents/issues/7162)) ([6066d46](https://github.com/SAP/ui5-webcomponents/commit/6066d46521e654dc77abcecaa01cd95efe8675ae))


### Features

* **ui5-li:** provide option to set custom aria-setsize ([#7187](https://github.com/SAP/ui5-webcomponents/issues/7187)) ([8ab1c2d](https://github.com/SAP/ui5-webcomponents/commit/8ab1c2d9159223f47bf2d463b8ce7b80f8539a33))
* **ui5-time-picker:** Redesign the Time Picker component according to the new design ([#6818](https://github.com/SAP/ui5-webcomponents/issues/6818)) ([1d910cf](https://github.com/SAP/ui5-webcomponents/commit/1d910cf47290fcd9986b0b9ced45c9c06e29d657))









# [1.15.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.14.0...v1.15.0-rc.0) (2023-06-08)


### Bug Fixes

* **ui5-calendar:** prevent focus loss during arrow navigation with mouse/touch ([#6957](https://github.com/SAP/ui5-webcomponents/issues/6957)) ([216f6a7](https://github.com/SAP/ui5-webcomponents/commit/216f6a7a476d18a0f6fdf7ff189f953085e30b47))
* **ui5-shellbar:** improve RTL styling of searchField ([#7089](https://github.com/SAP/ui5-webcomponents/issues/7089)) ([9373abf](https://github.com/SAP/ui5-webcomponents/commit/9373abfd0114650069855419f1caeb2fc5462114)), closes [#7065](https://github.com/SAP/ui5-webcomponents/issues/7065)


### Features

* **ui5-button:** type property added ([#7157](https://github.com/SAP/ui5-webcomponents/issues/7157)) ([0effdf7](https://github.com/SAP/ui5-webcomponents/commit/0effdf76fb4e337cbba6ac8826d8052af6779c85))





# [1.14.0](https://github.com/SAP/ui5-webcomponents/compare/v1.14.0-rc.2...v1.14.0) (2023-06-01)


### Bug Fixes

* **ui5-dialog:** add text with instructions for resizing or dragging of dialog fo… ([#6989](https://github.com/SAP/ui5-webcomponents/issues/6989)) ([74c877b](https://github.com/SAP/ui5-webcomponents/commit/74c877b2fd674711a331ab4716c89df3cd50c3fa)), closes [#6659](https://github.com/SAP/ui5-webcomponents/issues/6659)





# [1.14.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.14.0-rc.1...v1.14.0-rc.2) (2023-06-01)


### Bug Fixes

* **ui5-avatar:** aria-label added to initials ([#6967](https://github.com/SAP/ui5-webcomponents/issues/6967)) ([c89c5d3](https://github.com/SAP/ui5-webcomponents/commit/c89c5d30615308708c1d219264d3c4773fe5a825))
* **ui5-carousel:** update carousel horizon theme ([#6984](https://github.com/SAP/ui5-webcomponents/issues/6984)) ([ecaa0e7](https://github.com/SAP/ui5-webcomponents/commit/ecaa0e79b836c928114d592fe0a6faea94e61ae4))
* **ui5-datetime-picker/ui5-time-picker:** fix top and bottom overflows of input ([#6886](https://github.com/SAP/ui5-webcomponents/issues/6886)) ([5c995bf](https://github.com/SAP/ui5-webcomponents/commit/5c995bf378e305296917b2636abdfcf4ddf81958))
* **ui5-file-uploader:** align vertically input and the button ([#7058](https://github.com/SAP/ui5-webcomponents/issues/7058)) ([1bf009a](https://github.com/SAP/ui5-webcomponents/commit/1bf009a6bd9bca9b3d4b0ed914cc6d98efc3fac7))
* **ui5-label:** colon symbol is now language-dependent ([#7090](https://github.com/SAP/ui5-webcomponents/issues/7090)) ([d0f4c8f](https://github.com/SAP/ui5-webcomponents/commit/d0f4c8fe79d225afb7111f5e26e14216702d7aff))
* **ui5-popup:** cancel focus application if the popup is removed from the DOM in the meantime ([#7084](https://github.com/SAP/ui5-webcomponents/issues/7084)) ([9c03282](https://github.com/SAP/ui5-webcomponents/commit/9c0328229e56a100e8f7282ef84f37dc8f93aace))


### Features

* **ui5-calendar:** update visual design to latest SAP Horizon spec ([#6953](https://github.com/SAP/ui5-webcomponents/issues/6953)) ([f11032a](https://github.com/SAP/ui5-webcomponents/commit/f11032a0a7f9448fb78275983ea04f4bf0b3e5b2))
* **ui5-link:** update visual design according to the latest Horizon spec ([#6988](https://github.com/SAP/ui5-webcomponents/issues/6988)) ([3cce241](https://github.com/SAP/ui5-webcomponents/commit/3cce24166c333f1d8bfbde92bb1226d228ebd709)), closes [#6999](https://github.com/SAP/ui5-webcomponents/issues/6999)
* **ui5-menu:** dispatch ui5-before-open for the sub-menus ([#7064](https://github.com/SAP/ui5-webcomponents/issues/7064)) ([e4a7f2d](https://github.com/SAP/ui5-webcomponents/commit/e4a7f2d514debea41b4620ea806dbd49821e3394)), closes [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131) [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131) [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131) [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131) [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131) [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131) [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131) [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131) [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131)
* **ui5-segmented-button:** enable multiple selection ([#6959](https://github.com/SAP/ui5-webcomponents/issues/6959)) ([f8f44e4](https://github.com/SAP/ui5-webcomponents/commit/f8f44e41ac55c0d3c4b1a72648043a1cc9652437))
* **ui5-select:** change event is now preventable ([#7113](https://github.com/SAP/ui5-webcomponents/issues/7113)) ([9c851c5](https://github.com/SAP/ui5-webcomponents/commit/9c851c5a65094926360530eb3e6cc6050e1f8ce6)), closes [#6648](https://github.com/SAP/ui5-webcomponents/issues/6648)





# [1.14.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.14.0-rc.0...v1.14.0-rc.1) (2023-05-25)


### Bug Fixes

* **ui5-dialog:** center dragged or resized dialog on window resize ([#7069](https://github.com/SAP/ui5-webcomponents/issues/7069)) ([99280ec](https://github.com/SAP/ui5-webcomponents/commit/99280ec15feb912e8b96b5a4837f302a2b8bbb1e))
* **ui5-dialog:** fix focus bug in safari ([#7041](https://github.com/SAP/ui5-webcomponents/issues/7041)) ([821735f](https://github.com/SAP/ui5-webcomponents/commit/821735f1314b7fb92736b87ee3cdf09f426a45df)), closes [#6768](https://github.com/SAP/ui5-webcomponents/issues/6768)
* **ui5-file-uploader:** align form controls vertically ([#7029](https://github.com/SAP/ui5-webcomponents/issues/7029)) ([13e2635](https://github.com/SAP/ui5-webcomponents/commit/13e26352b1b5ac2481afe4c7d979514bc28e89f1))
* **ui5-popover:** update horizon theme ([#6987](https://github.com/SAP/ui5-webcomponents/issues/6987)) ([f2dd0b6](https://github.com/SAP/ui5-webcomponents/commit/f2dd0b67dbdfe7c52ccc88d81f2c2e4487672ce2))
* **ui5-switch:** fix truncation when text spacing is applied ([#7071](https://github.com/SAP/ui5-webcomponents/issues/7071)) ([94f04a2](https://github.com/SAP/ui5-webcomponents/commit/94f04a23e657cf9fe780cdbd8c9a350b2e0a27b8))
* **ui5-tab:** stable dom ref is now the same as the dom ref ([#7074](https://github.com/SAP/ui5-webcomponents/issues/7074)) ([a35724f](https://github.com/SAP/ui5-webcomponents/commit/a35724fec0c0cb0cb22d502643b57821c034a056))
* **ui5-token:** adjust styles to latest specification ([#6996](https://github.com/SAP/ui5-webcomponents/issues/6996)) ([20e71fa](https://github.com/SAP/ui5-webcomponents/commit/20e71fadb5c054b07e55659f3467d1bc902cefd9))
* **ui5-tree:** tree list is re-rendered when the tree changes ([#7066](https://github.com/SAP/ui5-webcomponents/issues/7066)) ([5d22994](https://github.com/SAP/ui5-webcomponents/commit/5d2299454473f8cbb9d20516cab5e26ef76b5a92))


### Features

* **framework:** add `setThemeRoot` public API ([#6970](https://github.com/SAP/ui5-webcomponents/issues/6970)) ([a0ad904](https://github.com/SAP/ui5-webcomponents/commit/a0ad904ea21578ada97dc0c990ec04dbb5072990))
* **ui5-list:** selection-change event is now preventable ([#7007](https://github.com/SAP/ui5-webcomponents/issues/7007)) ([f08638a](https://github.com/SAP/ui5-webcomponents/commit/f08638a427a13b91ed0100d985ddd801e2e02eed)), closes [#6589](https://github.com/SAP/ui5-webcomponents/issues/6589)





# [1.14.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.13.2...v1.14.0-rc.0) (2023-05-18)


### Bug Fixes

* **ui5-multi-combobox:** delete duplicated tests ([#7036](https://github.com/SAP/ui5-webcomponents/issues/7036)) ([2b9bf7f](https://github.com/SAP/ui5-webcomponents/commit/2b9bf7f419ae7cccf0e9a086a6e5047b41597c23))
* **ui5-textarea:** adjust Horizon themes according to the latest specifications ([#7012](https://github.com/SAP/ui5-webcomponents/issues/7012)) ([a066527](https://github.com/SAP/ui5-webcomponents/commit/a066527306ce33e518a0d52dc94c87c3acafab37))


### Features

* **framework:** add `ignoreCustomElements` public API ([#7027](https://github.com/SAP/ui5-webcomponents/issues/7027)) ([776f905](https://github.com/SAP/ui5-webcomponents/commit/776f9058de5b4e37489dd3ef388863edc2627eb3))
* **framework:** use `template literal notation` for enum types ([#6856](https://github.com/SAP/ui5-webcomponents/issues/6856)) ([0de21e8](https://github.com/SAP/ui5-webcomponents/commit/0de21e8ba37c6a75fd3d2a29a16cc82661619cb1)), closes [#6636](https://github.com/SAP/ui5-webcomponents/issues/6636)
* **ui5-table:** announce empty cells ([#7013](https://github.com/SAP/ui5-webcomponents/issues/7013)) ([a884c87](https://github.com/SAP/ui5-webcomponents/commit/a884c87c7d5ce1838fc580442f314d34a3631c2e)), closes [#3594](https://github.com/SAP/ui5-webcomponents/issues/3594)





## [1.13.2](https://github.com/SAP/ui5-webcomponents/compare/v1.13.1...v1.13.2) (2023-05-15)


### Bug Fixes

* **ui5-input:** apply content-box to all slotted icons with !important ([#6948](https://github.com/SAP/ui5-webcomponents/issues/6948)) ([de89ea0](https://github.com/SAP/ui5-webcomponents/commit/de89ea0e00e942a7cea02d1fa04252c1fb6d2fc1)), closes [#6071](https://github.com/SAP/ui5-webcomponents/issues/6071)





## [1.13.1](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.5...v1.13.1) (2023-05-11)


### Bug Fixes

* **ui5-tree:** rtl styling fixes ([#7019](https://github.com/SAP/ui5-webcomponents/issues/7019)) ([88a63ee](https://github.com/SAP/ui5-webcomponents/commit/88a63eefa161b0576dc635cf2b16ecb1e27afacb)), closes [#6892](https://github.com/SAP/ui5-webcomponents/issues/6892)





# [1.13.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.4...v1.13.0-rc.5) (2023-05-11)


### Bug Fixes

* **ui5-carousel:** align arrows relative to the content ([#6975](https://github.com/SAP/ui5-webcomponents/issues/6975)) ([623d1ec](https://github.com/SAP/ui5-webcomponents/commit/623d1ecb249b4c09db4ffb530ede87f50d83970b)), closes [#6954](https://github.com/SAP/ui5-webcomponents/issues/6954)
* **ui5-date-time-picker:** fix test ([#7005](https://github.com/SAP/ui5-webcomponents/issues/7005)) ([9e07724](https://github.com/SAP/ui5-webcomponents/commit/9e0772476d20c65c6981e2ca930d9a09bbb62af7))
* **ui5-multi-combobox:** prevent exception on mobile device ([#6983](https://github.com/SAP/ui5-webcomponents/issues/6983)) ([ccaf3c9](https://github.com/SAP/ui5-webcomponents/commit/ccaf3c969dee8bfe3dd9850ee196c9f07ffc6e9f))


### Features

* **ui5-calendar,ui5-date*picker:** add static format (ISO) support for min/max dates ([#6955](https://github.com/SAP/ui5-webcomponents/issues/6955)) ([a89afbf](https://github.com/SAP/ui5-webcomponents/commit/a89afbf9088ea9cbf892468a9de4d98ac236cfec)), closes [#6885](https://github.com/SAP/ui5-webcomponents/issues/6885)





# [1.13.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.3...v1.13.0-rc.4) (2023-05-04)


### Bug Fixes

* add missing file-extensions for ESM support ([#6971](https://github.com/SAP/ui5-webcomponents/issues/6971)) ([1f42d0c](https://github.com/SAP/ui5-webcomponents/commit/1f42d0c658a437d64000c0f9b7562edff85b8421))
* **ui5-avatar:** avatar initials correct display ([#6731](https://github.com/SAP/ui5-webcomponents/issues/6731)) ([16e6307](https://github.com/SAP/ui5-webcomponents/commit/16e630735fc607061f34b6fec6a5befe0727982f)), closes [#6642](https://github.com/SAP/ui5-webcomponents/issues/6642)
* **ui5-input:** adjust Horizon themes according to the latest specifications ([#6965](https://github.com/SAP/ui5-webcomponents/issues/6965)) ([ce3707c](https://github.com/SAP/ui5-webcomponents/commit/ce3707cfd9d2dfc18f749efb61577ecab9582aaa))
* **ui5-tabcontainer:** bottom align tab strip item text with no additional text ([#6950](https://github.com/SAP/ui5-webcomponents/issues/6950)) ([089bf3f](https://github.com/SAP/ui5-webcomponents/commit/089bf3fef71913d6feffe2d8255335c756cd5ab4))


### Features

* generate TS from HBS templates ([#6558](https://github.com/SAP/ui5-webcomponents/issues/6558)) ([02611b2](https://github.com/SAP/ui5-webcomponents/commit/02611b2e24b2c2a06129b8e60a8bc680d9501e39))





# [1.13.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.2...v1.13.0-rc.3) (2023-04-27)


### Bug Fixes

* **ui5-dialog:** always wait for applying of initial focus to complete ([#6912](https://github.com/SAP/ui5-webcomponents/issues/6912)) ([f10c251](https://github.com/SAP/ui5-webcomponents/commit/f10c25147bf919c5c732640e36971c6b027a7fc1)), closes [#6768](https://github.com/SAP/ui5-webcomponents/issues/6768)
* **ui5-input:** remove double border of input in dialog on phone ([#6946](https://github.com/SAP/ui5-webcomponents/issues/6946)) ([1d3c911](https://github.com/SAP/ui5-webcomponents/commit/1d3c9117b24464bd0be0f83511cc9380e79a16c2)), closes [#6943](https://github.com/SAP/ui5-webcomponents/issues/6943)
* **ui5-tabcontainer:** correct focus outline ([#6922](https://github.com/SAP/ui5-webcomponents/issues/6922)) ([c68133e](https://github.com/SAP/ui5-webcomponents/commit/c68133eaae691865e47d5e06e636e4eba7b9a605))


### Features

* **ui5-checkbox, ui5-icon:** added new part attribute to the root element ([#6949](https://github.com/SAP/ui5-webcomponents/issues/6949)) ([dc4ace1](https://github.com/SAP/ui5-webcomponents/commit/dc4ace1e6e92f66d518ce97865a735a55cf97874)), closes [#6461](https://github.com/SAP/ui5-webcomponents/issues/6461) [#6474](https://github.com/SAP/ui5-webcomponents/issues/6474)
* **ui5-checkbox:** adjusted to new Horizon theme specification ([#6951](https://github.com/SAP/ui5-webcomponents/issues/6951)) ([553d0bd](https://github.com/SAP/ui5-webcomponents/commit/553d0bd0b3b9cd564486c410388ad85e79536b06))
* **ui5-menu:** provide busy indicator display ([#6866](https://github.com/SAP/ui5-webcomponents/issues/6866)) ([deb6685](https://github.com/SAP/ui5-webcomponents/commit/deb66857c47f469cd055dd26c3f63521005f34c9)), closes [#6131](https://github.com/SAP/ui5-webcomponents/issues/6131)
* **ui5-title:** add custom overstyles when used with Link ([#6932](https://github.com/SAP/ui5-webcomponents/issues/6932)) ([e1b65ef](https://github.com/SAP/ui5-webcomponents/commit/e1b65efe05f8621afaa9b9890ec4d8490114a855)), closes [#6785](https://github.com/SAP/ui5-webcomponents/issues/6785)





# [1.13.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.1...v1.13.0-rc.2) (2023-04-20)


### Bug Fixes

* **ui5-panel:** adjust panel content padding ([#6869](https://github.com/SAP/ui5-webcomponents/issues/6869)) ([bfa9d06](https://github.com/SAP/ui5-webcomponents/commit/bfa9d06b1905593adcf7a168b9e1b2d38208f329))
* **ui5-table:** correct row height in Safari ([#6903](https://github.com/SAP/ui5-webcomponents/issues/6903)) ([8ab20d9](https://github.com/SAP/ui5-webcomponents/commit/8ab20d9ec20e9d64ded0d1a63766711210e9f7b0))





# [1.13.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.13.0-rc.0...v1.13.0-rc.1) (2023-04-13)


### Bug Fixes

* **u5-tree-item:** correct text alignment on truncation ([#6879](https://github.com/SAP/ui5-webcomponents/issues/6879)) ([d146aca](https://github.com/SAP/ui5-webcomponents/commit/d146aca53f4f92fc49219ab4a9865e82ce6b99e6))
* **ui5-avatar-group, ui5-breadcrumbs:** expand width to fill container ([#6873](https://github.com/SAP/ui5-webcomponents/issues/6873)) ([7fcdbbc](https://github.com/SAP/ui5-webcomponents/commit/7fcdbbcfb1986fccc7380142b3d3f72f5b53e05f))
* **ui5-color-picker:** fix incorrect input state after invalid values ([#6870](https://github.com/SAP/ui5-webcomponents/issues/6870)) ([5e22b70](https://github.com/SAP/ui5-webcomponents/commit/5e22b7040c0cc310b9f8b42139fbff5bace42765))
* **ui5-menu:** fix children closing unexpectedly when opener is right aligned ([#6894](https://github.com/SAP/ui5-webcomponents/issues/6894)) ([e1e8cf5](https://github.com/SAP/ui5-webcomponents/commit/e1e8cf5e283903a3a10fc9711b3e96e6e465aa7e)), closes [#5802](https://github.com/SAP/ui5-webcomponents/issues/5802)
* **ui5-select:** close picker on selection ([#6883](https://github.com/SAP/ui5-webcomponents/issues/6883)) ([2189681](https://github.com/SAP/ui5-webcomponents/commit/218968188ab799ad7371d7ec4dd6b28c4ccf85bd))
* **ui5-table:** prevent Safari from crashing ([#6888](https://github.com/SAP/ui5-webcomponents/issues/6888)) ([ae11e1d](https://github.com/SAP/ui5-webcomponents/commit/ae11e1d7389711e78808819057bf9fa741e5b8af)), closes [#6570](https://github.com/SAP/ui5-webcomponents/issues/6570)


### Features

* **localization:** add `timezone` support [experimental] ([#6857](https://github.com/SAP/ui5-webcomponents/issues/6857)) ([aa91fd1](https://github.com/SAP/ui5-webcomponents/commit/aa91fd136f8bff757d476b83444f963d4299d562))





# [1.13.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0...v1.13.0-rc.0) (2023-04-06)


### Bug Fixes

* **ui5-input, ui5-button:** align form controls vertically ([#6860](https://github.com/SAP/ui5-webcomponents/issues/6860)) ([88582d6](https://github.com/SAP/ui5-webcomponents/commit/88582d632dc7c7a76f138eefd1ab5b3ada71b79e))





# [1.12.0](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0-rc.3...v1.12.0) (2023-04-04)


### Bug Fixes

* **theming:** fix icons version display for custom themes (built via the ThemeDesigner) ([#6815](https://github.com/SAP/ui5-webcomponents/issues/6815)) ([63ff800](https://github.com/SAP/ui5-webcomponents/commit/63ff8007889a66efae074fc6b4dbcb1b7ea36713)), closes [#6758](https://github.com/SAP/ui5-webcomponents/issues/6758)
* **ui5-checkbox:** apply correct styles to down state ([#6824](https://github.com/SAP/ui5-webcomponents/issues/6824)) ([c7c186d](https://github.com/SAP/ui5-webcomponents/commit/c7c186d048ed3a38941610e319a2568b9e92073a))
* **ui5-daypicker:** date selection range light blue indication ([#6836](https://github.com/SAP/ui5-webcomponents/issues/6836)) ([d16cf33](https://github.com/SAP/ui5-webcomponents/commit/d16cf33ef9418d7ae8857845709dd618593a3d96)), closes [#6781](https://github.com/SAP/ui5-webcomponents/issues/6781)
* **ui5-progress-indicator:** disabled opacity fix ([#6808](https://github.com/SAP/ui5-webcomponents/issues/6808)) ([1174b48](https://github.com/SAP/ui5-webcomponents/commit/1174b486d2df234b3e295af4e3d95158751bf58b))





# [1.12.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0-rc.2...v1.12.0-rc.3) (2023-03-30)


### Bug Fixes

* **ui5-avatar:** documentation fix ([#6822](https://github.com/SAP/ui5-webcomponents/issues/6822)) ([e0ec2eb](https://github.com/SAP/ui5-webcomponents/commit/e0ec2eb6374df16e3b9f993075662ae13924b9c8))
* **ui5-busy-indicator:** height of the root element inherits the height of the Busy Indicator ([#6805](https://github.com/SAP/ui5-webcomponents/issues/6805)) ([3659ca0](https://github.com/SAP/ui5-webcomponents/commit/3659ca08351f8dccfd7a7505e958f1b8b53c9795)), closes [#6668](https://github.com/SAP/ui5-webcomponents/issues/6668)
* **ui5-list:** forward focus behaviour ([#6790](https://github.com/SAP/ui5-webcomponents/issues/6790)) ([3ac819c](https://github.com/SAP/ui5-webcomponents/commit/3ac819c6e56953a133cd3ecf5cc703b45c561cea))
* **ui5-multi-combobox:** prevent focus lost after token deletion ([#6734](https://github.com/SAP/ui5-webcomponents/issues/6734)) ([d23b8d7](https://github.com/SAP/ui5-webcomponents/commit/d23b8d7ca2dcf0319fd87abd109b9ead6b0b76a3)), closes [#6671](https://github.com/SAP/ui5-webcomponents/issues/6671)
* **ui5-select:** selected option is announced on dropdown open ([#6733](https://github.com/SAP/ui5-webcomponents/issues/6733)) ([6a6f87f](https://github.com/SAP/ui5-webcomponents/commit/6a6f87f64db0b61c41369e7c7414e800435a848d))
* **ui5-textarea:** apply correct styles to value state None ([#6804](https://github.com/SAP/ui5-webcomponents/issues/6804)) ([6f7a22b](https://github.com/SAP/ui5-webcomponents/commit/6f7a22b2ba58c92fcfa947df7787a406152b26c4))


### Features

* **ui5-button:** propagate icon default title to button ([#6719](https://github.com/SAP/ui5-webcomponents/issues/6719)) ([575039e](https://github.com/SAP/ui5-webcomponents/commit/575039e03dacc49b353afefe4a9bc97998a1354e)), closes [#5733](https://github.com/SAP/ui5-webcomponents/issues/5733)
* **ui5-calendar:** focus the nearest day when today is out of range ([#6801](https://github.com/SAP/ui5-webcomponents/issues/6801)) ([e67a442](https://github.com/SAP/ui5-webcomponents/commit/e67a44273146fdb32ce8f4538ec26ba1e6135dc2)), closes [#6750](https://github.com/SAP/ui5-webcomponents/issues/6750)





# [1.12.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0-rc.1...v1.12.0-rc.2) (2023-03-23)


### Bug Fixes

* inline sources in the .map file so the src folder is not mandatory ([#6732](https://github.com/SAP/ui5-webcomponents/issues/6732)) ([16771a6](https://github.com/SAP/ui5-webcomponents/commit/16771a64d7b13f418af9afa1a03b224fe3762775))


### Reverts

* Revert "chore: add missing ui5- prefix to component events in .hbs files" (#6740) ([a151e15](https://github.com/SAP/ui5-webcomponents/commit/a151e15f5d40b9ed290f67d413c203a7ac5c26a0)), closes [#6740](https://github.com/SAP/ui5-webcomponents/issues/6740) [#6565](https://github.com/SAP/ui5-webcomponents/issues/6565)





# [1.12.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.12.0-rc.0...v1.12.0-rc.1) (2023-03-16)


### Bug Fixes

* **ui5-breadcrumbs:** import used arrow-down icon ([#6685](https://github.com/SAP/ui5-webcomponents/issues/6685)) ([3a000ce](https://github.com/SAP/ui5-webcomponents/commit/3a000ce0c4d1e15537209068226bced3381b0bba))
* **ui5-combobox:** fire selection-change correctly ([#6652](https://github.com/SAP/ui5-webcomponents/issues/6652)) ([3d70b44](https://github.com/SAP/ui5-webcomponents/commit/3d70b4472521a8775062dad5f1246060c1a36754))
* **ui5-date-picker:** change and restore value if change event is prevented ([#6693](https://github.com/SAP/ui5-webcomponents/issues/6693)) ([597017f](https://github.com/SAP/ui5-webcomponents/commit/597017f7adda2985cf64bd040d32eabca55e5770))
* **ui5-icon:** aria-label change ([#6584](https://github.com/SAP/ui5-webcomponents/issues/6584)) ([932f451](https://github.com/SAP/ui5-webcomponents/commit/932f451c701a0ecebac7d17023d7b6c68af855ac))
* **ui5-input:** remove field value when cleared in change event handler ([#6417](https://github.com/SAP/ui5-webcomponents/issues/6417)) ([aeca9ac](https://github.com/SAP/ui5-webcomponents/commit/aeca9aca0d3ca02d8cff80beffedba9e21e05af4)), closes [#6249](https://github.com/SAP/ui5-webcomponents/issues/6249)
* **ui5-popover:** flip horizontalAlign Right with Left and vice versa in RTL ([#6645](https://github.com/SAP/ui5-webcomponents/issues/6645)) ([043a263](https://github.com/SAP/ui5-webcomponents/commit/043a263a3ffb3ea34f90970e39235dd42fd588fa))
* **ui5-split-button:** align styles in icon only mode ([#6697](https://github.com/SAP/ui5-webcomponents/issues/6697)) ([dbdf625](https://github.com/SAP/ui5-webcomponents/commit/dbdf625a49b391028a7ff92d0a9c68a4f4bdd3da)), closes [#6688](https://github.com/SAP/ui5-webcomponents/issues/6688)
* **ui5-step-input:** align style to specification ([#6699](https://github.com/SAP/ui5-webcomponents/issues/6699)) ([85b4f8e](https://github.com/SAP/ui5-webcomponents/commit/85b4f8e52528f70c5829e7d3c4d4caecdaf32da0)), closes [#6687](https://github.com/SAP/ui5-webcomponents/issues/6687)


### Features

* **ui5-datepicker:** show only needed pickers based on date format ([#6490](https://github.com/SAP/ui5-webcomponents/issues/6490)) ([182ebb2](https://github.com/SAP/ui5-webcomponents/commit/182ebb26b9939d436e28a07c5069b9fa9a4ab976))





# [1.12.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0...v1.12.0-rc.0) (2023-03-09)


### Bug Fixes

* **ui5-datetime-picker:** align styles in footer ([#6665](https://github.com/SAP/ui5-webcomponents/issues/6665)) ([d58da29](https://github.com/SAP/ui5-webcomponents/commit/d58da29f07ba46e476c1d54153521fabe6691ec5)), closes [#4852](https://github.com/SAP/ui5-webcomponents/issues/4852)
* **ui5-input, ui5-textarea:** remove redundant styles ([#6662](https://github.com/SAP/ui5-webcomponents/issues/6662)) ([52ff41a](https://github.com/SAP/ui5-webcomponents/commit/52ff41a6ec114b6ee43ed3749750cb1449270a2b))


### Features

* **ui5-switch:** make change event preventable ([#6603](https://github.com/SAP/ui5-webcomponents/issues/6603)) ([953a1d0](https://github.com/SAP/ui5-webcomponents/commit/953a1d0fe103c6a510325188832154adcd04502b)), closes [#5953](https://github.com/SAP/ui5-webcomponents/issues/5953)





# [1.11.0](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.4...v1.11.0) (2023-03-06)

**Note:** Version bump only for package @ui5/webcomponents





# [1.11.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.3...v1.11.0-rc.4) (2023-03-02)


### Bug Fixes

* **ui5-combobox:** filter items when lazy-loading after initial rendering ([#6512](https://github.com/SAP/ui5-webcomponents/issues/6512)) ([7032e5e](https://github.com/SAP/ui5-webcomponents/commit/7032e5ec0bf4452ae47bc39b462baee051a7a57d))
* **ui5-multi-input/ui5-multi-combobox:** enhance tokenizer visualization ([#6597](https://github.com/SAP/ui5-webcomponents/issues/6597)) ([fd7aa30](https://github.com/SAP/ui5-webcomponents/commit/fd7aa309568058663f7ef2c60095870641427b37))
* **ui5-range-slider:** add aria-valuenow to the progress bar ([#6612](https://github.com/SAP/ui5-webcomponents/issues/6612)) ([71284ba](https://github.com/SAP/ui5-webcomponents/commit/71284bad05d10e9b73205f2a6f59f3757b853771))
* **ui5-range-slider:** stabilize failing tests ([#6450](https://github.com/SAP/ui5-webcomponents/issues/6450)) ([5e8f605](https://github.com/SAP/ui5-webcomponents/commit/5e8f605008fee0b4c4e05ebe0f6ff486ed44f998))
* **ui5-select:** fixed valuestate message scroll prevention ([#6548](https://github.com/SAP/ui5-webcomponents/issues/6548)) ([ec995f1](https://github.com/SAP/ui5-webcomponents/commit/ec995f1cee7b621c93b0016785d28c9d6413d634)), closes [#5970](https://github.com/SAP/ui5-webcomponents/issues/5970)
* **ui5-table:** adjust sample snippet ([#6580](https://github.com/SAP/ui5-webcomponents/issues/6580)) ([3e62b11](https://github.com/SAP/ui5-webcomponents/commit/3e62b113c7eb7a53fd03696506f753ae1691ffda))
* **ui5-toggle-button:** fix Emphasized Toggle Button text shadow in Belize theme ([#6566](https://github.com/SAP/ui5-webcomponents/issues/6566)) ([63972e5](https://github.com/SAP/ui5-webcomponents/commit/63972e5d3b0cbfc61c10091842e719ea63accf9b))
* **ui5-tree:** correctly pass mode to sub items ([#6574](https://github.com/SAP/ui5-webcomponents/issues/6574)) ([92547be](https://github.com/SAP/ui5-webcomponents/commit/92547be0e4491e87f97dae45c1705e44f18b1913))
* **ui5-tree:** fixed header-text apperance ([#6573](https://github.com/SAP/ui5-webcomponents/issues/6573)) ([2f15053](https://github.com/SAP/ui5-webcomponents/commit/2f15053424b752dfd00349414809197390e72e22)), closes [#6534](https://github.com/SAP/ui5-webcomponents/issues/6534)


### Features

* **framework:** use decorators for all static getters to define a custom element ([#6538](https://github.com/SAP/ui5-webcomponents/issues/6538)) ([c90cf0c](https://github.com/SAP/ui5-webcomponents/commit/c90cf0c2521cdbf063ba55706c25006a9f13e68a))
* **ui5-checkbox:** make change event preventable ([#6553](https://github.com/SAP/ui5-webcomponents/issues/6553)) ([8f6a4c5](https://github.com/SAP/ui5-webcomponents/commit/8f6a4c571d97f24a0ae83af80314d8dffe2286ea))
* **ui5-multi-combobox:** migrate to Typescript ([#6559](https://github.com/SAP/ui5-webcomponents/issues/6559)) ([64d9df2](https://github.com/SAP/ui5-webcomponents/commit/64d9df279dcef946d8ced5dbc5fa118235977ec6))
* **ui5-multi-input:** migrate to Typescript ([#6562](https://github.com/SAP/ui5-webcomponents/issues/6562)) ([cc3653a](https://github.com/SAP/ui5-webcomponents/commit/cc3653a2a200b628448b836e28cdb4c40113fb24))
* **ui5-rating-indicator:** migrate to Typescript ([#6550](https://github.com/SAP/ui5-webcomponents/issues/6550)) ([e0f89b9](https://github.com/SAP/ui5-webcomponents/commit/e0f89b91461b9a14417bfc8069b2b1486241e0a3))





# [1.11.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.2...v1.11.0-rc.3) (2023-02-23)


### Bug Fixes

* **ui5-avatar:** supporting accented characters ([#6518](https://github.com/SAP/ui5-webcomponents/issues/6518)) ([13f2feb](https://github.com/SAP/ui5-webcomponents/commit/13f2feb3f157345cccd6bb67063c89d523df4f0c)), closes [#6457](https://github.com/SAP/ui5-webcomponents/issues/6457)
* **ui5-checkbox, ui5-radiobutton, ui5-link:** fix "Normal" text wrapping ([#6539](https://github.com/SAP/ui5-webcomponents/issues/6539)) ([c33cc30](https://github.com/SAP/ui5-webcomponents/commit/c33cc3098d7c8c53f55b1760e2510c5399c3114d)), closes [#6278](https://github.com/SAP/ui5-webcomponents/issues/6278)
* **ui5-date-picker:** align value state ([#6482](https://github.com/SAP/ui5-webcomponents/issues/6482)) ([4b3431e](https://github.com/SAP/ui5-webcomponents/commit/4b3431ef8f039a7be0ad92a6a432760fcb3032f0)), closes [#6303](https://github.com/SAP/ui5-webcomponents/issues/6303) [#5963](https://github.com/SAP/ui5-webcomponents/issues/5963)
* **ui5-dialog:** overstyle bar when slotted in footer ([#6543](https://github.com/SAP/ui5-webcomponents/issues/6543)) ([a13ae40](https://github.com/SAP/ui5-webcomponents/commit/a13ae407f1decb17648c4ab5dac382b11ec0bd9c)), closes [#5561](https://github.com/SAP/ui5-webcomponents/issues/5561)
* **ui5-label:** use logical property in CSS to handle RTL usage ([#6542](https://github.com/SAP/ui5-webcomponents/issues/6542)) ([aa7c327](https://github.com/SAP/ui5-webcomponents/commit/aa7c32722e708fc3b9619777c848796336b1448a)), closes [#6524](https://github.com/SAP/ui5-webcomponents/issues/6524)
* **ui5-li-custom:** fixed visual glitches ([#6451](https://github.com/SAP/ui5-webcomponents/issues/6451)) ([7484cd4](https://github.com/SAP/ui5-webcomponents/commit/7484cd4a2b39ab37f050090029aec074f91f7260)), closes [#5955](https://github.com/SAP/ui5-webcomponents/issues/5955)
* **ui5-segmented-button:** press item programatically works properly ([#6502](https://github.com/SAP/ui5-webcomponents/issues/6502)) ([1b7ded1](https://github.com/SAP/ui5-webcomponents/commit/1b7ded17de307372053007aaeeadc91af13f77e6))
* **ui5-select, ui5-suggestion-item, ui5-shellbar:** color of icon inside options is according to spec ([#6415](https://github.com/SAP/ui5-webcomponents/issues/6415)) ([78cd73b](https://github.com/SAP/ui5-webcomponents/commit/78cd73b2f6940e62dcd297b4a2c5c63ea7a295e1))
* **ui5-step-input:** fix change event firing in some cases ([#6511](https://github.com/SAP/ui5-webcomponents/issues/6511)) ([3f275b8](https://github.com/SAP/ui5-webcomponents/commit/3f275b8dbcc96e36e9aa30d21b424d50937c90b4))
* **ui5-table:** update samples with required styles ([#6504](https://github.com/SAP/ui5-webcomponents/issues/6504)) ([43dd5ca](https://github.com/SAP/ui5-webcomponents/commit/43dd5caac91009415ddd82d6595562ecf63080ef))
* **ui5-textarea:** prevent exception if value is set to null ([#6493](https://github.com/SAP/ui5-webcomponents/issues/6493)) ([7d34fe9](https://github.com/SAP/ui5-webcomponents/commit/7d34fe94d2830fa1caf61f34f27b2e80b9541da7))
* **ui5-wheel-slider:** reduce the wheel speed when using pad ([#6503](https://github.com/SAP/ui5-webcomponents/issues/6503)) ([89c88b8](https://github.com/SAP/ui5-webcomponents/commit/89c88b8ff5a5a55bc0f1ea0650806b690a980f77)), closes [#6459](https://github.com/SAP/ui5-webcomponents/issues/6459)


### Features

* **playground:** next playground with storybook ([#5831](https://github.com/SAP/ui5-webcomponents/issues/5831)) ([79274c8](https://github.com/SAP/ui5-webcomponents/commit/79274c8e442cf5854a7fe6327f25aaed04312103)), closes [#5898](https://github.com/SAP/ui5-webcomponents/issues/5898)
* support SAPBusinessSuite icons v1 and v2 font ( Horizon ) ([#6535](https://github.com/SAP/ui5-webcomponents/issues/6535)) ([38233b9](https://github.com/SAP/ui5-webcomponents/commit/38233b94543a94c9915cf1d8c8937a834cd6c87d))
* **ui5-combobox:** migrate to Typescript ([#6520](https://github.com/SAP/ui5-webcomponents/issues/6520)) ([c5e21de](https://github.com/SAP/ui5-webcomponents/commit/c5e21de8a91d6f9d800889c651cf1ff1a2bf0f17)), closes [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337)
* **ui5-textarea:** migrate to Typescript ([#6499](https://github.com/SAP/ui5-webcomponents/issues/6499)) ([02edfc4](https://github.com/SAP/ui5-webcomponents/commit/02edfc44c182af19b47667a05161d841edf254db)), closes [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337) [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337) [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337)
* **ui5-textarea:** migrate to Typescript ([#6522](https://github.com/SAP/ui5-webcomponents/issues/6522)) ([efdae14](https://github.com/SAP/ui5-webcomponents/commit/efdae14c4da0d57c1dfe11083f908902301bea3c)), closes [#4337](https://github.com/SAP/ui5-webcomponents/issues/4337) [#6499](https://github.com/SAP/ui5-webcomponents/issues/6499)
* **ui5-token, ui5-tokenizer:** migrate to Typescript ([#6546](https://github.com/SAP/ui5-webcomponents/issues/6546)) ([97927c7](https://github.com/SAP/ui5-webcomponents/commit/97927c76863ee304a6a98def7362cfe1872b6f46))





# [1.11.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.1...v1.11.0-rc.2) (2023-02-16)


### Bug Fixes

* **ui5-badge:** align multiple badges when used in one line ([#6481](https://github.com/SAP/ui5-webcomponents/issues/6481)) ([1e72a3c](https://github.com/SAP/ui5-webcomponents/commit/1e72a3c8d833fe2476378316a3016ba6f5a22380)), closes [#6467](https://github.com/SAP/ui5-webcomponents/issues/6467)
* **ui5-button:** disabled button not execute click event ([#6400](https://github.com/SAP/ui5-webcomponents/issues/6400)) ([fa47576](https://github.com/SAP/ui5-webcomponents/commit/fa475767817cc7e6f141dfd386934e530b04784a)), closes [#6372](https://github.com/SAP/ui5-webcomponents/issues/6372)
* **ui5-input/ui5-multi-input/ui5-combobox/ui5-multi-combobox:** min-width and margin ([#6044](https://github.com/SAP/ui5-webcomponents/issues/6044)) ([ba805c6](https://github.com/SAP/ui5-webcomponents/commit/ba805c62b301ad0eb88ac4b4ebf82c524925c0d6))
* **ui5-tabcontainer:** improve sub tabs accessibility ([#6452](https://github.com/SAP/ui5-webcomponents/issues/6452)) ([08cd361](https://github.com/SAP/ui5-webcomponents/commit/08cd3610d20abd0e956e0487b217f954cb78120f))
* **ui5-table:** remove unnecessary border-top if no-data ([#6495](https://github.com/SAP/ui5-webcomponents/issues/6495)) ([28d6da5](https://github.com/SAP/ui5-webcomponents/commit/28d6da5a284bb5bed4f43d5419cee65904ae7ede))
* **ui5-tab:** mark the component as "abstract" ([#6458](https://github.com/SAP/ui5-webcomponents/issues/6458)) ([3380125](https://github.com/SAP/ui5-webcomponents/commit/338012559658ad572e68dd1156f05ad827af09c2))


### Features

* **ui5-input:** reflect dynamic changes of labels ([#6364](https://github.com/SAP/ui5-webcomponents/issues/6364)) ([b75e958](https://github.com/SAP/ui5-webcomponents/commit/b75e958fdc651b60913310bf1645f05e6df726ec))
* **ui5-segmented-button, ui5-toggle-button:** migrated to TypeScript ([#6374](https://github.com/SAP/ui5-webcomponents/issues/6374)) ([26064db](https://github.com/SAP/ui5-webcomponents/commit/26064dbb5ab842712bb304aca619cd10bac38d2b))
* **ui5-toast:** migrate to Typescript ([#6506](https://github.com/SAP/ui5-webcomponents/issues/6506)) ([402e1f7](https://github.com/SAP/ui5-webcomponents/commit/402e1f7b0b0624bfed78bb7ea5a73abead1fcad3))





# [1.11.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v1.11.0-rc.0...v1.11.0-rc.1) (2023-02-09)


### Bug Fixes

* **f6-navigation:** skip empty groups ([#6397](https://github.com/SAP/ui5-webcomponents/issues/6397)) ([f49c593](https://github.com/SAP/ui5-webcomponents/commit/f49c5930f9a9d4e55a614c9b7125a951005335bd))
* **ui5-avatar:** make color-scheme attribute css selector stronger ([#6408](https://github.com/SAP/ui5-webcomponents/issues/6408)) ([1253929](https://github.com/SAP/ui5-webcomponents/commit/1253929ceb66cebddf9ff844d452f3645c4a6472))
* **ui5-input:** fire change after clear icon pressed and focus out ([#6399](https://github.com/SAP/ui5-webcomponents/issues/6399)) ([ef4ba22](https://github.com/SAP/ui5-webcomponents/commit/ef4ba22ad53573b9e9a3436643b89f6b88e3d257)), closes [#6365](https://github.com/SAP/ui5-webcomponents/issues/6365)
* **ui5-input:** fire change event on enter ([#6390](https://github.com/SAP/ui5-webcomponents/issues/6390)) ([68ad562](https://github.com/SAP/ui5-webcomponents/commit/68ad562e15cf678af675c855b33af21ed56faad7)), closes [#6262](https://github.com/SAP/ui5-webcomponents/issues/6262)
* **ui5-range-slider:** fire input event with correct values after swapping ([#6385](https://github.com/SAP/ui5-webcomponents/issues/6385)) ([18df557](https://github.com/SAP/ui5-webcomponents/commit/18df557d80e49a85847b67a6ed5c6c6e0e96ec37)), closes [#6377](https://github.com/SAP/ui5-webcomponents/issues/6377)
* **ui5-select:** change roledescription to Listbox ([#6199](https://github.com/SAP/ui5-webcomponents/issues/6199)) ([698a0d0](https://github.com/SAP/ui5-webcomponents/commit/698a0d046d3baf1e06373135e79686352ba0cada))
* **ui5-slider:** fix runtime error on Safari ([#6426](https://github.com/SAP/ui5-webcomponents/issues/6426)) ([8c84608](https://github.com/SAP/ui5-webcomponents/commit/8c84608cdf5cbc463adc0cc1670eaa337c0c49e8))


### Features

* **ui5-avatar-group:** migrated to Typescript ([#6391](https://github.com/SAP/ui5-webcomponents/issues/6391)) ([c5bcfde](https://github.com/SAP/ui5-webcomponents/commit/c5bcfdeff9e70dd26df8982fd409590ceadcc606))
* **ui5-popover,ui5-dialog:** add accessibleRole property ([#6221](https://github.com/SAP/ui5-webcomponents/issues/6221)) ([b88d214](https://github.com/SAP/ui5-webcomponents/commit/b88d2148e99e73ab96da1fd32bc3bbc3d4eec123)), closes [#6090](https://github.com/SAP/ui5-webcomponents/issues/6090) [#5796](https://github.com/SAP/ui5-webcomponents/issues/5796)
* **ui5-select:** new events introduced ([#6398](https://github.com/SAP/ui5-webcomponents/issues/6398)) ([a0b114d](https://github.com/SAP/ui5-webcomponents/commit/a0b114dfeee9265ada632d34df1b6e2e3de8c3fd)), closes [#5836](https://github.com/SAP/ui5-webcomponents/issues/5836)
* **ui5-tree:** migrate to Typescript ([#6401](https://github.com/SAP/ui5-webcomponents/issues/6401)) ([1762b16](https://github.com/SAP/ui5-webcomponents/commit/1762b166167680b6d6eb17f300a9e9f43c5ddd78))





# [1.11.0-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.10.4-rc.0...v1.11.0-rc.0) (2023-02-02)


### Bug Fixes

* **ui5-input:** prevent setSelectionRange on number input ([#6395](https://github.com/SAP/ui5-webcomponents/issues/6395)) ([e5a61c7](https://github.com/SAP/ui5-webcomponents/commit/e5a61c72e07f2936e378882a4254f758d8a43dd7))





## [1.10.4-rc.0](https://github.com/SAP/ui5-webcomponents/compare/v1.10.3...v1.10.4-rc.0) (2023-01-26)


### Bug Fixes

* **ui5-segmented-button:** ignore scoping suffix when checking tag name ([#6353](https://github.com/SAP/ui5-webcomponents/issues/6353)) ([594fee4](https://github.com/SAP/ui5-webcomponents/commit/594fee4b521053b79fa7a84bfd30a85f18ababfd))





## [1.10.3](https://github.com/SAP/ui5-webcomponents/compare/v1.10.2...v1.10.3) (2023-01-25)

**Note:** Version bump only for package @ui5/webcomponents





## [1.10.2](https://github.com/SAP/ui5-webcomponents/compare/v1.10.1...v1.10.2) (2023-01-25)

**Note:** Version bump only for package ui5-webcomponents

## [1.10.1](https://github.com/SAP/ui5-webcomponents/compare/v0.0.0-7b49a7ff1...v1.10.1) (2023-01-24)


### Bug Fixes

* **ui5-dialog:** correct types ([#6347](https://github.com/SAP/ui5-webcomponents/issues/6347)) ([620bf8d](https://github.com/SAP/ui5-webcomponents/commit/620bf8dd72f71e93dcdebeac2b6d452a1f3406c7))
* **ui5-multi-combobox:** paste in readonly component prevented ([#6325](https://github.com/SAP/ui5-webcomponents/issues/6325)) ([9141e5a](https://github.com/SAP/ui5-webcomponents/commit/9141e5a2663df5c3c4e6a4fdf3c59dfa863340a9)), closes [#6175](https://github.com/SAP/ui5-webcomponents/issues/6175)





# [1.10.0](https://github.com/SAP/ui5-webcomponents/compare/v1.9.3...v1.10.0) (2023-01-20)


### Bug Fixes

* **docs:** samples typos ([#6236](https://github.com/SAP/ui5-webcomponents/issues/6236)) ([be26877](https://github.com/SAP/ui5-webcomponents/commit/be26877e361cd17407498b370e08cf11c175a2d5))
* **formSupport:** check and report validity of ui5 input components ([#5987](https://github.com/SAP/ui5-webcomponents/issues/5987)) ([22d5f60](https://github.com/SAP/ui5-webcomponents/commit/22d5f60c6435df94bd4a3f3d8ede1511934c092f))
* **ui5-(multi)-input, ui5-(multi)-combobox:** remove value state message spacing ([#6233](https://github.com/SAP/ui5-webcomponents/issues/6233)) ([fd13f96](https://github.com/SAP/ui5-webcomponents/commit/fd13f96b289b6cd71e0d0eff6f54ac93f534ba6d))
* **ui5-avatar:** fix icon rendering inside ui5-avatar ([#6060](https://github.com/SAP/ui5-webcomponents/issues/6060)) ([9899466](https://github.com/SAP/ui5-webcomponents/commit/9899466e75196cb424946a9281583c74948d7b09)), closes [#6043](https://github.com/SAP/ui5-webcomponents/issues/6043)
* **ui5-avatar:** fixed incorrect img slot border alignment ([#6133](https://github.com/SAP/ui5-webcomponents/issues/6133)) ([dc410d1](https://github.com/SAP/ui5-webcomponents/commit/dc410d1a507294d026abbc6c8429cfe2bc5a5519)), closes [#5919](https://github.com/SAP/ui5-webcomponents/issues/5919)
* **ui5-avatar:** improved documentation of initials property ([#6138](https://github.com/SAP/ui5-webcomponents/issues/6138)) ([8cc1303](https://github.com/SAP/ui5-webcomponents/commit/8cc1303c84bb4f17e80f5347963f756b77576bbf)), closes [#6136](https://github.com/SAP/ui5-webcomponents/issues/6136)
* **ui5-button:** adjust tooltip display ([#5936](https://github.com/SAP/ui5-webcomponents/issues/5936)) ([98dd38e](https://github.com/SAP/ui5-webcomponents/commit/98dd38eefb238a46b1c4aca956019cbec473d340)), closes [#5083](https://github.com/SAP/ui5-webcomponents/issues/5083)
* **ui5-calendar:** adjust displayed width ([#6196](https://github.com/SAP/ui5-webcomponents/issues/6196)) ([5eaf13c](https://github.com/SAP/ui5-webcomponents/commit/5eaf13c7a6df457eb2d46b558de27afab352a614)), closes [#5641](https://github.com/SAP/ui5-webcomponents/issues/5641)
* **ui5-calendar:** set proper roledescription on the pickers ([#6197](https://github.com/SAP/ui5-webcomponents/issues/6197)) ([ebd3cc0](https://github.com/SAP/ui5-webcomponents/commit/ebd3cc0237d9289b9ad0032542199fdb6165a64a)), closes [#5858](https://github.com/SAP/ui5-webcomponents/issues/5858)
* **ui5-carousel:** fixed screen readers reading when a page is changed ([#6105](https://github.com/SAP/ui5-webcomponents/issues/6105)) ([5da4e5f](https://github.com/SAP/ui5-webcomponents/commit/5da4e5f7508573c41d990a448b9bad139f65e3c7))
* **ui5-checkbox:** fix focus outline ([#6033](https://github.com/SAP/ui5-webcomponents/issues/6033)) ([3fa961c](https://github.com/SAP/ui5-webcomponents/commit/3fa961c4a9fc8f16ac9bfce985ee34f3c2e88c27)), closes [#5915](https://github.com/SAP/ui5-webcomponents/issues/5915)
* **ui5-date-picker:** align styles to input ([#6149](https://github.com/SAP/ui5-webcomponents/issues/6149)) ([8d3e3f1](https://github.com/SAP/ui5-webcomponents/commit/8d3e3f1ba69aaac6fef2d971a9839c5aed40a256))
* **ui5-dialog, ui5-popover:** change header level to H1 ([#6293](https://github.com/SAP/ui5-webcomponents/issues/6293)) ([a9130e8](https://github.com/SAP/ui5-webcomponents/commit/a9130e855afc01dafc1e22c561f07c0d666d7155))
* **ui5-dialog:** fix block layers when multiple dialogs are open ([#6183](https://github.com/SAP/ui5-webcomponents/issues/6183)) ([018f521](https://github.com/SAP/ui5-webcomponents/commit/018f52166c72a176719ac52dbb0f0db5f62f966e))
* **ui5-icon:** cursor "pointer" added for interactive icons ([#6042](https://github.com/SAP/ui5-webcomponents/issues/6042)) ([58fba64](https://github.com/SAP/ui5-webcomponents/commit/58fba641900313b88db37fedbc2fb8c88f734d9a))
* **ui5-icon:** showTooltip property documentation improved ([#6165](https://github.com/SAP/ui5-webcomponents/issues/6165)) ([10849b7](https://github.com/SAP/ui5-webcomponents/commit/10849b737709730e48555f31ba32aad029a1e1fd))
* **ui5-input:** correct input value on item re-selection ([#6252](https://github.com/SAP/ui5-webcomponents/issues/6252)) ([17bedbe](https://github.com/SAP/ui5-webcomponents/commit/17bedbec56535bc6fd3891e712f05d160f7d8c9d)), closes [#6091](https://github.com/SAP/ui5-webcomponents/issues/6091)
* **ui5-input:** fix typo in renderer ([#6185](https://github.com/SAP/ui5-webcomponents/issues/6185)) ([0134ed1](https://github.com/SAP/ui5-webcomponents/commit/0134ed1e731ef50caafd14254b1edca20a6971bc))
* **ui5-input:** make icons responsive when height is changed ([#5908](https://github.com/SAP/ui5-webcomponents/issues/5908)) ([3d3f047](https://github.com/SAP/ui5-webcomponents/commit/3d3f0479f110cb8b0a8a7c7a6814802808867e0b))
* **ui5-li:** allow support for anchor tags in ListItem ([#6126](https://github.com/SAP/ui5-webcomponents/issues/6126)) ([db51f59](https://github.com/SAP/ui5-webcomponents/commit/db51f5910f3efb0268e1bea65f021c61eb212dba)), closes [#6121](https://github.com/SAP/ui5-webcomponents/issues/6121)
* **ui5-li:** bottom border is now visible in evening horizon ([#6129](https://github.com/SAP/ui5-webcomponents/issues/6129)) ([3dbd53d](https://github.com/SAP/ui5-webcomponents/commit/3dbd53ddd6cc9a320b6bfa6179a67ec1e8a32f5b)), closes [#6116](https://github.com/SAP/ui5-webcomponents/issues/6116)
* **ui5-multi-combobox:** delete long tokens when icon is clicked ([#6069](https://github.com/SAP/ui5-webcomponents/issues/6069)) ([18e0b6e](https://github.com/SAP/ui5-webcomponents/commit/18e0b6e747678dacfb32bc2352ca9f045e4fb493)), closes [#6048](https://github.com/SAP/ui5-webcomponents/issues/6048)
* **ui5-multi-combobox:** force tokenizer layouting when selected items are added ([#6168](https://github.com/SAP/ui5-webcomponents/issues/6168)) ([9760c61](https://github.com/SAP/ui5-webcomponents/commit/9760c6148a541abbb727e73897cb3d072b638489)), closes [#6092](https://github.com/SAP/ui5-webcomponents/issues/6092)
* **ui5-multi-combobox:** prevent tokenizing of group headers ([#6230](https://github.com/SAP/ui5-webcomponents/issues/6230)) ([ff920da](https://github.com/SAP/ui5-webcomponents/commit/ff920da01e003780fad8462d75e27b59cb3cca36)), closes [#6222](https://github.com/SAP/ui5-webcomponents/issues/6222)
* **ui5-multi-input:** focus input when all tokens are deleted ([#6170](https://github.com/SAP/ui5-webcomponents/issues/6170)) ([f087209](https://github.com/SAP/ui5-webcomponents/commit/f087209a1121576fdd5d8cca73922625f986544b)), closes [#6073](https://github.com/SAP/ui5-webcomponents/issues/6073)
* **ui5-panel:** remove aria controls from expand button ([#6167](https://github.com/SAP/ui5-webcomponents/issues/6167)) ([473e4bb](https://github.com/SAP/ui5-webcomponents/commit/473e4bb48382ec195b8c4f9499c15e3f928f9799)), closes [#6157](https://github.com/SAP/ui5-webcomponents/issues/6157)
* **ui5-popover:** clicking on iframe now closes an open popover ([#6145](https://github.com/SAP/ui5-webcomponents/issues/6145)) ([f01e872](https://github.com/SAP/ui5-webcomponents/commit/f01e87276fb043c6b523623d0d72c53a0a0856fc)), closes [#6087](https://github.com/SAP/ui5-webcomponents/issues/6087)
* **ui5-range-slider:** fire change event after value swapping ([#6057](https://github.com/SAP/ui5-webcomponents/issues/6057)) ([4134a7c](https://github.com/SAP/ui5-webcomponents/commit/4134a7c10c381b44ddc944a35575ecb6444aa9db))
* **ui5-segmented-button:** align mousedown and mouseup on item behaviour ([#6142](https://github.com/SAP/ui5-webcomponents/issues/6142)) ([9d687d8](https://github.com/SAP/ui5-webcomponents/commit/9d687d80f0f9282b674ede0ce48c97c4e90700d8)), closes [#5390](https://github.com/SAP/ui5-webcomponents/issues/5390)
* **ui5-select:** correct typo in --_ui5_select_label_color ([#6217](https://github.com/SAP/ui5-webcomponents/issues/6217)) ([117b9f8](https://github.com/SAP/ui5-webcomponents/commit/117b9f883cc28342c2178f3d47775c0da82ed95a))
* **ui5-side-navigation:** fixed accessibility of the Popover ([#6045](https://github.com/SAP/ui5-webcomponents/issues/6045)) ([e0e13e1](https://github.com/SAP/ui5-webcomponents/commit/e0e13e11d26abbcb2746e4abd1c72d312212ebaf)), closes [#5827](https://github.com/SAP/ui5-webcomponents/issues/5827)
* **ui5-side-navigation:** fixed accessibility roles and attributes when Side Navigation is collapsed ([#5877](https://github.com/SAP/ui5-webcomponents/issues/5877)) ([92b9dc9](https://github.com/SAP/ui5-webcomponents/commit/92b9dc99ea4c598f22111dfea3a435e55c585dfc)), closes [#5827](https://github.com/SAP/ui5-webcomponents/issues/5827)
* **ui5-split-button:** add split-arrow-down icon to dependencies ([#6065](https://github.com/SAP/ui5-webcomponents/issues/6065)) ([1473859](https://github.com/SAP/ui5-webcomponents/commit/1473859e53c3679372dc084415d2c1ffdfdc47ce))
* **ui5-tabcontainer:** added tab expand button tooltip ([#6100](https://github.com/SAP/ui5-webcomponents/issues/6100)) ([8d81f01](https://github.com/SAP/ui5-webcomponents/commit/8d81f01885278ffb07c6bd8c9fea73d30b70d886))
* **ui5-tabcontainer:** adding selected tab programatically deselects previously selected tab ([#6036](https://github.com/SAP/ui5-webcomponents/issues/6036)) ([e73ec21](https://github.com/SAP/ui5-webcomponents/commit/e73ec210df94ffc10cec8ac6a17d22354962ac46)), closes [#5932](https://github.com/SAP/ui5-webcomponents/issues/5932) [#5932](https://github.com/SAP/ui5-webcomponents/issues/5932)
* **ui5-table:** apply correct color to the header row text ([#6232](https://github.com/SAP/ui5-webcomponents/issues/6232)) ([6ad1c4c](https://github.com/SAP/ui5-webcomponents/commit/6ad1c4c51f3731523511083edd2e7d1337eec21f))
* **ui5-textarea:** adjust styles according to the visual specification ([#6274](https://github.com/SAP/ui5-webcomponents/issues/6274)) ([2075b2c](https://github.com/SAP/ui5-webcomponents/commit/2075b2cee52151f2ac0f9cf6188d3c400cc37d83))
* **ui5-textarea:** fix the minimum width of the component ([#6054](https://github.com/SAP/ui5-webcomponents/issues/6054)) ([1b5b24a](https://github.com/SAP/ui5-webcomponents/commit/1b5b24a1304cbe0079d4ad48093ec97c24c0046a))
* **ui5-tokenizer:** apply correct color to N-more text ([#6267](https://github.com/SAP/ui5-webcomponents/issues/6267)) ([7208c2f](https://github.com/SAP/ui5-webcomponents/commit/7208c2f2a2f1a684b27c4610b6ab082870c48b34))
* **ui5-tree:** change isTreeItem getter visibility ([#6200](https://github.com/SAP/ui5-webcomponents/issues/6200)) ([9a7c91a](https://github.com/SAP/ui5-webcomponents/commit/9a7c91a1f2a0f37e68a74a8e80fefca540f5c51a))
* **ui5-tree:** correct forwarding of mode value to items ([#6277](https://github.com/SAP/ui5-webcomponents/issues/6277)) ([665107b](https://github.com/SAP/ui5-webcomponents/commit/665107b983424a60d3cf735ef3e0f99498f237de))


### Features

* add TS types for localization packages  ([#6147](https://github.com/SAP/ui5-webcomponents/issues/6147)) ([39dcbfd](https://github.com/SAP/ui5-webcomponents/commit/39dcbfd91e6bc728f1c3feaff5e229ae3a359b06))
* enable TS in main, fiori ([#6064](https://github.com/SAP/ui5-webcomponents/issues/6064)) ([0b56130](https://github.com/SAP/ui5-webcomponents/commit/0b561307b93b8af465dc5bee67650069ee138f7f))
* support decorators for custom elements metadata ([#6072](https://github.com/SAP/ui5-webcomponents/issues/6072)) ([fc9ee6e](https://github.com/SAP/ui5-webcomponents/commit/fc9ee6e2af10b4315fde072a50ab37efa180c809))
* **ui5-avatar:** migrated to Typescript ([#6272](https://github.com/SAP/ui5-webcomponents/issues/6272)) ([3f3a03f](https://github.com/SAP/ui5-webcomponents/commit/3f3a03f8ec2600836d7f0c2e6dd8617ec9dcc829))
* **ui5-breadcrumbs:** migrate to TS ([#6254](https://github.com/SAP/ui5-webcomponents/issues/6254)) ([02a6d64](https://github.com/SAP/ui5-webcomponents/commit/02a6d64a3c915b48f293d01ca008da8ad49095c7))
* **ui5-button, ui5-date-picker, ui5-calendar:** migrate to TS ([#6173](https://github.com/SAP/ui5-webcomponents/issues/6173)) ([7232ca0](https://github.com/SAP/ui5-webcomponents/commit/7232ca08f286c5dde10080373fb62247f1acf7b7)), closes [#6080](https://github.com/SAP/ui5-webcomponents/issues/6080)
* **ui5-carousel:** allow page indicator to always display numbers ([#6245](https://github.com/SAP/ui5-webcomponents/issues/6245)) ([36ef5a6](https://github.com/SAP/ui5-webcomponents/commit/36ef5a6e1f00c86da8dd99f66a487be0dfce277d)), closes [#5409](https://github.com/SAP/ui5-webcomponents/issues/5409)
* **ui5-checkbox:** migrated to Typescript ([#6292](https://github.com/SAP/ui5-webcomponents/issues/6292)) ([49cef2d](https://github.com/SAP/ui5-webcomponents/commit/49cef2d021d6f981036846f29caa5c3ac823e186))
* **ui5-color-palette:** convert to Typescript ([#6244](https://github.com/SAP/ui5-webcomponents/issues/6244)) ([ec3bf43](https://github.com/SAP/ui5-webcomponents/commit/ec3bf435480b010fdae018c25ba0e407fca219b1))
* **ui5-daterange-picker:** migrate to TS ([#6246](https://github.com/SAP/ui5-webcomponents/issues/6246)) ([63986f5](https://github.com/SAP/ui5-webcomponents/commit/63986f557a78ac14674d2e618ed40967ed5a1102))
* **ui5-icon:** new 'design' property introduced ([#6261](https://github.com/SAP/ui5-webcomponents/issues/6261)) ([566c46b](https://github.com/SAP/ui5-webcomponents/commit/566c46bd47666f8e096ffb9af9195cbe1c27a65a)), closes [#6019](https://github.com/SAP/ui5-webcomponents/issues/6019)
* **ui5-input:** correct disabled state style for horizon ([#6046](https://github.com/SAP/ui5-webcomponents/issues/6046)) ([42a64e7](https://github.com/SAP/ui5-webcomponents/commit/42a64e73d6b65dde428ef5b896dd961197e87aad))
* **ui5-li:** imageContent slot is added ([#6083](https://github.com/SAP/ui5-webcomponents/issues/6083)) ([2dc0d2c](https://github.com/SAP/ui5-webcomponents/commit/2dc0d2c23e54510d0aeefece477fd85a047f3613)), closes [#5462](https://github.com/SAP/ui5-webcomponents/issues/5462)
* **ui5-li:** navigation mode is enabled ([#6024](https://github.com/SAP/ui5-webcomponents/issues/6024)) ([97afa69](https://github.com/SAP/ui5-webcomponents/commit/97afa691fa9a67721bb10f0cbddf03e7b800d6a7))
* **ui5-list, ui5-li, ui5-li-custom:** migrate to TS ([#6166](https://github.com/SAP/ui5-webcomponents/issues/6166)) ([12b3570](https://github.com/SAP/ui5-webcomponents/commit/12b35707c3f0934dcb98fdcde0ed715140a4af4a))
* **ui5-menu:** add open/opener functionality and open/close events ([#5984](https://github.com/SAP/ui5-webcomponents/issues/5984)) ([951f09a](https://github.com/SAP/ui5-webcomponents/commit/951f09a1a5e3db9bdc3052537c2774e816f0ae12))
* **ui5-message-strip:** convert to Typescript ([#6248](https://github.com/SAP/ui5-webcomponents/issues/6248)) ([0325626](https://github.com/SAP/ui5-webcomponents/commit/0325626b76169a0af28caafa40a6ac4692b739fd))
* **ui5-range-slider:** expose shadow parts ([#6258](https://github.com/SAP/ui5-webcomponents/issues/6258)) ([518fe86](https://github.com/SAP/ui5-webcomponents/commit/518fe86db869158aa3cb6647072ca73be4fd05b6))
* **ui5-slider:** convert to Typescript ([#6251](https://github.com/SAP/ui5-webcomponents/issues/6251)) ([b9a082a](https://github.com/SAP/ui5-webcomponents/commit/b9a082a17c563ee7053096eee0293b41d642093f))
* **ui5-table:** add inline display property ([#6007](https://github.com/SAP/ui5-webcomponents/issues/6007)) ([d41445f](https://github.com/SAP/ui5-webcomponents/commit/d41445f21f5de0b3d6c234f052a4fe69f29f1a30))
* **ui5-textarea:** integrate label enablement support ([#6027](https://github.com/SAP/ui5-webcomponents/issues/6027)) ([e1b0271](https://github.com/SAP/ui5-webcomponents/commit/e1b02714a79c30001af99b7ed689f723610d43a3)), closes [#5710](https://github.com/SAP/ui5-webcomponents/issues/5710)
* **ui5-timepicker:** convert to TS ([#6240](https://github.com/SAP/ui5-webcomponents/issues/6240)) ([f1035eb](https://github.com/SAP/ui5-webcomponents/commit/f1035eb701f9a6ef02a21cb4a9bfd9b11c118c08))
* **ui5-tree-item-custom:** initial implementation ([#5962](https://github.com/SAP/ui5-webcomponents/issues/5962)) ([b148c23](https://github.com/SAP/ui5-webcomponents/commit/b148c23cf7ed11b4e17c9eda61a20fc48882ba4f))
* **ui5-viewsettings-dialog:** migrate to Typescript ([#6218](https://github.com/SAP/ui5-webcomponents/issues/6218)) ([ee3bbe4](https://github.com/SAP/ui5-webcomponents/commit/ee3bbe46b070092dffd054b1350f444fa072539e))
* **ui5:** display focus outline via keyboard only ([#6084](https://github.com/SAP/ui5-webcomponents/issues/6084)) ([848997b](https://github.com/SAP/ui5-webcomponents/commit/848997bccf753a1b9b687a27083f3536f0335ff9))
* use Typescript for the `base` package ([#5982](https://github.com/SAP/ui5-webcomponents/issues/5982)) ([bd184d8](https://github.com/SAP/ui5-webcomponents/commit/bd184d81a4218328bc7bf04baf2bc1f69a361679))





## [1.9.3](https://github.com/SAP/ui5-webcomponents/compare/v1.9.2...v1.9.3) (2022-12-16)

**Note:** Version bump only for package @ui5/webcomponents





## [1.9.1](https://github.com/SAP/ui5-webcomponents/compare/v1.9.0...v1.9.1) (2022-11-10)

**Note:** Version bump only for package @ui5/webcomponents





# [1.9.0](https://github.com/SAP/ui5-webcomponents/compare/v1.8.0...v1.9.0) (2022-10-31)


### Bug Fixes

* **form support:** remove additional fields from ACC tree ([#5922](https://github.com/SAP/ui5-webcomponents/issues/5922)) ([fed99ed](https://github.com/SAP/ui5-webcomponents/commit/fed99ed5a51730aa2fd4cf016f68a17b6f770154)), closes [#5917](https://github.com/SAP/ui5-webcomponents/issues/5917)
* make static are items recognizable to openui5 dialogs ([#5888](https://github.com/SAP/ui5-webcomponents/issues/5888)) ([efaa1d6](https://github.com/SAP/ui5-webcomponents/commit/efaa1d6e60f965ef0f8479adcd823e1bf5396992)), closes [#5634](https://github.com/SAP/ui5-webcomponents/issues/5634)
* **ui5-combobox:** announce additional text of selected item ([#5943](https://github.com/SAP/ui5-webcomponents/issues/5943)) ([4c1ca7d](https://github.com/SAP/ui5-webcomponents/commit/4c1ca7db79b8c26b621d45bf4e3a788b24315cb3))
* **ui5-icon:** visualize the icons properly in Safari ([#5871](https://github.com/SAP/ui5-webcomponents/issues/5871)) ([3f255d9](https://github.com/SAP/ui5-webcomponents/commit/3f255d9410f1c583a58db5d6c2c4a7232c929995))
* **ui5-input:** type composition characters correctly ([#5869](https://github.com/SAP/ui5-webcomponents/issues/5869)) ([5f61d11](https://github.com/SAP/ui5-webcomponents/commit/5f61d1190e4d592ad69a256b8890840869d5cfb7))
* **ui5-label:** improve "for" attribute accessibility reading ([#5872](https://github.com/SAP/ui5-webcomponents/issues/5872)) ([b9ffaa6](https://github.com/SAP/ui5-webcomponents/commit/b9ffaa6f0353e9e8136019978299548021555643))
* **ui5-li:** apply proper border radius to avatar with image ([#5942](https://github.com/SAP/ui5-webcomponents/issues/5942)) ([f200a76](https://github.com/SAP/ui5-webcomponents/commit/f200a76ef667f867cdd4d323aba0d1e0eb00f53d))
* **ui5-listitem:** prevent default event action when fire custom press event ([#5928](https://github.com/SAP/ui5-webcomponents/issues/5928)) ([ed1efcc](https://github.com/SAP/ui5-webcomponents/commit/ed1efccc2190512dbafbaffd76f88471c0f3467e))
* **ui5-multi-input:** import value help icon ([#5972](https://github.com/SAP/ui5-webcomponents/issues/5972)) ([b36be95](https://github.com/SAP/ui5-webcomponents/commit/b36be95bf05036fb390039928f77885efb79f9ad))
* **ui5-radio-button:** improve acc ([#5880](https://github.com/SAP/ui5-webcomponents/issues/5880)) ([6616897](https://github.com/SAP/ui5-webcomponents/commit/66168972b54c6d20801be5ced4bb6ca04506ad75))
* **ui5-tabcontainer:** translate semantic design aria description ([#5883](https://github.com/SAP/ui5-webcomponents/issues/5883)) ([f256d0b](https://github.com/SAP/ui5-webcomponents/commit/f256d0b2f36d9a085e1e0b2843c3f10a63800fc2))
* **ui5-table-row:** refactor navigated property ([#5976](https://github.com/SAP/ui5-webcomponents/issues/5976)) ([ba264af](https://github.com/SAP/ui5-webcomponents/commit/ba264afb386f256ccaecd4a056acb95429fb58c3))
* **ui5-table:** announce whether a row is selected or not ([#5930](https://github.com/SAP/ui5-webcomponents/issues/5930)) ([4d34fe9](https://github.com/SAP/ui5-webcomponents/commit/4d34fe9eb9a343634774292b2eac7c12d5876b30))
* **ui5-table:** enable focus navigation in popin content ([#5900](https://github.com/SAP/ui5-webcomponents/issues/5900)) ([9fd81e2](https://github.com/SAP/ui5-webcomponents/commit/9fd81e2097e5099c04567961e9df97049fb8e6cc))
* **ui5-table:** remove role row as it is redundant ([#5939](https://github.com/SAP/ui5-webcomponents/issues/5939)) ([a7fe699](https://github.com/SAP/ui5-webcomponents/commit/a7fe6994505986245571a5d28f070e4990e3b4a2))
* **ui5-time-picker:** enable text spacing ([#5940](https://github.com/SAP/ui5-webcomponents/issues/5940)) ([da7ae70](https://github.com/SAP/ui5-webcomponents/commit/da7ae70b6a672d3dac3defa0387fe910bd9594f7)), closes [#5792](https://github.com/SAP/ui5-webcomponents/issues/5792)


### Features

* **framework:** generate custom elements manifest ([#5964](https://github.com/SAP/ui5-webcomponents/issues/5964)) ([0d62770](https://github.com/SAP/ui5-webcomponents/commit/0d62770cace54fd9aef73d9632dd06d8a83680e9))
* **ui5-avatar:** support of 3 letters is enabled ([#5870](https://github.com/SAP/ui5-webcomponents/issues/5870)) ([43338e1](https://github.com/SAP/ui5-webcomponents/commit/43338e1dba3053f4af273de78e86f5c36b7aa2a3))
* **ui5-li:** introduce deleteButton slot ([#5971](https://github.com/SAP/ui5-webcomponents/issues/5971)) ([ca40efd](https://github.com/SAP/ui5-webcomponents/commit/ca40efdd1465903a2dc0d50f31f5213a34dbe7a1)), closes [#5826](https://github.com/SAP/ui5-webcomponents/issues/5826)
* **ui5-link:** make acceessibleRole property public ([#5879](https://github.com/SAP/ui5-webcomponents/issues/5879)) ([6ce8b2d](https://github.com/SAP/ui5-webcomponents/commit/6ce8b2dee9cbf0ccbe2d310a241f02c173d85cd9)), closes [#5686](https://github.com/SAP/ui5-webcomponents/issues/5686)
* **ui5-radiobutton:** add "required" property ([#5937](https://github.com/SAP/ui5-webcomponents/issues/5937)) ([621b87a](https://github.com/SAP/ui5-webcomponents/commit/621b87a4f62a41ee603255b2982efb6d34782da3))
* **ui5-switch:** provide tooltip property ([#5954](https://github.com/SAP/ui5-webcomponents/issues/5954)) ([5b5db73](https://github.com/SAP/ui5-webcomponents/commit/5b5db734e1e3ff475867b5e8d243b146163ee14e)), closes [#5552](https://github.com/SAP/ui5-webcomponents/issues/5552)
* **ui5-table-row:** added navigated property ([#5946](https://github.com/SAP/ui5-webcomponents/issues/5946)) ([3c2a8a3](https://github.com/SAP/ui5-webcomponents/commit/3c2a8a3079f7d5598c281b294e184ae960db7470))





# [1.8.0](https://github.com/SAP/ui5-webcomponents/compare/v1.7.1...v1.8.0) (2022-10-03)


### Bug Fixes

* **ui5-breadcrumbs-popover:** aligned footer items ([#5821](https://github.com/SAP/ui5-webcomponents/issues/5821)) ([b1aa6e7](https://github.com/SAP/ui5-webcomponents/commit/b1aa6e70086689678175506b230479c8dbff6f99)), closes [#5810](https://github.com/SAP/ui5-webcomponents/issues/5810)
* **ui5-dialog:** correct imports in HC theme bundles ([#5851](https://github.com/SAP/ui5-webcomponents/issues/5851)) ([3cef0d5](https://github.com/SAP/ui5-webcomponents/commit/3cef0d5a104a4acd8b790cfd7549c5b890bdc81f)), closes [#5832](https://github.com/SAP/ui5-webcomponents/issues/5832)
* **ui5-dialog:** fixed text selection when the dialog is draggable ([#5724](https://github.com/SAP/ui5-webcomponents/issues/5724)) ([9e0c79f](https://github.com/SAP/ui5-webcomponents/commit/9e0c79fe7bf623d9b113be5b6df4a569293babbc))
* **ui5-input,ui5-combobox:** remove 'selected' announcement ([#5864](https://github.com/SAP/ui5-webcomponents/issues/5864)) ([e04adde](https://github.com/SAP/ui5-webcomponents/commit/e04added4ff84ffca490e3ce03d4dd54cffb600c))
* **ui5-input:** announce suggestion text once ([#5817](https://github.com/SAP/ui5-webcomponents/issues/5817)) ([6225e10](https://github.com/SAP/ui5-webcomponents/commit/6225e10011b668da92584f434f33640000ed2310))
* **ui5-input:** enable autocomplete deletion by Meta/Alt + backspace ([#5729](https://github.com/SAP/ui5-webcomponents/issues/5729)) ([df0fff6](https://github.com/SAP/ui5-webcomponents/commit/df0fff656392664c6ea1d8e63538dd787a37d0cf))
* **ui5-input:** handle deletion in numeric input ([#5676](https://github.com/SAP/ui5-webcomponents/issues/5676)) ([3858adb](https://github.com/SAP/ui5-webcomponents/commit/3858adb1d2e88c1bd26b09f12a25a7dffc691ba2)), closes [#4932](https://github.com/SAP/ui5-webcomponents/issues/4932)
* **ui5-multi-combobox:** apply focus when invoked explicitly ([#5850](https://github.com/SAP/ui5-webcomponents/issues/5850)) ([212b2ef](https://github.com/SAP/ui5-webcomponents/commit/212b2ef49d54f6328220a6d713e3ce8be5f8ab36))
* **ui5-panel:** improve focus outline visualization ([#5811](https://github.com/SAP/ui5-webcomponents/issues/5811)) ([83b244c](https://github.com/SAP/ui5-webcomponents/commit/83b244c300cd179c0584d0bf6d302e3631fb3581))
* **ui5-radio-button:** correct syncing radio group when exiting DOM ([#5859](https://github.com/SAP/ui5-webcomponents/issues/5859)) ([0dca9b2](https://github.com/SAP/ui5-webcomponents/commit/0dca9b2c87509be9ec3725681d8aa2dd23e59219)), closes [#5803](https://github.com/SAP/ui5-webcomponents/issues/5803)
* **ui5-tabcontainer:** fix closing overflow on mobile ([#5855](https://github.com/SAP/ui5-webcomponents/issues/5855)) ([996714e](https://github.com/SAP/ui5-webcomponents/commit/996714eb9345e3efd796cf8b3c46c8e198fd18e2)), closes [#5854](https://github.com/SAP/ui5-webcomponents/issues/5854)
* **ui5-tabcontainer:** fixed error when no tabs ([#5793](https://github.com/SAP/ui5-webcomponents/issues/5793)) ([cfb8951](https://github.com/SAP/ui5-webcomponents/commit/cfb8951f0acb30e1ebf54a18c2e9a3f5cf88cba1))
* **ui5-tabcontainer:** fixed tabs accessibility issues ([#5846](https://github.com/SAP/ui5-webcomponents/issues/5846)) ([e633b8b](https://github.com/SAP/ui5-webcomponents/commit/e633b8b3003136f6ad7696a0d12af807e38c18dc))
* **ui5-table:** add bottom border in Horizon themes ([#5807](https://github.com/SAP/ui5-webcomponents/issues/5807)) ([63bbf89](https://github.com/SAP/ui5-webcomponents/commit/63bbf89556fc254b3b53f6954bf48be0ad69b1a5))
* **ui5-table:** adjust samples according to the guidelines ([#5828](https://github.com/SAP/ui5-webcomponents/issues/5828)) ([debf472](https://github.com/SAP/ui5-webcomponents/commit/debf472f18f6a91a5eadee6d7f64da8563d4d0f7))
* **ui5-table:** apply correct padding in RTL mode ([#5805](https://github.com/SAP/ui5-webcomponents/issues/5805)) ([301fc4e](https://github.com/SAP/ui5-webcomponents/commit/301fc4ede2c1ab899a6a9268ed9bf776112ff42f))
* **ui5-table:** count header row as first one ([#5800](https://github.com/SAP/ui5-webcomponents/issues/5800)) ([9bef86f](https://github.com/SAP/ui5-webcomponents/commit/9bef86fd7b780e8e4fe7ba6e2720ff0444e73847))
* **ui5-textarea:** announce value state type ([#5798](https://github.com/SAP/ui5-webcomponents/issues/5798)) ([a689502](https://github.com/SAP/ui5-webcomponents/commit/a6895025300e707d63c0ab4f413b07f6a6f96563)), closes [#5716](https://github.com/SAP/ui5-webcomponents/issues/5716)
* **ui5-tokenizer:** return correct token on delete event ([#5744](https://github.com/SAP/ui5-webcomponents/issues/5744)) ([d694a88](https://github.com/SAP/ui5-webcomponents/commit/d694a8884782c576bbef720068bbbd62db3602a3))


### Features

* **main:** add support for custom SVG icons ([#5865](https://github.com/SAP/ui5-webcomponents/issues/5865)) ([d8b7200](https://github.com/SAP/ui5-webcomponents/commit/d8b7200f30c16d94b7f15ddbdf9808d8efbaa38c))
* **ui5-menu-item:** implement additional text ([#5867](https://github.com/SAP/ui5-webcomponents/issues/5867)) ([bf991b6](https://github.com/SAP/ui5-webcomponents/commit/bf991b6bb519e4cc849a542d67f4954efc4b55e3))
* **ui5-tree:** introduce `accessibleName` and  `accessibleNameRef` properties ([#5804](https://github.com/SAP/ui5-webcomponents/issues/5804)) ([2e3452a](https://github.com/SAP/ui5-webcomponents/commit/2e3452a98463aa3b78231651ac63771d3cbc5c1a))





## [1.7.1](https://github.com/SAP/ui5-webcomponents/compare/v1.7.0...v1.7.1) (2022-09-08)


### Bug Fixes

* **ui5-tabcontainer:** fixed error when no tabs ([#5793](https://github.com/SAP/ui5-webcomponents/issues/5793)) ([4aefe17](https://github.com/SAP/ui5-webcomponents/commit/4aefe176bfed5a6ba963418413aa167955b40418))





# [1.7.0](https://github.com/SAP/ui5-webcomponents/compare/v1.6.0...v1.7.0) (2022-09-02)


### Bug Fixes

* correct imports of horizon Badge CSS files ([#5673](https://github.com/SAP/ui5-webcomponents/issues/5673)) ([583a63d](https://github.com/SAP/ui5-webcomponents/commit/583a63ddc93717fe3a7f047888ca964a53091415))
* correctly calculate accessibleNameRef ([#5520](https://github.com/SAP/ui5-webcomponents/issues/5520)) ([a872c9b](https://github.com/SAP/ui5-webcomponents/commit/a872c9be58ee38f2d81d65e1a977cf7c80a380fd)), closes [#5452](https://github.com/SAP/ui5-webcomponents/issues/5452)
* remove woff files and woff/ttf usage ([#5629](https://github.com/SAP/ui5-webcomponents/issues/5629)) ([e4175cd](https://github.com/SAP/ui5-webcomponents/commit/e4175cdf000ace65758e75fb70545edd872197b8))
* **ui5-avatar-group:** width calculations for (non-)Chromium browsers adjusted ([#5737](https://github.com/SAP/ui5-webcomponents/issues/5737)) ([2741705](https://github.com/SAP/ui5-webcomponents/commit/274170508f944d1cbcd3df7e2a66d7cc55a9c2cd)), closes [#5643](https://github.com/SAP/ui5-webcomponents/issues/5643)
* **ui5-breadcrumbs:** current location misalignment is fixed ([#5585](https://github.com/SAP/ui5-webcomponents/issues/5585)) ([b685860](https://github.com/SAP/ui5-webcomponents/commit/b685860f56ad8669969a5d7df087ea26cdaf8351))
* **ui5-button:** adjust icon role ([#5714](https://github.com/SAP/ui5-webcomponents/issues/5714)) ([5b446f5](https://github.com/SAP/ui5-webcomponents/commit/5b446f52d2634ba400f2fbe2938d48fdd6c056af)), closes [#5505](https://github.com/SAP/ui5-webcomponents/issues/5505) [#5596](https://github.com/SAP/ui5-webcomponents/issues/5596) [#5687](https://github.com/SAP/ui5-webcomponents/issues/5687)
* **ui5-button:** announce is now correct when button is icon only with tooltip ([#5592](https://github.com/SAP/ui5-webcomponents/issues/5592)) ([7703945](https://github.com/SAP/ui5-webcomponents/commit/77039457ce0492894e416cdd0ecac0f9baaf8746)), closes [#5386](https://github.com/SAP/ui5-webcomponents/issues/5386)
* **ui5-button:** correct calculation of the min width of an icon button ([#5701](https://github.com/SAP/ui5-webcomponents/issues/5701)) ([005ada0](https://github.com/SAP/ui5-webcomponents/commit/005ada03f47f9b7657cf714cee4bfe3f6559acc8))
* **ui5-button:** correct text shadow in contrast themes ([#5750](https://github.com/SAP/ui5-webcomponents/issues/5750)) ([7fb7e4c](https://github.com/SAP/ui5-webcomponents/commit/7fb7e4cc4aa7dc6a7566226fc46513441e39cfde)), closes [#5420](https://github.com/SAP/ui5-webcomponents/issues/5420)
* **ui5-button:** provide tooltip for icon-only buttons ([#5734](https://github.com/SAP/ui5-webcomponents/issues/5734)) ([d49427f](https://github.com/SAP/ui5-webcomponents/commit/d49427f4a07d1f1c744bbc8f9964307662718440)), closes [#5687](https://github.com/SAP/ui5-webcomponents/issues/5687) [#5596](https://github.com/SAP/ui5-webcomponents/issues/5596) [#5505](https://github.com/SAP/ui5-webcomponents/issues/5505)
* **ui5-calendar:** adjust high contrast belize themes ([#5756](https://github.com/SAP/ui5-webcomponents/issues/5756)) ([4d19f91](https://github.com/SAP/ui5-webcomponents/commit/4d19f91f13f355f35d97b702fb4c8ccba0118a4b)), closes [#5377](https://github.com/SAP/ui5-webcomponents/issues/5377)
* **ui5-calendar:** adjust the role attribute of the header actions elements ([#5723](https://github.com/SAP/ui5-webcomponents/issues/5723)) ([3acd9bf](https://github.com/SAP/ui5-webcomponents/commit/3acd9bf5b44b1de3d919e46a5292dfbdae2ad340)), closes [#5708](https://github.com/SAP/ui5-webcomponents/issues/5708)
* **ui5-calendar:** align year and month picker focus to horizon ([#5692](https://github.com/SAP/ui5-webcomponents/issues/5692)) ([02816a9](https://github.com/SAP/ui5-webcomponents/commit/02816a944f392aded156d4725fef86f9c5382746)), closes [#5644](https://github.com/SAP/ui5-webcomponents/issues/5644)
* **ui5-date-picker:** focus out now closes the popup ([#5603](https://github.com/SAP/ui5-webcomponents/issues/5603)) ([0a7fcac](https://github.com/SAP/ui5-webcomponents/commit/0a7fcac976f56c3598ebe20af9acde4d8d1cd2d0)), closes [#5532](https://github.com/SAP/ui5-webcomponents/issues/5532)
* **ui5-date-picker:** remove background whitespace ([#5764](https://github.com/SAP/ui5-webcomponents/issues/5764)) ([2ad0c44](https://github.com/SAP/ui5-webcomponents/commit/2ad0c4480fbaea02ea8c5f6c25ab62490bddd641)), closes [#5640](https://github.com/SAP/ui5-webcomponents/issues/5640)
* **ui5-daterange-picker:** handle single date value ([#5769](https://github.com/SAP/ui5-webcomponents/issues/5769)) ([ce8a446](https://github.com/SAP/ui5-webcomponents/commit/ce8a446b32cd56b2e6d547c8f75b1f56b5426c99))
* **ui5-input:** additional check added for robustness ([#5619](https://github.com/SAP/ui5-webcomponents/issues/5619)) ([7275652](https://github.com/SAP/ui5-webcomponents/commit/72756520d7d7183bcee8db94ccd7e0e817024ff5)), closes [#5580](https://github.com/SAP/ui5-webcomponents/issues/5580)
* **ui5-input:** allows changing value in selection change event handler ([#5677](https://github.com/SAP/ui5-webcomponents/issues/5677)) ([46b175f](https://github.com/SAP/ui5-webcomponents/commit/46b175f8a6e1ff52adb6b1bf237e8df5fc482455))
* **ui5-input:** correction of change event ([#5671](https://github.com/SAP/ui5-webcomponents/issues/5671)) ([b89f91c](https://github.com/SAP/ui5-webcomponents/commit/b89f91c0a2f8afb336f2269cc441566b3ebfdd2c))
* **ui5-input:** fix item selection bugs ([#5372](https://github.com/SAP/ui5-webcomponents/issues/5372)) ([274efaa](https://github.com/SAP/ui5-webcomponents/commit/274efaaa212e3152d27665f1809e649a75f67001))
* **ui5-link:** multiple click events ([#5642](https://github.com/SAP/ui5-webcomponents/issues/5642)) ([74fd5b9](https://github.com/SAP/ui5-webcomponents/commit/74fd5b91fd83bf28c0f4347df92b3721eb11577d))
* **ui5-list:** unexpected spaces between group items ([#5726](https://github.com/SAP/ui5-webcomponents/issues/5726)) ([d69932c](https://github.com/SAP/ui5-webcomponents/commit/d69932c02afec12d0b9d6c600459abe1a1673395)), closes [#3869](https://github.com/SAP/ui5-webcomponents/issues/3869) [#5720](https://github.com/SAP/ui5-webcomponents/issues/5720)
* **ui5-menu:** opening a submenu no longer throws a console error ([#5591](https://github.com/SAP/ui5-webcomponents/issues/5591)) ([1b5caf7](https://github.com/SAP/ui5-webcomponents/commit/1b5caf761079017d7edbe4bff2fa9949390896f8)), closes [#5582](https://github.com/SAP/ui5-webcomponents/issues/5582)
* **ui5-menu:** prevent closing sub menu when hovering over icon ([#5670](https://github.com/SAP/ui5-webcomponents/issues/5670)) ([36cb3d2](https://github.com/SAP/ui5-webcomponents/commit/36cb3d20b2c51920f7bb31b2a44895060e456977)), closes [#5669](https://github.com/SAP/ui5-webcomponents/issues/5669)
* **ui5-multiinput:** prevented token-delete event firing when readonly ([#5613](https://github.com/SAP/ui5-webcomponents/issues/5613)) ([c8f4178](https://github.com/SAP/ui5-webcomponents/commit/c8f417819a8628afeff2ca496a4d72335190463e)), closes [#5448](https://github.com/SAP/ui5-webcomponents/issues/5448)
* **ui5-panel:** recognizable panel heading ([#5628](https://github.com/SAP/ui5-webcomponents/issues/5628)) ([6f1b250](https://github.com/SAP/ui5-webcomponents/commit/6f1b250813d858baaeabada4996daecfb8da9a08))
* **ui5-panel:** toggle ui5-panel correctly on Enter key ([#5660](https://github.com/SAP/ui5-webcomponents/issues/5660)) ([137d8f3](https://github.com/SAP/ui5-webcomponents/commit/137d8f395b7ebd6df2f180a6fcec83bdb959b931))
* **ui5-popup:** Synchronous opening of a popup from another popup with Enter key now works ([#4975](https://github.com/SAP/ui5-webcomponents/issues/4975)) ([1bb87f5](https://github.com/SAP/ui5-webcomponents/commit/1bb87f5a3ced8b11741deec6e64a6ad6a0af08cf)), closes [#4861](https://github.com/SAP/ui5-webcomponents/issues/4861)
* **ui5-select:** selected option in dropdown is now read out ([#5589](https://github.com/SAP/ui5-webcomponents/issues/5589)) ([f8ab6ed](https://github.com/SAP/ui5-webcomponents/commit/f8ab6ede3ff8ee1b972c0cdeb8399d446b4888b0))
* **ui5-slider, ui5-range-slider:** apply correct handle's icon ([#5612](https://github.com/SAP/ui5-webcomponents/issues/5612)) ([1706174](https://github.com/SAP/ui5-webcomponents/commit/1706174a9f052f293d87338b7cb00241b911d9d4))
* **ui5-tabcontainer:** update tab strip on tab selection ([#5449](https://github.com/SAP/ui5-webcomponents/issues/5449)) ([bbc9246](https://github.com/SAP/ui5-webcomponents/commit/bbc9246647854a4a509a6fe9c368cfd89a9cddb9)), closes [#5172](https://github.com/SAP/ui5-webcomponents/issues/5172) [#5116](https://github.com/SAP/ui5-webcomponents/issues/5116)
* **ui5-textarea:** show exceeded text when maxLength is 0 ([#5691](https://github.com/SAP/ui5-webcomponents/issues/5691)) ([52db670](https://github.com/SAP/ui5-webcomponents/commit/52db67087dfbcd61770755b6220a73fe1fe0195a)), closes [#5384](https://github.com/SAP/ui5-webcomponents/issues/5384)
* **ui5-time-picker:** remove ampm translation ([#5751](https://github.com/SAP/ui5-webcomponents/issues/5751)) ([4943ef9](https://github.com/SAP/ui5-webcomponents/commit/4943ef94683b197e1a3ee6c9995e05187d9b52d2)), closes [#5181](https://github.com/SAP/ui5-webcomponents/issues/5181)
* **ui5-tokenizer:** adjust scrolling behavior ([#5281](https://github.com/SAP/ui5-webcomponents/issues/5281)) ([572ca8d](https://github.com/SAP/ui5-webcomponents/commit/572ca8d58ccb6e189d4874c0f77b8558e1987a70))
* **ui5-tree:** include `targetItem` in `selection-change` event ([#5631](https://github.com/SAP/ui5-webcomponents/issues/5631)) ([dc73fe2](https://github.com/SAP/ui5-webcomponents/commit/dc73fe284ef23200c734f4d62308bd9ace2e0fcf)), closes [#5430](https://github.com/SAP/ui5-webcomponents/issues/5430)


### Features

* **framework:** reset scrollbar styles class ([#5623](https://github.com/SAP/ui5-webcomponents/issues/5623)) ([c3f3063](https://github.com/SAP/ui5-webcomponents/commit/c3f306383f971744886b99cc60911dcba924720b))
* **icons:** update to 4.14.0 5.0.2 SAP-Icons font ([#5605](https://github.com/SAP/ui5-webcomponents/issues/5605)) ([d794c0b](https://github.com/SAP/ui5-webcomponents/commit/d794c0b84ea03581cd969a84dc5c05383ec91b60))
* **ui5-avatar:** introduce badge support ([#5418](https://github.com/SAP/ui5-webcomponents/issues/5418)) ([816edf0](https://github.com/SAP/ui5-webcomponents/commit/816edf048ddeb67bc6332d85d38bb93431a6b1fb))
* **ui5-carousel:** add new CSS Shadow part ([#5700](https://github.com/SAP/ui5-webcomponents/issues/5700)) ([b60ff3f](https://github.com/SAP/ui5-webcomponents/commit/b60ff3ff0bfd48af58838ef1b40d4bbe5f7cab76))
* **ui5-dialog:** add state property ([#5587](https://github.com/SAP/ui5-webcomponents/issues/5587)) ([c680e7c](https://github.com/SAP/ui5-webcomponents/commit/c680e7cb3a1e1cc6e34ff1ac11b106c8314c04e9))
* **ui5-icon:** support SVGs with multiple paths  ([#5630](https://github.com/SAP/ui5-webcomponents/issues/5630)) ([ce17ca5](https://github.com/SAP/ui5-webcomponents/commit/ce17ca559ce507b8e10f20d7f80dab48908a8305)), closes [#5347](https://github.com/SAP/ui5-webcomponents/issues/5347) [#5526](https://github.com/SAP/ui5-webcomponents/issues/5526)
* **ui5-menu-item:** add new `accessibleName` property ([#5727](https://github.com/SAP/ui5-webcomponents/issues/5727)) ([51987c8](https://github.com/SAP/ui5-webcomponents/commit/51987c8db1b3d152c585cb242fcb05dd54e6b80d)), closes [#5514](https://github.com/SAP/ui5-webcomponents/issues/5514) [#5656](https://github.com/SAP/ui5-webcomponents/issues/5656)
* **ui5-popover:** new type DOMReference for opener ([#5609](https://github.com/SAP/ui5-webcomponents/issues/5609)) ([1a4de12](https://github.com/SAP/ui5-webcomponents/commit/1a4de12b37a2cb82be2af010758f4641acf7385d))
* **ui5-tabcontainer:** make tab-select event preventable ([#5661](https://github.com/SAP/ui5-webcomponents/issues/5661)) ([928f4fc](https://github.com/SAP/ui5-webcomponents/commit/928f4fc62181aa4e562eec4d8e06b5e39918c9b2)), closes [#5116](https://github.com/SAP/ui5-webcomponents/issues/5116)


### Reverts

* Revert "fix(ui5-button): adjust icon role" (#5722) ([22170f4](https://github.com/SAP/ui5-webcomponents/commit/22170f4c9ca591de8c807a5495c95443de51e056)), closes [#5722](https://github.com/SAP/ui5-webcomponents/issues/5722) [#5714](https://github.com/SAP/ui5-webcomponents/issues/5714)





# [1.6.0](https://github.com/SAP/ui5-webcomponents/compare/v1.5.0...v1.6.0) (2022-07-25)


### Bug Fixes

* **formEnablement:** correct submit event behaviour ([#5500](https://github.com/SAP/ui5-webcomponents/issues/5500)) ([07237ec](https://github.com/SAP/ui5-webcomponents/commit/07237ec))
* **inputs:** adjust placeholder styling ([#5547](https://github.com/SAP/ui5-webcomponents/issues/5547)) ([c427344](https://github.com/SAP/ui5-webcomponents/commit/c427344))
* **InvisibleMessage:** clear announcement after a while ([#5446](https://github.com/SAP/ui5-webcomponents/issues/5446)) ([af213f1](https://github.com/SAP/ui5-webcomponents/commit/af213f1))
* **MultoComboBox:** fix component scoping ([#5553](https://github.com/SAP/ui5-webcomponents/issues/5553)) ([9c26e8e](https://github.com/SAP/ui5-webcomponents/commit/9c26e8e)), closes [#5521](https://github.com/SAP/ui5-webcomponents/issues/5521)
* **ui5-card:** correct accessibility attribute ([#5479](https://github.com/SAP/ui5-webcomponents/issues/5479)) ([48ff032](https://github.com/SAP/ui5-webcomponents/commit/48ff032))
* **ui5-combobox:** annouce group item's text when accessed via keyboard ([#5478](https://github.com/SAP/ui5-webcomponents/issues/5478)) ([0f60574](https://github.com/SAP/ui5-webcomponents/commit/0f60574))
* **ui5-combobox:** correct ok and close buttons' behavior, as well as item select behavior on mobile ([#5541](https://github.com/SAP/ui5-webcomponents/issues/5541)) ([fdf25c3](https://github.com/SAP/ui5-webcomponents/commit/fdf25c3))
* **ui5-combobox:** correctly fire change event on item press ([#5447](https://github.com/SAP/ui5-webcomponents/issues/5447)) ([0218c19](https://github.com/SAP/ui5-webcomponents/commit/0218c19)), closes [#5432](https://github.com/SAP/ui5-webcomponents/issues/5432)
* **ui5-combobox:** simplify condition ([#5508](https://github.com/SAP/ui5-webcomponents/issues/5508)) ([514f632](https://github.com/SAP/ui5-webcomponents/commit/514f632))
* **ui5-date-picker:** adjust background color ([#5466](https://github.com/SAP/ui5-webcomponents/issues/5466)) ([7ea3f49](https://github.com/SAP/ui5-webcomponents/commit/7ea3f49)), closes [#5396](https://github.com/SAP/ui5-webcomponents/issues/5396)
* **ui5-date-picker:** adjust value help icon role ([#5419](https://github.com/SAP/ui5-webcomponents/issues/5419)) ([56cc995](https://github.com/SAP/ui5-webcomponents/commit/56cc995)), closes [#5378](https://github.com/SAP/ui5-webcomponents/issues/5378)
* **ui5-input:** enhance lazy loading ([#5370](https://github.com/SAP/ui5-webcomponents/issues/5370)) ([73010dc](https://github.com/SAP/ui5-webcomponents/commit/73010dc))
* **ui5-input, ui5-multi-input, ui5-combobox, ui5-multi-combobox:** announce value state type ([#5515](https://github.com/SAP/ui5-webcomponents/issues/5515)) ([82317d0](https://github.com/SAP/ui5-webcomponents/commit/82317d0)), closes [#5392](https://github.com/SAP/ui5-webcomponents/issues/5392)
* **ui5-li:** correct accessibility attribute to checkbox ([#5475](https://github.com/SAP/ui5-webcomponents/issues/5475)) ([88f278b](https://github.com/SAP/ui5-webcomponents/commit/88f278b))
* **ui5-li-groupheader:** use group role on UL nodes only ([#5518](https://github.com/SAP/ui5-webcomponents/issues/5518)) ([1010f73](https://github.com/SAP/ui5-webcomponents/commit/1010f73)), closes [#5400](https://github.com/SAP/ui5-webcomponents/issues/5400)
* **ui5-list:** focus handling on nested lists ([#5502](https://github.com/SAP/ui5-webcomponents/issues/5502)) ([5d4ae79](https://github.com/SAP/ui5-webcomponents/commit/5d4ae79))
* **ui5-panel:** add tooltip to expand/collapse icon ([#5543](https://github.com/SAP/ui5-webcomponents/issues/5543)) ([533469d](https://github.com/SAP/ui5-webcomponents/commit/533469d))
* **ui5-panel:** enhance aria-labelledby handling ([#5539](https://github.com/SAP/ui5-webcomponents/issues/5539)) ([410dee1](https://github.com/SAP/ui5-webcomponents/commit/410dee1))
* **ui5-radio-button:** correct keyboard navigation in RTL ([#5529](https://github.com/SAP/ui5-webcomponents/issues/5529)) ([bc726a9](https://github.com/SAP/ui5-webcomponents/commit/bc726a9))
* **ui5-select:** announce value state type ([#5538](https://github.com/SAP/ui5-webcomponents/issues/5538)) ([c0f8a2a](https://github.com/SAP/ui5-webcomponents/commit/c0f8a2a))
* **ui5-table:** render selectAll checkbox only in case ui5-table is not empty ([#5523](https://github.com/SAP/ui5-webcomponents/issues/5523)) ([cbf23d1](https://github.com/SAP/ui5-webcomponents/commit/cbf23d1))
* **ui5-title:** use correct font-family for Horizon Themes ([#5457](https://github.com/SAP/ui5-webcomponents/issues/5457)) ([62c4c20](https://github.com/SAP/ui5-webcomponents/commit/62c4c20))


### Features

* **ui5-calendar:** show months and years from both primary and secon… ([#5412](https://github.com/SAP/ui5-webcomponents/issues/5412)) ([d5dc7ec](https://github.com/SAP/ui5-webcomponents/commit/d5dc7ec))
* **ui5-panel:** remove header when not used ([#5513](https://github.com/SAP/ui5-webcomponents/issues/5513)) ([73757a4](https://github.com/SAP/ui5-webcomponents/commit/73757a4))
* **ui5-radio-button:** add accessibleName property ([#5548](https://github.com/SAP/ui5-webcomponents/issues/5548)) ([967b441](https://github.com/SAP/ui5-webcomponents/commit/967b441)), closes [#5516](https://github.com/SAP/ui5-webcomponents/issues/5516)





# [1.5.0](https://github.com/SAP/ui5-webcomponents/compare/v1.4.0...v1.5.0) (2022-07-03)


### Bug Fixes

* **formEnablement:** enable required attribute ([#5133](https://github.com/SAP/ui5-webcomponents/issues/5133)) ([ff044b0](https://github.com/SAP/ui5-webcomponents/commit/ff044b0)), closes [#3498](https://github.com/SAP/ui5-webcomponents/issues/3498)
* **framework:** correct use of arrow keys for ItemNavigation in RTL ([#5408](https://github.com/SAP/ui5-webcomponents/issues/5408)) ([cec8119](https://github.com/SAP/ui5-webcomponents/commit/cec8119)), closes [#5166](https://github.com/SAP/ui5-webcomponents/issues/5166)
* **ui5-avatar-group:** adapt width calculations in composite layouts ([#5357](https://github.com/SAP/ui5-webcomponents/issues/5357)) ([d176800](https://github.com/SAP/ui5-webcomponents/commit/d176800)), closes [#5333](https://github.com/SAP/ui5-webcomponents/issues/5333)
* **ui5-badge:** correctly detect if default slot is provided ([#5334](https://github.com/SAP/ui5-webcomponents/issues/5334)) ([0dceaf5](https://github.com/SAP/ui5-webcomponents/commit/0dceaf5)), closes [#5328](https://github.com/SAP/ui5-webcomponents/issues/5328)
* **ui5-button:** adjust icon role ([#5355](https://github.com/SAP/ui5-webcomponents/issues/5355)) ([1aac3c5](https://github.com/SAP/ui5-webcomponents/commit/1aac3c5)), closes [#5288](https://github.com/SAP/ui5-webcomponents/issues/5288)
* **ui5-card:** refactor header to avoid nesting interactive elements ([#5301](https://github.com/SAP/ui5-webcomponents/issues/5301)) ([9b33bad](https://github.com/SAP/ui5-webcomponents/commit/9b33bad))
* **ui5-carousel:** correct navigation buttons behavior ([#5302](https://github.com/SAP/ui5-webcomponents/issues/5302)) ([34027cd](https://github.com/SAP/ui5-webcomponents/commit/34027cd)), closes [#5125](https://github.com/SAP/ui5-webcomponents/issues/5125)
* **ui5-checkbox:** correct label color in Horizon ([#5375](https://github.com/SAP/ui5-webcomponents/issues/5375)) ([659cd7f](https://github.com/SAP/ui5-webcomponents/commit/659cd7f)), closes [#5364](https://github.com/SAP/ui5-webcomponents/issues/5364)
* **ui5-combobox:** change event is now fired on Enter if value is cha… ([#5284](https://github.com/SAP/ui5-webcomponents/issues/5284)) ([b8a4854](https://github.com/SAP/ui5-webcomponents/commit/b8a4854))
* **ui5-combobox, ui5-multi-combobox:** adjust dropdown width according to the visual specification ([#5371](https://github.com/SAP/ui5-webcomponents/issues/5371)) ([e585304](https://github.com/SAP/ui5-webcomponents/commit/e585304))
* **ui5-dialog:** add height to footer and samples achieving fiori footer design ([#5338](https://github.com/SAP/ui5-webcomponents/issues/5338)) ([03269f4](https://github.com/SAP/ui5-webcomponents/commit/03269f4))
* **ui5-dialog:** improved shrinking dialog when resizing ([#5291](https://github.com/SAP/ui5-webcomponents/issues/5291)) ([997f2a2](https://github.com/SAP/ui5-webcomponents/commit/997f2a2)), closes [#5265](https://github.com/SAP/ui5-webcomponents/issues/5265)
* **ui5-dialog:** make header text bold ([#5266](https://github.com/SAP/ui5-webcomponents/issues/5266)) ([42c0cbe](https://github.com/SAP/ui5-webcomponents/commit/42c0cbe)), closes [#5230](https://github.com/SAP/ui5-webcomponents/issues/5230)
* **ui5-dialog:** reposition on screen resize ([#5283](https://github.com/SAP/ui5-webcomponents/issues/5283)) ([c2341e8](https://github.com/SAP/ui5-webcomponents/commit/c2341e8))
* **ui5-input:** fix typeahead on mobile devices ([#5292](https://github.com/SAP/ui5-webcomponents/issues/5292)) ([edcdd24](https://github.com/SAP/ui5-webcomponents/commit/edcdd24))
* **ui5-input:** refactor change event ([#5296](https://github.com/SAP/ui5-webcomponents/issues/5296)) ([17465e3](https://github.com/SAP/ui5-webcomponents/commit/17465e3))
* **ui5-li:** correct accessible-name mappings ([#5280](https://github.com/SAP/ui5-webcomponents/issues/5280)) ([21ed1ee](https://github.com/SAP/ui5-webcomponents/commit/21ed1ee))
* **ui5-link:** enable overstyling ([#5366](https://github.com/SAP/ui5-webcomponents/issues/5366)) ([a359ebf](https://github.com/SAP/ui5-webcomponents/commit/a359ebf)), closes [#5267](https://github.com/SAP/ui5-webcomponents/issues/5267) [#5218](https://github.com/SAP/ui5-webcomponents/issues/5218)
* **ui5-panel:** set pointer cursor only over the header ([#5275](https://github.com/SAP/ui5-webcomponents/issues/5275)) ([04c23b9](https://github.com/SAP/ui5-webcomponents/commit/04c23b9))
* **ui5-popover:** avoid dangling aria-labelledby attribute ([#5428](https://github.com/SAP/ui5-webcomponents/issues/5428)) ([21d5457](https://github.com/SAP/ui5-webcomponents/commit/21d5457)), closes [#3956](https://github.com/SAP/ui5-webcomponents/issues/3956)
* **ui5-rating-indicator:** apply correct styles for focus in HC themes ([#5289](https://github.com/SAP/ui5-webcomponents/issues/5289)) ([4531582](https://github.com/SAP/ui5-webcomponents/commit/4531582))
* **ui5-rating-indicator:** import ui5-icon as used in template ([#5320](https://github.com/SAP/ui5-webcomponents/issues/5320)) ([885e359](https://github.com/SAP/ui5-webcomponents/commit/885e359)), closes [#5318](https://github.com/SAP/ui5-webcomponents/issues/5318)
* **ui5-slider, ui5-range-slider:** adjust padding to spec ([#5343](https://github.com/SAP/ui5-webcomponents/issues/5343)) ([bfbd23f](https://github.com/SAP/ui5-webcomponents/commit/bfbd23f)), closes [#4801](https://github.com/SAP/ui5-webcomponents/issues/4801)
* **ui5-tabcontainer:** make disabled tabs focusable in overflow ([#5300](https://github.com/SAP/ui5-webcomponents/issues/5300)) ([c39917f](https://github.com/SAP/ui5-webcomponents/commit/c39917f))


### Features

* **ui5-datetime-picker:** make change events preventable ([#5286](https://github.com/SAP/ui5-webcomponents/issues/5286)) ([7395dc3](https://github.com/SAP/ui5-webcomponents/commit/7395dc3)), closes [#4684](https://github.com/SAP/ui5-webcomponents/issues/4684) [#5121](https://github.com/SAP/ui5-webcomponents/issues/5121)
* **ui5-link, ui5-breadcrumbs:** add modifiers keys to click event ([#5228](https://github.com/SAP/ui5-webcomponents/issues/5228)) ([379cc7b](https://github.com/SAP/ui5-webcomponents/commit/379cc7b))
* **ui5-multi-combobox:** implement type ahead (autocomplete) ([#5358](https://github.com/SAP/ui5-webcomponents/issues/5358)) ([b8e46f4](https://github.com/SAP/ui5-webcomponents/commit/b8e46f4))
* **ui5-multi-combobox:** introduce grouping functionality ([#5250](https://github.com/SAP/ui5-webcomponents/issues/5250)) ([597a6f2](https://github.com/SAP/ui5-webcomponents/commit/597a6f2))





# [1.4.0](https://github.com/SAP/ui5-webcomponents/compare/v1.3.1...v1.4.0) (2022-05-25)


### Bug Fixes

* **ui5-breadcrumbs:** set aria-current to the focused element ([#5214](https://github.com/SAP/ui5-webcomponents/issues/5214)) ([20d8b83](https://github.com/SAP/ui5-webcomponents/commit/20d8b83))
* **ui5-calendar:** adjust previous and next button styles ([#5226](https://github.com/SAP/ui5-webcomponents/issues/5226)) ([87f6b36](https://github.com/SAP/ui5-webcomponents/commit/87f6b36)), closes [#5117](https://github.com/SAP/ui5-webcomponents/issues/5117)
* **ui5-calendar:** correct month button text localization ([#5246](https://github.com/SAP/ui5-webcomponents/issues/5246)) ([04f2b08](https://github.com/SAP/ui5-webcomponents/commit/04f2b08))
* **ui5-calendar:** fix displayed month name ([#5212](https://github.com/SAP/ui5-webcomponents/issues/5212)) ([b03c3ea](https://github.com/SAP/ui5-webcomponents/commit/b03c3ea))
* **ui5-color-palette:** align buttons to spec ([#5170](https://github.com/SAP/ui5-webcomponents/issues/5170)) ([9f7f382](https://github.com/SAP/ui5-webcomponents/commit/9f7f382)), closes [#4976](https://github.com/SAP/ui5-webcomponents/issues/4976)
* **ui5-color-picker:** align the slider to horizon spec ([#5209](https://github.com/SAP/ui5-webcomponents/issues/5209)) ([fd97a42](https://github.com/SAP/ui5-webcomponents/commit/fd97a42))
* **ui5-color-picker:** provide meaningful labels for the inner input components ([#5217](https://github.com/SAP/ui5-webcomponents/issues/5217)) ([a7de0cd](https://github.com/SAP/ui5-webcomponents/commit/a7de0cd)), closes [#5015](https://github.com/SAP/ui5-webcomponents/issues/5015) [#5023](https://github.com/SAP/ui5-webcomponents/issues/5023)
* **ui5-input:** adjust maxLength property documentation ([#5253](https://github.com/SAP/ui5-webcomponents/issues/5253)) ([0c01d9f](https://github.com/SAP/ui5-webcomponents/commit/0c01d9f))
* **ui5-input:** correct value-state styles in readonly and disabled ([#5208](https://github.com/SAP/ui5-webcomponents/issues/5208)) ([87bea32](https://github.com/SAP/ui5-webcomponents/commit/87bea32))
* **ui5-input:** prevent exception if there are suggestion but property is false ([#5219](https://github.com/SAP/ui5-webcomponents/issues/5219)) ([eb57cef](https://github.com/SAP/ui5-webcomponents/commit/eb57cef))
* **ui5-multi-combobox:** set correct height to items checkboxes ([#5216](https://github.com/SAP/ui5-webcomponents/issues/5216)) ([0946207](https://github.com/SAP/ui5-webcomponents/commit/0946207))
* **ui5-panel:** animate just icon without button ([#5164](https://github.com/SAP/ui5-webcomponents/issues/5164)) ([fe4ce06](https://github.com/SAP/ui5-webcomponents/commit/fe4ce06))
* **ui5-panel:** fix typo in css var name ([#5202](https://github.com/SAP/ui5-webcomponents/issues/5202)) ([854673d](https://github.com/SAP/ui5-webcomponents/commit/854673d)), closes [#5201](https://github.com/SAP/ui5-webcomponents/issues/5201)
* **ui5-rating-indicator:** refactor rating-indicator to use SVG icons ([#5191](https://github.com/SAP/ui5-webcomponents/issues/5191)) ([0782cf7](https://github.com/SAP/ui5-webcomponents/commit/0782cf7))
* **ui5-select:** correct Horizon popover styles ([#5186](https://github.com/SAP/ui5-webcomponents/issues/5186)) ([1c8870b](https://github.com/SAP/ui5-webcomponents/commit/1c8870b)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-select:** correct picker width ([#5240](https://github.com/SAP/ui5-webcomponents/issues/5240)) ([9bd9d24](https://github.com/SAP/ui5-webcomponents/commit/9bd9d24))
* **ui5-select:** select correct item by typing text ([#5252](https://github.com/SAP/ui5-webcomponents/issues/5252)) ([24401b2](https://github.com/SAP/ui5-webcomponents/commit/24401b2))
* **ui5-switch:** adjust additional description announcements ([#4927](https://github.com/SAP/ui5-webcomponents/issues/4927)) ([4fb44e8](https://github.com/SAP/ui5-webcomponents/commit/4fb44e8)), closes [#4887](https://github.com/SAP/ui5-webcomponents/issues/4887)
* **ui5-tabcontainer:** provide unique names for each disabled slot ([#5241](https://github.com/SAP/ui5-webcomponents/issues/5241)) ([3582127](https://github.com/SAP/ui5-webcomponents/commit/3582127)), closes [#5178](https://github.com/SAP/ui5-webcomponents/issues/5178)
* **ui5-table:** adjust colspan value in MultiSelect mode ([#5256](https://github.com/SAP/ui5-webcomponents/issues/5256)) ([405702c](https://github.com/SAP/ui5-webcomponents/commit/405702c))
* **ui5-textarea:** adjust focus outline offset ([#5101](https://github.com/SAP/ui5-webcomponents/issues/5101)) ([cc5c3bd](https://github.com/SAP/ui5-webcomponents/commit/cc5c3bd))
* **ui5-textarea:** adjust placeholder styling ([#5179](https://github.com/SAP/ui5-webcomponents/issues/5179)) ([fab2b61](https://github.com/SAP/ui5-webcomponents/commit/fab2b61))
* **ui5-textarea:** prevent valueState if maxlenght is exceeded ([#5237](https://github.com/SAP/ui5-webcomponents/issues/5237)) ([ed9d74f](https://github.com/SAP/ui5-webcomponents/commit/ed9d74f))
* fix passive listeners for mobile ([#5153](https://github.com/SAP/ui5-webcomponents/issues/5153)) ([3ffec52](https://github.com/SAP/ui5-webcomponents/commit/3ffec52))


### Features

* **inputs:** adjust dropdowns according to Horizon themes specification ([#5054](https://github.com/SAP/ui5-webcomponents/issues/5054)) ([7884022](https://github.com/SAP/ui5-webcomponents/commit/7884022))
* **u5-badge:** implement SAP Horizon theme family ([#5143](https://github.com/SAP/ui5-webcomponents/issues/5143)) ([74470fe](https://github.com/SAP/ui5-webcomponents/commit/74470fe)), closes [#5006](https://github.com/SAP/ui5-webcomponents/issues/5006)
* **ui5-avatar-group:** implement Horizon theme ([#5171](https://github.com/SAP/ui5-webcomponents/issues/5171)) ([78298af](https://github.com/SAP/ui5-webcomponents/commit/78298af)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-breadcrumbs:** implement Horizon theme ([#5066](https://github.com/SAP/ui5-webcomponents/issues/5066)) ([34c9d91](https://github.com/SAP/ui5-webcomponents/commit/34c9d91)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-calendar:** embed new horizon theme changes ([#5099](https://github.com/SAP/ui5-webcomponents/issues/5099)) ([b6f02e4](https://github.com/SAP/ui5-webcomponents/commit/b6f02e4))
* **ui5-carousel:** implement SAP Horizon theme family ([#5061](https://github.com/SAP/ui5-webcomponents/issues/5061)) ([ad1ea9f](https://github.com/SAP/ui5-webcomponents/commit/ad1ea9f))
* **ui5-color-palette:** implement Horizon theme ([#5149](https://github.com/SAP/ui5-webcomponents/issues/5149)) ([357e0d5](https://github.com/SAP/ui5-webcomponents/commit/357e0d5))
* **ui5-color-picker:** implement horizon themes ([#5139](https://github.com/SAP/ui5-webcomponents/issues/5139)) ([4c561fa](https://github.com/SAP/ui5-webcomponents/commit/4c561fa))
* **ui5-file-uploader:** implement SAP Horizon theme parameters ([#5086](https://github.com/SAP/ui5-webcomponents/issues/5086)) ([aff0af9](https://github.com/SAP/ui5-webcomponents/commit/aff0af9))
* **ui5-input:** implement type ahead (autocomplete) ([#5211](https://github.com/SAP/ui5-webcomponents/issues/5211)) ([ec44888](https://github.com/SAP/ui5-webcomponents/commit/ec44888))
* **ui5-list:** implement Horizon theme ([#5057](https://github.com/SAP/ui5-webcomponents/issues/5057)) ([27f8ea6](https://github.com/SAP/ui5-webcomponents/commit/27f8ea6)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-menu:** implement Horizon theme ([#5132](https://github.com/SAP/ui5-webcomponents/issues/5132)) ([26075fe](https://github.com/SAP/ui5-webcomponents/commit/26075fe))
* **ui5-multi-combobox:** add "accessibleName" and "accessibleNameRef" properties ([#5187](https://github.com/SAP/ui5-webcomponents/issues/5187)) ([0d80a2c](https://github.com/SAP/ui5-webcomponents/commit/0d80a2c))
* **ui5-progress-indicator:** implement Horizon theme ([#5140](https://github.com/SAP/ui5-webcomponents/issues/5140)) ([e1655c4](https://github.com/SAP/ui5-webcomponents/commit/e1655c4)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-rating-indicator:** implement small icons for readonly and disabled ([#5233](https://github.com/SAP/ui5-webcomponents/issues/5233)) ([405a598](https://github.com/SAP/ui5-webcomponents/commit/405a598))
* **ui5-side-navigation:** implement SAP Horizon theme family ([#5081](https://github.com/SAP/ui5-webcomponents/issues/5081)) ([d8d9315](https://github.com/SAP/ui5-webcomponents/commit/d8d9315)), closes [#5006](https://github.com/SAP/ui5-webcomponents/issues/5006)
* **ui5-sliderbase:** implements Horizon theme ([#5114](https://github.com/SAP/ui5-webcomponents/issues/5114)) ([9b2c705](https://github.com/SAP/ui5-webcomponents/commit/9b2c705))
* **ui5-switch:** embed new horizon theme changes ([#5017](https://github.com/SAP/ui5-webcomponents/issues/5017)) ([73994e1](https://github.com/SAP/ui5-webcomponents/commit/73994e1))
* **ui5-tabcontainer:** enable semantic icons in high contrast themes ([#5124](https://github.com/SAP/ui5-webcomponents/issues/5124)) ([3a13acf](https://github.com/SAP/ui5-webcomponents/commit/3a13acf)), closes [#2540](https://github.com/SAP/ui5-webcomponents/issues/2540)
* **ui5-token:** implement Horizon themes ([#5068](https://github.com/SAP/ui5-webcomponents/issues/5068)) ([0d1b124](https://github.com/SAP/ui5-webcomponents/commit/0d1b124))





## [1.3.1](https://github.com/SAP/ui5-webcomponents/compare/v1.3.0...v1.3.1) (2022-04-27)

**Note:** Version bump only for package @ui5/webcomponents





# [1.3.0](https://github.com/SAP/ui5-webcomponents/compare/v1.2.4...v1.3.0) (2022-04-19)


### Bug Fixes

* **ui5-avatar:** align to latest sap_horizon specification ([#4951](https://github.com/SAP/ui5-webcomponents/issues/4951)) ([80c1f42](https://github.com/SAP/ui5-webcomponents/commit/80c1f42))
* **ui5-avatar:** wrong border-radius ([#4877](https://github.com/SAP/ui5-webcomponents/issues/4877)) ([cb9f55f](https://github.com/SAP/ui5-webcomponents/commit/cb9f55f)), closes [#4873](https://github.com/SAP/ui5-webcomponents/issues/4873)
* **ui5-card-header:** prevent events from action slot to trigger header's click event ([#4965](https://github.com/SAP/ui5-webcomponents/issues/4965)) ([547ce9e](https://github.com/SAP/ui5-webcomponents/commit/547ce9e)), closes [#4891](https://github.com/SAP/ui5-webcomponents/issues/4891)
* **ui5-checkbox:** align to latest sap_horizon specification ([#4972](https://github.com/SAP/ui5-webcomponents/issues/4972)) ([be9e6bc](https://github.com/SAP/ui5-webcomponents/commit/be9e6bc))
* **ui5-color-palette:** Adapt components with responsive paddings ([#4985](https://github.com/SAP/ui5-webcomponents/issues/4985)) ([9de7198](https://github.com/SAP/ui5-webcomponents/commit/9de7198)), closes [#4869](https://github.com/SAP/ui5-webcomponents/issues/4869)
* **ui5-color-picker:** fix RTL visual issues ([#4966](https://github.com/SAP/ui5-webcomponents/issues/4966)) ([ae76500](https://github.com/SAP/ui5-webcomponents/commit/ae76500)), closes [#4892](https://github.com/SAP/ui5-webcomponents/issues/4892)
* **ui5-combobox:** disable autocomplete on Android ([#5088](https://github.com/SAP/ui5-webcomponents/issues/5088)) ([7353188](https://github.com/SAP/ui5-webcomponents/commit/7353188))
* **ui5-date-picker:** adjust initial value formatting ([#4967](https://github.com/SAP/ui5-webcomponents/issues/4967)) ([304e73b](https://github.com/SAP/ui5-webcomponents/commit/304e73b)), closes [#4958](https://github.com/SAP/ui5-webcomponents/issues/4958) [#4958](https://github.com/SAP/ui5-webcomponents/issues/4958)
* **ui5-date-picker:** handle date selection via enter keyboard key ([#4863](https://github.com/SAP/ui5-webcomponents/issues/4863)) ([fc2cec0](https://github.com/SAP/ui5-webcomponents/commit/fc2cec0)), closes [#4826](https://github.com/SAP/ui5-webcomponents/issues/4826)
* **ui5-date-picker:** remove aria-expanded attribute ([#4866](https://github.com/SAP/ui5-webcomponents/issues/4866)) ([381c884](https://github.com/SAP/ui5-webcomponents/commit/381c884)), closes [#4865](https://github.com/SAP/ui5-webcomponents/issues/4865)
* **ui5-date-picker:** remove timezone test ([#4829](https://github.com/SAP/ui5-webcomponents/issues/4829)) ([14552cf](https://github.com/SAP/ui5-webcomponents/commit/14552cf))
* **ui5-date*-picker:** adjust the date and time pickers accessibility attributes ([#4996](https://github.com/SAP/ui5-webcomponents/issues/4996)) ([229efcc](https://github.com/SAP/ui5-webcomponents/commit/229efcc)), closes [#4946](https://github.com/SAP/ui5-webcomponents/issues/4946)
* **ui5-datetime-picker:** Adapt components with responsive paddings ([#4977](https://github.com/SAP/ui5-webcomponents/issues/4977)) ([6c5e516](https://github.com/SAP/ui5-webcomponents/commit/6c5e516)), closes [#4869](https://github.com/SAP/ui5-webcomponents/issues/4869)
* **ui5-datetime-picker:** enable secondary calendar type ([#4970](https://github.com/SAP/ui5-webcomponents/issues/4970)) ([6a096cb](https://github.com/SAP/ui5-webcomponents/commit/6a096cb)), closes [#4959](https://github.com/SAP/ui5-webcomponents/issues/4959)
* **ui5-input:** activeElement is now correct in case of nested components ([#5005](https://github.com/SAP/ui5-webcomponents/issues/5005)) ([199d974](https://github.com/SAP/ui5-webcomponents/commit/199d974))
* **ui5-label:** prevent screenreader announcement of colon and asterisk ([#5072](https://github.com/SAP/ui5-webcomponents/issues/5072)) ([b5d5a3f](https://github.com/SAP/ui5-webcomponents/commit/b5d5a3f)), closes [#4830](https://github.com/SAP/ui5-webcomponents/issues/4830)
* **ui5-li:** correct focus handling ([#4935](https://github.com/SAP/ui5-webcomponents/issues/4935)) ([2b82342](https://github.com/SAP/ui5-webcomponents/commit/2b82342))
* **ui5-link:** remove double click event ([#5038](https://github.com/SAP/ui5-webcomponents/issues/5038)) ([4b95bc8](https://github.com/SAP/ui5-webcomponents/commit/4b95bc8)), closes [#4963](https://github.com/SAP/ui5-webcomponents/issues/4963) [#4963](https://github.com/SAP/ui5-webcomponents/issues/4963)
* **ui5-list:** correct keyboard handling ([#4890](https://github.com/SAP/ui5-webcomponents/issues/4890)) ([8c27355](https://github.com/SAP/ui5-webcomponents/commit/8c27355))
* **ui5-multi-combobox:** display placeholder consistently ([#4920](https://github.com/SAP/ui5-webcomponents/issues/4920)) ([359d1a3](https://github.com/SAP/ui5-webcomponents/commit/359d1a3)), closes [#4897](https://github.com/SAP/ui5-webcomponents/issues/4897)
* **ui5-multi-input:** correct header paddings in nMore popover ([#5040](https://github.com/SAP/ui5-webcomponents/issues/5040)) ([b06d608](https://github.com/SAP/ui5-webcomponents/commit/b06d608))
* **ui5-multi-input:** improve backspace and home handling ([#4646](https://github.com/SAP/ui5-webcomponents/issues/4646)) ([fa2a700](https://github.com/SAP/ui5-webcomponents/commit/fa2a700))
* **ui5-popover:** fix auto close when opener is outside the viewport ([#4847](https://github.com/SAP/ui5-webcomponents/issues/4847)) ([c944efd](https://github.com/SAP/ui5-webcomponents/commit/c944efd)), closes [#4716](https://github.com/SAP/ui5-webcomponents/issues/4716)
* **ui5-popover:** prevent arrow placement over popover's rounded corners ([#4960](https://github.com/SAP/ui5-webcomponents/issues/4960)) ([994871d](https://github.com/SAP/ui5-webcomponents/commit/994871d)), closes [#4599](https://github.com/SAP/ui5-webcomponents/issues/4599) [#4797](https://github.com/SAP/ui5-webcomponents/issues/4797)
* **ui5-responsive-popover:** allow opening a popover from component ([#5070](https://github.com/SAP/ui5-webcomponents/issues/5070)) ([241a112](https://github.com/SAP/ui5-webcomponents/commit/241a112)), closes [#5028](https://github.com/SAP/ui5-webcomponents/issues/5028)
* **ui5-tabcontainer:** add missing dependency in Tab ([#5069](https://github.com/SAP/ui5-webcomponents/issues/5069)) ([b03c56b](https://github.com/SAP/ui5-webcomponents/commit/b03c56b)), closes [#5037](https://github.com/SAP/ui5-webcomponents/issues/5037)
* make listeners passive ([#5012](https://github.com/SAP/ui5-webcomponents/issues/5012)) ([30f2dc7](https://github.com/SAP/ui5-webcomponents/commit/30f2dc7))
* **ui5-step-input:** align the min width to visual specification ([#4884](https://github.com/SAP/ui5-webcomponents/issues/4884)) ([197fef1](https://github.com/SAP/ui5-webcomponents/commit/197fef1)), closes [#4786](https://github.com/SAP/ui5-webcomponents/issues/4786)
* **ui5-tabcontainer:** fix overflow button visibility ([#4836](https://github.com/SAP/ui5-webcomponents/issues/4836)) ([8e67748](https://github.com/SAP/ui5-webcomponents/commit/8e67748)), closes [#4690](https://github.com/SAP/ui5-webcomponents/issues/4690)
* **ui5-time-picker:** firing change event after input change submit ([#4962](https://github.com/SAP/ui5-webcomponents/issues/4962)) ([2e3f428](https://github.com/SAP/ui5-webcomponents/commit/2e3f428)), closes [#4918](https://github.com/SAP/ui5-webcomponents/issues/4918)
* correct responsive padding in some consumers of popups ([#4926](https://github.com/SAP/ui5-webcomponents/issues/4926)) ([b501153](https://github.com/SAP/ui5-webcomponents/commit/b501153)), closes [#4870](https://github.com/SAP/ui5-webcomponents/issues/4870)
* **ui5-view-settings-dialog:** adjust scrollbar behavior  ([#4795](https://github.com/SAP/ui5-webcomponents/issues/4795)) ([8f58fd5](https://github.com/SAP/ui5-webcomponents/commit/8f58fd5)), closes [#4724](https://github.com/SAP/ui5-webcomponents/issues/4724) [#4725](https://github.com/SAP/ui5-webcomponents/issues/4725) [#4860](https://github.com/SAP/ui5-webcomponents/issues/4860)
* **ui5-view-settings-dialog:** fixing comments from previous commit ([#4851](https://github.com/SAP/ui5-webcomponents/issues/4851)) ([3fc5814](https://github.com/SAP/ui5-webcomponents/commit/3fc5814))


### Features

* **inputs:** SAP Horizon themes implementation ([#5003](https://github.com/SAP/ui5-webcomponents/issues/5003)) ([26aff35](https://github.com/SAP/ui5-webcomponents/commit/26aff35))
* **ui5-breadcrumbs:** add position numbering scheme "x of y" ([#4703](https://github.com/SAP/ui5-webcomponents/issues/4703)) ([35e2c96](https://github.com/SAP/ui5-webcomponents/commit/35e2c96))
* **ui5-button:** Implement SAP Horizon theme parameters ([#4912](https://github.com/SAP/ui5-webcomponents/issues/4912)) ([43761ad](https://github.com/SAP/ui5-webcomponents/commit/43761ad))
* **ui5-card:** implement SAP Horizon theme family ([#4974](https://github.com/SAP/ui5-webcomponents/issues/4974)) ([0137225](https://github.com/SAP/ui5-webcomponents/commit/0137225)), closes [#5006](https://github.com/SAP/ui5-webcomponents/issues/5006)
* **ui5-checkbox:** implement required property ([#5055](https://github.com/SAP/ui5-webcomponents/issues/5055)) ([d6a56cb](https://github.com/SAP/ui5-webcomponents/commit/d6a56cb)), closes [#4895](https://github.com/SAP/ui5-webcomponents/issues/4895)
* **ui5-dialog:** set horizon themes parameters ([#4925](https://github.com/SAP/ui5-webcomponents/issues/4925)) ([1f3d212](https://github.com/SAP/ui5-webcomponents/commit/1f3d212))
* **ui5-icon:** implement Horizon theme ([#5080](https://github.com/SAP/ui5-webcomponents/issues/5080)) ([6db8956](https://github.com/SAP/ui5-webcomponents/commit/6db8956)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-input:** introduce openPicker() functionality ([#4971](https://github.com/SAP/ui5-webcomponents/issues/4971)) ([7e08a75](https://github.com/SAP/ui5-webcomponents/commit/7e08a75))
* **ui5-link:** Implement SAP Horizon theme parameters ([#5011](https://github.com/SAP/ui5-webcomponents/issues/5011)) ([ee44117](https://github.com/SAP/ui5-webcomponents/commit/ee44117))
* **ui5-menu:** Initial implementation ([#4742](https://github.com/SAP/ui5-webcomponents/issues/4742)) ([deac309](https://github.com/SAP/ui5-webcomponents/commit/deac309))
* **ui5-message-strip:** apply SAP Horizon parameters ([#4941](https://github.com/SAP/ui5-webcomponents/issues/4941)) ([8919965](https://github.com/SAP/ui5-webcomponents/commit/8919965))
* **ui5-multi-combobox:** Add cut/copy & paste handling ([#4854](https://github.com/SAP/ui5-webcomponents/issues/4854)) ([18c5912](https://github.com/SAP/ui5-webcomponents/commit/18c5912))
* **ui5-multi-combobox:** Improve F4/Alt+Down focus handling ([#4825](https://github.com/SAP/ui5-webcomponents/issues/4825)) ([01b56f3](https://github.com/SAP/ui5-webcomponents/commit/01b56f3))
* **ui5-multi-combobox, ui5-tokenizer:**  Handle 'Space' key combinations ([#4817](https://github.com/SAP/ui5-webcomponents/issues/4817)) ([0fbe1e1](https://github.com/SAP/ui5-webcomponents/commit/0fbe1e1))
* **ui5-multi-combobox, ui5-tokenizer:** Complete arrow navigation functionality ([#4784](https://github.com/SAP/ui5-webcomponents/issues/4784)) ([25cc16c](https://github.com/SAP/ui5-webcomponents/commit/25cc16c))
* **ui5-option:** add additional-text property ([#5065](https://github.com/SAP/ui5-webcomponents/issues/5065)) ([84d9f5f](https://github.com/SAP/ui5-webcomponents/commit/84d9f5f)), closes [#4999](https://github.com/SAP/ui5-webcomponents/issues/4999) [#4999](https://github.com/SAP/ui5-webcomponents/issues/4999)
* **ui5-panel:** implement SAP Horizon themes ([#5058](https://github.com/SAP/ui5-webcomponents/issues/5058)) ([67565d5](https://github.com/SAP/ui5-webcomponents/commit/67565d5)), closes [#5007](https://github.com/SAP/ui5-webcomponents/issues/5007)
* **ui5-radio-button:** implement new value states - Success and Information and implement Horizon theme ([#4913](https://github.com/SAP/ui5-webcomponents/issues/4913)) ([c85ad95](https://github.com/SAP/ui5-webcomponents/commit/c85ad95))
* **ui5-select:** add aria-roledescription attribute ([#4921](https://github.com/SAP/ui5-webcomponents/issues/4921)) ([e19a914](https://github.com/SAP/ui5-webcomponents/commit/e19a914)), closes [#2910](https://github.com/SAP/ui5-webcomponents/issues/2910)
* **ui5-tabcontainer:** enable nested tabs ([#4705](https://github.com/SAP/ui5-webcomponents/issues/4705)) ([3e715c4](https://github.com/SAP/ui5-webcomponents/commit/3e715c4))
* **ui5-tabcontainer:** implement SAP Horizon theme family ([#4981](https://github.com/SAP/ui5-webcomponents/issues/4981)) ([0b90287](https://github.com/SAP/ui5-webcomponents/commit/0b90287))
* **ui5-table:** Add 'accessibleName' and 'accessibleNameRef' properties ([#4994](https://github.com/SAP/ui5-webcomponents/issues/4994)) ([a4ef3cb](https://github.com/SAP/ui5-webcomponents/commit/a4ef3cb))
* **ui5-table:** implement SAP Horizon themes ([#4992](https://github.com/SAP/ui5-webcomponents/issues/4992)) ([5c2a056](https://github.com/SAP/ui5-webcomponents/commit/5c2a056)), closes [#4938](https://github.com/SAP/ui5-webcomponents/issues/4938)
* **ui5-textarea:** Horizon themes implementation ([#5018](https://github.com/SAP/ui5-webcomponents/issues/5018)) ([f5d56e2](https://github.com/SAP/ui5-webcomponents/commit/f5d56e2))
* **ui5-toast:** implement SAP Horizon Dark and HC themes ([#4864](https://github.com/SAP/ui5-webcomponents/issues/4864)) ([346fa64](https://github.com/SAP/ui5-webcomponents/commit/346fa64))





## [1.2.4](https://github.com/SAP/ui5-webcomponents/compare/v1.2.3...v1.2.4) (2022-03-30)


### Bug Fixes

* **ui5-card-header:** prevent events from action slot to trigger header's click event ([#4965](https://github.com/SAP/ui5-webcomponents/issues/4965)) ([f87d898](https://github.com/SAP/ui5-webcomponents/commit/f87d898)), closes [#4891](https://github.com/SAP/ui5-webcomponents/issues/4891)
* **ui5-date-picker:** adjust initial value formatting ([#4967](https://github.com/SAP/ui5-webcomponents/issues/4967)) ([3648b01](https://github.com/SAP/ui5-webcomponents/commit/3648b01)), closes [#4958](https://github.com/SAP/ui5-webcomponents/issues/4958) [#4958](https://github.com/SAP/ui5-webcomponents/issues/4958)
* **ui5-datetime-picker:** enable secondary calendar type ([#4970](https://github.com/SAP/ui5-webcomponents/issues/4970)) ([6bc84f7](https://github.com/SAP/ui5-webcomponents/commit/6bc84f7)), closes [#4959](https://github.com/SAP/ui5-webcomponents/issues/4959)
* **ui5-popover:** prevent arrow placement over popover's rounded corners ([#4960](https://github.com/SAP/ui5-webcomponents/issues/4960)) ([66604c3](https://github.com/SAP/ui5-webcomponents/commit/66604c3)), closes [#4599](https://github.com/SAP/ui5-webcomponents/issues/4599) [#4797](https://github.com/SAP/ui5-webcomponents/issues/4797)





## [1.2.3](https://github.com/SAP/ui5-webcomponents/compare/v1.2.2...v1.2.3) (2022-03-23)


### Bug Fixes

* **ui5-date-picker:** remove aria-expanded attribute ([#4866](https://github.com/SAP/ui5-webcomponents/issues/4866)) ([b62a0e9](https://github.com/SAP/ui5-webcomponents/commit/b62a0e9)), closes [#4865](https://github.com/SAP/ui5-webcomponents/issues/4865)





## [1.2.2](https://github.com/SAP/ui5-webcomponents/compare/v1.2.1...v1.2.2) (2022-03-22)


### Bug Fixes

* **ui5-li:** correct focus handling ([#4935](https://github.com/SAP/ui5-webcomponents/issues/4935)) ([1fdf415](https://github.com/SAP/ui5-webcomponents/commit/1fdf415))


### Features

* **ui5-select:** add aria-roledescription attribute ([#4921](https://github.com/SAP/ui5-webcomponents/issues/4921)) ([e4fa811](https://github.com/SAP/ui5-webcomponents/commit/e4fa811)), closes [#2910](https://github.com/SAP/ui5-webcomponents/issues/2910)





## [1.2.1](https://github.com/SAP/ui5-webcomponents/compare/v1.2.0...v1.2.1) (2022-03-02)


### Bug Fixes

* **ui5-multi-combobox:** Prevent scrolling on page up/down ([#4835](https://github.com/SAP/ui5-webcomponents/issues/4835)) ([6c85e8d](https://github.com/SAP/ui5-webcomponents/commit/6c85e8d))
* **ui5-responsive-popover:** fix auto close during re-rendering ([#4828](https://github.com/SAP/ui5-webcomponents/issues/4828)) ([5859ce7](https://github.com/SAP/ui5-webcomponents/commit/5859ce7)), closes [#4816](https://github.com/SAP/ui5-webcomponents/issues/4816)
* **ui5-segmented-button-item:** adopt inherited `tooltip` property ([#4843](https://github.com/SAP/ui5-webcomponents/issues/4843)) ([b04db63](https://github.com/SAP/ui5-webcomponents/commit/b04db63)), closes [#4840](https://github.com/SAP/ui5-webcomponents/issues/4840)


### Features

* **ui5-multi-combobox, ui5-tokenizer:** Full Home/End implementation ([#4796](https://github.com/SAP/ui5-webcomponents/issues/4796)) ([8d83d33](https://github.com/SAP/ui5-webcomponents/commit/8d83d33))





# [1.2.0](https://github.com/SAP/ui5-webcomponents/compare/v1.1.2...v1.2.0) (2022-02-28)


### Bug Fixes

* correct scoping issues with several components ([#4820](https://github.com/SAP/ui5-webcomponents/issues/4820)) ([621dc20](https://github.com/SAP/ui5-webcomponents/commit/621dc20))
* **inputs:** import used icons ([#4712](https://github.com/SAP/ui5-webcomponents/issues/4712)) ([2041ff3](https://github.com/SAP/ui5-webcomponents/commit/2041ff3))
* **popovers:** correct list items height of input dropdowns ([#4650](https://github.com/SAP/ui5-webcomponents/issues/4650)) ([11f8ada](https://github.com/SAP/ui5-webcomponents/commit/11f8ada)), closes [#4616](https://github.com/SAP/ui5-webcomponents/issues/4616)
* **templates:** replace HTML comments with HBS ones ([#4681](https://github.com/SAP/ui5-webcomponents/issues/4681)) ([ddc38eb](https://github.com/SAP/ui5-webcomponents/commit/ddc38eb)), closes [/github.com/SAP/ui5-webcomponents/blob/master/packages/tools/lib/hbs2lit/src/partialsVisitor.js#L95](https://github.com//github.com/SAP/ui5-webcomponents/blob/master/packages/tools/lib/hbs2lit/src/partialsVisitor.js/issues/L95)
* **ui5-badge:** update color-scheme parameters ([#4678](https://github.com/SAP/ui5-webcomponents/issues/4678)) ([c7d75ef](https://github.com/SAP/ui5-webcomponents/commit/c7d75ef)), closes [#3940](https://github.com/SAP/ui5-webcomponents/issues/3940)
* **ui5-button:** remove focus on phone and tablet ([#4746](https://github.com/SAP/ui5-webcomponents/issues/4746)) ([31915d7](https://github.com/SAP/ui5-webcomponents/commit/31915d7))
* **ui5-calendar:** adjust picker styles ([#4672](https://github.com/SAP/ui5-webcomponents/issues/4672)) ([3afe7a8](https://github.com/SAP/ui5-webcomponents/commit/3afe7a8))
* **ui5-color-palette-popover:** showDefaultColor works ([#4802](https://github.com/SAP/ui5-webcomponents/issues/4802)) ([f93f22f](https://github.com/SAP/ui5-webcomponents/commit/f93f22f))
* **ui5-color-palette-popover:** update documentation ([#4778](https://github.com/SAP/ui5-webcomponents/issues/4778)) ([34f629e](https://github.com/SAP/ui5-webcomponents/commit/34f629e))
* **ui5-color-picker:** adjust hue value update when user presses over the main color section ([#4601](https://github.com/SAP/ui5-webcomponents/issues/4601)) ([4b03374](https://github.com/SAP/ui5-webcomponents/commit/4b03374)), closes [#4540](https://github.com/SAP/ui5-webcomponents/issues/4540)
* **ui5-color-picker:** enable hex value input change on enter ([#4621](https://github.com/SAP/ui5-webcomponents/issues/4621)) ([cf45552](https://github.com/SAP/ui5-webcomponents/commit/cf45552)), closes [#4541](https://github.com/SAP/ui5-webcomponents/issues/4541)
* **ui5-combobox:** prevent dropdown closing on scroll ([#4773](https://github.com/SAP/ui5-webcomponents/issues/4773)) ([199e860](https://github.com/SAP/ui5-webcomponents/commit/199e860))
* **ui5-date-picker:** remove combobox role ([#4706](https://github.com/SAP/ui5-webcomponents/issues/4706)) ([2d457c9](https://github.com/SAP/ui5-webcomponents/commit/2d457c9))
* **ui5-daterange-picker:** change delimiter dynamically ([#4693](https://github.com/SAP/ui5-webcomponents/issues/4693)) ([ec02855](https://github.com/SAP/ui5-webcomponents/commit/ec02855)), closes [#2925](https://github.com/SAP/ui5-webcomponents/issues/2925)
* **ui5-file-uploader:** fixing the console warning ([#4605](https://github.com/SAP/ui5-webcomponents/issues/4605)) ([197f3f9](https://github.com/SAP/ui5-webcomponents/commit/197f3f9)), closes [#4592](https://github.com/SAP/ui5-webcomponents/issues/4592)
* **ui5-input:** aria-invalid is now properly rendered ([#4734](https://github.com/SAP/ui5-webcomponents/issues/4734)) ([81a00d7](https://github.com/SAP/ui5-webcomponents/commit/81a00d7)), closes [#4723](https://github.com/SAP/ui5-webcomponents/issues/4723)
* **ui5-input:** delete whole value of ui5-input with type number when… ([#4760](https://github.com/SAP/ui5-webcomponents/issues/4760)) ([0aa9979](https://github.com/SAP/ui5-webcomponents/commit/0aa9979))
* **ui5-input:** improve lazy loading behaviour ([#4763](https://github.com/SAP/ui5-webcomponents/issues/4763)) ([35342be](https://github.com/SAP/ui5-webcomponents/commit/35342be))
* **ui5-label:** allow focusing elements linked with for attribute inside a shadow root ([#4754](https://github.com/SAP/ui5-webcomponents/issues/4754)) ([bd7a8a1](https://github.com/SAP/ui5-webcomponents/commit/bd7a8a1)), closes [#4751](https://github.com/SAP/ui5-webcomponents/issues/4751)
* **ui5-li-tree:** correct usage of i18nBudnle ([#4668](https://github.com/SAP/ui5-webcomponents/issues/4668)) ([67848d7](https://github.com/SAP/ui5-webcomponents/commit/67848d7))
* **ui5-list:** fix separators in SAP Horizon ([#4805](https://github.com/SAP/ui5-webcomponents/issues/4805)) ([6a814b3](https://github.com/SAP/ui5-webcomponents/commit/6a814b3))
* **ui5-list:** initial focus target ([#4809](https://github.com/SAP/ui5-webcomponents/issues/4809)) ([cf6dd1a](https://github.com/SAP/ui5-webcomponents/commit/cf6dd1a))
* **ui5-multi-combobox:** add value selection on focus ([#4804](https://github.com/SAP/ui5-webcomponents/issues/4804)) ([08ea794](https://github.com/SAP/ui5-webcomponents/commit/08ea794))
* **ui5-popup:** body styles are no longer modified  ([#4813](https://github.com/SAP/ui5-webcomponents/issues/4813)) ([1754496](https://github.com/SAP/ui5-webcomponents/commit/1754496)), closes [#4347](https://github.com/SAP/ui5-webcomponents/issues/4347)
* **ui5-popup:** Usage of parts in Dialog, Popover, ResponsivePopover and TabContainer documented ([#4747](https://github.com/SAP/ui5-webcomponents/issues/4747)) ([f93909c](https://github.com/SAP/ui5-webcomponents/commit/f93909c)), closes [#4402](https://github.com/SAP/ui5-webcomponents/issues/4402)
* **ui5-select:** incorrect popover styles when value state is used ([#4651](https://github.com/SAP/ui5-webcomponents/issues/4651)) ([2d8ce46](https://github.com/SAP/ui5-webcomponents/commit/2d8ce46))
* **ui5-slider:** prevent handle's jumping on focus ([#4752](https://github.com/SAP/ui5-webcomponents/issues/4752)) ([dc2de5b](https://github.com/SAP/ui5-webcomponents/commit/dc2de5b))
* **ui5-slider:** sets correct color to tickmarks based on theme ([#4677](https://github.com/SAP/ui5-webcomponents/issues/4677)) ([4aecd48](https://github.com/SAP/ui5-webcomponents/commit/4aecd48))
* **ui5-switch:** adjust focus outline ([#4665](https://github.com/SAP/ui5-webcomponents/issues/4665)) ([0cb6580](https://github.com/SAP/ui5-webcomponents/commit/0cb6580)), closes [#2925](https://github.com/SAP/ui5-webcomponents/issues/2925)
* **ui5-switch:** role checkbox is changed to role switch ([#4658](https://github.com/SAP/ui5-webcomponents/issues/4658)) ([ec6ca80](https://github.com/SAP/ui5-webcomponents/commit/ec6ca80)), closes [#4633](https://github.com/SAP/ui5-webcomponents/issues/4633)
* **ui5-tabcontainer:** await for renderFinished in resize handler ([#4675](https://github.com/SAP/ui5-webcomponents/issues/4675)) ([cd8dc26](https://github.com/SAP/ui5-webcomponents/commit/cd8dc26)), closes [#4628](https://github.com/SAP/ui5-webcomponents/issues/4628)
* **ui5-tabcontainer:** fix overflow button runtime error ([#4780](https://github.com/SAP/ui5-webcomponents/issues/4780)) ([08d75fa](https://github.com/SAP/ui5-webcomponents/commit/08d75fa)), closes [#4770](https://github.com/SAP/ui5-webcomponents/issues/4770)
* **ui5-tabcontainer:** replace hardcoded text ([#4815](https://github.com/SAP/ui5-webcomponents/issues/4815)) ([439033c](https://github.com/SAP/ui5-webcomponents/commit/439033c)), closes [#4810](https://github.com/SAP/ui5-webcomponents/issues/4810)
* describe all dependencies for some components ([#4807](https://github.com/SAP/ui5-webcomponents/issues/4807)) ([1cf148f](https://github.com/SAP/ui5-webcomponents/commit/1cf148f))
* **ui5-table-row:** align checkbox vertically ([#4696](https://github.com/SAP/ui5-webcomponents/issues/4696)) ([62ae8dc](https://github.com/SAP/ui5-webcomponents/commit/62ae8dc))
* **ui5-textarea:** enhance aria-invalid attribute handling ([#4767](https://github.com/SAP/ui5-webcomponents/issues/4767)) ([f2fd6fb](https://github.com/SAP/ui5-webcomponents/commit/f2fd6fb))
* scoped bundles ([#4745](https://github.com/SAP/ui5-webcomponents/issues/4745)) ([2cd4c7e](https://github.com/SAP/ui5-webcomponents/commit/2cd4c7e))
* **ui5-switch:** adjust focus outline ([#4717](https://github.com/SAP/ui5-webcomponents/issues/4717)) ([9d9d6c8](https://github.com/SAP/ui5-webcomponents/commit/9d9d6c8))


### Features

* add and update icons from 4.13 and 5.01 icon fonts  ([#4790](https://github.com/SAP/ui5-webcomponents/issues/4790)) ([a9e88f0](https://github.com/SAP/ui5-webcomponents/commit/a9e88f0))
* **popups:** Implement declarative API for open/close ([#4653](https://github.com/SAP/ui5-webcomponents/issues/4653)) ([af70586](https://github.com/SAP/ui5-webcomponents/commit/af70586)), closes [#3527](https://github.com/SAP/ui5-webcomponents/issues/3527)
* **ui5-breadcrumbs:** allow preventDefault in item-click event listener ([#4589](https://github.com/SAP/ui5-webcomponents/issues/4589)) ([ccb4c83](https://github.com/SAP/ui5-webcomponents/commit/ccb4c83))
* **ui5-button:** add new `tooltip` property ([#4737](https://github.com/SAP/ui5-webcomponents/issues/4737)) ([df8f013](https://github.com/SAP/ui5-webcomponents/commit/df8f013)), closes [#4689](https://github.com/SAP/ui5-webcomponents/issues/4689)
* **ui5-button:** implement accessibilityAttributes property ([#4655](https://github.com/SAP/ui5-webcomponents/issues/4655)) ([d27c4b5](https://github.com/SAP/ui5-webcomponents/commit/d27c4b5)), closes [#3546](https://github.com/SAP/ui5-webcomponents/issues/3546)
* **ui5-input:** implement showClearIcon property ([#4641](https://github.com/SAP/ui5-webcomponents/issues/4641)) ([b1c1620](https://github.com/SAP/ui5-webcomponents/commit/b1c1620))
* **ui5-link:** provide accessible-name support ([#4711](https://github.com/SAP/ui5-webcomponents/issues/4711)) ([6597afa](https://github.com/SAP/ui5-webcomponents/commit/6597afa)), closes [#4498](https://github.com/SAP/ui5-webcomponents/issues/4498)
* **ui5-popup:** аdd default responsive paddings ([#4567](https://github.com/SAP/ui5-webcomponents/issues/4567)) ([ddc1e39](https://github.com/SAP/ui5-webcomponents/commit/ddc1e39)), closes [#4402](https://github.com/SAP/ui5-webcomponents/issues/4402)
* **ui5-rating-indicator:** Accessibility enhancements ([#4736](https://github.com/SAP/ui5-webcomponents/issues/4736)) ([f8dc9f0](https://github.com/SAP/ui5-webcomponents/commit/f8dc9f0))
* **ui5-switch:** provide accessible-name attribute support ([#4735](https://github.com/SAP/ui5-webcomponents/issues/4735)) ([ee6819f](https://github.com/SAP/ui5-webcomponents/commit/ee6819f)), closes [#4147](https://github.com/SAP/ui5-webcomponents/issues/4147)
* **ui5-table:** extend keyboard handling ([#4550](https://github.com/SAP/ui5-webcomponents/issues/4550)) ([8daa764](https://github.com/SAP/ui5-webcomponents/commit/8daa764)), closes [#3090](https://github.com/SAP/ui5-webcomponents/issues/3090)
* **ui5-table:** improve keyboard handling ([#4631](https://github.com/SAP/ui5-webcomponents/issues/4631)) ([f1f2b1b](https://github.com/SAP/ui5-webcomponents/commit/f1f2b1b))
* **ui5-tokenizer:** Implement token range deletion ([#4750](https://github.com/SAP/ui5-webcomponents/issues/4750)) ([cece8d7](https://github.com/SAP/ui5-webcomponents/commit/cece8d7))
* **ui5-tree:** make `item-click` event preventable ([#4708](https://github.com/SAP/ui5-webcomponents/issues/4708)) ([29967f0](https://github.com/SAP/ui5-webcomponents/commit/29967f0)), closes [#4502](https://github.com/SAP/ui5-webcomponents/issues/4502)





## [1.1.2](https://github.com/SAP/ui5-webcomponents/compare/v1.1.1...v1.1.2) (2022-01-26)


### Features

* **ui5-multi-input:** Keyboard handling ([#4495](https://github.com/SAP/ui5-webcomponents/issues/4495)) ([b978f4a](https://github.com/SAP/ui5-webcomponents/commit/b978f4a))





## [1.1.1](https://github.com/SAP/ui5-webcomponents/compare/v1.1.0...v1.1.1) (2022-01-24)


### Bug Fixes

* **ui5-split-button:** fix JS error on empty text content ([#4612](https://github.com/SAP/ui5-webcomponents/issues/4612)) ([c407fd1](https://github.com/SAP/ui5-webcomponents/commit/c407fd1)), closes [#4609](https://github.com/SAP/ui5-webcomponents/issues/4609)
* **ui5-title:** replace custom heading CSS vars with SAP theming-base vars ([#4617](https://github.com/SAP/ui5-webcomponents/issues/4617)) ([baa02bb](https://github.com/SAP/ui5-webcomponents/commit/baa02bb))





# [1.1.0](https://github.com/SAP/ui5-webcomponents/compare/v1.0.2...v1.1.0) (2022-01-21)


### Bug Fixes

* **inputs:** adjust value and placeholder styles ([#4400](https://github.com/SAP/ui5-webcomponents/issues/4400)) ([b6014bc](https://github.com/SAP/ui5-webcomponents/commit/b6014bc))
* **inputs:** value state message is not presented in readonly mode ([#4329](https://github.com/SAP/ui5-webcomponents/issues/4329)) ([e1250ae](https://github.com/SAP/ui5-webcomponents/commit/e1250ae))
* **popups:**  block layer of popups now has a tabindex with value 0 ([#4324](https://github.com/SAP/ui5-webcomponents/issues/4324)) ([0965738](https://github.com/SAP/ui5-webcomponents/commit/0965738)), closes [#4187](https://github.com/SAP/ui5-webcomponents/issues/4187)
* **ui5-badge:** center text vertically ([#4394](https://github.com/SAP/ui5-webcomponents/issues/4394)) ([e6d0f69](https://github.com/SAP/ui5-webcomponents/commit/e6d0f69))
* **ui5-breadcrumbs:** correct missing label for single breadcrumb ([#4578](https://github.com/SAP/ui5-webcomponents/issues/4578)) ([42254d8](https://github.com/SAP/ui5-webcomponents/commit/42254d8)), closes [#4565](https://github.com/SAP/ui5-webcomponents/issues/4565)
* **ui5-breadcrumbs:** remove text-decoration from separator ([#4568](https://github.com/SAP/ui5-webcomponents/issues/4568)) ([ed87ba5](https://github.com/SAP/ui5-webcomponents/commit/ed87ba5))
* **ui5-busy-indicator:** Improve delay handling ([#4321](https://github.com/SAP/ui5-webcomponents/issues/4321)) ([acb1729](https://github.com/SAP/ui5-webcomponents/commit/acb1729)), closes [#4108](https://github.com/SAP/ui5-webcomponents/issues/4108)
* **ui5-button:** clicking button is safari now gives it a focus ([#4235](https://github.com/SAP/ui5-webcomponents/issues/4235)) ([baeb02d](https://github.com/SAP/ui5-webcomponents/commit/baeb02d)), closes [#2951](https://github.com/SAP/ui5-webcomponents/issues/2951)
* **ui5-card:** adjust some classes in Playground samples ([#4462](https://github.com/SAP/ui5-webcomponents/issues/4462)) ([2a9ed2a](https://github.com/SAP/ui5-webcomponents/commit/2a9ed2a)), closes [#4200](https://github.com/SAP/ui5-webcomponents/issues/4200)
* **ui5-card:** update theming parameter ([#4582](https://github.com/SAP/ui5-webcomponents/issues/4582)) ([622db2c](https://github.com/SAP/ui5-webcomponents/commit/622db2c))
* **ui5-card-header:** fix rtl support ([#4536](https://github.com/SAP/ui5-webcomponents/issues/4536)) ([14a2a03](https://github.com/SAP/ui5-webcomponents/commit/14a2a03))
* **ui5-carousel:** fix playground sample ([#4366](https://github.com/SAP/ui5-webcomponents/issues/4366)) ([67ace3a](https://github.com/SAP/ui5-webcomponents/commit/67ace3a))
* **ui5-checkbox:** cursor style when disabled ([#4392](https://github.com/SAP/ui5-webcomponents/issues/4392)) ([5d3e8f5](https://github.com/SAP/ui5-webcomponents/commit/5d3e8f5))
* **ui5-checkbox:** fix position of checkmark in ie11 ([#4320](https://github.com/SAP/ui5-webcomponents/issues/4320)) ([2745bbc](https://github.com/SAP/ui5-webcomponents/commit/2745bbc))
* **ui5-combobox:** fix docs ([#4553](https://github.com/SAP/ui5-webcomponents/issues/4553)) ([f0b1bf7](https://github.com/SAP/ui5-webcomponents/commit/f0b1bf7))
* **ui5-combobox:** Keyboard navigation trough filtered items ([#4143](https://github.com/SAP/ui5-webcomponents/issues/4143)) ([17e6e51](https://github.com/SAP/ui5-webcomponents/commit/17e6e51))
* **ui5-combobox:** remove incorrect sample ([#4482](https://github.com/SAP/ui5-webcomponents/issues/4482)) ([4b2720b](https://github.com/SAP/ui5-webcomponents/commit/4b2720b))
* **ui5-combobox, ui5-textarea:** correct value state message placement in RTL mode ([#4396](https://github.com/SAP/ui5-webcomponents/issues/4396)) ([6ab9edb](https://github.com/SAP/ui5-webcomponents/commit/6ab9edb))
* **ui5-date-picker:** enable date value strict parsing ([#4428](https://github.com/SAP/ui5-webcomponents/issues/4428)) ([ac5ac2d](https://github.com/SAP/ui5-webcomponents/commit/ac5ac2d)), closes [#4409](https://github.com/SAP/ui5-webcomponents/issues/4409)
* **ui5-date-picker:** remove title attribute from samples ([#4422](https://github.com/SAP/ui5-webcomponents/issues/4422)) ([56a6724](https://github.com/SAP/ui5-webcomponents/commit/56a6724))
* **ui5-date-time-picker:** proper visualization on mobile ([#4345](https://github.com/SAP/ui5-webcomponents/issues/4345)) ([7d8b93a](https://github.com/SAP/ui5-webcomponents/commit/7d8b93a))
* **ui5-dialog:** correct border radius when stretched on phones ([#4327](https://github.com/SAP/ui5-webcomponents/issues/4327)) ([5aedc43](https://github.com/SAP/ui5-webcomponents/commit/5aedc43)), closes [#4254](https://github.com/SAP/ui5-webcomponents/issues/4254)
* **ui5-dialog:** resize handle is no longer shown on phones ([#4326](https://github.com/SAP/ui5-webcomponents/issues/4326)) ([9b3869f](https://github.com/SAP/ui5-webcomponents/commit/9b3869f)), closes [#4253](https://github.com/SAP/ui5-webcomponents/issues/4253)
* **ui5-icon:** correct tabindex value ([#4509](https://github.com/SAP/ui5-webcomponents/issues/4509)) ([54698f6](https://github.com/SAP/ui5-webcomponents/commit/54698f6))
* **ui5-input:** Consistent "change" event ([#4129](https://github.com/SAP/ui5-webcomponents/issues/4129)) ([09f9059](https://github.com/SAP/ui5-webcomponents/commit/09f9059))
* **ui5-input:** fix event handling in firefox ([#4447](https://github.com/SAP/ui5-webcomponents/issues/4447)) ([d973162](https://github.com/SAP/ui5-webcomponents/commit/d973162))
* **ui5-input:** fix value  truncation ([#4467](https://github.com/SAP/ui5-webcomponents/issues/4467)) ([d9261f5](https://github.com/SAP/ui5-webcomponents/commit/d9261f5))
* **ui5-input:** improve sample visualization ([#4476](https://github.com/SAP/ui5-webcomponents/issues/4476)) ([b0fd49a](https://github.com/SAP/ui5-webcomponents/commit/b0fd49a))
* **ui5-li-custom:** removed height restriction ([#4473](https://github.com/SAP/ui5-webcomponents/issues/4473)) ([e76f8c9](https://github.com/SAP/ui5-webcomponents/commit/e76f8c9)), closes [#4450](https://github.com/SAP/ui5-webcomponents/issues/4450)
* **ui5-link:** add `noopener` to rel attribute ([#4533](https://github.com/SAP/ui5-webcomponents/issues/4533)) ([3f2c3cd](https://github.com/SAP/ui5-webcomponents/commit/3f2c3cd))
* **ui5-popover:** restrict arrow going out of bounds ([#4599](https://github.com/SAP/ui5-webcomponents/issues/4599)) ([41239a8](https://github.com/SAP/ui5-webcomponents/commit/41239a8)), closes [#4581](https://github.com/SAP/ui5-webcomponents/issues/4581)
* Breadcrumbs no longer throws an error when empty ([#4563](https://github.com/SAP/ui5-webcomponents/issues/4563)) ([cfd9fa6](https://github.com/SAP/ui5-webcomponents/commit/cfd9fa6))
* Scoping issues corrected ([#4573](https://github.com/SAP/ui5-webcomponents/issues/4573)) ([4e430d3](https://github.com/SAP/ui5-webcomponents/commit/4e430d3))
* **ui5-input, ui5-multi-combobox:** value state popup now aligned properly in RTL mode ([#4310](https://github.com/SAP/ui5-webcomponents/issues/4310)) ([ce0dcd2](https://github.com/SAP/ui5-webcomponents/commit/ce0dcd2)), closes [#3830](https://github.com/SAP/ui5-webcomponents/issues/3830)
* **ui5-list:** remove hightlighting on items after tap on mobile ([#4388](https://github.com/SAP/ui5-webcomponents/issues/4388)) ([c328ea9](https://github.com/SAP/ui5-webcomponents/commit/c328ea9)), closes [#4258](https://github.com/SAP/ui5-webcomponents/issues/4258)
* **ui5-message-strip:** make speech output more comprehensive ([#4416](https://github.com/SAP/ui5-webcomponents/issues/4416)) ([9442e05](https://github.com/SAP/ui5-webcomponents/commit/9442e05))
* **ui5-multi-combobox:** make readonly component focusable on mobile device ([#4456](https://github.com/SAP/ui5-webcomponents/issues/4456)) ([755599d](https://github.com/SAP/ui5-webcomponents/commit/755599d))
* **ui5-panel:** rotate button counterclockwise in RTL mode ([#4470](https://github.com/SAP/ui5-webcomponents/issues/4470)) ([d3f6e39](https://github.com/SAP/ui5-webcomponents/commit/d3f6e39))
* **ui5-popover:** adjust top position when iOS keyboard is opened ([#4333](https://github.com/SAP/ui5-webcomponents/issues/4333)) ([a4b03a3](https://github.com/SAP/ui5-webcomponents/commit/a4b03a3))
* **ui5-popover:** fix content truncation ([#4359](https://github.com/SAP/ui5-webcomponents/issues/4359)) ([2e8d3bd](https://github.com/SAP/ui5-webcomponents/commit/2e8d3bd)), closes [#4259](https://github.com/SAP/ui5-webcomponents/issues/4259)
* **ui5-popover:** make sample responsive for small devices ([#4527](https://github.com/SAP/ui5-webcomponents/issues/4527)) ([fddf903](https://github.com/SAP/ui5-webcomponents/commit/fddf903)), closes [#4206](https://github.com/SAP/ui5-webcomponents/issues/4206)
* **ui5-radio-button:** remove cursor pointer for disabled state ([#4393](https://github.com/SAP/ui5-webcomponents/issues/4393)) ([d147df8](https://github.com/SAP/ui5-webcomponents/commit/d147df8))
* **ui5-rating-indicator:** not round values are correctly visualised in RTL mode ([#4330](https://github.com/SAP/ui5-webcomponents/issues/4330)) ([d901386](https://github.com/SAP/ui5-webcomponents/commit/d901386))
* **ui5-slider, ui5-range-slider:** remove focus outline on mobile ([#4458](https://github.com/SAP/ui5-webcomponents/issues/4458)) ([a295dc1](https://github.com/SAP/ui5-webcomponents/commit/a295dc1))
* **ui5-tabcontainer:** improve keyboard handling ([#4486](https://github.com/SAP/ui5-webcomponents/issues/4486)) ([a934eb3](https://github.com/SAP/ui5-webcomponents/commit/a934eb3)), closes [#2540](https://github.com/SAP/ui5-webcomponents/issues/2540)
* **ui5-table:** adjust header row's height according to the visual specification ([#4424](https://github.com/SAP/ui5-webcomponents/issues/4424)) ([175fce3](https://github.com/SAP/ui5-webcomponents/commit/175fce3))
* **ui5-table:** check select all checkbox, when all rows are selected programatically ([#4455](https://github.com/SAP/ui5-webcomponents/issues/4455)) ([7baabfa](https://github.com/SAP/ui5-webcomponents/commit/7baabfa))
* **ui5-textarea:** apply specified scrollbar stylings ([#4477](https://github.com/SAP/ui5-webcomponents/issues/4477)) ([84018fc](https://github.com/SAP/ui5-webcomponents/commit/84018fc))
* **ui5-textarea:** Calc properly TextArea's size for showExceeds property ([#4152](https://github.com/SAP/ui5-webcomponents/issues/4152)) ([6f06963](https://github.com/SAP/ui5-webcomponents/commit/6f06963))
* **ui5-token:** apply correct background color in HC themes ([#4464](https://github.com/SAP/ui5-webcomponents/issues/4464)) ([133e45d](https://github.com/SAP/ui5-webcomponents/commit/133e45d))
* adding stable selectors for tab container and shellbar ([#4369](https://github.com/SAP/ui5-webcomponents/issues/4369)) ([9abdaba](https://github.com/SAP/ui5-webcomponents/commit/9abdaba))
* **ui5-token:** border-radius adjusted to spec in in SAP Quartz HCB/HCW ([#4323](https://github.com/SAP/ui5-webcomponents/issues/4323)) ([6691b3d](https://github.com/SAP/ui5-webcomponents/commit/6691b3d))


### Features

* **ui5-split-button:** initial implementation ([#4570](https://github.com/SAP/ui5-webcomponents/issues/4570)) ([295925b](https://github.com/SAP/ui5-webcomponents/commit/295925b))
* stable-dom-ref supported for abstract items ([#4604](https://github.com/SAP/ui5-webcomponents/issues/4604)) ([5526dea](https://github.com/SAP/ui5-webcomponents/commit/5526dea))
* **framework:** introduce runtimes and version info ([#4491](https://github.com/SAP/ui5-webcomponents/issues/4491)) ([757577f](https://github.com/SAP/ui5-webcomponents/commit/757577f))
* **ui5-button:** accessibleNameRef property implemented ([#4474](https://github.com/SAP/ui5-webcomponents/issues/4474)) ([3f7eae3](https://github.com/SAP/ui5-webcomponents/commit/3f7eae3))
* **ui5-checkbox:** introduce accessibleName and accessibleNameRef ([#4547](https://github.com/SAP/ui5-webcomponents/issues/4547)) ([6f285fd](https://github.com/SAP/ui5-webcomponents/commit/6f285fd)), closes [#4500](https://github.com/SAP/ui5-webcomponents/issues/4500)
* **ui5-combobox:** add full keyboard handling ([#4494](https://github.com/SAP/ui5-webcomponents/issues/4494)) ([fd4bb50](https://github.com/SAP/ui5-webcomponents/commit/fd4bb50))
* **ui5-icon:** accessibleRole property implemented ([#4548](https://github.com/SAP/ui5-webcomponents/issues/4548)) ([6d6cf6f](https://github.com/SAP/ui5-webcomponents/commit/6d6cf6f)), closes [#4499](https://github.com/SAP/ui5-webcomponents/issues/4499)
* **ui5-input:** add full keyboard support ([#4414](https://github.com/SAP/ui5-webcomponents/issues/4414)) ([6133393](https://github.com/SAP/ui5-webcomponents/commit/6133393))
* **ui5-link:** accessibilityAttributes property implemented ([#4591](https://github.com/SAP/ui5-webcomponents/issues/4591)) ([9a16d61](https://github.com/SAP/ui5-webcomponents/commit/9a16d61)), closes [#3546](https://github.com/SAP/ui5-webcomponents/issues/3546)
* **ui5-list:** preventable item-click event ([#4448](https://github.com/SAP/ui5-webcomponents/issues/4448)) ([12d3e8a](https://github.com/SAP/ui5-webcomponents/commit/12d3e8a))
* **ui5-media-gallery:** Initial implementation ([#4427](https://github.com/SAP/ui5-webcomponents/issues/4427)) ([17cb225](https://github.com/SAP/ui5-webcomponents/commit/17cb225))
* **ui5-switch:** accessibleNameRef property implemented ([#4472](https://github.com/SAP/ui5-webcomponents/issues/4472)) ([8538de9](https://github.com/SAP/ui5-webcomponents/commit/8538de9))
* implement F6 Navigation Helper ([#4490](https://github.com/SAP/ui5-webcomponents/issues/4490)) ([60d0dc1](https://github.com/SAP/ui5-webcomponents/commit/60d0dc1))
* **ui5-option:** handle `title` attribute handle ([#4546](https://github.com/SAP/ui5-webcomponents/issues/4546)) ([0c060aa](https://github.com/SAP/ui5-webcomponents/commit/0c060aa))
* **ui5-popup:** add `accessibleNameRef` property ([#4517](https://github.com/SAP/ui5-webcomponents/issues/4517)) ([0a7c1f3](https://github.com/SAP/ui5-webcomponents/commit/0a7c1f3))
* **ui5-radio-button:** implement `accessibleNameRef` property ([#4511](https://github.com/SAP/ui5-webcomponents/issues/4511)) ([83fdef5](https://github.com/SAP/ui5-webcomponents/commit/83fdef5))
* **ui5-rating-indicator:** add full keyboard support ([#4411](https://github.com/SAP/ui5-webcomponents/issues/4411)) ([0e41f41](https://github.com/SAP/ui5-webcomponents/commit/0e41f41))
* **ui5-segmented-button:** implement `accessibleName` property ([#4378](https://github.com/SAP/ui5-webcomponents/issues/4378)) ([e6a8b38](https://github.com/SAP/ui5-webcomponents/commit/e6a8b38))
* **ui5-tabcontainer:** implement overflow functionality ([#4403](https://github.com/SAP/ui5-webcomponents/issues/4403)) ([a38bbab](https://github.com/SAP/ui5-webcomponents/commit/a38bbab)), closes [#2540](https://github.com/SAP/ui5-webcomponents/issues/2540)
* **ui5-tabcontainer:** show `separators` in overflow ([#4507](https://github.com/SAP/ui5-webcomponents/issues/4507)) ([b646157](https://github.com/SAP/ui5-webcomponents/commit/b646157))
* **ui5-tree-item:** add `indeterminate` state ([#4397](https://github.com/SAP/ui5-webcomponents/issues/4397)) ([80bbc22](https://github.com/SAP/ui5-webcomponents/commit/80bbc22))





## [1.0.2](https://github.com/SAP/ui5-webcomponents/compare/v1.0.1...v1.0.2) (2021-11-29)

**Note:** Version bump only for package @ui5/webcomponents





## [1.0.1](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0...v1.0.1) (2021-11-10)

**Note:** Version bump only for package @ui5/webcomponents





# [1.0.0](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.16...v1.0.0) (2021-11-10)


**Note:** Version bump only for package @ui5/webcomponents





# [1.0.0-rc.16](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.15...v1.0.0-rc.16) (2021-11-09)


### Bug Fixes

* **inputs:** SAP Horizon disabled state enhanced ([#4263](https://github.com/SAP/ui5-webcomponents/issues/4263)) ([f2b5f64](https://github.com/SAP/ui5-webcomponents/commit/f2b5f64))
* **ui-tabcontainer:** paddings are changed according to the spec part 2 ([#4196](https://github.com/SAP/ui5-webcomponents/issues/4196)) ([3fd8b48](https://github.com/SAP/ui5-webcomponents/commit/3fd8b48))
* **ui5-*:** add global styles for tap-highlight-color  ([18dab92](https://github.com/SAP/ui5-webcomponents/commit/18dab92))
* **ui5-avatar:** correct background when image slot is used ([#4117](https://github.com/SAP/ui5-webcomponents/issues/4117)) ([81d7815](https://github.com/SAP/ui5-webcomponents/commit/81d7815))
* **ui5-avatar:** Fixed font-size and color-scheme ([#3799](https://github.com/SAP/ui5-webcomponents/issues/3799)) ([ea8ef59](https://github.com/SAP/ui5-webcomponents/commit/ea8ef59))
* **ui5-button:** fix hover state for combi device([#4100](https://github.com/SAP/ui5-webcomponents/issues/4100)) ([6ab905c](https://github.com/SAP/ui5-webcomponents/commit/6ab905c))
* **ui5-calendar:** header year picker button has correct text ([#3665](https://github.com/SAP/ui5-webcomponents/issues/3665)) ([5857496](https://github.com/SAP/ui5-webcomponents/commit/5857496)), closes [#3658](https://github.com/SAP/ui5-webcomponents/issues/3658)
* **ui5-card:** allow accessibleNameRef to be used ([#4118](https://github.com/SAP/ui5-webcomponents/issues/4118)) ([07e8d44](https://github.com/SAP/ui5-webcomponents/commit/07e8d44)), closes [#3681](https://github.com/SAP/ui5-webcomponents/issues/3681)
* **ui5-checkbox:** fix component square's border-radius ([#4073](https://github.com/SAP/ui5-webcomponents/issues/4073)) ([c70942b](https://github.com/SAP/ui5-webcomponents/commit/c70942b))
* **ui5-color-picker:** change event is now fired on opacity change ([#3645](https://github.com/SAP/ui5-webcomponents/issues/3645)) ([9ee329a](https://github.com/SAP/ui5-webcomponents/commit/9ee329a))
* **ui5-combobox:** Autocomplete on Safari ([#3999](https://github.com/SAP/ui5-webcomponents/issues/3999)) ([2ee4feb](https://github.com/SAP/ui5-webcomponents/commit/2ee4feb))
* **ui5-combobox:** Fix value reset on ESC [#3886](https://github.com/SAP/ui5-webcomponents/issues/3886) ([ae74add](https://github.com/SAP/ui5-webcomponents/commit/ae74add)), closes [#3784](https://github.com/SAP/ui5-webcomponents/issues/3784) [#3784](https://github.com/SAP/ui5-webcomponents/issues/3784)
* **ui5-combobox:** Improve arrow navigation functionality ([#3928](https://github.com/SAP/ui5-webcomponents/issues/3928)) ([fea941a](https://github.com/SAP/ui5-webcomponents/commit/fea941a))
* **ui5-date-picker:** Alignment of input controls ([#4267](https://github.com/SAP/ui5-webcomponents/issues/4267)) ([3419db3](https://github.com/SAP/ui5-webcomponents/commit/3419db3))
* **ui5-date-picker:** Hover state on readonly is now fixed ([#4272](https://github.com/SAP/ui5-webcomponents/issues/4272)) ([535d0e5](https://github.com/SAP/ui5-webcomponents/commit/535d0e5))
* **ui5-datetime-picker:** aligning the focus borders ([#4250](https://github.com/SAP/ui5-webcomponents/issues/4250)) ([9404c73](https://github.com/SAP/ui5-webcomponents/commit/9404c73))
* **ui5-datetime-picker:** console error not thrown on Firefox browser ([#4161](https://github.com/SAP/ui5-webcomponents/issues/4161)) ([c2ad212](https://github.com/SAP/ui5-webcomponents/commit/c2ad212)), closes [#4136](https://github.com/SAP/ui5-webcomponents/issues/4136)
* **ui5-datetime-picker:** console error not thrown on Firefox browser ([#4164](https://github.com/SAP/ui5-webcomponents/issues/4164)) ([7d773d5](https://github.com/SAP/ui5-webcomponents/commit/7d773d5)), closes [#4136](https://github.com/SAP/ui5-webcomponents/issues/4136)
* **ui5-dialog:** fix in scroll blocking ([#4092](https://github.com/SAP/ui5-webcomponents/issues/4092)) ([e66ab79](https://github.com/SAP/ui5-webcomponents/commit/e66ab79))
* **ui5-dialog:** fix resize handler console warning ([#4138](https://github.com/SAP/ui5-webcomponents/issues/4138)) ([db2be65](https://github.com/SAP/ui5-webcomponents/commit/db2be65)), closes [#4131](https://github.com/SAP/ui5-webcomponents/issues/4131)
* **ui5-file-uploader:** Button is activated with Enter/Space key with screen reader virtual cursor ([#3944](https://github.com/SAP/ui5-webcomponents/issues/3944)) ([159687e](https://github.com/SAP/ui5-webcomponents/commit/159687e)), closes [#3767](https://github.com/SAP/ui5-webcomponents/issues/3767) [#3767](https://github.com/SAP/ui5-webcomponents/issues/3767)
* **ui5-icon:** decorative icons now have aria-hidden=true ([#3983](https://github.com/SAP/ui5-webcomponents/issues/3983)) ([9101130](https://github.com/SAP/ui5-webcomponents/commit/9101130)), closes [#3954](https://github.com/SAP/ui5-webcomponents/issues/3954)
* **ui5-input:** Adjust the default width applied to the icons in SAP Horizon theme ([#4275](https://github.com/SAP/ui5-webcomponents/issues/4275)) ([e650973](https://github.com/SAP/ui5-webcomponents/commit/e650973))
* **ui5-input:** Behaviour on mobile device enhanced ([#4025](https://github.com/SAP/ui5-webcomponents/issues/4025)) ([bab54f6](https://github.com/SAP/ui5-webcomponents/commit/bab54f6))
* **ui5-input:** escape HTML before highlighting suggestions (XSS) ([2a4919e](https://github.com/SAP/ui5-webcomponents/commit/2a4919e)), closes [#4245](https://github.com/SAP/ui5-webcomponents/issues/4245)
* **ui5-input:** Fix value reset on ESC ([#3886](https://github.com/SAP/ui5-webcomponents/issues/3886)) ([3f1c267](https://github.com/SAP/ui5-webcomponents/commit/3f1c267)), closes [#3784](https://github.com/SAP/ui5-webcomponents/issues/3784) [#3784](https://github.com/SAP/ui5-webcomponents/issues/3784)
* **ui5-input:** prevent suggestion popover open on focusin ([#3997](https://github.com/SAP/ui5-webcomponents/issues/3997)) ([0b3e12f](https://github.com/SAP/ui5-webcomponents/commit/0b3e12f))
* **ui5-input:** remove data-sap-no-tab-ref attribute from the inner input ([3e49773](https://github.com/SAP/ui5-webcomponents/commit/3e49773)), closes [#3603](https://github.com/SAP/ui5-webcomponents/issues/3603)
* **ui5-link:** add underlining in the regular state in hcb / hcw ([#3960](https://github.com/SAP/ui5-webcomponents/issues/3960)) ([903a480](https://github.com/SAP/ui5-webcomponents/commit/903a480))
* **ui5-list:** change role mappings so no interactive elements are ne… ([#3952](https://github.com/SAP/ui5-webcomponents/issues/3952)) ([6d98d0c](https://github.com/SAP/ui5-webcomponents/commit/6d98d0c)), closes [#3927](https://github.com/SAP/ui5-webcomponents/issues/3927)
* **ui5-list:** preventing space keydown ([#4088](https://github.com/SAP/ui5-webcomponents/issues/4088)) ([e9c5287](https://github.com/SAP/ui5-webcomponents/commit/e9c5287)), closes [#4049](https://github.com/SAP/ui5-webcomponents/issues/4049)
* **ui5-list:** remove unnecessary scrollbar in RTL for Multiselect mode ([#4085](https://github.com/SAP/ui5-webcomponents/issues/4085)) ([04c09da](https://github.com/SAP/ui5-webcomponents/commit/04c09da)), closes [#3947](https://github.com/SAP/ui5-webcomponents/issues/3947)
* **ui5-list, ui5-table, ui5-notification, ui5-busy-indicator:** getFocusDomRef returns the correct element when the state is busy ([#3951](https://github.com/SAP/ui5-webcomponents/issues/3951)) ([ec81c15](https://github.com/SAP/ui5-webcomponents/commit/ec81c15)), closes [#3922](https://github.com/SAP/ui5-webcomponents/issues/3922)
* **ui5-multi-combobox:** Fix value reset on ESC ([#3958](https://github.com/SAP/ui5-webcomponents/issues/3958)) ([ed128db](https://github.com/SAP/ui5-webcomponents/commit/ed128db))
* **ui5-multi-combobox:** prefilter selected items on n more click ([#3931](https://github.com/SAP/ui5-webcomponents/issues/3931)) ([2ebc6a7](https://github.com/SAP/ui5-webcomponents/commit/2ebc6a7))
* **ui5-multi-combobox:** prevent setting max-width of dialog header on mobile ([#3943](https://github.com/SAP/ui5-webcomponents/issues/3943)) ([97d0382](https://github.com/SAP/ui5-webcomponents/commit/97d0382)), closes [#3763](https://github.com/SAP/ui5-webcomponents/issues/3763)
* **ui5-multi-combobox:** revert selection after close button is pressed ([#3938](https://github.com/SAP/ui5-webcomponents/issues/3938)) ([104ec37](https://github.com/SAP/ui5-webcomponents/commit/104ec37)), closes [#3764](https://github.com/SAP/ui5-webcomponents/issues/3764)
* **ui5-multi-combobox:** select an item when value matches and enter is pressed ([#3942](https://github.com/SAP/ui5-webcomponents/issues/3942)) ([ec4ecc8](https://github.com/SAP/ui5-webcomponents/commit/ec4ecc8)), closes [#3809](https://github.com/SAP/ui5-webcomponents/issues/3809)
* **ui5-panel:** add border bottom, when fixed ([#4234](https://github.com/SAP/ui5-webcomponents/issues/4234)) ([a19e401](https://github.com/SAP/ui5-webcomponents/commit/a19e401))
* **ui5-rating-indicator:** apply correct color for readonly unselected icon ([#3992](https://github.com/SAP/ui5-webcomponents/issues/3992)) ([5854e0f](https://github.com/SAP/ui5-webcomponents/commit/5854e0f))
* **ui5-select:** correct screen reader speech out when popover is opened ([#3705](https://github.com/SAP/ui5-webcomponents/issues/3705)) ([06c193a](https://github.com/SAP/ui5-webcomponents/commit/06c193a)), closes [#3617](https://github.com/SAP/ui5-webcomponents/issues/3617)
* **ui5-select:** sap_horizon adjustments ([#4242](https://github.com/SAP/ui5-webcomponents/issues/4242)) ([466f5b9](https://github.com/SAP/ui5-webcomponents/commit/466f5b9))
* **ui5-slider:** keyboard handling now works correctly in RTL ([#3949](https://github.com/SAP/ui5-webcomponents/issues/3949)) ([f6dee74](https://github.com/SAP/ui5-webcomponents/commit/f6dee74))
* **ui5-tab-container:** selector fixed ([#4261](https://github.com/SAP/ui5-webcomponents/issues/4261)) ([#4273](https://github.com/SAP/ui5-webcomponents/issues/4273)) ([24ff145](https://github.com/SAP/ui5-webcomponents/commit/24ff145))
* **ui5-tabcontainer:** paddings are changed according to the spec ([#4166](https://github.com/SAP/ui5-webcomponents/issues/4166)) ([0bb0b92](https://github.com/SAP/ui5-webcomponents/commit/0bb0b92))
* **ui5-table:** Add missing dependency to Checkbox ([#4199](https://github.com/SAP/ui5-webcomponents/issues/4199)) ([0f6e224](https://github.com/SAP/ui5-webcomponents/commit/0f6e224)), closes [#4094](https://github.com/SAP/ui5-webcomponents/issues/4094)
* **ui5-table:** Hide row columns on minWidth ([#4193](https://github.com/SAP/ui5-webcomponents/issues/4193)) ([bf2495b](https://github.com/SAP/ui5-webcomponents/commit/bf2495b))
* **ui5-table:** Select all column is now sticky ([#3950](https://github.com/SAP/ui5-webcomponents/issues/3950)) ([9530a5b](https://github.com/SAP/ui5-webcomponents/commit/9530a5b))
* **ui5-tree, ui5-table, ui5-side-navigation:** unnecessary scrollbar in RTL is removed ([#3948](https://github.com/SAP/ui5-webcomponents/issues/3948)) ([61fe0fe](https://github.com/SAP/ui5-webcomponents/commit/61fe0fe))
* **ui5-upload-collection:** exploratory testing issues ([#3797](https://github.com/SAP/ui5-webcomponents/issues/3797)) ([7028b6c](https://github.com/SAP/ui5-webcomponents/commit/7028b6c)), closes [#3625](https://github.com/SAP/ui5-webcomponents/issues/3625)
* ComboBox arrow now correctly toggles the picker ([#3937](https://github.com/SAP/ui5-webcomponents/issues/3937)) ([19e77da](https://github.com/SAP/ui5-webcomponents/commit/19e77da))
* **framework:** Multiple properties have no attribute ([#3725](https://github.com/SAP/ui5-webcomponents/issues/3725)) ([2548935](https://github.com/SAP/ui5-webcomponents/commit/2548935))
* **ui5 card:** exploratory testing issues ([#3894](https://github.com/SAP/ui5-webcomponents/issues/3894)) ([f6bce94](https://github.com/SAP/ui5-webcomponents/commit/f6bce94))
* **ui5-avatar:** documentation improvements ([#3909](https://github.com/SAP/ui5-webcomponents/issues/3909)) ([833040d](https://github.com/SAP/ui5-webcomponents/commit/833040d))
* **ui5-avatar, ui5-icon:** attach onclick handler based on interactive property ([#3742](https://github.com/SAP/ui5-webcomponents/issues/3742)) ([cbdae54](https://github.com/SAP/ui5-webcomponents/commit/cbdae54))
* **ui5-badge:** update accent colors ([#3926](https://github.com/SAP/ui5-webcomponents/issues/3926)) ([7c45ff7](https://github.com/SAP/ui5-webcomponents/commit/7c45ff7)), closes [#3923](https://github.com/SAP/ui5-webcomponents/issues/3923) [#3923](https://github.com/SAP/ui5-webcomponents/issues/3923)
* **ui5-badge:** update parameters for color-scheme="8" ([#3814](https://github.com/SAP/ui5-webcomponents/issues/3814)) ([9f4a93e](https://github.com/SAP/ui5-webcomponents/commit/9f4a93e))
* **ui5-calendar:** ACC improvements ([#3789](https://github.com/SAP/ui5-webcomponents/issues/3789)) ([9f40233](https://github.com/SAP/ui5-webcomponents/commit/9f40233))
* **ui5-calendar:** keyboard handling now compliant with the specification ([#3649](https://github.com/SAP/ui5-webcomponents/issues/3649)) ([768d1e7](https://github.com/SAP/ui5-webcomponents/commit/768d1e7))
* **ui5-card:** correctly set aria-labelledby ([#3692](https://github.com/SAP/ui5-webcomponents/issues/3692)) ([1e57b00](https://github.com/SAP/ui5-webcomponents/commit/1e57b00)), closes [#3643](https://github.com/SAP/ui5-webcomponents/issues/3643)
* **ui5-card:** exploratory testing issues ([#3881](https://github.com/SAP/ui5-webcomponents/issues/3881)) ([75023c1](https://github.com/SAP/ui5-webcomponents/commit/75023c1))
* **ui5-card-header:** no longer fires click event twice ([#3823](https://github.com/SAP/ui5-webcomponents/issues/3823)) ([d4f4e91](https://github.com/SAP/ui5-webcomponents/commit/d4f4e91))
* **ui5-color-palette:** align space between swatches ([#3912](https://github.com/SAP/ui5-webcomponents/issues/3912)) ([8ad1fdd](https://github.com/SAP/ui5-webcomponents/commit/8ad1fdd))
* **ui5-color-palette:** focus outline is properly visualized ([#3648](https://github.com/SAP/ui5-webcomponents/issues/3648)) ([2e708d4](https://github.com/SAP/ui5-webcomponents/commit/2e708d4))
* **ui5-color-palette-popover:** fix event params ([#3873](https://github.com/SAP/ui5-webcomponents/issues/3873)) ([1066030](https://github.com/SAP/ui5-webcomponents/commit/1066030))
* **ui5-color-picker:** opacity slider doesn't affect the hue slider  ([#3664](https://github.com/SAP/ui5-webcomponents/issues/3664)) ([3afe78a](https://github.com/SAP/ui5-webcomponents/commit/3afe78a))
* **ui5-combo-box:** Link in value state message is now accessible ([#3901](https://github.com/SAP/ui5-webcomponents/issues/3901)) ([5fd1643](https://github.com/SAP/ui5-webcomponents/commit/5fd1643)), closes [#3855](https://github.com/SAP/ui5-webcomponents/issues/3855) [#3855](https://github.com/SAP/ui5-webcomponents/issues/3855)
* **ui5-combobox:** Double announcement on key navigation fixed ([#3495](https://github.com/SAP/ui5-webcomponents/issues/3495)) ([0ff3325](https://github.com/SAP/ui5-webcomponents/commit/0ff3325))
* **ui5-date-picker:** calendar horizontal center align ([#3905](https://github.com/SAP/ui5-webcomponents/issues/3905)) ([75aef88](https://github.com/SAP/ui5-webcomponents/commit/75aef88))
* **ui5-date-picker:** fix "dateValue" getter to return most recent value ([#3629](https://github.com/SAP/ui5-webcomponents/issues/3629)) ([bee34da](https://github.com/SAP/ui5-webcomponents/commit/bee34da)), closes [#3516](https://github.com/SAP/ui5-webcomponents/issues/3516)
* **ui5-date-picker:** internal calendar component state managed properly ([#3641](https://github.com/SAP/ui5-webcomponents/issues/3641)) ([6a820a6](https://github.com/SAP/ui5-webcomponents/commit/6a820a6))
* **ui5-date-picker:** keyboard handling now compliant with the specification ([#3636](https://github.com/SAP/ui5-webcomponents/issues/3636)) ([24467f8](https://github.com/SAP/ui5-webcomponents/commit/24467f8)), closes [#3091](https://github.com/SAP/ui5-webcomponents/issues/3091)
* **ui5-daypicker:** fix js error ([#3677](https://github.com/SAP/ui5-webcomponents/issues/3677)) ([b6d643a](https://github.com/SAP/ui5-webcomponents/commit/b6d643a))
* **ui5-daypicker:** support secondary calendar type ([#3773](https://github.com/SAP/ui5-webcomponents/issues/3773)) ([8dd14c1](https://github.com/SAP/ui5-webcomponents/commit/8dd14c1))
* **ui5-dialog:** correctly restore body scrolling on ESC ([#3696](https://github.com/SAP/ui5-webcomponents/issues/3696)) ([1c8e656](https://github.com/SAP/ui5-webcomponents/commit/1c8e656)), closes [#3690](https://github.com/SAP/ui5-webcomponents/issues/3690)
* **ui5-dialog:** fix console warning from exploratory testing ([#3893](https://github.com/SAP/ui5-webcomponents/issues/3893)) ([c648714](https://github.com/SAP/ui5-webcomponents/commit/c648714)), closes [#3620](https://github.com/SAP/ui5-webcomponents/issues/3620)
* **ui5-input:** adjust value state paddings according to specifications ([#3833](https://github.com/SAP/ui5-webcomponents/issues/3833)) ([4c8ff0c](https://github.com/SAP/ui5-webcomponents/commit/4c8ff0c)), closes [#3611](https://github.com/SAP/ui5-webcomponents/issues/3611) [#3611](https://github.com/SAP/ui5-webcomponents/issues/3611)
* **ui5-input:** prevent exception in console when input is clicked on mobile ([#3729](https://github.com/SAP/ui5-webcomponents/issues/3729)) ([8d05606](https://github.com/SAP/ui5-webcomponents/commit/8d05606))
* **ui5-label:** adjust colon margins ([#3897](https://github.com/SAP/ui5-webcomponents/issues/3897)) ([ccca671](https://github.com/SAP/ui5-webcomponents/commit/ccca671))
* **ui5-label:** wrapping now works when used in CustomListItem ([#3852](https://github.com/SAP/ui5-webcomponents/issues/3852)) ([8333f5e](https://github.com/SAP/ui5-webcomponents/commit/8333f5e))
* **ui5-li:** add "Selected" text to item's accessible name ([#3853](https://github.com/SAP/ui5-webcomponents/issues/3853)) ([2924010](https://github.com/SAP/ui5-webcomponents/commit/2924010))
* **ui5-li-groupheader:** change role option ([#3869](https://github.com/SAP/ui5-webcomponents/issues/3869)) ([90e718b](https://github.com/SAP/ui5-webcomponents/commit/90e718b))
* **ui5-li-groupheader:** fix row height ([#3610](https://github.com/SAP/ui5-webcomponents/issues/3610)) ([79d259e](https://github.com/SAP/ui5-webcomponents/commit/79d259e)), closes [#3606](https://github.com/SAP/ui5-webcomponents/issues/3606)
* **ui5-link:** the anchor element inherits its text-decoration ([#3911](https://github.com/SAP/ui5-webcomponents/issues/3911)) ([bb8629c](https://github.com/SAP/ui5-webcomponents/commit/bb8629c)), closes [#3837](https://github.com/SAP/ui5-webcomponents/issues/3837) [#3837](https://github.com/SAP/ui5-webcomponents/issues/3837)
* **ui5-popover:** fix arrow placement when reaching a border ([#3821](https://github.com/SAP/ui5-webcomponents/issues/3821)) ([9913632](https://github.com/SAP/ui5-webcomponents/commit/9913632)), closes [#3391](https://github.com/SAP/ui5-webcomponents/issues/3391)
* **ui5-popover:** fixed initial flickering ([#3910](https://github.com/SAP/ui5-webcomponents/issues/3910)) ([6afad2a](https://github.com/SAP/ui5-webcomponents/commit/6afad2a))
* **ui5-popover:** restrict growing width on small screens ([#3820](https://github.com/SAP/ui5-webcomponents/issues/3820)) ([bd0b33a](https://github.com/SAP/ui5-webcomponents/commit/bd0b33a))
* **ui5-radio-button:** exploratory testing issues ([#3740](https://github.com/SAP/ui5-webcomponents/issues/3740)) ([23ce10f](https://github.com/SAP/ui5-webcomponents/commit/23ce10f))
* **ui5-segmented-button:** correct focus on first click ([#3906](https://github.com/SAP/ui5-webcomponents/issues/3906)) ([6820dd7](https://github.com/SAP/ui5-webcomponents/commit/6820dd7))
* **ui5-SegmentedButton:** keyboard handling now compliant with the specification ([#3709](https://github.com/SAP/ui5-webcomponents/issues/3709)) ([d34afc1](https://github.com/SAP/ui5-webcomponents/commit/d34afc1))
* **ui5-select:** align value state to visual specification ([#3655](https://github.com/SAP/ui5-webcomponents/issues/3655)) ([cce6505](https://github.com/SAP/ui5-webcomponents/commit/cce6505)), closes [#3611](https://github.com/SAP/ui5-webcomponents/issues/3611)
* **ui5-select:** selection change with keyboard ([#3704](https://github.com/SAP/ui5-webcomponents/issues/3704)) ([68da439](https://github.com/SAP/ui5-webcomponents/commit/68da439))
* **ui5-side-navigation:** fix rtl behaviour ([#3774](https://github.com/SAP/ui5-webcomponents/issues/3774)) ([cb39444](https://github.com/SAP/ui5-webcomponents/commit/cb39444))
* **ui5-slider:** show tooltips when component has focus ([#3899](https://github.com/SAP/ui5-webcomponents/issues/3899)) ([952445d](https://github.com/SAP/ui5-webcomponents/commit/952445d))
* **ui5-textarea:** value state message link is now accessible ([#3916](https://github.com/SAP/ui5-webcomponents/issues/3916)) ([015e3ef](https://github.com/SAP/ui5-webcomponents/commit/015e3ef))
* **ui5-timeline:** align indicator in compact mode ([#3902](https://github.com/SAP/ui5-webcomponents/issues/3902)) ([0c31502](https://github.com/SAP/ui5-webcomponents/commit/0c31502))
* **ui5-timepicker:** correct navigation to the am/pm slider ([#3920](https://github.com/SAP/ui5-webcomponents/issues/3920)) ([ba38d4c](https://github.com/SAP/ui5-webcomponents/commit/ba38d4c))
* **ui5-toast:** Content is announced when ui5-toast is shown ([#3939](https://github.com/SAP/ui5-webcomponents/issues/3939)) ([66901ad](https://github.com/SAP/ui5-webcomponents/commit/66901ad))
* (ui5-li): add accessible name to single select radio button ([#3842](https://github.com/SAP/ui5-webcomponents/issues/3842)) ([c77d9c9](https://github.com/SAP/ui5-webcomponents/commit/c77d9c9))
* **ui5-ToggleButton:** SHIFT+SPACE cancels the action ([#3713](https://github.com/SAP/ui5-webcomponents/issues/3713)) ([48adbbe](https://github.com/SAP/ui5-webcomponents/commit/48adbbe))
* **ui5-tokenizer:** Fix invisble texts styling ([#3394](https://github.com/SAP/ui5-webcomponents/issues/3394)) ([bc62eaa](https://github.com/SAP/ui5-webcomponents/commit/bc62eaa))


### Code Refactoring

* **ui5-breadcrumbs-item:** remove stableDomRef public property ([#4284](https://github.com/SAP/ui5-webcomponents/issues/4284)) ([ecec275](https://github.com/SAP/ui5-webcomponents/commit/ecec275))
* **ui5-input:** make suggestion-scroll event protected ([#4141](https://github.com/SAP/ui5-webcomponents/issues/4141)) ([3a0abee](https://github.com/SAP/ui5-webcomponents/commit/3a0abee))
* **ui5-message-strip:** rename tag name ([#4268](https://github.com/SAP/ui5-webcomponents/issues/4268)) ([ec30ec2](https://github.com/SAP/ui5-webcomponents/commit/ec30ec2))


### Features

* **ui5-step-input:** implement sap_horizon theme ([#4247](https://github.com/SAP/ui5-webcomponents/issues/4247)) ([4180fe7](https://github.com/SAP/ui5-webcomponents/commit/4180fe7))
* add SAP-icons5.0 ([#4244](https://github.com/SAP/ui5-webcomponents/issues/4244)) ([c0a226e](https://github.com/SAP/ui5-webcomponents/commit/c0a226e))
* **framework:** allow using a custom i18n library ([#4119](https://github.com/SAP/ui5-webcomponents/issues/4119)) ([56f366f](https://github.com/SAP/ui5-webcomponents/commit/56f366f))
* **framework:** Implement better custom theme support ([#4121](https://github.com/SAP/ui5-webcomponents/issues/4121)) ([31e30f8](https://github.com/SAP/ui5-webcomponents/commit/31e30f8))
* **inputs:** SAP Horizon theme implementation ([#4222](https://github.com/SAP/ui5-webcomponents/issues/4222)) ([66d17f7](https://github.com/SAP/ui5-webcomponents/commit/66d17f7))
* **ui5-avatar:** implement sap_horizon ([#4225](https://github.com/SAP/ui5-webcomponents/issues/4225)) ([52311c4](https://github.com/SAP/ui5-webcomponents/commit/52311c4))
* **ui5-badge:** implement sap_horizon theme ([#4019](https://github.com/SAP/ui5-webcomponents/issues/4019)) ([7deccd1](https://github.com/SAP/ui5-webcomponents/commit/7deccd1)), closes [#4043](https://github.com/SAP/ui5-webcomponents/issues/4043)
* **ui5-breadcrumbs:** Initial implementation ([#3489](https://github.com/SAP/ui5-webcomponents/issues/3489)) ([6dbc2a0](https://github.com/SAP/ui5-webcomponents/commit/6dbc2a0)), closes [#3166](https://github.com/SAP/ui5-webcomponents/issues/3166)
* **ui5-busy-indicator:** SAP Horizon theme implementation ([#4179](https://github.com/SAP/ui5-webcomponents/issues/4179)) ([6dc366a](https://github.com/SAP/ui5-webcomponents/commit/6dc366a))
* **ui5-button:** implement sap_horizon theme ([#4126](https://github.com/SAP/ui5-webcomponents/issues/4126)) ([90483e2](https://github.com/SAP/ui5-webcomponents/commit/90483e2))
* **ui5-calendar:** implement horizon theme ([#4233](https://github.com/SAP/ui5-webcomponents/issues/4233)) ([f7d9113](https://github.com/SAP/ui5-webcomponents/commit/f7d9113))
* **ui5-calendar:** support secondary calendar type ([#3634](https://github.com/SAP/ui5-webcomponents/issues/3634)) ([fca7508](https://github.com/SAP/ui5-webcomponents/commit/fca7508))
* **ui5-card:** introduce accessibleName property ([#4021](https://github.com/SAP/ui5-webcomponents/issues/4021)) ([54fdb3a](https://github.com/SAP/ui5-webcomponents/commit/54fdb3a))
* **ui5-card:** SAP Horizon Theme Implementation ([#4189](https://github.com/SAP/ui5-webcomponents/issues/4189)) ([e0e488f](https://github.com/SAP/ui5-webcomponents/commit/e0e488f))
* **ui5-card-header:** implement ariaLevel property ([#3878](https://github.com/SAP/ui5-webcomponents/issues/3878)) ([b2b2ccd](https://github.com/SAP/ui5-webcomponents/commit/b2b2ccd))
* **ui5-carousel:** Implement F7 keyboard functionality ([#3559](https://github.com/SAP/ui5-webcomponents/issues/3559)) ([df0ace8](https://github.com/SAP/ui5-webcomponents/commit/df0ace8)), closes [#3092](https://github.com/SAP/ui5-webcomponents/issues/3092)
* **ui5-carousel:** SAP Horizon theme implementation ([1ed725f](https://github.com/SAP/ui5-webcomponents/commit/1ed725f))
* **ui5-checkbox:** implement sap_horizon ([#4031](https://github.com/SAP/ui5-webcomponents/issues/4031)) ([33ee202](https://github.com/SAP/ui5-webcomponents/commit/33ee202)), closes [#404](https://github.com/SAP/ui5-webcomponents/issues/404)
* **ui5-color-palette-popover:** implement isOpen method ([#3883](https://github.com/SAP/ui5-webcomponents/issues/3883)) ([b112765](https://github.com/SAP/ui5-webcomponents/commit/b112765))
* **ui5-color-palette-popover:** initial implementation ([#3746](https://github.com/SAP/ui5-webcomponents/issues/3746)) ([894628f](https://github.com/SAP/ui5-webcomponents/commit/894628f))
* **ui5-color-picker:** implement sap_horizon theme ([#4177](https://github.com/SAP/ui5-webcomponents/issues/4177)) ([1a201d6](https://github.com/SAP/ui5-webcomponents/commit/1a201d6))
* **ui5-date-picker:** preventable change and input events ([#3609](https://github.com/SAP/ui5-webcomponents/issues/3609)) ([05e0769](https://github.com/SAP/ui5-webcomponents/commit/05e0769)), closes [#3516](https://github.com/SAP/ui5-webcomponents/issues/3516) [#3516](https://github.com/SAP/ui5-webcomponents/issues/3516)
* **ui5-dialog, ui5-popup:** SAP Horizon theme implementation  ([#4175](https://github.com/SAP/ui5-webcomponents/issues/4175)) ([fa2ed03](https://github.com/SAP/ui5-webcomponents/commit/fa2ed03))
* **ui5-file-uploader:** implement sap_horizon theme ([#4243](https://github.com/SAP/ui5-webcomponents/issues/4243)) ([b25ce73](https://github.com/SAP/ui5-webcomponents/commit/b25ce73))
* **ui5-input, ui5-combobox, ui5-multicombobox:** SAP Horizon Theme Implementation ([#4182](https://github.com/SAP/ui5-webcomponents/issues/4182)) ([1f1db07](https://github.com/SAP/ui5-webcomponents/commit/1f1db07))
* **ui5-input, ui5-date-picker:** implement sap_horizon theme ([#4006](https://github.com/SAP/ui5-webcomponents/issues/4006)) ([e137de3](https://github.com/SAP/ui5-webcomponents/commit/e137de3)), closes [#4040](https://github.com/SAP/ui5-webcomponents/issues/4040) [#4046](https://github.com/SAP/ui5-webcomponents/issues/4046)
* **ui5-li:** adjust focus styles to sap_horizon ([#4220](https://github.com/SAP/ui5-webcomponents/issues/4220)) ([7c8acae](https://github.com/SAP/ui5-webcomponents/commit/7c8acae))
* **ui5-link:** implement sap_horizon theme ([#4180](https://github.com/SAP/ui5-webcomponents/issues/4180)) ([410a8fb](https://github.com/SAP/ui5-webcomponents/commit/410a8fb))
* **ui5-list:** announce the selection mode of the list on entry ([#4018](https://github.com/SAP/ui5-webcomponents/issues/4018)) ([7cfba7a](https://github.com/SAP/ui5-webcomponents/commit/7cfba7a)), closes [#3806](https://github.com/SAP/ui5-webcomponents/issues/3806)
* **ui5-messageStrip:** SAP Horizon theme implementation ([#4167](https://github.com/SAP/ui5-webcomponents/issues/4167)) ([7026564](https://github.com/SAP/ui5-webcomponents/commit/7026564))
* **ui5-panel:** noAnimation property introduced ([#3694](https://github.com/SAP/ui5-webcomponents/issues/3694)) ([fc7972b](https://github.com/SAP/ui5-webcomponents/commit/fc7972b)), closes [#3505](https://github.com/SAP/ui5-webcomponents/issues/3505)
* **ui5-panel:** SAP Horizon theme implementation ([#4170](https://github.com/SAP/ui5-webcomponents/issues/4170)) ([1865ffa](https://github.com/SAP/ui5-webcomponents/commit/1865ffa))
* **ui5-panel, ui5-table:** SAP Horizon focus outline ([#4236](https://github.com/SAP/ui5-webcomponents/issues/4236)) ([289df14](https://github.com/SAP/ui5-webcomponents/commit/289df14))
* **ui5-popover, ui5-responsive-popover:** implement sap_horizon theme ([#4020](https://github.com/SAP/ui5-webcomponents/issues/4020)) ([441776e](https://github.com/SAP/ui5-webcomponents/commit/441776e))
* **ui5-progress-indicator:** implement displayValue property ([#3879](https://github.com/SAP/ui5-webcomponents/issues/3879)) ([50008d0](https://github.com/SAP/ui5-webcomponents/commit/50008d0)), closes [#3573](https://github.com/SAP/ui5-webcomponents/issues/3573) [#3573](https://github.com/SAP/ui5-webcomponents/issues/3573)
* **ui5-progress-indicator:** implement sap_horizon ([#4226](https://github.com/SAP/ui5-webcomponents/issues/4226)) ([fdde4d0](https://github.com/SAP/ui5-webcomponents/commit/fdde4d0))
* **ui5-radio-button:** implement sap_horizon theme ([#4008](https://github.com/SAP/ui5-webcomponents/issues/4008)) ([6cb3eb0](https://github.com/SAP/ui5-webcomponents/commit/6cb3eb0)), closes [#4042](https://github.com/SAP/ui5-webcomponents/issues/4042)
* **ui5-radio-button:** SAP Horizon theme implementation ([#4181](https://github.com/SAP/ui5-webcomponents/issues/4181)) ([2309c30](https://github.com/SAP/ui5-webcomponents/commit/2309c30))
* **ui5-rating-indicator:** SAP Horizon theme implementation ([#4173](https://github.com/SAP/ui5-webcomponents/issues/4173)) ([daba3f0](https://github.com/SAP/ui5-webcomponents/commit/daba3f0))
* **ui5-responsive-popover:** add prevent initial focus parameter to showAt method ([#3595](https://github.com/SAP/ui5-webcomponents/issues/3595)) ([62d1079](https://github.com/SAP/ui5-webcomponents/commit/62d1079)), closes [#3473](https://github.com/SAP/ui5-webcomponents/issues/3473)
* **ui5-segmented-button:** implement sap_horizon theme ([#4197](https://github.com/SAP/ui5-webcomponents/issues/4197)) ([33d0f60](https://github.com/SAP/ui5-webcomponents/commit/33d0f60))
* **ui5-select:** adjust input and icon to sap_horizon ([#4071](https://github.com/SAP/ui5-webcomponents/issues/4071)) ([0bb04ce](https://github.com/SAP/ui5-webcomponents/commit/0bb04ce))
* **ui5-select:** implement sap_horizon in dropdown ([#4229](https://github.com/SAP/ui5-webcomponents/issues/4229)) ([4ac73c3](https://github.com/SAP/ui5-webcomponents/commit/4ac73c3))
* **ui5-shellbar:** implement sap_horizon ([#4251](https://github.com/SAP/ui5-webcomponents/issues/4251)) ([7500a08](https://github.com/SAP/ui5-webcomponents/commit/7500a08))
* **ui5-slider, ui5-range-slider:** SAP Horizon theme implementation ([#4168](https://github.com/SAP/ui5-webcomponents/issues/4168)) ([a19159b](https://github.com/SAP/ui5-webcomponents/commit/a19159b))
* **ui5-switch:** implement sap_horizon theme ([#4007](https://github.com/SAP/ui5-webcomponents/issues/4007)) ([6e51776](https://github.com/SAP/ui5-webcomponents/commit/6e51776)), closes [#4039](https://github.com/SAP/ui5-webcomponents/issues/4039)
* **ui5-switch:** implement sap_horizon theme ([#4156](https://github.com/SAP/ui5-webcomponents/issues/4156)) ([e3f82a8](https://github.com/SAP/ui5-webcomponents/commit/e3f82a8))
* **ui5-tab-container:** adjust focus styles in overflow to sap_horizon ([e2a4bdc](https://github.com/SAP/ui5-webcomponents/commit/e2a4bdc))
* **ui5-tab-container:** SAP Horizon theme implementation ([#4207](https://github.com/SAP/ui5-webcomponents/issues/4207)) ([8c80e57](https://github.com/SAP/ui5-webcomponents/commit/8c80e57))
* **ui5-tabcontainer:** implement sap_horizon theme ([#4079](https://github.com/SAP/ui5-webcomponents/issues/4079)) ([89d945a](https://github.com/SAP/ui5-webcomponents/commit/89d945a)), closes [#4045](https://github.com/SAP/ui5-webcomponents/issues/4045)
* **ui5-table:** implement sap_horizon theme ([#4165](https://github.com/SAP/ui5-webcomponents/issues/4165)) ([fcfb180](https://github.com/SAP/ui5-webcomponents/commit/fcfb180))
* **ui5-textarea:** SAP Horizon theme implementation ([#4237](https://github.com/SAP/ui5-webcomponents/issues/4237)) ([37e87c8](https://github.com/SAP/ui5-webcomponents/commit/37e87c8))
* **ui5-time-picker:** implement sap_horizon theme ([16f83d7](https://github.com/SAP/ui5-webcomponents/commit/16f83d7))
* rework stableDomRef concept ([#4210](https://github.com/SAP/ui5-webcomponents/issues/4210)) ([d1ebea3](https://github.com/SAP/ui5-webcomponents/commit/d1ebea3))
* **ui5-toast:** SAP Horizon theme implementation ([#4174](https://github.com/SAP/ui5-webcomponents/issues/4174)) ([3618617](https://github.com/SAP/ui5-webcomponents/commit/3618617))
* **ui5-tree:** introduce item-mouseover/item-mouseout events ([#3990](https://github.com/SAP/ui5-webcomponents/issues/3990)) ([e8b6145](https://github.com/SAP/ui5-webcomponents/commit/e8b6145))
* introduce sap_horizon theme initial draft ([#3991](https://github.com/SAP/ui5-webcomponents/issues/3991)) ([b1afaf0](https://github.com/SAP/ui5-webcomponents/commit/b1afaf0)), closes [#3988](https://github.com/SAP/ui5-webcomponents/issues/3988)


### BREAKING CHANGES

* **ui5-breadcrumbs-item:** BreadcrumbsItem's stableDomRef property has been removed - use
getDomRef to get the matching actual DOM ref
* The icons SVG imports are changed. If you previously had
```js
import "@ui5/webcomponents-icons/dist/accept.svg";
```
 you have to import the SVGs from the **v4/**  or the **v5/** directory:
```js
import "@ui5/webcomponents-icons/dist/v4/accept.svg"; //  for SAPIcons4.0
import "@ui5/webcomponents-icons/dist/v5/accept.svg"; // for SAPIcons5.0
```
* **ui5-message-strip:** MessageStrip component's tag name has been renamed from ui5-messagestrip to ui5-message-strip.
* **ui5-input:** The "suggestion-scroll" event has been removed as there is no such UX specified.
* **ui5-color-palette-popover:** The selected color is now available as it is documented: event.detail.color





# [1.0.0-rc.15](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.14...v1.0.0-rc.15) (2021-07-23)


### Bug Fixes

* **CheckBox:** Prevent jumping of elements aligned with baseline when checking/unchecking ([#3408](https://github.com/SAP/ui5-webcomponents/issues/3408)) ([b458b80](https://github.com/SAP/ui5-webcomponents/commit/b458b80))
* **inputs:** use base CSS param for border-radius ([#3430](https://github.com/SAP/ui5-webcomponents/issues/3430)) ([4a4c5bc](https://github.com/SAP/ui5-webcomponents/commit/4a4c5bc))
* **list items:** rename info & infoState properties ([#3259](https://github.com/SAP/ui5-webcomponents/issues/3259)) ([ca42531](https://github.com/SAP/ui5-webcomponents/commit/ca42531)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-avatar-group:** click event is fired only once ([#3196](https://github.com/SAP/ui5-webcomponents/issues/3196)) ([95986e2](https://github.com/SAP/ui5-webcomponents/commit/95986e2))
* **ui5-avatar-group:** deprecate avatarSize property ([#3229](https://github.com/SAP/ui5-webcomponents/issues/3229)) ([fd60e90](https://github.com/SAP/ui5-webcomponents/commit/fd60e90))
* **ui5-avatar-group:** visual design deviations ([#3252](https://github.com/SAP/ui5-webcomponents/issues/3252)) ([49639e5](https://github.com/SAP/ui5-webcomponents/commit/49639e5)), closes [#3197](https://github.com/SAP/ui5-webcomponents/issues/3197)
* **ui5-busyindicator:** fix aria-labelledby value ([#3266](https://github.com/SAP/ui5-webcomponents/issues/3266)) ([ef2d332](https://github.com/SAP/ui5-webcomponents/commit/ef2d332)), closes [#3256](https://github.com/SAP/ui5-webcomponents/issues/3256)
* **ui5-busyindicator:** fix typo in styles ([#3178](https://github.com/SAP/ui5-webcomponents/issues/3178)) ([023945a](https://github.com/SAP/ui5-webcomponents/commit/023945a))
* **ui5-busyindicator:** focus handling improvements ([#3189](https://github.com/SAP/ui5-webcomponents/issues/3189)) ([1ab4e77](https://github.com/SAP/ui5-webcomponents/commit/1ab4e77)), closes [#3171](https://github.com/SAP/ui5-webcomponents/issues/3171)
* **ui5-button:** added belize parameters to bundle ([#3485](https://github.com/SAP/ui5-webcomponents/issues/3485)) ([97a8713](https://github.com/SAP/ui5-webcomponents/commit/97a8713)), closes [#3482](https://github.com/SAP/ui5-webcomponents/issues/3482)
* **ui5-button:** improve use of Theme Designer CSS Variables ([#3445](https://github.com/SAP/ui5-webcomponents/issues/3445)) ([baec4d4](https://github.com/SAP/ui5-webcomponents/commit/baec4d4))
* **ui5-button:** stabilizing buttons line-height ([#3416](https://github.com/SAP/ui5-webcomponents/issues/3416)) ([e679b51](https://github.com/SAP/ui5-webcomponents/commit/e679b51)), closes [#3401](https://github.com/SAP/ui5-webcomponents/issues/3401) [#3401](https://github.com/SAP/ui5-webcomponents/issues/3401)
* **ui5-calendar:** correct enable/disable of prev and next buttons ([#3249](https://github.com/SAP/ui5-webcomponents/issues/3249)) ([8c66d5a](https://github.com/SAP/ui5-webcomponents/commit/8c66d5a)), closes [#3201](https://github.com/SAP/ui5-webcomponents/issues/3201)
* **ui5-card:** correct content html tag ([#3464](https://github.com/SAP/ui5-webcomponents/issues/3464)) ([9832843](https://github.com/SAP/ui5-webcomponents/commit/9832843)), closes [#3439](https://github.com/SAP/ui5-webcomponents/issues/3439) [#3439](https://github.com/SAP/ui5-webcomponents/issues/3439)
* **ui5-card:** fix styles for slotted images ([#3301](https://github.com/SAP/ui5-webcomponents/issues/3301)) ([1683134](https://github.com/SAP/ui5-webcomponents/commit/1683134))
* **ui5-card:** rename heading/subheading to titleText/subtitleText ([#3316](https://github.com/SAP/ui5-webcomponents/issues/3316)) ([24fda86](https://github.com/SAP/ui5-webcomponents/commit/24fda86)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-card:** update border width and box shadow ([#3509](https://github.com/SAP/ui5-webcomponents/issues/3509)) ([76dcdbf](https://github.com/SAP/ui5-webcomponents/commit/76dcdbf))
* **ui5-carousel:** enhance public api ([#3360](https://github.com/SAP/ui5-webcomponents/issues/3360)) ([351d289](https://github.com/SAP/ui5-webcomponents/commit/351d289)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-carousel:** hide navigation arrows on mouse out ([#3174](https://github.com/SAP/ui5-webcomponents/issues/3174)) ([655ec49](https://github.com/SAP/ui5-webcomponents/commit/655ec49))
* **ui5-carousel:** implement hideNavigationArrows property ([#3228](https://github.com/SAP/ui5-webcomponents/issues/3228)) ([2adee01](https://github.com/SAP/ui5-webcomponents/commit/2adee01)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-checkbox:** add aria-hidden attribute to icon ([#3511](https://github.com/SAP/ui5-webcomponents/issues/3511)) ([18de8a1](https://github.com/SAP/ui5-webcomponents/commit/18de8a1)), closes [#3433](https://github.com/SAP/ui5-webcomponents/issues/3433)
* **ui5-color-palette:** rename change event ([#3429](https://github.com/SAP/ui5-webcomponents/issues/3429)) ([b1e2eaf](https://github.com/SAP/ui5-webcomponents/commit/b1e2eaf)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-color-palette:** updated sample ([#3373](https://github.com/SAP/ui5-webcomponents/issues/3373)) ([b2b6c56](https://github.com/SAP/ui5-webcomponents/commit/b2b6c56))
* **ui5-combobox:** announce selected item ([#3358](https://github.com/SAP/ui5-webcomponents/issues/3358)) ([941a414](https://github.com/SAP/ui5-webcomponents/commit/941a414))
* **ui5-combobox:** enable setting value programatically ([#3253](https://github.com/SAP/ui5-webcomponents/issues/3253)) ([d85561a](https://github.com/SAP/ui5-webcomponents/commit/d85561a))
* **ui5-combobox:** Properly focus inner input ([#3243](https://github.com/SAP/ui5-webcomponents/issues/3243)) ([790c02e](https://github.com/SAP/ui5-webcomponents/commit/790c02e))
* **ui5-date-*:** components accessibility improved ([#3163](https://github.com/SAP/ui5-webcomponents/issues/3163)) ([fe06f84](https://github.com/SAP/ui5-webcomponents/commit/fe06f84)), closes [#3002](https://github.com/SAP/ui5-webcomponents/issues/3002)
* **ui5-date-picker:**  does not trigger value verification upon typing([#2922](https://github.com/SAP/ui5-webcomponents/issues/2922)) ([f5e92e0](https://github.com/SAP/ui5-webcomponents/commit/f5e92e0)), closes [#2827](https://github.com/SAP/ui5-webcomponents/issues/2827)
* **ui5-date-picker:** calibrate the width and alignment of day names ([#3095](https://github.com/SAP/ui5-webcomponents/issues/3095)) ([b6c1a0a](https://github.com/SAP/ui5-webcomponents/commit/b6c1a0a))
* **ui5-daterange-picker:** month is not changed when select first dat… ([#3255](https://github.com/SAP/ui5-webcomponents/issues/3255)) ([290b60b](https://github.com/SAP/ui5-webcomponents/commit/290b60b)), closes [#3129](https://github.com/SAP/ui5-webcomponents/issues/3129)
* **ui5-datetime-picker:** selecting only date value now works correct ([#3294](https://github.com/SAP/ui5-webcomponents/issues/3294)) ([0a112ea](https://github.com/SAP/ui5-webcomponents/commit/0a112ea))
* **ui5-file-uploader:** hovering now gives correct button styles ([#3148](https://github.com/SAP/ui5-webcomponents/issues/3148)) ([a0ce732](https://github.com/SAP/ui5-webcomponents/commit/a0ce732))
* **ui5-input:** change public method to private ([#3224](https://github.com/SAP/ui5-webcomponents/issues/3224)) ([1166fb4](https://github.com/SAP/ui5-webcomponents/commit/1166fb4)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-input:** Suggestions count is read out when expected ([#3127](https://github.com/SAP/ui5-webcomponents/issues/3127)) ([76ec379](https://github.com/SAP/ui5-webcomponents/commit/76ec379)), closes [#3051](https://github.com/SAP/ui5-webcomponents/issues/3051)
* **ui5-label:** fix required label in safari ([#3182](https://github.com/SAP/ui5-webcomponents/issues/3182)) ([921ac5a](https://github.com/SAP/ui5-webcomponents/commit/921ac5a))
* **ui5-label:** rename wrap property to wrappingType ([#3341](https://github.com/SAP/ui5-webcomponents/issues/3341)) ([e591e04](https://github.com/SAP/ui5-webcomponents/commit/e591e04)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-li:** info text width ([#3184](https://github.com/SAP/ui5-webcomponents/issues/3184)) ([3b930af](https://github.com/SAP/ui5-webcomponents/commit/3b930af))
* **ui5-li:** remove “delete” button from tab chain([#3290](https://github.com/SAP/ui5-webcomponents/issues/3290)) ([5176954](https://github.com/SAP/ui5-webcomponents/commit/5176954)), closes [#2964](https://github.com/SAP/ui5-webcomponents/issues/2964)
* **ui5-li-tree:** fix arrow flickering ([#3293](https://github.com/SAP/ui5-webcomponents/issues/3293)) ([eca59f5](https://github.com/SAP/ui5-webcomponents/commit/eca59f5)), closes [#3238](https://github.com/SAP/ui5-webcomponents/issues/3238)
* **ui5-li-tree:** fixed incorrect background of selected item ([#3072](https://github.com/SAP/ui5-webcomponents/issues/3072)) ([bb5d65f](https://github.com/SAP/ui5-webcomponents/commit/bb5d65f)), closes [#2978](https://github.com/SAP/ui5-webcomponents/issues/2978)
* **ui5-li-tree:** fixed incorrect display of the text ([#3086](https://github.com/SAP/ui5-webcomponents/issues/3086)) ([684ccbf](https://github.com/SAP/ui5-webcomponents/commit/684ccbf))
* **ui5-li-tree:** hover and active visual state ([#3298](https://github.com/SAP/ui5-webcomponents/issues/3298)) ([4ac6d23](https://github.com/SAP/ui5-webcomponents/commit/4ac6d23))
* **ui5-li-tree:** info text visual appearance ([#3280](https://github.com/SAP/ui5-webcomponents/issues/3280)) ([1523e25](https://github.com/SAP/ui5-webcomponents/commit/1523e25)), closes [#3130](https://github.com/SAP/ui5-webcomponents/issues/3130)
* **ui5-link:** event is now fired on Space/Enter ([#3374](https://github.com/SAP/ui5-webcomponents/issues/3374)) ([ffa2c4c](https://github.com/SAP/ui5-webcomponents/commit/ffa2c4c)), closes [#3007](https://github.com/SAP/ui5-webcomponents/issues/3007) [#3007](https://github.com/SAP/ui5-webcomponents/issues/3007)
* **ui5-link:** rename wrap property to wrappingType ([#3380](https://github.com/SAP/ui5-webcomponents/issues/3380)) ([cff8fd4](https://github.com/SAP/ui5-webcomponents/commit/cff8fd4)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-list:** fixed keyboard navigation when a list is inside a list ([#3314](https://github.com/SAP/ui5-webcomponents/issues/3314)) ([15e235e](https://github.com/SAP/ui5-webcomponents/commit/15e235e))
* **ui5-list:** focus after element when TAB key is pressed ([#3220](https://github.com/SAP/ui5-webcomponents/issues/3220)) ([32a4148](https://github.com/SAP/ui5-webcomponents/commit/32a4148))
* **ui5-list:** prevent load-more on initial intersection ([#3105](https://github.com/SAP/ui5-webcomponents/issues/3105)) ([ef52f2b](https://github.com/SAP/ui5-webcomponents/commit/ef52f2b))
* **ui5-list:** prevent scrolling with space ([#3272](https://github.com/SAP/ui5-webcomponents/issues/3272)) ([0c7e58b](https://github.com/SAP/ui5-webcomponents/commit/0c7e58b)), closes [#3089](https://github.com/SAP/ui5-webcomponents/issues/3089)
* **ui5-list:** rename inset property to indent ([#3244](https://github.com/SAP/ui5-webcomponents/issues/3244)) ([eba1e64](https://github.com/SAP/ui5-webcomponents/commit/eba1e64)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-messagestrip:** rename properties ([#3346](https://github.com/SAP/ui5-webcomponents/issues/3346)) ([1cb43f2](https://github.com/SAP/ui5-webcomponents/commit/1cb43f2)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-messagestrip:** rename type property to design ([#3276](https://github.com/SAP/ui5-webcomponents/issues/3276)) ([4208d19](https://github.com/SAP/ui5-webcomponents/commit/4208d19)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-multi-combobox:** Fix failing test ([#3366](https://github.com/SAP/ui5-webcomponents/issues/3366)) ([a9edc74](https://github.com/SAP/ui5-webcomponents/commit/a9edc74))
* **ui5-popover:** Calculate max content height ([#3386](https://github.com/SAP/ui5-webcomponents/issues/3386)) ([8cba688](https://github.com/SAP/ui5-webcomponents/commit/8cba688))
* **ui5-popover:** rename noArrow property to hideArrow ([#3351](https://github.com/SAP/ui5-webcomponents/issues/3351)) ([39cc473](https://github.com/SAP/ui5-webcomponents/commit/39cc473)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-popup:** adjust default header height ([#3506](https://github.com/SAP/ui5-webcomponents/issues/3506)) ([ab11001](https://github.com/SAP/ui5-webcomponents/commit/ab11001))
* **ui5-popup:** scroll handle is now working for input controls ([#3414](https://github.com/SAP/ui5-webcomponents/issues/3414)) ([c5e00c4](https://github.com/SAP/ui5-webcomponents/commit/c5e00c4))
* **ui5-rating-indicator:** Aria-readonly attribute is added when RatingIndicator in not editable ([#3219](https://github.com/SAP/ui5-webcomponents/issues/3219)) ([b90933c](https://github.com/SAP/ui5-webcomponents/commit/b90933c))
* **ui5-rating-indicator:** rename maxValue property to max ([#3375](https://github.com/SAP/ui5-webcomponents/issues/3375)) ([8aaf99b](https://github.com/SAP/ui5-webcomponents/commit/8aaf99b))
* **ui5-responsive-popover:** fix header styles ([#3176](https://github.com/SAP/ui5-webcomponents/issues/3176)) ([83a88af](https://github.com/SAP/ui5-webcomponents/commit/83a88af)), closes [#3173](https://github.com/SAP/ui5-webcomponents/issues/3173)
* **ui5-responsive-popover:** fixed position of downward pointing arrow ([#3508](https://github.com/SAP/ui5-webcomponents/issues/3508)) ([e0744d6](https://github.com/SAP/ui5-webcomponents/commit/e0744d6)), closes [#3500](https://github.com/SAP/ui5-webcomponents/issues/3500)
* **ui5-select:** avoid global state in test spec ([#3106](https://github.com/SAP/ui5-webcomponents/issues/3106)) ([e835a50](https://github.com/SAP/ui5-webcomponents/commit/e835a50)), closes [#3000](https://github.com/SAP/ui5-webcomponents/issues/3000)
* **ui5-select:** display the selected option's icon ([#3348](https://github.com/SAP/ui5-webcomponents/issues/3348)) ([dac8183](https://github.com/SAP/ui5-webcomponents/commit/dac8183)), closes [#3344](https://github.com/SAP/ui5-webcomponents/issues/3344)
* **ui5-select:** enable home/end keys ([#3372](https://github.com/SAP/ui5-webcomponents/issues/3372)) ([b12a30b](https://github.com/SAP/ui5-webcomponents/commit/b12a30b))
* **ui5-slider, ui5-range-slider:** render only one top level element ([#3115](https://github.com/SAP/ui5-webcomponents/issues/3115)) ([c03f211](https://github.com/SAP/ui5-webcomponents/commit/c03f211))
* **ui5-step-input:** firing step input once when value is deleted ([#3474](https://github.com/SAP/ui5-webcomponents/issues/3474)) ([a5f27f2](https://github.com/SAP/ui5-webcomponents/commit/a5f27f2)), closes [#3457](https://github.com/SAP/ui5-webcomponents/issues/3457)
* **ui5-step-input:** min width is now correct ([#3398](https://github.com/SAP/ui5-webcomponents/issues/3398)) ([a8af480](https://github.com/SAP/ui5-webcomponents/commit/a8af480)), closes [#3377](https://github.com/SAP/ui5-webcomponents/issues/3377) [#3377](https://github.com/SAP/ui5-webcomponents/issues/3377)
* **ui5-tab:** rename semanticColor property to design ([#3336](https://github.com/SAP/ui5-webcomponents/issues/3336)) ([a7a0da1](https://github.com/SAP/ui5-webcomponents/commit/a7a0da1)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-tabcontainer:** tabs are scrolled into view on key navigation ([#3354](https://github.com/SAP/ui5-webcomponents/issues/3354)) ([d61a9b2](https://github.com/SAP/ui5-webcomponents/commit/d61a9b2))
* **ui5-table:** introduce hide-no-data property ([#3302](https://github.com/SAP/ui5-webcomponents/issues/3302)) ([d2d4397](https://github.com/SAP/ui5-webcomponents/commit/d2d4397))
* **ui5-table-row:** prevent space only when target is table row ([#3393](https://github.com/SAP/ui5-webcomponents/issues/3393)) ([d48b4c6](https://github.com/SAP/ui5-webcomponents/commit/d48b4c6))
* **ui5-textarea:** revert value on escape ([#3261](https://github.com/SAP/ui5-webcomponents/issues/3261)) ([7b60885](https://github.com/SAP/ui5-webcomponents/commit/7b60885))
* **ui5-time-picker:** accessibility improved ([#3162](https://github.com/SAP/ui5-webcomponents/issues/3162)) ([927abf6](https://github.com/SAP/ui5-webcomponents/commit/927abf6)), closes [#3010](https://github.com/SAP/ui5-webcomponents/issues/3010)
* **ui5-title:** rename wrap property to wrappingType ([#3379](https://github.com/SAP/ui5-webcomponents/issues/3379)) ([448c726](https://github.com/SAP/ui5-webcomponents/commit/448c726))
* **ui5-tree:** alignment of items ([#3424](https://github.com/SAP/ui5-webcomponents/issues/3424)) ([788d25d](https://github.com/SAP/ui5-webcomponents/commit/788d25d))
* **ui5-wheelslider:** correcting the placement on mobile in different fontsizes ([#3396](https://github.com/SAP/ui5-webcomponents/issues/3396)) ([6104b80](https://github.com/SAP/ui5-webcomponents/commit/6104b80))
* keep invisible texts out of the view port ([#3085](https://github.com/SAP/ui5-webcomponents/issues/3085)) ([de47520](https://github.com/SAP/ui5-webcomponents/commit/de47520)), closes [#2723](https://github.com/SAP/ui5-webcomponents/issues/2723) [#2723](https://github.com/SAP/ui5-webcomponents/issues/2723)


### Code Refactoring

* **ui5-input:** remove highlight property ([#3350](https://github.com/SAP/ui5-webcomponents/issues/3350)) ([6630c2a](https://github.com/SAP/ui5-webcomponents/commit/6630c2a))


### Features

* rename aria-label to accessible-name ([#3449](https://github.com/SAP/ui5-webcomponents/issues/3449)) ([f4f5864](https://github.com/SAP/ui5-webcomponents/commit/f4f5864))
* **invisibleMessage:** introduce invisibleMessage util ([#3192](https://github.com/SAP/ui5-webcomponents/issues/3192)) ([0a33c40](https://github.com/SAP/ui5-webcomponents/commit/0a33c40))
* **ui5-avatar:** implement default slot ([#3237](https://github.com/SAP/ui5-webcomponents/issues/3237)) ([9646c3e](https://github.com/SAP/ui5-webcomponents/commit/9646c3e))
* **ui5-avatar-group:** Implement accessibility specification ([#3154](https://github.com/SAP/ui5-webcomponents/issues/3154)) ([baec15b](https://github.com/SAP/ui5-webcomponents/commit/baec15b)), closes [#2745](https://github.com/SAP/ui5-webcomponents/issues/2745)
* **ui5-busy-indicator:** add new "delay" property ([#3419](https://github.com/SAP/ui5-webcomponents/issues/3419)) ([cc8acc7](https://github.com/SAP/ui5-webcomponents/commit/cc8acc7))
* **ui5-button:** introducing attention type button ([#3481](https://github.com/SAP/ui5-webcomponents/issues/3481)) ([2c9393c](https://github.com/SAP/ui5-webcomponents/commit/2c9393c)), closes [#3446](https://github.com/SAP/ui5-webcomponents/issues/3446)
* **ui5-carousel:** add property hide-page-indicator ([#3268](https://github.com/SAP/ui5-webcomponents/issues/3268)) ([e13a4c9](https://github.com/SAP/ui5-webcomponents/commit/e13a4c9)), closes [#3158](https://github.com/SAP/ui5-webcomponents/issues/3158)
* **ui5-checkbox:** add indeterminate state ([#3309](https://github.com/SAP/ui5-webcomponents/issues/3309)) ([42a1326](https://github.com/SAP/ui5-webcomponents/commit/42a1326)), closes [#3217](https://github.com/SAP/ui5-webcomponents/issues/3217)
* **ui5-checkbox:** add support  for "Success" value state ([#3278](https://github.com/SAP/ui5-webcomponents/issues/3278)) ([580e289](https://github.com/SAP/ui5-webcomponents/commit/580e289)), closes [#3198](https://github.com/SAP/ui5-webcomponents/issues/3198) [#3198](https://github.com/SAP/ui5-webcomponents/issues/3198)
* **ui5-color-palette:** implement show-recent-color functionality ([#3113](https://github.com/SAP/ui5-webcomponents/issues/3113)) ([4bcd049](https://github.com/SAP/ui5-webcomponents/commit/4bcd049))
* **ui5-combobox:** add suggestions grouping ([#3469](https://github.com/SAP/ui5-webcomponents/issues/3469)) ([5e3f391](https://github.com/SAP/ui5-webcomponents/commit/5e3f391)), closes [#3371](https://github.com/SAP/ui5-webcomponents/issues/3371)
* **ui5-dialog:** add keyboard support for draggable and resizable ([#3483](https://github.com/SAP/ui5-webcomponents/issues/3483)) ([8580fd8](https://github.com/SAP/ui5-webcomponents/commit/8580fd8))
* **ui5-dialog:** labeling of header slots is now possible ([#3155](https://github.com/SAP/ui5-webcomponents/issues/3155)) ([9943ee7](https://github.com/SAP/ui5-webcomponents/commit/9943ee7)), closes [#2838](https://github.com/SAP/ui5-webcomponents/issues/2838)
* **ui5-icon:** add accessibility role ([#3407](https://github.com/SAP/ui5-webcomponents/issues/3407)) ([4bb84e1](https://github.com/SAP/ui5-webcomponents/commit/4bb84e1))
* **ui5-input:** introduce new SuggestionGroupItem ([#3248](https://github.com/SAP/ui5-webcomponents/issues/3248)) ([39ccf7b](https://github.com/SAP/ui5-webcomponents/commit/39ccf7b)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107) [#1](https://github.com/SAP/ui5-webcomponents/issues/1) [#1](https://github.com/SAP/ui5-webcomponents/issues/1) [#2](https://github.com/SAP/ui5-webcomponents/issues/2)
* **ui5-li:** title attribute handle ([#3385](https://github.com/SAP/ui5-webcomponents/issues/3385)) ([2f67084](https://github.com/SAP/ui5-webcomponents/commit/2f67084))
* **ui5-li-custom, ui5-li, ui5-li-groupheader:** add accessibleName property ([#3269](https://github.com/SAP/ui5-webcomponents/issues/3269)) ([2f88da0](https://github.com/SAP/ui5-webcomponents/commit/2f88da0))
* **ui5-list:** support pressing DELETE key ([#3226](https://github.com/SAP/ui5-webcomponents/issues/3226)) ([db04d08](https://github.com/SAP/ui5-webcomponents/commit/db04d08)), closes [#3089](https://github.com/SAP/ui5-webcomponents/issues/3089)
* **ui5-panel:** expose content css part ([#3211](https://github.com/SAP/ui5-webcomponents/issues/3211)) ([267fc02](https://github.com/SAP/ui5-webcomponents/commit/267fc02))
* **ui5-segmented-button-item:** introduce new component to serve as child of SegmentedButton ([#3258](https://github.com/SAP/ui5-webcomponents/issues/3258)) ([9bd9ce4](https://github.com/SAP/ui5-webcomponents/commit/9bd9ce4)), closes [#3191](https://github.com/SAP/ui5-webcomponents/issues/3191) [#3191](https://github.com/SAP/ui5-webcomponents/issues/3191)
* **ui5-select:** support angular reactive forms ([#3323](https://github.com/SAP/ui5-webcomponents/issues/3323)) ([e369aef](https://github.com/SAP/ui5-webcomponents/commit/e369aef))
* **ui5-switch:** implement design property ([#3257](https://github.com/SAP/ui5-webcomponents/issues/3257)) ([998be76](https://github.com/SAP/ui5-webcomponents/commit/998be76)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-table:** Introduce  Single and Multi selection ([#2848](https://github.com/SAP/ui5-webcomponents/issues/2848)) ([cc31280](https://github.com/SAP/ui5-webcomponents/commit/cc31280))
* **ui5-table-group-row:** introduce new component ([#3470](https://github.com/SAP/ui5-webcomponents/issues/3470)) ([d5ab16a](https://github.com/SAP/ui5-webcomponents/commit/d5ab16a)), closes [#3319](https://github.com/SAP/ui5-webcomponents/issues/3319)
* add keyboard handling docs ([#3194](https://github.com/SAP/ui5-webcomponents/issues/3194)) ([5a27d17](https://github.com/SAP/ui5-webcomponents/commit/5a27d17)), closes [#3089](https://github.com/SAP/ui5-webcomponents/issues/3089)
* expose dist paths as root paths via package.json export field ([#3274](https://github.com/SAP/ui5-webcomponents/issues/3274)) ([bd34a5e](https://github.com/SAP/ui5-webcomponents/commit/bd34a5e))


### BREAKING CHANGES

* **ui5-combobox:** filter value property is removed.
FIXES: https://github.com/SAP/ui5-webcomponents/issues/2233
* **ui5-input:** The highlight property is removed and the feature is enabled by default
* **ui5-input:** the isOpen method that used to return if the value state popover is open or closed has been removed.





# [1.0.0-rc.14](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.11...v1.0.0-rc.14) (2021-04-01)


### Bug Fixes

* **ui5-busyindicator:** add a11y support ([#2938](https://github.com/SAP/ui5-webcomponents/issues/2938)) ([cfa50d8](https://github.com/SAP/ui5-webcomponents/commit/cfa50d8)), closes [#2381](https://github.com/SAP/ui5-webcomponents/issues/2381)
* **ui5-button:** disable hover on mobile devices ([#2968](https://github.com/SAP/ui5-webcomponents/issues/2968)) ([c870eb4](https://github.com/SAP/ui5-webcomponents/commit/c870eb4))
* **ui5-dialog:** Fix aria-labelledby attribute value ([#3044](https://github.com/SAP/ui5-webcomponents/issues/3044)) ([e0ab900](https://github.com/SAP/ui5-webcomponents/commit/e0ab900)), closes [#2946](https://github.com/SAP/ui5-webcomponents/issues/2946)
* **ui5-dialog:** fix content stretching on Safari ([#3068](https://github.com/SAP/ui5-webcomponents/issues/3068)) ([573a6c6](https://github.com/SAP/ui5-webcomponents/commit/573a6c6)), closes [#3064](https://github.com/SAP/ui5-webcomponents/issues/3064)
* **ui5-dialog:** Fixed RTL mode ([#3070](https://github.com/SAP/ui5-webcomponents/issues/3070)) ([0aac048](https://github.com/SAP/ui5-webcomponents/commit/0aac048)), closes [#3013](https://github.com/SAP/ui5-webcomponents/issues/3013)
* **ui5-dialog:** Fixed scrollbars styling ([#3067](https://github.com/SAP/ui5-webcomponents/issues/3067)) ([f4301b8](https://github.com/SAP/ui5-webcomponents/commit/f4301b8)), closes [#2887](https://github.com/SAP/ui5-webcomponents/issues/2887)
* **ui5-input:** inner input padding is correctly updated ([#3015](https://github.com/SAP/ui5-webcomponents/issues/3015)) ([b00b02b](https://github.com/SAP/ui5-webcomponents/commit/b00b02b)), closes [#2940](https://github.com/SAP/ui5-webcomponents/issues/2940)
* **ui5-input:** Prevent dialog closing on Escape ([#3043](https://github.com/SAP/ui5-webcomponents/issues/3043)) ([c073ad4](https://github.com/SAP/ui5-webcomponents/commit/c073ad4))
* **ui5-li-tree:** fixed incorrect tree items alignment ([#3075](https://github.com/SAP/ui5-webcomponents/issues/3075)) ([4b83c7b](https://github.com/SAP/ui5-webcomponents/commit/4b83c7b)), closes [#3069](https://github.com/SAP/ui5-webcomponents/issues/3069)
* **ui5-select:** keyboard/selection handling improvement ([#2907](https://github.com/SAP/ui5-webcomponents/issues/2907)) ([f18fd45](https://github.com/SAP/ui5-webcomponents/commit/f18fd45))


### Features

* **ui5-avatar-group:** new slot overflowButton ([#3037](https://github.com/SAP/ui5-webcomponents/issues/3037)) ([6d47d68](https://github.com/SAP/ui5-webcomponents/commit/6d47d68)), closes [#2912](https://github.com/SAP/ui5-webcomponents/issues/2912)





# [1.0.0-rc.13](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.12...v1.0.0-rc.13) (2021-03-26)


### Bug Fixes

* **ui5-avatar:** fix click event fired twice ([#2967](https://github.com/SAP/ui5-webcomponents/issues/2967)) ([377c9bc](https://github.com/SAP/ui5-webcomponents/commit/377c9bc)), closes [#2943](https://github.com/SAP/ui5-webcomponents/issues/2943)
* **ui5-button:** disable hover on mobile devices ([#2968](https://github.com/SAP/ui5-webcomponents/issues/2968)) ([c870eb4](https://github.com/SAP/ui5-webcomponents/commit/c870eb4))
* **ui5-button:** set icon-only attribute properly ([#2567](https://github.com/SAP/ui5-webcomponents/issues/2567)) ([#2824](https://github.com/SAP/ui5-webcomponents/issues/2824)) ([d834ec6](https://github.com/SAP/ui5-webcomponents/commit/d834ec6))
* **ui5-button:** use standard CSS param for border-radius ([#2840](https://github.com/SAP/ui5-webcomponents/issues/2840)) ([a5aafde](https://github.com/SAP/ui5-webcomponents/commit/a5aafde)), closes [#2830](https://github.com/SAP/ui5-webcomponents/issues/2830)
* **ui5-calendar:** re-render header on lang change ([#2939](https://github.com/SAP/ui5-webcomponents/issues/2939)) ([ad7adc5](https://github.com/SAP/ui5-webcomponents/commit/ad7adc5))
* **ui5-color-palette:** remove additional dots in more-colors ([#2958](https://github.com/SAP/ui5-webcomponents/issues/2958)) ([8ef07fe](https://github.com/SAP/ui5-webcomponents/commit/8ef07fe))
* **ui5-daterange-picker:** working with format pattern containing the delimiter ([#2873](https://github.com/SAP/ui5-webcomponents/issues/2873)) ([b397862](https://github.com/SAP/ui5-webcomponents/commit/b397862))
* **ui5-icon:** fix click event fired twice ([#2858](https://github.com/SAP/ui5-webcomponents/issues/2858)) ([6fd6a5e](https://github.com/SAP/ui5-webcomponents/commit/6fd6a5e)), closes [#2857](https://github.com/SAP/ui5-webcomponents/issues/2857)
* **ui5-input:** remove the 'submit' event ([#2855](https://github.com/SAP/ui5-webcomponents/issues/2855)) ([9e409e6](https://github.com/SAP/ui5-webcomponents/commit/9e409e6))
* **ui5-label:** text-align works with wrap property ([#2889](https://github.com/SAP/ui5-webcomponents/issues/2889)) ([c9f86a7](https://github.com/SAP/ui5-webcomponents/commit/c9f86a7))
* **ui5-li-custom:** keyboard handling improvement ([#2870](https://github.com/SAP/ui5-webcomponents/issues/2870)) ([583f5f0](https://github.com/SAP/ui5-webcomponents/commit/583f5f0)), closes [#2849](https://github.com/SAP/ui5-webcomponents/issues/2849)
* **ui5-multi-combobox:** correct focus handling when picker is opened via icon ([#2868](https://github.com/SAP/ui5-webcomponents/issues/2868)) ([76ef62c](https://github.com/SAP/ui5-webcomponents/commit/76ef62c))
* **ui5-page:** correct background-design styles ([#2862](https://github.com/SAP/ui5-webcomponents/issues/2862)) ([b10ee4c](https://github.com/SAP/ui5-webcomponents/commit/b10ee4c))
* **ui5-popover:** calculate offset for all sides of the page ([#2916](https://github.com/SAP/ui5-webcomponents/issues/2916)) ([e35cc1a](https://github.com/SAP/ui5-webcomponents/commit/e35cc1a))
* **ui5-popup:** position arrows correctly ([#2917](https://github.com/SAP/ui5-webcomponents/issues/2917)) ([5ffbbd9](https://github.com/SAP/ui5-webcomponents/commit/5ffbbd9)), closes [#2758](https://github.com/SAP/ui5-webcomponents/issues/2758) [#2401](https://github.com/SAP/ui5-webcomponents/issues/2401)
* **ui5-rangeslider:** fix handles opacity for IE11 ([#2983](https://github.com/SAP/ui5-webcomponents/issues/2983)) ([f0346c0](https://github.com/SAP/ui5-webcomponents/commit/f0346c0))
* **ui5-select:** incorrect value color is now fixed ([#2914](https://github.com/SAP/ui5-webcomponents/issues/2914)) ([0a074c9](https://github.com/SAP/ui5-webcomponents/commit/0a074c9))
* **ui5-select:** set aria-expanded initially ([#2991](https://github.com/SAP/ui5-webcomponents/issues/2991)) ([8353ac2](https://github.com/SAP/ui5-webcomponents/commit/8353ac2)), closes [#2987](https://github.com/SAP/ui5-webcomponents/issues/2987)
* **ui5-slider:** focus outline fully visible ([#2971](https://github.com/SAP/ui5-webcomponents/issues/2971)) ([cb849ba](https://github.com/SAP/ui5-webcomponents/commit/cb849ba))
* **ui5-table:** bottom borded added ([#2994](https://github.com/SAP/ui5-webcomponents/issues/2994)) ([802b6ca](https://github.com/SAP/ui5-webcomponents/commit/802b6ca)), closes [#2981](https://github.com/SAP/ui5-webcomponents/issues/2981)
* **ui5-table-column:** align content right in RTL ([#2955](https://github.com/SAP/ui5-webcomponents/issues/2955)) ([c117fe3](https://github.com/SAP/ui5-webcomponents/commit/c117fe3)), closes [#2945](https://github.com/SAP/ui5-webcomponents/issues/2945)
* **ui5-table-row:** fire row-click on SPACE/ENTER ([#2954](https://github.com/SAP/ui5-webcomponents/issues/2954)) ([1e328dc](https://github.com/SAP/ui5-webcomponents/commit/1e328dc)), closes [#2944](https://github.com/SAP/ui5-webcomponents/issues/2944)
* **ui5-togglebutton:** fix hover background on desktop ([#2984](https://github.com/SAP/ui5-webcomponents/issues/2984)) ([4f2a2cb](https://github.com/SAP/ui5-webcomponents/commit/4f2a2cb))


### Features

* **ui5-color-palette:** implement more-colors property ([#2853](https://github.com/SAP/ui5-webcomponents/issues/2853)) ([121bb2c](https://github.com/SAP/ui5-webcomponents/commit/121bb2c))
* **ui5-list:** introduce "growing" property ([#2950](https://github.com/SAP/ui5-webcomponents/issues/2950)) ([6fbbb21](https://github.com/SAP/ui5-webcomponents/commit/6fbbb21)), closes [#2882](https://github.com/SAP/ui5-webcomponents/issues/2882) [#2882](https://github.com/SAP/ui5-webcomponents/issues/2882)
* **ui5-tabcontainer:** support responsive paddings ([#2775](https://github.com/SAP/ui5-webcomponents/issues/2775)) ([19392ff](https://github.com/SAP/ui5-webcomponents/commit/19392ff)), closes [#2539](https://github.com/SAP/ui5-webcomponents/issues/2539)
* **ui5-table:** add growing on scroll ([#2593](https://github.com/SAP/ui5-webcomponents/issues/2593)) ([87520c2](https://github.com/SAP/ui5-webcomponents/commit/87520c2)), closes [#2589](https://github.com/SAP/ui5-webcomponents/issues/2589) [#2570](https://github.com/SAP/ui5-webcomponents/issues/2570)


### BREAKING CHANGES

* **ui5-input:** the 'submit' event is now removed. The 'submit' functionality must be added with a custom code - listen for the standard "keydown" event and check if ENTER is pressed to submit a form, containing the input component.




# [1.0.0-rc.12](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2021-02-18)


### Bug Fixes

* **ui5-avatar:** correct icon color ([#2658](https://github.com/SAP/ui5-webcomponents/issues/2658)) ([5a85687](https://github.com/SAP/ui5-webcomponents/commit/5a85687)), closes [#2555](https://github.com/SAP/ui5-webcomponents/issues/2555)
* **ui5-calendar:** "today" is now timezone aware([#2660](https://github.com/SAP/ui5-webcomponents/issues/2660)) ([32dd0ef](https://github.com/SAP/ui5-webcomponents/commit/32dd0ef))
* **ui5-checkbox:** use aria-hidden for inner input ([#2828](https://github.com/SAP/ui5-webcomponents/issues/2828)) ([d237401](https://github.com/SAP/ui5-webcomponents/commit/d237401)), closes [#2786](https://github.com/SAP/ui5-webcomponents/issues/2786)
* **ui5-checkbox:** vertical misalignment when wrap is true ([#2747](https://github.com/SAP/ui5-webcomponents/issues/2747)) ([9f027f1](https://github.com/SAP/ui5-webcomponents/commit/9f027f1))
* **ui5-combobox:** fix behaviour when enter is clicked ([a10acc8](https://github.com/SAP/ui5-webcomponents/commit/a10acc8))
* **ui5-combobox:** User action cancelled when clicking "X" on mobile ([#2742](https://github.com/SAP/ui5-webcomponents/issues/2742)) ([691c2e4](https://github.com/SAP/ui5-webcomponents/commit/691c2e4)), closes [#2449](https://github.com/SAP/ui5-webcomponents/issues/2449)
* **ui5-combobox, ui5-multicombobox:** center ValueState text ([#2733](https://github.com/SAP/ui5-webcomponents/issues/2733)) ([b2c770a](https://github.com/SAP/ui5-webcomponents/commit/b2c770a)), closes [#2274](https://github.com/SAP/ui5-webcomponents/issues/2274)
* **ui5-date-picker:** input type is now conveyed ([#2628](https://github.com/SAP/ui5-webcomponents/issues/2628)) ([70e3269](https://github.com/SAP/ui5-webcomponents/commit/70e3269)), closes [#2604](https://github.com/SAP/ui5-webcomponents/issues/2604)
* **ui5-icon:** alignment issue in Safari ([#2746](https://github.com/SAP/ui5-webcomponents/issues/2746)) ([daa51e7](https://github.com/SAP/ui5-webcomponents/commit/daa51e7))
* **ui5-icon:** remove vertical icon flip in RTL ([#2645](https://github.com/SAP/ui5-webcomponents/issues/2645)) ([0120960](https://github.com/SAP/ui5-webcomponents/commit/0120960)), closes [#2644](https://github.com/SAP/ui5-webcomponents/issues/2644)
* **ui5-icon:** ui5-icon i18n works for all packages ([#2816](https://github.com/SAP/ui5-webcomponents/issues/2816)) ([91e16a1](https://github.com/SAP/ui5-webcomponents/commit/91e16a1))
* **ui5-input:** enable centering of text ([#2788](https://github.com/SAP/ui5-webcomponents/issues/2788)) ([bd1bd6e](https://github.com/SAP/ui5-webcomponents/commit/bd1bd6e))
* **ui5-input:** focus is handled properly ([#2670](https://github.com/SAP/ui5-webcomponents/issues/2670)) ([2c033aa](https://github.com/SAP/ui5-webcomponents/commit/2c033aa))
* **ui5-input:** Obsolete accessibility API removed ([#2721](https://github.com/SAP/ui5-webcomponents/issues/2721)) ([014c985](https://github.com/SAP/ui5-webcomponents/commit/014c985)), closes [#2605](https://github.com/SAP/ui5-webcomponents/issues/2605)
* **ui5-input:** prevent selection of suggestion group item ([#2777](https://github.com/SAP/ui5-webcomponents/issues/2777)) ([6cc458b](https://github.com/SAP/ui5-webcomponents/commit/6cc458b)), closes [#2255](https://github.com/SAP/ui5-webcomponents/issues/2255)
* **ui5-input:** ValueStateMessage width fixed ([#2736](https://github.com/SAP/ui5-webcomponents/issues/2736)) ([1e8082d](https://github.com/SAP/ui5-webcomponents/commit/1e8082d))
* **ui5-list:** fix JS error on focusin ([#2720](https://github.com/SAP/ui5-webcomponents/issues/2720)) ([b36e54e](https://github.com/SAP/ui5-webcomponents/commit/b36e54e))
* **ui5-list:** remove busy indicator dom ([#2712](https://github.com/SAP/ui5-webcomponents/issues/2712)) ([fe76278](https://github.com/SAP/ui5-webcomponents/commit/fe76278))
* **ui5-list:** show busy ind over the list ([#2684](https://github.com/SAP/ui5-webcomponents/issues/2684)) ([ad56eaa](https://github.com/SAP/ui5-webcomponents/commit/ad56eaa))
* **ui5-multi-combobox:** fix livechange behaviour ([#2656](https://github.com/SAP/ui5-webcomponents/issues/2656)) ([57820dd](https://github.com/SAP/ui5-webcomponents/commit/57820dd))
* **ui5-multi-combobox:** The initial focus is set on the ui5-dialog ([#2702](https://github.com/SAP/ui5-webcomponents/issues/2702)) ([aeed733](https://github.com/SAP/ui5-webcomponents/commit/aeed733))
* **ui5-multi-input:** fix appearance in RTL ([#2782](https://github.com/SAP/ui5-webcomponents/issues/2782)) ([e842f23](https://github.com/SAP/ui5-webcomponents/commit/e842f23)), closes [#2749](https://github.com/SAP/ui5-webcomponents/issues/2749)
* **ui5-multicombobox:** Placeholder with tokens hidden ([#2785](https://github.com/SAP/ui5-webcomponents/issues/2785)) ([d769a0d](https://github.com/SAP/ui5-webcomponents/commit/d769a0d)), closes [#2261](https://github.com/SAP/ui5-webcomponents/issues/2261)
* **ui5-multiinput:** hide placeholder when tokens ([#2789](https://github.com/SAP/ui5-webcomponents/issues/2789)) ([679dae3](https://github.com/SAP/ui5-webcomponents/commit/679dae3)), closes [#2261](https://github.com/SAP/ui5-webcomponents/issues/2261)
* **ui5-popover:** correctly position a popover if dynamically created ([#2679](https://github.com/SAP/ui5-webcomponents/issues/2679)) ([5a872b0](https://github.com/SAP/ui5-webcomponents/commit/5a872b0))
* **ui5-popover, ui5-dialog:** do not render empty headers ([#2770](https://github.com/SAP/ui5-webcomponents/issues/2770)) ([7f0bd6a](https://github.com/SAP/ui5-webcomponents/commit/7f0bd6a)), closes [#2694](https://github.com/SAP/ui5-webcomponents/issues/2694)
* **ui5-popup:** correct focus when there is no focusable content ([#2583](https://github.com/SAP/ui5-webcomponents/issues/2583)) ([bf8caaf](https://github.com/SAP/ui5-webcomponents/commit/bf8caaf))
* **ui5-popup:** prevent focus on elements below block layer ([#2800](https://github.com/SAP/ui5-webcomponents/issues/2800)) ([f2f3889](https://github.com/SAP/ui5-webcomponents/commit/f2f3889)), closes [#2626](https://github.com/SAP/ui5-webcomponents/issues/2626)
* **ui5-popup): fix(ui5-popup:** hide block layer if popup is closed ([#2799](https://github.com/SAP/ui5-webcomponents/issues/2799)) ([6f82e42](https://github.com/SAP/ui5-webcomponents/commit/6f82e42)), closes [#2696](https://github.com/SAP/ui5-webcomponents/issues/2696)
* **ui5-radiobutton:** fix tab order within group ([#2783](https://github.com/SAP/ui5-webcomponents/issues/2783)) ([d6a7b81](https://github.com/SAP/ui5-webcomponents/commit/d6a7b81)), closes [#2774](https://github.com/SAP/ui5-webcomponents/issues/2774)
* **ui5-select:** correct role and screen reader speech out ([#2587](https://github.com/SAP/ui5-webcomponents/issues/2587)) ([59497ee](https://github.com/SAP/ui5-webcomponents/commit/59497ee)), closes [#2485](https://github.com/SAP/ui5-webcomponents/issues/2485) [#2339](https://github.com/SAP/ui5-webcomponents/issues/2339) [#2142](https://github.com/SAP/ui5-webcomponents/issues/2142)
* **ui5-select:** fix popover opening ([#2687](https://github.com/SAP/ui5-webcomponents/issues/2687)) ([53418fb](https://github.com/SAP/ui5-webcomponents/commit/53418fb)), closes [#2682](https://github.com/SAP/ui5-webcomponents/issues/2682)
* **ui5-tabcontainer:** overflow menu button is added a title ([#2639](https://github.com/SAP/ui5-webcomponents/issues/2639)) ([943e4ce](https://github.com/SAP/ui5-webcomponents/commit/943e4ce)), closes [#2607](https://github.com/SAP/ui5-webcomponents/issues/2607)
* **ui5-tree:** accessibility improvements ([#2671](https://github.com/SAP/ui5-webcomponents/issues/2671)) ([849d052](https://github.com/SAP/ui5-webcomponents/commit/849d052)), closes [#2553](https://github.com/SAP/ui5-webcomponents/issues/2553)
* **ui5-upload-collection-item:** fix title behaviour on small screens ([#2699](https://github.com/SAP/ui5-webcomponents/issues/2699)) ([bb7c952](https://github.com/SAP/ui5-webcomponents/commit/bb7c952))


### Features

* **ui5-calendar:** Declarative dates support added ([#2648](https://github.com/SAP/ui5-webcomponents/issues/2648)) ([6602fba](https://github.com/SAP/ui5-webcomponents/commit/6602fba))
* **ui5-color-palette:** initial implementation ([#2731](https://github.com/SAP/ui5-webcomponents/issues/2731)) ([772424e](https://github.com/SAP/ui5-webcomponents/commit/772424e))
* **ui5-multi-combobox:** support two column layout for items ([#2642](https://github.com/SAP/ui5-webcomponents/issues/2642)) ([7742590](https://github.com/SAP/ui5-webcomponents/commit/7742590)), closes [#2637](https://github.com/SAP/ui5-webcomponents/issues/2637)
* **ui5-multi-input:** Implement accessibility specifications ([#2761](https://github.com/SAP/ui5-webcomponents/issues/2761)) ([2e7b968](https://github.com/SAP/ui5-webcomponents/commit/2e7b968))
* **ui5-range-slider:** focus and keyboard handling implementation ([#2620](https://github.com/SAP/ui5-webcomponents/issues/2620)) ([8c71ca4](https://github.com/SAP/ui5-webcomponents/commit/8c71ca4))
* **ui5-select:** Add support for disabled select options ([#2730](https://github.com/SAP/ui5-webcomponents/issues/2730)) ([e903164](https://github.com/SAP/ui5-webcomponents/commit/e903164)), closes [#2559](https://github.com/SAP/ui5-webcomponents/issues/2559)
* **ui5-slider:** focus and keyboard handling implementation ([#2614](https://github.com/SAP/ui5-webcomponents/issues/2614)) ([7b78c16](https://github.com/SAP/ui5-webcomponents/commit/7b78c16))
* **ui5-slider, ui5-range-slider:** implement a11y spec ([#2714](https://github.com/SAP/ui5-webcomponents/issues/2714)) ([cb76cf4](https://github.com/SAP/ui5-webcomponents/commit/cb76cf4)), closes [#2513](https://github.com/SAP/ui5-webcomponents/issues/2513)
* **ui5-table:** add growing on scroll ([#2593](https://github.com/SAP/ui5-webcomponents/issues/2593)) ([87520c2](https://github.com/SAP/ui5-webcomponents/commit/87520c2)), closes [#2589](https://github.com/SAP/ui5-webcomponents/issues/2589) [#2570](https://github.com/SAP/ui5-webcomponents/issues/2570)
* **ui5-tree-item:** implement info/infoState attributes ([#2711](https://github.com/SAP/ui5-webcomponents/issues/2711)) ([1f07d50](https://github.com/SAP/ui5-webcomponents/commit/1f07d50)), closes [#2633](https://github.com/SAP/ui5-webcomponents/issues/2633)
* create @ui5/webcomponents-ie11 package ([#2686](https://github.com/SAP/ui5-webcomponents/issues/2686)) ([1d3b37e](https://github.com/SAP/ui5-webcomponents/commit/1d3b37e))
* **ui5-tree:** implement acc spec  ([#2636](https://github.com/SAP/ui5-webcomponents/issues/2636)) ([4663b91](https://github.com/SAP/ui5-webcomponents/commit/4663b91)), closes [#2465](https://github.com/SAP/ui5-webcomponents/issues/2465)
* refactoring and new features for pickers ([#2598](https://github.com/SAP/ui5-webcomponents/issues/2598)) ([3e684b4](https://github.com/SAP/ui5-webcomponents/commit/3e684b4))





# [1.0.0-rc.11](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.10...v1.0.0-rc.11) (2020-12-21)


### Bug Fixes

* **ui5-avatar:** fix XS size ([#2582](https://github.com/SAP/ui5-webcomponents/issues/2582)) ([9661ab8](https://github.com/SAP/ui5-webcomponents/commit/9661ab8))
* **ui5-badge:** enable letter spacing overwrite ([#2493](https://github.com/SAP/ui5-webcomponents/issues/2493)) ([cca0d5d](https://github.com/SAP/ui5-webcomponents/commit/cca0d5d)), closes [#2451](https://github.com/SAP/ui5-webcomponents/issues/2451)
* **ui5-badge:** fix RTL appearance ([#2569](https://github.com/SAP/ui5-webcomponents/issues/2569)) ([5f6d8fc](https://github.com/SAP/ui5-webcomponents/commit/5f6d8fc))
* **ui5-button:** hide icon tooltip ([#2566](https://github.com/SAP/ui5-webcomponents/issues/2566)) ([1b07955](https://github.com/SAP/ui5-webcomponents/commit/1b07955))
* **ui5-calendar:** keyboard navigation in the picker grid now works properly ([#2532](https://github.com/SAP/ui5-webcomponents/issues/2532)) ([371d12d](https://github.com/SAP/ui5-webcomponents/commit/371d12d))
* **ui5-card:** correct aria-labelledBy to card and header ([#2577](https://github.com/SAP/ui5-webcomponents/issues/2577)) ([2647941](https://github.com/SAP/ui5-webcomponents/commit/2647941)), closes [#2426](https://github.com/SAP/ui5-webcomponents/issues/2426)
* **ui5-carousel:** add all visible items to tab chain ([#2530](https://github.com/SAP/ui5-webcomponents/issues/2530)) ([37ee83f](https://github.com/SAP/ui5-webcomponents/commit/37ee83f)), closes [#1996](https://github.com/SAP/ui5-webcomponents/issues/1996)
* **ui5-date-picker:** fixing the min and max date in timezones half hour difference ([#2544](https://github.com/SAP/ui5-webcomponents/issues/2544)) ([766bcc0](https://github.com/SAP/ui5-webcomponents/commit/766bcc0)), closes [#2542](https://github.com/SAP/ui5-webcomponents/issues/2542)
* **ui5-datepicker:** keyboard navigation works properly ([#2549](https://github.com/SAP/ui5-webcomponents/issues/2549)) ([66cd1d7](https://github.com/SAP/ui5-webcomponents/commit/66cd1d7))
* **ui5-daterange-picker:** all tests are now enabled ([#2506](https://github.com/SAP/ui5-webcomponents/issues/2506)) ([33442e9](https://github.com/SAP/ui5-webcomponents/commit/33442e9)), closes [#2475](https://github.com/SAP/ui5-webcomponents/issues/2475)
* **ui5-daterange-picker:** fix RenderScheduler import ([#2476](https://github.com/SAP/ui5-webcomponents/issues/2476)) ([13ff13e](https://github.com/SAP/ui5-webcomponents/commit/13ff13e))
* **ui5-dialog:** apply initial focus after rendering ([#2551](https://github.com/SAP/ui5-webcomponents/issues/2551)) ([dba0265](https://github.com/SAP/ui5-webcomponents/commit/dba0265)), closes [#2537](https://github.com/SAP/ui5-webcomponents/issues/2537)
* **ui5-input:** aria-required attribute removed ([#2552](https://github.com/SAP/ui5-webcomponents/issues/2552)) ([7456ab5](https://github.com/SAP/ui5-webcomponents/commit/7456ab5))
* **ui5-input:** don't render aria-describedby if not neccessary ([#2512](https://github.com/SAP/ui5-webcomponents/issues/2512)) ([e7dd012](https://github.com/SAP/ui5-webcomponents/commit/e7dd012))
* **ui5-li-custom:** prevent firing of events ([#2462](https://github.com/SAP/ui5-webcomponents/issues/2462)) ([3f66c06](https://github.com/SAP/ui5-webcomponents/commit/3f66c06))
* **ui5-list:** remove focus trap for empty list ([#2411](https://github.com/SAP/ui5-webcomponents/issues/2411)) ([5f8e0e2](https://github.com/SAP/ui5-webcomponents/commit/5f8e0e2))
* **ui5-popover:** correct arrow position on RTL ([#2488](https://github.com/SAP/ui5-webcomponents/issues/2488)) ([3b81ad8](https://github.com/SAP/ui5-webcomponents/commit/3b81ad8)), closes [#2387](https://github.com/SAP/ui5-webcomponents/issues/2387)
* **ui5-select:** remove aria-roledescription ([#2463](https://github.com/SAP/ui5-webcomponents/issues/2463)) ([973a80d](https://github.com/SAP/ui5-webcomponents/commit/973a80d)), closes [#2358](https://github.com/SAP/ui5-webcomponents/issues/2358)
* **ui5-slider:** add more tests, add cozy styles, fix input event, fix tickmarks display ([#2508](https://github.com/SAP/ui5-webcomponents/issues/2508)) ([0cbc0bd](https://github.com/SAP/ui5-webcomponents/commit/0cbc0bd))
* **ui5-table:** improve accessibility ([#2534](https://github.com/SAP/ui5-webcomponents/issues/2534)) ([e06d6f3](https://github.com/SAP/ui5-webcomponents/commit/e06d6f3))
* **ui5-textarea:** announce required textarea ([#2385](https://github.com/SAP/ui5-webcomponents/issues/2385)) ([c2baf6b](https://github.com/SAP/ui5-webcomponents/commit/c2baf6b))
* **ui5-tree:** make the height of tree adjustable ([#2546](https://github.com/SAP/ui5-webcomponents/issues/2546)) ([1fc3180](https://github.com/SAP/ui5-webcomponents/commit/1fc3180)), closes [#2545](https://github.com/SAP/ui5-webcomponents/issues/2545)


### Features

* **framework:** Change child-parent invalidation API ([#2541](https://github.com/SAP/ui5-webcomponents/issues/2541)) ([a1a3f80](https://github.com/SAP/ui5-webcomponents/commit/a1a3f80))
* **ui5-avatar-group:** initial implementation ([#2524](https://github.com/SAP/ui5-webcomponents/issues/2524)) ([ae926ee](https://github.com/SAP/ui5-webcomponents/commit/ae926ee)), closes [#2409](https://github.com/SAP/ui5-webcomponents/issues/2409)
* **ui5-button:** implement title property ([#2492](https://github.com/SAP/ui5-webcomponents/issues/2492)) ([7ae9253](https://github.com/SAP/ui5-webcomponents/commit/7ae9253))
* **ui5-calendar:** introduce new component. ([#2424](https://github.com/SAP/ui5-webcomponents/issues/2424)) ([5470e23](https://github.com/SAP/ui5-webcomponents/commit/5470e23)), closes [#1730](https://github.com/SAP/ui5-webcomponents/issues/1730)
* **ui5-combobox:** аdd two-column layout support ([#2503](https://github.com/SAP/ui5-webcomponents/issues/2503)) ([679362d](https://github.com/SAP/ui5-webcomponents/commit/679362d)), closes [#2450](https://github.com/SAP/ui5-webcomponents/issues/2450)
* **ui5-date-picker:** component is now aligned with the specification ([#2304](https://github.com/SAP/ui5-webcomponents/issues/2304)) ([30d9d2b](https://github.com/SAP/ui5-webcomponents/commit/30d9d2b)), closes [#2151](https://github.com/SAP/ui5-webcomponents/issues/2151)
* **ui5-mcb:** introduces filter property ([#2088](https://github.com/SAP/ui5-webcomponents/issues/2088)) ([03cae4b](https://github.com/SAP/ui5-webcomponents/commit/03cae4b))
* **ui5-mcb-item:** implement stable-dom-ref property ([#2418](https://github.com/SAP/ui5-webcomponents/issues/2418)) ([6e4a156](https://github.com/SAP/ui5-webcomponents/commit/6e4a156))
* **ui5-option:** provide stableDomRef ([#2366](https://github.com/SAP/ui5-webcomponents/issues/2366)) ([50304f5](https://github.com/SAP/ui5-webcomponents/commit/50304f5)), closes [#1718](https://github.com/SAP/ui5-webcomponents/issues/1718)
* **ui5-popover:** implement hide-block-layer property ([#2413](https://github.com/SAP/ui5-webcomponents/issues/2413)) ([3b2d6de](https://github.com/SAP/ui5-webcomponents/commit/3b2d6de))
* **ui5-range-slider:** Add Range Slider component ([#2310](https://github.com/SAP/ui5-webcomponents/issues/2310)) ([9dea3b3](https://github.com/SAP/ui5-webcomponents/commit/9dea3b3))
* **ui5-slider:** Add Slider component ([#2349](https://github.com/SAP/ui5-webcomponents/issues/2349)) ([2b9008c](https://github.com/SAP/ui5-webcomponents/commit/2b9008c))
* **ui5-table:** add "loadMore" capability ([#2589](https://github.com/SAP/ui5-webcomponents/issues/2589)) ([2e5d5cd](https://github.com/SAP/ui5-webcomponents/commit/2e5d5cd))





# [1.0.0-rc.10](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.9...v1.0.0-rc.10) (2020-11-12)


### Bug Fixes

* **ui5-combobox:** allow typing in input on mobile devices ([#2412](https://github.com/SAP/ui5-webcomponents/issues/2412)) ([7bf44b5](https://github.com/SAP/ui5-webcomponents/commit/7bf44b5)), closes [#2324](https://github.com/SAP/ui5-webcomponents/issues/2324)
* **ui5-date-picker:**  hiding month button when month picker is shown ([#2331](https://github.com/SAP/ui5-webcomponents/issues/2331)) ([6454e29](https://github.com/SAP/ui5-webcomponents/commit/6454e29)), closes [#2244](https://github.com/SAP/ui5-webcomponents/issues/2244)
* **ui5-date-picker:** Updating navigation buttons states live in mont… ([#2307](https://github.com/SAP/ui5-webcomponents/issues/2307)) ([4f39aa4](https://github.com/SAP/ui5-webcomponents/commit/4f39aa4))
* **ui5-day-picker:** fix color contrast of selected day in HCB ([#2378](https://github.com/SAP/ui5-webcomponents/issues/2378)) ([ff67141](https://github.com/SAP/ui5-webcomponents/commit/ff67141)), closes [#2372](https://github.com/SAP/ui5-webcomponents/issues/2372)
* **ui5-dialog:** no longer gets clipped in short screen height in IE ([#2429](https://github.com/SAP/ui5-webcomponents/issues/2429)) ([03c8447](https://github.com/SAP/ui5-webcomponents/commit/03c8447)), closes [#2243](https://github.com/SAP/ui5-webcomponents/issues/2243)
* **ui5-dialog:** Texts are no longer blurred in Chromium-based browsers ([#2417](https://github.com/SAP/ui5-webcomponents/issues/2417)) ([eac514b](https://github.com/SAP/ui5-webcomponents/commit/eac514b))
* **ui5-input:** prevent js error when element is removed from DOM ([#2405](https://github.com/SAP/ui5-webcomponents/issues/2405)) ([0e507eb](https://github.com/SAP/ui5-webcomponents/commit/0e507eb))
* **ui5-li:** correct truncation behaviour of info text ([#2330](https://github.com/SAP/ui5-webcomponents/issues/2330)) ([64fef90](https://github.com/SAP/ui5-webcomponents/commit/64fef90)), closes [#2317](https://github.com/SAP/ui5-webcomponents/issues/2317)
* **ui5-li:** fix title update when initially empty ([#2362](https://github.com/SAP/ui5-webcomponents/issues/2362)) ([682a25c](https://github.com/SAP/ui5-webcomponents/commit/682a25c))
* **ui5-messagestrip:** fix close button accessibility ([#2352](https://github.com/SAP/ui5-webcomponents/issues/2352)) ([2194b16](https://github.com/SAP/ui5-webcomponents/commit/2194b16))
* **ui5-multi-combobox:** make focus outline visible ([#2431](https://github.com/SAP/ui5-webcomponents/issues/2431)) ([cd5fad2](https://github.com/SAP/ui5-webcomponents/commit/cd5fad2)), closes [#2286](https://github.com/SAP/ui5-webcomponents/issues/2286)
* **ui5-switch:** fix focus border position ([#2319](https://github.com/SAP/ui5-webcomponents/issues/2319)) ([df6c972](https://github.com/SAP/ui5-webcomponents/commit/df6c972))
* **ui5-tab:** expand tab height to tabcontainer height ([#2360](https://github.com/SAP/ui5-webcomponents/issues/2360)) ([ea47cd3](https://github.com/SAP/ui5-webcomponents/commit/ea47cd3))
* **ui5-textarea:** set italic to placeholder only ([#2458](https://github.com/SAP/ui5-webcomponents/issues/2458)) ([aeb9316](https://github.com/SAP/ui5-webcomponents/commit/aeb9316))
* **components:** use locales in date/time components correctly ([#2440](https://github.com/SAP/ui5-webcomponents/issues/2440)) ([dd87a53](https://github.com/SAP/ui5-webcomponents/commit/dd87a53))
* **ui5-multi-combobox:** n-more popover in readonly fixed ([#2394](https://github.com/SAP/ui5-webcomponents/issues/2394)) ([d045ba2](https://github.com/SAP/ui5-webcomponents/commit/d045ba2)), closes [#2369](https://github.com/SAP/ui5-webcomponents/issues/2369)
* **ui5-textarea:** fix placeholder font-style ([#2340](https://github.com/SAP/ui5-webcomponents/issues/2340)) ([1fbb4f5](https://github.com/SAP/ui5-webcomponents/commit/1fbb4f5))


### Features

* **ui5-checkbox:** implement ariaLabelledby property ([#2272](https://github.com/SAP/ui5-webcomponents/issues/2272)) ([cbf2461](https://github.com/SAP/ui5-webcomponents/commit/cbf2461))
* **ui5-daterange-picker:** enhance keyboard handling ([#2179](https://github.com/SAP/ui5-webcomponents/issues/2179)) ([84eb484](https://github.com/SAP/ui5-webcomponents/commit/84eb484)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-dialog:** introduce resizable property ([#2301](https://github.com/SAP/ui5-webcomponents/issues/2301)) ([8be4048](https://github.com/SAP/ui5-webcomponents/commit/8be4048)), closes [#2082](https://github.com/SAP/ui5-webcomponents/issues/2082)
* **ui5-link:** add aria-label and aria-labelledby support ([#2357](https://github.com/SAP/ui5-webcomponents/issues/2357)) ([7e65e77](https://github.com/SAP/ui5-webcomponents/commit/7e65e77)), closes [#2356](https://github.com/SAP/ui5-webcomponents/issues/2356)


# [1.0.0-rc.9](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2020-10-08)


### Bug Fixes

* **components:** fix setting contentDensity styles ([#2094](https://github.com/SAP/ui5-webcomponents/issues/2094)) ([9454ab7](https://github.com/SAP/ui5-webcomponents/commit/9454ab7)), closes [#2093](https://github.com/SAP/ui5-webcomponents/issues/2093)
* **ui5-badge:** update colors to match the spec([#2216](https://github.com/SAP/ui5-webcomponents/issues/2216)) ([2ddc4e9](https://github.com/SAP/ui5-webcomponents/commit/2ddc4e9)), closes [#2210](https://github.com/SAP/ui5-webcomponents/issues/2210)
* **ui5-button:** prevent button with icons truncate in ie ([#2181](https://github.com/SAP/ui5-webcomponents/issues/2181)) ([31ca287](https://github.com/SAP/ui5-webcomponents/commit/31ca287))
* **ui5-calendar:** Year text is now right in all timezones ([#2209](https://github.com/SAP/ui5-webcomponents/issues/2209)) ([3427f35](https://github.com/SAP/ui5-webcomponents/commit/3427f35))
* **ui5-calendar-header:** prevent scrolling when month/year picker is selected ([#2276](https://github.com/SAP/ui5-webcomponents/issues/2276)) ([fac40a8](https://github.com/SAP/ui5-webcomponents/commit/fac40a8))
* **ui5-card:**  Apply focus to header properly in IE ([#2050](https://github.com/SAP/ui5-webcomponents/issues/2050)) ([00760e6](https://github.com/SAP/ui5-webcomponents/commit/00760e6)), closes [#2007](https://github.com/SAP/ui5-webcomponents/issues/2007)
* **ui5-combobox:** allow setting value with javascript ([#2253](https://github.com/SAP/ui5-webcomponents/issues/2253)) ([0742854](https://github.com/SAP/ui5-webcomponents/commit/0742854))
* **ui5-date-picker:** ensure min and max date are not disabled ([#2280](https://github.com/SAP/ui5-webcomponents/issues/2280)) ([f0473f0](https://github.com/SAP/ui5-webcomponents/commit/f0473f0))
* **ui5-date-picker:** select date with SPACE on keyup ([#2279](https://github.com/SAP/ui5-webcomponents/issues/2279)) ([9d83806](https://github.com/SAP/ui5-webcomponents/commit/9d83806)), closes [#2276](https://github.com/SAP/ui5-webcomponents/issues/2276) [#2268](https://github.com/SAP/ui5-webcomponents/issues/2268)
* **ui5-daterange-picker:** date selection is now correct in all timez… ([#2203](https://github.com/SAP/ui5-webcomponents/issues/2203)) ([2bca6f1](https://github.com/SAP/ui5-webcomponents/commit/2bca6f1))
* **ui5-daterange-picker:** enable selection of single day ([#2157](https://github.com/SAP/ui5-webcomponents/issues/2157)) ([66722b2](https://github.com/SAP/ui5-webcomponents/commit/66722b2))
* **ui5-daterange-picker:** fix firstDate/lastDate getters values ([#2277](https://github.com/SAP/ui5-webcomponents/issues/2277)) ([00f5ab5](https://github.com/SAP/ui5-webcomponents/commit/00f5ab5)), closes [#2221](https://github.com/SAP/ui5-webcomponents/issues/2221)
* **ui5-daterange-picker:** Fix icon appearance in IE ([#2057](https://github.com/SAP/ui5-webcomponents/issues/2057)) ([dba7a2c](https://github.com/SAP/ui5-webcomponents/commit/dba7a2c)), closes [#2017](https://github.com/SAP/ui5-webcomponents/issues/2017)
* **ui5-daterange-picker:** fix js error when removed from the DOM ([#2180](https://github.com/SAP/ui5-webcomponents/issues/2180)) ([6cb2a71](https://github.com/SAP/ui5-webcomponents/commit/6cb2a71))
* **ui5-daterange-picker:** show value in input only when first & last… ([#2098](https://github.com/SAP/ui5-webcomponents/issues/2098)) ([f56cb66](https://github.com/SAP/ui5-webcomponents/commit/f56cb66))
* **ui5-datetime-picker:** fix scrollbar issue in IE11 ([#2154](https://github.com/SAP/ui5-webcomponents/issues/2154)) ([306572f](https://github.com/SAP/ui5-webcomponents/commit/306572f))
* **ui5-duration-picker:** fix incorrect data support ([#2097](https://github.com/SAP/ui5-webcomponents/issues/2097)) ([4bcd797](https://github.com/SAP/ui5-webcomponents/commit/4bcd797))
* **ui5-input:** announce custom valueStateMessage ([#2120](https://github.com/SAP/ui5-webcomponents/issues/2120)) ([8f8a0d4](https://github.com/SAP/ui5-webcomponents/commit/8f8a0d4))
* **ui5-input:** cancel suggestion selection with ESC ([#2289](https://github.com/SAP/ui5-webcomponents/issues/2289)) ([ef1fb40](https://github.com/SAP/ui5-webcomponents/commit/ef1fb40)), closes [#2254](https://github.com/SAP/ui5-webcomponents/issues/2254)
* **ui5-input:** deselect suggestion items on input ([#2285](https://github.com/SAP/ui5-webcomponents/issues/2285)) ([a98c6bd](https://github.com/SAP/ui5-webcomponents/commit/a98c6bd)), closes [#2256](https://github.com/SAP/ui5-webcomponents/issues/2256)
* **ui5-input:** fix value state msg appearance ([#2075](https://github.com/SAP/ui5-webcomponents/issues/2075)) ([edfe8ca](https://github.com/SAP/ui5-webcomponents/commit/edfe8ca))
* **ui5-input:** implement aria-required ([#2114](https://github.com/SAP/ui5-webcomponents/issues/2114)) ([0e0de82](https://github.com/SAP/ui5-webcomponents/commit/0e0de82))
* **ui5-input:** number input doesn't lose value ([#2130](https://github.com/SAP/ui5-webcomponents/issues/2130)) ([2c6139d](https://github.com/SAP/ui5-webcomponents/commit/2c6139d))
* **ui5-li:** correct image size ([5c51dc6](https://github.com/SAP/ui5-webcomponents/commit/5c51dc6)), closes [#2218](https://github.com/SAP/ui5-webcomponents/issues/2218)
* **ui5-li:** correct sizes ([2faad25](https://github.com/SAP/ui5-webcomponents/commit/2faad25)), closes [#2218](https://github.com/SAP/ui5-webcomponents/issues/2218)
* **ui5-li:** fix visual deviations from Fiori 3 ([#2314](https://github.com/SAP/ui5-webcomponents/issues/2314)) ([d430632](https://github.com/SAP/ui5-webcomponents/commit/d430632)), closes [#2297](https://github.com/SAP/ui5-webcomponents/issues/2297) [#2218](https://github.com/SAP/ui5-webcomponents/issues/2218)
* **ui5-li:** Scale image properly ([#2059](https://github.com/SAP/ui5-webcomponents/issues/2059)) ([3aadc0e](https://github.com/SAP/ui5-webcomponents/commit/3aadc0e))
* **ui5-li-custom:** fix pointer-events inheritance ([#2196](https://github.com/SAP/ui5-webcomponents/issues/2196)) ([bfb9999](https://github.com/SAP/ui5-webcomponents/commit/bfb9999))
* **ui5-messagestrip:** Close button now has the correct design ([#2029](https://github.com/SAP/ui5-webcomponents/issues/2029)) ([7f99be5](https://github.com/SAP/ui5-webcomponents/commit/7f99be5))
* **ui5-multi-combobox:** fix behavior of show all selected button ([#2100](https://github.com/SAP/ui5-webcomponents/issues/2100)) ([84362e0](https://github.com/SAP/ui5-webcomponents/commit/84362e0))
* **ui5-multi-combobox:** fix jumping parent div ([#2136](https://github.com/SAP/ui5-webcomponents/issues/2136)) ([ad1fbd7](https://github.com/SAP/ui5-webcomponents/commit/ad1fbd7))
* **ui5-multi-combobox:** fix width in IE ([#2104](https://github.com/SAP/ui5-webcomponents/issues/2104)) ([af0785c](https://github.com/SAP/ui5-webcomponents/commit/af0785c))
* **ui5-multiinput:** Improve valueStateMessage in nMore popover ([#2225](https://github.com/SAP/ui5-webcomponents/issues/2225)) ([a03f2b3](https://github.com/SAP/ui5-webcomponents/commit/a03f2b3)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-popover:** fix arrow horizontal position ([#2129](https://github.com/SAP/ui5-webcomponents/issues/2129)) ([7a1c3eb](https://github.com/SAP/ui5-webcomponents/commit/7a1c3eb)), closes [#2111](https://github.com/SAP/ui5-webcomponents/issues/2111)
* **ui5-popover:** fix js errors if parent is removed from DOM ([#2178](https://github.com/SAP/ui5-webcomponents/issues/2178)) ([904da0e](https://github.com/SAP/ui5-webcomponents/commit/904da0e))
* **ui5-popup:** prevent interaction with the content under the popup ([#2119](https://github.com/SAP/ui5-webcomponents/issues/2119)) ([d6ffa48](https://github.com/SAP/ui5-webcomponents/commit/d6ffa48))
* **ui5-popup:** restore focus when block layer is clicked ([#2123](https://github.com/SAP/ui5-webcomponents/issues/2123)) ([c079722](https://github.com/SAP/ui5-webcomponents/commit/c079722))
* **ui5-popup, ui5-dialog:** remove closed instance from openedPopupsRegistry ([#2275](https://github.com/SAP/ui5-webcomponents/issues/2275)) ([443af29](https://github.com/SAP/ui5-webcomponents/commit/443af29))
* **ui5-select:** fix text color of disabled select in hcb/hcw ([#2248](https://github.com/SAP/ui5-webcomponents/issues/2248)) ([bc6dfec](https://github.com/SAP/ui5-webcomponents/commit/bc6dfec))
* **ui5-select:** make disabled select not focusable ([#2229](https://github.com/SAP/ui5-webcomponents/issues/2229)) ([960f927](https://github.com/SAP/ui5-webcomponents/commit/960f927))
* **ui5-tabcontainer:** Fix ARIA posinset and setsize values ([#2046](https://github.com/SAP/ui5-webcomponents/issues/2046)) ([c6fcf69](https://github.com/SAP/ui5-webcomponents/commit/c6fcf69)), closes [#2035](https://github.com/SAP/ui5-webcomponents/issues/2035)
* **ui5-tabcontainer:** Implement ACC for overflowed items ([#2047](https://github.com/SAP/ui5-webcomponents/issues/2047)) ([efe03bc](https://github.com/SAP/ui5-webcomponents/commit/efe03bc)), closes [#2036](https://github.com/SAP/ui5-webcomponents/issues/2036)
* **ui5-tabcontainer:** remove scroll from empty tabs ([#2148](https://github.com/SAP/ui5-webcomponents/issues/2148)) ([11af57e](https://github.com/SAP/ui5-webcomponents/commit/11af57e))
* **ui5-table-row:** announce entire row and columns ([#2164](https://github.com/SAP/ui5-webcomponents/issues/2164)) ([09863d8](https://github.com/SAP/ui5-webcomponents/commit/09863d8)), closes [#2160](https://github.com/SAP/ui5-webcomponents/issues/2160)
* **ui5-textarea:** add aria-required ([#2113](https://github.com/SAP/ui5-webcomponents/issues/2113)) ([4f35c92](https://github.com/SAP/ui5-webcomponents/commit/4f35c92))
* **ui5-textarea:** announce custom valueStateMessage ([#2122](https://github.com/SAP/ui5-webcomponents/issues/2122)) ([4d27065](https://github.com/SAP/ui5-webcomponents/commit/4d27065))
* Fix aria-disabled usage ([#2056](https://github.com/SAP/ui5-webcomponents/issues/2056)) ([bb624ae](https://github.com/SAP/ui5-webcomponents/commit/bb624ae))


### Features

* **ui5-card:** add ariaLabel and ariaLabelledby properties ([#2127](https://github.com/SAP/ui5-webcomponents/issues/2127)) ([7007f8e](https://github.com/SAP/ui5-webcomponents/commit/7007f8e))
* **ui5-carousel:** implement rtl support ([#2086](https://github.com/SAP/ui5-webcomponents/issues/2086)) ([f69ffa5](https://github.com/SAP/ui5-webcomponents/commit/f69ffa5))
* **ui5-combobox:** enable handling of arrow down/up keys ([974401b](https://github.com/SAP/ui5-webcomponents/commit/974401b)), closes [#1939](https://github.com/SAP/ui5-webcomponents/issues/1939)
* **ui5-combobox:** implement icon slot ([#2139](https://github.com/SAP/ui5-webcomponents/issues/2139)) ([8c98e80](https://github.com/SAP/ui5-webcomponents/commit/8c98e80))
* **ui5-combobox:** implement valueStateMessage slot ([#2099](https://github.com/SAP/ui5-webcomponents/issues/2099)) ([385bb0b](https://github.com/SAP/ui5-webcomponents/commit/385bb0b)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-combobox:** introduces selection-change event ([#2090](https://github.com/SAP/ui5-webcomponents/issues/2090)) ([43be0f6](https://github.com/SAP/ui5-webcomponents/commit/43be0f6))
* **ui5-date-picker:** add ariaLabel and ariaLabelledby properties ([#2126](https://github.com/SAP/ui5-webcomponents/issues/2126)) ([e0f93fa](https://github.com/SAP/ui5-webcomponents/commit/e0f93fa))
* **ui5-date-picker:** add screen reader support ([#2224](https://github.com/SAP/ui5-webcomponents/issues/2224)) ([e6a0cd8](https://github.com/SAP/ui5-webcomponents/commit/e6a0cd8)), closes [#1279](https://github.com/SAP/ui5-webcomponents/issues/1279)
* **ui5-date-picker:** keyboard handling improvement ([#2146](https://github.com/SAP/ui5-webcomponents/issues/2146)) ([19afe90](https://github.com/SAP/ui5-webcomponents/commit/19afe90)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-datepicker:** introduce required property ([#2117](https://github.com/SAP/ui5-webcomponents/issues/2117)) ([e282fc8](https://github.com/SAP/ui5-webcomponents/commit/e282fc8))
* **ui5-datetime-picker:** improve keyboard handling support ([#2137](https://github.com/SAP/ui5-webcomponents/issues/2137)) ([0ada41a](https://github.com/SAP/ui5-webcomponents/commit/0ada41a)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-dialog:** introduce draggable property ([#2269](https://github.com/SAP/ui5-webcomponents/issues/2269)) ([93772fb](https://github.com/SAP/ui5-webcomponents/commit/93772fb)), closes [#2082](https://github.com/SAP/ui5-webcomponents/issues/2082)
* **ui5-duration-picker:** implement keyboard handling support ([#2095](https://github.com/SAP/ui5-webcomponents/issues/2095)) ([7ec3c43](https://github.com/SAP/ui5-webcomponents/commit/7ec3c43)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-duration-picker:** implement valueStateMessage ([#2102](https://github.com/SAP/ui5-webcomponents/issues/2102)) ([ed3c393](https://github.com/SAP/ui5-webcomponents/commit/ed3c393)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-file-uploader:** implement custom valueStateMessage ([#2131](https://github.com/SAP/ui5-webcomponents/issues/2131)) ([023e236](https://github.com/SAP/ui5-webcomponents/commit/023e236)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-li, ui5-li-tree, ui5-li-custom, ui5-upload-collection-item:**  implement role property ([#2236](https://github.com/SAP/ui5-webcomponents/issues/2236)) ([01a1fb0](https://github.com/SAP/ui5-webcomponents/commit/01a1fb0))
* **ui5-multi-combobox:** implement icon slot ([#2140](https://github.com/SAP/ui5-webcomponents/issues/2140)) ([0fde573](https://github.com/SAP/ui5-webcomponents/commit/0fde573))
* **ui5-multi-combobox:** Implement valueStateMessage ([#2258](https://github.com/SAP/ui5-webcomponents/issues/2258)) ([793a29e](https://github.com/SAP/ui5-webcomponents/commit/793a29e)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-multi-input:** fire value-help-trigger with F4, ALT/OPTION + ARROW_UP/DOWN ([#2145](https://github.com/SAP/ui5-webcomponents/issues/2145)) ([8c473c3](https://github.com/SAP/ui5-webcomponents/commit/8c473c3)), closes [#2143](https://github.com/SAP/ui5-webcomponents/issues/2143)
* **ui5-multi-input:** initial implementation ([#1942](https://github.com/SAP/ui5-webcomponents/issues/1942)) ([5d7e7df](https://github.com/SAP/ui5-webcomponents/commit/5d7e7df))
* **ui5-multiinput, ui5-multi-combobox:** implement keyboard handling ([#2166](https://github.com/SAP/ui5-webcomponents/issues/2166)) ([dc2ae6d](https://github.com/SAP/ui5-webcomponents/commit/dc2ae6d))
* **ui5-panel:** implement headerAriaLabelledBy property ([#2200](https://github.com/SAP/ui5-webcomponents/issues/2200)) ([67c4d69](https://github.com/SAP/ui5-webcomponents/commit/67c4d69))
* **ui5-select:** add ariaLabel and ariaLabelledby properties ([#2125](https://github.com/SAP/ui5-webcomponents/issues/2125)) ([a58bf49](https://github.com/SAP/ui5-webcomponents/commit/a58bf49)), closes [#2107](https://github.com/SAP/ui5-webcomponents/issues/2107)
* **ui5-select:** Implеment value state message ([4133a42](https://github.com/SAP/ui5-webcomponents/commit/4133a42)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-select:** introduce required property ([#2116](https://github.com/SAP/ui5-webcomponents/issues/2116)) ([f66875a](https://github.com/SAP/ui5-webcomponents/commit/f66875a))
* **ui5-tab-container:** implement overflow-button slot ([#2192](https://github.com/SAP/ui5-webcomponents/issues/2192)) ([e91c200](https://github.com/SAP/ui5-webcomponents/commit/e91c200))
* **ui5-textarea:** add ariaLabel and ariaLabelledby properties ([#2124](https://github.com/SAP/ui5-webcomponents/issues/2124)) ([c005478](https://github.com/SAP/ui5-webcomponents/commit/c005478)), closes [#2107](https://github.com/SAP/ui5-webcomponents/issues/2107)
* **ui5-time-picker:** improve keyboard handling support ([#2092](https://github.com/SAP/ui5-webcomponents/issues/2092)) ([20c55ed](https://github.com/SAP/ui5-webcomponents/commit/20c55ed)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-token:** provide closeIcon slot ([#2193](https://github.com/SAP/ui5-webcomponents/issues/2193)) ([d19fa5f](https://github.com/SAP/ui5-webcomponents/commit/d19fa5f))




# [1.0.0-rc.8](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2020-07-30)


### Bug Fixes

* **ui5-avatar:** Correct colors are applied for acc themes ([#1786](https://github.com/SAP/ui5-webcomponents/issues/1786)) ([42f1766](https://github.com/SAP/ui5-webcomponents/commit/42f1766))
* **ui5-avatar:** Image URL may now contain special characters ([#1828](https://github.com/SAP/ui5-webcomponents/issues/1828)) ([3acab5a](https://github.com/SAP/ui5-webcomponents/commit/3acab5a))
* **ui5-busy-indicator:** Fix double focus issue ([#1779](https://github.com/SAP/ui5-webcomponents/issues/1779)) ([f7bc0aa](https://github.com/SAP/ui5-webcomponents/commit/f7bc0aa))
* **ui5-busyindicator:** Set bigger opacity for IE ([#2010](https://github.com/SAP/ui5-webcomponents/issues/2010)) ([ab3f92f](https://github.com/SAP/ui5-webcomponents/commit/ab3f92f)), closes [#2005](https://github.com/SAP/ui5-webcomponents/issues/2005)
* **ui5-busyindicator:** Prevent keyboard events propagation to controls ([#1607](https://github.com/SAP/ui5-webcomponents/issues/1607)) ([031b6ca](https://github.com/SAP/ui5-webcomponents/commit/031b6ca))
* **ui5-button:** Determine icon-only ignoring comment nodes ([#1679](https://github.com/SAP/ui5-webcomponents/issues/1679)) ([ba1ee78](https://github.com/SAP/ui5-webcomponents/commit/ba1ee78))
* **ui5-button:** Make buttons truncate ([#1586](https://github.com/SAP/ui5-webcomponents/issues/1586)) ([1044daa](https://github.com/SAP/ui5-webcomponents/commit/1044daa))
* **ui5-button:** Align verticaly icon in IE ([#1823](https://github.com/SAP/ui5-webcomponents/issues/1823)) ([b003f05](https://github.com/SAP/ui5-webcomponents/commit/b003f05))
* **ui5-button:** Apply aria-expanded to inner button tag ([#1781](https://github.com/SAP/ui5-webcomponents/issues/1781)) ([df9e4e9](https://github.com/SAP/ui5-webcomponents/commit/df9e4e9))
* **ui5-card:** Remove header outline ([#1891](https://github.com/SAP/ui5-webcomponents/issues/1891)) ([8f260f8](https://github.com/SAP/ui5-webcomponents/commit/8f260f8))
* **ui5-carousel:** Make content under the navigation arrows accessible ([#2014](https://github.com/SAP/ui5-webcomponents/issues/2014)) ([8123288](https://github.com/SAP/ui5-webcomponents/commit/8123288))
* **ui5-combo-box:** Close picker when no match ([#1926](https://github.com/SAP/ui5-webcomponents/issues/1926)) ([dcac133](https://github.com/SAP/ui5-webcomponents/commit/dcac133)), closes [#1920](https://github.com/SAP/ui5-webcomponents/issues/1920)
* **ui5-combobox:** Close popover on "Enter" key press ([f0e2bac](https://github.com/SAP/ui5-webcomponents/commit/f0e2bac)), closes [#1940](https://github.com/SAP/ui5-webcomponents/issues/1940)
* **ui5-combobox:** Close popup on focusout ([#2013](https://github.com/SAP/ui5-webcomponents/issues/2013)) ([2c95be4](https://github.com/SAP/ui5-webcomponents/commit/2c95be4)), closes [#2009](https://github.com/SAP/ui5-webcomponents/issues/2009)
* **ui5-combobox:** Correct the display of items in popover ([23fb8b7](https://github.com/SAP/ui5-webcomponents/commit/23fb8b7)), closes [#1925](https://github.com/SAP/ui5-webcomponents/issues/1925)
* **ui5-combobox:** Support aria-label/arial-labelledby and fix aria-expanded ([#1916](https://github.com/SAP/ui5-webcomponents/issues/1916)) ([99a0e81](https://github.com/SAP/ui5-webcomponents/commit/99a0e81))
* **ui5-dialog:** Fix behaviour on mobile when added to DOM on interaction ([#1830](https://github.com/SAP/ui5-webcomponents/issues/1830)) ([f95807d](https://github.com/SAP/ui5-webcomponents/commit/f95807d))
* **ui5-file-uploader:** Fix JS error thrown in IE ([#2023](https://github.com/SAP/ui5-webcomponents/issues/2023)) ([61b0205](https://github.com/SAP/ui5-webcomponents/commit/61b0205))
* **ui5-input:** Fix inpur cursor movement in Safari ([#1983](https://github.com/SAP/ui5-webcomponents/issues/1983)) ([7a9e9a3](https://github.com/SAP/ui5-webcomponents/commit/7a9e9a3))
* **ui5-input:** Fix js error on mouseover/out ([#1931](https://github.com/SAP/ui5-webcomponents/issues/1931)) ([7da7a54](https://github.com/SAP/ui5-webcomponents/commit/7da7a54)), closes [#1930](https://github.com/SAP/ui5-webcomponents/issues/1930)
* **ui5-input:** Fix JS errors when open/close popups ([#1811](https://github.com/SAP/ui5-webcomponents/issues/1811)) ([cbe8bb8](https://github.com/SAP/ui5-webcomponents/commit/cbe8bb8))
* **ui5-input:** Fix scrolling item into view ([#1848](https://github.com/SAP/ui5-webcomponents/issues/1848)) ([5438c66](https://github.com/SAP/ui5-webcomponents/commit/5438c66)), closes [#1847](https://github.com/SAP/ui5-webcomponents/issues/1847)
* **ui5-input:** Fix selection color and bg ([#1954](https://github.com/SAP/ui5-webcomponents/issues/1954)) ([30c357a](https://github.com/SAP/ui5-webcomponents/commit/30c357a))
* **ui5-input:** Stop firing focusout on suggestion click ([#1857](https://github.com/SAP/ui5-webcomponents/issues/1857)) ([a33dd95](https://github.com/SAP/ui5-webcomponents/commit/a33dd95)), closes [#1846](https://github.com/SAP/ui5-webcomponents/issues/1846)
* **ui5-input:** Suggestions can now be arbitrary list items ([#1969](https://github.com/SAP/ui5-webcomponents/issues/1969)) ([aa6fde4](https://github.com/SAP/ui5-webcomponents/commit/aa6fde4))
* **ui5-input:** Sync width of suggestions popover and input ([#1979](https://github.com/SAP/ui5-webcomponents/issues/1979)) ([dd4633e](https://github.com/SAP/ui5-webcomponents/commit/dd4633e))
* **ui5-link:** Fix "click twice" issue in Safari ([#1799](https://github.com/SAP/ui5-webcomponents/issues/1799)) ([#1800](https://github.com/SAP/ui5-webcomponents/issues/1800)) ([0f69b84](https://github.com/SAP/ui5-webcomponents/commit/0f69b84)), closes [#1796](https://github.com/SAP/ui5-webcomponents/issues/1796)
* **ui5-panel:** The expand/collapse button is not in the DOM when fixed ([#1793](https://github.com/SAP/ui5-webcomponents/issues/1793)) ([0b1dc52](https://github.com/SAP/ui5-webcomponents/commit/0b1dc52))
* **ui5-segmentedbutton:** Buttons no longer shrink on click ([#2028](https://github.com/SAP/ui5-webcomponents/issues/2028)) ([7951adc](https://github.com/SAP/ui5-webcomponents/commit/7951adc))
* **ui5-select:** Selection now changes instantly ([#2031](https://github.com/SAP/ui5-webcomponents/issues/2031)) ([88ceb83](https://github.com/SAP/ui5-webcomponents/commit/88ceb83))
* **ui5-list:** No longer show a dot on IE ([#2011](https://github.com/SAP/ui5-webcomponents/issues/2011)) ([77cabba](https://github.com/SAP/ui5-webcomponents/commit/77cabba))
* **ui5-li-tree:** Fix aria-expanded value ([#1894](https://github.com/SAP/ui5-webcomponents/issues/1894)) ([06e5aa1](https://github.com/SAP/ui5-webcomponents/commit/06e5aa1)), closes [#1892](https://github.com/SAP/ui5-webcomponents/issues/1892)
* **ui5-sebmentedbutton:** Fix intermittent js error ([#1874](https://github.com/SAP/ui5-webcomponents/issues/1874)) ([c44d9aa](https://github.com/SAP/ui5-webcomponents/commit/c44d9aa))
* **ui5-select:** improve keyboard handling ([#1771](https://github.com/SAP/ui5-webcomponents/issues/1771)) ([f555180](https://github.com/SAP/ui5-webcomponents/commit/f555180))
* **ui5-tabcontainer:** The aria-controls now points to an existing ID ([#1817](https://github.com/SAP/ui5-webcomponents/issues/1817)) ([4bd3604](https://github.com/SAP/ui5-webcomponents/commit/4bd3604))
* **ui5-tabcontainer:** Correct selected text color used for sap_belize ([#1876](https://github.com/SAP/ui5-webcomponents/issues/1876)) ([09577b9](https://github.com/SAP/ui5-webcomponents/commit/09577b9))
* **ui5-tabcontainer:** Fix accessibility of overflow button ([#1978](https://github.com/SAP/ui5-webcomponents/issues/1978)) ([a7488cd](https://github.com/SAP/ui5-webcomponents/commit/a7488cd))
* **ui5-tabcontainer:** Fix box-shadow ([#1829](https://github.com/SAP/ui5-webcomponents/issues/1829)) ([42998c7](https://github.com/SAP/ui5-webcomponents/commit/42998c7))
* **ui5-tabcontainer:** Fix id duplication ([#1789](https://github.com/SAP/ui5-webcomponents/issues/1789)) ([511cb40](https://github.com/SAP/ui5-webcomponents/commit/511cb40))
* **ui5-tabcontainer:** Fix overflow visibility ([#1993](https://github.com/SAP/ui5-webcomponents/issues/1993)) ([d6c2cbc](https://github.com/SAP/ui5-webcomponents/commit/d6c2cbc))
* **ui5-tabcontainer:** Prevent the tabcontainer from setting the selected property on ui5-tab internally ([#1974](https://github.com/SAP/ui5-webcomponents/issues/1974)) ([0e8b5ea](https://github.com/SAP/ui5-webcomponents/commit/0e8b5ea))
* **ui5-textarea:** Add missing dependency, extract .hbs partial ([#1909](https://github.com/SAP/ui5-webcomponents/issues/1909)) ([25ed25f](https://github.com/SAP/ui5-webcomponents/commit/25ed25f))
* **ui5-togglebutton:** Align vertically icons in IE ([#1824](https://github.com/SAP/ui5-webcomponents/issues/1824)) ([2d5e84b](https://github.com/SAP/ui5-webcomponents/commit/2d5e84b))
* **ui5-datepicker:** Fix value state when min/max  set ([#1742](https://github.com/SAP/ui5-webcomponents/issues/1742)) ([681de1f](https://github.com/SAP/ui5-webcomponents/commit/681de1f)), closes [#1740](https://github.com/SAP/ui5-webcomponents/issues/1740)
* **ui5-datetime-picker:** Set min width ([#1698](https://github.com/SAP/ui5-webcomponents/issues/1698)) ([7313838](https://github.com/SAP/ui5-webcomponents/commit/7313838))
* **ui5-dialog:** Position block layer fixed ([#1757](https://github.com/SAP/ui5-webcomponents/issues/1757)) ([377075a](https://github.com/SAP/ui5-webcomponents/commit/377075a))
* **ui5-dialog:** Restrict max height and width based on spec ([#1665](https://github.com/SAP/ui5-webcomponents/issues/1665)) ([a00225c](https://github.com/SAP/ui5-webcomponents/commit/a00225c))
* **ui5-dialog:** Unblock body scrolling when dialog is removed from DOM ([#1756](https://github.com/SAP/ui5-webcomponents/issues/1756)) ([6742295](https://github.com/SAP/ui5-webcomponents/commit/6742295))
* **ui5-duration-picker:** Make maxValue work with values greater than 23:59:59 ([#1666](https://github.com/SAP/ui5-webcomponents/issues/1666)) ([da30bc1](https://github.com/SAP/ui5-webcomponents/commit/da30bc1))
* **ui5-file-uploader:** Setting the value to an empty string also resets the file input ([#1715](https://github.com/SAP/ui5-webcomponents/issues/1715)) ([f8b1b39](https://github.com/SAP/ui5-webcomponents/commit/f8b1b39))
* **ui5-icon:** Icon now has a correct role ([#1652](https://github.com/SAP/ui5-webcomponents/issues/1652)) ([d9933bd](https://github.com/SAP/ui5-webcomponents/commit/d9933bd))
* **ui5-input:** Announce selected item ([#1578](https://github.com/SAP/ui5-webcomponents/issues/1578)) ([b28f7c4](https://github.com/SAP/ui5-webcomponents/commit/b28f7c4))
* **ui5-label:** Fix width for italic labels ([#1625](https://github.com/SAP/ui5-webcomponents/issues/1625)) ([14a48d1](https://github.com/SAP/ui5-webcomponents/commit/14a48d1))
* **ui5-li:** Do not announce active list item type ([#1575](https://github.com/SAP/ui5-webcomponents/issues/1575)) ([ec14719](https://github.com/SAP/ui5-webcomponents/commit/ec14719))
* **ui5-list:** Fire itemClick after the selection ([#1618](https://github.com/SAP/ui5-webcomponents/issues/1618)) ([28326c5](https://github.com/SAP/ui5-webcomponents/commit/28326c5))
* **ui5-messagestrip:** Add RTL support ([#1741](https://github.com/SAP/ui5-webcomponents/issues/1741)) ([6172005](https://github.com/SAP/ui5-webcomponents/commit/6172005)), closes [#1739](https://github.com/SAP/ui5-webcomponents/issues/1739)
* **ui5-popover:** Close popup when no opener ([#1630](https://github.com/SAP/ui5-webcomponents/issues/1630)) ([bd46d7b](https://github.com/SAP/ui5-webcomponents/commit/bd46d7b))
* **ui5-popover:** Ensure offset from window borders ([#1690](https://github.com/SAP/ui5-webcomponents/issues/1690)) ([b673a0c](https://github.com/SAP/ui5-webcomponents/commit/b673a0c))
* **ui5-popover:** Fix closing order of popovers ([#1676](https://github.com/SAP/ui5-webcomponents/issues/1676)) ([14add07](https://github.com/SAP/ui5-webcomponents/commit/14add07))
* **ui5-segmentedbutton:** Add RTL support ([#1734](https://github.com/SAP/ui5-webcomponents/issues/1734)) ([1c6a9bb](https://github.com/SAP/ui5-webcomponents/commit/1c6a9bb))
* **ui5-segmentedbutton:** Fix measuring when parent is not displayed ([#1657](https://github.com/SAP/ui5-webcomponents/issues/1657)) ([d00b0be](https://github.com/SAP/ui5-webcomponents/commit/d00b0be))
* **ui5-segmentedbutton:** Fix rendering in ie ([#1622](https://github.com/SAP/ui5-webcomponents/issues/1622)) ([396993e](https://github.com/SAP/ui5-webcomponents/commit/396993e))
* **ui5-select:** Fix use of ESC leads to wrong selection ([#1724](https://github.com/SAP/ui5-webcomponents/issues/1724)) ([095d6dc](https://github.com/SAP/ui5-webcomponents/commit/095d6dc))
* **ui5-shellbar:** Fix search field focus handling ([#1636](https://github.com/SAP/ui5-webcomponents/issues/1636)) ([c65010b](https://github.com/SAP/ui5-webcomponents/commit/c65010b))
* **ui5-table:** Fire rowClick for popped in cells as well ([#1671](https://github.com/SAP/ui5-webcomponents/issues/1671)) ([c48f541](https://github.com/SAP/ui5-webcomponents/commit/c48f541))
* **ui5-table-cell:** Fix popin of long texts ([#1648](https://github.com/SAP/ui5-webcomponents/issues/1648)) ([61ce284](https://github.com/SAP/ui5-webcomponents/commit/61ce284))
* **ui5-table-column:** Fix sticky column overlaps dialogs ([#1609](https://github.com/SAP/ui5-webcomponents/issues/1609)) ([c80130d](https://github.com/SAP/ui5-webcomponents/commit/c80130d)), closes [#1602](https://github.com/SAP/ui5-webcomponents/issues/1602)
* **ui5-table-row:** Do not show the colon when there is no popin text ([#1620](https://github.com/SAP/ui5-webcomponents/issues/1620)) ([2785daf](https://github.com/SAP/ui5-webcomponents/commit/2785daf))
* **ui5-textarea:** Fix text vertical alignment ([#1668](https://github.com/SAP/ui5-webcomponents/issues/1668)) ([6790647](https://github.com/SAP/ui5-webcomponents/commit/6790647))
* **ui5-timepicker:** Adjust hours in 12hours format only ([#1752](https://github.com/SAP/ui5-webcomponents/issues/1752)) ([df0add4](https://github.com/SAP/ui5-webcomponents/commit/df0add4)), closes [#1714](https://github.com/SAP/ui5-webcomponents/issues/1714)
* **ui5-timepicker:** Fix firing "change" event for the same value ([#1764](https://github.com/SAP/ui5-webcomponents/issues/1764)) ([3a0c7d5](https://github.com/SAP/ui5-webcomponents/commit/3a0c7d5))
* **ui5-timepicker, ui5-duration-picker:**  enable  width customization ([#1669](https://github.com/SAP/ui5-webcomponents/issues/1669)) ([9cfcbbf](https://github.com/SAP/ui5-webcomponents/commit/9cfcbbf))


### Features

* **ui5-card:** add 'action' slot ([#1915](https://github.com/SAP/ui5-webcomponents/issues/1915)) ([97c299d](https://github.com/SAP/ui5-webcomponents/commit/97c299d))
* **ui5-carousel:** Introduce loadMore event ([#1667](https://github.com/SAP/ui5-webcomponents/issues/1667)) ([e7af480](https://github.com/SAP/ui5-webcomponents/commit/e7af480))
* **ui5-datepicker:** Add property to hide week numbers ([#1955](https://github.com/SAP/ui5-webcomponents/issues/1955)) ([d11c973](https://github.com/SAP/ui5-webcomponents/commit/d11c973)), closes [#1949](https://github.com/SAP/ui5-webcomponents/issues/1949)
* **ui5-datepicker:** Implement keyboard handling ([#1706](https://github.com/SAP/ui5-webcomponents/issues/1706)) ([15e915f](https://github.com/SAP/ui5-webcomponents/commit/15e915f))
* **ui5-datepicker:** Implement valuestatemessage slot ([#1476](https://github.com/SAP/ui5-webcomponents/issues/1476)) ([82b3d41](https://github.com/SAP/ui5-webcomponents/commit/82b3d41))
* **ui5-datepicker:** Set value attribute through date object ([#1624](https://github.com/SAP/ui5-webcomponents/issues/1624)) ([4d7586d](https://github.com/SAP/ui5-webcomponents/commit/4d7586d))
* **ui5-daterange-picker:** Initial implementation ([#1785](https://github.com/SAP/ui5-webcomponents/issues/1785)) ([4c11286](https://github.com/SAP/ui5-webcomponents/commit/4c11286))
* **ui5-duration-picker:** Implement hide-hours & hide-minutes propererties ([#1604](https://github.com/SAP/ui5-webcomponents/issues/1604)) ([0af9b00](https://github.com/SAP/ui5-webcomponents/commit/0af9b00))
* **ui5-duration-picker:** Implement seconds-step & minutes-step properties ([#1603](https://github.com/SAP/ui5-webcomponents/issues/1603)) ([37ee069](https://github.com/SAP/ui5-webcomponents/commit/37ee069))
* **ui5-fileuploader:** Implement accessiblity specification ([#1585](https://github.com/SAP/ui5-webcomponents/issues/1585)) ([76943bc](https://github.com/SAP/ui5-webcomponents/commit/76943bc))
* **ui5-icon:** Introduce interactive property ([#1592](https://github.com/SAP/ui5-webcomponents/issues/1592)) ([b898cd3](https://github.com/SAP/ui5-webcomponents/commit/b898cd3))
* **ui5-input:** Add highlighting ([#1943](https://github.com/SAP/ui5-webcomponents/issues/1943)) ([673ed8d](https://github.com/SAP/ui5-webcomponents/commit/673ed8d))
* **ui5-input:** Add suggestion-item-preview event ([#1778](https://github.com/SAP/ui5-webcomponents/issues/1778)) ([e7f380e](https://github.com/SAP/ui5-webcomponents/commit/e7f380e)), closes [#1768](https://github.com/SAP/ui5-webcomponents/issues/1768)
* **ui5-input:** Add suggestion-scroll event ([#1856](https://github.com/SAP/ui5-webcomponents/issues/1856)) ([1d20ba8](https://github.com/SAP/ui5-webcomponents/commit/1d20ba8)), closes [#1846](https://github.com/SAP/ui5-webcomponents/issues/1846)
* **ui5-input:** Announce suggestions count ([#1975](https://github.com/SAP/ui5-webcomponents/issues/1975)) ([a7d216c](https://github.com/SAP/ui5-webcomponents/commit/a7d216c))
* **ui5-input:** Implement aria-label ([#1782](https://github.com/SAP/ui5-webcomponents/issues/1782)) ([a588ffe](https://github.com/SAP/ui5-webcomponents/commit/a588ffe))
* **ui5-input:** Support 'inactive' suggestions ([#1921](https://github.com/SAP/ui5-webcomponents/issues/1921)) ([eca3bd6](https://github.com/SAP/ui5-webcomponents/commit/eca3bd6)), closes [#1919](https://github.com/SAP/ui5-webcomponents/issues/1919)
* **ui5-input:** Support ariaLabelledBy ([#1873](https://github.com/SAP/ui5-webcomponents/issues/1873)) ([2356cd0](https://github.com/SAP/ui5-webcomponents/commit/2356cd0))
* **ui5-li:** Support 'Information' infoState ([#1997](https://github.com/SAP/ui5-webcomponents/issues/1997)) ([401b499](https://github.com/SAP/ui5-webcomponents/commit/401b499))
* **ui5-list:** Support aria-label and aria-labelledby ([#1899](https://github.com/SAP/ui5-webcomponents/issues/1899)) ([cacf5d8](https://github.com/SAP/ui5-webcomponents/commit/cacf5d8)), closes [#1886](https://github.com/SAP/ui5-webcomponents/issues/1886)
* **ui5-multicombobox:** Implement latest accessibility spec ([#1564](https://github.com/SAP/ui5-webcomponents/issues/1564)) ([b0917d5](https://github.com/SAP/ui5-webcomponents/commit/b0917d5))
* **ui5-panel:** Support aria-label and aria-labelledby ([#1910](https://github.com/SAP/ui5-webcomponents/issues/1910)) ([8cb7c48](https://github.com/SAP/ui5-webcomponents/commit/8cb7c48))
* **ui5-popup:** Add support for aria-label ([#1898](https://github.com/SAP/ui5-webcomponents/issues/1898)) ([69d8ee4](https://github.com/SAP/ui5-webcomponents/commit/69d8ee4))
* **ui5-progress-indicator:** Initial implementation ([#1887](https://github.com/SAP/ui5-webcomponents/issues/1887)) ([e8009c9](https://github.com/SAP/ui5-webcomponents/commit/e8009c9)), closes [#1392](https://github.com/SAP/ui5-webcomponents/issues/1392)
* **ui5-popover:** Prevent closing when no opener ([#1911](https://github.com/SAP/ui5-webcomponents/issues/1911)) ([e7c2518](https://github.com/SAP/ui5-webcomponents/commit/e7c2518)), closes [#1768](https://github.com/SAP/ui5-webcomponents/issues/1768)
* **ui5-popup:** Custom popups work with focusable elements in the shadow root ([#1844](https://github.com/SAP/ui5-webcomponents/issues/1844)) ([a109558](https://github.com/SAP/ui5-webcomponents/commit/a109558))
* **ui5-rating-indicator:** Initial implementation ([#1729](https://github.com/SAP/ui5-webcomponents/issues/1729)) ([a28f201](https://github.com/SAP/ui5-webcomponents/commit/a28f201))
* **ui5-select:** Implement angular two way data binding ([#1583](https://github.com/SAP/ui5-webcomponents/issues/1583)) ([f1f3d4f](https://github.com/SAP/ui5-webcomponents/commit/f1f3d4f))
* **ui5-suggestion-item:** Enable mouseover|out events ([#1784](https://github.com/SAP/ui5-webcomponents/issues/1784)) ([4359b9a](https://github.com/SAP/ui5-webcomponents/commit/4359b9a))
* **ui5-tabcontainer:** Add expand/collapse animation ([#1617](https://github.com/SAP/ui5-webcomponents/issues/1617)) ([0c32950](https://github.com/SAP/ui5-webcomponents/commit/0c32950)), closes [#1540](https://github.com/SAP/ui5-webcomponents/issues/1540)
* **ui5-table:** Allow for custom styling ([#1627](https://github.com/SAP/ui5-webcomponents/issues/1627)) ([232e7f5](https://github.com/SAP/ui5-webcomponents/commit/232e7f5))
* **ui5-timepicker:** Implement valuestatemessage slot ([#1482](https://github.com/SAP/ui5-webcomponents/issues/1482)) ([b1d30f3](https://github.com/SAP/ui5-webcomponents/commit/b1d30f3))
* **ui5-tree:** Introduce new component ([#1580](https://github.com/SAP/ui5-webcomponents/issues/1580)) ([2dd97cf](https://github.com/SAP/ui5-webcomponents/commit/2dd97cf))





# [1.0.0-rc.7](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2020-04-30)


### Bug Fixes

* **ui5-busyindicator:** fix component placement and appearance in IE ([#1505](https://github.com/SAP/ui5-webcomponents/issues/1505)) ([0e57d78](https://github.com/SAP/ui5-webcomponents/commit/0e57d78))
* **ui5-button:** make aria-label work for ui5-button ([#1445](https://github.com/SAP/ui5-webcomponents/issues/1445)) ([f0f8964](https://github.com/SAP/ui5-webcomponents/commit/f0f8964))
* **ui5-button:** make aria-labelledby work with numeric id ([#1500](https://github.com/SAP/ui5-webcomponents/issues/1500)) ([ac6e8d2](https://github.com/SAP/ui5-webcomponents/commit/ac6e8d2))
* **ui5-carousel:** Content now shrinks properly ([#1402](https://github.com/SAP/ui5-webcomponents/issues/1402)) ([0e26906](https://github.com/SAP/ui5-webcomponents/commit/0e26906))
* **ui5-carousel:** hide arrows and dots when single page ([#1414](https://github.com/SAP/ui5-webcomponents/issues/1414)) ([f6c46be](https://github.com/SAP/ui5-webcomponents/commit/f6c46be))
* **ui5-combobox:** translate accessibleName ([#1563](https://github.com/SAP/ui5-webcomponents/issues/1563)) ([6cd3da8](https://github.com/SAP/ui5-webcomponents/commit/6cd3da8))
* **ui5-datepicker:** fix the value validation ([#1465](https://github.com/SAP/ui5-webcomponents/issues/1465)) ([14fe357](https://github.com/SAP/ui5-webcomponents/commit/14fe357))
* **ui5-datetime-picker:** fix AM/PM selection ([#1551](https://github.com/SAP/ui5-webcomponents/issues/1551)) ([af9ff8a](https://github.com/SAP/ui5-webcomponents/commit/af9ff8a)), closes [#1530](https://github.com/SAP/ui5-webcomponents/issues/1530)
* **ui5-dialog:** improve accessibility ([#1477](https://github.com/SAP/ui5-webcomponents/issues/1477)) ([38ffd25](https://github.com/SAP/ui5-webcomponents/commit/38ffd25))
* **ui5-groupheade-li:** fix focus handling ([#1544](https://github.com/SAP/ui5-webcomponents/issues/1544)) ([b0f180d](https://github.com/SAP/ui5-webcomponents/commit/b0f180d))
* **ui5-information:** fix component visual ([#1498](https://github.com/SAP/ui5-webcomponents/issues/1498)) ([746f907](https://github.com/SAP/ui5-webcomponents/commit/746f907))
* **ui5-multi-combobox:** fix initial focus on mobile ([#1508](https://github.com/SAP/ui5-webcomponents/issues/1508)) ([77e6ab6](https://github.com/SAP/ui5-webcomponents/commit/77e6ab6))
* **ui5-popover:** allow opening if opener is not fully visible ([#1448](https://github.com/SAP/ui5-webcomponents/issues/1448)) ([a10fde5](https://github.com/SAP/ui5-webcomponents/commit/a10fde5))
* **ui5-popover:** set fallback placement when no place to popup ([#1467](https://github.com/SAP/ui5-webcomponents/issues/1467)) ([cfeed00](https://github.com/SAP/ui5-webcomponents/commit/cfeed00))
* **ui5-popover:** show arrow border ([#1528](https://github.com/SAP/ui5-webcomponents/issues/1528)) ([56e5ba7](https://github.com/SAP/ui5-webcomponents/commit/56e5ba7))
* **ui5-responsive-popover:** add minimum sizes ([#1539](https://github.com/SAP/ui5-webcomponents/issues/1539)) ([c4ae309](https://github.com/SAP/ui5-webcomponents/commit/c4ae309))
* **ui5-responsive-popover:** implement default close button ([#1501](https://github.com/SAP/ui5-webcomponents/issues/1501)) ([c6868af](https://github.com/SAP/ui5-webcomponents/commit/c6868af))
* **ui5-segmentedbutton:** button can no longer be clicked when disabled ([#1393](https://github.com/SAP/ui5-webcomponents/issues/1393)) ([576d769](https://github.com/SAP/ui5-webcomponents/commit/576d769))
* **ui5-segmentedbutton:** import ui5-togglebutton by default ([#1549](https://github.com/SAP/ui5-webcomponents/issues/1549)) ([bccf03b](https://github.com/SAP/ui5-webcomponents/commit/bccf03b))
* **ui5-select:** prevent scrolling on Space ([#1418](https://github.com/SAP/ui5-webcomponents/issues/1418)) ([fb500fc](https://github.com/SAP/ui5-webcomponents/commit/fb500fc))
* **ui5-tabcontainer:** clicking a tab now always works ([#1567](https://github.com/SAP/ui5-webcomponents/issues/1567)) ([dc60609](https://github.com/SAP/ui5-webcomponents/commit/dc60609))
* **ui5-textarea:** stop showing valueStateMsg in value-state="None" ([#1568](https://github.com/SAP/ui5-webcomponents/issues/1568)) ([832c34e](https://github.com/SAP/ui5-webcomponents/commit/832c34e))
* **ui5-timepicker:** fix AM/PM selection ([#1569](https://github.com/SAP/ui5-webcomponents/issues/1569)) ([ad923a2](https://github.com/SAP/ui5-webcomponents/commit/ad923a2))
* **ui5-timepicker:** periods apply fix ([#1502](https://github.com/SAP/ui5-webcomponents/issues/1502)) ([b0195b7](https://github.com/SAP/ui5-webcomponents/commit/b0195b7))
* **ui5-timepicker:** prevent setting valueState="Error" on empty value ([5a3d1b1](https://github.com/SAP/ui5-webcomponents/commit/5a3d1b1))


### Features

* **ui5-avatar:** implement accessibility spec ([#1484](https://github.com/SAP/ui5-webcomponents/issues/1484)) ([501740e](https://github.com/SAP/ui5-webcomponents/commit/501740e))
* **ui5-busyindicator:** implement text property ([#1506](https://github.com/SAP/ui5-webcomponents/issues/1506)) ([4118c68](https://github.com/SAP/ui5-webcomponents/commit/4118c68))
* **ui5-button:** support aria-labelledby attribute([#1446](https://github.com/SAP/ui5-webcomponents/issues/1446)) ([e54111f](https://github.com/SAP/ui5-webcomponents/commit/e54111f))
* **ui5-carousel:** add navigate event ([#1454](https://github.com/SAP/ui5-webcomponents/issues/1454)) ([c55bcdc](https://github.com/SAP/ui5-webcomponents/commit/c55bcdc))
* **ui5-carousel:** Allow different number of items per page based on component width ([#1434](https://github.com/SAP/ui5-webcomponents/issues/1434)) ([dec0d4d](https://github.com/SAP/ui5-webcomponents/commit/dec0d4d))
* **ui5-combobox:** implement accessibility spec ([#1560](https://github.com/SAP/ui5-webcomponents/issues/1560)) ([3d56b4d](https://github.com/SAP/ui5-webcomponents/commit/3d56b4d))
* **ui5-datetime-picker:** introduce new component ([#1437](https://github.com/SAP/ui5-webcomponents/issues/1437)) ([ef27ca1](https://github.com/SAP/ui5-webcomponents/commit/ef27ca1))
* **ui5-duration-picker:** initial implementation ([#1415](https://github.com/SAP/ui5-webcomponents/issues/1415)) ([e38392e](https://github.com/SAP/ui5-webcomponents/commit/e38392e))
* **ui5-input:** implement valueStateMessage with suggestions ([#1390](https://github.com/SAP/ui5-webcomponents/issues/1390)) ([39068b3](https://github.com/SAP/ui5-webcomponents/commit/39068b3))
* **ui5-list:** implement accessibility spec ([#1461](https://github.com/SAP/ui5-webcomponents/issues/1461)) ([348bde9](https://github.com/SAP/ui5-webcomponents/commit/348bde9))
* **ui5-panel:** enable configuring the heading level ([#1504](https://github.com/SAP/ui5-webcomponents/issues/1504)) ([710053b](https://github.com/SAP/ui5-webcomponents/commit/710053b))
* **ui5-segmentedbutton:** implement accessibility spec ([#1475](https://github.com/SAP/ui5-webcomponents/issues/1475)) ([ae7b395](https://github.com/SAP/ui5-webcomponents/commit/ae7b395))
* **ui5-select:** implement accessibility spec ([#1485](https://github.com/SAP/ui5-webcomponents/issues/1485)) ([ede3635](https://github.com/SAP/ui5-webcomponents/commit/ede3635))
* **ui5-tabcontainer:** content can be displayed above the tab strip ([#1516](https://github.com/SAP/ui5-webcomponents/issues/1516)) ([fb38b2c](https://github.com/SAP/ui5-webcomponents/commit/fb38b2c))
* **ui5-textarea:** add "valueState" property ([#1411](https://github.com/SAP/ui5-webcomponents/issues/1411)) ([6710038](https://github.com/SAP/ui5-webcomponents/commit/6710038))
* **ui5-textarea:** add "valueStateMessage" slot ([#1419](https://github.com/SAP/ui5-webcomponents/issues/1419)) ([d323d51](https://github.com/SAP/ui5-webcomponents/commit/d323d51))
* **ui5-timeline:** implement acc spec ([#1471](https://github.com/SAP/ui5-webcomponents/issues/1471)) ([27435ee](https://github.com/SAP/ui5-webcomponents/commit/27435ee))
* **ui5-wheelslider:** add cyclic behaviour ([#1408](https://github.com/SAP/ui5-webcomponents/issues/1408)) ([ac97824](https://github.com/SAP/ui5-webcomponents/commit/ac97824))
* **ui5-wheelslider:** swipe feature implementation ([#1470](https://github.com/SAP/ui5-webcomponents/issues/1470)) ([3665193](https://github.com/SAP/ui5-webcomponents/commit/3665193))





# [1.0.0-rc.6](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2020-03-27)


### Bug Fixes

* **docs:** display the ui5-popover API correctly ([#1064](https://github.com/SAP/ui5-webcomponents/issues/1064)) ([e1b5649](https://github.com/SAP/ui5-webcomponents/commit/e1b5649))
* **main:** add missing icons ([#1319](https://github.com/SAP/ui5-webcomponents/issues/1319)) ([6bebdb5](https://github.com/SAP/ui5-webcomponents/commit/6bebdb5))
* **ui5-avatar:** make styles attribute dependant ([#1360](https://github.com/SAP/ui5-webcomponents/issues/1360)) ([e2791b0](https://github.com/SAP/ui5-webcomponents/commit/e2791b0))
* **ui5-avatar:** remove background color when there is no image ([#1148](https://github.com/SAP/ui5-webcomponents/issues/1148)) ([2bd2204](https://github.com/SAP/ui5-webcomponents/commit/2bd2204))
* **ui5-busyindicator:** adjust stylings to latest spec ([#1344](https://github.com/SAP/ui5-webcomponents/issues/1344)) ([0af6c3d](https://github.com/SAP/ui5-webcomponents/commit/0af6c3d))
* **ui5-busyindicator:** display as size=Large by default ([#1315](https://github.com/SAP/ui5-webcomponents/issues/1315)) ([743f0b3](https://github.com/SAP/ui5-webcomponents/commit/743f0b3))
* **ui5-busyindicator:** improve stylings ([#1350](https://github.com/SAP/ui5-webcomponents/issues/1350)) ([c3dd3f4](https://github.com/SAP/ui5-webcomponents/commit/c3dd3f4))
* **ui5-button:** fix icon shrinking ([#1258](https://github.com/SAP/ui5-webcomponents/issues/1258)) ([be943ba](https://github.com/SAP/ui5-webcomponents/commit/be943ba))
* **ui5-calendar-header:** fix width in ie ([#1205](https://github.com/SAP/ui5-webcomponents/issues/1205)) ([2d21ae0](https://github.com/SAP/ui5-webcomponents/commit/2d21ae0))
* **ui5-card:** fix width ([#1165](https://github.com/SAP/ui5-webcomponents/issues/1165)) ([e463d23](https://github.com/SAP/ui5-webcomponents/commit/e463d23))
* **ui5-card:** update ACC support ([#1042](https://github.com/SAP/ui5-webcomponents/issues/1042)) ([3253555](https://github.com/SAP/ui5-webcomponents/commit/3253555))
* **ui5-carousel:** add missing icon imports ([#1365](https://github.com/SAP/ui5-webcomponents/issues/1365)) ([d6bb698](https://github.com/SAP/ui5-webcomponents/commit/d6bb698))
* **ui5-carousel:** add missing import ([#1321](https://github.com/SAP/ui5-webcomponents/issues/1321)) ([19445d1](https://github.com/SAP/ui5-webcomponents/commit/19445d1))
* **ui5-checkbox:** fix wrapping of a long word ([#1007](https://github.com/SAP/ui5-webcomponents/issues/1007)) ([2117ecc](https://github.com/SAP/ui5-webcomponents/commit/2117ecc))
* **ui5-combobox:** component improvements ([#1141](https://github.com/SAP/ui5-webcomponents/issues/1141)) ([e211227](https://github.com/SAP/ui5-webcomponents/commit/e211227))
* **ui5-datepicker:** fix hoverbg-color when readonly ([#1361](https://github.com/SAP/ui5-webcomponents/issues/1361)) ([1696cba](https://github.com/SAP/ui5-webcomponents/commit/1696cba))
* **ui5-daypicker:** show correct today ([#1157](https://github.com/SAP/ui5-webcomponents/issues/1157)) ([6fb1dd6](https://github.com/SAP/ui5-webcomponents/commit/6fb1dd6))
* **ui5-dialog:** dialog focus trapping works again ([#1213](https://github.com/SAP/ui5-webcomponents/issues/1213)) ([e899708](https://github.com/SAP/ui5-webcomponents/commit/e899708))
* **ui5-dialog:** provide min-width on desktop ([#1257](https://github.com/SAP/ui5-webcomponents/issues/1257)) ([05b208d](https://github.com/SAP/ui5-webcomponents/commit/05b208d))
* **ui5-dialog:** stretch content area of dialog [#920](https://github.com/SAP/ui5-webcomponents/issues/920) ([#1167](https://github.com/SAP/ui5-webcomponents/issues/1167)) ([894d457](https://github.com/SAP/ui5-webcomponents/commit/894d457))
* **ui5-icon:** remove promise rejection ([#1299](https://github.com/SAP/ui5-webcomponents/issues/1299)) ([902db58](https://github.com/SAP/ui5-webcomponents/commit/902db58))
* **ui5-icon:** remove unneccessary aria-label attribute ([#1284](https://github.com/SAP/ui5-webcomponents/issues/1284)) ([9f2e756](https://github.com/SAP/ui5-webcomponents/commit/9f2e756))
* **ui5-input:** border-color on hover ([#1154](https://github.com/SAP/ui5-webcomponents/issues/1154)) ([9393b50](https://github.com/SAP/ui5-webcomponents/commit/9393b50))
* **ui5-input:** fix exceptions thrown when KH used ([#1301](https://github.com/SAP/ui5-webcomponents/issues/1301)) ([85f01d7](https://github.com/SAP/ui5-webcomponents/commit/85f01d7))
* **ui5-input:** fix javascript error on mobile ([#1339](https://github.com/SAP/ui5-webcomponents/issues/1339)) ([c0ffbac](https://github.com/SAP/ui5-webcomponents/commit/c0ffbac))
* **ui5-label:** fix truncation when show-colon is set ([#1079](https://github.com/SAP/ui5-webcomponents/issues/1079)) ([9e84314](https://github.com/SAP/ui5-webcomponents/commit/9e84314))
* **ui5-li:** correct focus color when active ([#1143](https://github.com/SAP/ui5-webcomponents/issues/1143)) ([7c4ee77](https://github.com/SAP/ui5-webcomponents/commit/7c4ee77))
* **ui5-li:** fix active state on mobile ([#1169](https://github.com/SAP/ui5-webcomponents/issues/1169)) ([90223f8](https://github.com/SAP/ui5-webcomponents/commit/90223f8))
* **ui5-li:** prevent checkbox shrinking ([#1142](https://github.com/SAP/ui5-webcomponents/issues/1142)) ([964dbc2](https://github.com/SAP/ui5-webcomponents/commit/964dbc2))
* **ui5-link:** fix JS error when href is undefined ([#1373](https://github.com/SAP/ui5-webcomponents/issues/1373)) ([a7cf983](https://github.com/SAP/ui5-webcomponents/commit/a7cf983))
* **ui5-mcb:** open correct popover from show more text ([#1371](https://github.com/SAP/ui5-webcomponents/issues/1371)) ([68cb73d](https://github.com/SAP/ui5-webcomponents/commit/68cb73d))
* **ui5-multi-cbx:** remove horizontal scrollbar ([#1312](https://github.com/SAP/ui5-webcomponents/issues/1312)) ([05175c4](https://github.com/SAP/ui5-webcomponents/commit/05175c4))
* **ui5-popover:** add header and footer to focus trapping ([#1298](https://github.com/SAP/ui5-webcomponents/issues/1298)) ([0e0344c](https://github.com/SAP/ui5-webcomponents/commit/0e0344c))
* **ui5-popover:** z-index is now consistent with dialogs ([#1209](https://github.com/SAP/ui5-webcomponents/issues/1209)) ([5f8ce93](https://github.com/SAP/ui5-webcomponents/commit/5f8ce93))
* **ui5-responsive-popover:** set z-index on phone ([#1303](https://github.com/SAP/ui5-webcomponents/issues/1303)) ([a38b605](https://github.com/SAP/ui5-webcomponents/commit/a38b605))
* **ui5-segmentedbutton:** size adjustments ([#1225](https://github.com/SAP/ui5-webcomponents/issues/1225)) ([1a8f8b0](https://github.com/SAP/ui5-webcomponents/commit/1a8f8b0))
* **ui5-select:** fix component baseline alignment ([#1075](https://github.com/SAP/ui5-webcomponents/issues/1075)) ([37b7891](https://github.com/SAP/ui5-webcomponents/commit/37b7891))
* **ui5-select:** prevent selection from cycling ([#1066](https://github.com/SAP/ui5-webcomponents/issues/1066)) ([d46be1f](https://github.com/SAP/ui5-webcomponents/commit/d46be1f))
* **ui5-tabcontainer:** apply overflow items styles ([#1178](https://github.com/SAP/ui5-webcomponents/issues/1178)) ([63ca721](https://github.com/SAP/ui5-webcomponents/commit/63ca721))
* **ui5-tabcontainer:** fix sizes on compact ([#1364](https://github.com/SAP/ui5-webcomponents/issues/1364)) ([6a4738e](https://github.com/SAP/ui5-webcomponents/commit/6a4738e))
* **ui5-tabcontainer:** fix tab content overflow and height calculation ([#1056](https://github.com/SAP/ui5-webcomponents/issues/1056)) ([6b65fa4](https://github.com/SAP/ui5-webcomponents/commit/6b65fa4))
* **ui5-table:** optimize non popin table rendering ([#1229](https://github.com/SAP/ui5-webcomponents/issues/1229)) ([872dcad](https://github.com/SAP/ui5-webcomponents/commit/872dcad))
* **ui5-table-row:** fix 1st and "nodata" rows visual ([#1156](https://github.com/SAP/ui5-webcomponents/issues/1156)) ([991e546](https://github.com/SAP/ui5-webcomponents/commit/991e546))
* **ui5-textarea:** apply border and bg-color to native textarea ([#1250](https://github.com/SAP/ui5-webcomponents/issues/1250)) ([a804e30](https://github.com/SAP/ui5-webcomponents/commit/a804e30))
* **ui5-textarea:** fix bg-color in IE ([#1210](https://github.com/SAP/ui5-webcomponents/issues/1210)) ([c047da7](https://github.com/SAP/ui5-webcomponents/commit/c047da7))
* **ui5-timepicker:** fix JS Error, improve user XP and sample ([#1362](https://github.com/SAP/ui5-webcomponents/issues/1362)) ([f02477b](https://github.com/SAP/ui5-webcomponents/commit/f02477b))
* **ui5-toast:** infinite loop prevented ([#1320](https://github.com/SAP/ui5-webcomponents/issues/1320)) ([1c2a94a](https://github.com/SAP/ui5-webcomponents/commit/1c2a94a))
* **ui5-toast:** keep toast open when hovered ([#1294](https://github.com/SAP/ui5-webcomponents/issues/1294)) ([2f4fd6e](https://github.com/SAP/ui5-webcomponents/commit/2f4fd6e)), closes [#1292](https://github.com/SAP/ui5-webcomponents/issues/1292)
* **ui5-dialog:** Dialog does not break when there is no header text ([#1146](https://github.com/SAP/ui5-webcomponents/issues/1146)) ([44e631a](https://github.com/SAP/ui5-webcomponents/commit/44e631a))
* **ui5-token:** token icon is shown again ([#1126](https://github.com/SAP/ui5-webcomponents/issues/1126)) ([59e5972](https://github.com/SAP/ui5-webcomponents/commit/59e5972))


### Code Refactoring

* **ui5-card:** update API and correct visual ([#1145](https://github.com/SAP/ui5-webcomponents/issues/1145)) ([6733de9](https://github.com/SAP/ui5-webcomponents/commit/6733de9))
* **ui5-tabcontainer:** provide tabIndex in tabSelect even ([d8d4fdb](https://github.com/SAP/ui5-webcomponents/commit/d8d4fdb))
* **ui5-textarea:** rename property maxLength to maxlength ([#1068](https://github.com/SAP/ui5-webcomponents/issues/1068)) ([b2ee6a3](https://github.com/SAP/ui5-webcomponents/commit/b2ee6a3))


### Features

* **ui5-li:** add Detail type ([#1323](https://github.com/SAP/ui5-webcomponents/issues/1323)) ([ac8f8ce](https://github.com/SAP/ui5-webcomponents/commit/ac8f8ce))
* **ui5-avatar:** add initials, imageFitType and bg-color ([#1151](https://github.com/SAP/ui5-webcomponents/issues/1151)) ([5d27c7f](https://github.com/SAP/ui5-webcomponents/commit/5d27c7f))
* **ui5-avatar:** introduce new component ([#1135](https://github.com/SAP/ui5-webcomponents/issues/1135)) ([b1c8747](https://github.com/SAP/ui5-webcomponents/commit/b1c8747))
* **ui5-carousel:** initial implementation ([#1159](https://github.com/SAP/ui5-webcomponents/issues/1159)) ([5b84d85](https://github.com/SAP/ui5-webcomponents/commit/5b84d85))
* **ui5-datepicker:** implement min and max date limits ([#1040](https://github.com/SAP/ui5-webcomponents/issues/1040)) ([35b2593](https://github.com/SAP/ui5-webcomponents/commit/35b2593))
* **ui5-dialog:** improve accessibility ([#1288](https://github.com/SAP/ui5-webcomponents/issues/1288)) ([ef2886b](https://github.com/SAP/ui5-webcomponents/commit/ef2886b))
* **ui5-file-uploader:** initial implementation ([#1184](https://github.com/SAP/ui5-webcomponents/issues/1184)) ([e628dbd](https://github.com/SAP/ui5-webcomponents/commit/e628dbd))
* **ui5-input:** implement valueStateMessage ([#1297](https://github.com/SAP/ui5-webcomponents/issues/1297)) ([538a79a](https://github.com/SAP/ui5-webcomponents/commit/538a79a))
* **ui5-input:** provide "Information" value state ([#1261](https://github.com/SAP/ui5-webcomponents/issues/1261)) ([77f7293](https://github.com/SAP/ui5-webcomponents/commit/77f7293))
* **ui5-list:** add infinite-scroll capability ([#1220](https://github.com/SAP/ui5-webcomponents/issues/1220)) ([756b78b](https://github.com/SAP/ui5-webcomponents/commit/756b78b))
* **ui5-mcb-item:** initial implementation ([#1254](https://github.com/SAP/ui5-webcomponents/issues/1254)) ([861a19b](https://github.com/SAP/ui5-webcomponents/commit/861a19b))
* **ui5-multi-combobox:** implement angular two way data binding ([#1363](https://github.com/SAP/ui5-webcomponents/issues/1363)) ([33009db](https://github.com/SAP/ui5-webcomponents/commit/33009db))
* **ui5-radiobutton:** introduce wrap property ([#1006](https://github.com/SAP/ui5-webcomponents/issues/1006)) ([99dd6c4](https://github.com/SAP/ui5-webcomponents/commit/99dd6c4))
* **ui5-segmentedbutton:** initial implementation ([#1164](https://github.com/SAP/ui5-webcomponents/issues/1164)) ([931fbe0](https://github.com/SAP/ui5-webcomponents/commit/931fbe0))
* **ui5-static-area-item:** implement lazy loading ([#1272](https://github.com/SAP/ui5-webcomponents/issues/1272)) ([1f76a71](https://github.com/SAP/ui5-webcomponents/commit/1f76a71))
* **ui5-suggestion-item:** add new component ([#1336](https://github.com/SAP/ui5-webcomponents/issues/1336)) ([786f4e9](https://github.com/SAP/ui5-webcomponents/commit/786f4e9))
* **ui5-tabcontainer:** add tabLayout property ([#1214](https://github.com/SAP/ui5-webcomponents/issues/1214)) ([e79dcc8](https://github.com/SAP/ui5-webcomponents/commit/e79dcc8))
* **ui5-table:** provide rowClick event ([#1186](https://github.com/SAP/ui5-webcomponents/issues/1186)) ([0ba6fdd](https://github.com/SAP/ui5-webcomponents/commit/0ba6fdd))
* **ui5-timepicker:** implement new component ([#1172](https://github.com/SAP/ui5-webcomponents/issues/1172)) ([56e39bc](https://github.com/SAP/ui5-webcomponents/commit/56e39bc))
* **input components:** make input-based components open dialog on mobile device ([#1144](https://github.com/SAP/ui5-webcomponents/issues/1144)) ([d7b1179](https://github.com/SAP/ui5-webcomponents/commit/d7b1179))
* **ui5-table:** introduce popinChange event ([#1166](https://github.com/SAP/ui5-webcomponents/issues/1166)) ([0979963](https://github.com/SAP/ui5-webcomponents/commit/0979963))
* **ui5-combobox:** initial implementation ([#1123](https://github.com/SAP/ui5-webcomponents/issues/1123)) ([ca2fa23](https://github.com/SAP/ui5-webcomponents/commit/ca2fa23))
* **ui5-toast:** introduce new component ([#1014](https://github.com/SAP/ui5-webcomponents/issues/1014)) ([48400cd](https://github.com/SAP/ui5-webcomponents/commit/48400cd))


### BREAKING CHANGES

* **ui5-busyindicator:** Medium size is now default

FIXES: https://github.com/SAP/ui5-webcomponents/issues/1337
* **ui5-mcb-item:** - ui5-multi-combobox no longer accepts `ui5-li` for items use `ui5-multi-combobox-item` instead.
- **ui5-combobox-item:** change the tag name from `ui5-combobox-item` to `ui5-cb-item`
* **ui5-tabcontainer:** `itemSelect` is renamed to `tabSelect` and the `item` event param is renamed to `tab`.

* **ui5-card:** the proeprty `subtitle` has been renamed to `subheading`
* **ui5-textarea:** The property `maxLength` has been renamed to `maxlength`and the attribute name is changed from `max-length` to `maxlength`.





# [1.0.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2019-12-02)

### Migration guide
Take a look the [migration guide](https://github.com/SAP/ui5-webcomponents/blob/master/docs/Migration-guides.md) for smooth update from 1.0.0-rc.4 version to 1.0.0-rc.5 version.


### Bug Fixes

* **ui5-button:** prevents setting 0 height to icons in IE ([#902](https://github.com/SAP/ui5-webcomponents/issues/902)) ([20511c6](https://github.com/SAP/ui5-webcomponents/commit/20511c6))
* **ui5-button:** subscribe event handlers via HBS template
* **ui5-checkbox:** fix layouting in IE ([#926](https://github.com/SAP/ui5-webcomponents/issues/926)) ([ffdc271](https://github.com/SAP/ui5-webcomponents/commit/ffdc271))
* **ui5-checkbox:** fix truncation in compactSize ([#998](https://github.com/SAP/ui5-webcomponents/issues/998)) ([3cdcede](https://github.com/SAP/ui5-webcomponents/commit/3cdcede))
* **ui5-datepicker:** fix DatePicker hover effect ([#999](https://github.com/SAP/ui5-webcomponents/issues/999)) ([44d6c27](https://github.com/SAP/ui5-webcomponents/commit/44d6c27))
* **ui5-datepicker:** it is now possible to set an empty placeholder ([#997](https://github.com/SAP/ui5-webcomponents/issues/997)) ([3eca602](https://github.com/SAP/ui5-webcomponents/commit/3eca602))
* **ui5-daypicker:** Separate daypicker click handling to mousedown/up handlers([#894](https://github.com/SAP/ui5-webcomponents/issues/894)) ([09d0ec7](https://github.com/SAP/ui5-webcomponents/commit/09d0ec7))
* **ui5-input:** correct ACC info implementation ([#846](https://github.com/SAP/ui5-webcomponents/issues/846)) ([7d547ec](https://github.com/SAP/ui5-webcomponents/commit/7d547ec))
* **ui5-input:** fix input pushed downward ([#891](https://github.com/SAP/ui5-webcomponents/issues/891)) ([bda9714](https://github.com/SAP/ui5-webcomponents/commit/bda9714))
* **ui5-multi-combobox:** close popover & empty value on selection ([#832](https://github.com/SAP/ui5-webcomponents/issues/832)) ([1b3e40d](https://github.com/SAP/ui5-webcomponents/commit/1b3e40d))
* **ui5-popover:** restrict max content height when overflowing the screen ([#908](https://github.com/SAP/ui5-webcomponents/issues/908)) ([6671793](https://github.com/SAP/ui5-webcomponents/commit/6671793))
* **ui5-select:** remove unsupported method in IE ([#919](https://github.com/SAP/ui5-webcomponents/issues/919)) ([f1bceea](https://github.com/SAP/ui5-webcomponents/commit/f1bceea))
* **ui5-tabcontainer:** adjust tabs to take 100% of TC height ([#895](https://github.com/SAP/ui5-webcomponents/issues/895)) ([6fcf259](https://github.com/SAP/ui5-webcomponents/commit/6fcf259))
* **ui5-tabcontainer:** fix overflow item default semantic color ([#989](https://github.com/SAP/ui5-webcomponents/issues/989)) ([a003189](https://github.com/SAP/ui5-webcomponents/commit/a003189)), closes [#988](https://github.com/SAP/ui5-webcomponents/issues/988)
* **ui5-tabcontainer:** fix overflow items appearance and selection  ([#988](https://github.com/SAP/ui5-webcomponents/issues/988)) ([8cd2a8b](https://github.com/SAP/ui5-webcomponents/commit/8cd2a8b))
* **ui5-list:** prevent navigaion with Left/Right keys([#985](https://github.com/SAP/ui5-webcomponents/issues/985)) ([3d46e2d](https://github.com/SAP/ui5-webcomponents/commit/3d46e2d))
*  **ui5-table:** pressing SPACE works for HTML elements inside ui5-table ([#964](https://github.com/SAP/ui5-webcomponents/issues/964)) ([2384236](https://github.com/SAP/ui5-webcomponents/commit/2384236))
* **ui5-table:** fix JS error when there are less cells than columns ([#841](https://github.com/SAP/ui5-webcomponents/issues/841)) ([fd3b690](https://github.com/SAP/ui5-webcomponents/commit/fd3b690))
* **ui5-table:** fix row navigation and focus handling ([#876](https://github.com/SAP/ui5-webcomponents/issues/876)) ([f69f42c](https://github.com/SAP/ui5-webcomponents/commit/f69f42c))


### Features

* **ItemNavigation:** introduce navigationMode property ([#910](https://github.com/SAP/ui5-webcomponents/issues/910)) ([9c43533](https://github.com/SAP/ui5-webcomponents/commit/9c43533))
* **ui5-icon:** change src property to name ([#928](https://github.com/SAP/ui5-webcomponents/issues/928)) ([0489673](https://github.com/SAP/ui5-webcomponents/commit/0489673))
* **ui5-input:** introduce maxlength property ([#976](https://github.com/SAP/ui5-webcomponents/issues/976)) ([c149f5f](https://github.com/SAP/ui5-webcomponents/commit/c149f5f))
* **ui5-label:** add showColon property ([#965](https://github.com/SAP/ui5-webcomponents/issues/965)) ([ae95a8d](https://github.com/SAP/ui5-webcomponents/commit/ae95a8d))
* **ui5-multicombobox:** implement ACC support ([#937](https://github.com/SAP/ui5-webcomponents/issues/937)) ([0a44a92](https://github.com/SAP/ui5-webcomponents/commit/0a44a92))
* **ui5-multicombobox:** introduce open property and openChange event ([#930](https://github.com/SAP/ui5-webcomponents/issues/930)) ([c0b51f5](https://github.com/SAP/ui5-webcomponents/commit/c0b51f5))
* **ui5-panel:** improve accessibility ([#864](https://github.com/SAP/ui5-webcomponents/issues/864)) ([b133468](https://github.com/SAP/ui5-webcomponents/commit/b133468))
* **ui5-textarea:** implement input event ([#543](https://github.com/SAP/ui5-webcomponents/issues/543)) ([7c5647e](https://github.com/SAP/ui5-webcomponents/commit/7c5647e))

### Code Refactoring
* **ui5-shellbar:** move component to @ui5/webcomponents-fiori package ([#887](https://github.com/SAP/ui5-webcomponents/pull/887)) ([06f1770](https://github.com/SAP/ui5-webcomponents/commit/17c25ff123436c1f6e11513055b33977b06f1770))
* **ui5-card:** replace "avatar" property with "avatar" slot ([#928](https://github.com/SAP/ui5-webcomponents/issues/928)) ([0489673](https://github.com/SAP/ui5-webcomponents/commit/0489673))
* **ui5-shellbar:** rename "icon" slot to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/issues/901)) ([5ca3280](https://github.com/SAP/ui5-webcomponents/commit/5ca3280))
* **ui5-shellbar-item:** "src" property renamed to "name" ([#928](https://github.com/SAP/ui5-webcomponents/pull/928)) ([8e060d1](https://github.com/SAP/ui5-webcomponents/commit/0489673610ce2fd0e96d0a3a1f4e0465d8e060d1))
* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset ([#904](https://github.com/SAP/ui5-webcomponents/pull/904)) ([c25e0a7](https://github.com/SAP/ui5-webcomponents/commit/59fead49d7a3222d55270584bb048190dc25e0a7))

### BREAKING CHANGES

* **icons:** Move all individual icons to a new npm package called `@ui5/webcomponents-icons`.

You have to install the package 
```js
npm i @ui5/webcomponents-icons --save
```
The import statements should be changed

Before:
```js
@ui5/webcomponents/dist/icons/add.js
```

After:
```js
@ui5/webcomponents-icons/dist/add.js
```
* **ui5-shellbar:** move component to new `@ui5/webcomponents-fiori` package ([#887](https://github.com/SAP/ui5-webcomponents/pull/887)) ([06f1770](https://github.com/SAP/ui5-webcomponents/commit/17c25ff123436c1f6e11513055b33977b06f1770))

* **ui5-shellbar:** rename "icon" slot to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/issues/901)) ([5ca3280](https://github.com/SAP/ui5-webcomponents/commit/5ca3280))

The slot accepts a ui5-button and overstyles it to match ShellBar's styling.

* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset ([#904](https://github.com/SAP/ui5-webcomponents/pull/904)) ([c25e0a7](https://github.com/SAP/ui5-webcomponents/commit/59fead49d7a3222d55270584bb048190dc25e0a7))

To get the ShellBar's coPilot animated you have to import the `@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js` module

* **ui5-shellbar-item:** "src" property renamed to "name" ([#928](https://github.com/SAP/ui5-webcomponents/pull/928)) ([8e060d1](https://github.com/SAP/ui5-webcomponents/commit/0489673610ce2fd0e96d0a3a1f4e0465d8e060d1))

The "src" property was renamed to icon and accepts icon name (such as "add") instead of icon src (such as "sap-icon://add")

* **ui5-card:** replace "avatar" property with "avatar" slot ([#928](https://github.com/SAP/ui5-webcomponents/issues/928)) ([0489673](https://github.com/SAP/ui5-webcomponents/commit/0489673))

The avatar property was removed.
Use the avatar slot instead - pass an icon(<ui5-icon) or an image(<img).

Before:
```html
<ui5-card avatar="sap-icon://add"></ui5-card>
```

After:
```html
<ui5-card><ui5-icon name="add" slot="avatar"></ui5-icon></ui5-card>`
```
and respectively:
```html
<ui5-card avatar="http://url/to/my/image"></ui5-card>`
```
becomes:
```html
<ui5-card><img src="http://url/to/my/image" slot="avatar"/></ui5-card>`
```

* **ui5-icon:** "src" property was renamed to "name".

The "name" poperty accepts icon name (such as "add") instead of icon src (such as "sap-icon://add").
Note: the src property will continue to work until the next release due to the impact of the change, but will produce a warning in the console.








# [1.0.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2019-10-11)


### Bug Fixes

* **ui5-badge:** fix icon visual issue in ie ([#809](https://github.com/SAP/ui5-webcomponents/issues/809)) ([150a100](https://github.com/SAP/ui5-webcomponents/commit/150a100))
* update output of create new component script ([#826](https://github.com/SAP/ui5-webcomponents/issues/826)) ([0241140](https://github.com/SAP/ui5-webcomponents/commit/0241140))
* **ui5-button:** apply correct font-family: 72 ([#825](https://github.com/SAP/ui5-webcomponents/issues/825)) ([21ec559](https://github.com/SAP/ui5-webcomponents/commit/21ec559))




# [1.0.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2019-10-03)


### Bug Fixes

* **ui5-badge:** correct component sizing ([#733](https://github.com/SAP/ui5-webcomponents/issues/733)) ([f5a4798](https://github.com/SAP/ui5-webcomponents/commit/f5a4798))
* **ui5-badge:** fix icon size ([#729](https://github.com/SAP/ui5-webcomponents/issues/729)) ([f1e1343](https://github.com/SAP/ui5-webcomponents/commit/f1e1343))
* **ui5-busyindicator:** change z-index not to overlap popover or dialog ([#624](https://github.com/SAP/ui5-webcomponents/issues/624)) ([c91c811](https://github.com/SAP/ui5-webcomponents/commit/c91c811))
* **ui5-button:** align buttons with and without icons on same line ([#796](https://github.com/SAP/ui5-webcomponents/issues/796)) ([8420492](https://github.com/SAP/ui5-webcomponents/commit/8420492))
* **ui5-button:** fix Transparent button border in Fiori 3 & HCB ([#789](https://github.com/SAP/ui5-webcomponents/issues/789)) ([bc00f1f](https://github.com/SAP/ui5-webcomponents/commit/bc00f1f))
* **ui5-checkbox:** set default font-size to checkmark ([#618](https://github.com/SAP/ui5-webcomponents/issues/618)) ([d3a9197](https://github.com/SAP/ui5-webcomponents/commit/d3a9197))
* **ui5-input:** inputs now support placeholder on IE ([#781](https://github.com/SAP/ui5-webcomponents/issues/781)) ([559109d](https://github.com/SAP/ui5-webcomponents/commit/559109d))
* **ui5-icon:** icon no longer flickers on IE ([#722](https://github.com/SAP/ui5-webcomponents/issues/722)) ([964af67](https://github.com/SAP/ui5-webcomponents/commit/964af67))
* **ui5-input:** use translated text ([#783](https://github.com/SAP/ui5-webcomponents/issues/783)) ([1e9a4e6](https://github.com/SAP/ui5-webcomponents/commit/1e9a4e6))
* **ui5-link:** fix link hover effect ([#803](https://github.com/SAP/ui5-webcomponents/issues/803)) ([46bfaf1](https://github.com/SAP/ui5-webcomponents/commit/46bfaf1))
* **ui5-multi-combobox:** overflow tokens correctly when not enough space ([#714](https://github.com/SAP/ui5-webcomponents/issues/714)) ([c67fe0a](https://github.com/SAP/ui5-webcomponents/commit/c67fe0a))
* **ui5-multicombobox:** enable closing on icon click ([#719](https://github.com/SAP/ui5-webcomponents/issues/719)) ([8d98def](https://github.com/SAP/ui5-webcomponents/commit/8d98def))
* **ui5-switch:** don`t mirror checkmark icon in RTL ([#742](https://github.com/SAP/ui5-webcomponents/issues/742)) ([ad2609d](https://github.com/SAP/ui5-webcomponents/commit/ad2609d))
* **ui5-tabcontainer:** fix selected tab text color in HCB ([#805](https://github.com/SAP/ui5-webcomponents/issues/805)) ([3ccf80e](https://github.com/SAP/ui5-webcomponents/commit/3ccf80e))
* **ui5-table:** call resize handler on initial rendering ([#625](https://github.com/SAP/ui5-webcomponents/issues/625)) ([c20c85c](https://github.com/SAP/ui5-webcomponents/commit/c20c85c))
* **ui5-datepicker:** date selection works on IE ([#623](https://github.com/SAP/ui5-webcomponents/issues/623)) ([5a0b7ad](https://github.com/SAP/ui5-webcomponents/commit/5a0b7ad))
* **ui5-token:** correct visual in RTL/Compact ([#804](https://github.com/SAP/ui5-webcomponents/issues/804)) ([71c9caa](https://github.com/SAP/ui5-webcomponents/commit/71c9caa))
* **ui5-icon:** enable default icon size to be changed ([#629](https://github.com/SAP/ui5-webcomponents/issues/629)) ([a44cdc6](https://github.com/SAP/ui5-webcomponents/commit/a44cdc6))
* **InputFormSupport:** enable form support for nested input elements ([#656](https://github.com/SAP/ui5-webcomponents/issues/656)) ([57adb04](https://github.com/SAP/ui5-webcomponents/commit/57adb04))
* **doc:** fix typos in docs ([#680](https://github.com/SAP/ui5-webcomponents/issues/680)) ([f884643](https://github.com/SAP/ui5-webcomponents/commit/f884643))
* **ui5-datepicker:** icon from datepicker no longer flickers on IE ([#723](https://github.com/SAP/ui5-webcomponents/issues/723)) ([80c4f32](https://github.com/SAP/ui5-webcomponents/commit/80c4f32))
* **ui5-tokenizer:** use i18nbundle instead of resource bundle ([#757](https://github.com/SAP/ui5-webcomponents/issues/757)) ([d6668bc](https://github.com/SAP/ui5-webcomponents/commit/d6668bc))


### Code Refactoring


* **ui5-li:** remove background CSS Variable ([#802](https://github.com/SAP/ui5-webcomponents/issues/802)) ([9bf57ab](https://github.com/SAP/ui5-webcomponents/commit/9bf57ab))
* **ui5-multi-combobox:** replace validate-input with allow-custom-values ([#749](https://github.com/SAP/ui5-webcomponents/issues/749)) ([f501df4](https://github.com/SAP/ui5-webcomponents/commit/f501df4))
* **ui5-popover:** improve layouting, styling and positioning ([#779](https://github.com/SAP/ui5-webcomponents/issues/779)) ([1d377ba](https://github.com/SAP/ui5-webcomponents/commit/1d377ba))
* **ui5-table:** width property of column is removed ([#784](https://github.com/SAP/ui5-webcomponents/issues/784)) ([dedb51e](https://github.com/SAP/ui5-webcomponents/commit/dedb51e))
* **ui5-datepicker:** hide week number in Islamic, Buddhist and Japanese calendars ([#806](https://github.com/SAP/ui5-webcomponents/issues/806)) ([a5ccb80](https://github.com/SAP/ui5-webcomponents/commit/a5ccb80))


### Features

* **ui5-datepicker:** adds public getter dateValue ([#726](https://github.com/SAP/ui5-webcomponents/issues/726)) ([1ba3e25](https://github.com/SAP/ui5-webcomponents/commit/1ba3e25))
* **ui5-datepicker:** implement ACC support ([#763](https://github.com/SAP/ui5-webcomponents/issues/763)) ([188627e](https://github.com/SAP/ui5-webcomponents/commit/188627e))
* **ui5-icon:** implement ACC support ([#709](https://github.com/SAP/ui5-webcomponents/issues/709)) ([1357c16](https://github.com/SAP/ui5-webcomponents/commit/1357c16))
* **ui5-icon:** use SVG icons instead of icon font ([#649](https://github.com/SAP/ui5-webcomponents/issues/649)) ([b6352d8](https://github.com/SAP/ui5-webcomponents/commit/b6352d8))
* **ui5-list:** added new param for selectionChange event ([#798](https://github.com/SAP/ui5-webcomponents/issues/798)) ([28c4181](https://github.com/SAP/ui5-webcomponents/commit/28c4181))
* **ui5-select:** adds readonly property selectedOption ([#718](https://github.com/SAP/ui5-webcomponents/issues/718)) ([5d9a1ac](https://github.com/SAP/ui5-webcomponents/commit/5d9a1ac))
* **ui5-switch:** implement ACC support ([#692](https://github.com/SAP/ui5-webcomponents/issues/692)) ([7304a31](https://github.com/SAP/ui5-webcomponents/commit/7304a31))
* **ui5-tabcontainer:** update ACC of header and content ([#756](https://github.com/SAP/ui5-webcomponents/issues/756)) ([8550365](https://github.com/SAP/ui5-webcomponents/commit/8550365))
* **ui5-link, ui5-textarea, ui5-input, ui5-checkbox, ui5-button, ui5-badge, ui5-busyindicator, ui5-messagestrip:** Improve accessibility of components ([#613](https://github.com/SAP/ui5-webcomponents/issues/613)) ([16568c2](https://github.com/SAP/ui5-webcomponents/commit/16568c2))


### BREAKING CHANGES

* **ui5-popover:** stayOpenOnScroll is now removed
Popover will no longer close when the browser is scrolled
and its parent (opener) is visible in the viewport.
* **ui5-li:** CSS variable --ui5-listitem-background-color is removed,
set the desired background directly on the tag.
* **ui5-table:** width property of the ui5-table-column has been removed, use CSS to give width to the columns.
`<ui5-table-column style="width: 100px">...`
* **ui5-multi-combobox:** property validate-input is removed,
use the property allow-custom-values, note built in validation is enabled by default.





# [1.0.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2019-07-04)

### Bug Fixes

* **popup:** remove body styles in onExitDOM ([#593](https://github.com/SAP/ui5-webcomponents/issues/593)) ([410b8f6](https://github.com/SAP/ui5-webcomponents/commit/410b8f6))

### Code Refactoring

* **ui5-shellbar-item:** Rename press event to itemClick ([#606](https://github.com/SAP/ui5-webcomponents/issues/606)) ([5bfab39](https://github.com/SAP/ui5-webcomponents/commit/5bfab39))
* **ui5-popover, ui5-dialog**: remove noHeader property (#615) ([6a990a7](https://github.com/SAP/ui5-webcomponents/commit/6a990a7)), closes [#615](https://github.com/SAP/ui5-webcomponents/issues/615)


### BREAKING CHANGES

* **ui5-shellbar-item:** ui5-shellbar-item press event is renamed to itemClick
* **ui5-popover, ui5-dialog**: the property noHeader is removed, the presence of header is based on the values of "headerText" property and "header" slot





## [0.13.1](https://github.com/SAP/ui5-webcomponents/compare/v0.13.0...v0.13.1) (2019-06-22)

**Note:** Version bump only for package @ui5/webcomponents





# [0.13.0](https://github.com/SAP/ui5-webcomponents/compare/v0.12.0...v0.13.0) (2019-06-21)


### Bug Fixes

* **ui5-badge:** correct text font ([#535](https://github.com/SAP/ui5-webcomponents/issues/535)) ([3da0dd5](https://github.com/SAP/ui5-webcomponents/commit/3da0dd5))
* remove custom "falsy" checks from ifDefined ([#544](https://github.com/SAP/ui5-webcomponents/issues/544)) ([92a85fa](https://github.com/SAP/ui5-webcomponents/commit/92a85fa))
* **ui5-icon:** correct RTL appearance ([#569](https://github.com/SAP/ui5-webcomponents/issues/569)) ([591d81a](https://github.com/SAP/ui5-webcomponents/commit/591d81a))
* **ui5-switch:** change getters names ([#566](https://github.com/SAP/ui5-webcomponents/issues/566)) ([2d94b60](https://github.com/SAP/ui5-webcomponents/commit/2d94b60))
* **ui5-tabcontainer:** set initial tab index ([#545](https://github.com/SAP/ui5-webcomponents/issues/545)) ([0127c2f](https://github.com/SAP/ui5-webcomponents/commit/0127c2f))


### Code Refactoring

* **ui5-button:** rename type property to design ([#504](https://github.com/SAP/ui5-webcomponents/issues/504)) ([a62b471](https://github.com/SAP/ui5-webcomponents/commit/a62b471))
* **ui5-link:** rename type property to design ([#505](https://github.com/SAP/ui5-webcomponents/issues/505)) ([3965a00](https://github.com/SAP/ui5-webcomponents/commit/3965a00))
* **ui5-messagestrip:** rename hideIcon property to noIcon ([#507](https://github.com/SAP/ui5-webcomponents/issues/507)) ([2314fc3](https://github.com/SAP/ui5-webcomponents/commit/2314fc3))
* **ui5-popover:** hideHeader property renamed to noHeader ([#553](https://github.com/SAP/ui5-webcomponents/issues/553)) ([11dc3b1](https://github.com/SAP/ui5-webcomponents/commit/11dc3b1))
* **ui5-popover:** rename hideArrow property to noArrow ([#509](https://github.com/SAP/ui5-webcomponents/issues/509)) ([efff863](https://github.com/SAP/ui5-webcomponents/commit/efff863))
* **ui5-select:** change default slot from list items to options ([#532](https://github.com/SAP/ui5-webcomponents/issues/532)) ([2e4486b](https://github.com/SAP/ui5-webcomponents/commit/2e4486b))
* **ui5-switch:** rename type property to graphical ([#506](https://github.com/SAP/ui5-webcomponents/issues/506)) ([0040e85](https://github.com/SAP/ui5-webcomponents/commit/0040e85))


### Features

* **ui5-card:** add "headerInteractive" property ([#439](https://github.com/SAP/ui5-webcomponents/issues/439)) ([98f7075](https://github.com/SAP/ui5-webcomponents/commit/98f7075))
* **ui5-label:** expose font-weight property on root tag ([#534](https://github.com/SAP/ui5-webcomponents/issues/534)) ([88c794a](https://github.com/SAP/ui5-webcomponents/commit/88c794a))
* **ui5-li:** add info and infoState properties ([#539](https://github.com/SAP/ui5-webcomponents/issues/539)) ([f1d8a85](https://github.com/SAP/ui5-webcomponents/commit/f1d8a85))
* add form support for ui5-select ([#565](https://github.com/SAP/ui5-webcomponents/issues/565)) ([89e3508](https://github.com/SAP/ui5-webcomponents/commit/89e3508))


### BREAKING CHANGES

* the parameter of the change event is now called "selectedOption"; ui5-select enforces ui5-option as children in the metadata
* **ui5-select:** Use ui5-option instead of ui5-li in ui5-select
* **ui5-link:** property type is renamed to design
* **ui5-button:** type property is changed to design
* **ui5-switch:** type property is renamed to boolean property graphical
* **ui5-messagestrip:** hideIcon property is renamed to noIcon
* **ui5-popover:** hideArrow property is renamed to noArrow
* **ui5-popover:** hideHeader property renamed to noHeader





# [0.12.0](https://github.com/SAP/ui5-webcomponents/compare/v0.11.0...v0.12.0) (2019-06-10)


### Bug Fixes

* **ui5-button:** bold text in fiori_3 when button is emphasized ([#512](https://github.com/SAP/ui5-webcomponents/issues/512)) ([53cdc93](https://github.com/SAP/ui5-webcomponents/commit/53cdc93))
* **ui5-button:** fix focus outline color of emphasized button ([#499](https://github.com/SAP/ui5-webcomponents/issues/499)) ([1e0690c](https://github.com/SAP/ui5-webcomponents/commit/1e0690c))
* **ui5-checkbox:** fix touchArea size ([#448](https://github.com/SAP/ui5-webcomponents/issues/448)) ([8831139](https://github.com/SAP/ui5-webcomponents/commit/8831139))
* **ui5-li:** remove active state onmouseup ([#525](https://github.com/SAP/ui5-webcomponents/issues/525)) ([a07880d](https://github.com/SAP/ui5-webcomponents/commit/a07880d))
* **ui5-messagestrip:** improve screen reader announcements ([#467](https://github.com/SAP/ui5-webcomponents/issues/467)) ([b68443c](https://github.com/SAP/ui5-webcomponents/commit/b68443c))
* **ui5-multi-combobox:** docs and API improvements ([#438](https://github.com/SAP/ui5-webcomponents/issues/438)) ([c559ac0](https://github.com/SAP/ui5-webcomponents/commit/c559ac0))
* **ui5-radiobutton:** make readonly radiobuttons not selectable via keyboard ([#500](https://github.com/SAP/ui5-webcomponents/issues/500)) ([2261f1c](https://github.com/SAP/ui5-webcomponents/commit/2261f1c))
* **ui5-select:** fix component clickable area ([#462](https://github.com/SAP/ui5-webcomponents/issues/462)) ([9c59de5](https://github.com/SAP/ui5-webcomponents/commit/9c59de5))
* **ui5-tabcontainer:** remove typo from component template ([#446](https://github.com/SAP/ui5-webcomponents/issues/446)) ([e701562](https://github.com/SAP/ui5-webcomponents/commit/e701562))
* **ui5-table:** fix scrolling on space ([#232](https://github.com/SAP/ui5-webcomponents/issues/232)) ([cd63e9a](https://github.com/SAP/ui5-webcomponents/commit/cd63e9a))
* **ui5-list:** fix list footer font family ([#494](https://github.com/SAP/ui5-webcomponents/issues/494)) ([5543d30](https://github.com/SAP/ui5-webcomponents/commit/5543d30))
* all: fix styles for hidden attribute ([#464](https://github.com/SAP/ui5-webcomponents/issues/464)) ([f7f07d2](https://github.com/SAP/ui5-webcomponents/commit/f7f07d2))


### Code Refactoring

* **ui5-button:** remove activeIcon property ([#513](https://github.com/SAP/ui5-webcomponents/issues/513)) ([8d8c343](https://github.com/SAP/ui5-webcomponents/commit/8d8c343))


### Features

* inline english texts if no translation is fetched ([#479](https://github.com/SAP/ui5-webcomponents/issues/479)) ([abfb221](https://github.com/SAP/ui5-webcomponents/commit/abfb221))
* **base:** implement late validation ([#522](https://github.com/SAP/ui5-webcomponents/issues/522)) ([c452d60](https://github.com/SAP/ui5-webcomponents/commit/c452d60))
* **ui5-badge:** initial implementation ([#521](https://github.com/SAP/ui5-webcomponents/issues/521)) ([8496211](https://github.com/SAP/ui5-webcomponents/commit/8496211))
* **ui5-busyindicator:** initial implementation ([#416](https://github.com/SAP/ui5-webcomponents/issues/416)) ([6b6b544](https://github.com/SAP/ui5-webcomponents/commit/6b6b544))
* **ui5-busyindicator:** introduce active property and simplify usage ([#519](https://github.com/SAP/ui5-webcomponents/issues/519)) ([ff59a98](https://github.com/SAP/ui5-webcomponents/commit/ff59a98))
* **ui5-li:** parameterize listitembase border bottom ([#520](https://github.com/SAP/ui5-webcomponents/issues/520)) ([da1c430](https://github.com/SAP/ui5-webcomponents/commit/da1c430))
* **ui5-table:** add noDataText for ui5-table without rows ([#402](https://github.com/SAP/ui5-webcomponents/issues/402)) ([907d513](https://github.com/SAP/ui5-webcomponents/commit/907d513)), closes [#389](https://github.com/SAP/ui5-webcomponents/issues/389)


### BREAKING CHANGES

* **ui5-button:** activeIcon property is removed





## [0.11.1](https://github.com/SAP/ui5-webcomponents/compare/v0.11.0...v0.11.1) (2019-05-30)

**Note:** Version bump only for package @ui5/webcomponents





# [0.11.0](https://github.com/SAP/ui5-webcomponents/compare/v0.10.1...v0.11.0) (2019-05-22)


### Bug Fixes

* **ui5-checkbox:** correct default values of the boolean props  ([#408](https://github.com/SAP/ui5-webcomponents/issues/408)) ([9bdd2c5](https://github.com/SAP/ui5-webcomponents/commit/9bdd2c5))
* **ui5-messagestrip:** remove height 100% on element tag ([#387](https://github.com/SAP/ui5-webcomponents/issues/387)) ([4b64a9c](https://github.com/SAP/ui5-webcomponents/commit/4b64a9c))
* **ui5-panel:** add missing dependency for ui5-icon ([#406](https://github.com/SAP/ui5-webcomponents/issues/406)) ([650bcb0](https://github.com/SAP/ui5-webcomponents/commit/650bcb0))


### Code Refactoring

* **ui5-datepicker:** rename event 'liveChange' to 'input' ([#394](https://github.com/SAP/ui5-webcomponents/pull/394))
* **ui5-panel:** remove backgroundDesign property ([#384](https://github.com/SAP/ui5-webcomponents/pull/384))
* **ui5-panel:** remove backgroundDesign property ([#383](https://github.com/SAP/ui5-webcomponents/pull/383))
* **ui5-checkbox:** rename "readOnly" to "readonly" ([#413](https://github.com/SAP/ui5-webcomponents/pull/413))


### Features

* **ui5-list:** selectionChange event provides previousSelection items ([#418](https://github.com/SAP/ui5-webcomponents/issues/418)) ([f0fc8f2](https://github.com/SAP/ui5-webcomponents/commit/f0fc8f2))
* **ui5-multi-combobox:** initial implementation ([#379](https://github.com/SAP/ui5-webcomponents/issues/379)) ([115900b](https://github.com/SAP/ui5-webcomponents/commit/115900b))
* **ui5-shellbar:** API improvements ([#421](https://github.com/SAP/ui5-webcomponents/issues/421)) ([e0ff36d](https://github.com/SAP/ui5-webcomponents/commit/e0ff36d))


### BREAKING CHANGES

* **ui5-list:** the "selectionChange" event param "items" has been renamed to "selectedItems".
* **ui5-list:** the "backgroundDesign" property has been removed, use the corresponding
CSS variable (--_ui5_listitem_background_color) to alter the list items` background.
* **ui5-panel:** the "backgroundDesign" property has been removed, use the corresponding
CSS variables (--_ui5_panel_background_color) to alter the panel background.
* **ui5-datepicker:** 'liveChange' event has been renamed to 'input'.
* **ui5-checkbox:** property "readOnly" has been renamed to "readonly".
* **ui5-radiobutton:** property "readOnly" has been renamed to "readonly".





## [0.10.1](https://github.com/SAP/ui5-webcomponents/compare/v0.10.0...v0.10.1) (2019-04-24)


### Bug Fixes

* **ui5-li:** fix styles import extension ([#351](https://github.com/SAP/ui5-webcomponents/issues/351)) ([4fae1ff](https://github.com/SAP/ui5-webcomponents/commit/4fae1ff))
* **ui5-messagestrip:** fix layout in ie ([#353](https://github.com/SAP/ui5-webcomponents/issues/353)) ([ca5f62c](https://github.com/SAP/ui5-webcomponents/commit/ca5f62c))
* switch theme for single imported components ([#356](https://github.com/SAP/ui5-webcomponents/issues/356)) ([dcd64a9](https://github.com/SAP/ui5-webcomponents/commit/dcd64a9))
* **ui5-radiobutton:** fix single selection within group ([#355](https://github.com/SAP/ui5-webcomponents/issues/355)) ([371fb88](https://github.com/SAP/ui5-webcomponents/commit/371fb88))
* **ui5-select:** preselect first item if none is selected ([#358](https://github.com/SAP/ui5-webcomponents/issues/358)) ([3d18420](https://github.com/SAP/ui5-webcomponents/commit/3d18420))
* **ui5-togglebutton:** add base styles ([#352](https://github.com/SAP/ui5-webcomponents/issues/352)) ([f4dee1c](https://github.com/SAP/ui5-webcomponents/commit/f4dee1c))


### Code Refactoring

* **ui5-radiobutton:** improve group handling ([#348](https://github.com/SAP/ui5-webcomponents/issues/348)) ([4d7d9c3](https://github.com/SAP/ui5-webcomponents/commit/4d7d9c3))
* **ui5-radiobutton:** enable radio button form support ([#357](https://github.com/SAP/ui5-webcomponents/issues/357)) ([96a0517](https://github.com/SAP/ui5-webcomponents/commit/96a0517))


### BREAKING CHANGES

* **ui5-radiobutton:** the property "group" is replaced by the "name" property.





# [0.10.0](https://github.com/SAP/ui5-webcomponents/compare/v0.9.0...v0.10.0) (2019-04-22)


### Bug Fixes

* **docs:** fix card sample page ([#305](https://github.com/SAP/ui5-webcomponents/issues/305)) ([d91f237](https://github.com/SAP/ui5-webcomponents/commit/d91f237))
* **ui5-button:** fix height ([#331](https://github.com/SAP/ui5-webcomponents/issues/331)) ([98a2c4e](https://github.com/SAP/ui5-webcomponents/commit/98a2c4e))
* **ui5-button:** fix width in ie11 ([#325](https://github.com/SAP/ui5-webcomponents/issues/325)) ([b00ab52](https://github.com/SAP/ui5-webcomponents/commit/b00ab52))
* **ui5-button:** removes active state after tabbing on an pressed button ([#335](https://github.com/SAP/ui5-webcomponents/issues/335)) ([0776e01](https://github.com/SAP/ui5-webcomponents/commit/0776e01))
* **ui5-checkbox:** correct setting of aria-readonly ([#220](https://github.com/SAP/ui5-webcomponents/issues/220)) ([c1f98a3](https://github.com/SAP/ui5-webcomponents/commit/c1f98a3))
* **ui5-checkbox:** fIx checkbox width in ie11 ([d58320b](https://github.com/SAP/ui5-webcomponents/commit/d58320b))
* **ui5-checkbox:** fixes issues with focus outline and wrapping ([#238](https://github.com/SAP/ui5-webcomponents/issues/238)) ([02bb56e](https://github.com/SAP/ui5-webcomponents/commit/02bb56e))
* **ui5-checkbox:** remove background from touchable area ([#226](https://github.com/SAP/ui5-webcomponents/issues/226)) ([3412ef3](https://github.com/SAP/ui5-webcomponents/commit/3412ef3))
* **ui5-li:** fix delete list item button height ([#221](https://github.com/SAP/ui5-webcomponents/issues/221)) ([a008022](https://github.com/SAP/ui5-webcomponents/commit/a008022))
* make fallback script work with multiple variables per line ([#252](https://github.com/SAP/ui5-webcomponents/issues/252)) ([298a165](https://github.com/SAP/ui5-webcomponents/commit/298a165))
* **ui5-li:** fix description text in compact mode ([#211](https://github.com/SAP/ui5-webcomponents/issues/211)) ([cadf996](https://github.com/SAP/ui5-webcomponents/commit/cadf996))
* **ui5-li-custom:** enable setting height of the custom content ([#311](https://github.com/SAP/ui5-webcomponents/issues/311)) ([76bf9f3](https://github.com/SAP/ui5-webcomponents/commit/76bf9f3))
* prevent merging of :host(tag) and tag css rules ([#349](https://github.com/SAP/ui5-webcomponents/issues/349)) ([f23085c](https://github.com/SAP/ui5-webcomponents/commit/f23085c))
* **ui5-li:** fix typo ([#224](https://github.com/SAP/ui5-webcomponents/issues/224)) ([cb781f1](https://github.com/SAP/ui5-webcomponents/commit/cb781f1))
* **ui5-link:** noreferrer for cross-origin links ([#202](https://github.com/SAP/ui5-webcomponents/issues/202)) ([5902704](https://github.com/SAP/ui5-webcomponents/commit/5902704))
* **ui5-panel:** correct inon size on small screens ([#213](https://github.com/SAP/ui5-webcomponents/issues/213)) ([a98f544](https://github.com/SAP/ui5-webcomponents/commit/a98f544))
* **ui5-radiobutton:** fix focus in ie11 ([#327](https://github.com/SAP/ui5-webcomponents/issues/327)) ([b59abd6](https://github.com/SAP/ui5-webcomponents/commit/b59abd6))
* **ui5-radiobutton:** fix keyboard handling on TAB/SHIFT+TAB ([#231](https://github.com/SAP/ui5-webcomponents/issues/231)) ([f2a18cf](https://github.com/SAP/ui5-webcomponents/commit/f2a18cf))
* **ui5-shellbar:** add missing dependency to ui5-popover ([#234](https://github.com/SAP/ui5-webcomponents/issues/234)) ([912f434](https://github.com/SAP/ui5-webcomponents/commit/912f434))
* **ui5-shellbar:** pass correct values for events details ([#298](https://github.com/SAP/ui5-webcomponents/issues/298)) ([2641ec6](https://github.com/SAP/ui5-webcomponents/commit/2641ec6))
* **ui5-shellbar:** set correct font-family to primary title ([#228](https://github.com/SAP/ui5-webcomponents/issues/228)) ([839a66e](https://github.com/SAP/ui5-webcomponents/commit/839a66e))
* **ui5-switch:** fix layouting on IE ([#223](https://github.com/SAP/ui5-webcomponents/issues/223)) ([1111dbf](https://github.com/SAP/ui5-webcomponents/commit/1111dbf))
* **ui5-togglebutton:** correct default btn hover and text hover ([#332](https://github.com/SAP/ui5-webcomponents/issues/332)) ([280f85d](https://github.com/SAP/ui5-webcomponents/commit/280f85d))
* select correctly opens on click ([#235](https://github.com/SAP/ui5-webcomponents/issues/235)) ([a4915df](https://github.com/SAP/ui5-webcomponents/commit/a4915df))
* transform css files to es6 modules ([#306](https://github.com/SAP/ui5-webcomponents/issues/306)) ([dbb98c8](https://github.com/SAP/ui5-webcomponents/commit/dbb98c8))


### Code Refactoring

* remove ui5-toolbar ([#198](https://github.com/SAP/ui5-webcomponents/issues/198)) ([2e14428](https://github.com/SAP/ui5-webcomponents/commit/2e14428))
* **base:** flatten project structure ([#227](https://github.com/SAP/ui5-webcomponents/issues/227)) ([0e8e460](https://github.com/SAP/ui5-webcomponents/commit/0e8e460))
* **ui5-panel:** rename the expand event to toggle ([#216](https://github.com/SAP/ui5-webcomponents/issues/216)) ([2608100](https://github.com/SAP/ui5-webcomponents/commit/2608100))
* **ui5-shellbar:** rename press handlers param ([#300](https://github.com/SAP/ui5-webcomponents/issues/300)) ([5d1c920](https://github.com/SAP/ui5-webcomponents/commit/5d1c920))
* **ui5-tabcontainer:** refactor the component ([#318](https://github.com/SAP/ui5-webcomponents/issues/318)) ([aa516ff](https://github.com/SAP/ui5-webcomponents/commit/aa516ff))
* **ui5-timeline:** change timestamp property to subtitleText ([#321](https://github.com/SAP/ui5-webcomponents/issues/321)) ([287548e](https://github.com/SAP/ui5-webcomponents/commit/287548e))


### Features

* adds static method styles to base class ([#345](https://github.com/SAP/ui5-webcomponents/issues/345)) ([b61860f](https://github.com/SAP/ui5-webcomponents/commit/b61860f))
* **ui5-select:** selection can be changed with arrows while closed ([#254](https://github.com/SAP/ui5-webcomponents/issues/254)) ([bb46034](https://github.com/SAP/ui5-webcomponents/commit/bb46034))
* enable form support and name attribute for inputs ([#337](https://github.com/SAP/ui5-webcomponents/issues/337)) ([188d231](https://github.com/SAP/ui5-webcomponents/commit/188d231))
* framework-level support for CSS Custom Properties ([#196](https://github.com/SAP/ui5-webcomponents/issues/196)) ([291829a](https://github.com/SAP/ui5-webcomponents/commit/291829a))
* make css vars fallback script work with embedded vars ([#251](https://github.com/SAP/ui5-webcomponents/issues/251)) ([f81c117](https://github.com/SAP/ui5-webcomponents/commit/f81c117))
* **ui5-card:** fires headerPress event upon header click ([#250](https://github.com/SAP/ui5-webcomponents/issues/250)) ([59b80be](https://github.com/SAP/ui5-webcomponents/commit/59b80be))
* **ui5-panel:** make the header clickable ([#204](https://github.com/SAP/ui5-webcomponents/issues/204)) ([c5c1786](https://github.com/SAP/ui5-webcomponents/commit/c5c1786))
* **ui5-select:** select opens with space ([#245](https://github.com/SAP/ui5-webcomponents/issues/245)) ([a6c4d29](https://github.com/SAP/ui5-webcomponents/commit/a6c4d29))
* provide named exports for some base modules ([#347](https://github.com/SAP/ui5-webcomponents/issues/347)) ([2e2439a](https://github.com/SAP/ui5-webcomponents/commit/2e2439a))
* **ui5-shellbar:** adds logoPress and coPilotPress events ([#301](https://github.com/SAP/ui5-webcomponents/issues/301)) ([f221123](https://github.com/SAP/ui5-webcomponents/commit/f221123))
* **ui5-shellbar:** menuItems slot and menuItemPress event ([#317](https://github.com/SAP/ui5-webcomponents/issues/317)) ([f24f78b](https://github.com/SAP/ui5-webcomponents/commit/f24f78b))


### BREAKING CHANGES

* **ui5-timeline:** 'timestamp' and 'timeFormat'  properties are removed.
Instead use subtitle-text property and directly format the text as
desired.
* the ui5-toolbar component is removed, we recommend using div or similar HTML tag in combination with flex instead.
* **ui5-panel:** the expand event is removed, use the toggle event instead.
* **ui5-tabcontainer:** 'headerMode' property is removed. All Tabs by Fiori guidelines are rendered in
inline mode
* **ui5-tabcontainer:** 'headerBackgroundDesign' property is removed
* **ui5-tabcontainer:** 'backgroundDesign' property is removed
* **ui5-tabcontainer:** 'content' property is removed. Instead if you want to use the TabContainer as
a filter just use it with 'collapsed' set to true and 'fixed' set to true
* **ui5-tabcontainer:** 'TabContainerDensityMode' is deleted. To set different size modes use ?sap-ui-compactSize=true
* **ui5-tabcontainer:** 'selectedIndex' property is removed. Instead use 'selected' property of the Tab
* **ui5-tabcontainer:** Tab's 'count' property is removed. Instead use the additional-text property
* **ui5-tabcontainer:** Tab's 'design' property is removed
* **ui5-shellbar:** titlePress event is removed and replaced by menuItems slot.
* **base:** All files required from the base now have different
path. sap/ui/webcomponents/base/ is removed.

old: @ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent
new: @ui5/webcomponents-base/src/WebComponent




# [0.9.0](https://github.com/SAP/ui5-webcomponents/compare/v0.8.0...v0.9.0) (2019-03-18)


### Features

* **ui5-messagestrip:** initial implementation ([#80](https://github.com/SAP/ui5-webcomponents/issues/80)) ([cbc9c75](https://github.com/SAP/ui5-webcomponents/commit/cbc9c75))


### Bug Fixes

* fix HCB colours for Icon, TextArea and TableCell content ([#128](https://github.com/SAP/ui5-webcomponents/issues/128)) ([9fb7dc5](https://github.com/SAP/ui5-webcomponents/commit/9fb7dc5))
* **ui5-datepicker:** enable day selection in IE ([#162](https://github.com/SAP/ui5-webcomponents/issues/162)) ([18a3c43](https://github.com/SAP/ui5-webcomponents/commit/18a3c43))
* **ui5-icon:** correct icon graphic vertical alignment in IE ([#142](https://github.com/SAP/ui5-webcomponents/issues/142)) ([98be562](https://github.com/SAP/ui5-webcomponents/commit/98be562))
* **ui5-input:** fire change in sync with the native input ([#168](https://github.com/SAP/ui5-webcomponents/issues/168)) ([55fa533](https://github.com/SAP/ui5-webcomponents/commit/55fa533))
* **ui5-label:** enable text truncation in IE ([#136](https://github.com/SAP/ui5-webcomponents/issues/136)) ([ef00170](https://github.com/SAP/ui5-webcomponents/commit/ef00170))
* fix source maps ([#181](https://github.com/SAP/ui5-webcomponents/issues/181)) ([7084c96](https://github.com/SAP/ui5-webcomponents/commit/7084c96))
* **ui5-list:** correct backward navigation with SHIFT+TAB ([#193](https://github.com/SAP/ui5-webcomponents/issues/193)) ([037409d](https://github.com/SAP/ui5-webcomponents/commit/037409d))


### Code Refactoring

* **ui5-input:** fire input, instead of liveChange ([#159](https://github.com/SAP/ui5-webcomponents/issues/159)) ([b8d978a](https://github.com/SAP/ui5-webcomponents/commit/b8d978a))


### BREAKING CHANGES

* **ui5-input:** liveChange event is no longer fired, listen for the input event instead.





# [0.8.0](https://github.com/SAP/ui5-webcomponents/compare/v0.7.0...v0.8.0) (2019-03-01)


### Features

* **ui5-card:** add avatar property ([#45](https://github.com/SAP/ui5-webcomponents/issues/45)) ([cdaf549](https://github.com/SAP/ui5-webcomponents/commit/cdaf549))
* **ui5-li:** add description property ([#54](https://github.com/SAP/ui5-webcomponents/issues/54)) ([fe79710](https://github.com/SAP/ui5-webcomponents/commit/fe79710))
* **ui5-select:** initial implementation
* **ui5-shellbar:** initial implementation and improvements ([#72](https://github.com/SAP/ui5-webcomponents/issues/72)) ([fdc743d](https://github.com/SAP/ui5-webcomponents/commit/fdc743d))
* **ui5-switch:** initial implementation ([#102](https://github.com/SAP/ui5-webcomponents/issues/102)) ([280d35a](https://github.com/SAP/ui5-webcomponents/commit/280d35a))
* **ui5-timeline:** initial implementation
* load Web Components polyfill on demand ([#96](https://github.com/SAP/ui5-webcomponents/issues/96)) ([98b5174](https://github.com/SAP/ui5-webcomponents/commit/98b5174))


### Bug Fixes

* **eventing:** remove unnecessary tag name check ([#16](https://github.com/SAP/ui5-webcomponents/issues/16)) ([3e39a70](https://github.com/SAP/ui5-webcomponents/commit/3e39a70))
* **ui5-checkbox:** wait for ui5-label definition ([#115](https://github.com/SAP/ui5-webcomponents/issues/115)) ([14067bd](https://github.com/SAP/ui5-webcomponents/commit/14067bd))
* **ui5-checkbox:** show default cursor over text ([#9](https://github.com/SAP/ui5-webcomponents/issues/9)) ([28d5ac0](https://github.com/SAP/ui5-webcomponents/commit/28d5ac0))
* **ui5-checkbox:** fix focus outline appearance in Compact + RTL ([#23](https://github.com/SAP/ui5-webcomponents/issues/23)) ([9b18490](https://github.com/SAP/ui5-webcomponents/commit/9b18490))
* **ui5-datepicker:** display extreme values correctly ([#75](https://github.com/SAP/ui5-webcomponents/issues/75)) ([d1c7259](https://github.com/SAP/ui5-webcomponents/commit/d1c7259))
* **ui5-datepicker:** fix icon color in pressed state ([#63](https://github.com/SAP/ui5-webcomponents/issues/63)) ([a03a51a](https://github.com/SAP/ui5-webcomponents/commit/a03a51a))
* **ui5-input:** fix slotted icon default size ([#105](https://github.com/SAP/ui5-webcomponents/issues/105)) ([0cfe254](https://github.com/SAP/ui5-webcomponents/commit/0cfe254))
* **ui5-li:** fix height with title and description in Compact ([#70](https://github.com/SAP/ui5-webcomponents/issues/70)) ([db17c71](https://github.com/SAP/ui5-webcomponents/commit/db17c71))
* **ui5-popover:** fix appearance on ios within iframe ([#60](https://github.com/SAP/ui5-webcomponents/issues/60)) ([a62c198](https://github.com/SAP/ui5-webcomponents/commit/a62c198))
* **ui5-popover:** fix bottom border radius ([#34](https://github.com/SAP/ui5-webcomponents/issues/34)) ([2daefc1](https://github.com/SAP/ui5-webcomponents/commit/2daefc1))
* **ui5-radiobutton:** fix focus lost upon text click in IE ([#24](https://github.com/SAP/ui5-webcomponents/issues/24)) ([7a00caf](https://github.com/SAP/ui5-webcomponents/commit/7a00caf))
* **ui5-radiobutton:** fix focus outline in Compact & RTL ([#18](https://github.com/SAP/ui5-webcomponents/issues/18)) ([9afa81b](https://github.com/SAP/ui5-webcomponents/commit/9afa81b))
* **ui5-select:** prevent scrolling upon ALt+ArrowDown/Up/F4 ([#7](https://github.com/SAP/ui5-webcomponents/issues/7)) ([c22eae1](https://github.com/SAP/ui5-webcomponents/commit/c22eae1))
* **ui5-select:** fix selection, styling and playground sample ([#4](https://github.com/SAP/ui5-webcomponents/issues/4)) ([f0a90b7](https://github.com/SAP/ui5-webcomponents/commit/f0a90b7))
* **ui5-tabcontainer:** wait for ui5-popover definition ([#46](https://github.com/SAP/ui5-webcomponents/issues/46)) ([a6f5c2b](https://github.com/SAP/ui5-webcomponents/commit/a6f5c2b))
* **ui5-tabcontainer:** click on left arrow correctly scrolls to left in textOnly ([#97](https://github.com/SAP/ui5-webcomponents/issues/97)) ([a89de1a](https://github.com/SAP/ui5-webcomponents/commit/a89de1a))
* **ui5-textarea:** focus outline with character counter ([#32](https://github.com/SAP/ui5-webcomponents/issues/32)) ([0900483](https://github.com/SAP/ui5-webcomponents/commit/0900483))


### BREAKING CHANGES

* any applications that wants to support Edge and/or IE11 should now import the respective browser support module. For details, see the [README.md](/README.md#browser-support)
* **ui5-tabcontainer:** The TabContainer "selected-key" and Tab "key" properties are removed. Use TabContainer "selectedIndex" property (selected-index attribute) to set and get the selected tab.
* addCustomCSS is no longer on the Core object. Use Theming instead. [#58](https://github.com/SAP/ui5-webcomponents/pull/58)
