import { createReactComponent } from "@ui5/webcomponents-base";
import CarouselClass from "@ui5/webcomponents/dist/Carousel.js";

const Carousel = createReactComponent(CarouselClass);

function App() {

  return (
    <>
      <Carousel arrows-placement="Navigation">
            <img src="/images/sample1.jpg" alt="Landscape 1" />
            <img src="/images/sample2.jpg" alt="Landscape 2" />
            <img src="/images/sample3.jpg" alt="Bulb" />
        </Carousel>
    </>
  );
}

export default App;
