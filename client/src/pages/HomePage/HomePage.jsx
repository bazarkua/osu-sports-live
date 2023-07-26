import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <main className="home-page">
      <div className="content-container">
        <h1>About OSU Sports Live</h1>
        <p>
          Hey there! 🎉 Welcome to OSU Sports Live! Let me tell you about the
          tech stack I used to build this awesome app that keeps you updated
          with all the exciting sports events happening at Oregon State
          University.
        </p>
        <p>
          For the frontend, I chose React.js, which is an amazing JavaScript
          library for building user interfaces. It's been great to work with
          React because it allows me to create reusable components and
          efficiently manage the app's state, providing a smooth and interactive
          user experience.
        </p>
        <p>
          On the backend, I utilized Node.js along with the Express framework.
          Node.js is a server-side JavaScript runtime that enables me to handle
          API requests and manage the server effectively. Express makes routing
          and handling requests a breeze, making the backend development process
          much smoother.
        </p>
        <p>
          To store and manage all the sports event data, I decided to go with
          MongoDB. Its flexibility and scalability make it a perfect fit for
          this dynamic app.
        </p>
        <p>
          For handling HTTP requests between the frontend and backend, I used
          the Axios library. It's been incredibly useful in simplifying
          asynchronous operations and ensuring smooth data exchange.
        </p>
        <p>
          And of course, I couldn't forget about those delightful toast
          notifications! To add that touch of flair, I integrated
          React-Toastify, which allows me to provide user-friendly and
          customizable toast notifications for various events, ensuring a
          delightful user experience.
        </p>

        <p>Let's Go Beavers! 🦫🏀🏈</p>
        <p>Happy cheering, Adilbek</p>
      </div>
    </main>
  );
};

export default HomePage;
