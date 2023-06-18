const allCollections = require('../config/database')

const createUser = async (data) => {
    
    return await allCollections.userCollection.insertOne(data)
   
}


module.exports = {
    createUser
}