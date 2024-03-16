/**
 * Controller for creating category
 */

const category_model = require("../models/category.model");

exports.createNewCategory = async (req, res) => {
  // read the req body

  // create the category
  const cat_data = {
    name: req.body.name,
    description: req.body.description
  };

  try {
    // insert the mongodb
    const category = await category_model.create(cat_data);
    return res.status(201).send(category);
  } catch (err) {
    console.log("Erro while creating the category : ", err);
    return res.status(500).send({
      message: "Error while creating the category"
    });
  }

  // return the response of the created category
};
