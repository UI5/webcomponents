import { createReactComponent } from "@ui5/webcomponents-base";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import CarouselClass from "@ui5/webcomponents/dist/Carousel.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Avatar = createReactComponent(AvatarClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Carousel = createReactComponent(CarouselClass);
const Icon = createReactComponent(IconClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <Carousel cyclic={true} items-per-page="S1 M2 L3 XL3" arrows-placement="Navigation">
            <Card className="medium">
                <CardHeader slot="header" title-text="Activities" subtitle-text="For Today" />
                <Timeline>
                    <TimelineItem id="test-item" title-text="called" timestamp={1487583000000} icon="phone" name="John Smith" name-clickable="" />
                    <TimelineItem title-text="Weekly Sync - CP Design" timestamp={1517349600000} icon="calendar">MR
                        SOF02 2.43</TimelineItem>
                    <TimelineItem title-text="Video Conference Call - UI5" timestamp={1485813600000} icon="calendar">Online meeting</TimelineItem>
                </Timeline>
            </Card>
            <Card className="small">
                <CardHeader slot="header" title-text="David Williams" subtitle-text="Sales Manager">
                    <img src="/images/avatars/man_avatar_1.png" alt="" slot="avatar" />
                </CardHeader>
                <List separators="Inner">
                    <ListItemStandard icon="competitor" icon-end={true}>Personal Development</ListItemStandard>
                    <ListItemStandard icon="wallet" icon-end={true}>Finance</ListItemStandard>
                    <ListItemStandard icon="collaborate" icon-end={true}>Communications Skills</ListItemStandard>
                </List>
            </Card>
            <Card className="medium">
                <CardHeader slot="header" title-text="Team Dolphins" subtitle-text="Direct Reports" status="1 of 2">
                    <Icon name="group" slot="avatar" />
                </CardHeader>
                <List separators="None">
                    <ListItemStandard description="User Researcher">Alain Chevalier
                        <Avatar slot="image" shape="Square">
                            <img src="/images/avatars/man_avatar_1.png" alt="Woman image" />
                        </Avatar>
                    </ListItemStandard>
                    <ListItemStandard description="Artist">Monique Legrand
                        <Avatar slot="image" shape="Square">
                            <img src="/images/avatars/woman_avatar_1.png" alt="Woman image" />
                        </Avatar>
                    </ListItemStandard>
                    <ListItemStandard description="UX Specialist">Michael Adams
                        <Avatar slot="image" shape="Square">
                            <img src="/images/avatars/woman_avatar_2.png" alt="Woman image" />
                        </Avatar>
                    </ListItemStandard>
                </List>
            </Card>
            <Card className="medium">
                <CardHeader slot="header" title-text="Team Bears" subtitle-text="Direct Reports" interactive={true} status="2 of 2">
                    <Icon name="group" slot="avatar" />
                </CardHeader>
                <List separators="None">
                    <ListItemStandard description="Software Architect">Richard Wilson
                        <Avatar slot="image" shape="Square">
                            <img src="/images/avatars/man_avatar_2.png" alt="Woman image" />
                        </Avatar>
                    </ListItemStandard>
                    <ListItemStandard description="Visual Designer">Elena Petrova
                        <Avatar slot="image" shape="Square">
                            <img src="/images/avatars/woman_avatar_3.png" alt="Woman image" />
                        </Avatar>
                    </ListItemStandard>
                    <ListItemStandard description="Quality Specialist">John Miller
                        <Avatar slot="image" shape="Square">
                            <img src="/images/avatars/man_avatar_3.png" alt="Woman image" />
                        </Avatar>
                    </ListItemStandard>
                </List>
            </Card>
        </Carousel>
    </>
  );
}

export default App;
