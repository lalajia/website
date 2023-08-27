import React from "react";
import Carousel from "react-bootstrap/Carousel";
import copy1 from "../assets/copy1.jpg";
import copy2 from "../assets/copy2.jpg";
import copy3 from "../assets/copy3.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/esm/Button";

const CarouselComponent = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Carousel className="d-block w-70">
      {!isAuthenticated && (
        <Carousel.Item>
          <img className="d-block w-100" src={copy1} alt="Slide 1" />
          <Carousel.Caption className="text-start">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
            <p>
              <Button
                variant="primary btn-sm"
                onClick={() => loginWithRedirect()}
              >
                Sign up today
              </Button>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {isAuthenticated && (
        <Carousel.Item>
          <img className="d-block w-100" src={copy1} alt="Slide 1" />
          <Carousel.Caption className="text-start">
            <h5>Thank you for signing up</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
      <Carousel.Item>
        <img className="d-block w-100" src={copy2} alt="Slide 2" />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={copy3} alt="Slide 3" />
        <Carousel.Caption className="text-end">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
