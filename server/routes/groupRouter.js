const {Router} = require('express')
const userRouter = Router()
const {addGroup} = require('../controllers/groupController')

userRouter.post('/add', addGroup)

module.exports = userRouter

