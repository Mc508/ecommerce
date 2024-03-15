/**
 * create a mw will check  if the request body is correct
 */

const user_model=require('../models/user.model')
const verifySignUpBody = async(req, res, next) => {

  try {
    // Check for the name,email,userid,user with smae user id

    if (!req.body.name) {
      return res.status(400).send({
        message: "Name will not provided"
      });
    }

    if (!req.body.email) {
      return res.status(400).send({
        message: "Email will not provided"
      });
    }
    
    if (!req.body.userId) {
      return res.status(400).send({
        message: "UserId will not provided"
      });
    }

    const user = await user_model.findOne({userId: req.body.userId})

    if(user){
        return res.status(400).send({
            message:"Failld userId already exist"
        })
    }

    next()
  } catch (err) {
    console.log("Error while validating the request object", err);
    res.status(500).send({
      message: "Error while validating the request object"
    });
  }
};

module.exports={
    verifySignUpBody:verifySignUpBody
}