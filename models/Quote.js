const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    author: { type: Object, required: true },
    text: { type: String, required: true },
    bgImg: { type: String, required: true },
    likes: { type: Array, required: false },
    styles: { type: Object, required: false }
});

module.exports = {
    schema: quoteSchema,
    model: mongoose.model('Quote', quoteSchema)
}