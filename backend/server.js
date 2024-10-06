import path from "path";
import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/db.js";

import cardRoute from "./routes/card.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/v1", cardRoute);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
})