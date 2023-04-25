const User = require('../users/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JsonWebTokenError = require('jsonwebtoken/lib/JsonWebTokenError')

const saltRounds = process.env.SALT_ROUNDS

const middleware = {}

middleware.hashPass = async (req, res, next) =>
{  
    try 
    {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        next()
    } 
    catch (error) 
    {
        res.status(501).json({error: error.message})
    }
}

middleware.comparePass = async (req, res, next) =>
{
    try 
    {

        //const user = await User.findAll({where : {username: req.body.username}})
        req.user = await User.findOne({where: {username:req.body.username}})
        if (req.user === null) 
        {
            throw new Error ('password and user do not match')
        }

        const match = await bcrypt.compare(req.body.password, req.user.password) 

        if (!match)
        {
            throw new Error('password or username do not match') 
        }
        
        req.body.id = req.user.id
        req.body.email = req.user.email
        next()
    } 
    catch (error) 
    {
        res.status(501).json({error: 'Compare Pass Error - ' + error.message})
    }
}

middleware.tokenCheck = async (req, res, next) =>
{
    try 
    {
        if (!req.header('Authorization'))
        {
            throw new Error('No header or token passed in this request')
        }
     
        const token = req.header('Authorization').replace('Bearer ', '')

        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({where: {id:decodedToken.id}})

        if (!user)
        {
            throw new Error('User is not authorised')
        }

        req.authorUser = user
        
        next()
    } 
    catch (error) 
    {
        res.status(501).json({error: 'Token Check Error - ' + error.message})
    }
}

module.exports = middleware