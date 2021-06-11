const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Title must be required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      require: [true, "Group must be required of Company"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
