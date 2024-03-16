/**
 * create a mw will check  if the request body is correct
 */

const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config");

const verifySignUpBody = async (req, res, next) => {
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

    const user = await user_model.findOne({ userId: req.body.userId });

    if (user) {
      return res.status(400).send({
        message: "Failld userId already exist"
      });
    }

    next();
  } catch (err) {
    console.log("Error while validating the request object", err);
    res.status(500).send({
      message: "Error while validating the request object"
    });
  }
};

const verifySignInBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "userId is not provided"
    });
  }
  if (!req.body.password) {
    return res.status(400).send({ message: "Password is not provided" });
  }
  next();
};

const verifyToken = (req, res, next) => {
  // Check if token is present or not
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "token is not found"
    });
  }

  // If it's the valid token

  jwt.verify(token, auth_config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorised"
      });
    }
    const user = await user_model.find({ userId: decoded.id });
    if (!user) {
      return res.status(400).send({
        message: "User not found with this token"
      });
    }
    // Set the user info in the req body
    req.user = user;
    next()
  });
  // Then move to the next step
}

const isAdmin = (req, res, next) => {
  const user = req.user
  if (user && user.userType == "ADMIN") {
    next()
  } else {
    return res.status(403).send({
      message: "Only  ADMIN users are allowed to access this endpoint"
    });
  }
};

module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
  verifyToken: verifyToken,
  isAdmin: isAdmin
};
