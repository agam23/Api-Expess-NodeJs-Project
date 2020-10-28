const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true

    },
    imageTitle: {
        type: String,
        required: true
    },
    imageLike: {
        type: Number,
        required: true

    },
    imageDesc: {
        type: String,
        required: true
    },
    imgTags: {
        type: String,
        required: true

    },
    location: {
        type: String,
        required: true
    },
    bestTimeToVisit: {
        type: String,
        required: true

    },
    expenseToConsider: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false

    },
    isPrivate: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Post', postSchema)