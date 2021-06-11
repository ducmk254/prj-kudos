const homeModel = require("../models/home.model");

module.exports.getAllDepartment = async (req, res, next) => {
  try {
    const list_depart = await homeModel.departmentModel.find().populate();
    return res.status(200).json({
      status: "sucess",
      data: list_depart,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.getDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    if (!departmentId) {
      const err = new Error("Department ID not input");
      err.statuCode = 404;
      return next(err);
    }
    const dep = await homeModel.departmentModel.findById(departmentId);
    return res.status(200).json({
      status: "sucess",
      data: dep,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    const depart = await homeModel.departmentModel.findOne({ name: name });
    if (depart) {
      const err = new Error("Department Name đã tồn tại");
      err.statusCode = 404;
      return next(err);
    }
    const newDep = await homeModel.departmentModel.create(req.body);
    return res.status(200).json({
      status: "sucess",
      data: newDep,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.updateDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    if (!departmentId) {
      const err = new Error("Vui lòng truyền ID của department");
      err.statusCode = 404;
      return next(err);
    }
    const department = await homeModel.departmentModel.findByIdAndUpdate(
      departmentId,
      { ...req.body }
    );
    return res.status(200).json({
      status: "sucess",
      data: department,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.deleteDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    if (!departmentId) {
      const err = new Error("Vui lòng truyền ID của department");
      err.statusCode = 404;
      return next(err);
    }
    const department = await homeModel.departmentModel.findByIdAndDelete(
      departmentId,
      { ...req.body }
    );
    return res.status(200).json({
      status: "sucess",
      data: department,
    });
  } catch (error) {
    return next(error);
  }
};
