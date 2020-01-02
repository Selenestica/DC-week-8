const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
app.use(express.urlencoded())

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

var pgp = require('pg-promise')()
var connectionString = 'postgres://localhost:5432/blogdb'
var db = pgp(connectionString)

app.post('/posts', (req, res) => {
    let title = req.body.title
    let body = req.body.body

    db.none('INSERT INTO posts(title, body) VALUES($1, $2)', [title, body]).then(() => {
        res.redirect('/posts')
    })
})

app.get('/posts',async (req,res) => {
    let results = await db.any('SELECT post_id, title, body FROM posts;')
    res.render('index',{posts: results})
})

app.post('/delete/:postID', async (req, res) => {
    await db.any(`DELETE FROM posts WHERE post_id = ${req.params.postID}`)
    res.redirect('/posts')
})

app.post ('/update/:postID', async (req, res) => {
    let titleUpdated = req.body.titleUpdated
    let bodyUpdated = req.body.bodyUpdated
    await db.any(`UPDATE posts SET title = '${titleUpdated}', body = '${bodyUpdated}' WHERE post_id = ${req.params.postID}`)
    res.redirect('/posts')
})

// starting the server
app.listen(2000, () => {
    console.log("Server is running...")
})