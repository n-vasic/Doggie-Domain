import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import '../styles/shop.scss';
import { Button, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import SearchInput from '../components/Form/SearchInput';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';
function ShopPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
  //GET TOTAL COUNT
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/dd/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  //GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/dd/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    //eslint-disable-next-line
  }, [page]);

  //LOAD MORE PRODUCTS
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/dd/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filteredProduct();
        //eslint-disable-next-line
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
      <div className="background"></div>
      <div className="shopIntro">
        <p>
          Welcome to Doggie Domain shop, your premier destination for all your
          canine shopping needs! From gourmet treats to stylish accessories, we
          have everything to keep your furry friend tail-waggingly happy. Start
          exploring now and make your pup's dreams come true!
        </p>
      </div>
      <Row style={{ maxWidth: '100%' }} className="m-3">
        <Col md={3} className='shopColLeft'>
          <SearchInput/>
          <h4 className="mb-4 mt-4">Filter By Category</h4>
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
            <Button className='dumgeReset m-4' onClick={() => window.location.reload()}>
              RESET FILTERS
            </Button>
          </div>
        </Col>
        <Col md={9}>
          <h1 className="allProd text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div className='cards-container'key={p._id}>
              <Card className="kartice m-2" >
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
                    <Button
                      className="detail m-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </Button>
                    <Button
                      variant="secondary"
                      className="shopBtn  m-2"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          'cart',
                          JSON.stringify([...cart, p])
                        );
                        toast.success('Item added to cart');
                      }}
                    >
                      Add To Card
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              </div>
            ))}
          </div>
          <div className="dugmDonje m-2 p-3">
            {products && products.length < total && (
              <Button
              className='loadMoreBtn'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading...' : 'Load more'}
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default ShopPage;
