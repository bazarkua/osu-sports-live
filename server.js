const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

// MongoDB connection URI
const uri =
  "mongodb+srv://adilbekbazarkulov1:Dv036TC8q6qCJg3j@cluster0.0ndjkpx.mongodb.net/emails?retryWrites=true&w=majority";

// Create a MongoDB client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    // Call the function to start the server after connecting to MongoDB
    startServer();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code (1) if the connection fails
  }
}

// Call the connectToMongoDB function to establish the connection
connectToMongoDB();

// Mongoose schema for email documents
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});

// Mongoose model for the "email" collection
const EmailModel = mongoose.model("Email", emailSchema);

// Express middleware to parse incoming request body as JSON
app.use(express.json());

// CORS Configuration (Adjust origin as needed)
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Define your API routes here
app.post("/api/contact", async (req, res) => {
  try {
    const { email, msg } = req.body;
    console.log("Received contact form data:", { email, msg });

    // Retry Strategy: Try inserting the data with a timeout of 1 minute (60000 milliseconds)
    const timeoutDuration = 60000;
    let retryCount = 3;

    while (retryCount > 0) {
      try {
        // Create a new document using the Mongoose model
        const newEmail = new EmailModel({ email, msg });

        // Save the document to the database with the specified timeout
        await newEmail.save({ w: "majority", wtimeout: timeoutDuration });

        res.status(200).json({ msg: "Message received successfully!" });
        return; // Exit the loop if the save operation is successful
      } catch (error) {
        console.error("Error saving contact form data:", error);
        retryCount--;
        if (retryCount > 0) {
          console.log(`Retrying insertion. Attempts left: ${retryCount}`);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      }
    }

    // If all retries fail, send an error response
    res
      .status(500)
      .json({ error: "Failed to save data after multiple retries." });
  } catch (error) {
    console.error("Error handling contact form data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Start the server
function startServer() {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
