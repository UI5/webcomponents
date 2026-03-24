import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CarouselClass from "@ui5/webcomponents/dist/Carousel.js";

const Carousel = createReactComponent(CarouselClass);

export const Example = () => {
  return (
    <>
      <style>{`
        img {
            max-height: 30rem;
        }
      `}</style>
      <Carousel arrowsPlacement="Navigation">
        <img src="/images/sample1.jpg" alt="Landscape 1" />
        <img src="/images/sample2.jpg" alt="Landscape 2" />
        <img src="/images/sample3.jpg" alt="Bulb" />
      </Carousel>
    </>
  );
}
