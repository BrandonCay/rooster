const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv')

dotenv.config();
module.exports = (req, res, next) => {
    const token  = req.header('auth-token');//gets data from custom header with token. Client has stored token from login response
    console.log('verifying');
    if(!token) return res.status(401).send('Access Denied (no token detected)');
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)//returns payload decoded 
        req.userId=verified;//set user equal to user db _id
        //adds userId to req to be used in next route. 
        console.log('next');
        next();
    }catch(e){
        res.status(400).send('Invalid Token');
    }

}