module.exports.errHandle = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (err.code === 11001) {
    err.statusCode = 400;
    err.message = err.message;
  }
  if (err.code === 404) {
    err.statusCode = 404;
    err.message = `${err.value} not found`;
  }

  res.status(err.statusCode).json({
    status: "failed",
    message: err.message,
  });
};
