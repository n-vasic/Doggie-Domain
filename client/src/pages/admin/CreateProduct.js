import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Col, Container, Row } from 'react-bootstrap';
import AdminMenu from '../../components/Layout/AdminMenu';

const CreateProduct = () => {
  return (
    <Layout>
      <Container fluid className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu></AdminMenu>
          </Col>
          <Col md={9}>
            <h1>Create Product</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default CreateProduct;
