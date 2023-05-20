import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Col, Container, Row } from 'react-bootstrap';
import UserMenu from '../../components/Layout/UserMenu';

const Profile = () => {
  return (
    <Layout>
      <Container fluid className="p-3 m-3">
        <Row>
          <Col md={3}>
            <UserMenu />
          </Col>
          <Col md={9}>
            <h1>Your Profile</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Profile;
