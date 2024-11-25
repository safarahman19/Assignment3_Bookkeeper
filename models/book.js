let mongoose = require('mongoose');
//create book model
let bookModel = mongoose.Schema({
    name: String,
    author: String,
    originallyPublished: String,
    description: String,
    review: {
        stars: {type: Number, default: 0 },
        text: {type: String, default: ''}
        },
    },
    {
        collection: "books"
    }

);
module.exports = mongoose.model('Book', bookModel);

