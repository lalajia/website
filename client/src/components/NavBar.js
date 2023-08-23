import React from "react";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  return (
    <div className="nav-scroller py-1 mb-2">
      <Nav className="nav d-flex justify-content-between">
        <Nav.Link
          className="p-2 link-secondary text-decoration-underline"
          href="#"
        >
          General
        </Nav.Link>
        <Nav.Link
          className="p-2 link-secondary text-decoration-underline"
          href="#"
        >
          Technology
        </Nav.Link>
        <Nav.Link className="p-2 link-secondary" href="#">
          Design
        </Nav.Link>
        <Nav.Link className="p-2 link-secondary" href="#">
          Culture
        </Nav.Link>
        <Nav.Link className="p-2 link-secondary" href="#">
          Opinion
        </Nav.Link>
        <Nav.Link className="p-2 link-secondary" href="#">
          Style
        </Nav.Link>
        <Nav.Link className="p-2 link-secondary" href="#">
          Comics
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default NavBar;
