import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const [cart, setCart] = useCart();

  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/dd/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //GET RELATED PRODUCT
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/dd/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Container className="mt-2">
        <Row>
          <Col md={4} className="d-flex justify-content-center">
            <Card.Img
              src={`/api/dd/product/product-photo/${product._id}`}
              alt={product.name}
              style={{ maxHeight: '225px', maxWidth: '225px' }}
              className="d-flex justify-content-center"
            />
          </Col>
          <Col md={8}>
            <h1 className="text-center">Product Details</h1>
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: ${product.price}</h6>
            <h6>Category: {product?.category?.name}</h6>
            <Button className="btn-secondary ms-1">ADD TO CART</Button>
          </Col>
        </Row>
      </Container>
      <hr />
      <h6 className='text-center '>Similar Products</h6>

      <Container className='d-flex'>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <Row className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <Col key={p._id} className="m-2">
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  src={`/api/dd/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{p.description.substring(0, 30)}...</Card.Text>
                  <Card.Text>$ {p.price}</Card.Text>
                  <Button
                    className="btn-primary m-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </Button>
                  <Button className="btn-secondary m-1"  onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          'cart',
                          JSON.stringify([...cart, p])
                        );
                        toast.success('Item added to cart');
                      }}>ADD TO CART</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default ProductDetails;
