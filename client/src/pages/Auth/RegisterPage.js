import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Col, Row } from 'react-bootstrap';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/dd/auth/register', {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate('/login');
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
      <Row className="wrapper" style={{ maxWidth: '100%' }}>
      <Col className="regisLeft" lg={6}>
          <p>
            Register to DoggieDomain to gain access to Exclusive Features: By registering, users gain access to
            exclusive features and functionalities on the Doggie Domain website.
            These features include the ability to create and manage their
            own dog profiles,track orders and checkout.
          </p>
        </Col>
        <Col lg={6} className="register">
          <h1 className='naslov' style={{ marginBottom: '10vh' }}>Register Account</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAnswer">
              <Form.Control
                type="text"
                placeholder="Whats Is Your Favourite Sport?"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </Form.Group>

            <Button className='dugmic2' variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
       
      </Row>
    </Layout>
  );
};

export default RegisterPage;
