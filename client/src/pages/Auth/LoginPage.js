import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import '../../styles/login.scss';
import { Col, Row } from 'react-bootstrap';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/dd/auth/login', {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Oops! Something Went Wrong...');
    }
  };
  return (
    <Layout>
      <div className="background"></div>
      <Row className="wrapper">
        <Col lg={6} className="regisLeft">
          <p>
            Access personalized features: Logging in to Doggie Domain allows
            users to access personalized features tailored to their preferences
            and needs. They can create and manage their profiles, track their
            orders and many more...
          </p>
        </Col>
        <Col lg={6} className="register">
          <h1 className='naslov' style={{ marginBottom: '10vh' }}>Login</h1>
          <Form onSubmit={handleSubmit} className="for1">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control className='inputBorder'
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="mb-3 forgot-password">
              <Button
              className='dugmic1'
                variant="danger"
                type="submit"
                onClick={() => {
                  navigate('/forgot-password');
                }}
              >
                Forgot Password
              </Button>
            </div>

            <Button className='dugmic2' variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}

export default LoginPage;
