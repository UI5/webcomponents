import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";

const Tag = createReactComponent(TagClass);

export const Example = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "1rem",
        }}
      >
        <Tag design="Set1" colorScheme="1">
          Color Scheme 1
        </Tag>
        <Tag design="Set1" colorScheme="2">
          Color Scheme 2
        </Tag>
        <Tag design="Set1" colorScheme="3">
          Color Scheme 3
        </Tag>
        <Tag design="Set1" colorScheme="4">
          Color Scheme 4
        </Tag>
        <Tag design="Set1" colorScheme="5">
          Color Scheme 5
        </Tag>
        <Tag design="Set1" colorScheme="6">
          Color Scheme 6
        </Tag>
        <Tag design="Set1" colorScheme="7">
          Color Scheme 7
        </Tag>
        <Tag design="Set1" colorScheme="8">
          Color Scheme 8
        </Tag>
        <Tag design="Set1" colorScheme="9">
          Color Scheme 9
        </Tag>
        <Tag design="Set1" colorScheme="10">
          Color Scheme 10
        </Tag>
      </div>
    </>
  );
}
