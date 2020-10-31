var express = require('express')
var router = express.Router()
const mongoose = require("mongoose");
const User = require('../model/user');

require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})

mongoose.set('useCreateIndex', true);

const db = mongoose.connection

db.on('error', (error) => console.log("Db Connection: Success"))

db.on('open', () => console.log("Db Connection: Success"))

// home page route
router.get('/', function (req, res) {
    res.render('./pages/index', {
        title: 'Voga Vue',
        message: 'Status: Running'
    })
})

// define the about route
router.get('/about', function (req, res) {
    //if you dont want templating
    res.send('<h1>About Page</h1>')
})

//get all user
router.get('/users', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//get user by id 
router.get('/user/:id', getUser, (req, res) => {
    res.json(res.user)
})

//add user 
router.post('/addUser', async (req, res) => {

    console.log(req.body)

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        dob: req.body.dob,
        sex: req.body.sex,
        bio: req.body.bio
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

})

//delete user
router.delete('/user/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({
            message: 'User Deleted'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// get a user by id
async function getUser(req, res, next) {

    let user

    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({
                message: 'Canot find user'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.user = user
    next()
}

module.exports = router