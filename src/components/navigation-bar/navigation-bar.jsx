import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Navigation Bar
 * @component
 */
export const NavigationBar = ({ user, onLoggedOut, onFilter }) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    onFilter(query);
  }, [query]);
  return (
    <Navbar className="navbar" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={"/signup"}>
                  Sign up
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to={"/"}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={"/profile"}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
