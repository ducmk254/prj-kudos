const homeModel = require("../models/home.model");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

// register:
module.exports.register = async (req, res, next) => {
  try {
    // check user exist:
    const checkUser = await homeModel.userModel.findOne({
      email: req.body.email,
    });
    if (checkUser) {
      const err = new Error("Email đã đăng ký tài khoản rồi");
      err.statusCode = 404;
      return next(err);
    }
    // req.body = firstname, lastname, email,username,password
    let newUser = req.body;
    newUser.password = await bycrypt.hashSync(newUser.password, 10);
    // console.log(newUser);
    const user = await homeModel.userModel.create(newUser);

    // tạo token:
    // const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    console.log(user);
    res.status(200).json({ status: "Đăng ký thành công" });
  } catch (error) {
    console.log("Loi từ phía server " + error);
    res.status(500).json(error);
  }
};

//Login:
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(email);
    const user = await homeModel.userModel.findOne({ email: email });
    if (!user) {
      const err = new Error("Email is not corect");
      err.statusCode = 400;
      return next(err);
    }
    // check password :
    const checkLogin = await bycrypt.compareSync(password, user.password);
    if (!checkLogin) {
      const err = new Error("Password not match");
      err.statusCode = 400;
      return next(err);
    }
    // create token:
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);

    return res.status(200).json({
      status: "success",
      data: { token: token, email: user.email },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getAllUser = async (req, res) => {
  try {
    const list_user = await homeModel.userModel.find();
    return res.status(200).json({
      stauts: "success",
      data: { list_user },
    });
  } catch (error) {
    return res.json(error);
  }
};
module.exports.disableUser = async (req, res, next) => {
  try {
    // input: id
    if (!req.query.userId) {
      const err = new Error("please select a account to disable");
      err.statusCode = 404;
      return next(err);
    }
    const user = await homeModel.userModel.findOneAndUpdate(
      { _id: req.query.userId },
      { active: false }
    );
    return res.status(200).json({ status: "Vô hiệu tài khoản thành công!" });
  } catch (error) {
    return next(error);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    // input userId;
    if (!req.query.userId) {
      const err = new Error("Please select a account to reset");
      err.statusCode = 404;
      return next(err);
    }
    // search user and reset pass: default Mutosi => hash: $2a$10$SF/2R60dZDAopgSnbKWCD.IhqUAa83S0EqIVjiNUN3TAE8X9t8R0G
    const hashPass = await bycrypt.hashSync("Mutosi", 10);
    // console.log(hashPass);
    await homeModel.userModel.findByIdAndUpdate(
      { _id: req.query.userId },
      { password: hashPass }
    );
    return res.status(200).json({ status: "success to reset password" });
  } catch (error) {
    return next(error);
  }
};

module.exports.setAdmin = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    // console.log('userId:'+userId);
    if (!userId) {
      const err = new Error("Vui lòng chọn tài khoản");
      err.statusCode = 404;
      return next(error);
    }
    await homeModel.userModel.findOneAndUpdate(
      { _id: userId },
      { role: "ADMIN" }
    );
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return next(error);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  const data = { email: null };
  try {
    const user = await homeModel.userModel.findOne({ _is: userId });
    data.email = user.email;
    console.log(data);
    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
  } catch (error) {
    return next(err);
  }
};
