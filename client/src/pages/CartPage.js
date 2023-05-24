import React from 'react';
import Layout from '../components/Layout/Layout';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //TOTAL PRICE
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    } catch (error) {
      console.log(error);
    }
  };
  //DELETE PRODUCT FROM CART
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
      toast.success("Product Successfully Removed From Cart")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Row style={{ maxWidth: '100%' }}>
        <Col md={12}>
          <h1 className="text-center p-2">{`Hello ${
            auth?.token && auth?.user?.name
          }`}</h1>
          <h4 className="text-center">
            {cart?.length > 1
              ? `You Have ${cart.length} Items In Your Cart ${
                  auth?.token ? '' : 'Please Login To Checkout'
                }`
              : 'Your Cart Is Empty'}
          </h4>
        </Col>
      </Row>
      <Row style={{ maxWidth: '100%' }}>
        <Col md={9}>
          {cart?.map((p) => (
            <Row style={{ maxWidth: '100%' }} className="card  m-3 flex-row">
              <Col md={4} className="d-flex justify-content-center">
                <Image
                  className="card-img"
                  src={`/api/dd/product/product-photo/${p._id}`}
                  alt={p.name}
                  width={'225px'}
                  height={'225px'}
                />
              </Col>
              <Col md={8}>
                <h4>{p.name}</h4>
                <p>{p.description.substring(0, 30)}</p>
                <h4>Price: ${p.price}</h4>
                <Button
                  className="btn btn-danger mt-3"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
        </Col>
        <Col md={3} className="text-center">
          <h4>Cart Summary</h4>
          <p> Total | Checkout | Payment </p>
          <hr />
          <h4>Total : {totalPrice()} </h4>
        </Col>
      </Row>
    </Layout>
  );
};

export default CartPage;
