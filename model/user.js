const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        dropDups: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    contactNumber: {
        type: String,
    },
    dob: {
        type: Date
    },
    sex: {
        type: String,
    },
    bio: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)