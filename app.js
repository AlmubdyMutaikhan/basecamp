const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const morgan = require('morgan')
const app = express()
const config = require('./config/db')
const cookiParser = require('cookie-parser')
//const { checkUser, requireAuth } = require('./middleware/authMiddleWare')
// middlewares
app.use(morgan('dev'))
app.use(cors()) // CORS middleware 
app.use(bodyParser.json()) // body parser middleware

// set PORT value
const PORT = process.env.PORT || 3000
// set user route
app.get('/', (req, res) => {
    res.send('main page')
})

app.use('/user', userRoute)
mongoose.connect(config.mongodbURI, {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('connected', () => {
    console.log("mongo db connection has succesfully estabilished")
    app.listen(PORT, () => {
        console.log("server is running on port ", PORT)
    })
} )


