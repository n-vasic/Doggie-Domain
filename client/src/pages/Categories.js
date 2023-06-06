import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout/Layout';
import "../styles/categories.scss"
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="katContainer">
        <Row className='katRow'>
          {categories.map((c) => (
            <Col md={6} className="mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`}>
                <div className='kategorije'>
                  <Button className='katBtn'>{c.name}</Button>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default Categories;
