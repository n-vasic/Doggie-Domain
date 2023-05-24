import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Button, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //GET ALL CATEGORIES
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/dd/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/dd/product/get-product');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  //FILTER BY CATEGORY
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filteredProduct();
  }, [checked, radio]);

  //GET FILTERED PRODUCTS
  const filteredProduct = async () => {
    try {
      const { data } = await axios.post('/api/dd/product/product-filters', {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Row style={{ maxWidth: '100%' }} className="m-3">
        <Col md={3}>
          <h4 className="mb-4">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* FILTER BY PRICE */}
          <h4 className="mt-4 mb-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <Button onClick={()=>window.location.reload()}>RESET FILTERS</Button>
          </div>

        </Col>
        <Col md={9}>
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <Card className="m-2" key={p._id}>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src={`/api/dd/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{p.description.substring(0, 50)}...</Card.Text>
                  <Card.Text>${p.price}</Card.Text>
                  <div className="shopBtnContainer">
                    <Button variant="primary" className="shop-btn m-2">
                      More Details
                    </Button>
                    <Button variant="secondary" className="shop-btn m-2">
                      Add To Card
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default ShopPage;
