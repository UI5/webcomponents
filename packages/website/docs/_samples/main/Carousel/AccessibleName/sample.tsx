import { createReactComponent } from "@ui5/webcomponents-base";
import CarouselClass from "@ui5/webcomponents/dist/Carousel.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Carousel = createReactComponent(CarouselClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <style>{`
        img {
            max-height: 30rem;
        }


        ui5-title {
            text-align: center;
            margin-bottom: 0.5rem;
        }
      `}</style>
      <Title style={{ textAlign: "center", marginBottom: "0.5rem" }} id="imgGallery" level="H4">Image Gallery</Title>
        <Carousel accessibleNameRef="imgGallery">
            <img src="/images/sample1.jpg" alt="Landscape 1" />
            <img src="/images/sample2.jpg" alt="Landscape 2" />
            <img src="/images/sample3.jpg" alt="Bulb" />
        </Carousel>
    </>
  );
}

export default App;
