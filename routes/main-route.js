var express = require('express')
var router = express.Router()
const mongoose = require("mongoose");
const User = require('../model/user');
const Post = require('../model/post');
const FriendList = require('../model/friendlist');

require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('useCreateIndex', true);

const db = mongoose.connection

db.on('error', (error) => console.log("Db Connection: Success"))

db.on('open', () => console.log("Db Connection: Success"))

// API home page route
router.get('/', function (req, res) {
    res.render('./pages/index', {
        title: 'Voya Vue',
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

//get user profile details by username
router.get('/getUserProfileInfo', async (req, res) => {

    try {
        console.log(req.query.email);
        const post = await Post.find({
            userName: req.query.userName
        })

        const friendList = await FriendList.find({
            userName: req.query.email
        })

        res.json({
            "numberOfPosts": post.length,
            "numberOfFriends": friendList.length
        })
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

//get all Public posts
router.get('/getAllPublicPosts', async (req, res) => {

    try {

        const posts = await Post.find({
            isPrivate: false
        })
        if (posts.length == 0) {
            res.status = 404;
        }
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
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })

        console.log(error.message)
    }

})

//get post by id
router.get('/getPost', async (req, res) => {

    try {
        console.log(req.query.id);
        const post = await Post.findOne({
            _id: req.query.id
        })

        const postUpdate = await Post.updateOne({
            _id: req.query.id
        }, {
            $inc: {
                imgViews: 1
            }
        })

        res.json(post)

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//delete post by id
router.delete('/deletePost', async (req, res) => {

    try {
        console.log(req.query.id);
        const post = await Post.findByIdAndDelete({
            _id: req.query.id
        })

        res.json(post)

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//update post by id
router.put('/updatePost', async (req, res) => {

    try {
        console.log(req.body._id);

        const post = await Post.updateOne({
            _id: req.body._id
        }, {
            $set: {
                imgTitle: req.body.imgTitle,
                imgDesc: req.body.imgDesc,
                imgTag: req.body.imgTag,
                location: req.body.location,
                bestTimeToVisit: req.body.bestTimeToVisit,
                expenseToConsider: req.body.expenseToConsider,
            }
        })

        res.json(post)
    } catch (err) {
        res.status(500).json({
            message: err.message
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

//Update User
router.put('/updateUserInfo', async (req, res) => {

    try {

        const updateUser = await User.updateOne({
            userName: req.body.userName
        }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                dob: req.body.dob,
                sex: req.body.sex,
                bio: req.body.bio
            }
        })

        let updatedUser = await User.findOne({
            userName: req.body.userName
        })

        console.log(updatedUser)

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
        console.log(error.message)
    }

})

//get user Admin DashBoard details
router.get('/getAdminDashBoardDetails', async (req, res) => {

    try {

        const post = await Post.find()

        const user = await User.find()

        const maleUser = await User.find({
            sex: "Male"
        })

        const verifiedPost = await Post.find({
            isVerified: true
        })

        const femaleUser = user.length - maleUser.length

        res.json({
            "numberOfPosts": post.length,
            "numberOfUsers": user.length,
            "numberOfMaleUsers": maleUser.length,
            "numberofFemaleUsers": femaleUser,
            "numberVerifiedPosts": verifiedPost.length
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
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