import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useRef, useState } from "react";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/calendar.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Label = createReactComponent(LabelClass);

const itemToLoad = 5;

function App() {
  const timelineRef = useRef(null);
  const [extraItems, setExtraItems] = useState<
    { titleText: string; subtitleText: string; icon: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const itemsLoadedRef = useRef(0);

  const handleGrowingTimelineLoadMore = () => {
    setLoading(true);

    setTimeout(() => {
      const newItems = [];
      for (
        let i = itemsLoadedRef.current;
        i < itemsLoadedRef.current + itemToLoad;
        i++
      ) {
        newItems.push({
          titleText: "Title text",
          subtitleText: "The subtitle text goes here " + i,
          icon: "calendar",
        });
      }
      itemsLoadedRef.current += itemToLoad;
      setExtraItems((prev) => [...prev, ...newItems]);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <div style={{ height: "300px" }}>
        <Timeline
          ref={timelineRef}
          id="growingTimeline"
          layout="Vertical"
          growing="Scroll"
          loadingDelay={0}
          loading={loading}
          onLoadMore={handleGrowingTimelineLoadMore}
        >
          <TimelineItem
            titleText="called"
            subtitleText="20.02.2017 11:30"
            icon="phone"
            name="Stanislava Baltova"
            nameClickable={true}
          />
          <TimelineItem
            titleText="called"
            subtitleText="20.02.2017 11:30"
            icon="phone"
            name="Stanislava Baltova"
          />

          <TimelineItem
            titleText="Weekly Sync - CP Design"
            subtitleText="27.08.2017 (11:00 - 12:00)"
            icon="calendar"
          >
            <Label>MR SOF02 2.43</Label>
          </TimelineItem>

          <TimelineItem
            titleText="Video Conference Call - UI5"
            subtitleText="31.01.2018 (12:00 - 13:00)"
            icon="calendar"
            name="Stanislava Baltova"
          >
            Online meeting
          </TimelineItem>
          {extraItems.map((item, index) => (
            <TimelineItem
              key={index}
              titleText={item.titleText}
              subtitleText={item.subtitleText}
              icon={item.icon}
            />
          ))}
        </Timeline>
      </div>
    </>
  );
}

export default App;
