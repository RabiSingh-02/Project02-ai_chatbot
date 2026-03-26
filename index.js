const express = require('express');
const ejs = require('ejs');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('pages/index');
});


app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3-8b-instruct",
                messages: [
                    {role: "user", content: userMessage}
                ]
            },
            {
                headers:{
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const reply = response.data.choices[0].message.content;

        res.json({ reply });

    } catch (error) {
        console.log("FULL ERROR:", error.response?.data || error.message);
        res.status(500).json({ error: "Error: AI not generating response" });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server running....");
});