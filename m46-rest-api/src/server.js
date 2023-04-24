require('dotenv').config()
const express = require('express')

const port = process.env.PORT || 5001

const app = express()

app.use(express.json())

const syncTables = () =>
{

}

app.get('/health', (req, res) =>
    {
        res.status(200).json({message:'API is working'})
    }
)

app.listen(port, () => 
    {
        syncTables()
        console.log(`Server is running on port ${port}`)
    }
)