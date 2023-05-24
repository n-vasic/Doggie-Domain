import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout/Layout';

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="container">
        <Row>
          {categories.map((c) => (
            <Col md={6} className="mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`}>
                <Button variant="primary">{c.name}</Button>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default Categories;
