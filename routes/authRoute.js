const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const router = express.Router();
const auth = require('../middleware/auth');

const userModel = require('../models/User');
const User = userModel.model;


const createToken = (user, res) => {
    const payload = {
        id: user.id
    };

    const token = jwt.sign({ 
        userId: payload.id 
    }, process.env.SECRET, { expiresIn: '1h' });


    res.cookie('access_token', token, {
        maxAge: 30*10000
    });

    res.cookie('user_id', payload.id, {
        maxAge: 30*10000
    });
}


router.post('/register', 
[
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
],
async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                // errors: errors.array(),
                error: 'Invalid value' 
            });
        }

        const { name, email, password, repPassword } = req.body;

        const isSignedName = await User.findOne({ name });
        if(isSignedName) return res.status(409).json({ error: 'Try another name, please' });

        const isSignedEmail = await User.findOne({ email });
        if(isSignedEmail) return res.status(409).json({ error: 'User already exists' });

        if(password != repPassword) return res.status(409).json({ error: 'Passwords don\'t match' });

        const hashedPass = await bcrypt.hash(password, saltRounds);

        const user = new User({
            name,
            email,
            password: hashedPass
        });

        await user.save();

        createToken(user, res);

        res.status(201).json({ message: 'logged in' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong, try again later.' }); 
    }
});


router.post('/login', 
[
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
],
async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                errors: errors.array(),
                error: 'Invalid data' 
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) return res.status(409).json({ error: 'Invalid data' });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(409).json({ error: 'Invalid data' });

        createToken(user, res);

        res.status(201).json({ message: 'logged in' });

    } catch (err) {
        res.status(500).json({ error: 'Something went wrong, try again later.' }); 
    }
});


router.post('/logout', auth, async (req, res) => {
    // res.clearCookie('access_token');

    for(let cookieName in req.cookies) {
        if(!req.cookies.hasOwnProperty(cookieName)) {
            continue
        }
        // res.cookie(cookieName, '', {expires: new Date()});
        res.clearCookie(cookieName);
    }

    res.status(201).json({ message: 'logged out' })
})

module.exports = router;