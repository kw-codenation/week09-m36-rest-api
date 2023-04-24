// username
// email
// password

const { DataTypes } = require('sequelize')
const connection = require('../db/connection.js')

const User = connection.define
('user',
    {username:  
        {type: DataTypes.STRING
        , allowNull: false
        }
    ,email: 
        {type: DataTypes.STRING
        ,allowNull:false
        }
    ,password: 
        {type: DataTypes.STRING
        ,allowNull:false
        }
    }
    ,
    {
        indexes: 
            [
                {unique: true
                ,fields: ['username', 'email']
                }
            ]
    }
)

module.exports = User
