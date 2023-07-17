import React, { useState } from 'react';
import axios from 'axios';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Send email
      await axios.post('https://api.example.com/send-email', {
        to: 'bazarkua@oregonstate.edu',
        from: email,
        message: message,
      });

      setIsSent(true);
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }

    setIsSending(false);
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
        {isSent && <p className={styles.successMessage}>Message sent successfully!</p>}
      </form>
    </div>
  );
};

export default ContactPage;
