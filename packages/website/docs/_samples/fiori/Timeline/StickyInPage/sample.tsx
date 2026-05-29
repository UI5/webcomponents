import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useMemo, useState } from "react";

import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSelectClass from "@ui5/webcomponents/dist/ToolbarSelect.js";
import ToolbarSelectOptionClass from "@ui5/webcomponents/dist/ToolbarSelectOption.js";

import "@ui5/webcomponents-icons/dist/document-text.js";
import "@ui5/webcomponents-icons/dist/employee-approvals.js";
import "@ui5/webcomponents-icons/dist/employee-rejections.js";
import "@ui5/webcomponents-icons/dist/signature.js";
import "@ui5/webcomponents-icons/dist/to-be-reviewed.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Bar = createReactComponent(BarClass);
const Label = createReactComponent(LabelClass);
const Token = createReactComponent(TokenClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarSelect = createReactComponent(ToolbarSelectClass);
const ToolbarSelectOption = createReactComponent(ToolbarSelectOptionClass);

type Entry = {
  id: string;
  titleText: string;
  subtitleText: string;
  icon: string;
  name: string;
  status: string;
};

const ENTRIES: Entry[] = [
  { id: "1", titleText: "Purchase Order #4012 submitted", subtitleText: "10.12.2024 08:45", icon: "document-text", name: "Anna Weber", status: "Pending" },
  { id: "2", titleText: "Travel Expense #891 submitted", subtitleText: "10.12.2024 09:10", icon: "document-text", name: "Tom Berger", status: "Pending" },
  { id: "3", titleText: "Invoice #7734 approved", subtitleText: "10.12.2024 09:30", icon: "employee-approvals", name: "Carla Rossi", status: "Approved" },
  { id: "4", titleText: "Contract Amendment reviewed", subtitleText: "10.12.2024 10:15", icon: "to-be-reviewed", name: "Carla Rossi", status: "Pending" },
  { id: "5", titleText: "Budget Request #220 approved", subtitleText: "10.12.2024 11:02", icon: "employee-approvals", name: "Carla Rossi", status: "Approved" },
  { id: "6", titleText: "Vendor Onboarding rejected", subtitleText: "10.12.2024 11:40", icon: "employee-rejections", name: "Carla Rossi", status: "Rejected" },
  { id: "7", titleText: "NDA signed", subtitleText: "10.12.2024 13:05", icon: "signature", name: "Anna Weber", status: "Approved" },
  { id: "8", titleText: "Capital Expenditure #55 submitted", subtitleText: "10.12.2024 14:00", icon: "document-text", name: "Tom Berger", status: "Pending" },
  { id: "9", titleText: "Service Agreement approved", subtitleText: "10.12.2024 14:30", icon: "employee-approvals", name: "Carla Rossi", status: "Approved" },
  { id: "10", titleText: "Hiring Request #18 rejected", subtitleText: "10.12.2024 15:20", icon: "employee-rejections", name: "Carla Rossi", status: "Rejected" },
];

const STATUS_OPTIONS = ["", "Pending", "Approved", "Rejected"];
const STATUS_LABELS: Record<string, string> = { "": "All statuses", Pending: "Pending", Approved: "Approved", Rejected: "Rejected" };

function App() {
  const [activeStatus, setActiveStatus] = useState("");

  const visibleEntries = useMemo(() => {
    if (activeStatus === "") {
      return ENTRIES;
    }
    return ENTRIES.filter(entry => entry.status === activeStatus);
  }, [activeStatus]);

  return (
    <div style={{ height: "18rem", overflow: "auto", border: "1px solid var(--sapGroup_ContentBorderColor)", borderRadius: "0.5rem" }}>
      <Timeline stickyHeader>
        <Toolbar slot="header">
          <ToolbarSelect onChange={(e: any) => {
            const selected = e.detail?.selectedOption;
            setActiveStatus(selected?.getAttribute("data-status") || "");
          }}>
            {STATUS_OPTIONS.map(status => (
              <ToolbarSelectOption
                key={status}
                data-status={status}
                selected={status === activeStatus}
              >
                {STATUS_LABELS[status]}
              </ToolbarSelectOption>
            ))}
          </ToolbarSelect>
        </Toolbar>

        <Bar slot="infoBar" design="Subheader">
          <div slot="startContent" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem" }}>
            {activeStatus !== "" && (
              <Token
                text={activeStatus}
                forcedTabIndex="0"
                selected
                onSelect={(e: any) => { e.target.selected = true; }}
                onDelete={() => setActiveStatus("")}
              />
            )}
          </div>
          <Label slot="endContent">{`${visibleEntries.length} of ${ENTRIES.length} documents`}</Label>
        </Bar>

        {visibleEntries.map(entry => (
          <TimelineItem
            key={entry.id}
            titleText={entry.titleText}
            subtitleText={entry.subtitleText}
            icon={entry.icon}
            name={entry.name}
          />
        ))}
      </Timeline>
    </div>
  );
}

export default App;
