const express = require('express')
const router = express.Router()

router.post('/add-post', (req, res) => {
    let post = models.Post.build({
        title: 'Hello Sequelize',
        body: 'Body for Sequelize'
    })
    post.save().then(savedPost => {
        console.log("Post saved.")
    })
})

router.post('/update-post/:postID', (req, res) => {
    models.Post.update({
        title: 'Goodbye SQlize'
    }, {
    where: {
        id: req.params.postID
           }
    })
})

router.post('/delete-post/:postID', (req, res) => {
    models.Post.destroy({
        where: {
            id: req.params.postID
        }
    })
})

router.get('/:postId', (req,res) => {
    const postId = parseInt(req.params.postId) 
    models.Post.findByPk(postId).then(post => res.json(post))
})

router.get('/', (req, res) => {
    models.Post.findAll().then(posts => res.json(posts))
})

router.get('/category/:category', (req, res) => {
    models.Post.findAll({
        where: {
            category: req.params.category
        }
    }).then(posts => res.json(posts))
})

router.get('/isPublished/:published', (req, res) => {
    models.Post.findAll({
        where: {
            isPublished: req.params.published
        }
    }).then(posts => res.json(posts))
})

module.exports = router