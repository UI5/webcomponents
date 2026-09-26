// @ts-nocheck
import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
const importMessageBundle = async (localeId) => {
    switch (localeId) {
        case "ar": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-ar" */ "../assets/i18n/messagebundle_ar.json", { with: { type: 'json' } })).default;
        case "bg": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-bg" */ "../assets/i18n/messagebundle_bg.json", { with: { type: 'json' } })).default;
        case "ca": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-ca" */ "../assets/i18n/messagebundle_ca.json", { with: { type: 'json' } })).default;
        case "cnr": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-cnr" */ "../assets/i18n/messagebundle_cnr.json", { with: { type: 'json' } })).default;
        case "cs": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-cs" */ "../assets/i18n/messagebundle_cs.json", { with: { type: 'json' } })).default;
        case "cy": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-cy" */ "../assets/i18n/messagebundle_cy.json", { with: { type: 'json' } })).default;
        case "da": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-da" */ "../assets/i18n/messagebundle_da.json", { with: { type: 'json' } })).default;
        case "de": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-de" */ "../assets/i18n/messagebundle_de.json", { with: { type: 'json' } })).default;
        case "el": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-el" */ "../assets/i18n/messagebundle_el.json", { with: { type: 'json' } })).default;
        case "en": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-en" */ "../assets/i18n/messagebundle_en.json", { with: { type: 'json' } })).default;
        case "en_GB": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-en_GB" */ "../assets/i18n/messagebundle_en_GB.json", { with: { type: 'json' } })).default;
        case "en_US_sappsd": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-en_US_sappsd" */ "../assets/i18n/messagebundle_en_US_sappsd.json", { with: { type: 'json' } })).default;
        case "en_US_saprigi": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-en_US_saprigi" */ "../assets/i18n/messagebundle_en_US_saprigi.json", { with: { type: 'json' } })).default;
        case "en_US_saptrc": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-en_US_saptrc" */ "../assets/i18n/messagebundle_en_US_saptrc.json", { with: { type: 'json' } })).default;
        case "es": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-es" */ "../assets/i18n/messagebundle_es.json", { with: { type: 'json' } })).default;
        case "es_MX": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-es_MX" */ "../assets/i18n/messagebundle_es_MX.json", { with: { type: 'json' } })).default;
        case "et": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-et" */ "../assets/i18n/messagebundle_et.json", { with: { type: 'json' } })).default;
        case "fi": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-fi" */ "../assets/i18n/messagebundle_fi.json", { with: { type: 'json' } })).default;
        case "fr": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-fr" */ "../assets/i18n/messagebundle_fr.json", { with: { type: 'json' } })).default;
        case "fr_CA": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-fr_CA" */ "../assets/i18n/messagebundle_fr_CA.json", { with: { type: 'json' } })).default;
        case "hi": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-hi" */ "../assets/i18n/messagebundle_hi.json", { with: { type: 'json' } })).default;
        case "hr": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-hr" */ "../assets/i18n/messagebundle_hr.json", { with: { type: 'json' } })).default;
        case "hu": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-hu" */ "../assets/i18n/messagebundle_hu.json", { with: { type: 'json' } })).default;
        case "id": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-id" */ "../assets/i18n/messagebundle_id.json", { with: { type: 'json' } })).default;
        case "it": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-it" */ "../assets/i18n/messagebundle_it.json", { with: { type: 'json' } })).default;
        case "iw": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-iw" */ "../assets/i18n/messagebundle_iw.json", { with: { type: 'json' } })).default;
        case "ja": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-ja" */ "../assets/i18n/messagebundle_ja.json", { with: { type: 'json' } })).default;
        case "kk": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-kk" */ "../assets/i18n/messagebundle_kk.json", { with: { type: 'json' } })).default;
        case "ko": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-ko" */ "../assets/i18n/messagebundle_ko.json", { with: { type: 'json' } })).default;
        case "lt": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-lt" */ "../assets/i18n/messagebundle_lt.json", { with: { type: 'json' } })).default;
        case "lv": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-lv" */ "../assets/i18n/messagebundle_lv.json", { with: { type: 'json' } })).default;
        case "mk": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-mk" */ "../assets/i18n/messagebundle_mk.json", { with: { type: 'json' } })).default;
        case "ms": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-ms" */ "../assets/i18n/messagebundle_ms.json", { with: { type: 'json' } })).default;
        case "nl": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-nl" */ "../assets/i18n/messagebundle_nl.json", { with: { type: 'json' } })).default;
        case "no": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-no" */ "../assets/i18n/messagebundle_no.json", { with: { type: 'json' } })).default;
        case "pl": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-pl" */ "../assets/i18n/messagebundle_pl.json", { with: { type: 'json' } })).default;
        case "pt": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-pt" */ "../assets/i18n/messagebundle_pt.json", { with: { type: 'json' } })).default;
        case "pt_PT": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-pt_PT" */ "../assets/i18n/messagebundle_pt_PT.json", { with: { type: 'json' } })).default;
        case "ro": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-ro" */ "../assets/i18n/messagebundle_ro.json", { with: { type: 'json' } })).default;
        case "ru": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-ru" */ "../assets/i18n/messagebundle_ru.json", { with: { type: 'json' } })).default;
        case "sh": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-sh" */ "../assets/i18n/messagebundle_sh.json", { with: { type: 'json' } })).default;
        case "sk": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-sk" */ "../assets/i18n/messagebundle_sk.json", { with: { type: 'json' } })).default;
        case "sl": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-sl" */ "../assets/i18n/messagebundle_sl.json", { with: { type: 'json' } })).default;
        case "sr": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-sr" */ "../assets/i18n/messagebundle_sr.json", { with: { type: 'json' } })).default;
        case "sv": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-sv" */ "../assets/i18n/messagebundle_sv.json", { with: { type: 'json' } })).default;
        case "th": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-th" */ "../assets/i18n/messagebundle_th.json", { with: { type: 'json' } })).default;
        case "tr": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-tr" */ "../assets/i18n/messagebundle_tr.json", { with: { type: 'json' } })).default;
        case "uk": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-uk" */ "../assets/i18n/messagebundle_uk.json", { with: { type: 'json' } })).default;
        case "vi": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-vi" */ "../assets/i18n/messagebundle_vi.json", { with: { type: 'json' } })).default;
        case "zh_CN": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-zh_CN" */ "../assets/i18n/messagebundle_zh_CN.json", { with: { type: 'json' } })).default;
        case "zh_TW": return (await import(/* webpackChunkName: "ui5-webcomponents-messagebundle-zh_TW" */ "../assets/i18n/messagebundle_zh_TW.json", { with: { type: 'json' } })).default;
        default: throw "unknown locale";
    }
};
const importAndCheck = async (localeId) => {
    const data = await importMessageBundle(localeId);
    if (typeof data === "string" && data.endsWith(".json")) {
        throw new Error(`[i18n] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the "Assets" documentation for more information.`);
    }
    return data;
};
const localeIds = ["ar",
    "bg",
    "ca",
    "cnr",
    "cs",
    "cy",
    "da",
    "de",
    "el",
    "en",
    "en_GB",
    "en_US_sappsd",
    "en_US_saprigi",
    "en_US_saptrc",
    "es",
    "es_MX",
    "et",
    "fi",
    "fr",
    "fr_CA",
    "hi",
    "hr",
    "hu",
    "id",
    "it",
    "iw",
    "ja",
    "kk",
    "ko",
    "lt",
    "lv",
    "mk",
    "ms",
    "nl",
    "no",
    "pl",
    "pt",
    "pt_PT",
    "ro",
    "ru",
    "sh",
    "sk",
    "sl",
    "sr",
    "sv",
    "th",
    "tr",
    "uk",
    "vi",
    "zh_CN",
    "zh_TW",];
localeIds.forEach(localeId => {
    registerI18nLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", localeId, importAndCheck);
});
//# sourceMappingURL=i18n-node.js.map