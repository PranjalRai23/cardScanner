import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/db.js";

import cardRoute from "./routes/card.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use("/api/v1", cardRoute);

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
})