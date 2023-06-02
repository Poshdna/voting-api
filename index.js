require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const databaseConnection = require('./config/database');
const joinUsValidation = require('./validations/join_us');
const bvnNinValidation = require('./validations/bvnNin');
const { bvnVerification } = require('./services/blusalt');
const { ninVerification } = require('./services/blusalt');
const { v4: uuidv4 } = require('uuid');
let allCollections = null; 
const { createUser } = require('./controllers/users')


app.use(bodyParser.json());


app.get('/', (req, res) => { 
    res.status(200).json({
        ok: true,
        msg: 'Hello world'
    });
})


app.post('/join-us', async(req, res) => {
    try {
       
        const { error, value } = joinUsValidation(req.body)
        if (error !== undefined) { 
           res.status(400).json({
               ok: false,
               msg: error.details[0].message
           });
           return;
        }
       //check if user already exist
       req.body.id = uuidv4()
       allCollections.userCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            
                res.status(200).json({
                    ok: true,
                    msg: 'Join us'
                });
        })
        .catch(err => { 
            console.log(err)
            
            res.status(400).json({
                ok: false,
                msg: 'Something webnt wrong, please try again later',
                error: err.message
            });
        })  
    
       
  
      
    } catch (error) {
        res.status(201).json({
            ok: true,
            msg: error.message
        })
   }
 
  
 })

 app.post('/register/join-us', async(req, res) => {
    const { error, value } = bvnNinValidation(req.body)
     if (error !== undefined) {
         res.status(400).json({
             ok: false,
             msg: error.details[0].message
         });
         return
     }
     const { bvnOrNin, phone, type } = req.body
     if (type === 'bvn') { 
       const responseFromBvnVerification = await bvnVerification(bvnOrNin, phone)
        // console.log(responseFromBvnVerification)
         if (responseFromBvnVerification.status === 'Invalid') {
            res.status(400).json({
                ok: false,
                msg: responseFromBvnVerification.description ||  'Apologies, we cannot do this this time, please try again later'
            });
            return
         }

         const userPhoneFromBvnCall = responseFromBvnVerification.results.personal_info.phone_number
         //send another otp to user phone number
        //save user details to db
         res.status(200).json({
             ok: true,
            msg: 'An otp has been sent to your phone number, please enter it to continue'
         })
         
     }else if (type === 'nin') {
         const responseFromNinVerification = await ninVerification(bvnOrNin, phone)
         if (responseFromNinVerification.status === 'Invalid') {
            res.status(400).json({
                ok: false,
                msg: responseFromNinVerification.description ||  'Apologies, we cannot do this this time, please try again later'
            });
            return
         }
         const userPhoneFromNinCall = responseFromNinVerification.results.personal_info.phone_number
            //send another otp to user phone number
            //save user details to db
          //send another otp to user phone number
        //save user details to db
        res.status(200).json({
            ok: true,
           msg: 'An otp has been sent to your phone number, please enter it to continue'
        })
     }





 })


databaseConnection()
    .then((result) => { 
        allCollections = result
    app.listen(port, () => { 
            console.log(`Api Server is running ${port}`);
    });
 })
.catch(() => {
        console.log("Error in database connection");
    
})






