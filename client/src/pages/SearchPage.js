import React from 'react';
import Layout from '../components/Layout/Layout';
import { Button, Card, Container } from 'react-bootstrap';
import { useSearch } from '../context/search';
import { NavLink } from 'react-router-dom';

const SearchPage = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <Container>
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? 'No Products Found'
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
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
          <NavLink to="/shop" className="btn btn-primary m-5">GO BACK</NavLink>

        </div>
      </Container>
    </Layout>
  );
};

export default SearchPage;
