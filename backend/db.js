const mongoose = require("mongoose");
const mongoURI ="mongodb+srv://gprakhar141:gofood@cluster0.diz5xjt.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const optionsSchema = new mongoose.Schema({
  half: String,
  full: String
});

const itemSchema = new mongoose.Schema({
  CategoryName: String,
  name: String,
  img: String,
  options: [optionsSchema],
  description: String
});

const catSchema = new mongoose.Schema({
  CategoryName: String
})

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas');

    const FoodItem = mongoose.model('FoodItem', itemSchema, 'food_items');
    const items = await FoodItem.find({}).exec();
    //console.log('Food Items:', items);
    //global.food_items = items;
    const foodCategory = mongoose.model('foodCategory', catSchema, 'foodCategory');
    const catData = await foodCategory.find({}).exec();

    global.food_items = items;
    global.foodCategory = catData;

  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  } finally {
    mongoose.disconnect(); // Close the Mongoose connection
  }
};


module.exports = mongoDB;
