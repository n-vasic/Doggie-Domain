import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import Layout from '../../components/Layout/Layout';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/auth';

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
      <div className="register">
        <h1 style={{ marginBottom: '10vh' }}>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
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
          <div className="mb-3">
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                navigate('/forgot-password');
              }}
            >
              Forgot Password
            </Button>  
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Layout>
  );
}

export default LoginPage;
