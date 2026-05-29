import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useMemo, useState } from "react";

import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarItemClass from "@ui5/webcomponents/dist/ToolbarItem.js";

import "@ui5/webcomponents-icons/dist/cart.js";
import "@ui5/webcomponents-icons/dist/checklist.js";
import "@ui5/webcomponents-icons/dist/complete.js";
import "@ui5/webcomponents-icons/dist/credit-card.js";
import "@ui5/webcomponents-icons/dist/factory.js";
import "@ui5/webcomponents-icons/dist/process.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/shield.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";
import "@ui5/webcomponents-icons/dist/undo.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Bar = createReactComponent(BarClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const Token = createReactComponent(TokenClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarItem = createReactComponent(ToolbarItemClass);

type Entry = {
  id: string;
  titleText: string;
  subtitleText: string;
  icon: string;
  name: string;
  haystack: string;
};

const ENTRIES: Entry[] = [
  { id: "1", titleText: "Order placed", subtitleText: "03.11.2024 09:14", icon: "cart", name: "Maria Chen", haystack: "order placed maria chen" },
  { id: "2", titleText: "Payment confirmed", subtitleText: "03.11.2024 09:15", icon: "credit-card", name: "Payment Gateway", haystack: "payment confirmed gateway" },
  { id: "3", titleText: "Fraud check passed", subtitleText: "03.11.2024 09:16", icon: "shield", name: "System", haystack: "fraud check passed system" },
  { id: "4", titleText: "Warehouse notified", subtitleText: "03.11.2024 09:45", icon: "factory", name: "System", haystack: "warehouse notified system" },
  { id: "5", titleText: "Items picked", subtitleText: "03.11.2024 14:22", icon: "checklist", name: "Warehouse Team", haystack: "items picked warehouse team" },
  { id: "6", titleText: "Package dispatched", subtitleText: "03.11.2024 16:08", icon: "shipping-status", name: "Warehouse Team", haystack: "package dispatched warehouse shipping" },
  { id: "7", titleText: "In transit — sorting center", subtitleText: "04.11.2024 06:30", icon: "process", name: "Carrier", haystack: "in transit sorting center carrier" },
  { id: "8", titleText: "Out for delivery", subtitleText: "05.11.2024 08:12", icon: "shipping-status", name: "Carrier", haystack: "out for delivery carrier" },
  { id: "9", titleText: "Delivered", subtitleText: "05.11.2024 14:47", icon: "complete", name: "Carrier", haystack: "delivered carrier" },
  { id: "10", titleText: "Return requested", subtitleText: "08.11.2024 10:03", icon: "undo", name: "Maria Chen", haystack: "return requested maria chen" },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const visibleEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query === "") {
      return ENTRIES;
    }
    return ENTRIES.filter(entry => entry.haystack.includes(query));
  }, [searchQuery]);

  return (
    <Timeline stickyHeader stickyInfoBar style={{ height: "20rem" }}>
      <Toolbar slot="header">
        <ToolbarItem>
          <Input
            placeholder="Search order events"
            icon="search"
            value={searchQuery}
            onInput={event => setSearchQuery((event.target as HTMLInputElement).value)}
            style={{ width: "100%" }}
          />
        </ToolbarItem>
      </Toolbar>

      <Bar slot="infoBar" design="Subheader">
        <div slot="endContent" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem" }}>
          {searchQuery.trim() !== "" && (
            <Token
              text={`Search: "${searchQuery.trim()}"`}
              forcedTabIndex="0"
              selected
              onSelect={(e: any) => { e.target.selected = true; }}
              onDelete={() => setSearchQuery("")}
            />
          )}
          <Label>{`${visibleEntries.length} of ${ENTRIES.length} events`}</Label>
        </div>
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
  );
}

export default App;
