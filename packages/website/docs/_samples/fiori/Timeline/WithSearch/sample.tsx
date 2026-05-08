import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState } from "react";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import TimelineHeaderBarClass from "@ui5/webcomponents-fiori/dist/TimelineHeaderBar.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/developer-settings.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/upload.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const TimelineHeaderBar = createReactComponent(TimelineHeaderBarClass);

const allItems = [
	{ titleText: "Sprint Planning", subtitleText: "10.03.2024 09:00", icon: "calendar", name: "Sarah Chen", content: "Kick-off for Sprint 24. Estimated velocity: 42 story points." },
	{ titleText: "Code Review Session", subtitleText: "10.03.2024 11:30", icon: "developer-settings", name: "James Rivera", content: "Review pull request for authentication module" },
	{ titleText: "Client Requirements Call", subtitleText: "10.03.2024 14:00", icon: "phone", name: "Emily Watson", content: "Discussed Q2 roadmap priorities" },
	{ titleText: "Production Deploy", subtitleText: "11.03.2024 09:00", icon: "upload", name: "DevOps Team", content: "Deploy hotfix v2.5.1 to production environment" },
];

function App() {
	const [searchQuery, setSearchQuery] = useState("");

	const visibleItems = allItems.filter((item) => {
		if (!searchQuery) return true;
		const text = [item.titleText, item.name, item.subtitleText, item.content]
			.join(" ").toLowerCase();
		return text.includes(searchQuery);
	});

	const handleSearch = (event: UI5CustomEvent<TimelineClass, "search">) => {
		setSearchQuery(event.detail.value.toLowerCase());
	};

	return (
		<>
			<Timeline onSearch={handleSearch}>
				<TimelineHeaderBar slot="headerBar" showSearch={true} />

				{visibleItems.map((item, index) => (
					<TimelineItem
						key={index}
						titleText={item.titleText}
						subtitleText={item.subtitleText}
						icon={item.icon}
						name={item.name}
					>
						{item.content}
					</TimelineItem>
				))}
			</Timeline>
		</>
	);
}

export default App;
