const homeModel = require("../models/home.model");
const { companyModel } = require("../models/home.model");
module.exports.getAllCompany = async (req, res, next) => {
  try {
    const list_company = await companyModel.find();
    return res.status(200).json({
      status: "success",
      data: list_company,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.getCompany = async (req, res, next) => {
  // get by companyId
  //route: /api/v1/companys/:companyId
  try {
    const companyId = req.params;
    if (!companyId) {
      const err = new Error("company ID not found");
      err.statusCode = 404;
      return next(err);
    }
    const company = await homeModel.companyModel.findById(companyId);
    return res.status(200).json({
      status: "sucess",
      data: company,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.createCompany = async (req, res, next) => {
  //route: /api/v1/companys post method:
  try {
    const { mst } = req.body;
    const checCompany = await homeModel.companyModel.findOne({ mst: mst });
    if (checCompany) {
      const err = new Error("MST " + mst + "da ton tai");
      err.statusCode = 11001;
      return next(err);
    }
    const company = await homeModel.companyModel.create(req.body);
    return res.status(200).json({
      status: "success",
      data: company,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.updateCompany = async (req, res, next) => {
  //route /api/v1/companys/:companyId
  try {
    const { companyId } = req.params;
    console.log("companyId " + companyId);
    if (!companyId) {
      const err = new Error("Company ID not found");
      err.statusCode = 404;
      return next(err);
    }
    const company = await homeModel.companyModel.findByIdAndUpdate(companyId, {
      ...req.body,
    });
    return res.status(200).json({
      status: "sucess",
      data: company,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.deleteCompany = async (req, res, next) => {
  // route /api/v1/companys/:companyId
  try {
    const { companyId } = req.params;
    if (!companyId) {
      const err = new Error("Company ID not found");
      err.statusCode = 404;
      return next(err);
    }
    const company = await homeModel.companyModel.deleteOne({ _id: companyId });
    return res.status(200).json({
      status: "sucess",
      data: company,
    });
  } catch (error) {
    return next(error);
  }
};
