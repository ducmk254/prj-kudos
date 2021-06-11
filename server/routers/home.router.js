const homeController = require("../controllers/home.controller");
module.exports = (app) => {
  // user route:
  app
    .route("/api/v1/users")
    .get(homeController.userController.getAllUser)
    .put(homeController.userController.disableUser)
    .patch(homeController.userController.resetPassword)
    .post(homeController.userController.setAdmin);
  app
    .route("/api/v1/author/register")
    .post(homeController.userController.register);

  app.route("/api/v1/author/login").post(homeController.userController.login);

  //company route: /api/v1/companys
  app
    .route("/api/v1/companys")
    .get(homeController.companyController.getAllCompany)
    .post(homeController.companyController.createCompany);
  app
    .route("/api/v1/companys/:companyId")
    .get(homeController.companyController.getCompany)
    .post(homeController.companyController.updateCompany)
    .delete(homeController.companyController.deleteCompany);

  // group route: /api/v1/groups
  app
    .route("/api/v1/groups")
    .get(homeController.groupController.getAllGroup)
    .post(homeController.groupController.createGroup);

  app
    .route("/api/v1/groups/:groupId")
    .get(homeController.groupController.getGroup)
    .post(homeController.groupController.updateGroup)
    .delete(homeController.groupController.deleteGroup);

  // depatment route: /api/v1/departments
  app
    .route("/api/v1/departments")
    .get(homeController.departmentController.getAllDepartment)
    .post(homeController.departmentController.createDepartment);
  app
    .route("/api/v1/departments/:departmentId")
    .get(homeController.departmentController.getDepartment)
    .patch(homeController.departmentController.updateDepartment)
    .delete(homeController.departmentController.deleteDepartment);
  // position route: /api/v1/positions
  app
    .route("/api/v1/positions")
    .get(homeController.positionController.getAllPosition)
    .post(homeController.positionController.createPosition);

  app
    .route("/api/v1/positions/:positionId")
    .get(homeController.positionController.getPosition)
    .delete(homeController.positionController.deletePosition);

  // title route : /api/v1/titles
  app
    .route("/api/v1/titles")
    .get(homeController.titleController.getAllTitle)
    .post(homeController.titleController.createTitle);
  app
    .route("/api/v1/titles/:titleId")
    .get(homeController.titleController.getTitle);
  // Route not found
  app.all("*", (req, res, next) => {
    const err = new Error("Route not found");
    err.statusCode = 404;
    next(err);
  });
};
