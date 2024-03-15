const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");
const bcrypt = require("bcryptjs");

/**
 * Create admin user
 */

//Connect to MongoDB

mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to mongodb");
});

db.once("open", () => {
  console.log("Connect to mongodb");
  init();
});

async function init() {
  try {
    let user = await user_model.findOne({ userId: "admin" });

    if (user) {
      console.log("Adminn is already present");
      return;
    }
  } catch (err) {
    console.log("Error while reading the data", err);
  }

  try {
    user = await user_model.create({
      name: "Mihir",
      userId: "admin",
      email: "mihir@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("Welcome1", 8)
    });
    console.log("Admin created", user);
  } catch (err) {
    console.log("Error while creating admin", err);
  }
}

/**
 * Start server
 */

app.listen(server_config.PORT, () => {
  console.log("Server started at port no : ", server_config.PORT);
});
