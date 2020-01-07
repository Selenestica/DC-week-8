const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const bodyParser = require('body-parser')
global.models = require('./models')
const indexRouter = require('./routes/index')
const postsRouter = require('./routes/posts')
const accountRouter = require('./routes/account')
app.use(bodyParser.urlencoded({extended: false}))

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use('/', indexRouter)
app.use('/posts', postsRouter)
app.use('/account', accountRouter)

app.listen(2700, () => {
    console.log("server running...")
})

