const homeModel = require("../models/home.model");
module.exports.getAllPosition = async (req, res, next) => {
  try {
    const list_position = await homeModel.positionModel.find().populate();
    return res.status(200).json({
      status: "sucess",
      data: list_position,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getPosition = async (req, res, next) => {
  try {
    const { positionId } = req.params;
    if (!positionId) {
      const err = new Error("Bạn chưa chọn position");
      err.statusCode = 404;
      return next(err);
    }
    const position = await homeModel.positionModel.findById(positionId);
    return res.status(200).json({
      status: "sucess",
      data: position,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.createPosition = async (req, res, next) => {
  try {
    const { name } = req.body;
    const checkName = await homeModel.positionModel.findOne({
      name: name.trim(),
    });
    if (checkName) {
      const err = new Error("Position đã tồn tại");
      err.statusCode = 11001;
      return next(err);
    }
    const newPossition = await homeModel.positionModel.create({
      ...req.body,
      name: name.trim(),
    });
    return res.status(200).json({
      status: "sucess",
      data: newPossition,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.deletePosition = async (req, res, next) => {
  try {
    const { positionId } = req.params;
    if (!positionId) {
      const err = new Error("Vui lòng chọn position");
      err.statusCode = 404;
      return next(err);
    }
    const position = await homeModel.positionModel.deleteOne(positionId);
    return res.status(200).json({
      status: "sucess",
      data: position,
    });
  } catch (error) {
    return next(error);
  }
};
