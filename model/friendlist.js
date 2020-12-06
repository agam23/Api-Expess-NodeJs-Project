const mongoose = require('mongoose')

const friendlistSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    friendUserName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserFriend', friendlistSchema)