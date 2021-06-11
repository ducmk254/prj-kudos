const bcryptjs = require("bcryptjs");
module.exports.verifyToken = async (req, res, next) => {
  //Access authorization from req header:
  const authorization = req.header("authorization");
  if (!authorization) {
    const err = new Error("Unauthorization");
    err.statusCode = 401;
    return next(err);
  } else {
    // get token:
    const token = authorization.replace("Bearer ", "");
    //verify token:
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    // Assign req
    req.user = { userId };
    next();
  }
};
