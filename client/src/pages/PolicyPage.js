import React from 'react';
import Layout from '../components/Layout/Layout';
import { Container } from 'react-bootstrap';
import '../styles/policy.scss';
const PolicyPage = () => {
  return (
    <Layout>
      <Container className="policy">
        <div className="intro">
          <h1>Doggie Domain - Online Shop Policy</h1>
          <h3>
            Welcome to Doggie Domain, your ultimate destination for all your
            canine needs! Please take a moment to familiarize yourself with our
            policies to ensure a seamless shopping experience. By using our
            website and purchasing products from Doggie Domain, you agree to
            abide by the following policies:
          </h3>
        </div>
        <h4>1. Product Information and Descriptions:</h4>
        <p>
          We strive to provide accurate and detailed information about our
          products, including descriptions, images, and specifications. However,
          please note that slight variations in color, size, and appearance may
          occur due to individual monitor settings or manufacturing processes.
        </p>
        <h4>2. Pricing and Payment:</h4>
        <p>
          All prices displayed on Doggie Domain are in the currency specified on
          the website. We endeavor to ensure that all prices are accurate;
          however, in the event of an error, we reserve the right to correct the
          price and inform you before proceeding with your order. Payments can
          be made securely through the provided payment gateways. We do not
          store any payment information.
        </p>
        <h4>3. Shipping and Delivery:</h4>
        <p>
          We offer reliable shipping services to various locations. Shipping
          costs and estimated delivery times will be provided during the
          checkout process. Please note that delivery times may vary depending
          on your location and any unforeseen circumstances, such as customs
          delays or natural disasters. Doggie Domain is not responsible for any
          additional customs fees or duties that may be incurred during
          international shipments.
        </p>
        <h4>4. Returns and Refunds:</h4>
        <p>
          We want you and your furry friend to be completely satisfied with your
          purchase from Doggie Domain. If you are not satisfied with your order,
          you may request a return or exchange within 30 days of receiving the
          product. Please review our detailed Return and Refund Policy on our
          website for instructions on how to initiate a return or exchange.
        </p>
        <h4>5. Privacy and Data Security:</h4>
        <p>
          At Doggie Domain, we value your privacy and take the protection of
          your personal information seriously. We employ industry-standard
          security measures to safeguard your data and ensure its
          confidentiality. Please refer to our Privacy Policy for more
          information on how we collect, use, and protect your personal
          information.
        </p>
      </Container>
    </Layout>
  );
};

export default PolicyPage;
