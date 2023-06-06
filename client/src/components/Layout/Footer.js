import React from 'react';
import '../../styles/footer.scss';
import logo from '../../images/logoBlue.png';
import { Image } from 'react-bootstrap';
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row" style={{maxWidth:"100%"}}>
          <div className="col-md-4 footer-column" id="logo">
            <Image className="logo" src={logo} alt={logo} />
          </div>
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column">
              <li className="nav-item">
                <span className="footer-title">Company</span>
              </li>
             
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/shop">
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column">
              <li className="nav-item">
                <span className="footer-title">Contact &amp; Support</span>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  <i className="fas fa-phone" />
                  +47 45 80 80 80
                </span>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  <i className="fas fa-envelope" />
                  Contact us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  <i className="fas fa-star" />
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <i className="fas fa-ellipsis-h" />
        </div>
        <div className="row text-center">
          <div className="col-md-4 box">
            <span className="copyright quick-links">
              Copyright © Doggie Domain
            </span>
          </div>
          <div className="col-md-4 box">
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="/#">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/#">
                  <i className="fab fa-linkedin-in" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 box">
            <ul className="list-inline quick-links">
              <li className="list-inline-item">
                <a href="/policy">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="/terms">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
