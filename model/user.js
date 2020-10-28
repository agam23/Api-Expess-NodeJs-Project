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
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true

    },
    bio: {
        type: String,
        required: true

    }
})

module.exports = mongoose.model('User', userSchema)