const mongoose = require("mongoose");

const titleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Title must be required"],
      trim:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Title", titleSchema);
