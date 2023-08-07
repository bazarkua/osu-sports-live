// AboutPage.js
import React from "react";
import { Parallax } from "react-parallax";
import "./AboutPage.css";
import sketchImg from "../../images/sketch.jpg";
import mernStackImg from "../../images/mern-stack.jpg";
import letsgoBeaverImg from "../../images/beaver.jpg";

const AboutPage = () => {
  return (
    <main className="about-page">
      <div className="parallax-section">
        <div className="parallax-content">
          <h1>About OSU Sports Live</h1>
          <h2 className="h2__about">User-Friendly Sports Dashboard: 🏆</h2>
          <p className="p__parallax">
            My vision for this CS406 project was to craft a sleek dashboard with
            a user-friendly interface, enabling everyone to stay up-to-date with
            PAC-12 events and track the performance of our beloved OSU teams
            across various sports categories. While osubeavers.com offers sports
            event information, I observed that its interface can feel heavy and
            inundate users with unnecessary athletic details. Thus, my approach
            was to create a straightforward dashboard, presenting upcoming and
            live events to rally support for our OSU teams! 🎉
          </p>
          <h2 className="h2__about">From Rough Sketch to Clear Path: 🎨</h2>
          <p className="p__parallax">
            As you may have noticed, the initial sketch was a rough draft,
            providing a starting point for my creative journey. It gave me a
            direction to follow and refine as I progressed. I firmly believe
            that sketching is a crucial aspect of the design process, and I
            aspire to enhance my sketching skills in the future, incorporating
            them more extensively into my projects. After all, great ideas often
            stem from the simplest beginnings! 😊
          </p>
        </div>
        <Parallax
          bgImage={sketchImg}
          strength={900}
          className="parallax-image"
          bgImageStyle={{ height: "800px", width: "1000px" }}
        />
      </div>

      <div className="parallax-section">
        <div className="parallax-content">
          <h2 className="h2__about">
            Building this Website: What Did I Use? 🛠️
          </h2>
          <p className="p__parallax">
            To create this website for CS406, I leveraged the powerful MERN
            stack, which stands for Mongo, Express, React, and Node.js. The
            entire front end is crafted using CSS styling modules, ensuring a
            visually appealing user experience. Effectively fetching data from
            APIs, I implemented efficient JavaScript algorithms to filter and
            manipulate the data based on user interface selections. Moreover, I
            integrated MongoDB to receive messages sent through the contact
            page, making it easier to stay in touch with visitors.
          </p>
          <h2 className="h2__about">Looking ahead🚀</h2>
          <p className="p__parallax">
            I have exciting plans to expand this website. My vision is to build
            a user database using MongoDB, enabling users to engage in various
            activities. For instance, they'll be able to bet imaginary "beaver
            tokens" on matches, share their thoughts on match results, and
            follow their favorite PAC-12 teams! Stay tuned for more exciting
            developments on this platform!
          </p>
        </div>
        <Parallax
          bgImage={mernStackImg}
          strength={900}
          className="parallax-image"
          bgImageStyle={{ height: "500px", width: "1000px" }}
        />
      </div>

      <div className="parallax-section-end">
        <Parallax
          bgImage={letsgoBeaverImg}
          strength={900}
          className="parallax-image-end"
        />
        <div className="h2__about__end">
          <h1>Thanks for reading about this project.</h1>
          <h1>SCO BEAVES!</h1>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
