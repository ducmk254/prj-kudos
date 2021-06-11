const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      require: [true, "First Name must be required"],
    },
    lastname: {
      type: String,
      trim: true,
      require: [true, "Last Name must be required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      require: [true, "Email must be required"],
    },
    password: {
      type: String,
      trim: true,
      require: [true, "Password must be required"],
      min: [6, "Password must be at least 6 characters"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    point: {
      type: Number,
      default: 200,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// pre-middleware:
// UserSchema.pre("save", function (next) {
//   let user = this;
//   bcryptjs.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       // return next(err);
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   });
// });
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
