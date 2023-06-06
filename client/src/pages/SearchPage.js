import React from 'react';
import Layout from '../components/Layout/Layout';
import { Button, Card, Container } from 'react-bootstrap';
import { useSearch } from '../context/search';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/searchpage.scss';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';
const SearchPage = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <Layout>
      <div className="background"></div>
      <Container>
        <div className="text-center">
          <h1 className="search">Search Results</h1>
          <h6 className="search">
            {values?.results.length < 1
              ? 'No Products Found'
              : `Found ${values?.results.length}`}
          </h6>
          <div className="cards-container">
            {values?.results.map((p) => (
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
                    <Button
                      variant="primary"
                      className="detail m-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </Button>
                    <Button variant="secondary" className="shopBtn m-2"  onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          'cart',
                          JSON.stringify([...cart, p])
                        );
                        toast.success('Item added to cart');
                      }}>
                      Add To Card
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
          <NavLink to="/shop" className="dugmic btn btn-primary m-5">
            GO BACK
          </NavLink>
        </div>
      </Container>
    </Layout>
  );
};

export default SearchPage;
