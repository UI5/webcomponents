import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useMemo, useState } from "react";

import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";

import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/filter.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

type Entry = {
  id: string;
  titleText: string;
  subtitleText: string;
  author: string;
};

const ENTRIES: Entry[] = [
  { id: "1", titleText: "Project kickoff", subtitleText: "20.02.2017 09:00", author: "Stanislava Baltova" },
  { id: "2", titleText: "Design review", subtitleText: "22.02.2017 11:30", author: "Sarah Kerrigan" },
  { id: "3", titleText: "Sprint planning", subtitleText: "24.02.2017 14:00", author: "John Smith" },
  { id: "4", titleText: "Backlog grooming", subtitleText: "26.02.2017 10:00", author: "Stanislava Baltova" },
  { id: "5", titleText: "Demo to stakeholders", subtitleText: "28.02.2017 15:00", author: "Sarah Kerrigan" },
  { id: "6", titleText: "Retrospective", subtitleText: "01.03.2017 16:00", author: "John Smith" },
  { id: "7", titleText: "Release planning", subtitleText: "03.03.2017 09:30", author: "Stanislava Baltova" },
  { id: "8", titleText: "Deployment", subtitleText: "05.03.2017 12:00", author: "Sarah Kerrigan" },
];

const AUTHORS = ["Stanislava Baltova", "Sarah Kerrigan", "John Smith"];

function App() {
  const [isAscending, setIsAscending] = useState(true);
  const [activeAuthors, setActiveAuthors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingAuthors, setPendingAuthors] = useState<string[]>([]);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const visibleEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = ENTRIES.filter(entry => {
      const matchesAuthor = activeAuthors.length === 0 || activeAuthors.includes(entry.author);
      const matchesSearch = query === ""
        || entry.author.toLowerCase().includes(query)
        || entry.titleText.toLowerCase().includes(query);
      return matchesAuthor && matchesSearch;
    });

    return filtered.slice().sort((firstEntry, secondEntry) => {
      return isAscending
        ? firstEntry.subtitleText.localeCompare(secondEntry.subtitleText)
        : secondEntry.subtitleText.localeCompare(firstEntry.subtitleText);
    });
  }, [activeAuthors, searchQuery, isAscending]);

  const sortLabel = `Sort: ${isAscending ? "Ascending" : "Descending"}`;
  const filterLabel = activeAuthors.length === 0 ? "No filters" : `Filter: ${activeAuthors.join(", ")}`;
  const searchLabel = searchQuery.trim() === "" ? "No search" : `Search: "${searchQuery.trim()}"`;

  const openFilterDialog = () => {
    setPendingAuthors(activeAuthors);
    setIsFilterDialogOpen(true);
  };

  return (
    <>
      <Timeline stickyHeader stickyInfoBar style={{ height: "22rem" }}>
        <Bar slot="header" design="Subheader">
          <Input
            slot="startContent"
            placeholder="Search by author or title"
            value={searchQuery}
            onInput={event => setSearchQuery((event.target as HTMLInputElement).value)}
          />
          <Button slot="endContent" icon="sort" onClick={() => setIsAscending(prev => !prev)}>
            {sortLabel}
          </Button>
          <Button slot="endContent" icon="filter" onClick={openFilterDialog}>
            Filter
          </Button>
        </Bar>

        <Bar slot="infoBar" design="Subheader">
          <Label slot="startContent">{`${sortLabel} · ${filterLabel} · ${searchLabel}`}</Label>
        </Bar>

        {visibleEntries.map(entry => (
          <TimelineItem
            key={entry.id}
            titleText={entry.titleText}
            subtitleText={entry.subtitleText}
            icon="calendar"
            name={entry.author}
          />
        ))}
      </Timeline>

      <Dialog
        headerText="Filter by author"
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
      >
        <List selectionMode="Multiple">
          {AUTHORS.map(author => (
            <ListItemStandard
              key={author}
              selected={pendingAuthors.includes(author)}
              onClick={() => {
                setPendingAuthors(prev =>
                  prev.includes(author)
                    ? prev.filter(name => name !== author)
                    : [...prev, author]
                );
              }}
            >
              {author}
            </ListItemStandard>
          ))}
        </List>
        <div slot="footer" style={{ display: "flex", justifyContent: "flex-end", padding: "0.5rem", gap: "0.5rem" }}>
          <Button
            design="Emphasized"
            onClick={() => {
              setActiveAuthors(pendingAuthors);
              setIsFilterDialogOpen(false);
            }}
          >
            Apply
          </Button>
          <Button onClick={() => setIsFilterDialogOpen(false)}>Cancel</Button>
        </div>
      </Dialog>
    </>
  );
}

export default App;
