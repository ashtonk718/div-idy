require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const path = require('path');





const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };


  app.get('/firebase-config', (req, res) => {
    // Check if the request has a referer header
    const referer = req.headers.referer;
    if (referer && referer.includes('https://div-idy.com')) {
        // Referer matches allowed URL, send Firebase config
        res.json(firebaseConfig);
    } else {
        // Referer does not match allowed URL, send access restricted message
        res.send('Access restricted. Unauthorized referer.');
    }
});




const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Load API key from environment variables
});

app.post("/getResponse", async (req, res) => { // Change to POST method
  const aiinput = req.body.aiinput; // Retrieve the input from the client

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: aiinput }],
      model: "gpt-3.5-turbo",
    });

    const htmlCode = completion.choices[0]; // Extract HTML code from completion

    res.send(htmlCode); // Send the generated HTML code back to the client
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).send('Error processing request');
  }
});





// Handle requests without .html extension
app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, 'public', `${page}.html`));
});





  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });





