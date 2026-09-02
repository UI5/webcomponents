import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import generateHighlightedMarkupFirstMatch from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkupFirstMatch.js";
import InputTableSuggestClass from "@ui5/webcomponents/dist/InputTableSuggest.js";
import TableHeaderRowClass from "@ui5/webcomponents/dist/TableHeaderRow.js";
import TableHeaderCellClass from "@ui5/webcomponents/dist/TableHeaderCell.js";
import TableRowClass from "@ui5/webcomponents/dist/TableRow.js";
import TableCellClass from "@ui5/webcomponents/dist/TableCell.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const InputTableSuggest = createReactComponent(InputTableSuggestClass);
const TableHeaderRow = createReactComponent(TableHeaderRowClass);
const TableHeaderCell = createReactComponent(TableHeaderCellClass);
const TableRow = createReactComponent(TableRowClass);
const TableCell = createReactComponent(TableCellClass);
const Avatar = createReactComponent(AvatarClass);
const Title = createReactComponent(TitleClass);
const Text = createReactComponent(TextClass);
const Label = createReactComponent(LabelClass);
const Tag = createReactComponent(TagClass);

const members = [
  { name: "Alice Brown", initials: "AB", color: "Accent1", role: "Senior Developer", team: "Engineering", location: "Building A", status: "Active", statusDesign: "Positive", statusColor: "8" },
  { name: "Anna Clark", initials: "AC", color: "Accent6", role: "UX Lead", team: "Design", location: "Building B", status: "Active", statusDesign: "Positive", statusColor: "8" },
  { name: "Adam Davis", initials: "AD", color: "Accent8", role: "Account Manager", team: "Sales", location: "Building C", status: "Away", statusDesign: "Critical", statusColor: "2" },
  { name: "Brian Evans", initials: "BE", color: "Accent3", role: "QA Engineer", team: "Engineering", location: "Building A", status: "Active", statusDesign: "Positive", statusColor: "8" },
  { name: "Bella Fox", initials: "BF", color: "Accent4", role: "Recruiter", team: "HR", location: "Building B", status: "Away", statusDesign: "Critical", statusColor: "2" },
] as const;

function App() {
  const [search, setSearch] = useState("");

  const handleInput = (e: UI5CustomEvent<InputTableSuggestClass, "input">) => {
    setSearch(e.currentTarget.value);
  };

  const query = search.trim().toLowerCase();

  return (
    <InputTableSuggest
      placeholder="Search team members by name..."
      showSuggestions
      style={{ width: "520px" }}
      onInput={handleInput}
    >
      <TableHeaderRow slot="suggestionColumns">
        <TableHeaderCell width="150px">Name</TableHeaderCell>
        <TableHeaderCell width="80px">Avatar</TableHeaderCell>
        <TableHeaderCell minWidth="160px">Role</TableHeaderCell>
        <TableHeaderCell width="120px">Location</TableHeaderCell>
        <TableHeaderCell width="100px">Status</TableHeaderCell>
      </TableHeaderRow>

      {members.map((member) => (
        <TableRow
          key={member.name}
          slot="suggestionRows"
          hidden={query.length > 0 && !member.name.toLowerCase().includes(query)}
        >
          <TableCell>
            {/* First column is plain text: highlight the matched substring. */}
            <span dangerouslySetInnerHTML={{ __html: generateHighlightedMarkupFirstMatch(member.name, search) }} />
          </TableCell>
          <TableCell>
            <Avatar size="XS" initials={member.initials} colorScheme={member.color} />
          </TableCell>
          <TableCell>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Title level="H6" size="H6">{member.role}</Title>
              <Text>{member.team}</Text>
            </div>
          </TableCell>
          <TableCell>
            <Label>{member.location}</Label>
          </TableCell>
          <TableCell>
            <Tag colorScheme={member.statusColor} design={member.statusDesign}>{member.status}</Tag>
          </TableCell>
        </TableRow>
      ))}
    </InputTableSuggest>
  );
}

export default App;
