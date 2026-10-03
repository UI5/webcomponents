// @ts-nocheck
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
export const loadIllustration = async (illustrationName) => {
    const collectionAndPrefix = "tnt/V4/";
    const cleanIllustrationName = illustrationName.startsWith(collectionAndPrefix) ? illustrationName.replace(collectionAndPrefix, "") : illustrationName;
    switch (cleanIllustrationName) {
        case "Avatar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-avatar" */ "../../illustrations/tnt/Avatar.js")).default;
        case "Calculator": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-calculator" */ "../../illustrations/tnt/Calculator.js")).default;
        case "ChartArea": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartarea" */ "../../illustrations/tnt/ChartArea.js")).default;
        case "ChartArea2": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartarea2" */ "../../illustrations/tnt/ChartArea2.js")).default;
        case "ChartBPMNFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartbpmnflow" */ "../../illustrations/tnt/ChartBPMNFlow.js")).default;
        case "ChartBar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartbar" */ "../../illustrations/tnt/ChartBar.js")).default;
        case "ChartBullet": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartbullet" */ "../../illustrations/tnt/ChartBullet.js")).default;
        case "ChartDoughnut": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartdoughnut" */ "../../illustrations/tnt/ChartDoughnut.js")).default;
        case "ChartFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartflow" */ "../../illustrations/tnt/ChartFlow.js")).default;
        case "ChartGantt": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartgantt" */ "../../illustrations/tnt/ChartGantt.js")).default;
        case "ChartOrg": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartorg" */ "../../illustrations/tnt/ChartOrg.js")).default;
        case "ChartPie": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartpie" */ "../../illustrations/tnt/ChartPie.js")).default;
        case "CodePlaceholder": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-codeplaceholder" */ "../../illustrations/tnt/CodePlaceholder.js")).default;
        case "Company": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-company" */ "../../illustrations/tnt/Company.js")).default;
        case "Compass": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-compass" */ "../../illustrations/tnt/Compass.js")).default;
        case "Components": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-components" */ "../../illustrations/tnt/Components.js")).default;
        case "Dialog": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-dialog" */ "../../illustrations/tnt/Dialog.js")).default;
        case "EmptyContentPane": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-emptycontentpane" */ "../../illustrations/tnt/EmptyContentPane.js")).default;
        case "ExternalLink": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-externallink" */ "../../illustrations/tnt/ExternalLink.js")).default;
        case "FaceID": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-faceid" */ "../../illustrations/tnt/FaceID.js")).default;
        case "Fingerprint": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-fingerprint" */ "../../illustrations/tnt/Fingerprint.js")).default;
        case "Handshake": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-handshake" */ "../../illustrations/tnt/Handshake.js")).default;
        case "Help": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-help" */ "../../illustrations/tnt/Help.js")).default;
        case "Lock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-lock" */ "../../illustrations/tnt/Lock.js")).default;
        case "Mission": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-mission" */ "../../illustrations/tnt/Mission.js")).default;
        case "MissionFailed": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-missionfailed" */ "../../illustrations/tnt/MissionFailed.js")).default;
        case "NoApplications": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-noapplications" */ "../../illustrations/tnt/NoApplications.js")).default;
        case "NoFlows": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-noflows" */ "../../illustrations/tnt/NoFlows.js")).default;
        case "NoUsers": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-nousers" */ "../../illustrations/tnt/NoUsers.js")).default;
        case "Radar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-radar" */ "../../illustrations/tnt/Radar.js")).default;
        case "RoadMap": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-roadmap" */ "../../illustrations/tnt/RoadMap.js")).default;
        case "Secrets": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-secrets" */ "../../illustrations/tnt/Secrets.js")).default;
        case "Services": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-services" */ "../../illustrations/tnt/Services.js")).default;
        case "SessionExpired": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-sessionexpired" */ "../../illustrations/tnt/SessionExpired.js")).default;
        case "SessionExpiring": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-sessionexpiring" */ "../../illustrations/tnt/SessionExpiring.js")).default;
        case "Settings": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-settings" */ "../../illustrations/tnt/Settings.js")).default;
        case "Success": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-success" */ "../../illustrations/tnt/Success.js")).default;
        case "SuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-successfulauth" */ "../../illustrations/tnt/SuccessfulAuth.js")).default;
        case "Systems": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-systems" */ "../../illustrations/tnt/Systems.js")).default;
        case "Teams": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-teams" */ "../../illustrations/tnt/Teams.js")).default;
        case "Tools": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tools" */ "../../illustrations/tnt/Tools.js")).default;
        case "Tutorials": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tutorials" */ "../../illustrations/tnt/Tutorials.js")).default;
        case "UnableToLoad": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-unabletoload" */ "../../illustrations/tnt/UnableToLoad.js")).default;
        case "Unlock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-unlock" */ "../../illustrations/tnt/Unlock.js")).default;
        case "UnsuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-unsuccessfulauth" */ "../../illustrations/tnt/UnsuccessfulAuth.js")).default;
        case "User2": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-user2" */ "../../illustrations/tnt/User2.js")).default;
        default:
            throw new Error("[Illustrations] Illustration not found: " + illustrationName);
    }
};
const loadAndCheck = async (illustrationName) => {
    const data = await loadIllustration(illustrationName);
    return data;
};
["Avatar", "Calculator", "ChartArea", "ChartArea2", "ChartBPMNFlow", "ChartBar", "ChartBullet", "ChartDoughnut", "ChartFlow", "ChartGantt", "ChartOrg", "ChartPie", "CodePlaceholder", "Company", "Compass", "Components", "Dialog", "EmptyContentPane", "ExternalLink", "FaceID", "Fingerprint", "Handshake", "Help", "Lock", "Mission", "MissionFailed", "NoApplications", "NoFlows", "NoUsers", "Radar", "RoadMap", "Secrets", "Services", "SessionExpired", "SessionExpiring", "Settings", "Success", "SuccessfulAuth", "Systems", "Teams", "Tools", "Tutorials", "UnableToLoad", "Unlock", "UnsuccessfulAuth", "User2"].forEach((illustrationName) => registerIllustrationLoader(`tnt/V4/${illustrationName}`, loadAndCheck));
//# sourceMappingURL=IllustrationsTNT.js.map