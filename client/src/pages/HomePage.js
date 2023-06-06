import React from 'react';
import Layout from '../components/Layout/Layout';

import '../styles/homepage.scss';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <Layout>
      <div className="background"> </div>
      <div className="mainContent">
        <Row className="homeRow">
          <Col className="leftCol" lg={6}>
            <h1 className="landingText">
              Unleash the magic of Doggie Domain, where every tail is wagging
              and every pup's dreams come true!
            </h1>
            <Link to="/shop" className="gsBtn">
              Get Started <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </Col>
          <Col className="rightCol" lg={6}></Col>
        </Row>
      </div>
    </Layout>
  );
};

export default HomePage;
