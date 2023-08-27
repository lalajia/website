import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="text-center">
      <Container>
        <Row>
          <Col>
            <p>
              Build by <a href="https://lalajia.github.io">Selena</a>
            </p>
            <p>
              <Link onClick={scrollToTop} to="/">
                Back to top
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
