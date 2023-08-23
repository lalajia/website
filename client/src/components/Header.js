import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  // const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  // const toggle = () => setIsOpen(!isOpen);
  const logoutWithRedirect = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

  return (
    <>
      {/* {[false, "sm", "md", "lg", "xl", "xxl"].map((lg) => ( */}
      <Navbar
        key="lg"
        expand="lg"
        className="bg-body-tertiary mb-3"
        // fixed="top"
        bg="light"
        data-bs-theme="light"
      >
        <Container fluid>
          <Navbar.Brand className="mb-0 h1 ms-4" href="/">
            Blog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            {/* small screen header */}
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Blog
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="justify-content-end">
              <Form className="d-flex py-2 ms-4">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav className="d-flex ms-4 py-1">
                <Nav.Link href="/content">Create Content</Nav.Link>
                {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
                {isAuthenticated && (
                  <NavDropdown
                    align={{ lg: "end" }}
                    title={user.name}
                    // id="dropdown-menu-align-responsive-1"
                  >
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/comments">
                      Your Comments
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logoutWithRedirect()}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {!isAuthenticated && (
                  <Nav.Link
                    className="px-3"
                    onClick={() => loginWithRedirect()}
                  >
                    Log In
                  </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
