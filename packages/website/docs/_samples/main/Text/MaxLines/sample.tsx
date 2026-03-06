import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Text = createComponent(TextClass);

function App() {
  return (
    <>
      <Text maxLines={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam
        consequat. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Pellentesque elementum dignissim ultricies.
        Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit
        amet Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor
        eros aliquam consequat. Lorem ipsum dolor sit amet Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Pellentesque elementum dignissim
        ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem
        ipsum dolor sit amet
      </Text>
      <br />
      <br />
      <Text maxLines={2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam
        consequat. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Pellentesque elementum dignissim ultricies.
        Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit
        amet Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor
        eros aliquam consequat. Lorem ipsum dolor sit amet Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Pellentesque elementum dignissim
        ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem
        ipsum dolor sit amet
      </Text>
      <br />
      <br />
      <Text maxLines={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam
        consequat. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Pellentesque elementum dignissim ultricies.
        Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit
        amet Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor
        eros aliquam consequat. Lorem ipsum dolor sit amet Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Pellentesque elementum dignissim
        ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem
        ipsum dolor sit amet
      </Text>
    </>
  );
}

export default App;
