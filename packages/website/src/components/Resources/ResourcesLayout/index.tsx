import "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import "@ui5/webcomponents-fiori/dist/Page.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";

export default function ResourceLayout({ children }: { children: React.ReactNode }) {
    return (
        <ui5-navigation-layout>
            <ui5-shellbar slot="header">
                <ui5-shellbar-branding slot="branding" href="/resources">
                    Resources
                </ui5-shellbar-branding>
            </ui5-shellbar>
            <ui5-side-navigation slot="sideContent">
                <ui5-side-navigation-group text="Icons" expanded={true}>
                    <ui5-side-navigation-item text="SAP Icons" href="/resources/icons/SAP-icons"></ui5-side-navigation-item>
                    <ui5-side-navigation-item text="SAP TNT Icons" href="/resources/icons/tnt"></ui5-side-navigation-item>
                    <ui5-side-navigation-item text="SAP BSuite Icons" href="/resources/icons/business-suite"></ui5-side-navigation-item>
                </ui5-side-navigation-group>
                <ui5-side-navigation-group text="Illustrations" expanded={true}>
                    <ui5-side-navigation-item text="SAP Design" href="/resources/illustrations/fiori"></ui5-side-navigation-item>
                    <ui5-side-navigation-item text="SAP TNT" href="/resources/illustrations/tnt"></ui5-side-navigation-item>
                </ui5-side-navigation-group>
            </ui5-side-navigation>
            <ui5-page>
                    {children}
            </ui5-page>
        </ui5-navigation-layout>
    )
}