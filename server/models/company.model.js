const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Title must be required"],
    },
    mst: {
      type: String,
      trim: true,
      require: [true, "MST là bắt buộc"],
      unique: true,
    },
    address: {
      type: String,
      trim: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
