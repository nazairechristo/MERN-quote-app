const express = require('express');
const router = express.Router();
const Quote = require('../models/Quotes');

// Get all routes
router.get('/', async (req, res) => {
    console.log('all Quotes Here');

    const quotes = await Quote.find();

    res.json(quotes);
});

// create new quote 
router.post('/new', async (req, res) => {
    const newQuote = new Quote(req.body);

    const quoteSaved = await newQuote.save();
    
    res.json(newQuote);

    // or const quoteSaved = await newQuote.create();
});


// Get one quote specific
router.get('/get/:id', async (req, res) => {
    const oneQuote = await Quote.findById({_id: req.params.id});

    res.json(oneQuote);
});


// DELETE by ID
router.delete('/delete/:id', async (req, res) => {
    const deleteQuote = await Quote.findByIdAndDelete({_id: req.params.id});

    res.json(deleteQuote);
});


// UPDATE Quote

router.patch('/update/:id', async (req, res) => {

    const updateQuote = await Quote.updateOne({_id: req.params.id}, {$set: req.body});

    res.json(updateQuote);

});

// Random Quote 


router.get('/random', async (req, res) => {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(random);

    res.json(randomQuote);
})






module.exports = router;