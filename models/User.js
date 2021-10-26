const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    repPassword: { type: String },
    quotes: [
        {
            text: String,
            likes: Array
        }
    ]
});

module.exports = {
    schema: userSchema,
    model: mongoose.model('User', userSchema)
}