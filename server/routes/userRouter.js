const {Router} = require('express')
const userRouter = Router()
const {addUser, getUsers, removeUser} = require('../controllers/userController')

userRouter.post('/add', addUser)
userRouter.get('/all', getUsers)
userRouter.delete('/:id', removeUser)

module.exports = userRouter

