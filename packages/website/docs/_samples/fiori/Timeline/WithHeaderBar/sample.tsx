import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState } from "react";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import TimelineHeaderBarClass from "@ui5/webcomponents-fiori/dist/TimelineHeaderBar.js";
import TimelineFilterOptionClass from "@ui5/webcomponents-fiori/dist/TimelineFilterOption.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/developer-settings.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/document.js";
import "@ui5/webcomponents-icons/dist/upload.js";
import "@ui5/webcomponents-icons/dist/group.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const TimelineHeaderBar = createReactComponent(TimelineHeaderBarClass);
const TimelineFilterOption = createReactComponent(TimelineFilterOptionClass);

const allItems = [
	{ titleText: "Sprint Planning", subtitleText: "10.03.2024 09:00", icon: "calendar", name: "Sarah Chen", category: "Meetings", date: "2024-03-10T09:00", content: "Kick-off for Sprint 24. Estimated velocity: 42 story points." },
	{ titleText: "Code Review Session", subtitleText: "10.03.2024 11:30", icon: "developer-settings", name: "James Rivera", category: "Development", date: "2024-03-10T11:30", content: "Review pull request for authentication module" },
	{ titleText: "Client Requirements Call", subtitleText: "10.03.2024 14:00", icon: "phone", name: "Emily Watson", category: "Meetings", date: "2024-03-10T14:00", content: "Discussed Q2 roadmap priorities" },
	{ titleText: "API Documentation Update", subtitleText: "10.03.2024 16:00", icon: "document", name: "Arun Patel", category: "Development", date: "2024-03-10T16:00", content: "Added OpenAPI specs for new endpoints" },
	{ titleText: "Deploy v2.5.1 to Staging", subtitleText: "11.03.2024 06:00", icon: "upload", name: "DevOps Pipeline", category: "Releases", date: "2024-03-11T06:00", state: "Positive" as const, content: "Staging deployment successful. Smoke tests passed." },
	{ titleText: "Post-Release Retrospective", subtitleText: "12.03.2024 09:00", icon: "group", name: "Full Team", category: "Meetings", date: "2024-03-12T09:00", content: "Key takeaway: improve staging parity with prod." },
];

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [sortOrder, setSortOrder] = useState("Ascending");

	const visibleItems = allItems
		.filter((item) => {
			const text = [item.titleText, item.name, item.subtitleText, item.content]
				.join(" ").toLowerCase();
			const matchesSearch = !searchQuery || text.includes(searchQuery);
			const matchesCategory = selectedCategories.length === 0
				|| selectedCategories.includes(item.category);
			return matchesSearch && matchesCategory;
		})
		.sort((itemA, itemB) => {
			const dateA = new Date(itemA.date).getTime();
			const dateB = new Date(itemB.date).getTime();
			return sortOrder === "Ascending" ? dateA - dateB : dateB - dateA;
		});

	const handleSearch = (event: UI5CustomEvent<TimelineClass, "search">) => {
		setSearchQuery(event.detail.value.toLowerCase());
	};

	const handleFilter = (event: UI5CustomEvent<TimelineClass, "filter">) => {
		setSelectedCategories(event.detail.selectedOptions);
	};

	const handleSort = (event: UI5CustomEvent<TimelineClass, "sort">) => {
		setSortOrder(event.detail.sortOrder);
	};

	return (
		<>
			<Timeline onSearch={handleSearch} onFilter={handleFilter} onSort={handleSort}>
				<TimelineHeaderBar slot="headerBar" showSearch={true} showFilter={true} showSort={true} filterBy="Category">
					<TimelineFilterOption text="Meetings" />
					<TimelineFilterOption text="Development" />
					<TimelineFilterOption text="Releases" />
				</TimelineHeaderBar>

				{visibleItems.map((item, index) => (
					<TimelineItem
						key={index}
						titleText={item.titleText}
						subtitleText={item.subtitleText}
						icon={item.icon}
						name={item.name}
						state={item.state}
					>
						{item.content}
					</TimelineItem>
				))}
			</Timeline>
		</>
	);
}

export default App;
