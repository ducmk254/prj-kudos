const homeModel = require("../models/home.model");
const homeController = require("./home.controller");

module.exports.getAllGroup = async (req, res, next) => {
  try {
    const list_group = await homeModel.groupModel.find().populate();
    return res.status(200).json({
      status: "sucess",
      data: list_group,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.createGroup = async (req, res, next) => {
  // route : /api/v1/groups method- post
  try {
    // check ten group da ton tai chua
    // console.log("name:" + req.body.name);
    const checkName = await homeModel.groupModel.findOne({
      name: req.body.name,
    });
    console.log(checkName);
    if (checkName) {
      const err = new Error("Group đã tồn tại");
      err.statusCode = 11001;
      return next(err);
    }
    // tao moi :
    const newGroup = await homeModel.groupModel.create({
      ...req.body,
      name: req.body.name.trim(),
    });
    return res.status(200).json({
      statu: "sucess",
      data: newGroup,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.getGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    if (!groupId) {
      const err = new Error("please input groupId");
      err.statusCode = 404;
      return next(err);
    }
    const group = await homeModel.groupModel.findById(groupId);
    return res.status(200).json({
      status: "sucess",
      data: group,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.updateGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    if (!groupId) {
      const err = new Error("Group ID not include");
      err.statusCode = 404;
      return next(err);
    }
    const group = await homeModel.groupModel.findByIdAndUpdate(groupId, {
      ...req.body,
    });
    return res.status(200).json({
      status: "sucess",
      data: group,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.deleteGroup = async (req, res, next) => {
  try {
    const gr = await homeModel.groupModel.deleteOne({
      _id: req.params.groupId,
    });
    return res.status(200).json({
      status: "sucess",
      data: gr,
    });
  } catch (error) {
    return next(error);
  }
};
