const { Router } = require('express')

const userRouter = Router()

const { createUser } = require('./controllers')
const { getAllUsers } = require('./controllers')
const { getUser } = require('./controllers')
const { updateUser } = require('./controllers')
const { deleteAllUsers } = require('./controllers')
const { deleteUser } = require('./controllers')

userRouter.post('/users/create', createUser)
userRouter.get('/users/all', getAllUsers)
userRouter.get('/users/get', getUser)
userRouter.put('/users/update', updateUser)
userRouter.delete('/users/del/all', deleteAllUsers)
userRouter.delete('/users/delete/:id', deleteUser)

module.exports = userRouter