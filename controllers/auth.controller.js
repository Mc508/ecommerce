/**
 * Register user
 */

const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config");

exports.signup = async (req, res) => {
  // create user

  // 1. Read request body
  const request_body = req.body;

  // 2. Insert the data in the Users collection in MongoDB
  const userObj = {
    name: request_body.name,
    userId: request_body.userId,
    email: request_body.email,
    userType: request_body.userType,
    password: bcrypt.hashSync(request_body.password, 8)
  };

  try {
    const user_created = await user_model.create(userObj);

    // RETURN USER
    const res_obj = {
      name: user_created.name,
      userId: user_created.userId,
      email: user_created.email,
      userType: user_created.userType,
      createdAt: user_created.createdAt,
      updatedAt: user_created.updatedAt
    };
    res.status(201).send(res_obj);
  } catch (err) {
    console.log("error while registring user ", err);
    res.status(500).send({
      message: "Internal server error"
    });
  }
  // 3. Return the response back to the user
};

exports.signin = async (req, res) => {
  //Check if the user id is present
  const user = await user_model.findOne({ userId: req.body.userId });

  if (user == null) {
    return res.status(400).send({
      message: "User is passed is not valid user id"
    });
  }

  //Password is correct
  const isPasswordValid = await bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(400).send({
      message: "Password is incorrect"
    });
  }

  // using jwt we will create the access token with a given TTL and return
  const token = jwt.sign({ id: user.userId }, secret.secret, {
    expiresIn: 120
  });

  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    accessToken: token
  });
};
