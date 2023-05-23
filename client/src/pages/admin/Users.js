import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Col, Row } from 'react-bootstrap';
import AdminMenu from '../../components/Layout/AdminMenu';
const Users = () => {
  return (
    <Layout>
      <h1 className="text-center mt-4 mb-4">All Users</h1>
      <Row style={{ width: '100%' }}>
        <Col md={3}>
          <AdminMenu></AdminMenu>
        </Col>
        <Col md={9}></Col>
      </Row>
    </Layout>
  );
};

export default Users;
