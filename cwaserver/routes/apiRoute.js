const express = require('express')
const openaiController = require('../api/openai')
const router = express.Router() 
 router.use(express.json())

 router.post('/generate', async (req, res) => {
    try {
        const query = req.body.query;
        console.log('Received query:', query); 
        if (!query) {
            res.status(204).send({"err": '204 (No Content) please provide query '});
            return;
        }
        const generatedText = await openaiController(query);
        console.log('Generated text:', generatedText.choices[0].message); 
        if (generatedText.choices) {
            res.status(200).send(generatedText.choices[0].message);
        } else {
            res.status(500).send('Could not generate');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Error');
    }
});

 module.exports = router

 