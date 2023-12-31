import React, { useState } from "react";
import axios from "axios";
import styles from "./ContactPage.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Show "Sending..." toast notification
      toast.warn("🦄 Sending Message", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Log the data before sending to the backend
      console.log("Data to be sent to backend:", { email, message });

      // Send contact form data to the backend API
      await axios.post("/api/contact", {
        email: email,
        message: message,
      });

      setIsSent(true);
      setEmail("");
      setMessage("");

      // Show success toast notification
      toast.success("Message sent successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error:", error);
      // Show error toast notification
      toast.error("Oops! Something went wrong while sending the message.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    setIsSending(false);
  };

  return (
    <div className={styles.backgroundImage}>
    <div className={styles.container}>
      <h1>Contact Me</h1>
      <h2>
        Let me know if you have any questions, I will try to respond as fast as
        I can :)
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>
        {isSent && (
          <p className={styles.successMessage}>Message sent successfully!</p>
        )}
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default ContactPage;
