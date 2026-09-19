// @ts-nocheck
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
export const loadIllustration = async (illustrationName) => {
    const collectionAndPrefix = "tnt/V5/HC/";
    const cleanIllustrationName = illustrationName.startsWith(collectionAndPrefix) ? illustrationName.replace(collectionAndPrefix, "") : illustrationName;
    switch (cleanIllustrationName) {
        case "Avatar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-avatar" */ "../../illustrations-v5/tnt/hc/Avatar.js")).default;
        case "Calculator": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-calculator" */ "../../illustrations-v5/tnt/hc/Calculator.js")).default;
        case "ChartArea": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartarea" */ "../../illustrations-v5/tnt/hc/ChartArea.js")).default;
        case "ChartArea2": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartarea2" */ "../../illustrations-v5/tnt/hc/ChartArea2.js")).default;
        case "ChartBPMNFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartbpmnflow" */ "../../illustrations-v5/tnt/hc/ChartBPMNFlow.js")).default;
        case "ChartBar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartbar" */ "../../illustrations-v5/tnt/hc/ChartBar.js")).default;
        case "ChartBullet": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartbullet" */ "../../illustrations-v5/tnt/hc/ChartBullet.js")).default;
        case "ChartDoughnut": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartdoughnut" */ "../../illustrations-v5/tnt/hc/ChartDoughnut.js")).default;
        case "ChartFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartflow" */ "../../illustrations-v5/tnt/hc/ChartFlow.js")).default;
        case "ChartGantt": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartgantt" */ "../../illustrations-v5/tnt/hc/ChartGantt.js")).default;
        case "ChartOrg": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartorg" */ "../../illustrations-v5/tnt/hc/ChartOrg.js")).default;
        case "ChartPie": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartpie" */ "../../illustrations-v5/tnt/hc/ChartPie.js")).default;
        case "CodePlaceholder": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-codeplaceholder" */ "../../illustrations-v5/tnt/hc/CodePlaceholder.js")).default;
        case "Company": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-company" */ "../../illustrations-v5/tnt/hc/Company.js")).default;
        case "Compass": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-compass" */ "../../illustrations-v5/tnt/hc/Compass.js")).default;
        case "Components": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-components" */ "../../illustrations-v5/tnt/hc/Components.js")).default;
        case "Dialog": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-dialog" */ "../../illustrations-v5/tnt/hc/Dialog.js")).default;
        case "EmptyContentPane": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-emptycontentpane" */ "../../illustrations-v5/tnt/hc/EmptyContentPane.js")).default;
        case "ExternalLink": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-externallink" */ "../../illustrations-v5/tnt/hc/ExternalLink.js")).default;
        case "FaceID": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-faceid" */ "../../illustrations-v5/tnt/hc/FaceID.js")).default;
        case "Fingerprint": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-fingerprint" */ "../../illustrations-v5/tnt/hc/Fingerprint.js")).default;
        case "Handshake": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-handshake" */ "../../illustrations-v5/tnt/hc/Handshake.js")).default;
        case "Help": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-help" */ "../../illustrations-v5/tnt/hc/Help.js")).default;
        case "Lock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-lock" */ "../../illustrations-v5/tnt/hc/Lock.js")).default;
        case "Mission": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-mission" */ "../../illustrations-v5/tnt/hc/Mission.js")).default;
        case "MissionFailed": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-missionfailed" */ "../../illustrations-v5/tnt/hc/MissionFailed.js")).default;
        case "NoApplications": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-noapplications" */ "../../illustrations-v5/tnt/hc/NoApplications.js")).default;
        case "NoFlows": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-noflows" */ "../../illustrations-v5/tnt/hc/NoFlows.js")).default;
        case "NoUsers": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-nousers" */ "../../illustrations-v5/tnt/hc/NoUsers.js")).default;
        case "Radar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-radar" */ "../../illustrations-v5/tnt/hc/Radar.js")).default;
        case "RoadMap": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-roadmap" */ "../../illustrations-v5/tnt/hc/RoadMap.js")).default;
        case "Secrets": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-secrets" */ "../../illustrations-v5/tnt/hc/Secrets.js")).default;
        case "Services": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-services" */ "../../illustrations-v5/tnt/hc/Services.js")).default;
        case "SessionExpired": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-sessionexpired" */ "../../illustrations-v5/tnt/hc/SessionExpired.js")).default;
        case "SessionExpiring": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-sessionexpiring" */ "../../illustrations-v5/tnt/hc/SessionExpiring.js")).default;
        case "Settings": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-settings" */ "../../illustrations-v5/tnt/hc/Settings.js")).default;
        case "Success": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-success" */ "../../illustrations-v5/tnt/hc/Success.js")).default;
        case "SuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-successfulauth" */ "../../illustrations-v5/tnt/hc/SuccessfulAuth.js")).default;
        case "Systems": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-systems" */ "../../illustrations-v5/tnt/hc/Systems.js")).default;
        case "Teams": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-teams" */ "../../illustrations-v5/tnt/hc/Teams.js")).default;
        case "Tools": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tools" */ "../../illustrations-v5/tnt/hc/Tools.js")).default;
        case "Tutorials": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tutorials" */ "../../illustrations-v5/tnt/hc/Tutorials.js")).default;
        case "Unlock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-unlock" */ "../../illustrations-v5/tnt/hc/Unlock.js")).default;
        case "UnsuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-unsuccessfulauth" */ "../../illustrations-v5/tnt/hc/UnsuccessfulAuth.js")).default;
        default:
            throw new Error("[Illustrations] Illustration not found: " + illustrationName);
    }
};
const loadAndCheck = async (illustrationName) => {
    const data = await loadIllustration(illustrationName);
    return data;
};
["Avatar", "Calculator", "ChartArea", "ChartArea2", "ChartBPMNFlow", "ChartBar", "ChartBullet", "ChartDoughnut", "ChartFlow", "ChartGantt", "ChartOrg", "ChartPie", "CodePlaceholder", "Company", "Compass", "Components", "Dialog", "EmptyContentPane", "ExternalLink", "FaceID", "Fingerprint", "Handshake", "Help", "Lock", "Mission", "MissionFailed", "NoApplications", "NoFlows", "NoUsers", "Radar", "RoadMap", "Secrets", "Services", "SessionExpired", "SessionExpiring", "Settings", "Success", "SuccessfulAuth", "Systems", "Teams", "Tools", "Tutorials", "Unlock", "UnsuccessfulAuth"].forEach((illustrationName) => registerIllustrationLoader(`tnt/V5/HC/${illustrationName}`, loadAndCheck));
//# sourceMappingURL=IllustrationsV5TNTHC.js.map