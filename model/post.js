const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true

    },
    img: {
        type: String,
        required: true
    },
    imgTitle: {
        type: String,
        required: true
    },
    imgLike: {
        type: Number,
        required: true

    },
    imgDesc: {
        type: String,
        required: true
    },
    imgTag: {
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
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)