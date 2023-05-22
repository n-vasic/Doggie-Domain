import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Card, Col, Container, Row } from 'react-bootstrap';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <Container fluid className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu></AdminMenu>
          </Col>
          <Col md={9} className='adminRight'>
            <Card id='adminInfo' className="w-75 m-3">
              <h3>Admin Name : {auth?.user?.name}</h3>
              <h3>Admin Email : {auth?.user?.email}</h3>
              <h3>Admin Contact : {auth?.user?.phone}</h3>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
