// @ts-nocheck
import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
const importMessageBundle = async (localeId) => {
    switch (localeId) {
        case "ar": return (await fetch(new URL("../assets/i18n/messagebundle_ar.json", import.meta.url))).json();
        case "bg": return (await fetch(new URL("../assets/i18n/messagebundle_bg.json", import.meta.url))).json();
        case "ca": return (await fetch(new URL("../assets/i18n/messagebundle_ca.json", import.meta.url))).json();
        case "cnr": return (await fetch(new URL("../assets/i18n/messagebundle_cnr.json", import.meta.url))).json();
        case "cs": return (await fetch(new URL("../assets/i18n/messagebundle_cs.json", import.meta.url))).json();
        case "cy": return (await fetch(new URL("../assets/i18n/messagebundle_cy.json", import.meta.url))).json();
        case "da": return (await fetch(new URL("../assets/i18n/messagebundle_da.json", import.meta.url))).json();
        case "de": return (await fetch(new URL("../assets/i18n/messagebundle_de.json", import.meta.url))).json();
        case "el": return (await fetch(new URL("../assets/i18n/messagebundle_el.json", import.meta.url))).json();
        case "en": return (await fetch(new URL("../assets/i18n/messagebundle_en.json", import.meta.url))).json();
        case "en_GB": return (await fetch(new URL("../assets/i18n/messagebundle_en_GB.json", import.meta.url))).json();
        case "en_US_sappsd": return (await fetch(new URL("../assets/i18n/messagebundle_en_US_sappsd.json", import.meta.url))).json();
        case "en_US_saprigi": return (await fetch(new URL("../assets/i18n/messagebundle_en_US_saprigi.json", import.meta.url))).json();
        case "en_US_saptrc": return (await fetch(new URL("../assets/i18n/messagebundle_en_US_saptrc.json", import.meta.url))).json();
        case "es": return (await fetch(new URL("../assets/i18n/messagebundle_es.json", import.meta.url))).json();
        case "es_MX": return (await fetch(new URL("../assets/i18n/messagebundle_es_MX.json", import.meta.url))).json();
        case "et": return (await fetch(new URL("../assets/i18n/messagebundle_et.json", import.meta.url))).json();
        case "fi": return (await fetch(new URL("../assets/i18n/messagebundle_fi.json", import.meta.url))).json();
        case "fr": return (await fetch(new URL("../assets/i18n/messagebundle_fr.json", import.meta.url))).json();
        case "fr_CA": return (await fetch(new URL("../assets/i18n/messagebundle_fr_CA.json", import.meta.url))).json();
        case "hi": return (await fetch(new URL("../assets/i18n/messagebundle_hi.json", import.meta.url))).json();
        case "hr": return (await fetch(new URL("../assets/i18n/messagebundle_hr.json", import.meta.url))).json();
        case "hu": return (await fetch(new URL("../assets/i18n/messagebundle_hu.json", import.meta.url))).json();
        case "id": return (await fetch(new URL("../assets/i18n/messagebundle_id.json", import.meta.url))).json();
        case "it": return (await fetch(new URL("../assets/i18n/messagebundle_it.json", import.meta.url))).json();
        case "iw": return (await fetch(new URL("../assets/i18n/messagebundle_iw.json", import.meta.url))).json();
        case "ja": return (await fetch(new URL("../assets/i18n/messagebundle_ja.json", import.meta.url))).json();
        case "kk": return (await fetch(new URL("../assets/i18n/messagebundle_kk.json", import.meta.url))).json();
        case "ko": return (await fetch(new URL("../assets/i18n/messagebundle_ko.json", import.meta.url))).json();
        case "lt": return (await fetch(new URL("../assets/i18n/messagebundle_lt.json", import.meta.url))).json();
        case "lv": return (await fetch(new URL("../assets/i18n/messagebundle_lv.json", import.meta.url))).json();
        case "mk": return (await fetch(new URL("../assets/i18n/messagebundle_mk.json", import.meta.url))).json();
        case "ms": return (await fetch(new URL("../assets/i18n/messagebundle_ms.json", import.meta.url))).json();
        case "nl": return (await fetch(new URL("../assets/i18n/messagebundle_nl.json", import.meta.url))).json();
        case "no": return (await fetch(new URL("../assets/i18n/messagebundle_no.json", import.meta.url))).json();
        case "pl": return (await fetch(new URL("../assets/i18n/messagebundle_pl.json", import.meta.url))).json();
        case "pt": return (await fetch(new URL("../assets/i18n/messagebundle_pt.json", import.meta.url))).json();
        case "pt_PT": return (await fetch(new URL("../assets/i18n/messagebundle_pt_PT.json", import.meta.url))).json();
        case "ro": return (await fetch(new URL("../assets/i18n/messagebundle_ro.json", import.meta.url))).json();
        case "ru": return (await fetch(new URL("../assets/i18n/messagebundle_ru.json", import.meta.url))).json();
        case "sh": return (await fetch(new URL("../assets/i18n/messagebundle_sh.json", import.meta.url))).json();
        case "sk": return (await fetch(new URL("../assets/i18n/messagebundle_sk.json", import.meta.url))).json();
        case "sl": return (await fetch(new URL("../assets/i18n/messagebundle_sl.json", import.meta.url))).json();
        case "sr": return (await fetch(new URL("../assets/i18n/messagebundle_sr.json", import.meta.url))).json();
        case "sv": return (await fetch(new URL("../assets/i18n/messagebundle_sv.json", import.meta.url))).json();
        case "th": return (await fetch(new URL("../assets/i18n/messagebundle_th.json", import.meta.url))).json();
        case "tr": return (await fetch(new URL("../assets/i18n/messagebundle_tr.json", import.meta.url))).json();
        case "uk": return (await fetch(new URL("../assets/i18n/messagebundle_uk.json", import.meta.url))).json();
        case "vi": return (await fetch(new URL("../assets/i18n/messagebundle_vi.json", import.meta.url))).json();
        case "zh_CN": return (await fetch(new URL("../assets/i18n/messagebundle_zh_CN.json", import.meta.url))).json();
        case "zh_TW": return (await fetch(new URL("../assets/i18n/messagebundle_zh_TW.json", import.meta.url))).json();
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
    registerI18nLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "c" + "o" + "m" + "p" + "a" + "t", localeId, importAndCheck);
});
//# sourceMappingURL=i18n-fetch.js.map