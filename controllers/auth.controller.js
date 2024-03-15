/**
 * Register user
 */

const bcrypt=require('bcryptjs');
const user_model=require('../models/user.model')
exports.signup = async(req,res)=>{
    // create user

    // 1. Read request body
    const request_body = req.body
    
    // 2. Insert the data in the Users collection in MongoDB
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
    }

    try{
        const user_created = await user_model.create(userObj)

        // RETURN USER
        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }
        res.status(201).send(res_obj)

    }
    catch(err){
        console.log("error while registring user " , err);
        res.status(500).send({
            message:"Internal server error"
        })
    }
    // 3. Return the response back to the user
}