require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/indexRouter')
const cors = require("cors");

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`))
    } catch (e) {
        console.log("Error: ", e.message)
        process.exit(1)
    }
}

start()


