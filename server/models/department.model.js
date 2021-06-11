const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      trim: true,
      require: [true, "Name of department must be required"],
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      require: [true, "department must be children of group"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
