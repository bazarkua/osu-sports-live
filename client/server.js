const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors"); // Import the cors package
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const uri = process.env.MONGODB_URI;

// Contact route handler
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, message } = req.body;

  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("emails");
    const collection = db.collection("email");

    await collection.insertOne({
      email: email,
      message: message,
      createdAt: new Date(),
    });

    await client.close();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Oops! Something went wrong while sending the message." });
  }
};
