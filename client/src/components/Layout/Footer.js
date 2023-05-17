import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="footer text-light p-3">
      <h3 className='text-center'>All rights reserved &copy; Doggie Domain</h3>
      <p className='text-center mt-3 ml-4 mr-4'>
      <Link className='footerLink' to="/about">About Us </Link>/
      <Link className='footerLink' to="/policy">Policy </Link>/
      <Link className='footerLink' to="/contact">Contact Us </Link>
      </p>
    </div>
  );
};

export default Footer;
