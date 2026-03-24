import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import CarouselClass from "@ui5/webcomponents/dist/Carousel.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/competitor.js";
import "@ui5/webcomponents-icons/dist/wallet.js";
import "@ui5/webcomponents-icons/dist/collaborate.js";
import "@ui5/webcomponents-icons/dist/group.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Avatar = createReactComponent(AvatarClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Carousel = createReactComponent(CarouselClass);
const Icon = createReactComponent(IconClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

export const Example = () => {
  return (
    <>
      <style>{`
        ui5-carousel::part(content) {
            padding-block: 0.75rem;
        }

        ui5-card {
            min-width: 18rem;
        }

        ui5-card ui5-list:last-child {
            margin-block-end: 0.75rem;
        }

        ui5-li::part(icon) {
            padding-inline-end: 0;
        }
      `}</style>
      <Carousel
        cyclic={true}
        itemsPerPage="S1 M2 L3 XL3"
        arrowsPlacement="Navigation"
      >
        <Card style={{ minWidth: "18rem" }} class="medium">
          <CardHeader
            slot="header"
            titleText="Activities"
            subtitleText="For Today"
          />
          <Timeline>
            <TimelineItem
              id="test-item"
              titleText="called"
              icon="phone"
              name="John Smith"
              nameClickable={true}
            />
            <TimelineItem
              titleText="Weekly Sync - CP Design"
              icon="calendar"
            >
              MR SOF02 2.43
            </TimelineItem>
            <TimelineItem
              titleText="Video Conference Call - UI5"
              icon="calendar"
            >
              Online meeting
            </TimelineItem>
          </Timeline>
        </Card>
        <Card style={{ minWidth: "18rem" }} class="small">
          <CardHeader
            slot="header"
            titleText="David Williams"
            subtitleText="Sales Manager"
          >
            <img src="/images/avatars/man_avatar_1.png" alt="" slot="avatar" />
          </CardHeader>
          <List separators="Inner">
            <ListItemStandard icon="competitor" iconEnd={true}>
              Personal Development
            </ListItemStandard>
            <ListItemStandard icon="wallet" iconEnd={true}>
              Finance
            </ListItemStandard>
            <ListItemStandard icon="collaborate" iconEnd={true}>
              Communications Skills
            </ListItemStandard>
          </List>
        </Card>
        <Card style={{ minWidth: "18rem" }} class="medium">
          <CardHeader
            slot="header"
            titleText="Team Dolphins"
            subtitleText="Direct Reports"
            additionalText="1 of 2"
          >
            <Icon name="group" slot="avatar" />
          </CardHeader>
          <List separators="None">
            <ListItemStandard description="User Researcher">
              Alain Chevalier
              <Avatar slot="image" shape="Square">
                <img src="/images/avatars/man_avatar_1.png" alt="Woman image" />
              </Avatar>
            </ListItemStandard>
            <ListItemStandard description="Artist">
              Monique Legrand
              <Avatar slot="image" shape="Square">
                <img
                  src="/images/avatars/woman_avatar_1.png"
                  alt="Woman image"
                />
              </Avatar>
            </ListItemStandard>
            <ListItemStandard description="UX Specialist">
              Michael Adams
              <Avatar slot="image" shape="Square">
                <img
                  src="/images/avatars/woman_avatar_2.png"
                  alt="Woman image"
                />
              </Avatar>
            </ListItemStandard>
          </List>
        </Card>
        <Card style={{ minWidth: "18rem" }} class="medium">
          <CardHeader
            slot="header"
            titleText="Team Bears"
            subtitleText="Direct Reports"
            interactive={true}
            additionalText="2 of 2"
          >
            <Icon name="group" slot="avatar" />
          </CardHeader>
          <List separators="None">
            <ListItemStandard description="Software Architect">
              Richard Wilson
              <Avatar slot="image" shape="Square">
                <img src="/images/avatars/man_avatar_2.png" alt="Woman image" />
              </Avatar>
            </ListItemStandard>
            <ListItemStandard description="Visual Designer">
              Elena Petrova
              <Avatar slot="image" shape="Square">
                <img
                  src="/images/avatars/woman_avatar_3.png"
                  alt="Woman image"
                />
              </Avatar>
            </ListItemStandard>
            <ListItemStandard description="Quality Specialist">
              John Miller
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
