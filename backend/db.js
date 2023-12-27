const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://gprakhar141:gofood@cluster0.diz5xjt.mongodb.net/?retryWrites=true&w=majority";
const mongoDB = async () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true })

    .then(async () => {
      console.log("Connected to MongoDB database");
    })
    .catch((err) => {
      console.error("Connection error:", err);
    });
};

module.exports = mongoDB;
