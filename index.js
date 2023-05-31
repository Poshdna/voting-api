require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const databaseConnection = require('./config/database');
const joinUsValidation = require('./validations/join_us');
let db  
app.use(bodyParser.json());

app.listen(port, () => { 

})

app.get('/', (req, res) => { 
    res.status(200).json({
        ok: true,
        msg: 'Hello world'
    });
})


app.post('/join-us', (req, res) => {
   
   const { error, value } = joinUsValidation(req.body)
     if (error !== undefined) { 
        res.status(400).json({
            ok: false,
            msg: error.details[0].message
        });
        return;
     }
    //check if user already exist
    const allCollections = databaseConnection()
    
    
    
    res.status(200).json({
        ok: true,
        msg: 'Join us'
    });
 })

 app.post('/join-us/:bvnOrNin', (req, res) => {
    
    res.status(200).json({
        ok: true,
        msg: 'Join us'
    });
 })


databaseConnection()
.then((result) => {      
    app.listen(port, () => { 
            console.log(`Api Server is running ${port}`);
    });
 })
.catch(() => {
        console.log("Error in database connection");
    
})

