const User = require('./model')

const controllers = {}

// create a user, requires a JSON variable as input
controllers.createUser = async (req, res) =>
{
    try 
    {           
        const user = await User.create(req.body)

        res.status(201).json({message:'create of user: ' + req.body.username + ' successful', user:user})
    } 
    catch (error)
    {
       console.log(error)
       res.status(501).json({message:error.message, error:error}) 
    }
}

// get all users
controllers.getAllUsers = async (req, res) =>
{
    try 
    {           
        const users = await User.findAll()

        res.status(201).json({message:'get all users successful (' + users.length + ' found)', users:users})
    } 
    catch (error)
    {
       console.log(error)
       res.status(501).json({message:error.message, error:error}) 
    }
}

// get a user(s) according to a particular criteria ie. "where":{"email":"email address"}
controllers.getUser = async (req, res) =>
{
    try 
    {   
        const criteria = req.body        
        const users = await User.findAll(criteria)

        res.status(201).json({message:'get users successful (' + users.length + ' found)', users:users, count:users.length})
    } 
    catch (error)
    {
       console.log(error)
       res.status(501).json({message:error.message, error:error}) 
    }
}

// edit a user(s) according to a particular criteria
// ie. {"criteria":{"email":"new email address"}, "where":{"id":4}}
// will upate the email column for user no 4
controllers.updateUser = async (req, res) =>
{
    try 
    {   
        const criteria = req.body        
        const user = await User.update
                            (req.body.criteria,
                            {where:req.body.where}
                            )

        res.status(201).json({message:'update successful ', user:user})
    } 
    catch (error)
    {
       console.log(error)
       res.status(501).json({message:error.message, error:error}) 
    }
}

// delete all users on the database
controllers.deleteAllUsers = async (req, res) =>
{
    try 
    {           
        const count = await User.destroy({where:{}})

        res.status(202).json({message:'delete all users successful', count:count})
    } 
    catch (error)
    {
       console.log(error)
       res.status(501).json({message:error.message, error:error}) 
    }
}

// delete users according to a certain criteris
// if :id = '*' then provivde a critieria e.g {"where":{"email":"email address"}}
// if :id = <integer> then delete that user with the supplied id
controllers.deleteUser = async (req, res) =>
{
    try 
    {
        const id = req.params.id
        console.log('Id: ' + id) 
        if (id === '*')
        {
            console.log('go here')
            const count = await User.destroy(req.body)
            res.status(202).json({message:'delete successful (' + count + ' deleted)', count:count})
        }
        else
        {
            console.log('go with id')     
            const count = await User.destroy({where:{id:id}})
            res.status(202).json({message:'delete of user: ' + id + ' successful', count:count})
        }

       
    } 
    catch (error)
    {
       console.log(error)
       res.status(501).json({message:error.message, error:error}) 
    }
}
module.exports = controllers