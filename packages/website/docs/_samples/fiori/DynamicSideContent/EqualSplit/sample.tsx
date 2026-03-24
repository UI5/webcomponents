import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DynamicSideContentClass from "@ui5/webcomponents-fiori/dist/DynamicSideContent.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const DynamicSideContent = createReactComponent(DynamicSideContentClass);
const Title = createReactComponent(TitleClass);

export const Example = () => {
  return (
    <>
      <style>{`
        .text {
            display: inline-block;
            font-size: var(--sapFontSize);
            font-family: var(--sapFontFamily);
            color: var(--sapTextColor);
            line-height: normal;
            white-space: pre-line;
            word-wrap: break-word;
            cursor: text;
        }
      `}</style>
      <div style={{ width: "1000px", overflowX: "scroll" }}>
        <DynamicSideContent
          sideContentVisibility="AlwaysShow"
          equalSplit={true}
        >
          <div>
            <Title level="H1">Main Content</Title>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex
              mi, elementum et ante commodo, semper sollicitudin magna. Sed
              dapibus ut tortor quis varius. Sed luctus sem at nunc porta
              vulputate. Suspendisse lobortis arcu est, quis ultrices ipsum
              fermentum a. Vestibulum a ipsum placerat ligula gravida fringilla
              at id ex. Etiam pellentesque lorem sed sagittis aliquam. Quisque
              semper orci risus, vel efficitur dui euismod aliquet. Morbi sapien
              sapien, rhoncus et rutrum nec, rhoncus id nisl. Cras non tincidunt
              enim, id eleifend neque.
            </p>
          </div>
          <div slot="sideContent">
            <Title level="H1">Side Content</Title>
            <p className="text">
              Morbi lorem libero, imperdiet id condimentum ac, tempor ut velit.
              Integer a laoreet sem. Nunc at sagittis nisi. Sed placerat diam eu
              porttitor dignissim. Maecenas nec fringilla tortor. Pellentesque
              ut elit est. Curabitur quis elit at mauris ullamcorper fringilla.
              Nullam diam mi, porttitor dictum orci nec, molestie luctus metus.
              Nunc ut ex blandit, elementum erat eget, pulvinar sapien. Donec
              nec lorem eu nunc eleifend tempor at non tortor. In quam velit,
              ornare at rutrum ac, porta ac augue. Suspendisse venenatis semper
              lacus at venenatis. Praesent vestibulum ligula nulla, at tempus
              lorem consequat suscipit. Aenean consequat dapibus dui, at
              bibendum mauris porta a.
            </p>
          </div>
        </DynamicSideContent>
      </div>
    </>
  );
}
