import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Card, Col, Container, Row } from 'react-bootstrap';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import '../../styles/landingDash.scss';
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <Container >
        <Row className='userDash'>
          <Col md={3}>
            <UserMenu />
          </Col>
          <Col md={9}>
            <Card className="landingDash">
              <h3>User Name : {auth?.user?.name}</h3>
              <h3>Users Email : {auth?.user?.email}</h3>
              <h3>Users address: {auth?.user?.address}</h3>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
