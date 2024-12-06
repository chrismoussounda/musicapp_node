import 'reflect-metadata';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { seedDatabase } from "./utils/seed";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

// Database and Server Initialization
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connection established");
    
    // Seed database
    await seedDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
