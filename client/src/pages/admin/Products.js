import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../../styles/products.scss';
const Products = () => {
  const [products, setProducts] = useState([]);

  //GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/dd/product/get-product');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  //

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <Row style={{ width: '100%' }}>
        <Col md={3}>
          <AdminMenu />
        </Col>
        <Col md={9} className="colwrap">
          <h1 className="text-center mb-4">All Products List</h1>
          <div className="d-grid products-container">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="text-dark text-decoration-none"
              >
                <Card className="m-2 product-card" key={p._id}>
                  <Card.Img
                    variant="top"
                    src={`/api/dd/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>{p.description.substring(0, 30)}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Products;
