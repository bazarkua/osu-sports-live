const { MongoClient } = require("mongodb");
const cors = require('micro-cors')();


const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, message } = req.body;

    const uri = process.env.MONGODB_URI;

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
  } else {
    res.status(405).send('Method not allowed');
  }
};

module.exports = cors(handler);
