import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TabSeparatorClass from "@ui5/webcomponents/dist/TabSeparator.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/activities.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/menu.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";

const Label = createReactComponent(LabelClass);
const Tab = createReactComponent(TabClass);
const TabSeparator = createReactComponent(TabSeparatorClass);
const TabContainer = createReactComponent(TabContainerClass);

export const Example = () => {
  return (
    <>
      <TabContainer>
        <Tab icon="menu" text="Tab 1">
          <Label>
            Quibusdam, veniam! Architecto debitis iusto ad et, asperiores
            quisquam perferendis reprehenderit ipsa voluptate minus minima,
            perspiciatis cum. Totam harum necessitatibus numquam voluptatum.
          </Label>
        </Tab>
        <Tab icon="activities" text="Tab 2" selected={true}>
          <Label>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga magni
            facere error dicta beatae optio repudiandae vero, quidem
            voluptatibus perferendis eum maiores rem tempore voluptates aperiam
            eos enim delectus unde.
          </Label>
        </Tab>
        <Tab icon="add" text="Tab 3">
          <Label>
            Dignissimos debitis architecto temporibus doloribus reiciendis
            libero rem nemo, nobis quidem dolor praesentium, beatae voluptatum
            iste eveniet, nam voluptatem obcaecati ducimus dolore.
          </Label>
        </Tab>
        <Tab icon="calendar" text="Tab 4">
          <Label>
            Possimus ipsa eos impedit aut nisi repellendus recusandae,
            temporibus ducimus, necessitatibus tenetur facere, minima vero fugit
            rem reiciendis natus ratione quia numquam?
          </Label>
        </Tab>
        <TabSeparator />
        <Tab icon="action-settings" text="Tab 5">
          <Label>
            Explicabo laboriosam ab consequuntur, qui dignissimos inventore
            sapiente ullam quaerat ratione libero vero, beatae laudantium!
            Aperiam numquam tempore, laudantium perferendis recusandae autem.
          </Label>
        </Tab>
      </TabContainer>
    </>
  );
}
