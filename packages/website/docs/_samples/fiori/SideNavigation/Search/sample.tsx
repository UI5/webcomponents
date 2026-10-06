import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState, useRef, useCallback } from "react";
import NavigationLayoutClass from "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import SideNavigationSearchFieldClass from "@ui5/webcomponents-fiori/dist/SideNavigationSearchField.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import "@ui5/webcomponents-icons/dist/menu.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/unfavorite.js";
import "@ui5/webcomponents-icons/dist/account.js";
import "@ui5/webcomponents-icons/dist/learning-assistant.js";
import "@ui5/webcomponents-icons/dist/crm-sales.js";
import "@ui5/webcomponents-icons/dist/customer-view.js";
import "@ui5/webcomponents-icons/dist/money-bills.js";
import "@ui5/webcomponents-icons/dist/manager-insight.js";
import "@ui5/webcomponents-icons/dist/bar-chart.js";
import "@ui5/webcomponents-icons/dist/discussion-2.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/customer-and-supplier.js";
import "@ui5/webcomponents-icons/dist/message-information.js";
import "@ui5/webcomponents-icons/dist/course-book.js";
import "@ui5/webcomponents-icons/dist/connected.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";

const NavigationLayout = createReactComponent(NavigationLayoutClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationGroup = createReactComponent(SideNavigationGroupClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const SideNavigationSearchField = createReactComponent(SideNavigationSearchFieldClass);
const Button = createReactComponent(ButtonClass);
const Tag = createReactComponent(TagClass);

interface NavNode {
  title: string;
  icon?: string;
  href?: string;
  target?: string;
  type?: "group";
  expanded?: boolean;
  selectable?: boolean;
  tagText?: string;
  tagState?: string;
  items?: NavNode[];
}

const data: { navigation: NavNode[]; fixedNavigation: NavNode[] } = {
  navigation: [
    { title: "Home", icon: "home", href: "#/home" },
    {
      type: "group",
      title: "Business Operations",
      expanded: true,
      items: [
        {
          title: "Favorites",
          icon: "unfavorite",
          expanded: true,
          selectable: false,
          tagText: "3 Items",
          tagState: "Indication17",
          items: [
            { title: "My Accounts", href: "#/myAccounts" },
            {
              title: "My Orders",
              href: "#/myOrders",
              tagText: "5 Pending",
              tagState: "Indication20",
            },
          ],
        },
        {
          title: "Customer Management",
          icon: "account",
          expanded: true,
          selectable: false,
          href: "#CustomerManagement",
          items: [
            { title: "Contacts", href: "#/contacts" },
            { title: "Companies", href: "#/companies" },
            { title: "Partners", href: "#/partners" },
          ],
        },
        {
          title: "SAP Best Practices",
          icon: "learning-assistant",
          href: "https://sap.com",
          target: "_blank",
          selectable: false,
        },
        {
          title: "Sales",
          icon: "crm-sales",
          expanded: true,
          selectable: false,
          href: "#/Sales",
          items: [
            { title: "Leads", href: "#/leads" },
            { title: "Opportunities", href: "#/opportunities" },
            { title: "Quotes", href: "#/quotes" },
            { title: "Orders", href: "#/orders" },
            { title: "Invoices", href: "#/invoices" },
          ],
        },
        {
          title: "Products",
          icon: "customer-view",
          expanded: true,
          href: "#/products",
          tagText: "Low Stock",
          tagState: "Indication18",
          items: [
            { title: "Product Catalog", href: "#/productCatalog" },
            { title: "Pricing", href: "#/pricing" },
            { title: "Inventory Management", href: "#/inventoryManagement" },
          ],
        },
        {
          title: "Marketing",
          icon: "customer-view",
          expanded: true,
          selectable: false,
          href: "#/marketing",
          items: [
            { title: "Campaigns", href: "#/campaigns" },
            { title: "E-mail Marketing", href: "#/emailMarketing" },
            { title: "Marketing Automation", href: "#/marketingAutomation" },
          ],
        },
        {
          title: "Finance",
          icon: "money-bills",
          expanded: true,
          selectable: false,
          items: [
            { title: "Accounts Receivable", href: "#/accountsReceivable" },
            { title: "Accounts Payable", href: "#/accountsPayable" },
            { title: "Budget Planning", href: "#/budgetPlanning" },
            { title: "Tax Management", href: "#/taxManagement" },
          ],
        },
        {
          title: "Year-End Financial Reports",
          icon: "manager-insight",
          expanded: true,
          href: "#/reports",
          items: [
            { title: "Sales Reports", href: "#/salesReports" },
            { title: "Customer reports", href: "#/customerReports" },
          ],
        },
      ],
    },
    {
      type: "group",
      title: "System & Administration",
      expanded: true,
      items: [
        {
          title: "Analytics",
          icon: "bar-chart",
          href: "#/analytics",
          tagText: "Beta",
          tagState: "Indication15",
        },
        {
          title: "SAP Community",
          icon: "discussion-2",
          href: "https://sap.com",
          target: "_blank",
          selectable: false,
        },
        {
          title: "Administration",
          icon: "settings",
          selectable: false,
          items: [
            { title: "User Management", href: "#/userManagement" },
            { title: "System Configuration", href: "#/systemConfig" },
            { title: "Audit Log", href: "#/auditLog" },
          ],
        },
        {
          title: "Service Management",
          icon: "customer-and-supplier",
          selectable: false,
          items: [
            { title: "Service Tickets", href: "#/serviceTickets" },
            { title: "Knowledge Base", href: "#/knowledgeBase" },
            { title: "Service Contracts", href: "#/serviceContracts" },
          ],
        },
        {
          title: "Notifications",
          icon: "message-information",
          href: "#/notifications",
          tagText: "8 New",
          tagState: "Indication18",
        },
        {
          title: "SAP Training",
          icon: "course-book",
          href: "https://sap.com",
          target: "_blank",
          selectable: false,
        },
        {
          title: "Integration Hub",
          icon: "connected",
          href: "#/integrationHub",
          items: [
            { title: "API Management", href: "#/apiManagement" },
            { title: "Data Sync", href: "#/dataSync" },
          ],
        },
      ],
    },
  ],
  fixedNavigation: [
    { title: "Product Settings", icon: "settings", href: "#/productSettings" },
    {
      title: "SAP Support Portal",
      icon: "sys-help",
      tagText: "24/7",
      tagState: "Indication16",
      href: "https://sap.com",
      target: "_blank",
      selectable: false,
    },
  ],
};

// Map the "IndicationNN" tag states to the recommended ui5-tag colorScheme (5-10).
function tagColorScheme(tagState?: string): string {
  const map: Record<string, string> = {
    Indication15: "5",
    Indication16: "6",
    Indication17: "7",
    Indication18: "8",
    Indication19: "9",
    Indication20: "10",
  };
  return (tagState && map[tagState]) || "5";
}

function renderTag(node: NavNode) {
  if (!node.tagText) {
    return null;
  }
  return (
    <Tag
      slot="tag"
      design="Set2"
      colorScheme={tagColorScheme(node.tagState)}
      hideStateIcon={true}
    >
      {node.tagText}
    </Tag>
  );
}

// Keeps only the branches whose title/tag matches, preserving matching ancestors.
function filterItems(items: NavNode[] | undefined, value: string): NavNode[] {
  if (!items) {
    return [];
  }

  const lowerCaseValue = value.toLowerCase();

  return items.reduce<NavNode[]>((result, item) => {
    const titleMatches = item.title.toLowerCase().includes(lowerCaseValue);
    const tagTextMatches = !!item.tagText?.toLowerCase().includes(lowerCaseValue);

    if (titleMatches || tagTextMatches) {
      result.push(item);
    } else if (item.items) {
      const filteredChildren = filterItems(item.items, value);
      if (filteredChildren.length > 0) {
        result.push({ ...item, items: filteredChildren });
      }
    }

    return result;
  }, []);
}

function countItems(items: NavNode[] | undefined, value: string): number {
  if (!items) {
    return 0;
  }

  const lowerCaseValue = value.toLowerCase();

  return items.reduce((count, item) => {
    const titleMatches = item.title.toLowerCase().includes(lowerCaseValue);
    const tagTextMatches = !!item.tagText?.toLowerCase().includes(lowerCaseValue);
    return count + (titleMatches || tagTextMatches ? 1 : 0) + countItems(item.items, value);
  }, 0);
}

function renderSubItem(node: NavNode, index: number) {
  return (
    <SideNavigationSubItem
      key={index}
      text={node.title}
      href={node.href}
      target={node.target}
      unselectable={node.selectable === false}
    >
      {renderTag(node)}
    </SideNavigationSubItem>
  );
}

function renderItem(node: NavNode, index: number, slot?: string) {
  // Unselectable when explicitly marked, external (_blank), or an action item.
  const unselectable =
    node.selectable === false ||
    node.target === "_blank";

  return (
    <SideNavigationItem
      key={index}
      slot={slot}
      text={node.title}
      icon={node.icon}
      href={node.href}
      target={node.target}
      expanded={node.expanded}
      unselectable={unselectable}
    >
      {renderTag(node)}
      {(node.items || []).map(renderSubItem)}
    </SideNavigationItem>
  );
}

function renderNode(node: NavNode, index: number) {
  if (node.type === "group") {
    return (
      <SideNavigationGroup key={index} text={node.title} expanded={node.expanded}>
        {(node.items || []).map((child, childIndex) => renderItem(child, childIndex))}
      </SideNavigationGroup>
    );
  }
  return renderItem(node, index);
}

function App() {
  const [query, setQuery] = useState("");
  const layoutRef = useRef<InstanceType<typeof NavigationLayoutClass>>(null);
  const sideNavRef = useRef<InstanceType<typeof SideNavigationClass>>(null);

  const filteredNavigation = query
    ? filterItems(data.navigation.concat(data.fixedNavigation), query)
    : data.navigation;
  const filteredFixed = query ? [] : data.fixedNavigation;

  const handleStartButtonClick = useCallback(() => {
    const layout = layoutRef.current;
    if (!layout) {
      return;
    }
    if (layout.isSideCollapsed()) {
      layout.mode = "Expanded";
    } else {
      setQuery("");
      layout.mode = "Collapsed";
    }
  }, []);

  const handleInput = useCallback((e: Event) => {
    setQuery((e.target as HTMLInputElement).value);
  }, []);

  const handleSearch = useCallback((e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    if (!value) {
      return;
    }
    sideNavRef.current?.announceSearchMatchCount(
      countItems(data.navigation.concat(data.fixedNavigation), value)
    );
  }, []);

  return (
    <>
      <style>{`
        .content {
          padding: 1rem;
        }
      `}</style>
      <div style={{ position: "relative", height: "50rem" }}>
        <NavigationLayout ref={layoutRef}>
          <ShellBar slot="header" secondaryTitle="The Best Run SAP">
            <ShellBarBranding slot="branding">UI5 Web Components</ShellBarBranding>
            <Button
              icon="menu"
              slot="startButton"
              onClick={handleStartButtonClick}
            />
          </ShellBar>

          <SideNavigation
            ref={sideNavRef}
            slot="sideContent"
            accessibleName="Main Navigation"
            highlightedText={query}
          >
            <SideNavigationSearchField
              slot="filterSection"
              value={query}
              onInput={handleInput}
              onSearch={handleSearch}
            />
            {filteredNavigation.map(renderNode)}
            {filteredFixed.map((node, index) => renderItem(node, index, "fixedItems"))}
          </SideNavigation>

          <div className="content">
            <h2>Home</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
        </NavigationLayout>
      </div>
    </>
  );
}

export default App;
