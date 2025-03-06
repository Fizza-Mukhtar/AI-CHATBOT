require("dotenv").config({ path: "./.env" });
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cors());
console.log("API Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

app.post("/chat", async (req, res) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: req.body.message }]
            },
            {
                headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" }
            }
        );
        res.json(response.data.choices[0].message);
    } catch (error) {
        res.status(500).json({ error: "Error fetching response from OpenAI" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
