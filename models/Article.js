const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 8
    },
    paragraphs: [{
        type: String,
        required: true,
        minLength: 16,
        maxLength: 300
    }],
    image: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dateCreated: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Article', articleSchema)