const homeModel = require("../models/home.model");

module.exports.getAllTitle = async (req, res, next) => {
  try {
    const list_title = await homeModel.titleModel.find();
    return res.status(200).json({
      status: "sucess",
      data: list_title,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.getTitle = async (req, res, next) => {
  try {
    const list_title = await homeModel.titleModel.findById(req.params.titleId);
    return res.status(200).json({
      status: "sucess",
      data: list_title,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.createTitle = async (req, res, next) => {
  try {
    const { name } = req.body;
    const checkName = await homeModel.titleModel.findOne({ name: name.trim() });
    if (checkName) {
      const err = new Error("Tên title đã tồn tại");
      err.statusCode = 11001;
      return next(err);
    }
    const newTitle = await homeModel.titleModel.create(req.body);
    return res.status(200).json({
      stauts: "sucess",
      data: newTitle,
    });
  } catch (error) {
    return next(error);
  }
};
