import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button, Card } from 'react-bootstrap';
import { useCart } from '../context/cart';
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
    //eslint-disable-next-line
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/dd/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  const [cart, setCart] = useCart();
  return (
    <Layout>
      <div className="background"></div>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row" style={{ maxWidth: '100%', margin: '0 auto' }}>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div className="cards-container" key={p._id}>
                <Card className="kartice m-2">
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
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
