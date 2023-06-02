const allCollections = require('../config/database')

const createUser = (data) => {
    
    return allCollections.userCollection.insertOne(data)
   
}


module.exports = {
    createUser
}