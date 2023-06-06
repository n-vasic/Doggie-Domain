import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Layout from '../components/Layout/Layout';
import { toast } from 'react-hot-toast';
import '../styles/contact.scss';
const ContactPage = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_sgzt7zm',
        'template_kb4kwfq',
        form.current,
        '90EFdP0Xu2amziCRh'
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success('Message Sent');
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <Layout>
      <div className="background"></div>
      <div>
        <h1 className="naslovContact text-center m-5">Contact Us</h1>
      </div>
      <div className="contact">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </Layout>
  );
};

export default ContactPage;
