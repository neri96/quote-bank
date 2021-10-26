const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();
const auth = require('../middleware/auth');

const Quote = require('../models/Quote').model;
const User = require('../models/User').model;

const imgPath = '../client/src/images/quote-bg';


router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find().sort( { _id: -1 } );
        
        // if(req.cookies.access_token) {
        //     const decoded = jwt.verify(req.cookies.access_token, process.env.SECRET);
        //     console.log(Array.isArray(quotes));
            
        //     return res.status(201).json({ quotes, userId: decoded.userId });
        // }

        res.status(201).json({ quotes });
    } catch (err) {
        res.status(409).json({ error: 'Something went wrong, try again later.' });
        throw err;
    }
});

router.post('/new', auth, async (req, res) => {
    try {
        const { text, color, font } = req.body;

        if(!text) return res.status(409).json({ error: 'Quote can\'t be empty. Creative crisis, huh?' });

        const exists = await Quote.findOne({ text });
        if(exists) return res.status(409).json({ error: 'This quote already exists' });

        const user = await User.findById(req.user.userId);

        const imgs = fs.readdirSync(path.join(__dirname, imgPath));

        const bgImg = imgs[Math.floor(Math.random() * imgs.length)];

        const quote = new Quote({
            text,
            bgImg,
            author: {
                _id: user._id,
                name: user.name
            },
            styles: {
                color,
                font
            }
        });

        await quote.save();

        res.status(201).json({ message: 'Successfully added new post!' });
    } catch (err) {
        res.status(409).json({ error: 'Something went wrong, try again later.' });
        throw err;
    }
});

router.patch('/edit/:id', auth, async (req, res) => {
    try {
        const { text, color, font } = req.body;

        const quoteToEdit = await Quote.findOne({ _id: req.params.id });

        if(quoteToEdit.author._id != req.user.userId) {
            return res.status(409).json({ error: 'Only a user who created the quote is allowed to edit it.' });
        }

        if(!text) return res.status(409).json({ error: 'Quote can\'t be empty. Creative crisis, huh?' });

        // const exists = await Quote.findOne({ text });
        // if(exists) return res.status(409).json({ error: 'This quote already exists' });

        Quote.findByIdAndUpdate(
            { _id: req.params.id }, 
            { $set: { text, styles: { color, font } }}, 
            (err) => {
                if(err) throw err;
                res.status(201).json({ message: 'Successfully updated' });
        });
    } catch (err) {
        res.status(409).json({ error: 'Something went wrong, try again later.' });
        throw err;
    }
});

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const quoteToDel = await Quote.findOne({ _id: req.params.id });

        if(quoteToDel.author._id != req.user.userId) {
            return res.status(409).json({ error: 'Only a user who created the quote is allowed to delete one' });
        }

        await Quote.findOneAndDelete({ _id: req.params.id });

        res.status(201).json({ message: 'Successfully deleted' });
    } catch (err) {
        res.status(409).json({ error: 'Something went wrong, try again later.' });
        throw err;
    }
});

router.patch('/like/:id', auth, async (req, res) => {
    try {
        const { userId } = req.user;

        const quote = await Quote.findOne({ _id: req.params.id });

        // const likedId = await quote.likes.find(el => el === userId);

        const likedInd = quote.likes.indexOf(userId);

        if(likedInd > -1) {
            console.log(likedInd);
            quote.likes.splice(likedInd, 1);
            // quote.likes = quote.likes.filter(el => el !== userId);
            await quote.save();
            return res.status(201).json({ message: 'Successfully unliked' });
        }

        quote.likes.push(userId);

        await quote.save();

        res.status(201).json({ message: 'Successfully liked' });

    } catch (err) {
        res.status(409).json({ error: 'Something went wrong, try again later.' });
        throw err;
    }
})

module.exports = router;