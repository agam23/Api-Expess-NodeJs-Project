var express = require('express')
var router = express.Router()
const mongoose = require("mongoose");
const User = require('../model/user');
const Post = require('../model/post');

require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})

mongoose.set('useCreateIndex', true);

const db = mongoose.connection

db.on('error', (error) => console.log("Db Connection: Success"))

db.on('open', () => console.log("Db Connection: Success"))

// API home page route
router.get('/', function (req, res) {
    res.render('./pages/index', {
        title: 'Voga Vue',
        message: 'Status: Running'
    })
})

//get all users - for dev
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

//get user by emailId
router.get('/userInfo', async (req, res) => {
    let user

    try {
        console.log(req.query.email);
        const user = await User.findOne({
            email: req.query.email
        })
        res.json(user)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//get posts by userName
router.get('/getPostsByUser', async (req, res) => {

    try {
        console.log(req.query.userName);
        const posts = await Post.find({
            userName: req.query.userName
        })
        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//add Post 
router.post('/addPost', async (req, res) => {

    console.log(req.body);

    const post = new Post({
        userName: req.body.userName,
        img: req.body.img,
        imgTitle: req.body.imgTitle,
        imgLike: req.body.imgLike,
        imgDesc: req.body.imgDesc,
        imgTag: req.body.imgTag,
        location: req.body.location,
        bestTimeToVisit: req.body.bestTimeToVisit,
        expenseToConsider: req.body.expenseToConsider,
        isVerified: req.body.isVerified,
        isPrivate: req.body.isPrivate
    })

    try {
        const newPost = await post.save()
        console.log(newPost)
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

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

//get user by emailId
router.get('/user/:id', getUser, (req, res) => {
    res.json(res.user)
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
        console.log(req.params.id)
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