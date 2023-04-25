const { Router } = require('express')

const userRouter = Router()

const 
    {createUser
    ,loadUsers
    ,getAllUsers
    ,getUser
    ,updateUser
    ,deleteAllUsers
    ,deleteUser
    ,login 
    } = require('./controllers')

const 
    {hashPass
    ,comparePass
    ,tokenCheck
    } = require('../middleware')

userRouter.post('/users/create', hashPass, createUser)
userRouter.post('/users/load', loadUsers)
userRouter.get('/users/all',  tokenCheck, getAllUsers)
userRouter.get('/users/get', getUser)
userRouter.put('/users/update', updateUser)
userRouter.delete('/users/del/all', deleteAllUsers)
userRouter.delete('/users/delete/:id', deleteUser)
userRouter.post('/users/login', comparePass, login)

module.exports = userRouter