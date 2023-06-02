require('dotenv').config();
const axios = require('axios');

const bvnVerification = async (bvn, phone) => { 
    const result = await  axios({
        method: 'post',
        url: `${process.env.BLUSALT_BASE_URL}/IdentityVerification/BVN`,
        headers: {
            'Content-Type': 'application/json',
            'clientid': process.env.BLUSALT_CLIENT_ID,
            'appname': process.env.BLUSALT_APP_NAME,
            'apikey': process.env.BLUSALT_API_KEY,
            
        },
        data: {
               "bvn_number": bvn,
               "phone_number": phone
        },

    })
    
    return result.data
}


const ninVerification = async (nin, phone) => { 

    const result = await  axios({
        method: 'post',
        url: `${process.env.BLUSALT_BASE_URL}/IdentityVerification/NIN`,
        headers: {
            'Content-Type': 'application/json',
            'clientid': process.env.BLUSALT_CLIENT_ID,
            'appname': process.env.BLUSALT_APP_NAME,
            'apikey': process.env.BLUSALT_API_KEY,
            
        },
        data: {
               "nin_number": nin,
               "phone_number": phone
        },

    })
    
    return result.data
}

module.exports = {
    bvnVerification,
    ninVerification
}