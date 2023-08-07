const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors"); // Import the cors package

const app = express();
const port = 5000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// MongoDB Atlas connection string
const uri = process.env.MONGODB_URI;


// Contact route handler
app.post("/api/contact", async (req, res) => {
  const { email, message } = req.body;

  try {
    const client = new MongoClient(uri);
    await client.connect();

    // Replace "your_database_name" with the name of your MongoDB database
    const db = client.db("emails");
    const collection = db.collection("email");

    await collection.insertOne({
      email: email,
      message: message,
      createdAt: new Date(),
    });

    await client.close();

    // Send a response back to the frontend
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Oops! Something went wrong while sending the message." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
