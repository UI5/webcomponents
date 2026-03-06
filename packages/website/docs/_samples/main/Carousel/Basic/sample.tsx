import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CarouselClass from "@ui5/webcomponents/dist/Carousel.js";

const Carousel = createComponent(CarouselClass);

function App() {
  return (
    <>
      <style>{`
        img {
            max-height: 30rem;
        }
      `}</style>
      <Carousel>
        <img src="/images/sample1.jpg" alt="Landscape 1" />
        <img src="/images/sample2.jpg" alt="Landscape 2" />
        <img src="/images/sample3.jpg" alt="Bulb" />
      </Carousel>
    </>
  );
}

export default App;
