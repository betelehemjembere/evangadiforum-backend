require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;

const cors = require('cors');
app.use(cors());

const dbConnection = require("./Database/dbConfig");  // DB connection

// User routes middleware file
const userRoutes = require("./Route/userRoute");
const questionRoutes = require("./Route/questionRoute");
const answerRoutes = require("./Route/answerRoute");
const tagRoutes = require("./Route/tagRoute");

// JSON middleware to extract json data
app.use(express.json());

// User route middleware
app.use("/api/users", userRoutes);

// Questions route middleware
app.use("/api/question", questionRoutes);

// Answers route middleware
app.use("/api/answer", answerRoutes);

// Tag route middleware
app.use("/api/questions", tagRoutes);



// Start server and establish database connection
async function start() {
    try {
        // Ensure dbConnection is resolved before proceeding
        const result = await dbConnection.execute("SELECT 'test'");
        console.log("Database connection established");

        // Start the server after successful DB connection
        await app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
            
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1); // Exit the app if there's a critical error
    }
}

start();
