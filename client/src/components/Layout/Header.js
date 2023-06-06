import React from 'react';
// import { useRef } from 'react';
import '../../styles/header.scss';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
import logo from '../../images/navLogo.png';
import { Container, Image, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  DatabaseFilled,
  HomeFilled,
  RightSquareFilled,
  ShoppingCartOutlined,
  ShoppingFilled,
  UserOutlined,
} from '@ant-design/icons';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout successfull');
  };
  return (
    <>
      <Container className="navContainer d-flex align-items-center">
        <Navbar className="navbar" bg="custom" expand="lg">
          <Navbar.Toggle
            aria-controls="navbar-nav"
            style={{ border: 'none' }}
          />
          <Image className="navLogo" src={logo} />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="navigacija">
              <LinkContainer to="/">
                <Nav.Link>
                  <HomeFilled className="ikonica" />
                  Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/shop">
                <Nav.Link>
                  <ShoppingFilled className="ikonica" />
                  Shop
                </Nav.Link>
              </LinkContainer>
              <div className="dropDiv">
                <div className="iconContainer">
                  <DatabaseFilled className="ikonica" />
                </div>

                <NavDropdown title="Categories" id="categories-dropdown">
                  <LinkContainer to="/categories">
                    <NavDropdown.Item>All Categories</NavDropdown.Item>
                  </LinkContainer>
                  {categories?.map((c) => (
                    <LinkContainer to={`/category/${c.slug}`} key={c._id}>
                      <NavDropdown.Item>{c.name}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
                </NavDropdown>
              </div>
              {!auth.user ? (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link className="proba">
                      <RightSquareFilled className="ikonica" />
                      Register
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer className="proba" to="/login">
                    <Nav.Link>
                      <UserOutlined className="ikonica" />
                      Login
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <div className="dropDiv">
                    <div className="iconContainer">
                      <UserOutlined className="ikonica" />
                    </div>

                    <NavDropdown title={auth?.user?.name} id="dropdown-basic" >
                      <NavDropdown.Item as={Nav.Item}>
                        <Nav.Link
                          as={NavLink}
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? 'admin' : 'user'
                          }`}
                        >
                          Dashboard
                        </Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Nav.Item}>
                        <Nav.Link
                          as={NavLink}
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Nav.Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </>
              )}
              <Badge count={cart?.length} style={{ margin: '7px' }}>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <ShoppingCartOutlined
                      style={{ fontSize: '2rem' }}
                      className="ikonica"
                    />
                  </Nav.Link>
                </LinkContainer>
              </Badge>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
};

export default Header;

// <>
//   <Container className="preHeader" fluid>
//     <h3>Free Shipping For Orders Above $80</h3>
//   </Container>
//   <Container fluid>
//     <Row>
//       <Col lg={6} xs={12}>
//         <div className="navbarDiv">
//           <Navbar bg="custom" expand="lg">
//             <Navbar.Toggle aria-controls="navbar-nav" />
//             <Navbar.Collapse id="navbar-nav">
//               <Nav>
//                 <LinkContainer to="/">
//                   <Nav.Link>Home</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/shop">
//                   <Nav.Link>Shop </Nav.Link>
//                 </LinkContainer>
//                 <NavDropdown title="Categories" id="categories-dropdown">
//                   <LinkContainer to="/categories">
//                     <NavDropdown.Item>All Categories</NavDropdown.Item>
//                   </LinkContainer>
//                   {categories?.map((c) => (
//                     <LinkContainer to={`/category/${c.slug}`} key={c._id}>
//                       <NavDropdown.Item>{c.name}</NavDropdown.Item>
//                     </LinkContainer>
//                   ))}
//                 </NavDropdown>
//                 {!auth.user ? (
//                   <>
//                     <LinkContainer to="/register">
//                       <Nav.Link>Register</Nav.Link>
//                     </LinkContainer>
//                     <LinkContainer to="/login">
//                       <Nav.Link>Login</Nav.Link>
//                     </LinkContainer>
//                   </>
//                 ) : (
//                   <>
//                     <NavDropdown
//                       title={auth?.user?.name}
//                       id="dropdown-basic"
//                     >
//                       <NavDropdown.Item as={Nav.Item}>
//                         <Nav.Link
//                           as={NavLink}
//                           to={`/dashboard/${
//                             auth?.user?.role === 1 ? 'admin' : 'user'
//                           }`}
//                         >
//                           Dashboard
//                         </Nav.Link>
//                       </NavDropdown.Item>
//                       <NavDropdown.Item as={Nav.Item}>
//                         <Nav.Link
//                           as={NavLink}
//                           to="/login"
//                           onClick={handleLogout}
//                         >
//                           Logout
//                         </Nav.Link>
//                       </NavDropdown.Item>
//                     </NavDropdown>
//                   </>
//                 )}
//                 <Badge count={cart?.length} showZero>
//                   <LinkContainer to="/cart">
//                     <Nav.Link>
//                       <ShoppingFilled style={{fontSize:"1.6rem"}}/>
//                     </Nav.Link>
//                   </LinkContainer>
//                 </Badge>
//               </Nav>
//             </Navbar.Collapse>
//           </Navbar>
//         </div>
//       </Col>
//       <Col lg={6} xs={12}>
//         <div className="logoText">
//           <h1>
//             Doggie <span className="colored">Domain</span>
//           </h1>
//         </div>
//       </Col>
//     </Row>
//   </Container>
// </>

{
  /* <header>
  <nav ref={navRef}>
    <div className="header-upper">
      <div className="hu-left">
        <NavLink to="/shop" className="nav-link">
          shop
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          contact
        </NavLink>
        <NavLink to="/cart">
          <Badge count={cart?.length}>
            <ShoppingCartOutlined className="nav-icon" />
          </Badge>
        </NavLink>
      </div>
      <div className="hu-mid">
        <NavLink to="/shop">
          <FacebookFilled className="nav-icon" />
        </NavLink>
        <NavLink to="/blog">
          <InstagramFilled className="nav-icon" />
        </NavLink>
        <NavLink to="/register">
          <TwitterSquareFilled className="nav-icon" />
        </NavLink>
      </div>
      <div className="hu-right">
        {!auth.user ? (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        ) : (
          <>
            <NavDropdown title={auth?.user?.name} id="dropdown-basic">
              <NavDropdown.Item as={Nav.Item}>
                <Nav.Link
                  as={NavLink}
                  to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                >
                  Dashboard
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={Nav.Item}>
                <Nav.Link as={NavLink} to="/login" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          </>
        )}

        <NavLink className="dugme" to="/login">
          Sign In
          <UserOutlined className="ikonica" />
        </NavLink>
      </div>
    </div>
    <div className="header-middle">
      <div className="logoDiv">
        <img src={logo} alt={logo} />
      </div>
    </div>
    <div className="header-bottom">
      <NavDropdown
        title="Categories"
        id="categories-dropdown"
        className="my-dropdown"
        drop="down"
        flip={false}
      >
        <LinkContainer to="/categories">
          <NavDropdown.Item>All Categories</NavDropdown.Item>
        </LinkContainer>
        {categories?.map((c) => (
          <LinkContainer to={`/category/${c.slug}`} key={c._id}>
            <NavDropdown.Item>{c.name}</NavDropdown.Item>
          </LinkContainer>
        ))}
      </NavDropdown>
      <NavLink className="nav-link" to="/policy">
        policy
      </NavLink>
      <NavLink className="nav-link" to="/about">
        about us
      </NavLink>
      <NavLink className="nav-link" to="/faq">
        faq
      </NavLink>
      <NavLink className="nav-link" to="/tac">
        terms & conditions
      </NavLink>
    </div>
    <button className="nav-btn nav-close-btn" onClick={showNavbar}>
      <CloseOutlined />
    </button>
  </nav>
  <button className="nav-btn" onClick={showNavbar}>
    <BarsOutlined />
  </button>
</header>; */
}
