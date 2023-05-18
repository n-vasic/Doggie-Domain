import React from 'react';
import { Navbar, Nav, Container, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success("Logout successfull")
  };
  return (
    <>
      <Container className="preHeader" fluid>
        <h3>Free Shipping For Orders Above $80</h3>
      </Container>
      <Container fluid>
        <Row>
          <Col lg={6} xs={12}>
            <div className="navbarDiv">
              <Navbar bg="custom" expand="lg">
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                  <Nav>
                    <LinkContainer to="/">
                      <Nav.Link>Home </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/shop">
                      <Nav.Link>Shop </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/blog">
                      <Nav.Link>Blog </Nav.Link>
                    </LinkContainer>
                    {!auth.user ? (
                      <>
                        <LinkContainer to="/register">
                          <Nav.Link>Register</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                          <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                      </>
                    ) : (
                      <>
                        <LinkContainer to="/login">
                          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </LinkContainer>
                      </>
                    )}
                    <LinkContainer to="/cart">
                      <Nav.Link>Cart(0)</Nav.Link>
                    </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </Col>
          <Col lg={6} xs={12}>
            <div className="logoText">
              <h1>
                Doggie <span className="colored">Domain</span>
              </h1>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
