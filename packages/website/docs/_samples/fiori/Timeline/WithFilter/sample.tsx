import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useMemo, useState } from "react";

import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";
import ToolbarItemClass from "@ui5/webcomponents/dist/ToolbarItem.js";
import ToolbarSpacerClass from "@ui5/webcomponents/dist/ToolbarSpacer.js";

import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/cloud-check.js";
import "@ui5/webcomponents-icons/dist/cloud.js";
import "@ui5/webcomponents-icons/dist/complete.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/inspection.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/play.js";
import "@ui5/webcomponents-icons/dist/restart.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/status-positive.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const DateRangePicker = createReactComponent(DateRangePickerClass);
const Dialog = createReactComponent(DialogClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const Token = createReactComponent(TokenClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);
const ToolbarItem = createReactComponent(ToolbarItemClass);
const ToolbarSpacer = createReactComponent(ToolbarSpacerClass);

type Entry = {
  id: string;
  titleText: string;
  subtitleText: string;
  icon: string;
  name: string;
  env: string;
  haystack: string;
};

const ENTRIES: Entry[] = [
  { id: "1", titleText: "Build started", subtitleText: "15.11.2024 09:02", icon: "play", name: "CI Bot", env: "Development", haystack: "build started ci bot development" },
  { id: "2", titleText: "Unit tests passed", subtitleText: "15.11.2024 09:08", icon: "status-positive", name: "CI Bot", env: "Development", haystack: "unit tests passed ci bot development" },
  { id: "3", titleText: "Deployed to Development", subtitleText: "15.11.2024 09:12", icon: "cloud", name: "CI Bot", env: "Development", haystack: "deployed development ci bot" },
  { id: "4", titleText: "Integration tests passed", subtitleText: "15.11.2024 09:34", icon: "inspection", name: "CI Bot", env: "Development", haystack: "integration tests passed ci bot development" },
  { id: "5", titleText: "Deployed to Staging", subtitleText: "15.11.2024 10:01", icon: "cloud", name: "Elena Müller", env: "Staging", haystack: "deployed staging elena müller" },
  { id: "6", titleText: "Performance tests passed", subtitleText: "15.11.2024 10:45", icon: "status-positive", name: "CI Bot", env: "Staging", haystack: "performance tests passed ci bot staging" },
  { id: "7", titleText: "QA sign-off", subtitleText: "15.11.2024 14:20", icon: "accept", name: "Raj Patel", env: "Staging", haystack: "qa sign-off raj patel staging" },
  { id: "8", titleText: "Deployed to Production", subtitleText: "15.11.2024 15:00", icon: "cloud-check", name: "Elena Müller", env: "Production", haystack: "deployed production elena müller" },
  { id: "9", titleText: "Health check passed", subtitleText: "15.11.2024 15:03", icon: "status-positive", name: "CI Bot", env: "Production", haystack: "health check passed ci bot production" },
  { id: "10", titleText: "Error rate spike detected", subtitleText: "15.11.2024 15:47", icon: "message-error", name: "Monitoring", env: "Production", haystack: "error rate spike monitoring production" },
  { id: "11", titleText: "Rollback initiated", subtitleText: "15.11.2024 15:52", icon: "restart", name: "Elena Müller", env: "Production", haystack: "rollback initiated elena müller production" },
  { id: "12", titleText: "Rollback complete — stable", subtitleText: "15.11.2024 15:55", icon: "complete", name: "CI Bot", env: "Production", haystack: "rollback complete stable ci bot production" },
];

const ENVIRONMENTS = ["Production", "Staging", "Development"];

function parseDate(subtitleText: string): Date | null {
  const parts = subtitleText.match(/(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})/);
  if (!parts) return null;
  return new Date(Number(parts[3]), Number(parts[2]) - 1, Number(parts[1]), Number(parts[4]), Number(parts[5]));
}

function App() {
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const [activeEnvs, setActiveEnvs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null; display: string }>({ start: null, end: null, display: "" });
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [pendingEnvs, setPendingEnvs] = useState<string[]>([]);
  const [pendingDateValue, setPendingDateValue] = useState("");

  const visibleEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = ENTRIES.filter(entry => {
      const matchesEnv = activeEnvs.length === 0 || activeEnvs.includes(entry.env);
      const matchesSearch = query === "" || entry.haystack.includes(query);

      let matchesDate = true;
      if (dateRange.start && dateRange.end) {
        const itemDate = parseDate(entry.subtitleText);
        if (itemDate) {
          matchesDate = itemDate >= dateRange.start && itemDate <= dateRange.end;
        }
      }

      return matchesEnv && matchesSearch && matchesDate;
    });

    return filtered.slice().sort((a, b) => {
      return isNewestFirst
        ? b.subtitleText.localeCompare(a.subtitleText)
        : a.subtitleText.localeCompare(b.subtitleText);
    });
  }, [activeEnvs, searchQuery, isNewestFirst, dateRange]);

  const openFilterDialog = () => {
    setPendingEnvs([...activeEnvs]);
    setPendingDateValue(dateRange.display);
    setIsFilterDialogOpen(true);
  };

  const applyDialog = () => {
    setActiveEnvs(pendingEnvs);

    const pickerEl = document.querySelector("[ui5-daterange-picker]") as any;
    if (pickerEl && pickerEl.value) {
      const start = pickerEl.startDateValue;
      const end = pickerEl.endDateValue;
      if (start && end) {
        end.setHours(23, 59, 59);
        setDateRange({ start, end, display: pickerEl.value });
      }
    } else {
      setDateRange({ start: null, end: null, display: "" });
    }

    setIsFilterDialogOpen(false);
  };

  const togglePendingEnv = (env: string) => {
    setPendingEnvs(prev =>
      prev.includes(env)
        ? prev.filter(e => e !== env)
        : [...prev, env]
    );
  };

  return (
    <>
      <Timeline stickyHeader stickyInfoBar style={{ height: "22rem" }}>
        <Toolbar slot="header">
          <ToolbarItem>
            <Input
              placeholder="Search events"
              value={searchQuery}
              onInput={event => setSearchQuery((event.target as HTMLInputElement).value)}
              style={{ width: "14rem" }}
            />
          </ToolbarItem>
          <ToolbarSpacer />
          <ToolbarButton
            icon="sort"
            text={isNewestFirst ? "Newest first" : "Oldest first"}
            onClick={() => setIsNewestFirst(prev => !prev)}
          />
          <ToolbarButton
            icon="filter"
            text="Filter"
            onClick={openFilterDialog}
          />
        </Toolbar>

        <Bar slot="infoBar" design="Subheader">
          <div slot="startContent" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem" }}>
            {activeEnvs.map(env => (
              <Token
                key={env}
                text={env}
                forcedTabIndex="0"
                selected
                onSelect={(e: any) => { e.target.selected = true; }}
                onDelete={() => setActiveEnvs(prev => prev.filter(e => e !== env))}
              />
            ))}
            {dateRange.display && (
              <Token
                text={dateRange.display}
                forcedTabIndex="0"
                selected
                onSelect={(e: any) => { e.target.selected = true; }}
                onDelete={() => setDateRange({ start: null, end: null, display: "" })}
              />
            )}
            {searchQuery.trim() !== "" && (
              <Token
                text={`"${searchQuery.trim()}"`}
                forcedTabIndex="0"
                selected
                onSelect={(e: any) => { e.target.selected = true; }}
                onDelete={() => setSearchQuery("")}
              />
            )}
          </div>
          <Label slot="endContent">{`${visibleEntries.length} of ${ENTRIES.length} events`}</Label>
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

      <Dialog
        headerText="Filter pipeline events"
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
      >
        <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label showColon>Environment</Label>
            <List selectionMode="Multiple" style={{ marginTop: "0.5rem" }}>
              {ENVIRONMENTS.map(env => (
                <ListItemStandard
                  key={env}
                  selected={pendingEnvs.includes(env)}
                  onClick={() => togglePendingEnv(env)}
                >
                  {env}
                </ListItemStandard>
              ))}
            </List>
          </div>
          <div>
            <Label showColon>Time range</Label>
            <DateRangePicker
              value={pendingDateValue}
              onChange={(e: any) => setPendingDateValue(e.target.value)}
              placeholder="Select date range"
              style={{ marginTop: "0.5rem", width: "100%" }}
            />
          </div>
        </div>
        <div slot="footer" style={{ display: "flex", justifyContent: "flex-end", padding: "0.5rem", gap: "0.5rem" }}>
          <Button design="Emphasized" onClick={applyDialog}>Apply</Button>
          <Button onClick={() => setIsFilterDialogOpen(false)}>Cancel</Button>
        </div>
      </Dialog>
    </>
  );
}

export default App;
