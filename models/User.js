const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    username: {
        type: String,
        unique: true,
    },
    watchlist: {
        type: Array,
        default: []
    },
    createdArticles: [{
        type: mongoose.Types.ObjectId,
        ref: 'Article',
        default: []
    }]
})

module.exports = mongoose.model('User', userSchema)