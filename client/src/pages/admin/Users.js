import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Col, Row } from 'react-bootstrap';
import AdminMenu from '../../components/Layout/AdminMenu';
const Users = () => {
  return (
    <Layout>
      <Row style={{ width: '100%' }}>
        <Col md={3}>
          <AdminMenu></AdminMenu>
        </Col>
        <Col md={9} className='p-3'>
          <h1 className="text-center">All Users</h1>
        </Col>
      </Row>
    </Layout>
  );
};

export default Users;
