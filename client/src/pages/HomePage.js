import React from 'react';
import Layout from '../components/Layout/Layout';
import { Container } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {useAuth} from '../context/auth';

const HomePage = () => {
  const [auth,setAuth]=useAuth();
  return (
    <Layout>
      <Container fluid className="homepageSlika">
        <div className="homepageText">
          <p>
            Welcome to Doggie Domain, your ultimate online dog shop! We offer a
            wide range of carefully curated products to keep your pup happy,
            healthy, and stylish.
          </p>
          <NavLink to="/shop" className="homepageBtn">GET STARTED</NavLink>
        </div>
      </Container>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
    
  );
};

export default HomePage;
