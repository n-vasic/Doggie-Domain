import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);

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
      toast.success('Product Successfully Removed From Cart');
    } catch (error) {
      console.log(error);
    }
  };
  //GET PAYMENT GATEWAY TOKEN
  const getToken = async () => {
    try {
      const { data } = await axios.get('/api/dd/product/braintree/token');
      setClientToken(data?.clientToken);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //HANDLE PAYMENTS
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/dd/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
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
          {cart?.map((p, index) => (
            <Row
              style={{ maxWidth: '100%' }}
              className="card  m-3 flex-row"
              key={`${p._id}-${index}`}
            >
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
          {auth?.user?.address ? (
            <>
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <Button onClick={() => navigate('/dashboard/user/profile')}>
                  Update Address
                </Button>
              </div>
            </>
          ) : (
            <div>
              {auth?.token ? (
                <Button
                  onClick={() => navigate('/dashboard/user/profile')}
                ></Button>
              ) : (
                <Button
                  onClick={() =>
                    navigate('/login', {
                      state: '/cart',
                    })
                  }
                >
                  Please Login To Checkout
                </Button>
              )}
            </div>
          )}
          <div className="mt-2">
            {!clientToken || !cart?.length ? (
              ''
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: 'vault',
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />

                <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? 'Processing ....' : 'Make Payment'}
                </button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default CartPage;
