const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
    let user = models.User.build({
        username: req.body.username,
        password: req.body.password
    })
    user.save().then(savedUser => {
        console.log("User added.")
    })
})

module.exports = router