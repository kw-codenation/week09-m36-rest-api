const { Router } = require('express')

const userRouter = Router()

const { createUser } = require('./controllers')
const { loadUsers } = require('./controllers')
const { getAllUsers } = require('./controllers')
const { getUser } = require('./controllers')
const { updateUser } = require('./controllers')
const { deleteAllUsers } = require('./controllers')
const { deleteUser } = require('./controllers')
const { login } = require('./controllers')
const { hashPass, comparePass } = require('../middleware')

userRouter.post('/users/create', hashPass, createUser)
userRouter.post('/users/load', loadUsers)
userRouter.get('/users/all',  getAllUsers)
userRouter.get('/users/get', getUser)
userRouter.put('/users/update', updateUser)
userRouter.delete('/users/del/all', deleteAllUsers)
userRouter.delete('/users/delete/:id', deleteUser)
userRouter.post('/users/login', comparePass, login)

module.exports = userRouter